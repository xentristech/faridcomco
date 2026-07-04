import type { Block } from "@/lib/blog";
import { seedGradient } from "@/lib/gradient";
import { Info, Warning, Quotes } from "@phosphor-icons/react/dist/ssr";

// Renderiza **negrita** dentro de un texto plano.
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[var(--text)]">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="scroll-mt-24">
                {b.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Quotes
                  size={26}
                  weight="fill"
                  aria-hidden
                  className="mb-2 text-[var(--accent-2)]"
                />
                <p>{b.text}</p>
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={i}
                className={`callout ${b.variant === "warn" ? "callout-warn" : "callout-info"}`}
              >
                <span className="callout-icon" aria-hidden>
                  {b.variant === "warn" ? (
                    <Warning size={18} weight="fill" />
                  ) : (
                    <Info size={18} weight="fill" />
                  )}
                </span>
                <p>
                  {b.label && <strong className="callout-label">{b.label} </strong>}
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "figure":
            return (
              <figure key={i} className="article-figure">
                <div
                  className="article-figure-art"
                  style={{ backgroundImage: seedGradient(b.seed) }}
                  aria-hidden
                >
                  <span className="article-figure-chip">DGX&nbsp;Spark</span>
                </div>
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
          case "table":
            return (
              <div key={i} className="article-table-wrap">
                <table className="article-table">
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className={r.highlight ? "is-highlight" : ""}>
                        {r.cells.map((c, k) => (
                          <td key={k} data-label={b.head[k]}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
