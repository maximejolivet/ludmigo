import changelog from '../../../CHANGELOG.md?raw';
import { cardClass, TAG, TAG_FULL, TAG_INFO, TAG_SUCCESS, TAG_WARNING } from '../ui/classes';
import { PageTitle } from '../ui/PageTitle';
import { parseChangelog, splitInlineCode } from './parseChangelog';

const releases = parseChangelog(changelog);

// Couleur de l'étiquette de chaque type de changement / Tag colour of each change type
const SECTION_TAG: Record<string, string> = {
  Ajouté: TAG_SUCCESS,
  Modifié: TAG_INFO,
  Corrigé: TAG_WARNING,
  Sécurité: TAG_FULL,
};

function Item({ text }: { text: string }) {
  return (
    <li className="mb-2">
      {splitInlineCode(text).map((piece, i) =>
        piece.code ? (
          <code key={i} className="rounded-md bg-canvas px-1.5 py-0.5 font-mono text-sm">
            {piece.text}
          </code>
        ) : (
          <span key={i}>{piece.text}</span>
        ),
      )}
    </li>
  );
}

// Page « Nouveautés » : le journal des modifications, version par version
// "Nouveautés" page: the changelog, release by release
export function ChangelogPage() {
  return (
    <div className="max-w-3xl">
      <PageTitle title="Nouveautés" />
      {releases.length === 0 && <p className="text-fg-soft">Aucune nouveauté pour le moment.</p>}
      <div className="grid gap-4">
        {releases.map((release) => (
          <article key={release.version} className={`${cardClass} p-5`}>
            <h2 className="m-0 mb-4 text-xl font-bold">
              {release.version}
              {release.date && <span className="ml-3 text-sm font-normal text-fg-soft">{new Date(release.date).toLocaleDateString('fr-FR')}</span>}
            </h2>
            {release.sections
              .filter((section) => section.items.length > 0)
              .map((section) => (
                <section key={section.title} className="mt-4 first:mt-0">
                  <h3 className="m-0 mb-2">
                    <span className={`${TAG} ${SECTION_TAG[section.title] ?? TAG_INFO}`}>{section.title}</span>
                  </h3>
                  <ul className="m-0 list-disc pl-5">
                    {section.items.map((item) => (
                      <Item key={item} text={item} />
                    ))}
                  </ul>
                </section>
              ))}
          </article>
        ))}
      </div>
    </div>
  );
}
