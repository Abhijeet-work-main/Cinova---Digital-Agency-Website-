import { notFound } from "next/navigation";
import { getSolutionBySlug, solutions } from "../../../data/solutions";
import { caseStudies } from "../../../data/caseStudies";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import CaseStudyCard from "../../../components/CaseStudyCard";
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

  const relatedStudies = caseStudies.filter((cs) =>
    solution.relevantCaseSlugs.includes(cs.slug)
  );

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "10rem 2rem 6.5rem",
            position: "relative",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            backgroundColor: "var(--bg-primary)",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-60px",
              left: "-100px",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(182,245,0,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <span
              style={{
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                display: "inline-block",
                marginBottom: "1.5rem",
              }}
            >
              {solution.name}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                maxWidth: "1050px",
                marginBottom: "1.75rem",
              }}
            >
              {solution.heroHeadline}
            </h1>
            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                color: "var(--text-secondary)",
                maxWidth: "700px",
                lineHeight: 1.7,
                marginBottom: "3rem",
              }}
            >
              {solution.heroSubtext}
            </p>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="#audit"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "#000000",
                  padding: "1.05rem 2.2rem",
                  borderRadius: "50px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 20px rgba(182, 245, 0, 0.15)",
                }}
              >
                Get Free Growth Audit
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#proof"
                className="glass-panel"
                style={{
                  color: "#ffffff",
                  padding: "1.05rem 2.2rem",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                See Real Results
              </a>
            </div>
          </div>
        </section>

        {/* PROBLEM RECOGNITION */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-secondary)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "5rem",
              alignItems: "start",
            }}
            className="two-col-grid"
          >
            <div>
              <span
                style={{
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                The Friction Point
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                  lineHeight: 1.2,
                }}
              >
                {solution.problemStatement}
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "var(--text-secondary)" }}>
                {solution.whyItHappens}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}
              >
                Does any of this sound familiar?
              </h3>
              {solution.problems.map((prob, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: "1.4rem 1.75rem",
                    borderRadius: "14px",
                    display: "flex",
                    gap: "1.2rem",
                    alignItems: "flex-start",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    backgroundColor: "rgba(255, 255, 255, 0.015)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent-primary)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      flexShrink: 0,
                      marginTop: "0.05rem",
                    }}
                  >
                    →
                  </span>
                  <p style={{ fontSize: "0.98rem", margin: 0, lineHeight: 1.6, color: "var(--text-primary)" }}>
                    {prob}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW CINOVA HELPS */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "5rem",
                alignItems: "center",
              }}
              className="two-col-grid"
            >
              <div>
                <span
                  style={{
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    display: "inline-block",
                    marginBottom: "1rem",
                  }}
                >
                  The Cinova Approach
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                    color: "#ffffff",
                    marginBottom: "1.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  Connected execution across all the parts that matter.
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
                  {solution.howCinovaHelps}
                </p>
                <a
                  href="#audit"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "#000000",
                    padding: "1rem 2.2rem",
                    borderRadius: "50px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Diagnose My Growth Gaps
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.5rem",
                  }}
                >
                  Integrated Capabilities
                </h3>
                {solution.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.1rem 1.5rem",
                      borderRadius: "12px",
                      borderLeft: "3px solid var(--accent-primary)",
                      backgroundColor: "rgba(182, 245, 0, 0.03)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      borderRight: "1px solid rgba(255, 255, 255, 0.04)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                    }}
                  >
                    <span style={{ color: "var(--accent-primary)", fontSize: "0.9rem", fontWeight: "bold" }}>✓</span>
                    <span style={{ color: "var(--text-primary)", fontSize: "0.95rem", fontWeight: 500 }}>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REAL PROOF */}
        {relatedStudies.length > 0 && (
          <section
            id="proof"
            style={{
              padding: "7rem 2rem",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <div style={{ marginBottom: "3.5rem" }}>
                <span
                  style={{
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    display: "inline-block",
                    marginBottom: "1rem",
                  }}
                >
                  Verified Delivery
                </span>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff" }}>
                  Real results from real clients.
                </h2>
                <p style={{ marginTop: "1rem", maxWidth: "550px", fontSize: "1rem" }}>
                  We only present verified evidence. No invented metrics, no fabricated percentages.
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                  gap: "2rem",
                }}
              >
                {relatedStudies.map((study) => (
                  <a
                    key={study.slug}
                    href={`/work/${study.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <CaseStudyCard study={study} />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* COST OF DELAY */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                display: "inline-block",
                marginBottom: "1.5rem",
              }}
            >
              The Cost of Waiting
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.35rem, 3.5vw, 1.95rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              &ldquo;{solution.delayConsequence}&rdquo;
            </p>
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
