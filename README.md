![PHP](https://img.shields.io/badge/PHP-8.5-777BB4)
![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E)
![Symfony](https://img.shields.io/badge/Symfony-7-000000)
![React](https://img.shields.io/badge/React-19-61DAFB)
![React Native](https://img.shields.io/badge/React%20Native-0.88-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6)
![MariaDB](https://img.shields.io/badge/MariaDB-10.11-003545)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Kustomize-326CE5)

---

# Ludmigo | Démocratisons le jeu !

Ludmigo est une plateforme communautaire pour partager et découvrir les jeux de société,
et faciliter la rencontre entre joueurs et lieux de jeu.

Débutant ou joueur confirmé, peu importe : ce qui compte, c'est l'envie de partager un moment
convivial autour d'un jeu. Les rencontres peuvent avoir lieu dans les espaces dédiés déjà présents
dans une ville, ou dans des bars que nous accompagnons pour développer ce service dans leur établissement.

## Périmètre de la V1

- Lancement dans la grande région Ouest pour l'instant ; le projet ne couvre que la France.
- Utilisation gratuite pour les joueurs.
- Inscription gratuite pour les lieux (bars, ludothèques, associations, boutiques) au lancement.
- Les abonnements professionnels avec paiement en ligne et le chèque cadeau sont prévus dans une évolution ultérieure.

## Documentation

Les documents de conception sont dans [`docs/`](docs/) : brief projet, PRD, architecture, TRD, schéma backend, parcours, UI/UX, epics, plan d'implémentation et Kanban. Ils sont écrits en français, suivis de leur traduction anglaise.

## Stack technique

| Couche | Technologies |
| --- | --- |
| **Backend (API)** | [Symfony](https://symfony.com) 7, PHP 8.5, API Platform, Doctrine ORM |
| **Base de données** | MariaDB 10 |
| **Web (frontend)** | [React](https://react.dev) 19, TypeScript, Vite, React Router |
| **Mobile (iOS & Android)** | [React Native](https://reactnative.dev) (Expo), TypeScript |
| **Client API partagé** | Types TypeScript générés depuis l'API, partagés entre web et mobile |
| **Tests** | PHPUnit (API), Vitest + Testing Library (web), Jest (mobile) |
| **Environnement local** | Docker Compose |

L'API Symfony expose les données via une API REST (JSON). Les applications web et mobile
consomment cette même API, ce qui garantit une logique métier unique.

## Architecture

```
ludmigo/
├── api/        # Backend Symfony (API REST, authentification, métier)
├── web/        # Application React (navigateur)
├── mobile/     # Application React Native (iOS & Android)
├── packages/   # Code partagé entre web et mobile (types, client API, validation)
├── docker-compose.yml  # Services locaux (MariaDB)
└── README.md
```

Principes :

- **Une seule source de vérité** : la logique métier vit dans `api/`. Web et mobile n'affichent
  et n'envoient que des données.
- **Contrats typés** : les réponses de l'API sont typées côté front via `packages/`, pour éviter
  les écarts entre le backend et les clients.
- **Mobile et web séparés** : deux applications distinctes, avec un code partagé minimal
  (logique, types, validations) et une UI spécifique à chaque plateforme.

> Le dépôt ne contient pour l'instant que la documentation : les dossiers ci-dessus sont la cible d'architecture, à mettre en place au fil du développement.

## Prérequis

- [PHP](https://www.php.net) 8.5 avec les extensions requises par Symfony
- [Composer](https://getcomposer.org) 2
- [Docker](https://www.docker.com) (Docker Desktop ou Docker Engine avec Compose) pour MariaDB
- [Node.js](https://nodejs.org) 24 LTS et npm
- Pour le mobile :
  - macOS avec [Xcode](https://developer.apple.com/xcode/) (simulateur iOS)
  - [Android Studio](https://developer.android.com/studio) (émulateur Android)
  - Un compte [Expo](https://expo.dev) si vous utilisez EAS pour les builds

## Installation

```bash
# 1. Clone the repository
# 1. Cloner le dépôt
git clone git@github.com:<organisation>/ludmigo.git
cd ludmigo

# 2. Start the MariaDB database
# 2. Démarrer la base de données MariaDB
docker compose up -d db

# 3. Install and configure the API
# 3. Installer et configurer l'API
cd api
composer install
# Copy the env file, then adjust the variables if needed
# Copier le fichier d'environnement, puis adapter les variables si besoin
cp .env .env.local
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction

# 4. Install JavaScript dependencies (workspaces)
# 4. Installer les dépendances JavaScript (workspaces)
cd ..
npm install

# 5. Start the web app (http://localhost:5173)
# 5. Lancer le web (http://localhost:5173)
npm run dev -w web

# 6. Start the mobile app, then press 'i' (iOS) or 'a' (Android)
# 6. Lancer le mobile, puis 'i' (iOS) ou 'a' (Android)
npm run start -w mobile
```

## Commandes utiles

| Action | Commande |
| --- | --- |
| Démarrer la base de données | `docker compose up -d db` |
| Arrêter la base de données | `docker compose stop db` |
| Console Symfony (dans `api/`) | `php bin/console` |
| Créer une migration | `php bin/console make:migration` |
| Appliquer les migrations | `php bin/console doctrine:migrations:migrate` |
| Lint PHP (PHP-CS-Fixer) | `composer cs:check` |
| Analyse statique PHP (PHPStan) | `composer phpstan` |
| Build web | `npm run build -w web` |
| Lint JS/TS | `npm run lint` |
| Lancer le mobile | `npm run start -w mobile` |
| Build iOS / Android (EAS) | `npx eas build --platform ios` / `--platform android` |

## Tests

```bash
# API (PHPUnit, from api/)
# API (PHPUnit, depuis api/)
composer test

# Web (Vitest)
npm run test -w web

# Mobile (Jest)
npm run test -w mobile
```

## Contribuer

1. Créez une branche depuis `develop` : `feature/<sujet>` ou `fix/<sujet>`.
2. Suivez la convention [Conventional Commits](https://www.conventionalcommits.org) :
   `feat(api): ...`, `fix(web): ...`, `docs(readme): ...`.
3. Vérifiez que les tests et les linters passent avant d'ouvrir une Pull Request vers `develop`.
4. Une modification d'API doit être accompagnée de la mise à jour des types partagés dans `packages/`.
5. Les commentaires et la documentation s'écrivent en français, suivis de leur traduction anglaise.

## Licence

Ce projet est sous licence [MIT](LICENSE). *(Fichier `LICENSE` à ajouter.)*

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Ludmigo | Let's democratise board gaming!

Ludmigo is a community platform for sharing and discovering board games, and for making it easier for players to meet and play at game venues.

Beginner or experienced player, it doesn't matter: what counts is the wish to share a friendly moment around a game. Meetups can take place in the dedicated spaces already present in a city, or in bars we support to develop this service in their venue.

## Scope of V1

- Launch in the Grand Ouest region for now; the project covers France only.
- Free for players.
- Free sign-up for venues (bars, game libraries, associations, shops) at launch.
- Professional subscriptions with online payment and the gift card are planned as a later evolution.

## Documentation

The design documents are in [`docs/`](docs/): project brief, PRD, architecture, TRD, backend schema, app flow, UI/UX design, epics, implementation plan and Kanban. They are written in French, followed by their English translation.

## Tech stack

| Layer | Technologies |
| --- | --- |
| **Backend (API)** | [Symfony](https://symfony.com) 7, PHP 8.5, API Platform, Doctrine ORM |
| **Database** | MariaDB 10 |
| **Web (frontend)** | [React](https://react.dev) 19, TypeScript, Vite, React Router |
| **Mobile (iOS & Android)** | [React Native](https://reactnative.dev) (Expo), TypeScript |
| **Shared API client** | TypeScript types generated from the API, shared between web and mobile |
| **Tests** | PHPUnit (API), Vitest + Testing Library (web), Jest (mobile) |
| **Local environment** | Docker Compose |

The Symfony API exposes data through a REST API (JSON). The web and mobile apps consume this same API, which guarantees a single business logic.

## Architecture

```
ludmigo/
├── api/        # Backend Symfony (API REST, authentification, métier)
├── web/        # Application React (navigateur)
├── mobile/     # Application React Native (iOS & Android)
├── packages/   # Code partagé entre web et mobile (types, client API, validation)
├── docker-compose.yml  # Services locaux (MariaDB)
└── README.md
```

Principles:

- **Single source of truth**: business logic lives in `api/`. Web and mobile only display and send data.
- **Typed contracts**: API responses are typed on the front end via `packages/`, to avoid mismatches between the backend and the clients.
- **Separate mobile and web apps**: two distinct applications, with minimal shared code (logic, types, validations) and a UI specific to each platform.

> The repository currently contains only the documentation: the folders above are the architecture target, to be built as development goes on.

## Prerequisites

- [PHP](https://www.php.net) 8.5 with the extensions required by Symfony
- [Composer](https://getcomposer.org) 2
- [Docker](https://www.docker.com) (Docker Desktop or Docker Engine with Compose) for MariaDB
- [Node.js](https://nodejs.org) 24 LTS and npm
- For mobile:
  - macOS with [Xcode](https://developer.apple.com/xcode/) (iOS simulator)
  - [Android Studio](https://developer.android.com/studio) (Android emulator)
  - An [Expo](https://expo.dev) account if you use EAS for builds

## Installation

```bash
# 1. Clone the repository
# 1. Cloner le dépôt
git clone git@github.com:<organisation>/ludmigo.git
cd ludmigo

# 2. Start the MariaDB database
# 2. Démarrer la base de données MariaDB
docker compose up -d db

# 3. Install and configure the API
# 3. Installer et configurer l'API
cd api
composer install
# Copy the env file, then adjust the variables if needed
# Copier le fichier d'environnement, puis adapter les variables si besoin
cp .env .env.local
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction

# 4. Install JavaScript dependencies (workspaces)
# 4. Installer les dépendances JavaScript (workspaces)
cd ..
npm install

# 5. Start the web app (http://localhost:5173)
# 5. Lancer le web (http://localhost:5173)
npm run dev -w web

# 6. Start the mobile app, then press 'i' (iOS) or 'a' (Android)
# 6. Lancer le mobile, puis 'i' (iOS) ou 'a' (Android)
npm run start -w mobile
```

## Useful commands

| Action | Command |
| --- | --- |
| Start the database | `docker compose up -d db` |
| Stop the database | `docker compose stop db` |
| Symfony console (in `api/`) | `php bin/console` |
| Create a migration | `php bin/console make:migration` |
| Apply migrations | `php bin/console doctrine:migrations:migrate` |
| PHP lint (PHP-CS-Fixer) | `composer cs:check` |
| PHP static analysis (PHPStan) | `composer phpstan` |
| Web build | `npm run build -w web` |
| JS/TS lint | `npm run lint` |
| Start mobile | `npm run start -w mobile` |
| iOS / Android build (EAS) | `npx eas build --platform ios` / `--platform android` |

## Tests

```bash
# API (PHPUnit, from api/)
# API (PHPUnit, depuis api/)
composer test

# Web (Vitest)
npm run test -w web

# Mobile (Jest)
npm run test -w mobile
```

## Contributing

1. Create a branch from `develop`: `feature/<topic>` or `fix/<topic>`.
2. Follow the [Conventional Commits](https://www.conventionalcommits.org) convention: `feat(api): ...`, `fix(web): ...`, `docs(readme): ...`.
3. Make sure the tests and linters pass before opening a Pull Request to `develop`.
4. An API change must come with an update of the shared types in `packages/`.
5. Comments and documentation are written in French, followed by their English translation.

## License

This project is licensed under the [MIT](LICENSE) license. *(LICENSE file to be added.)*
