# Plan d'implémentation

## Ordre de livraison : par versions

1. **Version 1 (lancement, P0)** : les étapes 1 à 6, avec de l'étape 4 les éléments marqués P0.
2. **Version 1.1 (juste après, P1)** : le reste de l'étape 4 marqué P1 et les éléments P1 de l'étape 5.
3. **Version 2 (évolutions)** : abonnements avec paiement en ligne, chèque cadeau. Elle n'est pas planifiée ici.

## Étape 1 : mise en place du projet

- **Repo** : monorepo `api/`, `web/`, `mobile/`, `packages/`, déjà en place (README et Renovate).
- **Environnement** : Docker Compose pour MariaDB ou PostgreSQL, PHP 8.5, Node.js 24 LTS.
- **Dépendances** : `composer install` dans `api/`, `npm install` à la racine (workspaces).
- **Squelettes** : Symfony 7 et API Platform dans `api/`, Vite et React 19 dans `web/`, Expo dans `mobile/`, types partagés dans `packages/`.
- **Outils qualité** : PHP-CS-Fixer, PHPStan, ESLint, Vitest, Jest et PHPUnit configurés et lançables.
- **Déploiement** : hébergement de préproduction relié au dépôt : Vercel pour le web, OVH France pour l'API.

**Points de contrôle** :

- `docker compose up -d db` démarre.
- `php bin/console` répond ; `npm run dev -w web` affiche une page vide sur http://localhost:5173.
- `composer test`, `npm run test -w web` et `npm run test -w mobile` passent (même vides).

## Étape 2 : données et authentification

1. Entités Doctrine du schéma du backend, puis migration initiale.
2. Inscription, connexion, refresh token, réinitialisation du mot de passe.
3. Rôles `ROLE_USER`, `ROLE_PLACE`, `ROLE_ADMIN` et voters pour la propriété des ressources.
4. Fixtures : catalogue de départ, deux lieux de test, un compte administrateur.
5. Types partagés générés dans `packages/` pour les endpoints d'authentification.

**Tests** : PHPUnit pour les règles d'autorisation (un utilisateur ne modifie pas la ressource d'un autre) ; tests de validation des champs.

**Point de contrôle** : inscription, connexion et réinitialisation fonctionnent via l'API (vérifiées avec curl ou un client HTTP).

## Étape 3 : parcours utilisateur principal

Ordre conseillé : l'API d'abord, puis les écrans.

1. **API** : endpoints catalogue (`Game`), lieux (`Place`), rencontres (`Meetup`) en lecture, puis création et participation.
2. **Web** : Accueil, Recherche de rencontres, Détail d'une rencontre, action « Rejoindre ».
3. **Web** : Créer une rencontre, connexion depuis une action (retour automatique).
4. **Web sur téléphone** : mêmes parcours sur petit écran, navigation en onglets. L'application native est hors V1 (le squelette `mobile/` reste en place).
5. **Tests** : Vitest et Testing Library pour le web, tests API pour la capacité (places) et les doublons de participation.

**Point de contrôle** : le parcours « trouver et rejoindre une rencontre » fonctionne sur le web (ordinateur et téléphone), avec un compte de test.

## Étape 4 : compléments de lancement, puis P1

Les points 1 à 4 complètent le lancement ; les points 5 à 9 (P1) suivent juste après. Les epics E9 à E14 sont construits à cette étape, selon la colonne « Étape » des epics.

**Lancement**

1. Notifications par email : rencontre rejointe, quittée, annulée, rappel 24 h avant (E7).
2. Profil de lieu minimal : fiche (adresse, horaires, jeux) et événements du lieu (E9).
3. Soirées récurrentes des 5 à 10 bars partenaires, rejoignables comme une rencontre (E3, E9). Au début, l'équipe les saisit elle-même, avec l'outil d'administration minimal (E15-S4).
4. Carte d'exploration (E3), profil complet, suppression et export de compte (RGPD) (E1), signalement et modération minimale (E15-S3).

La charte graphique et les logos SVG sont dans `web/src/assets/logos/`.

**Juste après le lancement (P1)**

5. Avis et notes sur les jeux (E5).
6. Espace professionnel complet : jeux, publications, avis et rencontres du lieu (E9).
7. Blog, pages éditoriales et formulaire de contact simple (E11, E14).
8. Lien de groupe externe, export calendrier et badge « débutants bienvenus » (E13-S3, E4-S9).
9. Web push via la PWA (E8-S2).

Hors V1 : collection personnelle (E6), gamification (E12), messagerie intégrée (E13-S1, E13-S2), application native (E8-S1), rencontres chez un particulier.

**Point de contrôle** : chaque fonctionnalité a ses tests API et au moins un test d'écran.

## Étape 5 : qualité

- **Erreurs** : format d'erreur API unique (RFC 7807), messages affichés côté client sans détails techniques.
- **Accessibilité** : audit au clavier et au lecteur d'écran sur les parcours principaux ; contraste vérifié.
- **Sécurité** : contrôle de propriété sur chaque endpoint en écriture ; limitation de débit sur la connexion ; revue des secrets (aucun identifiant dans le dépôt) ; `composer audit` et `npm audit` lancés à chaque pull request et avant chaque mise en ligne ; toute faille haute ou critique est corrigée avant la mise en ligne.
- **Performance** : index vérifiés sur les filtres de recherche (`city`, `starts_at`, `game_id`) ; pagination de toutes les listes.
- **Hors ligne** : état de cache et bandeau réseau sur le web (PWA).
- **Back office et journal** : journal d'audit des actions de l'administration et de toutes les suppressions ; accès réservé à `ROLE_ADMIN` (E15).
- **Analyse d'audience et SEO** : Matomo ou Plausible (sans consentement) et Search Console ; sitemap et balises meta (E16).
- **Responsive** : contrôle des points de rupture de 360 × 640 à 1920 × 1080 px (E10-S5).

**Point de contrôle** : `composer cs:check`, `composer phpstan`, `npm run lint` et `npm run build -w web` passent.

## Étape 6 : mise en ligne

1. **Plan de test** : parcours principaux et alternatifs joués en préproduction, avec un compte de test par rôle.
2. **Déploiement** : API et web en préproduction, puis en production. Pas de build mobile : l'application native est hors V1.
3. **Sauvegardes** : sauvegarde de la base testée par une restauration **avant** la première mise en production.
4. **Retour arrière** : version précédente de l'API et du web conservée ; migrations réversibles ou compatibles avec la version précédente.
5. **Suivi** : journalisation des erreurs, alertes par email sur les erreurs 5xx avec Sentry, indicateurs du PRD suivis chaque semaine.
6. **Pages légales** : CGU, mentions légales, politique de cookies et bandeau de consentement, validés par un juriste avant la mise en ligne.
7. **Hébergement** : OVH France, préproduction et production préparées : un VPS pour l'API et la base de données, dimensionné au départ à 2 vCPU et 4 Go de RAM, à ajuster avec les mesures de la préproduction.

**Points de contrôle** :

- Tous les critères d'acceptation du PRD sont vérifiés en préproduction.
- Les pages légales sont validées et l'hébergement OVH France est opérationnel.
- Un retour arrière a été testé en préproduction.
- Les problèmes restants sont suivis en tant qu'issues GitHub, avec un libellé de priorité, sur le tableau du projet.

## Avant de passer à l'étape suivante

- Lancer l'application et vérifier les critères d'acceptation de l'étape.
- Noter tout problème non résolu.
- Ne pas démarrer une étape tant que le point de contrôle de la précédente n'est pas passé.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Implementation plan

## Delivery order: by versions

1. **Version 1 (launch, P0)**: steps 1 to 6, with the P0 items of step 4.
2. **Version 1.1 (right after, P1)**: the rest of step 4 marked P1 and the P1 items of step 5.
3. **Version 2 (evolutions)**: subscriptions with online payment, gift card. It is not planned here.

## Step 1: project setup

- **Repo**: `api/`, `web/`, `mobile/`, `packages/` monorepo, already in place (README and Renovate).
- **Environment**: Docker Compose for MariaDB or PostgreSQL, PHP 8.5, Node.js 24 LTS.
- **Dependencies**: `composer install` in `api/`, `npm install` at the root (workspaces).
- **Skeletons**: Symfony 7 and API Platform in `api/`, Vite and React 19 in `web/`, Expo in `mobile/`, shared types in `packages/`.
- **Quality tools**: PHP-CS-Fixer, PHPStan, ESLint, Vitest, Jest and PHPUnit configured and runnable.
- **Deployment**: staging hosting connected to the repository: Vercel for the web, OVH France for the API.

**Checkpoints**:

- `docker compose up -d db` starts.
- `php bin/console` responds; `npm run dev -w web` shows an empty page on http://localhost:5173.
- `composer test`, `npm run test -w web` and `npm run test -w mobile` pass (even when empty).

## Step 2: data and authentication

1. Doctrine entities from the backend schema, then the initial migration.
2. Sign-up, sign-in, refresh token, password reset.
3. Roles `ROLE_USER`, `ROLE_PLACE`, `ROLE_ADMIN` and voters for resource ownership.
4. Fixtures: starter catalogue, two test venues, an administrator account.
5. Shared types generated in `packages/` for the authentication endpoints.

**Tests**: PHPUnit for the authorisation rules (a user does not edit another user's resource); field validation tests.

**Checkpoint**: sign-up, sign-in and reset work through the API (checked with curl or an HTTP client).

## Step 3: main user flow

Recommended order: the API first, then the screens.

1. **API**: catalogue (`Game`), venue (`Place`) and meetup (`Meetup`) endpoints for reading, then creation and participation.
2. **Web**: Home, Meetup search, Meetup detail, "Join" action.
3. **Web**: Create a meetup, sign-in from an action (automatic return).
4. **Web on a phone**: same flows on a small screen, tab navigation. The native app is out of V1 (the `mobile/` skeleton stays in place).
5. **Tests**: Vitest and Testing Library for the web, API tests for capacity (seats) and duplicate participations.

**Checkpoint**: the "find and join a meetup" flow works on the web (computer and phone), with a test account.

## Step 4: launch additions, then P1

Items 1 to 4 complete the launch; items 5 to 9 (P1) follow right after. Epics E9 to E14 are built at this step, following the "Step" column of the epics.

**Launch**

1. Email notifications: meetup joined, left, cancelled, reminder 24 h before (E7).
2. Minimal venue profile: page (address, hours, games) and venue events (E9).
3. Recurring evenings of the 5 to 10 partner bars, joinable like a meetup (E3, E9). At first, the team enters them itself, with the minimal admin tool (E15-S4).
4. Exploration map (E3), full profile, account deletion and export (GDPR) (E1), reporting and minimal moderation (E15-S3).

The visual identity and the SVG logos are in `web/src/assets/logos/`.

**Right after the launch (P1)**

5. Reviews and ratings on games (E5).
6. Full professional area: games, posts, reviews and meetups of the venue (E9).
7. Blog, editorial pages and simple contact form (E11, E14).
8. External group link, calendar export and "beginners welcome" badge (E13-S3, E4-S9).
9. Web push through the PWA (E8-S2).

Out of V1: personal collection (E6), gamification (E12), built-in messaging (E13-S1, E13-S2), native app (E8-S1), meetups at a private home.

**Checkpoint**: every feature has its API tests and at least one screen test.

## Step 5: quality

- **Errors**: a single API error format (RFC 7807), messages shown on the client with no technical detail.
- **Accessibility**: keyboard and screen reader audit on the main flows; contrast checked.
- **Security**: ownership check on every write endpoint; rate limiting on sign-in; secrets review (no credentials in the repository); `composer audit` and `npm audit` run on every pull request and before every release; any high or critical vulnerability is fixed before going live.
- **Performance**: indexes checked on the search filters (`city`, `starts_at`, `game_id`); pagination on all lists.
- **Offline**: cache state and network banner on the web (PWA).
- **Back office and log**: audit log of administration actions and all deletions; access reserved for `ROLE_ADMIN` (E15).
- **Analytics and SEO**: Matomo or Plausible (no consent needed) and Search Console; sitemap and meta tags (E16).
- **Responsive**: breakpoints checked from 360 × 640 to 1920 × 1080 px (E10-S5).

**Checkpoint**: `composer cs:check`, `composer phpstan`, `npm run lint` and `npm run build -w web` pass.

## Step 6: going live

1. **Test plan**: main and alternative flows played on staging, with one test account per role.
2. **Deployment**: API and web to staging, then to production. No mobile build: the native app is out of V1.
3. **Backups**: database backup tested by a restore **before** the first production release.
4. **Rollback**: previous version of the API and the web kept; migrations reversible or compatible with the previous version.
5. **Monitoring**: error logging, email alerts on 5xx errors with Sentry, PRD indicators followed every week.
6. **Legal pages**: terms of use, legal notice, cookie policy and consent banner, validated by a lawyer before going live.
7. **Hosting**: OVH France, staging and production prepared: one VPS for the API and the database, sized at first at 2 vCPU and 4 GB of RAM, to adjust with staging measurements.

**Checkpoints**:

- All PRD acceptance criteria are verified on staging.
- The legal pages are validated and the OVH France hosting is operational.
- A rollback has been tested on staging.
- Remaining problems are tracked as GitHub issues, with a priority label, on the project board.

## Before moving to the next step

- Run the application and check the step's acceptance criteria.
- Note any unresolved problem.
- Do not start a step until the previous step's checkpoint has passed.
