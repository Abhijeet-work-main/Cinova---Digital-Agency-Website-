import { notFound } from "next/navigation";
import Link from "next/link";
import { getIndustryBySlug, industries } from "../../../data/industries";
import { getSolutionBySlug } from "../../../data/solutions";
import { getBrand } from "../../../data/brands";
import Header from "../../../components/Header";
import SharedPageClosing from "../../../components/SharedPageClosing";
import WorkCard from "../../../components/WorkCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Not Found" };
  return {
    title: `${industry.name} | Cinova`,
    description: industry.heroSubtext,
    alternates: {
      canonical: `/for/${slug}`,
    },
    openGraph: {
      title: `${industry.name} | Cinova`,
      description: industry.heroSubtext,
      url: `/for/${slug}`,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/hero-cinematic.png",
          width: 1920,
          height: 1080,
          alt: `${industry.name} — Cinova`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.name} | Cinova`,
      description: industry.heroSubtext,
      images: ["/hero-cinematic.png"],
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const relatedBrands = industry.relevantCaseSlugs
    .map((s) => getBrand(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const relatedSolutions = industry.relevantSolutionSlugs
    .map((s) => getSolutionBySlug(s))
    .filter(Boolean);

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <main>
        {/* 1. HERO — Light editorial, matching homepage pattern */}
        <section className="ind-hero">
          <div className="ind-hero__glow" aria-hidden="true" />
          <div className="ind-hero__inner">
            <span className="ind-eyebrow">Cinova for {industry.name}</span>
            <h1 className="ind-hero__headline">{industry.heroHeadline}</h1>
            <p className="ind-hero__sub">{industry.heroSubtext}</p>
            <div className="ind-hero__actions">
              <Link href="/book" className="ind-btn-primary" data-cta="industry">
                Book a Free Call
              </Link>
              <a href="#proof" className="ind-btn-ghost">
                See Category Work ({relatedBrands.length}) →
              </a>
            </div>
          </div>
        </section>

        {/* 2. RECOGNITION — THE FRICTION PATTERN */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-secondary)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div className="ind-container ind-grid-2">
            <div>
              <span className="ind-section-tag">The Pattern</span>
              <h2 className="ind-section-h2">{industry.problemStatement}</h2>
              <p className="ind-section-body">{industry.whyItHappens}</p>
            </div>
            <div className="ind-problems-col">
              <h3 className="ind-col-label">Does this sound familiar?</h3>
              {industry.recognitionProblems.map((prob, i) => (
                <div key={i} className="ind-problem-card">
                  <span className="ind-problem-arrow" aria-hidden="true">→</span>
                  <p className="ind-problem-text">{prob}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CINOVA CONNECTED APPROACH */}
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

          <div className="ind-container">
            <div className="ind-approach-head">
              <span className="ind-section-tag" style={{ color: "var(--accent-text)" }}>
                The Connected Architecture
              </span>
              <h2 className="ind-section-h2">
                Connecting the parts that make growth actually work.
              </h2>
              <p className="ind-section-body" style={{ maxWidth: "680px" }}>
                {industry.cinova_approach}
              </p>
            </div>

            {/* Related Solutions — pillar cards matching homepage conversion bridge */}
            {relatedSolutions.length > 0 && (
              <div style={{ marginTop: "4rem" }}>
                <h3 className="ind-col-label">Relevant Growth Capabilities</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2px",
                  }}
                >
                  {relatedSolutions.map((sol) => sol && (
                    <Link
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="ind-solution-card"
                    >
                      <h4 className="ind-sol-name">{sol.name}</h4>
                      <p className="ind-sol-tagline">{sol.tagline}</p>
                      <span className="ind-sol-explore">Explore Solution →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. VERIFIED DELIVERY — REAL BRAND CARDS */}
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
            <div className="ind-container">
              <div style={{ marginBottom: "3.5rem" }}>
                <span className="ind-section-tag">Verified Proof</span>
                <h2 className="ind-section-h2">Real brands in this category.</h2>
                <p className="ind-section-body">
                  Strictly verified work and production assets. Hover each card to inspect the brand identity.
                </p>
              </div>

              <div className="ind-brands-grid">
                {relatedBrands.map((brand, i) => (
                  <div key={brand.slug} className="ind-brand-item">
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
                      <div className="ind-brand-outcome">
                        <span className="ind-outcome-dot" />
                        <span className="ind-outcome-text">
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

        {/* 5. COST OF WAITING */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            textAlign: "center",
          }}
        >
          <div className="ind-container" style={{ maxWidth: "900px" }}>
            <div className="ind-delay-box">
              <span className="ind-section-tag">The Cost of Waiting</span>
              <p className="ind-delay-quote">
                &ldquo;{industry.delayConsequence}&rdquo;
              </p>
              <div>
                <Link href="/book" className="ind-btn-primary" data-cta="industry">
                  Book a Free Call →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SharedPageClosing />

      <style>{`
        /* ── CONTAINER ──────────────────────────────── */
        .ind-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── HERO — Light editorial ────────────────── */
        .ind-hero {
          position: relative;
          padding: 11rem 2rem 6rem;
          background-color: var(--bg-primary);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        .ind-hero__glow {
          position: absolute;
          top: -100px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(182,245,0,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .ind-hero__inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .ind-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
        }
        .ind-hero__headline {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 5.5vw, 5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--text-primary);
          margin: 0 0 1.5rem;
          max-width: 900px;
        }
        .ind-hero__sub {
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 660px;
          margin: 0 0 2.5rem;
        }
        .ind-hero__actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        /* ── BUTTONS ───────────────────────────────── */
        .ind-btn-primary {
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
        .ind-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(182, 245, 0, 0.3);
        }
        .ind-btn-ghost {
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
        .ind-btn-ghost:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }

        /* ── SECTION TOKENS ────────────────────────── */
        .ind-section-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .ind-section-h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.15;
          margin: 0 0 1rem;
        }
        .ind-section-body {
          font-size: clamp(1.05rem, 2vw, 1.15rem);
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }
        .ind-col-label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        /* ── TWO COL GRID ──────────────────────────── */
        .ind-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ind-grid-2 {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        /* ── PROBLEM CARDS ─────────────────────────── */
        .ind-problems-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ind-problem-card {
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
        .ind-problem-card:hover {
          border-color: #D4D4D4;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
        }
        .ind-problem-arrow {
          color: var(--accent-text);
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
          line-height: 1.4;
        }
        .ind-problem-text {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.55;
          margin: 0;
        }

        /* ── SOLUTION PILLAR CARDS ─────────────────── */
        .ind-solution-card {
          padding: 3rem 2.5rem;
          border-top: 2px solid var(--accent-primary);
          background: rgba(0, 0, 0, 0.02);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }
        .ind-solution-card:hover {
          background: rgba(0, 0, 0, 0.04);
        }
        .ind-sol-name {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin: 0 0 0.75rem;
          font-family: var(--font-display);
          font-weight: 600;
        }
        .ind-sol-tagline {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .ind-sol-explore {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-text);
          margin-top: auto;
        }

        /* ── BRAND CARDS GRID ──────────────────────── */
        .ind-brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          column-gap: 24px;
          row-gap: 40px;
          align-items: start;
        }
        @media (max-width: 600px) {
          .ind-brands-grid {
            grid-template-columns: 1fr;
          }
        }
        .ind-brand-item {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ind-brand-outcome {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-primary);
          border: 1px solid var(--structural-border);
          border-radius: 8px;
          padding: 0.55rem 0.85rem;
          box-shadow: var(--glass-rim);
        }
        .ind-outcome-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          flex-shrink: 0;
        }
        .ind-outcome-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* ── DELAY BOX ─────────────────────────────── */
        .ind-delay-box {
          background: var(--bg-secondary);
          border: 1px solid var(--structural-border);
          border-radius: 20px;
          padding: 3.5rem 2.5rem;
        }
        .ind-delay-quote {
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
