# Design UI/UX

## Public et ton

- **Joueurs** : débutants et confirmés, de 18 à 45 ans environ, en mobilité, qui cherchent à se retrouver autour d'un jeu.
- **Gestionnaires de lieux** : responsables de bars, de ludothèques, d'associations et de boutiques, sur ordinateur ou tablette, qui gèrent leur fiche entre deux services.
- **Administrateurs** : équipe Ludmigo, sur ordinateur, pour le catalogue, la modération et le journal d'audit.
- **Trois adjectifs** : **chaleureux**, **accessible**, **ludique**.

## Inspirations

- **Meetup**, pour la clarté des listes d'événements.
- **À reprendre** : cartes de rencontre lisibles, filtres simples, actions principales visibles.
- **À éviter** : interfaces surchargées, bannières promotionnelles, saisie longue dès la première visite.

## Palette de couleurs

Les couleurs viennent du logo : les quatre pions, le jaune-orangé et le beige. Les valeurs utilisées pour du texte (vert, orange, turquoise) sont assombries pour rester lisibles.

| Rôle | Couleur | Usage |
| --- | --- | --- |
| Principale | `#F8A00D` (jaune-orangé) | Boutons principaux, avec texte et contour `#3E3E3E` |
| Secondaire | `#155767` (bleu pétrole) | Bandeaux, navigation active, texte blanc dessus |
| Fond | `#F4F4F4` | Fond des pages |
| Surface | `#FFFFFF` | Cartes, formulaires |
| Texte | `#3E3E3E` (gris du logo) | Texte principal |
| Texte secondaire | `#5A5A5A` | Libellés, méta-données |
| Pion bleu | `#006CA8` | Liens, messages d'information |
| Pion orange | `#F28A15` | Illustrations, repères (texte : `#B85F00`) |
| Pion vert | `#00A970` | Illustrations, repères (texte et succès : `#007A52`) |
| Pion turquoise | `#129A9C` | Illustrations, repères (texte : `#0B7577`) |
| Beige | `#DEB490` | Fonds décoratifs, table de jeu des illustrations |
| Erreur | `#D70605` (rouge de la charte) | Erreurs de formulaire |

Contrastes mesurés sur le fond `#F4F4F4` : texte principal 9,7:1, texte secondaire 6,3:1, bleu 5,2:1, rouge 4,9:1, vert de texte 4,9:1, turquoise de texte 5,0:1. Le jaune `#F8A00D` fait 1,9:1 sur le fond : il ne sert jamais de couleur de texte, et un bouton jaune garde son contour `#3E3E3E` (texte dessus : 5,1:1). Le vert `#00A970` (2,8:1) et l'orange `#B85F00` (4,1:1, sous le seuil de 4,5:1) ne sont pas utilisés comme texte courant.

## Typographie

- **Familles** : Sniglet pour les titres, Fira Sans pour le texte.
- **Titres** : H1 32 px, H2 24 px, H3 20 px, en Sniglet graisse 800 (seules graisses disponibles : 400 et 800).
- **Texte** : 16 px (corps), 14 px (libellés), 12 px (méta-données, minimum).
- **Interligne** : 1,5 pour le corps.

## Composants

- **Boutons** : principal (plein), secondaire (contour), texte (lien). Hauteur minimale 44 px.
- **Formulaires** : libellé au-dessus du champ, message d'erreur sous le champ, jamais de placeholder seul comme libellé.
- **Cartes** : rencontre (jeu, lieu, date, places restantes), jeu (visuel, nom, nombre de joueurs, durée).
- **Navigation** : barre d'onglets en bas (mobile), barre latérale (web).
- **Alertes** : bandeau pour l'état réseau, toast pour les confirmations (5 s), message en ligne pour les erreurs.
- **Carte** : marqueurs par catégorie de lieu, regroupement quand ils se chevauchent, liste équivalente pour les lecteurs d'écran.
- **Indicateurs** (tableau de bord) : cartes de chiffres clés, avec libellé et période.
- **Statuts** : étiquettes « Brouillon », « Publié », « En attente de validation », « Annulé ».
- **Tableaux** (back office, web) : colonnes triables, filtres, pagination.

## Règles de mise en page

- **Grille** : 4 colonnes (mobile), 8 colonnes (tablette), 12 colonnes (web).
- **Espacements** : multiples de 4 px (4, 8, 12, 16, 24, 32).
- **Points de rupture** : 640 px (tablette), 1024 px (ordinateur).
- **Plage couverte** : de 360 × 640 px à 1920 × 1080 px. Au-delà, le contenu reste centré avec une largeur maximale.
- **Marges latérales sur mobile** : 16 px.

## Notes par écran

- **Accueil** : rencontres proches en premier, bouton « Créer une rencontre » visible, jeux mis en avant ensuite.
- **Recherche** : filtres en haut (jeu, lieu, date), liste de cartes de rencontre, compteur de résultats.
- **Détail d'une rencontre** : bouton « Rejoindre » en bas d'écran (mobile) ou à droite (web), infos clés (date, lieu, jeu, places) avant la description.
- **Créer une rencontre** : formulaire en une page, champs obligatoires en tête, validation en direct.
- **Fiche de jeu** : nombre de joueurs et durée en haut, description, puis rencontres liées.
- **Profil** : rencontres à venir en premier, historique ensuite.
- **Carte d'exploration** : carte pleine largeur, filtres dans un panneau repliable (mobile) ou à gauche (web), liste synchronisée avec la carte.
- **Tableau de bord du lieu** : sur mobile, sections en onglets simples (Fiche, Jeux, Événements, Publications, Avis) ; sur web, barre latérale. L'action principale « Publier » reste visible.
- **Formulaire de contact** : choix du sujet en premier, puis les champs ; page de confirmation sobre.
- **Blog** : cartes avec image, date et titre ; lecture sans inscription.
- **Bandeau de cookies** : en bas de page, sans bloquer la lecture ; « Accepter » et « Refuser » ont le même poids visuel.
- **Back office** : web uniquement, barre latérale, tableaux pour les listes, formulaires en colonne unique.

## Accessibilité

- Contraste conforme WCAG 2.1 AA.
- Navigation complète au clavier sur le web, focus visible.
- Chaque champ et chaque icône interactive a un libellé accessible.
- Zones tactiles d'au moins 44 × 44 px.
- Respect de la taille de police choisie par l'utilisateur sur mobile.
- Carte : la même information est accessible sous forme de liste.
- Bandeau de cookies : utilisable au clavier, sans piège de focus.

## États d'interaction

- **Survol** (web) : légère variation de couleur, curseur pointeur.
- **Focus** : contour de 2 px couleur accent.
- **Désactivé** : opacité 40 %, aucune interaction.
- **Chargement** : spinner dans le bouton, squelette pour les listes.
- **Erreur** : message texte et couleur d'erreur, jamais la couleur seule.
- **Succès** : toast vert avec un message court.

## Éléments graphiques

- **Logo Ludmigo** : fourni en SVG dans `web/src/assets/logos/` : version avec la baseline, version couleur et version avec les personnages, chacune en noir et en blanc (6 fichiers). Une icône d'application sera dérivée de la version avec les personnages au lancement de l'application native.
- **Icônes** : Phosphor Icons, 24 px, un seul style dans toute l'application.
- **Illustrations** : les quatre pions de la charte posés sur une table de jeu, déclinés pour les états vides et l'onboarding.
- **Visuels de jeux** : fournis par les éditeurs ou par les utilisateurs, avec une image de repli neutre.
- **Icônes des catégories de lieux** : bar à jeux, bar et café, ludothèque, association, boutique, pour la carte et les filtres.
- **Captures d'écran** : pour les stores iOS et Android, avec l'application native (hors V1).
- **Gabarits du back office** : web uniquement ; pas de maquette mobile pour l'administration.

<br>

<p align="center">
  <img height="32" src="https://img.shields.io/badge/-%F0%9F%87%AC%F0%9F%87%A7%20English-012169?style=for-the-badge" alt="🇬🇧 English">
</p>

<br>

# UI/UX design

## Audience and tone

- **Players**: beginners and experienced, aged about 18 to 45, on the move, looking to get together around a game.
- **Venue managers**: managers of bars, game libraries, associations and shops, on a computer or tablet, who manage their page between two services.
- **Administrators**: the Ludmigo team, on a computer, for the catalogue, moderation and the audit log.
- **Three adjectives**: **warm**, **accessible**, **playful**.

## Inspirations

- **Meetup**, for the clarity of its event lists.
- **To take on**: readable meetup cards, simple filters, visible main actions.
- **To avoid**: cluttered interfaces, promotional banners, long data entry on the first visit.

## Colour palette

The colours come from the logo: the four pawns, the orange-yellow and the beige. The values used for text (green, orange, turquoise) are darkened to stay readable.

| Role | Colour | Use |
| --- | --- | --- |
| Primary | `#F8A00D` (orange-yellow) | Main buttons, with `#3E3E3E` text and outline |
| Secondary | `#155767` (petrol blue) | Banners, active navigation, white text on top |
| Background | `#F4F4F4` | Page background |
| Surface | `#FFFFFF` | Cards, forms |
| Text | `#3E3E3E` (logo grey) | Main text |
| Secondary text | `#5A5A5A` | Labels, metadata |
| Blue pawn | `#006CA8` | Links, information messages |
| Orange pawn | `#F28A15` | Illustrations, markers (text: `#B85F00`) |
| Green pawn | `#00A970` | Illustrations, markers (text and success: `#007A52`) |
| Turquoise pawn | `#129A9C` | Illustrations, markers (text: `#0B7577`) |
| Beige | `#DEB490` | Decorative backgrounds, the game table in illustrations |
| Error | `#D70605` (brand red) | Form errors |

Contrasts measured on the `#F4F4F4` background: main text 9.7:1, secondary text 6.3:1, blue 5.2:1, red 4.9:1, text green 4.9:1, text turquoise 5.0:1. The yellow `#F8A00D` is 1.9:1 on the background: it is never used as a text colour, and a yellow button keeps its `#3E3E3E` outline (text on it: 5.1:1). The green `#00A970` (2.8:1) and the orange `#B85F00` (4.1:1, below the 4.5:1 threshold) are not used as body text.

## Typography

- **Families**: Sniglet for headings, Fira Sans for text.
- **Headings**: H1 32 px, H2 24 px, H3 20 px, in Sniglet weight 800 (only weights available: 400 and 800).
- **Text**: 16 px (body), 14 px (labels), 12 px (metadata, minimum).
- **Line height**: 1.5 for body text.

## Components

- **Buttons**: primary (filled), secondary (outlined), text (link). Minimum height 44 px.
- **Forms**: label above the field, error message under the field, never a placeholder alone as a label.
- **Cards**: meetup (game, venue, date, seats left), game (visual, name, number of players, duration).
- **Navigation**: bottom tab bar (mobile), sidebar (web).
- **Alerts**: banner for the network state, toast for confirmations (5 s), inline message for errors.
- **Map**: markers by venue category, clustering when they overlap, an equivalent list for screen readers.
- **Indicators** (dashboard): key-figure cards, with a label and a period.
- **Statuses**: "Draft", "Published", "Awaiting validation", "Cancelled" labels.
- **Tables** (back office, web): sortable columns, filters, pagination.

## Layout rules

- **Grid**: 4 columns (mobile), 8 columns (tablet), 12 columns (web).
- **Spacing**: multiples of 4 px (4, 8, 12, 16, 24, 32).
- **Breakpoints**: 640 px (tablet), 1024 px (desktop).
- **Range covered**: from 360 × 640 px to 1920 × 1080 px. Beyond that, content stays centred with a maximum width.
- **Side margins on mobile**: 16 px.

## Notes per screen

- **Home**: nearby meetups first, a visible "Create a meetup" button, featured games after.
- **Search**: filters at the top (game, venue, date), list of meetup cards, result counter.
- **Meetup detail**: "Join" button at the bottom of the screen (mobile) or on the right (web), key info (date, venue, game, seats) before the description.
- **Create a meetup**: one-page form, required fields first, live validation.
- **Game page**: number of players and duration at the top, description, then related meetups.
- **Profile**: upcoming meetups first, history after.
- **Exploration map**: full-width map, filters in a collapsible panel (mobile) or on the left (web), list synchronised with the map.
- **Venue dashboard**: on mobile, sections as simple tabs (Page, Games, Events, Posts, Reviews); on web, a sidebar. The main "Publish" action stays visible.
- **Contact form**: choice of subject first, then the fields; plain confirmation page.
- **Blog**: cards with image, date and title; reading without signing up.
- **Cookie banner**: at the bottom of the page, without blocking reading; "Accept" and "Refuse" have the same visual weight.
- **Back office**: web only, sidebar, tables for lists, single-column forms.

## Accessibility

- Contrast compliant with WCAG 2.1 AA.
- Full keyboard navigation on the web, visible focus.
- Every field and every interactive icon has an accessible label.
- Touch targets of at least 44 × 44 px.
- The font size chosen by the user is respected on mobile.
- Map: the same information is available as a list.
- Cookie banner: usable with the keyboard, no focus trap.

## Interaction states

- **Hover** (web): slight colour change, pointer cursor.
- **Focus**: 2 px outline in the accent colour.
- **Disabled**: 40% opacity, no interaction.
- **Loading**: spinner in the button, skeleton for lists.
- **Error**: text message and error colour, never colour alone.
- **Success**: green toast with a short message.

## Graphic assets

- **Ludmigo logo**: provided as SVG in `web/src/assets/logos/`: tagline version, colour version and people version, each in black and in white (6 files). An app icon will be derived from the people version when the native app launches.
- **Icons**: Phosphor Icons, 24 px, one single style across the application.
- **Illustrations**: the four brand pawns placed on a game table, adapted for empty states and onboarding.
- **Game visuals**: supplied by publishers or users, with a neutral fallback image.
- **Venue category icons**: game bar, bar and café, game library, association, shop, for the map and the filters.
- **Screenshots**: for the iOS and Android stores, with the native app (out of V1).
- **Back office templates**: web only; no mobile mock-up for administration.
