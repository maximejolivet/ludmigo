# CLAUDE.md — Ludmigo

Ludmigo est une plateforme communautaire pour partager et découvrir les jeux de société et faciliter les rencontres entre joueurs, dans des espaces dédiés ou des bars partenaires.

Domaines : `ludmigo.fr` (public français), `ludmigo.com` (international).

## Documentation de référence

Lire avant de développer une fonctionnalité :

- `docs/01_PROJECT_BRIEF.md` : contexte du projet, utilisateurs, critères de succès, périmètre
- `docs/02_PRD.md` : objectifs, fonctionnalités, périmètre V1, critères d'acceptation
- `docs/03_ARCHITECTURE.md` : comment les parties s'assemblent
- `docs/04_TRD.md` : choix techniques, sécurité, environnements
- `docs/05_BACKEND_SCHEMA.md` : entités, relations, règles d'autorisation
- `docs/06_APP_FLOW.md` : écrans et parcours utilisateur
- `docs/07_UI_UX_DESIGN.md` : couleurs, composants, accessibilité
- `docs/08_EPICS.md` : epics et user stories, avec leurs identifiants
- `docs/09_IMPLEMENTATION_PLAN.md` : ordre de construction et points de contrôle
- `docs/10_KANBAN.md` : comment le travail circule sur le tableau

Chaque document contient la version française, suivie de la traduction anglaise.

En cas de conflit entre le code et ces documents, signaler l'écart avant de choisir.

## Architecture

```
api/       Backend Symfony 7 (API REST, API Platform, Doctrine) — source de vérité métier
web/       React 19 + Vite + React Router + TypeScript
mobile/    React Native (Expo) + TypeScript
packages/  Types et client API partagés entre web et mobile
docs/      Documents de conception
```

- La logique métier vit uniquement dans `api/`. Web et mobile n'affichent et n'envoient que des données.
- Toute modification de l'API doit mettre à jour les types dans `packages/`.

## Commandes

Point d'entrée : `make` (infos du projet, dépendances obsolètes, liste des commandes). Lancer `make help` pour toutes les cibles.

Les migrations se créent avec `php bin/console make:migration` et se relisent avant commit.

## Conventions

- **Langue** : commentaires et notes en français, suivis de leur traduction anglaise juste en dessous ; identifiants de code en anglais.
- **Branches** : créer depuis `develop`, nommer `feature/<sujet>` ou `fix/<sujet>`. Ouvrir les Pull Requests vers `develop`.
- **Commits** : Conventional Commits, par exemple `feat(api): ...`, `fix(web): ...`, `docs(readme): ...`.
- **Avant une PR** : tests et linters passent pour les parties touchées.
- **Dépendances** : mises à jour gérées par Renovate.

## Règles de sécurité et de données

- Aucun identifiant, clé API ou mot de passe dans le dépôt. Utiliser les variables d'environnement.
- Chaque endpoint en écriture vérifie le rôle et la propriété de la ressource (voters Symfony).
- Données personnelles : respecter le RGPD (export et suppression du compte). Ne pas journaliser d'email ni de mot de passe.
- Les mots de passe sont hachés avec le hasher natif de Symfony.

## Points à ne pas faire sans validation

- Modifier le schéma de base sans migration.
- Supprimer une colonne en une seule migration (la retirer du code d'abord, la supprimer ensuite).
- Ajouter un paquet de paiement ou une dépendance majeure sans l'avoir validé avec le porteur du projet.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# CLAUDE.md — Ludmigo

Ludmigo is a community platform for sharing and discovering board games, and for making it easier for players to meet, in dedicated spaces or partner bars.

Domains: `ludmigo.fr` (French public), `ludmigo.com` (international).

## Reference documentation

Read before building a feature:

- `docs/01_PROJECT_BRIEF.md`: project context, users, success criteria, scope
- `docs/02_PRD.md`: goals, features, V1 scope, acceptance criteria
- `docs/03_ARCHITECTURE.md`: how the parts fit together
- `docs/04_TRD.md`: technical choices, security, environments
- `docs/05_BACKEND_SCHEMA.md`: entities, relations, authorisation rules
- `docs/06_APP_FLOW.md`: screens and user flows
- `docs/07_UI_UX_DESIGN.md`: colours, components, accessibility
- `docs/08_EPICS.md`: epics and user stories, with their IDs
- `docs/09_IMPLEMENTATION_PLAN.md`: build order and checkpoints
- `docs/10_KANBAN.md`: how work flows across the board

Each document contains the French version, followed by the English translation.

If the code and these documents disagree, report the gap before choosing.

## Architecture

```
api/       Symfony 7 backend (REST API, API Platform, Doctrine) — business source of truth
web/       React 19 + Vite + React Router + TypeScript
mobile/    React Native (Expo) + TypeScript
packages/  Types and API client shared between web and mobile
docs/      Design documents
```

- Business logic lives only in `api/`. Web and mobile only display and send data.
- Any API change must update the types in `packages/`.

## Commands

Entry point: `make` (project info, outdated dependencies, command list). Run `make help` for all targets.

Migrations are created with `php bin/console make:migration` and reviewed before commit.

## Conventions

- **Language**: comments and notes in French, followed by their English translation directly below; code identifiers in English.
- **Branches**: create from `develop`, name them `feature/<topic>` or `fix/<topic>`. Open Pull Requests to `develop`.
- **Commits**: Conventional Commits, for example `feat(api): ...`, `fix(web): ...`, `docs(readme): ...`.
- **Before a PR**: tests and linters pass for the parts you touched.
- **Dependencies**: updates handled by Renovate.

## Security and data rules

- No credentials, API keys or passwords in the repository. Use environment variables.
- Every write endpoint checks the role and ownership of the resource (Symfony voters).
- Personal data: comply with GDPR (account export and deletion). Never log emails or passwords.
- Passwords are hashed with Symfony's native hasher.

## Things not to do without validation

- Change the database schema without a migration.
- Drop a column in a single migration (remove its use from the code first, drop it in a later migration).
- Add a payment package or a major dependency without validating it with the project owner.
