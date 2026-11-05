# Document d'exigences techniques (TRD)

## Plateformes

- **Web** : application React (navigateur), ordinateur et mobile.
- **PWA** : le site web est installable sur téléphone, avec notifications web (P1).
- **Mobile natif** : application React Native (Expo) pour iOS et Android, hors V1.
- **API** : backend Symfony, consommé par le web et le mobile.

## Frontend et hébergement

- **Web** : React 19, TypeScript, Vite, React Router. Build statique servi par un CDN (Vercel en préproduction, déjà utilisé pour les aperçus).
- **Mobile** : React Native 0.88 avec Expo, TypeScript. Hors V1 : seul le squelette reste en place ; les builds via EAS et la publication sur App Store et Google Play viendront après le web.
- **Environnement d'exécution** : Node.js 24 LTS pour les outils de build et le mobile.

## Backend et base de données

- **Framework** : Symfony 7 sur PHP 8.5, API Platform pour l'exposition REST (JSON), Doctrine ORM.
- **Base de données** : MariaDB 10 ou PostgreSQL 17, au choix, via `DATABASE_URL` ; en local via Docker Compose (MariaDB par défaut, PostgreSQL avec `make db-up DB=postgres`). Les migrations Doctrine sont relues pour les deux moteurs.
- **Hébergement de production** : OVH France (prévu par le business plan).
- **Stockage de fichiers** (photos de jeux et de lieux) : stockage objet compatible S3 (ex. OVH Object Storage).

## Authentification et rôles

- **Méthode** : email et mot de passe, jetons JWT, réinitialisation par email.
- **Rôles** :
  - `ROLE_USER` : joueur (créer une rencontre, rejoindre, noter, gérer son profil)
  - `ROLE_PLACE` : responsable de lieu (gérer son lieu et ses horaires)
  - `ROLE_ADMIN` : modération et gestion du catalogue

## Services externes

- **Notifications** : email transactionnel au lancement, via un fournisseur européen (ex. Brevo) ; notifications web push via la PWA (P1). Expo Push Notifications viendra avec l'application native.
- **Cartographie et géolocalisation** : OpenStreetMap avec une bibliothèque de carte libre (ex. Leaflet) et géocodage par Nominatim (recherche par distance, adresses des lieux). Pas de coût à la requête, contrairement à Google Maps.
- **Identifiants** : stockés uniquement dans les variables d'environnement, jamais dans le dépôt. Les comptes chez les fournisseurs appartiennent au porteur du projet.

## Architecture

```
[web React] ──┐
              ├── API REST (Symfony, API Platform) ── MariaDB / PostgreSQL
[mobile RN, hors V1] ──┘
                         └── services externes (email, push, géocodage)
```

- Une seule source de vérité : la logique métier vit dans `api/`. Web et mobile n'affichent et n'envoient que des données.
- `packages/` contient les types TypeScript et le client API générés depuis l'API, partagés entre web et mobile.
- Toute modification de l'API met à jour les types dans `packages/`.

## Sécurité et confidentialité

- **Données personnelles** : nom, pseudo, email, localisation approximative. Aucune localisation précise n'est stockée au-delà de l'adresse d'un lieu.
- **Contrôle d'accès** : chaque endpoint vérifie le rôle et la propriété de la ressource (un utilisateur ne modifie que ses rencontres et son profil).
- **Mots de passe** : hachage natif Symfony (`auto`), jamais en clair.
- **Conservation** : suppression du compte sur demande, avec anonymisation des rencontres passées.
- **Conformité** : RGPD (consentement, export et suppression des données).
- **Transport** : HTTPS uniquement.

## Pages légales et cookies

- **Pages obligatoires** : CGU, mentions légales, politique de confidentialité, politique de cookies. Les CGV seront ajoutées avec les abonnements (évolution).
- **Cookies** : bandeau au premier accès sur le web. Aucun cookie non essentiel avant acceptation ; refuser doit être aussi simple qu'accepter. Durée de conservation : 13 mois maximum.
- **Analyse d'audience** : Matomo ou Plausible (configurés sans consentement, sans cookie de suivi) et Search Console.
- **Validation** : les textes sont rédigés ou relus par un juriste avant la mise en ligne.
- **Marque et domaines** : dépôt de la marque à l'INPI prévu (business plan) ; domaines `ludmigo.fr` et `ludmigo.com` déjà achetés.

## Objectifs de performance et de fiabilité

- **Temps de réponse API** : p95 inférieur à 300 ms sur les endpoints de lecture.
- **Disponibilité** : 99,5 %, hors maintenance planifiée.
- **Sauvegardes** : sauvegarde quotidienne de la base, rétention 30 jours, test de restauration mensuel.

## Environnements et mise en production

- **Domaines** : `ludmigo.fr` (site et public français), `ludmigo.com` (site international).
- **Local** : Docker Compose pour MariaDB ou PostgreSQL, `npm run dev -w web`, `npm run start -w mobile`, `php bin/console` pour l'API.
- **Préproduction** : Vercel pour le web, OVH France pour l'API.
- **Production** : OVH France.
- **CI/CD** : lint, tests et analyses sur chaque pull request vers `develop` (PHP-CS-Fixer, PHPStan, PHPUnit, Vitest, Jest, lint JS/TS). Renovate pour les mises à jour de dépendances (déjà configuré).
- **Branches** : `develop` comme branche d'intégration, `feature/<sujet>` et `fix/<sujet>`, commits Conventional Commits.

## Décisions techniques clés et compromis

| Décision | Raison | Alternative écartée |
| --- | --- | --- |
| API unique Symfony pour web et mobile | Une seule logique métier, pas de duplication | Backend séparé par plateforme |
| Types TypeScript partagés via `packages/` | Éviter les écarts entre API et clients | Types écrits à la main dans chaque app |
| React Native (Expo) pour le mobile | Un seul langage (TypeScript) avec le web | Applications natives Swift et Kotlin |
| MariaDB et PostgreSQL au choix | Doctrine abstrait le moteur ; le choix se fait par `DATABASE_URL` | Un seul moteur imposé |
| Interfaces web et mobile séparées | UI adaptée à chaque plateforme, code partagé minimal | Un seul code multiplateforme pour le web et le mobile |
| Phosphor Icons pour les icônes | Une seule bibliothèque pour le web et le mobile, style cohérent, choisie par le porteur du projet | Lucide, autres bibliothèques d'icônes |
| Pas de CMS externe (WordPress, Drupal) | Une seule logique métier et un seul socle d'authentification ; le back office suffit | Un CMS séparé pour les contenus |
| Analyse d'audience sans consentement | Respect du RGPD et des règles sur les cookies, sans cookie de suivi | Analyse active par défaut avec cookies |
| Hébergement OVH France | Données en France, prévu par le business plan | Hébergeur hors UE |

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Technical Requirements Document (TRD)

## Platforms

- **Web**: React application (browser), desktop and mobile.
- **PWA**: the website is installable on a phone, with web notifications (P1).
- **Native mobile**: React Native (Expo) app for iOS and Android, out of V1.
- **API**: Symfony backend, used by the web and the mobile app.

## Frontend and hosting

- **Web**: React 19, TypeScript, Vite, React Router. Static build served by a CDN (Vercel in staging, already used for previews).
- **Mobile**: React Native 0.88 with Expo, TypeScript. Out of V1: only the skeleton stays in place; EAS builds and publication on the App Store and Google Play will come after the web.
- **Runtime**: Node.js 24 LTS for the build tools and the mobile app.

## Backend and database

- **Framework**: Symfony 7 on PHP 8.5, API Platform for the REST (JSON) exposure, Doctrine ORM.
- **Database**: MariaDB 10 or PostgreSQL 17, either one, through `DATABASE_URL`; locally via Docker Compose (MariaDB by default, PostgreSQL with `make db-up DB=postgres`). Doctrine migrations are reviewed for both engines.
- **Production hosting**: OVH France (planned by the business plan).
- **File storage** (game and venue photos): S3-compatible object storage (e.g. OVH Object Storage).

## Authentication and roles

- **Method**: email and password, JWT tokens, reset by email.
- **Roles**:
  - `ROLE_USER`: player (create a meetup, join, rate, manage their profile)
  - `ROLE_PLACE`: venue manager (manage their venue and its hours)
  - `ROLE_ADMIN`: moderation and catalogue management

## External services

- **Notifications**: transactional email at launch, through a European provider (e.g. Brevo); web push notifications through the PWA (P1). Expo Push Notifications will come with the native app.
- **Mapping and geolocation**: OpenStreetMap with a free map library (e.g. Leaflet) and geocoding by Nominatim (distance search, venue addresses). No per-request cost, unlike Google Maps.
- **Credentials**: stored only in environment variables, never in the repository. The accounts with providers belong to the project owner.

## Architecture

```
[React web] ──┐
              ├── REST API (Symfony, API Platform) ── MariaDB / PostgreSQL
[RN mobile, out of V1] ──┘
                         └── external services (email, push, geocoding)
```

- One source of truth: business logic lives in `api/`. Web and mobile only display and send data.
- `packages/` holds the TypeScript types and the API client generated from the API, shared between web and mobile.
- Any API change updates the types in `packages/`.

## Security and privacy

- **Personal data**: name, nickname, email, approximate location. No precise location is stored beyond a venue's address.
- **Access control**: every endpoint checks the role and ownership of the resource (a user only edits their own meetups and profile).
- **Passwords**: native Symfony hashing (`auto`), never in clear text.
- **Retention**: account deletion on request, with anonymisation of past meetups.
- **Compliance**: GDPR (consent, data export and deletion).
- **Transport**: HTTPS only.

## Legal pages and cookies

- **Required pages**: terms of use, legal notice, privacy policy, cookie policy. The terms of sale will be added with subscriptions (evolution).
- **Cookies**: banner on first visit on the web. No non-essential cookie before acceptance; refusing must be as easy as accepting. Retention: 13 months at most.
- **Analytics**: Matomo or Plausible (configured with no consent needed, no tracking cookie) and Search Console.
- **Validation**: the texts are written or reviewed by a lawyer before going live.
- **Brand and domains**: trademark filing at the INPI planned (business plan); domains `ludmigo.fr` and `ludmigo.com` already bought.

## Performance and reliability targets

- **API response time**: p95 under 300 ms on read endpoints.
- **Availability**: 99.5%, excluding planned maintenance.
- **Backups**: daily database backup, 30-day retention, monthly restore test.

## Environments and release

- **Domains**: `ludmigo.fr` (French site and public), `ludmigo.com` (international site).
- **Local**: Docker Compose for MariaDB or PostgreSQL, `npm run dev -w web`, `npm run start -w mobile`, `php bin/console` for the API.
- **Staging**: Vercel for the web, OVH France for the API.
- **Production**: OVH France.
- **CI/CD**: lint, tests and analyses on every pull request to `develop` (PHP-CS-Fixer, PHPStan, PHPUnit, Vitest, Jest, JS/TS lint). Renovate for dependency updates (already configured).
- **Branches**: `develop` as the integration branch, `feature/<topic>` and `fix/<topic>`, Conventional Commits.

## Key technical decisions and trade-offs

| Decision | Reason | Discarded alternative |
| --- | --- | --- |
| Single Symfony API for web and mobile | One business logic, no duplication | A separate backend per platform |
| TypeScript types shared through `packages/` | Avoid gaps between the API and the clients | Types written by hand in each app |
| React Native (Expo) for mobile | One language (TypeScript) shared with the web | Native Swift and Kotlin apps |
| MariaDB or PostgreSQL, either one | Doctrine abstracts the engine; the choice is made through `DATABASE_URL` | A single imposed engine |
| Separate web and mobile interfaces | UI adapted to each platform, minimal shared code | One cross-platform codebase for web and mobile |
| Phosphor Icons for icons | One library for web and mobile, consistent style, chosen by the project owner | Lucide, other icon libraries |
| No external CMS (WordPress, Drupal) | One business logic and one authentication base; the back office is enough | A separate CMS for content |
| Analytics with no consent needed | GDPR and cookie rules respected, no tracking cookie | Analytics active by default with cookies |
| OVH France hosting | Data in France, planned by the business plan | A host outside the EU |
