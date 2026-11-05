# Document d'exigences produit (PRD)

## Produit

**Ludmigo**, « Démocratisons le jeu ! » : une plateforme communautaire pour partager et découvrir les jeux de société, et faciliter la rencontre entre joueurs et lieux de jeu.

## Utilisateurs cibles

- **Joueurs de 18 à 34 ans** (cible principale) : veulent trouver des partenaires de jeu, découvrir des jeux et de nouveaux lieux, et rencontrer des personnes autour des jeux de société. Utilisation gratuite.
- **Lieux de jeu** : bars et cafés avec une offre de jeux, bars à jeux, ludothèques, associations et boutiques spécialisées. Ils présentent leur lieu, publient leurs événements et leurs publications, et gèrent leurs jeux. L'inscription est gratuite au lancement.
- **Partenaires** (éditeurs, boutiques spécialisées) : recherchent de la visibilité. Ils ne sont pas utilisateurs de la plateforme en V1 ; les partenariats viendront plus tard.
- Les journalistes et les investisseurs sont des audiences de communication, pas des utilisateurs de la plateforme.

**Personas** (synthèse de l'étude de marché) :

- **Joueur** : une personne de 18 à 34 ans qui aime jouer, vient d'arriver dans une ville et ne connaît pas de partenaires de jeu. Elle cherche des rencontres fiables et des lieux à découvrir, sans forcément être passionnée.
- **Lieu** : un gérant de bar ou d'association qui veut proposer des jeux sans être spécialiste, avec un budget de communication limité, et qui veut être visible auprès d'une audience qualifiée.
- **Éditeur ou boutique** : un partenaire qui veut gagner en visibilité auprès des joueurs.

**Rôles retenus** :

- Un **organisateur** est tout joueur inscrit qui crée une rencontre.
- Un **lieu** est un compte professionnel (`ROLE_PLACE`).

## Problème et solution actuelle

- **Problème** : il est difficile pour un joueur de trouver des personnes et une table pour jouer, surtout s'il arrive dans une ville. Les bars à jeux sont rares et souvent complets. Les lieux n'ont pas de moyen direct d'atteindre une audience qualifiée.
- **Solution actuelle** : groupes de réseaux sociaux, bouche-à-oreille, lieux de jeu existants. Un concurrent direct, Megalithe, est en version bêta et doit être surveillé.

## Marché et concurrence

*Plusieurs chiffres ci-dessous sont anciens (2016, 2019) ou sans source : à vérifier avant tout usage public.*

- **Marché** : le jeu de société est en croissance en France, premier marché européen devant l'Allemagne. 87 % des Français déclarent jouer, dont 46 % de 18 à 34 ans. Environ 100 000 passionnés jouent très régulièrement.
- **Lieux** : 60 à 80 bars à jeux en France ; environ 500 ludothèques réunies par l'ALF ; 37 437 débits de boissons en 2016. Les bars à jeux sont en expansion, et beaucoup de boutiques spécialisées proposent un espace de jeu.
- **Événements** : les festivals et salons se développent. Le festival de Rennes en jeux 2019 a accueilli plus de 5 000 visiteurs, et une centaine de personnes n'ont pas pu entrer faute de place.
- **Concurrence directe** : Megalithe, basé à Lille, en version bêta. Il met en relation les joueurs selon les jeux qu'ils possèdent et ceux qu'ils cherchent. Un abonnement « méga-joueur » existe, et peu de bars à jeux le connaissent.
- **Concurrence indirecte** :
  - Tric Trac : communauté autour des jeux, sans rencontres physiques.
  - Meetup : événements, mais payants pour les organisateurs.
  - On va sortir : rencontres physiques, site vieillissant, un site par ville.
  - Mesvoisins et Allo Voisins : réseaux de voisinage.
  - Geekmemore : rencontres amoureuses, orientées geek.
  - Groupes et pages Facebook : nombreux, peu modérés.
  - BoardGameArena : jeux en ligne, sans rencontres physiques.
  - Oika Oika : vente à domicile, avec un animateur.
  - Bars à jeux et ludothèques : lieux physiques, souvent complets, peu visibles ou associés aux enfants.
- **Positionnement** : une plateforme géolocalisée et gratuite pour les joueurs, qui relie les rencontres physiques et la visibilité des lieux, accessible sur le web sans application à télécharger.

## Objectif et indicateurs de réussite

- **Objectif** : permettre à un joueur de trouver et rejoindre une rencontre autour d'un jeu, dans un lieu dédié ou un bar partenaire, et permettre aux lieux d'atteindre une audience qualifiée.
- **Première année** :
  - 3 000 à 5 000 inscriptions de joueurs.
  - Inscriptions de lieux. La cible de 540 clients payants concerne la phase d'abonnement (version 2), pas l'inscription gratuite de la version 1.
  - 4 000 à 6 000 fans sur la page Facebook (indicateur de communication).
- **Indicateurs produit** (cibles de départ, à réviser après trois mois) :
  - 30 rencontres rejointes par semaine.
  - 40 % des joueurs rejoignent une deuxième rencontre.
  - 10 lieux actifs sur la plateforme.

## Versions

Le produit se construit par versions. Chaque version est utilisable seule et prépare la suivante : la version 1 permet de trouver et rejoindre une rencontre, la version 1.1 enrichit l'expérience, la version 2 ajoute les revenus. « Hors V1 » veut dire que la fonctionnalité n'est pas planifiée pour l'instant.

| Version | Contenu | Priorité |
| --- | --- | --- |
| **Version 1 (lancement)** | Compte, profil, export et suppression du compte, catalogue de jeux, carte et lieux publics, rencontres, soirées récurrentes des bars partenaires, notifications par email, profil de lieu minimal, outil d'administration minimal, signalement et modération minimale, qualité et conformité | P0 |
| **Version 1.1 (juste après)** | Avis et notes, espace professionnel complet, blog et pages éditoriales, contact simple, lien vers la boutique, application web installable (PWA), lien de groupe externe et export calendrier, badge « débutants bienvenus », connexion Google ou Facebook, recherche par mots-clés, mode hors ligne, back office avec journal, analyse d'audience et SEO | P1 |
| **Version 2 (évolutions)** | Abonnements professionnels avec paiement en ligne (Stripe), chèque cadeau, tarification selon la capacité et la ville du lieu | Hors V1 |
| **Plus tard** | Application mobile native, gamification, messagerie de groupe intégrée, collection personnelle, rencontres chez un particulier, statistiques du lieu, explications des règles, formulaire de contact complet, notifications de rencontres à proximité | Hors V1 |

## Périmètre de lancement

Le lancement couvre le P0, qui inclut les notifications par email, un profil de lieu minimal, la saisie du catalogue, des lieux et des soirées, et la modération minimale. Le reste du P1 suit juste après. Pour éviter un démarrage à vide, 5 à 10 bars partenaires proposent des soirées récurrentes dès le premier jour : un événement de lieu se rejoint comme une rencontre. La V1 ne couvre que des lieux publics.

## Fonctionnalités principales

Ce tableau liste les fonctionnalités de la version 1 et de la version 1.1.

- **Priorité** : P0 = version 1, nécessaire au lancement ; P1 = version 1.1, juste après le lancement.
- **Étape** : l'étape du plan d'implémentation où la fonctionnalité est construite : 1 = mise en place, 2 = données et authentification, 3 = parcours principal, 4 = compléments, 5 = qualité, 6 = mise en ligne. Deux numéros (« 2, 4 ») veulent dire que la fonctionnalité se construit en deux temps.
- **Epics** : l'epic qui contient les user stories de la fonctionnalité.

| Fonctionnalité | Bénéfice utilisateur | Priorité | Étape | Epics |
| --- | --- | --- | --- | --- |
| Compte (inscription, connexion, réinitialisation du mot de passe) | Être identifié | P0 | 2 | E1 |
| Profil, paramètres, export et suppression du compte (RGPD) | Gérer ses données | P0 | 4 | E1 |
| Catalogue de jeux (liste, filtres, fiche d'un jeu) | Découvrir et choisir un jeu | P0 | 3 | E2 |
| Carte d'exploration et lieux publics (carte, filtres par catégorie et ville, fiche d'un lieu) | Trouver où jouer près de chez soi | P0 | 3 | E3 |
| Rencontres (chercher, créer, rejoindre, quitter, annuler, l'organisateur valide les participants) | Trouver des partenaires de jeu | P0 | 3 | E4 |
| Soirées récurrentes des bars partenaires (événement de lieu rejoignable comme une rencontre) | Toujours trouver une table dès le lancement | P0 | 4 | E3, E9 |
| Notifications par email (rencontre rejointe, quittée, annulée, rappel 24 h avant) | Ne rien manquer | P0 | 4 | E7 |
| Profil de lieu minimal (compte professionnel gratuit, fiche, horaires, jeux, événements) | Gagner en visibilité | P0 | 2, 4 | E9 |
| Outil d'administration minimal (saisie du catalogue, des lieux et des soirées) | Lancer sans attendre le back office complet | P0 | 4 | E15 |
| Signalement et modération minimale (bouton « Signaler », traitement sous 48 h) | Garder la plateforme sûre | P0 | 4 | E15 |
| Qualité et conformité (accessibilité, responsive, erreurs claires, sécurité, hébergement en France) | Utiliser la plateforme sereinement | P0 | 1, 5 | E10 |
| Avis et notes (après avoir participé à un jeu) | Aider les autres à choisir | P1 | 4 | E5 |
| Espace professionnel complet (publications, avis, rencontres du lieu) | Gérer la présence du lieu | P1 | 4 | E9 |
| Actualités, blog et pages éditoriales | Rester informé, être trouvé sur les moteurs de recherche | P1 | 4 | E11 |
| Formulaire de contact simple (choix du sujet) | Contacter Ludmigo | P1 | 4 | E14 |
| Lien vers la boutique depuis la fiche d'un jeu (affiliation Philibert) | Acheter un jeu après l'avoir découvert | P1 | 4 | E2 |
| Application web installable (PWA) avec notifications web | Accéder à la plateforme en déplacement, sans télécharger d'application | P1 | 4 | E8 |
| Lien vers un groupe externe (WhatsApp, Discord) et export calendrier pour chaque rencontre | Se coordonner sans messagerie à construire | P1 | 4 | E13 |
| Badge « débutants bienvenus » sur une rencontre ou un jeu | Oser venir sans connaître les règles | P1 | 4 | E4 |
| Connexion avec Google ou Facebook, newsletter et email de bienvenue | S'inscrire sans nouveau mot de passe, rester informé | P1 | 4 | E1 |
| Recherche par mots-clés sur la carte, jeu proposé par l'organisateur | Trouver vite, ne pas être limité par le catalogue | P1 | 4 | E3, E4 |
| Données en cache et bannière réseau hors ligne | Continuer à consulter sans réseau | P1 | 5 | E10 |
| Back office : comptes avec droits et journal (actions de l'administration, toutes les suppressions) | Contrôle et traçabilité | P1 | 2, 5 | E15 |
| Analyse d'audience (Matomo ou Plausible, Search Console) et SEO technique | Mesurer le trafic, être trouvé | P1 | 5 | E16 |

## Évolutions (hors V1)

Ces fonctionnalités sont prévues, mais elles ne font pas partie de la version 1. Leur conception se fera à une étape ultérieure, et les prix des abonnements ne sont pas encore fixés.

- **Abonnements professionnels avec paiement en ligne** : deux niveaux, avec une option annuelle possible. Les niveaux incluent le dashboard, le nombre d'événements et de publications, et le chèque cadeau. L'inscription du lieu reste gratuite en V1.
- **Chèque cadeau** pour acheter des jeux dans la boutique Philibert, lié à un abonnement.
- **Tarification des abonnements** selon la capacité d'accueil et la ville du lieu.
- **Partenariats avec des éditeurs indépendants** et **dropshipping**, comme pistes de revenus futures.

## Hors périmètre pour la version 1

- Paiement en ligne et abonnements, chèque cadeau (voir Évolutions).
- Rencontres payantes ou billetterie.
- Rencontres chez un particulier (V1 limitée aux lieux publics).
- Gamification et récompenses des partenaires.
- Messagerie de groupe intégrée (remplacée par un lien externe) et messagerie privée entre deux utilisateurs.
- Application mobile native (la PWA couvre le besoin au départ).
- Collection personnelle.
- Reportés après la V1 : explications des règles sur la fiche d'un jeu, notifications de nouvelles rencontres à proximité, statistiques du lieu, formulaire de contact complet.
- Système de réservation de tables avec gestion de stock.
- Internationalisation : l'interface est en français uniquement, et le projet ne couvre que la France pour l'instant.

## Contraintes

- Plateforme web **responsive**, de 360×640 à 1920×1080 pixels.
- **Accessibilité** : contraste suffisant, hiérarchie des titres cohérente, intitulés de liens explicites, attributs `role`, `alt` et `title`.
- **Données personnelles** : RGPD (export et suppression du compte), hébergement en France chez OVH (prévu).
- **Navigateurs** : les deux dernières versions de Chrome, Firefox, Safari et Edge. Internet Explorer n'est pas supporté, il est obsolète.
- **Paiement** : Stripe, pour les abonnements de la version 2. Aucun paquet de paiement n'est ajouté avant validation par le porteur du projet.

## Décisions prises

- L'utilisation est gratuite pour les joueurs.
- Tout joueur inscrit peut créer une rencontre.
- L'organisateur valide les participants, manuellement ou automatiquement, selon le réglage de la rencontre.
- L'inscription professionnelle est gratuite au lancement.
- Les abonnements et le chèque cadeau sont une évolution, sans prix pour l'instant.
- Le lancement couvre la grande région Ouest pour l'instant.
- La V1 ne couvre que des lieux publics : pas de rencontre chez un particulier.
- Modération : avis et profils publiés sans validation préalable, bouton « Signaler », traitement sous 48 h par l'administrateur (masquer, supprimer, suspendre un compte), charte de bonne conduite dans les CGU.
- Le web sort en premier, avec une PWA ; l'application native vient plus tard.
- La gamification, la collection personnelle et la messagerie intégrée sont hors V1.
- L'analyse d'audience utilise un outil sans consentement (Matomo ou Plausible).

## User stories

- En tant que joueur débutant, je veux parcourir des jeux adaptés aux débutants, pour choisir un jeu à découvrir sans connaître la règle au préalable (E2-S1).
- En tant que joueur, je veux voir les lieux de jeu et les rencontres sur une carte, pour trouver une table ce soir (E3-S1).
- En tant qu'organisateur, je veux créer une rencontre avec un jeu, un lieu, une date et un nombre de places, pour réunir des joueurs (E4-S5).
- En tant qu'organisateur, je veux valider les joueurs qui demandent à rejoindre ma rencontre, pour choisir qui vient (E4-S6).
- En tant que joueur, je veux noter et commenter un jeu ou un lieu après y avoir joué, pour aider les autres à choisir (E5-S1).
- En tant que responsable de lieu, je veux créer un compte professionnel gratuit et publier mes événements, pour que les joueurs me trouvent (E9-S1, E9-S4).
- En tant que responsable de lieu, je veux indiquer mes horaires d'ouverture et mes informations générales, pour que les joueurs préparent leur venue (E9-S2).
- En tant que visiteur, je veux contacter Ludmigo par un formulaire où je choisis un sujet, pour obtenir une réponse à la bonne question (E14-S1).
- En tant qu'administrateur, je veux que chaque action de l'administration et chaque suppression soient journalisées, pour retracer ce qui s'est passé (E15-S2).
- En tant que joueur, je veux quitter une rencontre que j'ai rejointe, pour libérer ma place (E4-S4).
- En tant qu'organisateur, je veux annuler ma rencontre, pour prévenir les participants (E4-S8).
- En tant que joueur, je veux recevoir un email quand je rejoins ou quitte une rencontre, quand elle est annulée, et un rappel 24 h avant, pour ne rien manquer (E7-S1, E7-S2).
- En tant que joueur, je veux rejoindre une soirée récurrente d'un bar partenaire, pour trouver une table dès mon inscription (E9-S9, E4-S2).
- En tant que joueur, je veux exporter ou supprimer mon compte, pour garder le contrôle de mes données (RGPD) (E1-S5).
- En tant que joueur, je veux signaler un avis, un profil ou une rencontre, pour que la plateforme reste sûre (E15-S3).
- En tant qu'administrateur, je veux saisir le catalogue de jeux, les lieux et les soirées récurrentes depuis un outil minimal, pour lancer la plateforme sans attendre le back office complet (E15-S4).

## Critères d'acceptation

- Étant donné un utilisateur connecté sur une rencontre ouverte et non complète, quand il clique sur « Rejoindre », alors il apparaît dans la liste des participants et la place disponible diminue de un.
- Étant donné une rencontre complète, quand un utilisateur tente de la rejoindre, alors le bouton est désactivé et un message indique « Complet ».
- Étant donné un visiteur non connecté, quand il clique sur « Rejoindre », alors il est redirigé vers la connexion puis revient sur la rencontre.
- Étant donné une recherche sans résultat, quand la liste s'affiche, alors un message propose d'élargir le rayon ou la date.
- Étant donné une rencontre en validation manuelle, quand un joueur demande à rejoindre, alors la place n'est prise qu'à partir du moment où l'organisateur accepte.
- Étant donné une rencontre, quand elle apparaît sur la carte, alors elle est rattachée à un lieu public.
- Étant donné un joueur dont la participation n'a pas été acceptée ou dont la rencontre n'a pas encore eu lieu, quand il tente de commenter le jeu ou le lieu, alors le formulaire d'avis n'est pas disponible.
- Étant donné un joueur qui a rejoint une rencontre, quand il la quitte, alors sa place se libère et le nombre de places disponibles augmente de un.
- Étant donné un joueur déjà inscrit à une rencontre, quand il tente de la rejoindre à nouveau, alors l'action est refusée et un message l'indique.
- Étant donné une rencontre en validation automatique et non complète, quand un joueur clique sur « Rejoindre », alors sa place est prise immédiatement.
- Étant donné une rencontre, quand l'organisateur l'annule, alors elle n'est plus proposée et chaque participant reçoit un email d'annulation.
- Étant donné un participant à une rencontre qui a lieu dans 24 heures, quand l'échéance arrive, alors il reçoit un email de rappel.
- Étant donné un organisateur qui crée une rencontre, quand il saisit une date passée, moins de 2 places ou plus de places que le maximum de joueurs du jeu, alors la création est refusée avec un message explicite.
- Étant donné un joueur connecté, quand il demande l'export de ses données, alors il reçoit un fichier de ses données personnelles ; quand il demande la suppression, alors ses données personnelles sont supprimées et ses rencontres passées sont anonymisées, dans un délai maximal d'un mois.
- Étant donné un avis, un profil ou une rencontre, quand un joueur clique sur « Signaler », alors le signalement est visible par l'administrateur, qui le traite sous 48 heures et peut masquer le contenu.
- Étant donné une soirée récurrente saisie par l'équipe pour un bar partenaire, quand elle est enregistrée, alors chaque occurrence apparaît comme une rencontre que l'on peut rejoindre.

## Risques

- **Communauté trop petite** : sans joueurs actifs, peu de rencontres auront lieu et peu de lieux seront rejoints. Réponses prévues : inscription gratuite, soirées récurrentes dans 5 à 10 bars partenaires dès le lancement, et avantages pour les joueurs actifs.
- **Acquisition des lieux** : les lieux doivent être démarchés. Le démarrage repose sur une équipe commerciale, une démo sur tablette et un argumentaire clair. L'inscription gratuite réduit le frein.
- **Concurrence** : Megalithe est en bêta et doit être suivi.
- **Modération et données personnelles** : politique de signalement décidée (voir Décisions prises). La conformité RGPD est à prendre en compte dès la conception.

## Questions ouvertes

1. Quel modèle économique pour les abonnements des lieux (offres et prix) ?
2. Quelle source ouverte pour le catalogue de jeux, et sous quelles conditions de licence ?

Décidé : les rencontres payantes, la collection personnelle, la gamification et l'application native sont hors V1 ; le web sort en premier, avec une PWA.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Product Requirements Document (PRD)

## Product

**Ludmigo**, "Démocratisons le jeu!" (Let's democratise board gaming): a community platform to share and discover board games, and to make it easier for players and game venues to meet.

## Target users

- **Players aged 18 to 34** (main target): want to find playing partners, discover games and new venues, and meet people around board games. Free to use.
- **Game venues**: bars and cafés with a game offer, game bars, game libraries, associations and specialist shops. They present their venue, publish their events and posts, and manage their games. Sign-up is free at launch.
- **Partners** (publishers, specialist shops): look for visibility. They are not users of the platform in V1; partnerships come later.
- Journalists and investors are communication audiences, not users of the platform.

**Personas** (summary of the market study):

- **Player**: a person aged 18 to 34 who likes playing, has just arrived in a city and does not know any playing partners. They look for reliable meetups and venues to discover, without necessarily being an enthusiast.
- **Venue**: the manager of a bar or association who wants to offer games without being a specialist, with a limited communication budget, and who wants to be visible to a qualified audience.
- **Publisher or shop**: a partner who wants more visibility among players.

**Roles**:

- An **organiser** is any registered player who creates a meetup.
- A **venue** is a professional account (`ROLE_PLACE`).

## Problem and current solution

- **Problem**: it is hard for a player to find people and a table to play, especially when arriving in a city. Game bars are rare and often full. Venues have no direct way to reach a qualified audience.
- **Current solution**: social network groups, word of mouth, existing game venues. A direct competitor, Megalithe, is in beta and must be monitored.

## Market and competition

*Several figures below are old (2016, 2019) or unsourced: check them before any public use.*

- **Market**: board gaming is growing in France, the first European market ahead of Germany. 87% of French people say they play, including 46% of those aged 18 to 34. About 100,000 enthusiasts play very regularly.
- **Venues**: 60 to 80 game bars in France; about 500 game libraries (ludothèques) gathered by the ALF; 37,437 drinking establishments in 2016. Game bars are expanding, and many specialist shops offer a play area.
- **Events**: festivals and shows are growing. The 2019 Rennes en jeux festival welcomed more than 5,000 visitors, and about a hundred people could not get in for lack of space.
- **Direct competition**: Megalithe, based in Lille, in beta. It connects players based on the games they own and the ones they look for. A "méga-joueur" subscription exists, and few game bars know it.
- **Indirect competition**:
  - Tric Trac: a community around games, with no physical meetups.
  - Meetup: events, but paid for organisers.
  - On va sortir: physical meetups, an ageing site, one site per city.
  - Mesvoisins and Allo Voisins: neighbourhood networks.
  - Geekmemore: dating, geek-oriented.
  - Facebook groups and pages: many, lightly moderated.
  - BoardGameArena: online games, no physical meetups.
  - Oika Oika: home sales, with a host.
  - Game bars and game libraries: physical places, often full, not very visible or associated with children.
- **Positioning**: a geolocated, free platform for players, linking physical meetups and venue visibility, available on the web with no app to download.

## Goal and success indicators

- **Goal**: let a player find and join a meetup around a game, in a dedicated venue or a partner bar, and let venues reach a qualified audience.
- **Year 1**:
  - 3,000 to 5,000 player sign-ups.
  - Venue sign-ups. The target of 540 paying clients concerns the subscription phase (version 2), not the free sign-up of version 1.
  - 4,000 to 6,000 fans on the Facebook page (communication indicator).
- **Product indicators** (starting targets, to review after three months):
  - 30 meetups joined per week.
  - 40% of players join a second meetup.
  - 10 active venues on the platform.

## Versions

The product is built in versions. Each version is usable on its own and prepares the next: version 1 lets users find and join a meetup, version 1.1 enriches the experience, version 2 adds revenue. "Out of V1" means the feature is not planned for now.

| Version | Contents | Priority |
| --- | --- | --- |
| **Version 1 (launch)** | Account, profile, account export and deletion, game catalogue, map and public venues, meetups, recurring evenings in partner bars, email notifications, minimal venue profile, minimal admin tool, reporting and minimal moderation, quality and compliance | P0 |
| **Version 1.1 (right after)** | Reviews and ratings, full professional area, blog and editorial pages, simple contact, link to the shop, installable web app (PWA), external group link and calendar export, "beginners welcome" badge, Google or Facebook sign-in, keyword search, offline mode, back office with log, analytics and SEO | P1 |
| **Version 2 (evolutions)** | Professional subscriptions with online payment (Stripe), gift card, pricing based on the venue's capacity and city | Out of V1 |
| **Later** | Native mobile app, gamification, built-in group messaging, personal collection, meetups at a private home, venue statistics, rules explanations, full contact form, nearby-meetup notifications | Out of V1 |

## Launch scope

The launch covers P0, which includes email notifications, a minimal venue profile, entering the catalogue, venues and evenings, and minimal moderation. The rest of P1 follows right after. To avoid an empty start, 5 to 10 partner bars offer recurring evenings from day one: a venue event is joined like a meetup. V1 covers public venues only.

## Main features

This table lists the features of version 1 and version 1.1.

- **Priority**: P0 = version 1, needed for the launch; P1 = version 1.1, right after the launch.
- **Step**: the step of the implementation plan where the feature is built: 1 = setup, 2 = data and authentication, 3 = main flow, 4 = additions, 5 = quality, 6 = go live. Two numbers ("2, 4") mean the feature is built in two stages.
- **Epics**: the epic that holds the feature's user stories.

| Feature | User benefit | Priority | Step | Epics |
| --- | --- | --- | --- | --- |
| Account (sign-up, sign-in, password reset) | Be identified | P0 | 2 | E1 |
| Profile, settings, account export and deletion (GDPR) | Manage your data | P0 | 4 | E1 |
| Game catalogue (list, filters, game page) | Discover and choose a game | P0 | 3 | E2 |
| Exploration map and public venues (map, filters by category and city, venue page) | Find where to play near you | P0 | 3 | E3 |
| Meetups (search, create, join, leave, cancel, the organiser validates participants) | Find playing partners | P0 | 3 | E4 |
| Recurring evenings in partner bars (venue event joinable like a meetup) | Always find a table from the launch | P0 | 4 | E3, E9 |
| Email notifications (meetup joined, left, cancelled, reminder 24 h before) | Miss nothing | P0 | 4 | E7 |
| Minimal venue profile (free professional account, page, opening hours, games, events) | Gain visibility | P0 | 2, 4 | E9 |
| Minimal admin tool (entering the catalogue, venues and evenings) | Launch without waiting for the full back office | P0 | 4 | E15 |
| Reporting and minimal moderation ("Report" button, handled within 48 h) | Keep the platform safe | P0 | 4 | E15 |
| Quality and compliance (accessibility, responsive, clear errors, security, hosting in France) | Use the platform with peace of mind | P0 | 1, 5 | E10 |
| Reviews and ratings (after taking part in a game) | Help others choose | P1 | 4 | E5 |
| Full professional area (posts, reviews, venue meetups) | Manage the venue's presence | P1 | 4 | E9 |
| News, blog and editorial pages | Stay informed, be found on search engines | P1 | 4 | E11 |
| Simple contact form (choice of subject) | Contact Ludmigo | P1 | 4 | E14 |
| Link to the shop from a game page (Philibert affiliation) | Buy a game after discovering it | P1 | 4 | E2 |
| Installable web app (PWA) with web notifications | Use the platform on the move, without downloading an app | P1 | 4 | E8 |
| Link to an external group (WhatsApp, Discord) and calendar export for each meetup | Coordinate without building a messaging system | P1 | 4 | E13 |
| "Beginners welcome" badge on a meetup or a game | Dare to come without knowing the rules | P1 | 4 | E4 |
| Google or Facebook sign-in, newsletter and welcome email | Sign up without a new password, stay informed | P1 | 4 | E1 |
| Keyword search on the map, game suggested by the organiser | Find quickly, not be limited by the catalogue | P1 | 4 | E3, E4 |
| Cached data and offline network banner | Keep browsing without a network | P1 | 5 | E10 |
| Back office: accounts with rights and log (administration actions, all deletions) | Control and traceability | P1 | 2, 5 | E15 |
| Analytics (Matomo or Plausible, Search Console) and technical SEO | Measure traffic, be found | P1 | 5 | E16 |

## Evolutions (out of V1)

These features are planned, but they are not part of version 1. Their design will come at a later step, and subscription prices are not set yet.

- **Professional subscriptions with online payment**: two tiers, with a possible annual option. The tiers include the dashboard, the number of events and posts, and the gift card. Venue sign-up stays free in V1.
- **Gift card** to buy games in the Philibert shop, tied to a subscription.
- **Subscription pricing** based on the venue's capacity and city.
- **Partnerships with independent publishers** and **dropshipping**, as future revenue leads.

## Out of scope for version 1

- Online payment and subscriptions, gift card (see Evolutions).
- Paid meetups or ticketing.
- Meetups at a private home (V1 is limited to public venues).
- Gamification and partner rewards.
- Built-in group messaging (replaced by an external link) and private messaging between two users.
- Native mobile app (the PWA covers the need at first).
- Personal collection.
- Postponed after V1: rules explanations on a game page, notifications of new nearby meetups, venue statistics, full contact form.
- Table booking system with stock management.
- Internationalisation: the interface is in French only, and the project covers France only for now.

## Constraints

- **Responsive** web platform, from 360×640 to 1920×1080 pixels.
- **Accessibility**: sufficient contrast, consistent heading hierarchy, explicit link labels, `role`, `alt` and `title` attributes.
- **Personal data**: GDPR (account export and deletion), hosting in France at OVH (planned).
- **Browsers**: the last two versions of Chrome, Firefox, Safari and Edge. Internet Explorer is not supported, it is obsolete.
- **Payment**: Stripe, for the version 2 subscriptions. No payment package is added before the project owner validates it.

## Decisions made

- Use is free for players.
- Any registered player can create a meetup.
- The organiser validates participants, manually or automatically, depending on the meetup's setting.
- Professional sign-up is free at launch.
- Subscriptions and the gift card are an evolution, with no price for now.
- The launch covers the Grand Ouest region for now.
- V1 covers public venues only: no meetup at a private home.
- Moderation: reviews and profiles published without prior validation, "Report" button, handled within 48 h by the administrator (hide, delete, suspend an account), code of conduct in the terms of use.
- The web ships first, with a PWA; the native app comes later.
- Gamification, the personal collection and built-in messaging are out of V1.
- Analytics use a tool that needs no consent (Matomo or Plausible).

## User stories

- As a beginner player, I want to browse beginner-friendly games, so that I can pick a game to discover without knowing the rules beforehand (E2-S1).
- As a player, I want to see game venues and meetups on a map, so that I can find a table tonight (E3-S1).
- As an organiser, I want to create a meetup with a game, a venue, a date and a number of seats, so that I can gather players (E4-S5).
- As an organiser, I want to validate the players who ask to join my meetup, so that I choose who comes (E4-S6).
- As a player, I want to rate and comment on a game or a venue after playing there, so that I help others choose (E5-S1).
- As a venue manager, I want to create a free professional account and publish my events, so that players find me (E9-S1, E9-S4).
- As a venue manager, I want to give my opening hours and general information, so that players can prepare their visit (E9-S2).
- As a visitor, I want to contact Ludmigo through a form where I choose a subject, so that I get an answer to the right question (E14-S1).
- As an administrator, I want every administration action and every deletion to be logged, so that I can trace what happened (E15-S2).
- As a player, I want to leave a meetup I joined, so that I free my seat (E4-S4).
- As an organiser, I want to cancel my meetup, so that participants are warned (E4-S8).
- As a player, I want to receive an email when I join or leave a meetup, when it is cancelled, and a reminder 24 h before, so that I miss nothing (E7-S1, E7-S2).
- As a player, I want to join a recurring evening in a partner bar, so that I find a table as soon as I sign up (E9-S9, E4-S2).
- As a player, I want to export or delete my account, so that I keep control of my data (GDPR) (E1-S5).
- As a player, I want to report a review, a profile or a meetup, so that the platform stays safe (E15-S3).
- As an administrator, I want to enter the game catalogue, venues and recurring evenings from a minimal tool, so that the platform can launch without waiting for the full back office (E15-S4).

## Acceptance criteria

- Given a signed-in user on an open meetup that is not full, when they click "Join", then they appear in the participant list and the available seats drop by one.
- Given a full meetup, when a user tries to join it, then the button is disabled and a message says "Full".
- Given a visitor who is not signed in, when they click "Join", then they are redirected to sign-in and then return to the meetup.
- Given a search with no result, when the list is displayed, then a message suggests widening the radius or the date.
- Given a meetup in manual validation, when a player asks to join, then the seat is taken only once the organiser accepts.
- Given a meetup, when it appears on the map, then it is attached to a public venue.
- Given a player whose participation was not accepted, or whose meetup has not taken place yet, when they try to comment on the game or venue, then the review form is not available.
- Given a player who joined a meetup, when they leave it, then their seat is freed and the available seats go up by one.
- Given a player already registered for a meetup, when they try to join it again, then the action is refused and a message says so.
- Given a meetup in automatic validation that is not full, when a player clicks "Join", then their seat is taken immediately.
- Given a meetup, when the organiser cancels it, then it is no longer offered and each participant receives a cancellation email.
- Given a participant in a meetup taking place in 24 hours, when the deadline arrives, then they receive a reminder email.
- Given an organiser creating a meetup, when they enter a past date, fewer than 2 seats or more seats than the game's maximum number of players, then the creation is refused with an explicit message.
- Given a signed-in player, when they ask for an export of their data, then they receive a file of their personal data; when they ask for deletion, then their personal data is deleted and their past meetups are anonymised, within one month at most.
- Given a review, a profile or a meetup, when a player clicks "Report", then the report is visible to the administrator, who handles it within 48 hours and can hide the content.
- Given a recurring evening entered by the team for a partner bar, when it is saved, then each occurrence appears as a meetup that can be joined.

## Risks

- **Community too small**: without active players, few meetups will take place and few venues will be joined. Planned answers: free sign-up, recurring evenings in 5 to 10 partner bars from the launch, and perks for active players.
- **Venue acquisition**: venues must be prospected. The start relies on a sales team, a tablet demo and a clear pitch. Free sign-up lowers the barrier.
- **Competition**: Megalithe is in beta and must be followed.
- **Moderation and personal data**: reporting policy decided (see Decisions made). GDPR compliance is to be considered from the design stage.

## Open questions

1. What business model for venue subscriptions (offers and prices)?
2. Which open source for the game catalogue, and under which licence terms?

Decided: paid meetups, the personal collection, gamification and the native app are out of V1; the web ships first, with a PWA.
