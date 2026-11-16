# Journal des modifications

Tous les changements notables de Ludmigo sont notés ici. Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Le projet n'a pas encore de version publiée : tout est regroupé sous « Non publié ».

La page « Nouveautés » du back office affiche la partie française de ce fichier.

## [Non publié]

### Ajouté

- API : connexion par JWT avec jeton de rafraîchissement, rôles, et commande `app:user:promote` pour nommer un administrateur.
- API : ressource `Game` réservée aux administrateurs, avec recherche par nom, filtre de difficulté, tri et pagination choisie par le client (50 éléments au plus par page).
- API : filtre `exists[deletedAt]` sur les utilisateurs pour écarter les comptes supprimés.
- API : page de documentation Swagger aux couleurs de Ludmigo, avec mode soirée (en dev et en test).
- Back office : application React réservée aux administrateurs, avec connexion, accueil, gestion des jeux (liste, création, modification, suppression) et liste des utilisateurs en lecture seule.
- Back office : design repris du web (couleurs, boutons en relief, barre d'onglets sur mobile), mode soirée et interface en français.
- Back office : page « Nouveautés » qui affiche ce journal.
- Types partagés `Game` et `AdminUser` dans `packages/shared`.
- Collection Bruno pour l'API d'authentification.

### Modifié

- Tous les fichiers PHP déclarent `strict_types=1`.
- Le back office est vérifié par `oxlint` (règles des hooks React et d'accessibilité) en plus de `tsc`.
- Le proxy local écoute sur `127.0.0.1` et relaie `/api` et `/ui/*` vers l'API.
- Le premier chargement du back office est découpé en plusieurs fichiers mis en cache.

### Corrigé

- La taille de page demandée par le client était ignorée : 30 éléments étaient renvoyés au lieu de 12.
- Une valeur trop grande (joueurs, durée, adresse d'image) renvoie une erreur 422 au lieu d'une erreur 500.
- Back office : page blanche quand l'API est injoignable, « Effacer les filtres » qui ne vidait pas la recherche, erreur de chargement affichée comme une liste vide, notifications de Material UI à la place des nôtres.
- Image Docker de l'API : le build échouait faute des extensions PHP lors de l'installation de Composer.
- Image Docker de l'API : le conteneur ne démarrait pas sous Kubernetes quand toutes les capacités sont retirées.

### Sécurité

- La clé privée JWT ne se trouve plus dans l'image Docker : elle est montée depuis un Secret Kubernetes.
- Conteneurs sans root, système de fichiers en lecture seule, politiques réseau, pas de jeton de compte de service inutile, images de base épinglées par digest.
- La documentation de l'API est fermée par défaut : la page Swagger et les formats OpenAPI sont interdits en production, même aux administrateurs ; le point d'entrée, `docs.jsonld` et les contextes restent réservés à `ROLE_ADMIN`.
- Correctifs `npm audit` sans rupture.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Changelog

All notable changes to Ludmigo are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The project has no published version yet: everything is grouped under "Unreleased".

The back office "Nouveautés" page shows the French part of this file.

## [Unreleased]

### Added

- API: JWT sign-in with a refresh token, roles, and an `app:user:promote` command to make an administrator.
- API: `Game` resource reserved to administrators, with search by name, a difficulty filter, sorting and client-chosen pagination (50 items per page at most).
- API: `exists[deletedAt]` filter on users to leave out deleted accounts.
- API: Swagger documentation page in Ludmigo's colours, with evening mode (in dev and test).
- Back office: React app reserved to administrators, with sign-in, a dashboard, game management (list, create, edit, delete) and a read-only list of users.
- Back office: design taken from the web app (colours, raised buttons, bottom tab bar on mobile), evening mode and a French interface.
- Back office: "Nouveautés" page that shows this changelog.
- Shared `Game` and `AdminUser` types in `packages/shared`.
- Bruno collection for the authentication API.

### Changed

- Every PHP file declares `strict_types=1`.
- The back office is checked by `oxlint` (React hooks and accessibility rules) in addition to `tsc`.
- The local proxy listens on `127.0.0.1` and forwards `/api` and `/ui/*` to the API.
- The first load of the back office is split into several cached files.

### Fixed

- The page size asked by the client was ignored: 30 items were returned instead of 12.
- A value that is too large (players, duration, image address) returns a 422 error instead of a 500 error.
- Back office: blank page when the API is unreachable, "Clear filters" not emptying the search, a loading error shown as an empty list, Material UI notifications shown instead of ours.
- API Docker image: the build failed because the PHP extensions were missing when installing Composer.
- API Docker image: the container did not start on Kubernetes when all capabilities are dropped.

### Security

- The JWT private key is no longer in the Docker image: it is mounted from a Kubernetes Secret.
- Containers run without root, with a read-only filesystem, network policies, no unused service account token and base images pinned by digest.
- The API documentation is closed by default: the Swagger page and the OpenAPI formats are forbidden in production, even to administrators; the entrypoint, `docs.jsonld` and the contexts stay reserved to `ROLE_ADMIN`.
- Non-breaking `npm audit` fixes.
