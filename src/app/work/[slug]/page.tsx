import { notFound } from "next/navigation";
import { caseStudies } from "../../../data/caseStudies";
import { solutions } from "../../../data/solutions";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.client} Case Study | Cinova`,
    description: `How Cinova helped ${study.client}: ${study.problem[0]}`,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);

  if (!study) {
    notFound();
  }

  // Find other case studies (not this one) for the related section
  const otherStudies = caseStudies.filter((cs) => cs.slug !== slug).slice(0, 2);

  // Find solutions relevant to this case study's category
  const relatedSolutions = solutions.filter((sol) =>
    sol.relevantCaseSlugs.includes(slug)
  );

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <main>
        {/* HERO */}
        <section
          style={{
            padding: "10rem 2rem 6rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <a
              href="/#work"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.85rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              ← All Work
            </a>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {study.industry && (
                <span
                  style={{
                    color: "var(--accent-primary)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    border: "1px solid rgba(182,245,0,0.3)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "50px",
                  }}
                >
                  {study.industry}
                </span>
              )}
              <span
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "50px",
                }}
              >
                {study.category}
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              {study.client}
            </h1>
            <p
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                maxWidth: "700px",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
              }}
            >
              {study.problem[0]}
            </p>
          </div>
        </section>

        {/* SITUATION */}
        <section style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-secondary)" }}>
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
            }}
            className="two-col-grid"
          >
            {/* Problem */}
            <div>
              <span
                style={{
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1.5rem",
                }}
              >
                The Situation
              </span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#fff", marginBottom: "2rem" }}>
                What {study.client} was dealing with
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {study.problem.map((p, i) => (
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
                    <span style={{ color: "var(--accent-primary)", fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}.
                    </span>
                    <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                      {p}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <span
                style={{
                  color: "var(--accent-primary)",
                  textTransform: "uppercase",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1.5rem",
                }}
              >
                What Cinova Did
              </span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#fff", marginBottom: "2rem" }}>
                Connected execution across the growth system
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {study.solution.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1rem 1.4rem",
                      borderRadius: "10px",
                      borderLeft: "2px solid var(--accent-primary)",
                      backgroundColor: "rgba(182,245,0,0.03)",
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--accent-primary)", fontSize: "0.9rem", marginTop: "0.05rem" }}>✓</span>
                    <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VERIFIED RESULTS */}
        {study.verifiedResults.length > 0 && (
          <section style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-primary)" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
                Verified Evidence
              </span>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", marginBottom: "0.75rem" }}>
                What the data shows.
              </h2>
              <p style={{ maxWidth: "550px", marginBottom: "3.5rem", fontSize: "1rem" }}>
                These figures are taken directly from verified platform screenshots or campaign data. We do not fabricate metrics.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {study.verifiedResults.map((result, i) => (
                  <div
                    key={i}
                    className="glass-panel"
                    style={{
                      padding: "2.5rem 2rem",
                      borderRadius: "20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-primary)",
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {result.value}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.9rem",
                        color: "var(--accent-primary)",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {result.label}
                    </span>
                    {result.description && (
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                        {result.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* NO RESULTS STATE */}
        {study.verifiedResults.length === 0 && (
          <section style={{ padding: "5rem 2rem", backgroundColor: "var(--bg-primary)" }}>
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center",
                padding: "3rem",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "1.3rem", marginBottom: "1rem" }}>
                Qualitative outcomes only
              </h3>
              <p>
                For this engagement, the primary outcomes were qualitative — operational improvements, presence building, and audience development. We do not present invented metrics. Verified screenshots are available on request.
              </p>
            </div>
          </section>
        )}

        {/* RELATED SOLUTIONS */}
        {relatedSolutions.length > 0 && (
          <section style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-secondary)" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  color: "#fff",
                  marginBottom: "0.75rem",
                }}
              >
                Have a similar challenge?
              </h2>
              <p style={{ marginBottom: "2.5rem", maxWidth: "550px" }}>
                Explore the relevant capabilities Cinova used in this engagement.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {relatedSolutions.map((sol) => (
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
                    <h4 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
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
          </section>
        )}

        {/* OTHER WORK */}
        {otherStudies.length > 0 && (
          <section style={{ padding: "7rem 2rem", backgroundColor: "var(--bg-primary)" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  color: "#fff",
                  marginBottom: "3rem",
                }}
              >
                More verified work
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                  gap: "2rem",
                }}
              >
                {otherStudies.map((other) => (
                  <a
                    key={other.slug}
                    href={`/work/${other.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      className="glass-panel glass-panel-hover"
                      style={{
                        padding: "2.5rem 2rem",
                        borderRadius: "var(--border-radius-medium)",
                        height: "100%",
                      }}
                    >
                      {other.industry && (
                        <span
                          style={{
                            color: "var(--accent-primary)",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            display: "block",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {other.industry}
                        </span>
                      )}
                      <h3 style={{ color: "#fff", fontSize: "1.6rem", marginBottom: "0.75rem" }}>
                        {other.client}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                        {other.problem[0]}
                      </p>
                      <span style={{ color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 600 }}>
                        View Case Study →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
