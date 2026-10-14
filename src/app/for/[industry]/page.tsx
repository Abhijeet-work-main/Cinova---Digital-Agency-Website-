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
    <div className="ind-root">
      <Header />

      <main>
        {/* 1. HERO */}
        <section className="ind-hero">
          <div className="ind-hero__glow" aria-hidden="true" />
          <div className="ind-hero__inner">
            <span className="ind-eyebrow">Cinova for {industry.name}</span>
            <h1 className="ind-hero__headline">{industry.heroHeadline}</h1>
            <p className="ind-hero__sub">{industry.heroSubtext}</p>
            <div className="ind-hero__actions">
              <a href="#audit" className="ind-btn-primary">
                Get Free Growth Audit
              </a>
              <a href="#proof" className="ind-btn-secondary">
                See Category Work ({relatedBrands.length}) →
              </a>
            </div>
          </div>
        </section>

        {/* 2. RECOGNITION — THE FRICTION PATTERN */}
        <section className="ind-section ind-section--pattern">
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
        <section className="ind-section ind-section--approach">
          <div className="ind-container">
            <div className="ind-approach-head">
              <span className="ind-section-tag">The Connected Architecture</span>
              <h2 className="ind-section-h2">
                Connecting the parts that make growth actually work.
              </h2>
              <p className="ind-section-body">{industry.cinova_approach}</p>
            </div>

            {/* Related Solutions Pills */}
            {relatedSolutions.length > 0 && (
              <div className="ind-solutions-block">
                <h3 className="ind-col-label">Relevant Growth Capabilities</h3>
                <div className="ind-solutions-grid">
                  {relatedSolutions.map((sol) => sol && (
                    <Link
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="ind-solution-card"
                    >
                      <div className="ind-sol-top">
                        <h4 className="ind-sol-name">{sol.name}</h4>
                        <span className="ind-sol-arrow">↗</span>
                      </div>
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
          <section id="proof" className="ind-section ind-section--proof">
            <div className="ind-container">
              <div className="ind-proof-head">
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
        <section className="ind-section ind-section--delay">
          <div className="ind-container ind-delay-box">
            <span className="ind-section-tag">The Cost of Waiting</span>
            <p className="ind-delay-quote">
              &ldquo;{industry.delayConsequence}&rdquo;
            </p>
            <div className="ind-delay-action">
              <a href="#audit" className="ind-btn-primary">
                Resolve This Now →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedPageClosing />

      <style>{`
        .ind-root {
          background-color: var(--bg-primary, #060606);
          min-height: 100vh;
          color: #fff;
        }

        .ind-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── HERO ─────────────────────────────────── */
        .ind-hero {
          position: relative;
          padding: 12rem 2rem 7rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .ind-hero__glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(circle, rgba(182, 245, 0, 0.08) 0%, transparent 70%);
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
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-primary, #b6f500);
          background: rgba(182, 245, 0, 0.1);
          border: 1px solid rgba(182, 245, 0, 0.25);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.75rem;
        }
        .ind-hero__headline {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(2.4rem, 5.5vw, 4.6rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0 0 1.5rem;
          max-width: 980px;
        }
        .ind-hero__sub {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.65;
          max-width: 720px;
          margin: 0 0 2.5rem;
        }
        .ind-hero__actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .ind-btn-primary {
          background: var(--accent-primary, #b6f500);
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
        .ind-btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.9rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .ind-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }

        /* ── SECTIONS ──────────────────────────────── */
        .ind-section {
          padding: 7rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .ind-section--pattern {
          background: #090909;
        }
        .ind-section--approach {
          background: #050505;
        }
        .ind-section--proof {
          background: #0b0b0b;
        }
        .ind-section--delay {
          background: #060606;
          text-align: center;
        }

        .ind-section-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-primary, #b6f500);
          margin-bottom: 1rem;
        }
        .ind-section-h2 {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 1.25rem;
        }
        .ind-section-body {
          font-size: 1.08rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          margin: 0 0 2rem;
        }
        .ind-col-label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }

        /* ── TWO COL GRID ──────────────────────────── */
        .ind-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4.5rem;
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
          gap: 0.85rem;
        }
        .ind-problem-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: background 0.2s, border-color 0.2s;
        }
        .ind-problem-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .ind-problem-arrow {
          color: var(--accent-primary, #b6f500);
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
          line-height: 1.4;
        }
        .ind-problem-text {
          font-size: 0.96rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.55;
          margin: 0;
        }

        /* ── SOLUTIONS CARDS ───────────────────────── */
        .ind-solutions-block {
          margin-top: 3.5rem;
        }
        .ind-solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .ind-solution-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          padding: 2rem;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s;
        }
        .ind-solution-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--accent-primary, #b6f500);
          transform: translateY(-3px);
        }
        .ind-sol-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .ind-sol-name {
          font-size: 1.2rem;
          color: #fff;
          margin: 0;
          font-weight: 600;
        }
        .ind-sol-arrow {
          color: var(--accent-primary, #b6f500);
          font-size: 1.1rem;
        }
        .ind-sol-tagline {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
          margin: 0 0 1.5rem;
        }
        .ind-sol-explore {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent-primary, #b6f500);
        }

        /* ── BRAND CARDS GRID ──────────────────────── */
        .ind-proof-head {
          margin-bottom: 3.5rem;
        }
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
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.55rem 0.85rem;
        }
        .ind-outcome-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary, #b6f500);
          flex-shrink: 0;
        }
        .ind-outcome-text {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        /* ── DELAY BOX ─────────────────────────────── */
        .ind-delay-box {
          max-width: 900px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 3.5rem 2.5rem;
        }
        .ind-delay-quote {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin: 1.25rem 0 2rem;
        }
      `}</style>
    </div>
  );
}
