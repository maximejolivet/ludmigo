---
description: Vérifie que chaque document de docs/ ainsi que README, CLAUDE et SECURITY suit la mise en page français puis anglais / Check that each doc in docs/ and the README, CLAUDE.md and SECURITY.md follow the French then English layout
---

Pour chaque fichier Markdown de `docs/`, ainsi que `README.md`, `CLAUDE.md` et `SECURITY.md` à la racine :

1. Vérifier que la partie française vient en premier : le premier titre H1 est en français, sans libellé de langue au-dessus.
2. Vérifier qu'il y a exactement un libellé anglais, écrit en bloc HTML centré `<p align="center"><img ... alt="🇬🇧 English"></p>` (badge shields.io, `img height="32"`), encadré par des lignes `<br>`, placé entre la partie française et la partie anglaise.
3. Vérifier que la partie anglaise vient après le libellé et que son titre H1 est en anglais.
4. Vérifier qu'il n'y a aucune ligne de liens de langue (`[🇫🇷 Français](#...)`) en haut du fichier, ni de section `## Sommaire`.
5. Vérifier que `README.md` garde son bloc de badges en haut, avant le titre français.

Lister les fichiers qui ne respectent pas ce modèle et le problème. Ne rien modifier sans demande.

For each Markdown file in `docs/`, plus the root `README.md`, `CLAUDE.md` and `SECURITY.md`:

1. Check the French part comes first: the first H1 title is in French, with no language label above it.
2. Check there is exactly one English label, written as the centred HTML block `<p align="center"><img ... alt="🇬🇧 English"></p>` (a shields.io badge, `img height="32"`), surrounded by `<br>` lines, and that it sits between the French and English parts.
3. Check the English part comes after the label and its H1 title is in English.
4. Check there is no language link line (`[🇫🇷 Français](#...)`) at the top of the file, and no `## Sommaire` section.
5. Check `README.md` keeps its badge block at the top, before the French title.

Report the files that do not follow this layout and what is wrong. Do not edit files unless asked.
