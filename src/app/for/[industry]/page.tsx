import { notFound } from "next/navigation";
import { getIndustryBySlug, industries } from "../../../data/industries";
import { getSolutionBySlug } from "../../../data/solutions";
import { caseStudies } from "../../../data/caseStudies";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import CaseStudyCard from "../../../components/CaseStudyCard";
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

  const relatedStudies = caseStudies.filter((cs) =>
    industry.relevantCaseSlugs.includes(cs.slug)
  );

  const relatedSolutions = industry.relevantSolutionSlugs
    .map((s) => getSolutionBySlug(s))
    .filter(Boolean);

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "10rem 2rem 6rem",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <span
              style={{
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                display: "inline-block",
                marginBottom: "1.5rem",
              }}
            >
              Cinova for {industry.name}
            </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                color: "var(--text-primary)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                maxWidth: "1000px",
                marginBottom: "2rem",
              }}
            >
              {industry.heroHeadline}
            </h1>
            <p
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                maxWidth: "680px",
                lineHeight: 1.65,
                marginBottom: "3rem",
              }}
            >
              {industry.heroSubtext}
            </p>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <a
                href="#audit"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--text-primary)",
                  padding: "1rem 2rem",
                  borderRadius: "50px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Get Free Growth Audit
              </a>
              <a
                href="#proof"
                className="glass-panel"
                style={{
                  color: "var(--text-primary)",
                  padding: "1rem 2rem",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                See Work in This Category
              </a>
            </div>
          </div>
        </section>

        {/* RECOGNITION — problems */}
        <section style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-secondary)" }}>
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
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                The Pattern
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.2,
                }}
              >
                {industry.problemStatement}
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                {industry.whyItHappens}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3
                style={{
                  fontFamily: "var(--font-primary)",
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.5rem",
                }}
              >
                Does this sound like your situation?
              </h3>
              {industry.recognitionProblems.map((prob, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: "1.1rem 1.5rem",
                    borderRadius: "12px",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent-primary)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    →
                  </span>
                  <p style={{ fontSize: "0.95rem", margin: 0, lineHeight: 1.5, color: "var(--text-secondary)" }}>
                    {prob}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CINOVA APPROACH */}
        <section style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-primary)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ maxWidth: "800px", marginBottom: "4rem" }}>
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
                The Cinova Approach
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                Connecting the parts that make growth actually work.
              </h2>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>{industry.cinova_approach}</p>
            </div>

            {/* Related Solutions */}
            {relatedSolutions.length > 0 && (
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-primary)",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Relevant Capabilities
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {relatedSolutions.map((sol) => sol && (
                    <a
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="glass-panel glass-panel-hover"
                      style={{
                        padding: "2rem",
                        borderRadius: "16px",
                        textDecoration: "none",
                        display: "block",
                      }}
                    >
                      <h4 style={{ color: "var(--text-primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                        {sol.name}
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "var(--accent-primary)", marginBottom: "0.75rem" }}>
                        {sol.tagline}
                      </p>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        Explore →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PROOF */}
        {relatedStudies.length > 0 && (
          <section
            id="proof"
            style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-secondary)" }}
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
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--text-primary)" }}>
                  Real work in this category.
                </h2>
                <p style={{ marginTop: "1rem", maxWidth: "550px", fontSize: "1rem" }}>
                  Verified evidence only. No invented metrics.
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
            padding: "6rem 2rem",
            backgroundColor: "var(--bg-primary)",
            borderTop: "1px solid rgba(0, 0, 0,0.04)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                color: "var(--text-muted)",
                textTransform: "uppercase",
                fontSize: "0.78rem",
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
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              &ldquo;{industry.delayConsequence}&rdquo;
            </p>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
