import { Title } from 'react-admin';

// Titre de la page (h1) et titre du document, pour distinguer chaque écran
// Page title (h1) and document title, to tell each screen apart
export function PageTitle({ title }: { title: string }) {
  return (
    <>
      <Title title={title} />
      <title>{`${title} - Ludmigo`}</title>
    </>
  );
}
