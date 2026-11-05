# Epics et user stories

Les identifiants de stories ont la forme `E<epic>-S<story>`. Ils s'utilisent dans les commits et les pull requests, par exemple `feat(api): E4-S2 rejoindre une rencontre`.

## E1 : Compte et profil (P0)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E1-S1 | En tant que visiteur, je veux m'inscrire, me connecter et réinitialiser mon mot de passe, afin d'accéder à mon compte. | 2 | P0 |
| E1-S2 | En tant que visiteur, je veux m'inscrire avec mon compte Google ou Facebook, afin de ne pas créer un nouveau mot de passe. | 4 | P1 |
| E1-S3 | En tant que visiteur, je veux choisir de recevoir ou non la newsletter à l'inscription, et recevoir un email de bienvenue, afin de savoir à quoi j'ai consenti. | 4 | P1 |
| E1-S4 | En tant que joueur, je veux gérer mon profil (pseudo, ville) et mes paramètres, afin que les autres joueurs sachent qui je suis. | 4 | P0 |
| E1-S5 | En tant que joueur, je veux exporter ou supprimer mon compte, afin de garder le contrôle de mes données personnelles (RGPD). | 4 | P0 |
| E1-S6 | En tant que nouveau joueur, je veux un onboarding court après mon inscription (présentation, jeux préférés, localisation), que je peux passer étape par étape, afin de démarrer sans effort. | 4 | P0 |

## E2 : Catalogue de jeux (P0)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E2-S1 | En tant que joueur débutant, je veux parcourir des jeux adaptés aux débutants, afin de choisir un jeu à découvrir sans connaître les règles à l'avance. | 3 | P0 |
| E2-S2 | En tant que joueur, je veux filtrer les jeux par catégorie, nombre de joueurs, durée et niveau, afin de trouver un jeu adapté au groupe. | 3 | P0 |
| E2-S3 | En tant que joueur, je veux voir la page d'un jeu avec sa description, afin de décider de rejoindre une rencontre autour de ce jeu. | 3 | P0 |
| E2-S4 | En tant que joueur, je veux lire une explication des règles sur la page d'un jeu, afin d'apprendre un jeu sans l'acheter. | - | Hors V1 |
| E2-S5 | En tant que joueur, je veux un lien depuis la page d'un jeu vers la fiche produit de la boutique, afin d'acheter le jeu après l'avoir découvert. | 4 | P1 |
| E2-S6 | En tant que joueur, je veux choisir et gérer mes jeux favoris (10 au maximum) depuis mon profil, afin de retrouver les jeux que j'aime. | 4 | P0 |

## E3 : Lieux et carte d'exploration (P0)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E3-S1 | En tant que joueur, je veux voir les lieux de jeu et les rencontres sur une carte interactive, afin de savoir où jouer près de chez moi. | 3 | P0 |
| E3-S2 | En tant que joueur, je veux que chaque rencontre soit rattachée à un lieu public affiché sur la carte, afin qu'aucune adresse privée ne soit exposée. | 3 | P0 |
| E3-S3 | En tant que joueur, je veux filtrer la carte par catégorie (bar à jeux, ludothèque, association, boutique, bar ou café) et par ville, afin de voir les lieux qui m'intéressent. | 3 | P0 |
| E3-S4 | En tant que joueur, je veux chercher sur la carte par mots-clés, afin de trouver rapidement un lieu ou un jeu. | 4 | P1 |
| E3-S5 | En tant que joueur, je veux voir la page d'un lieu avec son adresse, ses horaires, ses jeux, ses événements et ses photos, afin de préparer ma venue. | 3 | P0 |

## E4 : Rencontres (P0)

C'est le parcours central de la V1 : « trouver et rejoindre une rencontre » (étape 3 du plan d'implémentation).

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E4-S1 | En tant que joueur, je veux chercher une rencontre près de chez moi, afin de rejoindre une table ce soir. | 3 | P0 |
| E4-S2 | En tant que joueur, je veux rejoindre une rencontre ouverte et non complète, afin de jouer avec d'autres. | 3 | P0 |
| E4-S3 | En tant que visiteur, je veux être redirigé vers la connexion depuis le bouton « Rejoindre » et revenir sur la rencontre, afin de ne pas perdre ma place. | 3 | P0 |
| E4-S4 | En tant que joueur, je veux quitter une rencontre que j'ai rejointe, afin de libérer ma place pour quelqu'un d'autre. | 3 | P0 |
| E4-S5 | En tant qu'organisateur, je veux créer une rencontre avec un jeu, un lieu, une date et un nombre de places, afin de réunir des joueurs. | 3 | P0 |
| E4-S6 | En tant qu'organisateur, je veux accepter ou refuser les joueurs qui demandent à rejoindre, ou les laisser rejoindre automatiquement, afin de choisir qui vient. | 3 | P0 |
| E4-S7 | En tant qu'organisateur, je veux proposer un jeu absent du catalogue, afin que ma rencontre puisse l'utiliser. | 4 | P1 |
| E4-S8 | En tant qu'organisateur, je veux annuler une rencontre, afin que les participants soient prévenus. | 3 | P0 |
| E4-S9 | En tant que joueur débutant, je veux repérer les rencontres et les jeux « débutants bienvenus », afin d'oser venir sans connaître les règles. | 4 | P1 |

**Critères d'acceptation** (issus du PRD) :

- **E4-S2** : étant donné un utilisateur connecté sur une rencontre ouverte et non complète, quand il clique sur « Rejoindre », alors il apparaît dans la liste des participants et le nombre de places disponibles baisse de un.
- **E4-S2** : étant donné une rencontre complète, quand un utilisateur tente de la rejoindre, alors le bouton est désactivé et un message indique « Complet ».
- **E4-S3** : étant donné un visiteur non connecté, quand il clique sur « Rejoindre », alors il est redirigé vers la connexion et revient sur la rencontre.
- **E4-S1** : étant donné une recherche sans résultat, quand la liste s'affiche, alors un message propose d'élargir le rayon ou la date.
- **E4-S6** : étant donné une rencontre en validation manuelle, quand un joueur demande à rejoindre, alors la place n'est prise qu'à partir du moment où l'organisateur accepte.
- **E4-S5** : tout joueur inscrit peut créer une rencontre (décision prise dans le PRD).

## E5 : Avis et notes (P1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E5-S1 | En tant que joueur, je veux noter et commenter un jeu ou un lieu après avoir participé à une partie, afin d'aider les autres à choisir. | 4 | P1 |
| E5-S2 | En tant que joueur, je veux lire les avis sur la page d'un jeu ou d'un lieu, afin de les juger avant de rejoindre une rencontre. | 4 | P1 |

## E6 : Collection personnelle (hors V1)

Cet epic est hors V1 et gardé en réserve.

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E6-S1 | En tant que joueur, je veux marquer des jeux comme possédés ou souhaités, afin d'organiser mes jeux. | 4 | Hors V1 |
| E6-S2 | En tant que joueur, je veux voir les jeux possédés par les personnes de mes rencontres, afin de proposer un jeu. | 4 | Hors V1 |

## E7 : Notifications (P0, puis hors V1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E7-S1 | En tant que joueur, je veux être prévenu quand je rejoins ou quitte une rencontre, ou quand elle est annulée, afin de ne rien manquer. | 4 | P0 |
| E7-S2 | En tant que joueur, je veux un rappel avant une rencontre, afin de ne pas l'oublier. | 4 | P0 |
| E7-S3 | En tant que joueur, je veux être prévenu des nouvelles rencontres près de chez moi, afin de les rejoindre vite. | - | Hors V1 |

## E8 : Application web installable (P1) et application native (hors V1)

Décision : le web sort en premier avec une PWA ; l'application native est hors V1.

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E8-S1 | En tant que joueur, je veux les parcours principaux (trouver et rejoindre une rencontre, profil) sur iOS et Android (application native), afin d'accéder à la plateforme en mobilité. | - | Hors V1 |
| E8-S2 | En tant que joueur, je veux installer le site sur mon téléphone et recevoir des notifications web, afin d'accéder à la plateforme en mobilité sans télécharger d'application. | 4 | P1 |

## E9 : Espace professionnel (P0, puis P1)

L'inscription professionnelle est gratuite au lancement. Les abonnements sont une évolution (voir E17).

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E9-S1 | En tant que responsable de lieu, je veux créer un compte professionnel gratuit pour mon lieu, afin de le publier sur la plateforme. | 2, 4 | P0 |
| E9-S2 | En tant que responsable de lieu, je veux gérer la fiche de mon lieu (horaires, informations générales, photos), afin que les joueurs sachent ce que propose mon lieu. | 4 | P0 |
| E9-S3 | En tant que responsable de lieu, je veux lister les jeux disponibles chez moi, afin que les joueurs sachent à quoi ils peuvent jouer. | 4 | P0 |
| E9-S4 | En tant que responsable de lieu, je veux publier des événements (soirées jeux, quiz, promotions), afin de toucher une audience qualifiée. | 4 | P0 |
| E9-S5 | En tant que responsable de lieu, je veux publier des publications sur la fiche de mon lieu, afin que les joueurs suivent ce qui s'y passe. | 4 | P1 |
| E9-S6 | En tant que responsable de lieu, je veux voir les avis laissés sur mon lieu, afin de savoir ce que pensent les joueurs. | 4 | P1 |
| E9-S7 | En tant que responsable de lieu, je veux voir les rencontres organisées chez moi, afin de piloter mes soirées de jeu. | 4 | P1 |
| E9-S8 | En tant que responsable de lieu, je veux voir des statistiques sur la visibilité de mon lieu, afin de mesurer l'effet de ma présence sur la plateforme. | - | Hors V1 |
| E9-S9 | En tant que responsable de lieu, je veux programmer une soirée récurrente (par exemple chaque jeudi), afin que chaque occurrence soit une rencontre que les joueurs peuvent rejoindre. | 4 | P0 |

## E10 : Qualité de la plateforme (transversal)

Ces stories ne sont pas des fonctionnalités visibles, mais elles font partie des critères de fin de chaque étape.

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E10-S1 | En tant qu'utilisateur, je veux des messages d'erreur clairs en français, sans détail technique, afin de savoir quoi faire. | 5 | P0 |
| E10-S2 | En tant qu'utilisateur, je veux pouvoir utiliser les parcours principaux au clavier et avec un lecteur d'écran, afin que la plateforme soit accessible. | 5 | P0 |
| E10-S3 | En tant qu'utilisateur mobile, je veux voir les données en cache et une bannière réseau hors ligne, afin de comprendre l'état de l'application. | 5 | P1 |
| E10-S4 | En tant que propriétaire de la plateforme, je veux que l'API vérifie la propriété de chaque ressource en écriture et limite les tentatives de connexion, afin de protéger les comptes et les données. | 2, 5 | P0 |
| E10-S5 | En tant qu'utilisateur, je veux que la plateforme s'adapte de 360×640 à 1920×1080 pixels, afin de l'utiliser sur mon téléphone comme sur mon ordinateur. | 5 | P0 |
| E10-S6 | En tant qu'utilisateur, je veux un contraste suffisant, une hiérarchie de titres claire, des intitulés de liens explicites et les attributs `role`, `alt` et `title`, afin que la plateforme soit accessible aux personnes en situation de handicap. | 5 | P0 |
| E10-S7 | En tant qu'utilisateur, je veux que mes données personnelles soient hébergées en France, afin qu'elles soient protégées. | 1 | P0 |
| E10-S8 | En tant qu'utilisateur, je veux que la plateforme fonctionne dans les deux dernières versions de Chrome, Firefox, Safari et Edge, afin de pouvoir l'utiliser. | 5 | P0 |

## E11 : Contenus et actualités (P1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E11-S1 | En tant qu'administrateur, je veux publier des actualités et des articles de blog avec texte, photos, vidéos et infographies, afin que le blog attire des joueurs. | 4 | P1 |
| E11-S2 | En tant que visiteur, je veux lire le blog sans m'inscrire, afin de découvrir Ludmigo. | 4 | P1 |
| E11-S3 | En tant qu'administrateur, je veux gérer les pages éditoriales (à propos, informations pratiques), afin que l'équipe puisse les mettre à jour sans développeur. | 4 | P1 |

## E12 : Gamification (hors V1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E12-S1 | En tant que joueur, je veux des tâches hebdomadaires (organiser une rencontre, écrire un article, donner un avis sur un lieu) qui rapportent des points, afin de rester actif sur la plateforme. | 4 | Hors V1 |
| E12-S2 | En tant que joueur, je veux voir mes points et ma progression, afin de savoir ce que je peux gagner. | 4 | Hors V1 |
| E12-S3 | En tant que joueur, je veux gagner des récompenses offertes par les partenaires (réduction dans un lieu, bon d'achat, jeu offert), afin que mon activité me rapporte des avantages (financement à définir). | 4 | Hors V1 |

## E13 : Coordination du groupe (P1) et messagerie intégrée (hors V1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E13-S1 | En tant que participant validé, je veux une conversation de groupe pour chaque rencontre, afin de me coordonner avec les autres joueurs. | 4 | Hors V1 |
| E13-S2 | En tant que joueur, je veux être prévenu quand quelqu'un écrit dans la conversation de ma rencontre, afin de ne pas manquer un changement. | 4 | Hors V1 |
| E13-S3 | En tant que participant validé, je veux un lien vers le groupe externe de la rencontre (WhatsApp, Discord) et un export calendrier, afin de me coordonner et de ne pas oublier la date. | 4 | P1 |

## E14 : Formulaire de contact (P1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E14-S1 | En tant que visiteur, je veux contacter Ludmigo par un formulaire où je choisis un sujet, et voir une page de confirmation, afin de savoir que ma demande est envoyée. | 4 | P1 |
| E14-S2 | En tant que visiteur, je veux un formulaire complet avec des champs adaptés au sujet, afin que ma demande arrive à la bonne personne. | - | Hors V1 |

## E15 : Back office et administration (P0, puis P1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E15-S1 | En tant qu'administrateur, je veux des comptes avec des droits différents, afin que chaque membre de l'équipe ne fasse que ce dont il a besoin. | 2 | P1 |
| E15-S2 | En tant qu'administrateur, je veux un journal de chaque action de l'administration et de chaque suppression, avec l'auteur et la date, afin de retracer ce qui s'est passé. | 5 | P1 |
| E15-S3 | En tant qu'administrateur, je veux modérer les avis et les profils, afin que la plateforme reste sûre. Politique : publication sans validation préalable, bouton « Signaler » sur chaque avis, profil et rencontre, traitement sous 48 h par l'administrateur (masquer, supprimer, suspendre un compte). | 4 | P0 |
| E15-S4 | En tant qu'administrateur, je veux saisir et modifier le catalogue de jeux, les lieux et les soirées récurrentes depuis un outil d'administration minimal, afin de lancer la plateforme sans attendre le back office complet. | 4 | P0 |

## E16 : Analyse d'audience et SEO (P1)

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E16-S1 | En tant que propriétaire de la plateforme, je veux Matomo ou Plausible et Search Console configurés, avec des événements sur les boutons de validation des formulaires (inscription, participation à une rencontre), afin de mesurer le trafic et les conversions. | 5 | P1 |
| E16-S2 | En tant que propriétaire de la plateforme, je veux un sitemap, des balises meta et un balisage SEO, afin que les pages soient trouvées par les moteurs de recherche. | 5 | P1 |

## E17 : Évolutions hors V1

Ces stories sont prévues mais ne font pas partie de la version 1. Elles n'ont pas encore d'étape d'implémentation, et les prix des abonnements ne sont pas fixés.

| ID | Story | Étape | Priorité |
| --- | --- | --- | --- |
| E17-S1 | En tant que responsable de lieu, je veux souscrire à une formule professionnelle avec paiement en ligne, avec une option annuelle, afin de débloquer davantage de fonctionnalités. | - | Évolution |
| E17-S2 | En tant que joueur, je veux acheter un chèque cadeau pour des jeux d'une boutique de jeux de société partenaire, afin d'offrir un jeu ou d'en choisir un moi-même. | - | Évolution |
| E17-S3 | En tant que propriétaire de la plateforme, je veux adapter le prix des abonnements à la capacité d'accueil et à la ville de chaque lieu, afin que l'offre corresponde à chaque lieu. | - | Évolution |
| E17-S4 | En tant que propriétaire de la plateforme, je veux des partenariats avec des éditeurs indépendants et une offre de dropshipping, afin de générer de nouveaux revenus. | - | Évolution |

## Couverture du PRD

| Fonctionnalité du PRD | Epic |
| --- | --- |
| Compte utilisateur | E1 |
| Catalogue de jeux | E2 |
| Carte d'exploration et lieux de jeu | E3 |
| Rencontres | E4 |
| Avis et notes | E5 |
| Collection personnelle | E6 |
| Notifications | E7 |
| Application web installable et application native | E8 |
| Compte professionnel et tableau de bord | E9 |
| Qualité de la plateforme | E10 |
| Actualités, blog et pages éditoriales | E11 |
| Gamification | E12 |
| Coordination du groupe et messagerie | E13 |
| Formulaire de contact | E14 |
| Back office | E15 |
| Analyse d'audience et SEO | E16 |
| Évolutions (abonnements, chèque cadeau) | E17 |

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Epics and user stories

Story identifiers have the form `E<epic>-S<story>`. Use them in commits and pull requests, for example `feat(api): E4-S2 join a meetup`.

## E1: Account and profile (P0)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E1-S1 | As a visitor, I want to sign up, sign in and reset my password, so that I can access my account. | 2 | P0 |
| E1-S2 | As a visitor, I want to sign up with my Google or Facebook account, so that I do not create a new password. | 4 | P1 |
| E1-S3 | As a visitor, I want to choose whether to receive the newsletter at sign-up, and receive a welcome email, so that I know what I consented to. | 4 | P1 |
| E1-S4 | As a player, I want to manage my profile (nickname, city) and my settings, so that other players know who I am. | 4 | P0 |
| E1-S5 | As a player, I want to export or delete my account, so that I keep control of my personal data (GDPR). | 4 | P0 |
| E1-S6 | As a new player, I want a short onboarding after sign-up (welcome, favourite games, location) that I can skip step by step, so that I get started with no effort. | 4 | P0 |

## E2: Game catalogue (P0)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E2-S1 | As a beginner player, I want to browse beginner-friendly games, so that I can pick a game to discover without knowing the rules in advance. | 3 | P0 |
| E2-S2 | As a player, I want to filter games by category, number of players, duration and level, so that I find a game that fits the group. | 3 | P0 |
| E2-S3 | As a player, I want to see a game's page with its description, so that I can decide to join a meetup around that game. | 3 | P0 |
| E2-S4 | As a player, I want to read an explanation of the rules on a game's page, so that I can learn a game without buying it. | - | Out of V1 |
| E2-S5 | As a player, I want a link from a game's page to the shop's product page, so that I can buy the game after discovering it. | 4 | P1 |
| E2-S6 | As a player, I want to choose and manage my favourite games (10 at most) from my profile, so that I find the games I like. | 4 | P0 |

## E3: Venues and exploration map (P0)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E3-S1 | As a player, I want to see game venues and meetups on an interactive map, so that I know where to play near me. | 3 | P0 |
| E3-S2 | As a player, I want every meetup to be attached to a public venue shown on the map, so that no private address is exposed. | 3 | P0 |
| E3-S3 | As a player, I want to filter the map by category (game bar, game library, association, shop, bar or café) and by city, so that I see the venues that interest me. | 3 | P0 |
| E3-S4 | As a player, I want to search the map by keyword, so that I quickly find a venue or a game. | 4 | P1 |
| E3-S5 | As a player, I want to see a venue's page with its address, hours, games, events and photos, so that I can prepare my visit. | 3 | P0 |

## E4: Meetups (P0)

This is the core flow of V1: "find and join a meetup" (step 3 of the implementation plan).

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E4-S1 | As a player, I want to search for a meetup near me, so that I can join a table tonight. | 3 | P0 |
| E4-S2 | As a player, I want to join an open meetup that is not full, so that I can play with others. | 3 | P0 |
| E4-S3 | As a visitor, I want to be redirected to sign-in from the "Join" button and return to the meetup, so that I do not lose my seat. | 3 | P0 |
| E4-S4 | As a player, I want to leave a meetup I joined, so that I free my seat for someone else. | 3 | P0 |
| E4-S5 | As an organiser, I want to create a meetup with a game, a venue, a date and a number of seats, so that I can gather players. | 3 | P0 |
| E4-S6 | As an organiser, I want to accept or refuse the players who ask to join, or let them join automatically, so that I choose who comes. | 3 | P0 |
| E4-S7 | As an organiser, I want to suggest a game that is not in the catalogue, so that my meetup can use it. | 4 | P1 |
| E4-S8 | As an organiser, I want to cancel a meetup, so that participants are warned. | 3 | P0 |
| E4-S9 | As a beginner player, I want to spot the "beginners welcome" meetups and games, so that I dare to come without knowing the rules. | 4 | P1 |

**Acceptance criteria** (from the PRD):

- **E4-S2**: given a signed-in user on an open meetup that is not full, when they click "Join", then they appear in the participant list and the available seats drop by one.
- **E4-S2**: given a full meetup, when a user tries to join it, then the button is disabled and a message says "Full".
- **E4-S3**: given a visitor who is not signed in, when they click "Join", then they are redirected to sign-in and return to the meetup.
- **E4-S1**: given a search with no result, when the list is displayed, then a message suggests widening the radius or the date.
- **E4-S6**: given a meetup in manual validation, when a player asks to join, then the seat is taken only once the organiser accepts.
- **E4-S5**: any registered player can create a meetup (decision made in the PRD).

## E5: Reviews and ratings (P1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E5-S1 | As a player, I want to rate and comment on a game or a venue after taking part in a game, so that I help others choose. | 4 | P1 |
| E5-S2 | As a player, I want to read the reviews on a game's or venue's page, so that I can judge them before joining a meetup. | 4 | P1 |

## E6: Personal collection (out of V1)

This epic is out of V1 and kept in reserve.

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E6-S1 | As a player, I want to mark games as owned or wanted, so that I organise my games. | 4 | Out of V1 |
| E6-S2 | As a player, I want to see the games owned by the people in my meetups, so that I can suggest a game. | 4 | Out of V1 |

## E7: Notifications (P0, then out of V1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E7-S1 | As a player, I want to be warned when I join or leave a meetup, or when it is cancelled, so that I miss nothing. | 4 | P0 |
| E7-S2 | As a player, I want a reminder before a meetup, so that I do not forget it. | 4 | P0 |
| E7-S3 | As a player, I want to be warned of new meetups near me, so that I can join them quickly. | - | Out of V1 |

## E8: Installable web app (P1) and native app (out of V1)

Decision: the web ships first with a PWA; the native app is out of V1.

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E8-S1 | As a player, I want the main flows (find and join a meetup, profile) on iOS and Android (native app), so that I can access the platform on the move. | - | Out of V1 |
| E8-S2 | As a player, I want to install the site on my phone and receive web notifications, so that I can access the platform on the move without downloading an app. | 4 | P1 |

## E9: Professional area (P0, then P1)

Professional sign-up is free at launch. Subscriptions are an evolution (see E17).

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E9-S1 | As a venue manager, I want to create a free professional account for my venue, so that I can publish it on the platform. | 2, 4 | P0 |
| E9-S2 | As a venue manager, I want to manage my venue's page (hours, general information, photos), so that players know what my venue offers. | 4 | P0 |
| E9-S3 | As a venue manager, I want to list the games available at my venue, so that players know what they can play. | 4 | P0 |
| E9-S4 | As a venue manager, I want to publish events (game evenings, quizzes, promotions), so that I reach a qualified audience. | 4 | P0 |
| E9-S5 | As a venue manager, I want to publish posts on my venue's page, so that players follow what happens there. | 4 | P1 |
| E9-S6 | As a venue manager, I want to see the reviews left on my venue, so that I know what players think. | 4 | P1 |
| E9-S7 | As a venue manager, I want to see the meetups organised at my venue, so that I can run my game evenings. | 4 | P1 |
| E9-S8 | As a venue manager, I want to see statistics on my venue's visibility, so that I can measure the effect of my presence on the platform. | - | Out of V1 |
| E9-S9 | As a venue manager, I want to schedule a recurring evening (for example every Thursday), so that each occurrence is a meetup that players can join. | 4 | P0 |

## E10: Platform quality (cross-cutting)

These stories are not visible features, but they are part of the completion criteria of every step.

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E10-S1 | As a user, I want clear error messages in French, with no technical detail, so that I know what to do. | 5 | P0 |
| E10-S2 | As a user, I want to use the main flows with a keyboard and a screen reader, so that the platform is accessible. | 5 | P0 |
| E10-S3 | As a mobile user, I want to see cached data and an offline network banner, so that I understand the state of the application. | 5 | P1 |
| E10-S4 | As the platform owner, I want the API to check ownership of every resource on write and to limit sign-in attempts, so that accounts and data are protected. | 2, 5 | P0 |
| E10-S5 | As a user, I want the platform to adapt from 360×640 to 1920×1080 pixels, so that I can use it on my phone as well as my computer. | 5 | P0 |
| E10-S6 | As a user, I want sufficient contrast, a clear heading hierarchy, explicit link labels and the `role`, `alt` and `title` attributes, so that the platform is accessible to people with disabilities. | 5 | P0 |
| E10-S7 | As a user, I want my personal data to be hosted in France, so that it is protected. | 1 | P0 |
| E10-S8 | As a user, I want the platform to work in the last two versions of Chrome, Firefox, Safari and Edge, so that I can use it. | 5 | P0 |

## E11: Content and news (P1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E11-S1 | As an administrator, I want to publish news and blog articles with text, photos, videos and infographics, so that the blog attracts players. | 4 | P1 |
| E11-S2 | As a visitor, I want to read the blog without signing up, so that I discover Ludmigo. | 4 | P1 |
| E11-S3 | As an administrator, I want to manage the editorial pages (about, practical information), so that the team can update them without a developer. | 4 | P1 |

## E12: Gamification (out of V1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E12-S1 | As a player, I want weekly tasks (organise a meetup, write an article, review a venue) that earn points, so that I stay active on the platform. | 4 | Out of V1 |
| E12-S2 | As a player, I want to see my points and my progress, so that I know what I can earn. | 4 | Out of V1 |
| E12-S3 | As a player, I want to earn rewards offered by partners (a discount at a venue, a voucher, a free game), so that my activity brings me benefits (funding to be defined). | 4 | Out of V1 |

## E13: Group coordination (P1) and built-in messaging (out of V1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E13-S1 | As a validated participant, I want a group conversation for each meetup, so that I can coordinate with the other players. | 4 | Out of V1 |
| E13-S2 | As a player, I want to be warned when someone writes in my meetup's conversation, so that I do not miss a change. | 4 | Out of V1 |
| E13-S3 | As a validated participant, I want a link to the meetup's external group (WhatsApp, Discord) and a calendar export, so that I can coordinate and not forget the date. | 4 | P1 |

## E14: Contact form (P1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E14-S1 | As a visitor, I want to contact Ludmigo through a form where I choose a subject, and see a confirmation page, so that I know my request was sent. | 4 | P1 |
| E14-S2 | As a visitor, I want a full form with fields adapted to the subject, so that my request reaches the right person. | - | Out of V1 |

## E15: Back office and administration (P0, then P1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E15-S1 | As an administrator, I want accounts with different rights, so that each team member only does what they need. | 2 | P1 |
| E15-S2 | As an administrator, I want a log of every administration action and every deletion, with the author and the date, so that I can trace what happened. | 5 | P1 |
| E15-S3 | As an administrator, I want to moderate reviews and profiles, so that the platform stays safe. Policy: publication without prior validation, "Report" button on every review, profile and meetup, handled within 48 h by the administrator (hide, delete, suspend an account). | 4 | P0 |
| E15-S4 | As an administrator, I want to enter and edit the game catalogue, venues and recurring evenings from a minimal admin tool, so that the platform can launch without waiting for the full back office. | 4 | P0 |

## E16: Analytics and SEO (P1)

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E16-S1 | As the platform owner, I want Matomo or Plausible and Search Console configured, with events on form submit buttons (sign-up, joining a meetup), so that I measure traffic and conversions. | 5 | P1 |
| E16-S2 | As the platform owner, I want a sitemap, meta tags and SEO markup, so that pages are found by search engines. | 5 | P1 |

## E17: Evolutions outside V1

These stories are planned but are not part of version 1. They have no implementation step yet, and subscription prices are not set.

| ID | Story | Step | Priority |
| --- | --- | --- | --- |
| E17-S1 | As a venue manager, I want to subscribe to a professional plan with online payment, with an annual option, so that I unlock more features. | - | Evolution |
| E17-S2 | As a player, I want to buy a gift card for games from a partner board game shop, so that I can give a game or choose one myself. | - | Evolution |
| E17-S3 | As the platform owner, I want to adapt subscription prices to each venue's capacity and city, so that the offer fits each venue. | - | Evolution |
| E17-S4 | As the platform owner, I want partnerships with independent publishers and a dropshipping offer, so that I generate new revenue. | - | Evolution |

## PRD coverage

| PRD feature | Epic |
| --- | --- |
| User account | E1 |
| Game catalogue | E2 |
| Exploration map and game venues | E3 |
| Meetups | E4 |
| Reviews and ratings | E5 |
| Personal collection | E6 |
| Notifications | E7 |
| Installable web app and native app | E8 |
| Professional account and dashboard | E9 |
| Platform quality | E10 |
| News, blog and editorial pages | E11 |
| Gamification | E12 |
| Group coordination and messaging | E13 |
| Contact form | E14 |
| Back office | E15 |
| Analytics and SEO | E16 |
| Evolutions (subscriptions, gift card) | E17 |
