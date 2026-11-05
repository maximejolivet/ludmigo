# Schéma du backend

## Entités

| Entité | Représente |
| --- | --- |
| `User` | Compte joueur (et responsable de lieu, selon le rôle) |
| `Game` | Jeu de société du catalogue |
| `Place` | Lieu de jeu (espace dédié ou bar partenaire) |
| `Meetup` | Rencontre autour d'un jeu, dans un lieu, à une date donnée |
| `MeetupParticipation` | Participation d'un utilisateur à une rencontre |
| `Review` | Avis et note d'un utilisateur sur un jeu ou un lieu |
| `Notification` | Notification envoyée à un utilisateur |
| `PlaceOpeningHour` | Horaire d'ouverture d'un lieu |
| `PlaceGame` | Jeu présent dans la ludothèque d'un lieu |
| `PlaceEvent` | Événement proposé par un lieu (soirée, quiz, promotion) |
| `PlacePost` | Publication d'un lieu |
| `PlacePhoto` | Photo d'un lieu |
| `Article` | Article de blog ou actualité, publié par l'administration |
| `EditorialPage` | Page éditoriale (à propos, informations pratiques) |
| `ContactMessage` | Message envoyé via le formulaire de contact |
| `Report` | Signalement d'un avis, d'un profil ou d'une rencontre |
| `PushSubscription` | Abonnement d'un navigateur aux notifications web (PWA, P1) |
| `AuditLog` | Trace d'une action de l'administration ou d'une suppression |
| `Consent` | Consentement donné par un utilisateur (CGU, newsletter), avec sa version |
| `CollectionItem` | Jeu possédé ou souhaité par un utilisateur (hors V1) |
| `GamificationTask` | Tâche hebdomadaire rapportant des points (hors V1) |
| `PointEvent` | Points gagnés par un utilisateur (hors V1) |
| `Reward` | Récompense offerte par un partenaire (hors V1) |
| `GroupMessage` | Message dans la conversation d'une rencontre (hors V1) |

**Hors V1 (schéma gardé pour plus tard)** : `CollectionItem`, `GamificationTask`, `PointEvent`, `Reward` et `GroupMessage`. Ne pas créer ces tables ni leurs migrations au lancement.

## Tables et champs

### `user`
- `id` : UUID, clé primaire
- `email` : string(180), **obligatoire**, **unique**, index
- `password` : string, **obligatoire** (haché)
- `roles` : json, **obligatoire**, défaut `["ROLE_USER"]`
- `pseudo` : string(40), **obligatoire**, **unique**
- `city` : string(120), facultatif
- `created_at` : datetime_immutable, **obligatoire**
- `deleted_at` : datetime_immutable, facultatif (suppression logique)

### `game`
- `id` : UUID, **obligatoire**
- `name` : string(180), **obligatoire**, index
- `description` : text, facultatif
- `min_players` : smallint, **obligatoire**
- `max_players` : smallint, **obligatoire**, ≥ `min_players`
- `duration_minutes` : smallint, facultatif
- `difficulty` : enum (`beginner`, `intermediate`, `expert`), défaut `beginner`
- `image_url` : string, facultatif
- `created_at` : datetime_immutable, **obligatoire**

### `place`
- `id` : UUID, **obligatoire**
- `name` : string(180), **obligatoire**
- `type` : enum (`game_bar`, `bar_cafe`, `game_library`, `association`, `shop`), **obligatoire**
- `address` : string(255), **obligatoire**
- `city` : string(120), **obligatoire**, index
- `latitude`, `longitude` : decimal(9,6), facultatifs, index
- `owner_id` : FK vers `user` (responsable), facultatif
- `is_active` : boolean, défaut `false` (activé après validation)

### `meetup`
- `id` : UUID, **obligatoire**
- `game_id` : FK vers `game`, **obligatoire**, index
- `place_id` : FK vers `place`, facultatif, index (toujours rempli en V1, lieux publics uniquement ; vide possible plus tard pour une rencontre chez un particulier)
- `organizer_id` : FK vers `user`, **obligatoire**, index
- `starts_at` : datetime_immutable, **obligatoire**, index (dans le futur à la création)
- `max_participants` : smallint, **obligatoire**, ≥ 2
- `status` : enum (`open`, `full`, `cancelled`, `finished`), défaut `open`, index
- `validation_mode` : enum (`manual`, `automatic`), **obligatoire**, défaut `manual`
- `approximate_latitude`, `approximate_longitude` : decimal(9,6), facultatifs (réservés à une évolution : rencontre chez un particulier, hors V1)
- `home_address` : string(255), facultatif (réservé à la même évolution), **jamais exposé** hors des participants acceptés
- `suggested_game_name` : string(180), facultatif (jeu proposé hors catalogue)
- `beginners_welcome` : boolean, défaut `false` (badge « débutants bienvenus »)
- `place_event_id` : FK vers `place_event`, facultatif, index (rencontre issue d'une soirée du lieu)
- `description` : text, facultatif
- `created_at` : datetime_immutable, **obligatoire**

### `meetup_participation`
- `id` : UUID, **obligatoire**
- `meetup_id` : FK vers `meetup`, **obligatoire**
- `user_id` : FK vers `user`, **obligatoire**
- `joined_at` : datetime_immutable, **obligatoire**
- `status` : enum (`pending`, `accepted`, `refused`, `left`), **obligatoire**, défaut `pending`
- Contrainte **unique** : (`meetup_id`, `user_id`)

### `review`
- `id` : UUID, **obligatoire**
- `game_id` : FK vers `game`, facultatif, index (au moins `game_id` ou `place_id`)
- `place_id` : FK vers `place`, facultatif, index
- `user_id` : FK vers `user`, **obligatoire**
- `rating` : smallint, **obligatoire**, entre 1 et 5
- `comment` : text, facultatif, 2000 caractères maximum
- `created_at` : datetime_immutable, **obligatoire**
- Contraintes **uniques** : (`game_id`, `user_id`) et (`place_id`, `user_id`)

### `notification`
- `id` : UUID, **obligatoire**
- `user_id` : FK vers `user`, **obligatoire**, index
- `type` : string, **obligatoire**
- `channel` : enum (`email`, `web_push`), défaut `email`
- `payload` : json, facultatif
- `read_at` : datetime_immutable, facultatif
- `created_at` : datetime_immutable, **obligatoire**

### `place_opening_hour`
- `id` : UUID, **obligatoire**
- `place_id` : FK vers `place`, **obligatoire**
- `day_of_week` : smallint (0 à 6), **obligatoire**
- `opens_at`, `closes_at` : time, **obligatoires**

### `place_game`
- `id` : UUID, **obligatoire**
- `place_id` : FK vers `place`, **obligatoire**, index
- `game_id` : FK vers `game`, **obligatoire**, index
- `available` : boolean, défaut `true`
- Contrainte **unique** : (`place_id`, `game_id`)

### `place_event`
- `id` : UUID, **obligatoire**
- `place_id` : FK vers `place`, **obligatoire**, index
- `title` : string(180), **obligatoire**
- `description` : text, facultatif
- `starts_at` : datetime_immutable, **obligatoire**, index
- `recurrence_rule` : string(255), facultatif (règle iCal RRULE, par exemple chaque jeudi)
- `recurrence_until` : date_immutable, facultatif
- `status` : enum (`draft`, `published`, `cancelled`), défaut `draft`
- `created_at` : datetime_immutable, **obligatoire**

### `place_post`
- `id` : UUID, **obligatoire**
- `place_id` : FK vers `place`, **obligatoire**, index
- `title` : string(180), facultatif
- `body` : text, **obligatoire**
- `published_at` : datetime_immutable, facultatif
- `created_at` : datetime_immutable, **obligatoire**

### `place_photo`
- `id` : UUID, **obligatoire**
- `place_id` : FK vers `place`, **obligatoire**, index
- `url` : string(255), **obligatoire**
- `caption` : string(180), facultatif
- `position` : smallint, défaut `0`

### `article`
- `id` : UUID, **obligatoire**
- `author_id` : FK vers `user` (administrateur), **obligatoire**
- `title` : string(180), **obligatoire**
- `slug` : string(190), **obligatoire**, **unique**
- `body` : text, **obligatoire**
- `media` : json, facultatif (photos, vidéos, infographies)
- `status` : enum (`draft`, `published`), défaut `draft`
- `published_at` : datetime_immutable, facultatif, index
- `created_at` : datetime_immutable, **obligatoire**

### `editorial_page`
- `id` : UUID, **obligatoire**
- `slug` : string(190), **obligatoire**, **unique**
- `title` : string(180), **obligatoire**
- `body` : text, **obligatoire**
- `updated_at` : datetime_immutable, **obligatoire**

### `contact_message`
- `id` : UUID, **obligatoire**
- `user_id` : FK vers `user`, facultatif (visiteur non connecté possible)
- `subject` : string(60), **obligatoire** (sujets : question, bug, partenariat, presse, autre)
- `name` : string(120), **obligatoire**
- `email` : string(180), **obligatoire**
- `message` : text, **obligatoire**, 2000 caractères maximum
- `created_at` : datetime_immutable, **obligatoire**
- `handled_at` : datetime_immutable, facultatif

### `report`
- `id` : UUID, **obligatoire**
- `reporter_id` : FK vers `user`, **obligatoire**, index
- `target_type` : enum (`review`, `user`, `meetup`), **obligatoire**
- `target_id` : UUID, **obligatoire**, index
- `reason` : string(255), **obligatoire**
- `status` : enum (`open`, `handled`, `rejected`), défaut `open`, index
- `handled_by_id` : FK vers `user` (administrateur), facultatif
- `handled_at` : datetime_immutable, facultatif (objectif : sous 48 heures)
- `created_at` : datetime_immutable, **obligatoire**

### `push_subscription` (P1)
- `id` : UUID, **obligatoire**
- `user_id` : FK vers `user`, **obligatoire**, index
- `endpoint` : string(500), **obligatoire**, **unique**
- `keys` : json, **obligatoire**
- `created_at` : datetime_immutable, **obligatoire**

### `audit_log`
- `id` : UUID, **obligatoire**
- `actor_id` : FK vers `user`, facultatif (vide si l'action vient du système)
- `action` : enum (`create`, `update`, `delete`), **obligatoire**
- `entity_type` : string(80), **obligatoire**
- `entity_id` : UUID, **obligatoire**
- `changes` : json, facultatif (valeurs avant et après, sans mot de passe ni donnée sensible)
- `created_at` : datetime_immutable, **obligatoire**
- Index sur (`entity_type`, `entity_id`)

### `consent`
- `id` : UUID, **obligatoire**
- `user_id` : FK vers `user`, **obligatoire**, index
- `type` : enum (`terms`, `privacy`, `newsletter`), **obligatoire**
- `version` : string(20), **obligatoire**
- `granted` : boolean, **obligatoire**
- `created_at` : datetime_immutable, **obligatoire**

### Tables hors V1

Ces tables ne sont pas créées au lancement.

**`collection_item`**
- `id` : UUID ; `user_id` et `game_id` : FK, **obligatoires** ; `status` : enum (`owned`, `wanted`), **obligatoire**
- Contrainte **unique** : (`user_id`, `game_id`)

**`gamification_task`**
- `id` : UUID ; `code` : string(60), **obligatoire**, **unique** (par exemple `organise_meetup`, `write_review`) ; `label` : string(180), **obligatoire** ; `points` : smallint ≥ 0, **obligatoire** ; `active` : boolean, défaut `true`

**`point_event`**
- `id` : UUID ; `user_id` : FK, **obligatoire**, index ; `task_id` : FK vers `gamification_task`, facultatif ; `points` : smallint, **obligatoire** ; `reason` : string(180), **obligatoire** ; `created_at` : datetime_immutable, **obligatoire**, index

**`reward`**
- `id` : UUID ; `place_id` : FK vers `place` (partenaire), facultatif ; `label` : string(180), **obligatoire** ; `type` : enum (`discount`, `voucher`, `free_game`), **obligatoire** ; `points_cost` : smallint ≥ 0, **obligatoire** ; `valid_until` : date, facultatif ; `active` : boolean, défaut `true`

**`group_message`**
- `id` : UUID ; `meetup_id` : FK, **obligatoire**, index ; `author_id` : FK vers `user`, **obligatoire** ; `body` : text, **obligatoire**, 1000 caractères maximum ; `created_at` : datetime_immutable, **obligatoire**

## Relations

- `User` 1 - N `Meetup` (organisateur)
- `User` N - N `Meetup` via `MeetupParticipation`
- `Game` 1 - N `Meetup`
- `Place` 1 - N `Meetup`
- `PlaceEvent` 1 - N `Meetup` (occurrences d'une soirée)
- `User` 1 - N `Place` (responsable, facultatif)
- `Place` 1 - N `PlaceOpeningHour`, `PlaceGame`, `PlaceEvent`, `PlacePost` et `PlacePhoto`
- `Game` 1 - N `PlaceGame`
- `Game` 1 - N `Review` ; `Place` 1 - N `Review` ; `User` 1 - N `Review`
- `User` 1 - N `Notification`
- `User` 1 - N `Article` (auteur, administrateur)
- `User` 1 - N `ContactMessage` (facultatif)
- `User` 1 - N `Report` (auteur) ; `User` 1 - N `PushSubscription`
- `User` 1 - N `AuditLog` (acteur) ; `User` 1 - N `Consent`
- Hors V1 : `User` N - N `Game` via `CollectionItem` ; `User` 1 - N `PointEvent` ; `GamificationTask` 1 - N `PointEvent` ; `Place` 1 - N `Reward` ; `Meetup` 1 - N `GroupMessage` ; `User` 1 - N `GroupMessage`

## Propriété des données

- Un utilisateur possède son profil, ses participations, ses avis et ses notifications.
- Une rencontre appartient à son organisateur ; le responsable d'un lieu peut la consulter, pas la modifier.
- Un lieu appartient à son responsable ; l'administrateur valide son activation.
- Un responsable de lieu possède les jeux, événements, publications et photos de son lieu.
- Le catalogue de jeux, les articles et les pages éditoriales appartiennent à Ludmigo (écriture administrateur uniquement).
- Les messages de contact sont lisibles par les administrateurs seulement.
- Le journal d'audit est en écriture seule : personne ne le modifie ni ne le supprime, pas même un administrateur.
- Les consentements appartiennent à l'utilisateur et sont conservés comme preuve.
- Un rôle administrateur (`ROLE_ADMIN`) est attribué manuellement, jamais à l'inscription.

## Parcours d'authentification

- **Inscription** : email, mot de passe et pseudo, email de confirmation.
- **Connexion** : email et mot de passe, émission d'un JWT (durée 1 h) et d'un refresh token (30 jours).
- **Réinitialisation** : lien à usage unique valable 1 h, envoyé par email.
- **Session** : refresh token révoqué à la déconnexion et au changement de mot de passe.

## Règles d'autorisation

| Entité | Lire | Créer | Modifier | Supprimer |
| --- | --- | --- | --- | --- |
| `User` | Soi-même (complet) ; autres (pseudo uniquement) | Inscription | Soi-même | Soi-même (anonymisation) |
| `Game` | Tous | Admin | Admin | Admin |
| `Place` | Tous (actifs) ; responsable (siens) | Responsable ou admin | Responsable (siens, sans activation) ; admin | Admin |
| `Meetup` | Tous (ouvertes) | Utilisateur connecté | Organisateur (tant que non commencée) ; admin | Organisateur ; admin |
| `MeetupParticipation` | Participants de la rencontre | Utilisateur connecté, rencontre ouverte | Organisateur (accepter, refuser) | Soi-même (quitter) |
| `Review` | Tous | Utilisateur connecté (un avis par jeu ou lieu) | Auteur | Auteur ; admin |
| `Notification` | Destinataire | Système | Destinataire (marquer lue) | Destinataire |
| `PlaceOpeningHour` | Tous | Responsable | Responsable | Responsable |
| `PlaceGame` | Tous (lieu actif) | Responsable (son lieu) | Responsable | Responsable |
| `PlaceEvent` | Tous (événements publiés) | Responsable | Responsable | Responsable ; admin |
| `PlacePost` | Tous | Responsable | Responsable | Responsable ; admin |
| `PlacePhoto` | Tous | Responsable | Responsable | Responsable ; admin |
| `Article` | Tous (publiés) | Admin | Admin | Admin |
| `EditorialPage` | Tous | Admin | Admin | Admin |
| `ContactMessage` | Admin | Tous, visiteurs compris | Admin (traitement) | Admin |
| `Report` | Admin | Utilisateur connecté | Admin (traitement) | Admin |
| `PushSubscription` | Soi-même | Soi-même | Jamais | Soi-même |
| `AuditLog` | Admin | Système | Jamais | Jamais |
| `Consent` | Soi-même ; admin | Système, à l'inscription | Non modifiable (nouvelle version) | Jamais (preuve) |

Hors V1 : `CollectionItem` (propriétaire seul), `GamificationTask` et `Reward` (lecture publique, écriture admin), `PointEvent` (lecture par soi-même, écriture système) et `GroupMessage` (participants acceptés).

## Validation des données

- Email : format valide, unique, 180 caractères maximum.
- Mot de passe : 12 caractères minimum, avec au moins un chiffre et une lettre.
- Pseudo : 3 à 40 caractères, lettres, chiffres, tirets et underscores.
- Rencontre : date future à la création, `max_participants` ≥ 2, sans dépasser le nombre maximum de joueurs du jeu.
- Avis : note entière de 1 à 5, commentaire de 2000 caractères maximum, possible seulement après une participation acceptée à une rencontre du jeu ou dans le lieu.
- Lieu : adresse et ville obligatoires, activation uniquement après validation.
- Événement : titre obligatoire et date future.
- Article : titre et slug uniques.
- Rencontre chez un particulier : hors V1. Si elle est ajoutée plus tard, seule une zone approximative sera stockée et affichée.

## Conservation et suppression

- **Conservé** : rencontres passées (anonymisées), avis (auteur anonymisé), catalogue de jeux.
- **Supprimé** : données personnelles du compte à la demande de l'utilisateur, notifications après 90 jours, messages de contact 6 mois après traitement.
- **Exportable** : profil, participations et avis au format JSON (RGPD).
- **Journal d'audit** : conservé 12 mois, jamais modifié.
- **Consentements** : conservés 3 ans comme preuve, même après la suppression du compte.

## Migrations et données initiales

- Toute modification de schéma passe par une migration Doctrine (`php bin/console make:migration`), relue avant commit.
- Données initiales (fixtures) : catalogue de jeux de départ, 2 lieux de test, un compte administrateur créé hors dépôt.
- Une migration ne supprime jamais une colonne en une seule étape : d'abord la colonne n'est plus utilisée, puis elle est supprimée dans une migration suivante.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Backend schema

## Entities

| Entity | Represents |
| --- | --- |
| `User` | Player account (and venue manager, depending on the role) |
| `Game` | Board game in the catalogue |
| `Place` | Game venue (dedicated space or partner bar) |
| `Meetup` | Meetup around a game, in a venue, at a given date |
| `MeetupParticipation` | A user's participation in a meetup |
| `Review` | A user's review and rating of a game or a venue |
| `Notification` | Notification sent to a user |
| `PlaceOpeningHour` | Opening hours of a venue |
| `PlaceGame` | Game available in a venue's library |
| `PlaceEvent` | Event offered by a venue (evening, quiz, promotion) |
| `PlacePost` | Post published by a venue |
| `PlacePhoto` | Photo of a venue |
| `Article` | Blog article or news item, published by the administration |
| `EditorialPage` | Editorial page (about, practical information) |
| `ContactMessage` | Message sent through the contact form |
| `Report` | Report of a review, a profile or a meetup |
| `PushSubscription` | A browser's subscription to web notifications (PWA, P1) |
| `AuditLog` | Trace of an administration action or a deletion |
| `Consent` | Consent given by a user (terms, newsletter), with its version |
| `CollectionItem` | Game owned or wanted by a user (out of V1) |
| `GamificationTask` | Weekly task earning points (out of V1) |
| `PointEvent` | Points earned by a user (out of V1) |
| `Reward` | Reward offered by a partner (out of V1) |
| `GroupMessage` | Message in a meetup's conversation (out of V1) |

**Out of V1 (schema kept for later)**: `CollectionItem`, `GamificationTask`, `PointEvent`, `Reward` and `GroupMessage`. Do not create these tables or their migrations at launch.

## Tables and fields

### `user`
- `id`: UUID, primary key
- `email`: string(180), **required**, **unique**, indexed
- `password`: string, **required** (hashed)
- `roles`: json, **required**, default `["ROLE_USER"]`
- `pseudo`: string(40), **required**, **unique**
- `city`: string(120), optional
- `created_at`: datetime_immutable, **required**
- `deleted_at`: datetime_immutable, optional (soft delete)

### `game`
- `id`: UUID, **required**
- `name`: string(180), **required**, indexed
- `description`: text, optional
- `min_players`: smallint, **required**
- `max_players`: smallint, **required**, ≥ `min_players`
- `duration_minutes`: smallint, optional
- `difficulty`: enum (`beginner`, `intermediate`, `expert`), default `beginner`
- `image_url`: string, optional
- `created_at`: datetime_immutable, **required**

### `place`
- `id`: UUID, **required**
- `name`: string(180), **required**
- `type`: enum (`game_bar`, `bar_cafe`, `game_library`, `association`, `shop`), **required**
- `address`: string(255), **required**
- `city`: string(120), **required**, indexed
- `latitude`, `longitude`: decimal(9,6), optional, indexed
- `owner_id`: FK to `user` (manager), optional
- `is_active`: boolean, default `false` (activated after validation)

### `meetup`
- `id`: UUID, **required**
- `game_id`: FK to `game`, **required**, indexed
- `place_id`: FK to `place`, optional, indexed (always filled in V1, public venues only; may be empty later for a meetup at a private home)
- `organizer_id`: FK to `user`, **required**, indexed
- `starts_at`: datetime_immutable, **required**, indexed (in the future at creation)
- `max_participants`: smallint, **required**, ≥ 2
- `status`: enum (`open`, `full`, `cancelled`, `finished`), default `open`, indexed
- `validation_mode`: enum (`manual`, `automatic`), **required**, default `manual`
- `approximate_latitude`, `approximate_longitude`: decimal(9,6), optional (reserved for an evolution: meetup at a private home, out of V1)
- `home_address`: string(255), optional (reserved for the same evolution), **never exposed** outside accepted participants
- `suggested_game_name`: string(180), optional (game suggested outside the catalogue)
- `beginners_welcome`: boolean, default `false` ("beginners welcome" badge)
- `place_event_id`: FK to `place_event`, optional, indexed (meetup coming from a venue evening)
- `description`: text, optional
- `created_at`: datetime_immutable, **required**

### `meetup_participation`
- `id`: UUID, **required**
- `meetup_id`: FK to `meetup`, **required**
- `user_id`: FK to `user`, **required**
- `joined_at`: datetime_immutable, **required**
- `status`: enum (`pending`, `accepted`, `refused`, `left`), **required**, default `pending`
- **Unique** constraint: (`meetup_id`, `user_id`)

### `review`
- `id`: UUID, **required**
- `game_id`: FK to `game`, optional, indexed (at least `game_id` or `place_id`)
- `place_id`: FK to `place`, optional, indexed
- `user_id`: FK to `user`, **required**
- `rating`: smallint, **required**, between 1 and 5
- `comment`: text, optional, 2000 characters maximum
- `created_at`: datetime_immutable, **required**
- **Unique** constraints: (`game_id`, `user_id`) and (`place_id`, `user_id`)

### `notification`
- `id`: UUID, **required**
- `user_id`: FK to `user`, **required**, indexed
- `type`: string, **required**
- `channel`: enum (`email`, `web_push`), default `email`
- `payload`: json, optional
- `read_at`: datetime_immutable, optional
- `created_at`: datetime_immutable, **required**

### `place_opening_hour`
- `id`: UUID, **required**
- `place_id`: FK to `place`, **required**
- `day_of_week`: smallint (0 to 6), **required**
- `opens_at`, `closes_at`: time, **required**

### `place_game`
- `id`: UUID, **required**
- `place_id`: FK to `place`, **required**, indexed
- `game_id`: FK to `game`, **required**, indexed
- `available`: boolean, default `true`
- **Unique** constraint: (`place_id`, `game_id`)

### `place_event`
- `id`: UUID, **required**
- `place_id`: FK to `place`, **required**, indexed
- `title`: string(180), **required**
- `description`: text, optional
- `starts_at`: datetime_immutable, **required**, indexed
- `recurrence_rule`: string(255), optional (iCal RRULE, for example every Thursday)
- `recurrence_until`: date_immutable, optional
- `status`: enum (`draft`, `published`, `cancelled`), default `draft`
- `created_at`: datetime_immutable, **required**

### `place_post`
- `id`: UUID, **required**
- `place_id`: FK to `place`, **required**, indexed
- `title`: string(180), optional
- `body`: text, **required**
- `published_at`: datetime_immutable, optional
- `created_at`: datetime_immutable, **required**

### `place_photo`
- `id`: UUID, **required**
- `place_id`: FK to `place`, **required**, indexed
- `url`: string(255), **required**
- `caption`: string(180), optional
- `position`: smallint, default `0`

### `article`
- `id`: UUID, **required**
- `author_id`: FK to `user` (administrator), **required**
- `title`: string(180), **required**
- `slug`: string(190), **required**, **unique**
- `body`: text, **required**
- `media`: json, optional (photos, videos, infographics)
- `status`: enum (`draft`, `published`), default `draft`
- `published_at`: datetime_immutable, optional, indexed
- `created_at`: datetime_immutable, **required**

### `editorial_page`
- `id`: UUID, **required**
- `slug`: string(190), **required**, **unique**
- `title`: string(180), **required**
- `body`: text, **required**
- `updated_at`: datetime_immutable, **required**

### `contact_message`
- `id`: UUID, **required**
- `user_id`: FK to `user`, optional (a visitor who is not signed in is possible)
- `subject`: string(60), **required** (subjects: question, bug, partnership, press, other)
- `name`: string(120), **required**
- `email`: string(180), **required**
- `message`: text, **required**, 2000 characters maximum
- `created_at`: datetime_immutable, **required**
- `handled_at`: datetime_immutable, optional

### `report`
- `id`: UUID, **required**
- `reporter_id`: FK to `user`, **required**, indexed
- `target_type`: enum (`review`, `user`, `meetup`), **required**
- `target_id`: UUID, **required**, indexed
- `reason`: string(255), **required**
- `status`: enum (`open`, `handled`, `rejected`), default `open`, indexed
- `handled_by_id`: FK to `user` (administrator), optional
- `handled_at`: datetime_immutable, optional (target: within 48 hours)
- `created_at`: datetime_immutable, **required**

### `push_subscription` (P1)
- `id`: UUID, **required**
- `user_id`: FK to `user`, **required**, indexed
- `endpoint`: string(500), **required**, **unique**
- `keys`: json, **required**
- `created_at`: datetime_immutable, **required**

### `audit_log`
- `id`: UUID, **required**
- `actor_id`: FK to `user`, optional (empty when the action comes from the system)
- `action`: enum (`create`, `update`, `delete`), **required**
- `entity_type`: string(80), **required**
- `entity_id`: UUID, **required**
- `changes`: json, optional (before and after values, with no password or sensitive data)
- `created_at`: datetime_immutable, **required**
- Index on (`entity_type`, `entity_id`)

### `consent`
- `id`: UUID, **required**
- `user_id`: FK to `user`, **required**, indexed
- `type`: enum (`terms`, `privacy`, `newsletter`), **required**
- `version`: string(20), **required**
- `granted`: boolean, **required**
- `created_at`: datetime_immutable, **required**

### Tables out of V1

These tables are not created at launch.

**`collection_item`**
- `id`: UUID; `user_id` and `game_id`: FK, **required**; `status`: enum (`owned`, `wanted`), **required**
- **Unique** constraint: (`user_id`, `game_id`)

**`gamification_task`**
- `id`: UUID; `code`: string(60), **required**, **unique** (for example `organise_meetup`, `write_review`); `label`: string(180), **required**; `points`: smallint ≥ 0, **required**; `active`: boolean, default `true`

**`point_event`**
- `id`: UUID; `user_id`: FK, **required**, indexed; `task_id`: FK to `gamification_task`, optional; `points`: smallint, **required**; `reason`: string(180), **required**; `created_at`: datetime_immutable, **required**, indexed

**`reward`**
- `id`: UUID; `place_id`: FK to `place` (partner), optional; `label`: string(180), **required**; `type`: enum (`discount`, `voucher`, `free_game`), **required**; `points_cost`: smallint ≥ 0, **required**; `valid_until`: date, optional; `active`: boolean, default `true`

**`group_message`**
- `id`: UUID; `meetup_id`: FK, **required**, indexed; `author_id`: FK to `user`, **required**; `body`: text, **required**, 1000 characters maximum; `created_at`: datetime_immutable, **required**

## Relations

- `User` 1 - N `Meetup` (organiser)
- `User` N - N `Meetup` through `MeetupParticipation`
- `Game` 1 - N `Meetup`
- `Place` 1 - N `Meetup`
- `PlaceEvent` 1 - N `Meetup` (occurrences of an evening)
- `User` 1 - N `Place` (manager, optional)
- `Place` 1 - N `PlaceOpeningHour`, `PlaceGame`, `PlaceEvent`, `PlacePost` and `PlacePhoto`
- `Game` 1 - N `PlaceGame`
- `Game` 1 - N `Review`; `Place` 1 - N `Review`; `User` 1 - N `Review`
- `User` 1 - N `Notification`
- `User` 1 - N `Article` (author, administrator)
- `User` 1 - N `ContactMessage` (optional)
- `User` 1 - N `Report` (author); `User` 1 - N `PushSubscription`
- `User` 1 - N `AuditLog` (actor); `User` 1 - N `Consent`
- Out of V1: `User` N - N `Game` through `CollectionItem`; `User` 1 - N `PointEvent`; `GamificationTask` 1 - N `PointEvent`; `Place` 1 - N `Reward`; `Meetup` 1 - N `GroupMessage`; `User` 1 - N `GroupMessage`

## Data ownership

- A user owns their profile, participations, reviews and notifications.
- A meetup belongs to its organiser; the venue manager can view it, not edit it.
- A venue belongs to its manager; the administrator validates its activation.
- A venue manager owns the games, events, posts and photos of their venue.
- The game catalogue, articles and editorial pages belong to Ludmigo (administrator write access only).
- Contact messages are readable by administrators only.
- The audit log is write-only: nobody edits or deletes it, not even an administrator.
- Consents belong to the user and are kept as proof.
- An administrator role (`ROLE_ADMIN`) is granted manually, never at sign-up.

## Authentication flows

- **Sign-up**: email, password and nickname, confirmation email.
- **Sign-in**: email and password, issuing a JWT (1 h) and a refresh token (30 days).
- **Reset**: single-use link valid for 1 h, sent by email.
- **Session**: refresh token revoked on sign-out and on password change.

## Authorisation rules

| Entity | Read | Create | Update | Delete |
| --- | --- | --- | --- | --- |
| `User` | Self (full); others (nickname only) | Sign-up | Self | Self (anonymisation) |
| `Game` | Everyone | Admin | Admin | Admin |
| `Place` | Everyone (active); manager (own) | Manager or admin | Manager (own, without activation); admin | Admin |
| `Meetup` | Everyone (open) | Signed-in user | Organiser (until it starts); admin | Organiser; admin |
| `MeetupParticipation` | Meetup participants | Signed-in user, open meetup | Organiser (accept, refuse) | Self (leave) |
| `Review` | Everyone | Signed-in user (one review per game or venue) | Author | Author; admin |
| `Notification` | Recipient | System | Recipient (mark as read) | Recipient |
| `PlaceOpeningHour` | Everyone | Manager | Manager | Manager |
| `PlaceGame` | Everyone (active venue) | Manager (own venue) | Manager | Manager |
| `PlaceEvent` | Everyone (published events) | Manager | Manager | Manager; admin |
| `PlacePost` | Everyone | Manager | Manager | Manager; admin |
| `PlacePhoto` | Everyone | Manager | Manager | Manager; admin |
| `Article` | Everyone (published) | Admin | Admin | Admin |
| `EditorialPage` | Everyone | Admin | Admin | Admin |
| `ContactMessage` | Admin | Everyone, visitors included | Admin (handling) | Admin |
| `Report` | Admin | Signed-in user | Admin (handling) | Admin |
| `PushSubscription` | Self | Self | Never | Self |
| `AuditLog` | Admin | System | Never | Never |
| `Consent` | Self; admin | System, at sign-up | Not editable (new version) | Never (proof) |

Out of V1: `CollectionItem` (owner only), `GamificationTask` and `Reward` (public read, admin write), `PointEvent` (read by self, system write) and `GroupMessage` (accepted participants).

## Data validation

- Email: valid format, unique, 180 characters maximum.
- Password: 12 characters minimum, with at least one digit and one letter.
- Nickname: 3 to 40 characters, letters, digits, hyphens and underscores.
- Meetup: future date at creation, `max_participants` ≥ 2, not above the game's maximum number of players.
- Review: whole rating from 1 to 5, comment of 2000 characters maximum, possible only after an accepted participation in a meetup for the game or at the venue.
- Venue: address and city required, activation only after validation.
- Event: title required and future date.
- Article: unique title and slug.
- Meetup at a private home: out of V1. If added later, only an approximate area will be stored and shown.

## Retention and deletion

- **Kept**: past meetups (anonymised), reviews (author anonymised), game catalogue.
- **Deleted**: the account's personal data at the user's request, notifications after 90 days, contact messages 6 months after handling.
- **Exportable**: profile, participations and reviews as JSON (GDPR).
- **Audit log**: kept 12 months, never edited.
- **Consents**: kept 3 years as proof, even after the account is deleted.

## Migrations and initial data

- Every schema change goes through a Doctrine migration (`php bin/console make:migration`), reviewed before commit.
- Initial data (fixtures): starter game catalogue, 2 test venues, an administrator account created outside the repository.
- A migration never drops a column in a single step: first the column is no longer used, then it is dropped in a later migration.
