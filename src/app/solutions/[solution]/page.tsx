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
    <div className="sol-root">
      <Header />

      <main>
        {/* 1. HERO */}
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
              <a href="#proof" className="sol-btn-secondary">
                See Verified Work ({relatedBrands.length}) →
              </a>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM RECOGNITION */}
        <section className="sol-section sol-section--pattern">
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
        <section className="sol-section sol-section--approach">
          <div className="sol-container">
            <div className="sol-grid-2" style={{ alignItems: "center" }}>
              <div>
                <span className="sol-section-tag">The Cinova Approach</span>
                <h2 className="sol-section-h2">
                  Connected execution across all the parts that matter.
                </h2>
                <p className="sol-section-body">{solution.howCinovaHelps}</p>
                <div style={{ marginTop: "2rem" }}>
                  <a href="#audit" className="sol-btn-primary">
                    Diagnose My Growth Gaps →
                  </a>
                </div>
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
              <div className="sol-industries-block">
                <h3 className="sol-col-label">Relevant Industry Frameworks</h3>
                <div className="sol-industries-grid">
                  {relatedIndustries.map((ind) => ind && (
                    <Link
                      key={ind.slug}
                      href={`/for/${ind.slug}`}
                      className="sol-industry-card"
                    >
                      <div className="sol-ind-top">
                        <h4 className="sol-ind-name">{ind.name}</h4>
                        <span className="sol-ind-arrow">↗</span>
                      </div>
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
          <section id="proof" className="sol-section sol-section--proof">
            <div className="sol-container">
              <div className="sol-proof-head">
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
        <section className="sol-section sol-section--delay">
          <div className="sol-container sol-delay-box">
            <span className="sol-section-tag">The Cost of Waiting</span>
            <p className="sol-delay-quote">
              &ldquo;{solution.delayConsequence}&rdquo;
            </p>
            <div className="sol-delay-action">
              <a href="#audit" className="sol-btn-primary">
                Resolve This Now →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedPageClosing />

      <style>{`
        .sol-root {
          background-color: var(--bg-primary, #060606);
          min-height: 100vh;
          color: #fff;
        }

        .sol-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ── HERO ─────────────────────────────────── */
        .sol-hero {
          position: relative;
          padding: 12rem 2rem 7rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .sol-hero__glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(circle, rgba(182, 245, 0, 0.08) 0%, transparent 70%);
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
        .sol-hero__headline {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(2.4rem, 5.5vw, 4.6rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0 0 1.5rem;
          max-width: 980px;
        }
        .sol-hero__sub {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.65;
          max-width: 720px;
          margin: 0 0 2.5rem;
        }
        .sol-hero__actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .sol-btn-primary {
          background: var(--accent-primary, #b6f500);
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
        .sol-btn-secondary {
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
        .sol-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }

        /* ── SECTIONS ──────────────────────────────── */
        .sol-section {
          padding: 7rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .sol-section--pattern {
          background: #090909;
        }
        .sol-section--approach {
          background: #050505;
        }
        .sol-section--proof {
          background: #0b0b0b;
        }
        .sol-section--delay {
          background: #060606;
          text-align: center;
        }

        .sol-section-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-primary, #b6f500);
          margin-bottom: 1rem;
        }
        .sol-section-h2 {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 1.25rem;
        }
        .sol-section-body {
          font-size: 1.08rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          margin: 0;
        }
        .sol-col-label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
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
          gap: 0.85rem;
        }
        .sol-problem-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: background 0.2s, border-color 0.2s;
        }
        .sol-problem-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .sol-problem-arrow {
          color: var(--accent-primary, #b6f500);
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
          line-height: 1.4;
        }
        .sol-problem-text {
          font-size: 0.96rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.55;
          margin: 0;
        }

        /* ── CAPABILITIES ──────────────────────────── */
        .sol-caps-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
        }
        .sol-caps-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sol-cap-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(182, 245, 0, 0.04);
          border-left: 3px solid var(--accent-primary, #b6f500);
          border-radius: 8px;
          padding: 0.85rem 1.2rem;
        }
        .sol-cap-check {
          color: var(--accent-primary, #b6f500);
          font-weight: 700;
        }
        .sol-cap-text {
          font-size: 0.92rem;
          color: #fff;
          font-weight: 500;
        }

        /* ── INDUSTRIES CARDS ──────────────────────── */
        .sol-industries-block {
          margin-top: 4rem;
        }
        .sol-industries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .sol-industry-card {
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
        .sol-industry-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: var(--accent-primary, #b6f500);
          transform: translateY(-3px);
        }
        .sol-ind-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .sol-ind-name {
          font-size: 1.2rem;
          color: #fff;
          margin: 0;
          font-weight: 600;
        }
        .sol-ind-arrow {
          color: var(--accent-primary, #b6f500);
          font-size: 1.1rem;
        }
        .sol-ind-sub {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
          margin: 0 0 1.5rem;
        }
        .sol-ind-explore {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent-primary, #b6f500);
        }

        /* ── BRAND CARDS GRID ──────────────────────── */
        .sol-proof-head {
          margin-bottom: 3.5rem;
        }
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
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 0.55rem 0.85rem;
        }
        .sol-outcome-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary, #b6f500);
          flex-shrink: 0;
        }
        .sol-outcome-text {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        /* ── DELAY BOX ─────────────────────────────── */
        .sol-delay-box {
          max-width: 900px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 3.5rem 2.5rem;
        }
        .sol-delay-quote {
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
