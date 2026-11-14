import { useNavigate } from 'react-router';
import { useExplore } from '../context';
import { NOW } from '../data';
import { recommendMeetup } from '../recommend';
import { Icon } from './Icon';
import { BUTTON_OUTLINE } from './styles';

// « Trouve-moi une partie » : choisit en un appui la meilleure partie et explique pourquoi
// "Find me a meetup": picks the best meetup in one tap and explains why
export function FindMeetupButton({ className = '' }: { className?: string }) {
  const { results, profile, joinedIds, notify } = useExplore();
  const navigate = useNavigate();

  const find = () => {
    const recommendation = recommendMeetup(results.meetups, profile, joinedIds, NOW);
    if (!recommendation) {
      notify('Aucune partie libre ne correspond à vos filtres pour le moment.');
      return;
    }
    navigate(`/explorer/partie/${recommendation.meetup.id}`, { state: { reasons: recommendation.reasons } });
  };

  return (
    <button type="button" onClick={find} className={`${BUTTON_OUTLINE} ${className}`}>
      <Icon name="compass" size={20} />
      Trouve-moi une partie
    </button>
  );
}
