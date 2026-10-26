import { siteConfig } from "@/config/site";
import type { PageContent } from "@/content";
import type { Dict } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";

function fill(text: string) {
  return text.replaceAll("{email}", siteConfig.contactEmail).replaceAll("{site}", siteConfig.url.replace(/^https?:\/\//, ""));
}

/** Renders text with bare URLs and the contact email as links. */
function Linkified({ text }: { text: string }) {
  const parts = fill(text).split(/(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        ) : /@/.test(part) && /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part) ? (
          <a key={i} href={`mailto:${part}`}>
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function StaticPage({
  content,
  dict,
  showUpdated = false,
  showToc = false,
  children,
}: {
  content: PageContent;
  dict: Dict;
  showUpdated?: boolean;
  showToc?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <h1 className="text-[2.4rem] leading-[1.05] font-bold tracking-[-0.045em] text-ink sm:text-[3.4rem]">{content.h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          <Linkified text={content.lead} />
        </p>
        {showUpdated && <p className="mt-3 text-sm text-ink-3">{format(dict.legal.updated, { date: siteConfig.legalUpdated })}</p>}
      </header>
      {children}
      <div className="mt-12 grid gap-10 border-t-2 border-ink pt-8 lg:grid-cols-12">
        {showToc && (
          <nav aria-label={dict.legal.onThisPage} className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-[0.12em] text-ink-3 uppercase">{dict.legal.onThisPage}</p>
              <ol className="mt-3 grid gap-1.5 text-sm">
                {content.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#s${i + 1}`} className="text-ink-2 hover:text-brand">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}
        <article className={`prose-legal min-w-0 ${showToc ? "lg:col-span-8" : "lg:col-span-8 lg:col-start-3"}`}>
          {content.sections.map((s, i) => (
            <section key={i} id={`s${i + 1}`} className="scroll-mt-28">
              <h2 className={i === 0 ? "!mt-2" : ""}>{s.title}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>
                  <Linkified text={p} />
                </p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b, j) => (
                    <li key={j}>
                      <Linkified text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
