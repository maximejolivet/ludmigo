# Architecture technique

## Vue d'ensemble

```
[web React]  ──┐
               ├── API REST (Symfony 7, API Platform) ── MariaDB / PostgreSQL
[mobile RN, hors V1]  ──┘
                          └── services externes (email, push, géocodage)
```

Ludmigo est un monorepo composé de quatre parties :

| Dossier | Rôle | Stack |
| --- | --- | --- |
| `api/` | Source de vérité métier : API REST, règles, persistance | Symfony 7, PHP 8.5, API Platform, Doctrine, MariaDB / PostgreSQL |
| `web/` | Application navigateur | React 19, Vite, React Router, TypeScript |
| `mobile/` | Application iOS et Android (hors V1, squelette seulement) | React Native 0.88, Expo, TypeScript |
| `packages/` | Types et client API partagés entre web et mobile | TypeScript |

**Règle** : la logique métier ne vit que dans `api/`. Le web et le mobile affichent des données et envoient des actions utilisateur. Toute modification de l'API met à jour les types dans `packages/`.

## Structure du backend (`api/`)

Couches prévues. C'est un plan pour la première implémentation, pas encore du code :

- **Ressources (API Platform)** : une ressource par entité exposée aux clients, avec ses opérations (lecture, création, rejoindre, quitter).
- **Entités (Doctrine)** : les tables décrites dans le schéma du backend.
- **Voters (Symfony)** : un voter par ressource protégée, pour vérifier le rôle et la propriété de chaque écriture (un utilisateur ne modifie que ses propres rencontres et son profil).
- **Services** : règles métier qui touchent plusieurs entités, comme la capacité d'une rencontre et la règle « une seule participation par utilisateur et par rencontre ».
- **Erreurs** : un format d'erreur unique, RFC 7807.

## Données

Entités : `User`, `Game`, `Category`, `GameCategory`, `Place`, `Meetup`, `MeetupParticipation`, `Review`, `Notification`, `PlaceOpeningHour`, `Report`, `PushSubscription`, `FavoriteGame`, les entités des lieux (`PlaceGame`, `PlaceEvent`, `PlacePost`, `PlacePhoto`), le contenu (`Article`, `EditorialPage`), le contact (`ContactMessage`), l'audit (`AuditLog`) et les consentements (`Consent`). Les entités gardées pour plus tard, hors V1, sont `CollectionItem`, `GroupMessage`, `GamificationTask`, `PointEvent` et `Reward`.

- Les migrations se créent avec `php bin/console make:migration` et se relisent avant chaque commit.
- Une colonne n'est jamais supprimée dans la même migration que le code qui cesse de l'utiliser : le code change d'abord, la colonne est supprimée dans une migration ultérieure.
- Suppression logique sur `User` (`deleted_at`), avec anonymisation des rencontres passées.

## Clients

- **Web et mobile** appellent les mêmes endpoints. Chaque client a son interface, adaptée à sa plateforme. Le code partagé se limite aux types et au client API de `packages/`.
- **Navigation** : les routes web suivent les écrans de l'application avec React Router.
- **Back office** : interface web réservée à `ROLE_ADMIN`, dans la même API, pour le catalogue, les articles, les pages éditoriales, la modération, les comptes administrateurs et le journal d'audit.

## Sécurité

- **Rôles** : `ROLE_USER` (joueur), `ROLE_PLACE` (gestionnaire de lieu), `ROLE_ADMIN` (modération et catalogue).
- **Authentification** : email et mot de passe, jetons JWT avec rafraîchissement.
- **Autorisation** : voters Symfony sur chaque endpoint en écriture.
- **Mots de passe** : hachés avec le hasher natif de Symfony.
- **Secrets** : variables d'environnement uniquement, jamais dans le dépôt.
- **Données personnelles** : RGPD (consentement, export, suppression). Les emails et mots de passe ne sont jamais journalisés.
- **Journal d'audit** : chaque action de l'administration et chaque suppression est tracée (acteur, date, valeurs avant et après).
- **Pages légales** : CGU, mentions légales, politique de cookies et bandeau de consentement, à faire valider par un juriste avant la mise en ligne.

## Intégrations

| Service | Usage | Statut |
| --- | --- | --- |
| Notifications web push (PWA) | Notifications dans le navigateur ou la PWA installée | Prévu (étape 4, P1) |
| Email transactionnel | Réinitialisation du mot de passe, notifications | Fournisseur européen (ex. Brevo) |
| Géocodage et distance | Adresses des lieux, recherche près de chez moi | OpenStreetMap (Nominatim) |
| Stockage de fichiers | Photos des jeux et des lieux | Stockage objet compatible S3 (ex. OVH Object Storage) |
| Analyse d'audience | Matomo ou Plausible (sans consentement) et Search Console | Prévu (étape 5) |
| Affiliation boutique de jeux de société | Liens vers les fiches produits, suivi des clics | Prévu (étape 4) |
| Paiement (évolution) | Abonnements professionnels et chèque cadeau, hors V1 | Stripe, branché avec les abonnements |

## Environnements

| Environnement | Contenu | Statut |
| --- | --- | --- |
| Local | Docker Compose (MariaDB ou PostgreSQL), serveurs de dev web, mobile et API | Mis en place à l'étape 1 |
| Préproduction | Mêmes services que la production, comptes de test par rôle | À mettre en place (Vercel pour le web, OVH France pour l'API) |
| Production | API et web ; hébergement OVH France (prévu) | À mettre en place avant la mise en production |

## Contrôles qualité

Chaque pull request vers `develop` lance les contrôles des parties touchées : PHP-CS-Fixer, PHPStan, PHPUnit, ESLint, Vitest, Jest. Renovate maintient les dépendances à jour.

## Décisions prises

- **CMS** : pas de CMS externe (WordPress ou Drupal). Les articles, actualités et pages éditoriales sont gérés dans l'application, via le back office, et stockés par l'API. Raison : une seule logique métier et un seul socle d'authentification.
- **Inscription professionnelle** : gratuite au lancement ; les abonnements sont une évolution.
- **Hébergement de l'API et de la base** : OVH France (prévu), un VPS dimensionné au départ à 2 vCPU et 4 Go de RAM.
- **Cartographie** : OpenStreetMap (Leaflet, Nominatim), sans coût à la requête contrairement à Google Maps.
- **Authentification** : JWT seul (email et mot de passe) ; un fournisseur externe pourra s'ajouter plus tard.
- **Stockage des photos** : stockage objet compatible S3 (ex. OVH Object Storage).
- **Paiement** : Stripe, pour la phase des abonnements. Aucun paquet de paiement n'est ajouté avant cette phase, et il est alors validé avec le porteur du projet.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Technical architecture

## Overview

```
[React web]  ──┐
               ├── REST API (Symfony 7, API Platform) ── MariaDB / PostgreSQL
[RN mobile, out of V1]  ──┘
                          └── external services (email, push, geocoding)
```

Ludmigo is a monorepo made of four parts:

| Folder | Role | Stack |
| --- | --- | --- |
| `api/` | Business source of truth: REST API, rules, persistence | Symfony 7, PHP 8.5, API Platform, Doctrine, MariaDB / PostgreSQL |
| `web/` | Browser application | React 19, Vite, React Router, TypeScript |
| `mobile/` | iOS and Android app (out of V1, skeleton only) | React Native 0.88, Expo, TypeScript |
| `packages/` | Types and API client shared between web and mobile | TypeScript |

**Rule**: business logic lives only in `api/`. Web and mobile display data and send user actions. Any API change updates the types in `packages/`.

## Backend structure (`api/`)

Planned layers. This is a plan for the first implementation, not code yet:

- **Resources (API Platform)**: one resource per entity exposed to clients, with its operations (read, create, join, leave).
- **Entities (Doctrine)**: the tables described in the backend schema.
- **Voters (Symfony)**: one voter per protected resource, to check the role and ownership of every write (a user only edits their own meetups and profile).
- **Services**: business rules that touch several entities, such as a meetup's capacity and the "one participation per user per meetup" rule.
- **Errors**: a single error format, RFC 7807.

## Data

Entities: `User`, `Game`, `Category`, `GameCategory`, `Place`, `Meetup`, `MeetupParticipation`, `Review`, `Notification`, `PlaceOpeningHour`, `Report`, `PushSubscription`, `FavoriteGame`, the venue entities (`PlaceGame`, `PlaceEvent`, `PlacePost`, `PlacePhoto`), content (`Article`, `EditorialPage`), contact (`ContactMessage`), audit (`AuditLog`) and consents (`Consent`). The entities kept for later, out of V1, are `CollectionItem`, `GroupMessage`, `GamificationTask`, `PointEvent` and `Reward`.

- Migrations are created with `php bin/console make:migration` and reviewed before every commit.
- A column is never dropped in the same migration as the code that stops using it: the code changes first, the column is dropped in a later migration.
- Soft delete on `User` (`deleted_at`), with anonymisation of past meetups.

## Clients

- **Web and mobile** call the same endpoints. Each client has its own interface, adapted to its platform. Shared code is limited to the types and the API client in `packages/`.
- **Navigation**: the web routes follow the application screens with React Router.
- **Back office**: a web interface reserved for `ROLE_ADMIN`, in the same API, for the catalogue, articles, editorial pages, moderation, administrator accounts and the audit log.

## Security

- **Roles**: `ROLE_USER` (player), `ROLE_PLACE` (venue manager), `ROLE_ADMIN` (moderation and catalogue).
- **Authentication**: email and password, JWT tokens with refresh.
- **Authorisation**: Symfony voters on every write endpoint.
- **Passwords**: hashed with Symfony's native hasher.
- **Secrets**: environment variables only, never in the repository.
- **Personal data**: GDPR (consent, export, deletion). Emails and passwords are never logged.
- **Audit log**: every administration action and every deletion is traced (actor, date, before and after values).
- **Legal pages**: terms of use, legal notice, cookie policy and consent banner, to be validated by a lawyer before going live.

## Integrations

| Service | Use | Status |
| --- | --- | --- |
| Web push notifications (PWA) | Notifications in the browser or the installed PWA | Planned (step 4, P1) |
| Transactional email | Password reset, notifications | European provider (e.g. Brevo) |
| Geocoding and distance | Venue addresses, "near me" search | OpenStreetMap (Nominatim) |
| File storage | Game and venue photos | S3-compatible object storage (e.g. OVH Object Storage) |
| Analytics | Matomo or Plausible (no consent needed) and Search Console | Planned (step 5) |
| Board game shop affiliation | Links to product pages, click tracking | Planned (step 4) |
| Payment (evolution) | Professional subscriptions and gift card, out of V1 | Stripe, plugged in with the subscriptions |

## Environments

| Environment | Contents | Status |
| --- | --- | --- |
| Local | Docker Compose (MariaDB or PostgreSQL), web, mobile and API dev servers | Set up in step 1 |
| Staging | Same services as production, test accounts per role | To set up (Vercel for the web, OVH France for the API) |
| Production | API and web; OVH France hosting (planned) | To set up before going live |

## Quality checks

Every pull request to `develop` runs the checks for the parts it touches: PHP-CS-Fixer, PHPStan, PHPUnit, ESLint, Vitest, Jest. Renovate keeps dependencies up to date.

## Decisions made

- **CMS**: no external CMS (WordPress or Drupal). Articles, news and editorial pages are managed in the application, through the back office, and stored by the API. Reason: one business logic and one authentication base.
- **Professional sign-up**: free at launch; subscriptions are an evolution.
- **API and database hosting**: OVH France (planned), a VPS sized at first at 2 vCPU and 4 GB of RAM.
- **Mapping**: OpenStreetMap (Leaflet, Nominatim), with no per-request cost unlike Google Maps.
- **Authentication**: JWT only (email and password); an external provider may be added later.
- **Photo storage**: S3-compatible object storage (e.g. OVH Object Storage).
- **Payment**: Stripe, for the subscription phase. No payment package is added before that phase, and it is then validated with the project owner.
