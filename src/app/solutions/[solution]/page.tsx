import { notFound } from "next/navigation";
import Link from "next/link";
import { getSolutionBySlug, solutions } from "../../../data/solutions";
import { getIndustryBySlug } from "../../../data/industries";
import { getBrand } from "../../../data/brands";
import Header from "../../../components/Header";
import SharedPageClosing from "../../../components/SharedPageClosing";
import WorkCard from "../../../components/WorkCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ solution: string }>;
}

export async function generateStaticParams() {
  return solutions.map((s) => ({ solution: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution: slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return { title: "Not Found" };
  return {
    title: `${solution.name} | Cinova`,
    description: solution.heroSubtext,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { solution: slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const relatedBrands = solution.relevantCaseSlugs
    .map((s) => getBrand(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const relatedIndustries = solution.relatedIndustrySlugs
    .map((s) => getIndustryBySlug(s))
    .filter(Boolean);

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <main>
        {/* 1. HERO — Light editorial */}
        <section className="sol-hero">
          <div className="sol-hero__glow" aria-hidden="true" />
          <div className="sol-hero__inner">
            <span className="sol-eyebrow">{solution.name}</span>
            <h1 className="sol-hero__headline">{solution.heroHeadline}</h1>
            <p className="sol-hero__sub">{solution.heroSubtext}</p>
            <div className="sol-hero__actions">
              <a href="#audit" className="sol-btn-primary">
                Get Free Growth Audit
              </a>
              <a href="#proof" className="sol-btn-ghost">
                See Verified Work ({relatedBrands.length}) →
              </a>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM RECOGNITION */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-secondary)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div className="sol-container sol-grid-2">
            <div>
              <span className="sol-section-tag">The Friction Point</span>
              <h2 className="sol-section-h2">{solution.problemStatement}</h2>
              <p className="sol-section-body">{solution.whyItHappens}</p>
            </div>
            <div className="sol-problems-col">
              <h3 className="sol-col-label">Does this sound familiar?</h3>
              {solution.problems.map((prob, i) => (
                <div key={i} className="sol-problem-card">
                  <span className="sol-problem-arrow" aria-hidden="true">→</span>
                  <p className="sol-problem-text">{prob}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. HOW CINOVA HELPS */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            position: "relative",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {/* Subtle lime accent glow — matching homepage */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-80px",
              left: "-120px",
              width: "520px",
              height: "520px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(182,245,0,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="sol-container">
            <div className="sol-grid-2" style={{ alignItems: "center" }}>
              <div>
                <span className="sol-section-tag" style={{ color: "var(--accent-primary)" }}>
                  The Cinova Approach
                </span>
                <h2 className="sol-section-h2">
                  Connected execution across all the parts that matter.
                </h2>
                <p className="sol-section-body" style={{ marginBottom: "2rem" }}>
                  {solution.howCinovaHelps}
                </p>
                <a href="#audit" className="sol-btn-primary">
                  Diagnose My Growth Gaps →
                </a>
              </div>

              {/* Capabilities checklist */}
              <div className="sol-caps-box">
                <h3 className="sol-col-label">Integrated Capabilities</h3>
                <div className="sol-caps-list">
                  {solution.capabilities.map((cap, i) => (
                    <div key={i} className="sol-cap-item">
                      <span className="sol-cap-check">✓</span>
                      <span className="sol-cap-text">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Industries Navigation */}
            {relatedIndustries.length > 0 && (
              <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <h3 className="sol-col-label">Relevant Industry Frameworks</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2px",
                  }}
                >
                  {relatedIndustries.map((ind) => ind && (
                    <Link
                      key={ind.slug}
                      href={`/for/${ind.slug}`}
                      className="sol-industry-card"
                    >
                      <h4 className="sol-ind-name">{ind.name}</h4>
                      <p className="sol-ind-sub">{ind.problemStatement}</p>
                      <span className="sol-ind-explore">View Industry Solution →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. REAL PROOF — BRAND CARDS */}
        {relatedBrands.length > 0 && (
          <section
            id="proof"
            style={{
              padding: "8rem 2rem",
              backgroundColor: "var(--bg-secondary)",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div className="sol-container">
              <div style={{ marginBottom: "3.5rem" }}>
                <span className="sol-section-tag">Verified Delivery</span>
                <h2 className="sol-section-h2">Real brands using this solution.</h2>
                <p className="sol-section-body">
                  Strictly verified work and production assets. Hover each card to inspect the brand identity.
                </p>
              </div>

              <div className="sol-brands-grid">
                {relatedBrands.map((brand, i) => (
                  <div key={brand.slug} className="sol-brand-item">
                    <WorkCard
                      slug={brand.slug}
                      title={brand.name}
                      description={brand.cardLine}
                      tags={brand.services.slice(0, 2)}
                      cover={brand.cover}
                      logo={brand.logo}
                      size={i === 0 ? "tall" : i % 2 === 1 ? "short" : "mid"}
                    />
                    {brand.results.outcomes.length > 0 && (
                      <div className="sol-brand-outcome">
                        <span className="sol-outcome-dot" />
                        <span className="sol-outcome-text">
                          {brand.results.outcomes[0]}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. COST OF DELAY */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            textAlign: "center",
          }}
        >
          <div className="sol-container" style={{ maxWidth: "900px" }}>
            <div className="sol-delay-box">
              <span className="sol-section-tag">The Cost of Waiting</span>
              <p className="sol-delay-quote">
                &ldquo;{solution.delayConsequence}&rdquo;
              </p>
              <div>
                <a href="#audit" className="sol-btn-primary">
                  Resolve This Now →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SharedPageClosing />

      <style>{`
        /* ── CONTAINER ──────────────────────────────── */
        .sol-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── HERO — Light editorial ────────────────── */
        .sol-hero {
          position: relative;
          padding: 11rem 2rem 6rem;
          background-color: var(--bg-primary);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        .sol-hero__glow {
          position: absolute;
          top: -100px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(182,245,0,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .sol-hero__inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .sol-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
        }
        .sol-hero__headline {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 5.5vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin: 0 0 1.5rem;
          max-width: 900px;
        }
        .sol-hero__sub {
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 660px;
          margin: 0 0 2.5rem;
        }
        .sol-hero__actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        /* ── BUTTONS ───────────────────────────────── */
        .sol-btn-primary {
          display: inline-flex;
          align-items: center;
          background: var(--accent-primary);
          color: #000;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.9rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sol-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(182, 245, 0, 0.3);
        }
        .sol-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--structural-border);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.9rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .sol-btn-ghost:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }

        /* ── SECTION TOKENS ────────────────────────── */
        .sol-section-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .sol-section-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.15;
          margin: 0 0 1rem;
        }
        .sol-section-body {
          font-size: clamp(1.05rem, 2vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }
        .sol-col-label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        /* ── TWO COL GRID ──────────────────────────── */
        .sol-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .sol-grid-2 {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        /* ── PROBLEM CARDS ─────────────────────────── */
        .sol-problems-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sol-problem-card {
          background: var(--bg-primary);
          border: 1px solid var(--structural-border);
          border-radius: 12px;
          padding: 1.1rem 1.35rem;
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          transition: all var(--transition-fast);
          box-shadow: var(--glass-rim);
        }
        .sol-problem-card:hover {
          border-color: #D4D4D4;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
        }
        .sol-problem-arrow {
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
          line-height: 1.4;
        }
        .sol-problem-text {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.55;
          margin: 0;
        }

        /* ── CAPABILITIES BOX ─────────────────────── */
        .sol-caps-box {
          background: var(--bg-secondary);
          border: 1px solid var(--structural-border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--glass-rim);
        }
        .sol-caps-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .sol-cap-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(182, 245, 0, 0.06);
          border-left: 3px solid var(--accent-primary);
          border-radius: 8px;
          padding: 0.85rem 1.2rem;
        }
        .sol-cap-check {
          color: var(--accent-primary);
          font-weight: 700;
        }
        .sol-cap-text {
          font-size: 0.92rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        /* ── INDUSTRY PILLAR CARDS ─────────────────── */
        .sol-industry-card {
          padding: 3rem 2.5rem;
          border-top: 2px solid var(--accent-primary);
          background: rgba(0, 0, 0, 0.02);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }
        .sol-industry-card:hover {
          background: rgba(0, 0, 0, 0.04);
        }
        .sol-ind-name {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin: 0 0 0.75rem;
          font-family: var(--font-display);
          font-weight: 600;
        }
        .sol-ind-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .sol-ind-explore {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-top: auto;
        }

        /* ── BRAND CARDS GRID ──────────────────────── */
        .sol-brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          column-gap: 24px;
          row-gap: 40px;
          align-items: start;
        }
        @media (max-width: 600px) {
          .sol-brands-grid {
            grid-template-columns: 1fr;
          }
        }
        .sol-brand-item {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sol-brand-outcome {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-primary);
          border: 1px solid var(--structural-border);
          border-radius: 8px;
          padding: 0.55rem 0.85rem;
          box-shadow: var(--glass-rim);
        }
        .sol-outcome-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          flex-shrink: 0;
        }
        .sol-outcome-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* ── DELAY BOX ─────────────────────────────── */
        .sol-delay-box {
          background: var(--bg-secondary);
          border: 1px solid var(--structural-border);
          border-radius: 20px;
          padding: 3.5rem 2.5rem;
        }
        .sol-delay-quote {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.6;
          margin: 1.25rem 0 2rem;
        }
      `}</style>
    </div>
  );
}
