# Parcours de l'appli

## Points d'entrée

- Ouverture du site web ou de la PWA installée (accès direct).
- Lien partagé vers une rencontre, une fiche de jeu ou un lieu (lien profond).
- Email de notification (rencontre rejointe, rappel, annulation) ; notification web push avec la PWA (P1).
- Accès depuis les lieux partenaires : QR code sur une affiche.

## Liste des écrans

| Écran | Rôle | Données nécessaires |
| --- | --- | --- |
| Accueil | Rencontres proches et prochaines, jeux mis en avant | Rencontres à venir, localisation (optionnelle) |
| Recherche de rencontres | Filtrer par jeu, lieu, date, nombre de places | Rencontres, jeux, lieux |
| Détail d'une rencontre | Voir le jeu, le lieu, les participants, rejoindre | Rencontre, participants, statut de l'utilisateur |
| Créer une rencontre | Choisir un jeu, un lieu, une date, un nombre de places | Jeux, lieux, utilisateur connecté |
| Gestion des demandes (organisateur) | Accepter ou refuser les joueurs qui demandent à rejoindre | Demandes, participants |
| Catalogue de jeux | Parcourir et filtrer les jeux | Jeux (nom, joueurs, durée, niveau) |
| Fiche de jeu | Description, avis, rencontres liées | Jeu, avis, rencontres |
| Carte d'exploration | Carte interactive des lieux et des rencontres, filtres par catégorie et ville, recherche par mots-clés | Lieux publics, rencontres |
| Fiche de lieu | Adresse, horaires, jeux, événements, rencontres du lieu | Lieu, rencontres |
| Connexion / inscription | Créer ou retrouver son compte | Identifiants |
| Réinitialisation du mot de passe | Recevoir un lien par email | Email |
| Profil | Infos personnelles, rencontres passées et à venir | Utilisateur, rencontres |
| Paramètres | Compte, préférences d'email, export et suppression du compte | Utilisateur |
| Inscription professionnelle | Créer le compte d'un lieu (gratuit au lancement) | Identifiants, informations du lieu |
| Tableau de bord du lieu | Gérer la fiche : horaires, jeux, événements et soirées récurrentes, publications, photos, avis ; statistiques hors V1 | Lieu, événements, avis |
| Blog et actualités | Lire les articles publiés | Articles publiés |
| Pages éditoriales | Lire les pages « à propos » et informations pratiques | Pages éditoriales |
| Contact | Formulaire avec choix du sujet, puis page de confirmation | Sujets : question, bug, partenariat, presse, autre |
| Groupe de la rencontre (P1) | Lien vers le groupe externe et export calendrier, réservés aux participants acceptés | Lien du groupe, date de la rencontre |
| Mentions légales et cookies | CGU, mentions légales, politique de cookies | Pages légales |
| Back office (administrateur) | Catalogue, articles, pages, modération, comptes, journal d'audit ; interface web séparée, réservée à `ROLE_ADMIN` | Données de gestion |

## Parcours principaux

**Trouver et rejoindre une rencontre**

Accueil → « Rechercher » (saisir ou choisir les filtres) → Recherche de rencontres (réussite : liste de résultats) → Détail d'une rencontre (« Rejoindre ») → Détail d'une rencontre (réussite : « Vous participez »)

**Créer une rencontre**

Accueil → « Créer » → Créer une rencontre (valider) → Détail de la rencontre créée (réussite : rencontre visible dans la recherche)

**Inscrire son lieu (gestionnaire)**

Connexion ou inscription → « Inscrire mon lieu » → Inscription professionnelle (valider) → Tableau de bord du lieu (réussite : fiche créée, en attente d'activation)

**Publier un événement (gestionnaire de lieu)**

Tableau de bord du lieu → « Événements » → « Créer » → formulaire (publier) → Tableau de bord (réussite : événement visible sur la fiche du lieu)

## Parcours alternatifs

- **Annuler sa participation** : Détail d'une rencontre → « Quitter » → confirmation → retour à la liste.
- **Modifier une rencontre** : Détail → « Modifier » (organisateur uniquement) → Créer une rencontre en mode édition.
- **Rejoindre sans être connecté** : « Rejoindre » → Connexion → retour automatique au Détail de la rencontre.
- **Passer une étape d'onboarding** : « Plus tard » sur la sélection des jeux préférés.
- **Valider un joueur** : Détail d'une rencontre → « Demandes » → « Accepter » ou « Refuser ». Le joueur est prévenu par notification.
- **Donner un avis** : fiche de jeu ou de lieu → « Donner un avis » (disponible seulement après une participation acceptée) → note et commentaire → retour à la fiche.
- **Envoyer une demande de contact** : Contact → choix du sujet → formulaire → page de confirmation.
- **Annuler sa rencontre** : Détail d'une rencontre → « Annuler la rencontre » (organisateur uniquement) → confirmation → les participants sont prévenus par email.
- **Signaler un contenu** : avis, profil ou rencontre → « Signaler » → motif → confirmation.
- **Exporter ou supprimer son compte** : Paramètres → « Exporter mes données » ou « Supprimer mon compte » → confirmation.
- **Programmer une soirée récurrente** : Tableau de bord du lieu → « Événements » → « Créer » → répétition (par exemple chaque jeudi) → publier.

## Détail des actions

Pour chaque action : déclencheur, validation, chargement, succès, erreur, écran suivant.

| Action | Déclencheur | Validation | Chargement | Succès | Erreur | Écran suivant |
| --- | --- | --- | --- | --- | --- | --- |
| Rejoindre une rencontre | Bouton « Rejoindre » | Connecté et place libre | Bouton désactivé, spinner | Participant ajouté, compteur mis à jour | « Complet » ou « Échec, réessayez » | Détail (mis à jour) |
| Demander à rejoindre (validation manuelle) | Bouton « Demander à rejoindre » | Connecté, place libre | Bouton désactivé | « Demande envoyée » ; place prise seulement après acceptation | « Échec, réessayez » | Détail (demande en attente) |
| Quitter une rencontre | Bouton « Quitter » | Confirmation | Bouton désactivé | Participant retiré | Échec réseau | Détail |
| Créer une rencontre | Bouton « Publier » | Jeu, lieu, date future, places ≥ 2 | Bouton désactivé | Confirmation | Champs en erreur sous le formulaire | Détail de la rencontre |
| Accepter ou refuser un joueur | Boutons « Accepter » et « Refuser » | Rencontre non commencée | Bouton désactivé | Liste mise à jour, joueur notifié | Échec réseau | Demandes |
| Annuler une rencontre | Bouton « Annuler la rencontre » | Organisateur, confirmation | Bouton désactivé | Rencontre annulée, participants prévenus par email | Échec réseau | Détail |
| Inscription | Bouton « Créer mon compte » | Email valide, mot de passe ≥ 12 caractères | Bouton désactivé | Connecté | Email déjà utilisé, champ invalide | Accueil |
| Connexion | Bouton « Se connecter » | Email et mot de passe renseignés | Bouton désactivé | Connecté | « Identifiants incorrects » | Écran précédent ou Accueil |
| Réinitialiser le mot de passe | Lien « Mot de passe oublié » | Email valide | Bouton désactivé | « Email envoyé » (message neutre) | Erreur réseau | Connexion |
| Publier un avis | Bouton « Donner un avis » | Participation acceptée, une seule fois par jeu ou lieu | Bouton désactivé | Avis affiché | « Avis impossible sans participation » | Fiche |
| Publier un événement (lieu) | Bouton « Publier » | Titre, date future | Bouton désactivé | Événement visible sur la fiche du lieu | Champs en erreur | Tableau de bord |
| Programmer une soirée récurrente (lieu) | Bouton « Publier » | Titre, date future, règle de répétition valide | Bouton désactivé | Chaque occurrence visible comme une rencontre | Champs en erreur | Tableau de bord |
| Envoyer le formulaire de contact | Bouton « Envoyer » | Sujet, nom, email, message | Bouton désactivé | Page de confirmation | Champs en erreur | Confirmation |
| Signaler un contenu | Bouton « Signaler » | Connecté, motif renseigné | Bouton désactivé | « Signalement envoyé » | « Échec, réessayez » | Écran d'origine |
| Exporter mes données | Bouton « Exporter mes données » | Connecté | Bouton désactivé | Fichier de données téléchargé | Échec réseau | Paramètres |

## Règles de navigation

- **Onglets (mobile)** : Accueil, Rechercher, Créer, Jeux, Profil.
- **Bouton retour** : revient à l'écran précédent ; après une connexion depuis une action, revient à l'action d'origine.
- **Liens profonds** : `/rencontres/:id`, `/jeux/:id`, `/lieux/:id` s'ouvrent directement, même non connecté (lecture seule).
- **Accès gestionnaire de lieu** : l'onglet « Mon lieu » n'apparaît que pour un compte `ROLE_PLACE`.
- **Back office** : web uniquement, réservé à `ROLE_ADMIN`.

## États vides et bloqués

- **Aucune rencontre trouvée** : message et proposition d'élargir la zone ou la date.
- **Permission de localisation refusée** : recherche par ville saisie à la place.
- **Hors ligne** : bandeau « Pas de connexion » ; données en cache affichées en lecture seule ; actions d'écriture désactivées.
- **Session expirée** : redirection vers la connexion avec le message « Reconnectez-vous ».
- **Rencontre supprimée ou annulée** : écran « Cette rencontre n'est plus disponible » avec lien vers la recherche.
- **Lieu en attente d'activation** : fiche visible seulement par son gestionnaire, avec le message « Votre lieu est en cours de validation ».
- **Aucun événement ou article** : message neutre avec un lien vers la carte ou le blog.
- **Demande en attente** : sur la rencontre, le bouton devient « Demande envoyée » et est désactivé.

## Première utilisation

1. Écran d'accueil de présentation (une phrase, un bouton « Découvrir »).
2. Inscription (email, mot de passe, pseudo).
3. Choix facultatif de 3 jeux préférés (passable).
4. Autorisation de localisation (facultative, expliquée).
5. Arrivée sur l'Accueil avec les rencontres proches.
6. Bandeau de cookies sur le web : accepter, refuser ou ignorer. Sans choix, aucun cookie non essentiel n'est déposé.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# App flow

## Entry points

- Opening the website or the installed PWA (direct access).
- Shared link to a meetup, a game page or a venue (deep link).
- Notification email (meetup joined, reminder, cancellation); web push notification with the PWA (P1).
- Access from partner venues: QR code on a poster.

## Screen list

| Screen | Role | Data needed |
| --- | --- | --- |
| Home | Nearby and upcoming meetups, featured games | Upcoming meetups, location (optional) |
| Meetup search | Filter by game, venue, date, number of seats | Meetups, games, venues |
| Meetup detail | See the game, the venue, the participants, join | Meetup, participants, user status |
| Create a meetup | Choose a game, a venue, a date, a number of seats | Games, venues, signed-in user |
| Request management (organiser) | Accept or refuse the players who ask to join | Requests, participants |
| Game catalogue | Browse and filter games | Games (name, players, duration, level) |
| Game page | Description, reviews, related meetups | Game, reviews, meetups |
| Exploration map | Interactive map of venues and meetups, filters by category and city, keyword search | Public venues, meetups |
| Venue page | Address, hours, games, events, venue meetups | Venue, meetups |
| Sign-in / sign-up | Create or recover an account | Credentials |
| Password reset | Receive a link by email | Email |
| Profile | Personal info, past and upcoming meetups | User, meetups |
| Settings | Account, email preferences, account export and deletion | User |
| Professional sign-up | Create a venue's account (free at launch) | Credentials, venue information |
| Venue dashboard | Manage the page: hours, games, events and recurring evenings, posts, photos, reviews; statistics out of V1 | Venue, events, reviews |
| Blog and news | Read published articles | Published articles |
| Editorial pages | Read the "about" and practical information pages | Editorial pages |
| Contact | Form with a choice of subject, then a confirmation page | Subjects: question, bug, partnership, press, other |
| Meetup group (P1) | Link to the external group and calendar export, reserved for accepted participants | Group link, meetup date |
| Legal notice and cookies | Terms of use, legal notice, cookie policy | Legal pages |
| Back office (administrator) | Catalogue, articles, pages, moderation, accounts, audit log; separate web interface, reserved for `ROLE_ADMIN` | Management data |

## Main flows

**Find and join a meetup**

Home → "Search" (enter or pick the filters) → Meetup search (success: list of results) → Meetup detail ("Join") → Meetup detail (success: "You are taking part")

**Create a meetup**

Home → "Create" → Create a meetup (submit) → Detail of the created meetup (success: meetup visible in the search)

**Register a venue (manager)**

Sign-in or sign-up → "Register my venue" → Professional sign-up (submit) → Venue dashboard (success: page created, awaiting activation)

**Publish an event (venue manager)**

Venue dashboard → "Events" → "Create" → form (publish) → Dashboard (success: event visible on the venue page)

## Alternative flows

- **Cancel your participation**: Meetup detail → "Leave" → confirmation → back to the list.
- **Edit a meetup**: Detail → "Edit" (organiser only) → Create a meetup in edit mode.
- **Join without being signed in**: "Join" → Sign-in → automatic return to the Meetup detail.
- **Skip an onboarding step**: "Later" on the favourite games selection.
- **Validate a player**: Meetup detail → "Requests" → "Accept" or "Refuse". The player is warned by notification.
- **Leave a review**: game or venue page → "Leave a review" (available only after an accepted participation) → rating and comment → back to the page.
- **Send a contact request**: Contact → choice of subject → form → confirmation page.
- **Cancel your meetup**: Meetup detail → "Cancel the meetup" (organiser only) → confirmation → participants are warned by email.
- **Report content**: review, profile or meetup → "Report" → reason → confirmation.
- **Export or delete your account**: Settings → "Export my data" or "Delete my account" → confirmation.
- **Schedule a recurring evening**: Venue dashboard → "Events" → "Create" → repetition (for example every Thursday) → publish.

## Action details

For each action: trigger, validation, loading, success, error, next screen.

| Action | Trigger | Validation | Loading | Success | Error | Next screen |
| --- | --- | --- | --- | --- | --- | --- |
| Join a meetup | "Join" button | Signed in and seat available | Button disabled, spinner | Participant added, counter updated | "Full" or "Failed, try again" | Detail (updated) |
| Ask to join (manual validation) | "Ask to join" button | Signed in, seat available | Button disabled | "Request sent"; seat taken only after acceptance | "Failed, try again" | Detail (request pending) |
| Leave a meetup | "Leave" button | Confirmation | Button disabled | Participant removed | Network failure | Detail |
| Create a meetup | "Publish" button | Game, venue, future date, seats ≥ 2 | Button disabled | Confirmation | Fields in error under the form | Meetup detail |
| Accept or refuse a player | "Accept" and "Refuse" buttons | Meetup not started | Button disabled | List updated, player notified | Network failure | Requests |
| Cancel a meetup | "Cancel the meetup" button | Organiser, confirmation | Button disabled | Meetup cancelled, participants warned by email | Network failure | Detail |
| Sign-up | "Create my account" button | Valid email, password ≥ 12 characters | Button disabled | Signed in | Email already used, invalid field | Home |
| Sign-in | "Sign in" button | Email and password filled in | Button disabled | Signed in | "Incorrect credentials" | Previous screen or Home |
| Reset the password | "Forgot password" link | Valid email | Button disabled | "Email sent" (neutral message) | Network error | Sign-in |
| Publish a review | "Leave a review" button | Accepted participation, once per game or venue | Button disabled | Review displayed | "Review impossible without participation" | Page |
| Publish an event (venue) | "Publish" button | Title, future date | Button disabled | Event visible on the venue page | Fields in error | Dashboard |
| Schedule a recurring evening (venue) | "Publish" button | Title, future date, valid repetition rule | Button disabled | Each occurrence visible as a meetup | Fields in error | Dashboard |
| Send the contact form | "Send" button | Subject, name, email, message | Button disabled | Confirmation page | Fields in error | Confirmation |
| Report content | "Report" button | Signed in, reason filled in | Button disabled | "Report sent" | "Failed, try again" | Original screen |
| Export my data | "Export my data" button | Signed in | Button disabled | Data file downloaded | Network failure | Settings |

## Navigation rules

- **Tabs (mobile)**: Home, Search, Create, Games, Profile.
- **Back button**: returns to the previous screen; after signing in from an action, returns to the original action.
- **Deep links**: `/rencontres/:id`, `/jeux/:id`, `/lieux/:id` open directly, even when signed out (read-only).
- **Venue manager access**: the "My venue" tab only appears for a `ROLE_PLACE` account.
- **Back office**: web only, reserved for `ROLE_ADMIN`.

## Empty and blocked states

- **No meetup found**: message and a suggestion to widen the area or the date.
- **Location permission denied**: search by typed city instead.
- **Offline**: "No connection" banner; cached data shown read-only; write actions disabled.
- **Session expired**: redirect to sign-in with the message "Please sign in again".
- **Meetup deleted or cancelled**: "This meetup is no longer available" screen with a link to the search.
- **Venue awaiting activation**: page visible only to its manager, with the message "Your venue is being validated".
- **No event or article**: neutral message with a link to the map or the blog.
- **Request pending**: on the meetup, the button becomes "Request sent" and is disabled.

## First use

1. Welcome screen (one sentence, a "Discover" button).
2. Sign-up (email, password, nickname).
3. Optional choice of 3 favourite games (skippable).
4. Location permission (optional, explained).
5. Arrival on Home with nearby meetups.
6. Cookie banner on the web: accept, refuse or ignore. Without a choice, no non-essential cookie is set.
