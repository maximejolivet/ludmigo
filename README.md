# Ludmigo | Démocratisons le jeu !

Ludmigo est une plateforme communautaire pour partager et découvrir les jeux de société,
et faciliter la rencontre entre joueurs et lieux de jeu.

Débutant ou joueur confirmé, peu importe : ce qui compte, c'est l'envie de partager un moment
convivial autour d'un jeu. Les rencontres peuvent avoir lieu dans les espaces dédiés déjà présents
dans une ville, ou dans des bars que nous accompagnons pour développer ce service dans leur établissement.

![PHP](https://img.shields.io/badge/PHP-8.4-777BB4)
![Symfony](https://img.shields.io/badge/Symfony-7-000000)
![React](https://img.shields.io/badge/React-19-61DAFB)
![React Native](https://img.shields.io/badge/React%20Native-0.8-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## Sommaire

- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Commandes utiles](#commandes-utiles)
- [Tests](#tests)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Stack technique

| Couche | Technologies |
| --- | --- |
| **Backend (API)** | [Symfony](https://symfony.com) 7, PHP 8.4, API Platform, Doctrine ORM |
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

> Le dépôt ne contient pour l'instant que la documentation : les dossiers ci-dessus sont la cible
> d'architecture, à mettre en place au fil du développement.

## Prérequis

- [PHP](https://www.php.net) 8.4 avec les extensions requises par Symfony
- [Composer](https://getcomposer.org) 2
- [Docker](https://www.docker.com) (Docker Desktop ou Docker Engine avec Compose) pour MariaDB
- [Node.js](https://nodejs.org) 22 LTS et npm
- Pour le mobile :
  - macOS avec [Xcode](https://developer.apple.com/xcode/) (simulateur iOS)
  - [Android Studio](https://developer.android.com/studio) (émulateur Android)
  - Un compte [Expo](https://expo.dev) si vous utilisez EAS pour les builds

## Installation

```bash
# 1. Cloner le dépôt
git clone git@github.com:<organisation>/ludmigo.git
cd ludmigo

# 2. Démarrer la base de données MariaDB
docker compose up -d db

# 3. Installer et configurer l'API
cd api
composer install
cp .env .env.local          # puis adapter les variables si besoin
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction

# 4. Installer les dépendances JavaScript (workspaces)
cd ..
npm install

# 5. Lancer le web
npm run dev -w web          # http://localhost:5173

# 6. Lancer le mobile
npm run start -w mobile     # puis 'i' (iOS) ou 'a' (Android)
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

## Licence

Ce projet est sous licence [MIT](LICENSE). *(Fichier `LICENSE` à ajouter.)*
