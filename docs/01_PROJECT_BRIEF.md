# Brief projet

## Projet

**Ludmigo**, « Démocratisons le jeu ! » : une plateforme communautaire géolocalisée pour partager et découvrir les jeux de société, et aider les joueurs à se rencontrer dans des lieux dédiés ou des bars partenaires.

Domaines : `ludmigo.fr` (public français), `ludmigo.com` (international).

Le projet démarre dans la grande région Ouest, puis s'étendra à Paris et à la France entière.

## Problème

Il est difficile pour un joueur de trouver des partenaires de jeu et une table, surtout s'il débute ou vient d'arriver dans une ville. Les bars à jeux sont rares et souvent complets, et les lieux n'ont pas de moyen direct d'atteindre une audience qualifiée.

Solutions actuelles : groupes et pages Facebook, bouche-à-oreille, bars à jeux, ludothèques, associations et quelques plateformes existantes.

## Utilisateurs

| Segment | Besoin |
| --- | --- |
| Joueurs de 18 à 34 ans (cible principale) | Trouver des partenaires de jeu, découvrir des jeux et des lieux, rencontrer des gens |
| Joueurs expérimentés | Partager des avis, trouver des parties |
| Lieux : bars et cafés, bars à jeux, ludothèques, associations, boutiques | Être trouvés par les joueurs, proposer un service de jeu, toucher une audience qualifiée |

- Un **organisateur** est tout joueur inscrit (`ROLE_USER`) ; un **lieu** est un compte professionnel (`ROLE_PLACE`).
- Les joueurs utilisent la plateforme gratuitement. L'inscription des lieux est gratuite au lancement.

## Objectif et critères de succès

- **Objectif** : un joueur peut trouver et rejoindre une rencontre autour d'un jeu, dans un lieu dédié ou un bar partenaire. Les lieux peuvent toucher une audience qualifiée.
- **Indicateurs produit** (cibles de départ, à réviser après trois mois) :
  - 30 rencontres rejointes par semaine
  - 40 % des joueurs rejoignent une deuxième rencontre
  - 10 lieux actifs sur la plateforme
- **Première année** : 3 000 à 5 000 inscriptions de joueurs. La cible de 540 clients payants concerne la phase d'abonnement (version 2).

## Périmètre

- **Versions** : version 1 (lancement, P0), version 1.1 (juste après, P1), version 2 (évolutions).
- **V1, P0** : comptes utilisateurs, onboarding, jeux favoris, carte d'exploration, catalogue de jeux, fiches de lieux publics, rencontres (créer, rechercher, rejoindre, quitter, valider les participants), soirées récurrentes dans quelques bars partenaires, notifications par email, profil de lieu minimal, outil d'administration minimal pour saisir le catalogue, les lieux et les soirées, modération minimale.
- **V1.1, P1** : avis et notes, lien vers la boutique, actualités et blog, pages éditoriales, formulaire de contact simple, espace professionnel complet, back office avec journal des actions sensibles, analyse d'audience sans consentement et SEO, application web installable (PWA), lien de groupe externe et export calendrier, badge « débutants bienvenus ».
- **Évolutions (version 2)** : abonnements professionnels avec paiement en ligne, chèque cadeau, tarification selon la capacité et la ville du lieu.
- **Hors V1** : messagerie privée entre utilisateurs, messagerie de groupe intégrée, gamification et récompenses des partenaires, collection personnelle, statistiques du lieu, explications des règles, formulaire de contact complet, notifications de rencontres à proximité, rencontres chez un particulier, application mobile native, réservation de tables avec gestion de stock, interface dans une autre langue que le français.

## Contraintes

- Interface uniquement en français en V1 ; le projet ne couvre que la France pour l'instant.
- Lancement dans la grande région Ouest.
- Plateforme responsive, de 360×640 à 1920×1080 pixels, et accessible (contraste, titres, intitulés de liens, attributs).
- RGPD : consentement, export des données et suppression du compte.
- Hébergement en France chez OVH (prévu).
- Une seule logique métier, dans l'API ; le web et le mobile n'affichent et n'envoient que des données.

## Risques

- **Démarrage à froid** : peu de lieux et de joueurs au lancement, donc beaucoup d'écrans risquent d'être vides. Chaque écran prévoit un état vide utile.
- **Taille de la communauté** : sans joueurs actifs, les lieux ne seront pas rejoints, et l'inverse est vrai. Réponses prévues : inscription gratuite, soirées récurrentes dans 5 à 10 bars partenaires dès le lancement, et avantages pour les joueurs actifs.
- **Acquisition des lieux** : le démarchage commercial est indispensable (argumentaire, démo, présence sur le terrain).
- **Modération** : les avis et les profils sont publiés sans validation préalable ; les utilisateurs signalent, l'administrateur traite sous 48 h.
- **Paiements** : en V1, aucune consommation ni entrée n'est encaissée via la plateforme. Décidé : les rencontres payantes et la billetterie sont hors V1.

## Questions ouvertes

1. Quel modèle économique pour les abonnements des lieux (offres et prix) ?
2. Quelle source ouverte pour le catalogue de jeux, et sous quelles conditions de licence ?

Décidé : la modération (signalement, traitement sous 48 h), les rencontres payantes, la collection personnelle, la gamification et l'application native sont hors V1 ; le web (avec PWA) sort en premier.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# Project Brief

## Project

**Ludmigo**, "Démocratisons le jeu!" (Let's democratise board gaming): a geolocated community platform to share and discover board games, and to help players meet each other in dedicated venues or partner bars.

Domains: `ludmigo.fr` (French public), `ludmigo.com` (international).

The project starts in the Grand Ouest region, then will extend to Paris and the whole of France.

## Problem

It is hard for a player to find playing partners and a table, especially a beginner or someone who has just arrived in a city. Game bars are rare and often full, and venues have no direct way to reach a qualified audience.

Current solutions: Facebook groups and pages, word of mouth, game bars, game libraries (ludothèques), associations and a few existing platforms.

## Users

| Segment | Need |
| --- | --- |
| Players aged 18 to 34 (main target) | Find playing partners, discover games and venues, meet people |
| Experienced players | Share reviews, find games to join |
| Venues: bars and cafés, game bars, game libraries, associations, shops | Be found by players, offer a game service, reach a qualified audience |

- An **organiser** is any registered player (`ROLE_USER`); a **venue** is a professional account (`ROLE_PLACE`).
- Players use the platform for free. Venue sign-up is free at launch.

## Goal and success criteria

- **Goal**: a player can find and join a game meetup in a dedicated venue or a partner bar. Venues can reach a qualified audience.
- **Product indicators** (starting targets, to review after three months):
  - 30 meetups joined per week
  - 40% of players join a second meetup
  - 10 active venues on the platform
- **Year 1**: 3,000 to 5,000 player sign-ups. The target of 540 paying clients concerns the subscription phase (version 2).

## Scope

- **Versions**: version 1 (launch, P0), version 1.1 (right after, P1), version 2 (evolutions).
- **V1, P0**: user accounts, onboarding, favourite games, exploration map, game catalogue, public venue pages, meetups (create, search, join, leave, validate participants), recurring evenings in a few partner bars, email notifications, a minimal venue profile, a minimal admin tool to enter the catalogue, venues and evenings, minimal moderation.
- **V1.1, P1**: reviews and ratings, link to the shop, news and blog, editorial pages, simple contact form, full professional area, back office with a log of sensitive actions, analytics without consent and SEO, installable web app (PWA), external group link and calendar export, "beginners welcome" badge.
- **Evolutions (version 2)**: professional subscriptions with online payment, gift card, pricing based on the venue's capacity and city.
- **Out of V1**: private messaging between users, built-in group messaging, gamification and partner rewards, personal collection, venue statistics, rules explanations, full contact form, nearby-meetup notifications, meetups at a private home, native mobile app, table booking with stock management, interface in languages other than French.

## Constraints

- Interface in French only in V1; the project covers France only for now.
- Launch in the Grand Ouest region.
- Responsive platform, from 360×640 to 1920×1080 pixels, and accessible (contrast, headings, link labels, attributes).
- GDPR: consent, data export and account deletion.
- Hosting in France at OVH (planned).
- One business logic, in the API; web and mobile only display and send data.

## Risks

- **Cold start**: few venues and players at launch, so many screens risk being empty. Each screen plans a useful empty state.
- **Community size**: without active players, venues will not be joined, and the reverse is true. Planned answers: free sign-up, recurring evenings in 5 to 10 partner bars from the launch, and perks for active players.
- **Venue acquisition**: commercial prospecting is essential (pitch, demo, field presence).
- **Moderation**: reviews and profiles are published without prior validation; users report, the administrator handles reports within 48 hours.
- **Payments**: in V1, no drinks or entry fees are charged through the platform. Decided: paid meetups and ticketing are out of V1.

## Open questions

1. What business model for venue subscriptions (offers and prices)?
2. Which open source for the game catalogue, and under which licence terms?

Decided: moderation (reporting, handled within 48 hours), paid meetups, the personal collection, gamification and the native app are out of V1; the web app (with PWA) ships first.
