"use client";

import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CaseStudyCard from "../components/CaseStudyCard";
import CTA from "../components/CTA";
import { caseStudies } from "../data/caseStudies";
import { solutions } from "../data/solutions";
import EngagementModels from "../components/EngagementModels";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Navigation Header */}
      <Header />

      <main>
        {/* 1. HERO SECTION */}
        <Hero />

        {/* 2. PROBLEM RECOGNITION */}
        <section
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-secondary)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "4rem",
              alignItems: "start",
            }}
            className="problem-grid"
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
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#ffffff" }}>
                Does your marketing feel like disconnected pieces?
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.4rem", color: "#ffffff", marginBottom: "0.6rem" }}>
                  1. Attention Without Business Results
                </h3>
                <p>
                  You receive link clicks or view loops, but product sales, appointment inquiries, and overall revenue remain flat. The gap is a conversion funnel error.
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1.5rem" }}>
                <h3 style={{ fontSize: "1.4rem", color: "#ffffff", marginBottom: "0.6rem" }}>
                  2. Disconnected Vendor Management
                </h3>
                <p>
                  Coordinating separate media planners, developers, and creators wastes momentum. When something underperforms, they blame each other instead of fixing the pipeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CONVERSION BRIDGE — "Where Is Your Growth Leaking?" */}
        <section
          id="growth-leaking"
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            position: "relative",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {/* Subtle lime accent glow — top-left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-80px",
              left: "-120px",
              width: "520px",
              height: "520px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(182,245,0,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

            {/* Eyebrow */}
            <span
              style={{
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                display: "inline-block",
                marginBottom: "2rem",
              }}
            >
              Conversion Clarity
            </span>

            {/* Main headline */}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                color: "#ffffff",
                lineHeight: 1.1,
                maxWidth: "760px",
                marginBottom: "1.5rem",
              }}
            >
              Where is your growth system{" "}
              <em
                style={{
                  color: "var(--accent-primary)",
                  fontStyle: "italic",
                }}
              >
                leaking?
              </em>
            </h2>

            {/* Supporting statement */}
            <p
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                lineHeight: 1.7,
                marginBottom: "5rem",
              }}
            >
              Your ads may be working. Your funnel may not.
              <br />
              Attention is not the problem. Conversion is.
            </p>

            {/* Three diagnostic pillars */}
            <div
              className="growth-leaking-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2px",
              }}
            >
              {/* Pillar 1 */}
              <div
                style={{
                  padding: "3rem 2.5rem",
                  borderTop: "2px solid var(--accent-primary)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    color: "rgba(182,245,0,0.12)",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  01
                </span>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Traffic Without Conversion
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Clicks arrive. Visitors browse. Nothing is purchased or booked. The gap is not visibility — it is the conversion architecture between your ad and your outcome.
                </p>
              </div>

              {/* Pillar 2 */}
              <div
                style={{
                  padding: "3rem 2.5rem",
                  borderTop: "2px solid rgba(182,245,0,0.35)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    color: "rgba(182,245,0,0.08)",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  02
                </span>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Creative Without a System
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  You have content. You may even have good content. But without a connected system, content earns attention for the algorithm — not revenue for the business.
                </p>
              </div>

              {/* Pillar 3 */}
              <div
                style={{
                  padding: "3rem 2.5rem",
                  borderTop: "2px solid rgba(182,245,0,0.15)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    color: "rgba(182,245,0,0.06)",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  03
                </span>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Vendors Without Accountability
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Separate agencies. Separate teams. Each owns one part and none owns the outcome. When something underperforms, accountability dissolves into coordination overhead.
                </p>
              </div>
            </div>

            {/* Bridge statement */}
            <div
              style={{
                marginTop: "5rem",
                paddingTop: "3rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "var(--text-secondary)",
                  maxWidth: "680px",
                  lineHeight: 1.7,
                  flex: "1 1 300px",
                }}
              >
                Every month without a connected system, qualified buyers find your competitors. The evidence below is what a connected system looks like when it works.
              </p>
              <a
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--accent-primary)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "gap var(--transition-fast)",
                }}
                className="growth-leaking-link"
              >
                See the proof
                <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. REAL WORK / PROOF */}
        <section
          id="work"
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-primary)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem", marginBottom: "4rem" }}>
              <div>
                <span
                  style={{
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    display: "inline-block",
                    marginBottom: "1rem",
                  }}
                >
                  Verified Delivery
                </span>
                <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#ffffff" }}>
                  Factual Proof. Real Solutions.
                </h2>
              </div>
              <p style={{ maxWidth: "450px", fontSize: "1rem" }}>
                We avoid fabricated percentages or mock metrics. These are verified case studies representing client partner outcomes.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "2rem",
              }}
            >
              {caseStudies.map((study) => (
                <a key={study.slug} href={`/work/${study.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <CaseStudyCard study={study} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SOLUTIONS OVERVIEW */}
        <section
          id="solutions"
          style={{
            padding: "8rem 2rem",
            backgroundColor: "var(--bg-secondary)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <span
                style={{
                  color: "var(--accent-primary)",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                Integrated Capabilities
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  color: "#ffffff",
                  lineHeight: 1.15,
                  maxWidth: "800px",
                  margin: "0 auto 1.25rem",
                }}
              >
                How We Resolve Bottlenecks.
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.05rem",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Every capability is connected to drive actual customer acquisition and revenue, never isolated in a vacuum.
              </p>
            </div>

            <div
              className="solutions-overview-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {solutions.map((sol, idx) => (
                <a
                  key={sol.id}
                  href={`/solutions/${sol.slug}`}
                  style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                  className="solution-card-link"
                >
                  <div
                    style={{
                      padding: "3rem 2.25rem",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.07)",
                      backgroundColor: "rgba(255, 255, 255, 0.015)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      position: "relative",
                      transition: "transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
                    }}
                    className="solution-card glass-panel"
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "1.75rem",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.2rem",
                            color: "rgba(182, 245, 0, 0.5)",
                            fontWeight: 700,
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            color: "var(--text-muted)",
                            fontWeight: 600,
                          }}
                        >
                          Core Solution
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.85rem",
                          color: "#ffffff",
                          marginBottom: "0.75rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {sol.name}
                      </h3>
                      <h4
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--accent-primary)",
                          fontWeight: 500,
                          marginBottom: "1.25rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {sol.tagline}
                      </h4>
                      <p
                        style={{
                          marginBottom: "2rem",
                          fontSize: "0.92rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.65,
                        }}
                      >
                        {sol.heroSubtext}
                      </p>

                      <div
                        style={{
                          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                          paddingTop: "1.5rem",
                          marginBottom: "2.5rem",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "var(--text-muted)",
                            fontWeight: 600,
                            marginBottom: "0.85rem",
                          }}
                        >
                          Included Scope
                        </span>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.65rem",
                          }}
                        >
                          {sol.capabilities.map((cap) => (
                            <li
                              key={cap}
                              style={{
                                fontSize: "0.88rem",
                                color: "var(--text-primary)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--accent-primary)",
                                  fontSize: "0.85rem",
                                  fontWeight: "bold",
                                }}
                              >
                                ✓
                              </span>
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "1.25rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent-primary)",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                        className="solution-card-cta"
                      >
                        Explore Solution
                        <span
                          style={{
                            transition: "transform 0.2s ease",
                            display: "inline-block",
                          }}
                          className="solution-arrow"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <style>{`
            .solution-card-link:hover .solution-card {
              border-color: rgba(182, 245, 0, 0.35) !important;
              background-color: rgba(255, 255, 255, 0.03) !important;
              transform: translateY(-4px);
            }
            .solution-card-link:hover .solution-arrow {
              transform: translateX(4px);
            }
            @media (prefers-reduced-motion: reduce) {
              .solution-card, .solution-arrow {
                transition: none !important;
                transform: none !important;
              }
              .solution-card-link:hover .solution-card {
                transform: none !important;
              }
              .solution-card-link:hover .solution-arrow {
                transform: none !important;
              }
            }
          `}</style>
        </section>

        {/* 6. ENGAGEMENT MODELS */}
        <EngagementModels />

        {/* 7. LOWER-FRICTION CONVERSION (CTA section with custom form) */}
        <CTA />
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
