# Tableau Kanban

## Principe

Le travail circule en continu sur un tableau. Il n'y a pas de sprints fixes. Une nouvelle carte démarre quand une place se libère, et l'équipe limite le travail en cours pour finir ce qui est commencé avant de démarrer autre chose.

## Tableau

| Colonne | Signification | Règle d'entrée |
| --- | --- | --- |
| **Backlog** | Stories des epics pas encore préparées | Story listée dans un epic |
| **Prêt** | La story est assez claire pour démarrer | La définition de prêt (ci-dessous) est remplie |
| **En cours** | Quelqu'un (agent ou humain) y travaille | Limite de travail en cours respectée (ci-dessous) |
| **Revue** | Code, tests et documentation attendent une vérification | Pull request ouverte vers `develop` |
| **Terminé** | Fusionné dans `develop` et vérifié par rapport aux critères d'acceptation | La définition de terminé (ci-dessous) est remplie |

Chaque carte correspond à une story, nommée avec son identifiant d'epic : par exemple `E4-S2 Rejoindre une rencontre`. Le tableau est une base de données Notion (« Ludmigo - Kanban »), en vue Tableau groupée par statut. Chaque carte porte les propriétés suivantes : Statut (les cinq colonnes ci-dessus), Epic, Priorité, Étape, Classe de service, Bloqué (case à cocher) et le texte de la story.

Le document des epics reste la source des stories : une story ajoutée ou modifiée dans ce document est reportée dans Notion dans la même semaine. Notion est la source du suivi (statut, blocages, classe de service). Le dépôt GitHub garde les branches, les pull requests et les issues de code.

## Limites de travail en cours

- **En cours** : 2 cartes au maximum par personne ou par agent à la fois.
- **Revue** : 3 cartes au maximum en attente. Quand cette limite est atteinte, l'équipe fait des revues avant de commencer du nouveau travail.
- Démarrer une carte est un choix. Terminer une carte passe avant.

## Classes de service

| Classe | Usage | Règle |
| --- | --- | --- |
| **Urgent** | Problème de sécurité, production cassée, parcours principal bloqué | Pris immédiatement, avant toute autre carte |
| **Standard** | Stories P0 et P1 | Pris dans l'ordre du backlog |
| **Plus tard** | Stories hors V1 et idées pas encore dans le PRD | Pris seulement quand aucune story P0 ou P1 n'est prête |

## Définition de prêt

Une carte passe en **Prêt** quand :

- ses critères d'acceptation sont écrits, au format Étant donné / Quand / Alors quand la story décrit un comportement ;
- ses dépendances (stories précédentes, décisions à prendre) sont terminées ou tranchées ;
- elle indique son étape du plan d'implémentation.

## Définition de terminé

Une carte passe en **Terminé** quand :

- la branche `feature/<sujet>` ou `fix/<sujet>` est fusionnée dans `develop` par une pull request, avec l'identifiant de la story dans le titre ou le commit (par exemple `feat(api): E4-S2 rejoindre une rencontre`) ;
- les tests et linters des parties touchées passent ;
- les critères d'acceptation de la story sont vérifiés, en préproduction quand la story est visible par l'utilisateur ;
- les types de `packages/` sont mis à jour si l'API a changé ;
- une migration éventuelle a été relue avant le commit.

## Règles de circulation

- **Pull requests** vers `develop`. Elles sont petites : une story par pull request quand c'est possible.
- **Cartes bloquées** : elles restent dans leur colonne avec un libellé `blocked` et la raison. Le responsable du blocage est nommé.
- **Problèmes non résolus** d'une carte : ils sont ouverts en tant qu'issues GitHub, avec un libellé de priorité.
- **Décisions à prendre** : elles sont soumises au porteur du projet dès qu'une carte en dépend. Elles ne sont pas tranchées dans une carte.

## Indicateurs

Revus une fois par semaine, avec les indicateurs produit du PRD :

- **Débit** : nombre de cartes passées en Terminé par semaine.
- **Délai de traitement** : temps entre Prêt et Terminé, par carte.
- **Temps bloqué** : part des cartes bloquées au moins une fois.
- **Indicateurs produit** : rencontres créées et rejointes par semaine, part des joueurs qui rejoignent une deuxième rencontre, nombre de lieux actifs.

## Cadence

- **Revue hebdomadaire (30 minutes)** : regarder le tableau, les cartes bloquées et les indicateurs ; choisir les cartes de la semaine suivante.
- **Réapprovisionnement** : quand Prêt contient moins de 3 cartes, les stories suivantes du backlog sont préparées.
- **Rétrospective** : une fois par mois, une question : qu'est-ce qui a ralenti le flux ? La réponse est ajoutée à ce document.

## Lien avec les étapes BMAD

| Étape BMAD | Usage dans le Kanban |
| --- | --- |
| Backlog (epics) | Source de la colonne Backlog |
| Développement (plan d'implémentation) | Cartes en cours, un point de contrôle par étape avant de passer à la suivante |
| Après le lancement | Tableau gardé comme seul outil de suivi, avec des classes de service pour les corrections et les nouvelles idées |

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Kanban board

## Principle

Work flows continuously across a board. There are no fixed sprints. A new card starts when a slot frees up, and the team limits work in progress so that what is started gets finished before anything else begins.

## Board

| Column | Meaning | Entry rule |
| --- | --- | --- |
| **Backlog** | Stories from the epics not yet prepared | Story listed in an epic |
| **Ready** | The story is clear enough to start | The definition of ready (below) is met |
| **In progress** | Someone (agent or human) is working on it | Work-in-progress limit respected (below) |
| **Review** | Code, tests and documentation await a check | Pull request open to `develop` |
| **Done** | Merged into `develop` and checked against the acceptance criteria | The definition of done (below) is met |

Each card is one story, named with its epic identifier: for example `E4-S2 Join a meetup`. The board is a Notion database ("Ludmigo - Kanban"), in a board view grouped by status. Each card has these properties: Status (the five columns above), Epic, Priority, Step, Service class, Blocked (checkbox) and the story text.

The epics document remains the source of the stories: a story added or changed in that document is copied to Notion within the same week. Notion is the source for tracking (status, blockers, service class). The GitHub repository keeps the branches, pull requests and code issues.

## Work-in-progress limits

- **In progress**: 2 cards at most per person or per agent at a time.
- **Review**: 3 cards at most waiting. When this limit is reached, the team does reviews before starting new work.
- Starting a card is a choice. Finishing a card comes first.

## Service classes

| Class | Use | Rule |
| --- | --- | --- |
| **Urgent** | Security problem, broken production, blocked main flow | Taken immediately, before any other card |
| **Standard** | P0 and P1 stories | Taken in backlog order |
| **Later** | Out-of-V1 stories and ideas not yet in the PRD | Taken only when no P0 or P1 story is ready |

## Definition of ready

A card moves to **Ready** when:

- its acceptance criteria are written, in Given / When / Then format when the story describes a behaviour;
- its dependencies (earlier stories, decisions to make) are done or settled;
- it names its step in the implementation plan.

## Definition of done

A card moves to **Done** when:

- the `feature/<topic>` or `fix/<topic>` branch is merged into `develop` through a pull request, with the story identifier in the title or the commit (for example `feat(api): E4-S2 join a meetup`);
- the tests and linters of the parts touched pass;
- the story's acceptance criteria are verified, on staging when the story is visible to the user;
- the types in `packages/` are updated if the API changed;
- any migration was reviewed before the commit.

## Flow rules

- **Pull requests** to `develop`. They are small: one story per pull request when possible.
- **Blocked cards**: they stay in their column with a `blocked` label and the reason. The person responsible for the blocker is named.
- **Unresolved problems** from a card: they are opened as GitHub issues, with a priority label.
- **Decisions to make**: they are put to the project owner as soon as a card depends on them. They are not settled inside a card.

## Indicators

Reviewed once a week, with the product indicators of the PRD:

- **Throughput**: number of cards moved to Done per week.
- **Lead time**: time between Ready and Done, per card.
- **Blocked time**: share of cards blocked at least once.
- **Product indicators**: meetups created and joined per week, share of players who join a second meetup, number of active venues.

## Cadence

- **Weekly review (30 minutes)**: look at the board, the blocked cards and the indicators; choose the next week's cards.
- **Replenishment**: when Ready holds fewer than 3 cards, the next backlog stories are prepared.
- **Retrospective**: once a month, one question: what slowed the flow? The answer is added to this document.

## Link with the BMAD steps

| BMAD step | Use in the Kanban |
| --- | --- |
| Backlog (epics) | Source of the Backlog column |
| Development (implementation plan) | Cards in progress, one checkpoint per step before moving to the next |
| After the launch | Board kept as the only tracking tool, with service classes for fixes and new ideas |
