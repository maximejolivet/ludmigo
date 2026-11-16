import polyglotI18nProvider from 'ra-i18n-polyglot';
import french from 'ra-language-french';

// Interface en français ; libellés des ressources et de leurs champs
// French interface; labels of the resources and their fields
const messages = {
  ...french,
  resources: {
    games: {
      name: 'Jeu |||| Jeux',
      fields: {
        name: 'Nom',
        description: 'Description',
        minPlayers: 'Joueurs min.',
        maxPlayers: 'Joueurs max.',
        durationMinutes: 'Durée (minutes)',
        difficulty: 'Difficulté',
        imageUrl: "URL de l'image",
        createdAt: 'Ajouté le',
      },
    },
    nouveautes: { name: 'Nouveautés' },
    users: {
      name: 'Utilisateur |||| Utilisateurs',
      fields: {
        email: 'Email',
        pseudo: 'Pseudo',
        city: 'Ville',
        roles: 'Rôles',
        createdAt: 'Inscrit le',
        deletedAt: 'Supprimé le',
      },
    },
  },
};

export const i18nProvider = polyglotI18nProvider(() => messages, 'fr');
