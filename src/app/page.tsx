"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CinovaSystem from "../components/CinovaSystem";
import CaseStudyCard from "../components/CaseStudyCard";
import CTA from "../components/CTA";
import { caseStudies } from "../data/caseStudies";
import { solutions } from "../data/solutions";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Navigation Header */}
      <Header />

      <main>
        {/* 1. HERO SECTION */}
        <section
          style={{
            padding: "10rem 2rem 6rem 2rem",
            position: "relative",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
          >
            <div>
              <span
                style={{
                  color: "var(--accent-primary)",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                Cinova Digital Growth
              </span>
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                  color: "#ffffff",
                  lineHeight: "1.05",
                  letterSpacing: "-0.04em",
                  maxWidth: "1100px",
                }}
              >
                We resolve growth bottlenecks by connecting <em style={{ fontStyle: "italic", color: "var(--accent-primary)" }}>creative</em> and <em style={{ fontStyle: "italic", color: "var(--accent-primary)" }}>funnels</em>.
              </h1>
            </div>

            <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", maxWidth: "700px", lineHeight: "1.6" }}>
              Most agencies deliver isolated pieces—stale ad campaigns, separate videography, and disconnected web portals. We build clean, high-contrast, fully integrated acquisition architectures.
            </p>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a
                href="#audit"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "#000000",
                  padding: "1rem 2rem",
                  borderRadius: "50px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-primary)")}
              >
                Get Free Growth Audit
              </a>
              <a
                href="#system"
                className="glass-panel"
                style={{
                  color: "#ffffff",
                  padding: "1rem 2rem",
                  borderRadius: "50px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)")}
              >
                See How It Connects
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

        {/* 3. THE CINOVA SYSTEM (Interactive blueprint component) */}
        <CinovaSystem />

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
                <CaseStudyCard key={study.slug} study={study} />
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
                  color: "var(--text-muted)",
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
              <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#ffffff" }}>
                How We Resolve Bottlenecks.
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
              {solutions.map((sol) => (
                <div
                  key={sol.id}
                  style={{
                    padding: "3rem 2rem",
                    borderRadius: "var(--border-radius-medium)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                  className="glass-panel"
                >
                  <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "1rem" }}>{sol.name}</h3>
                  <h4 style={{ fontSize: "1rem", color: "var(--accent-primary)", fontWeight: 500, marginBottom: "1.5rem" }}>{sol.tagline}</h4>
                  <p style={{ marginBottom: "2rem", fontSize: "0.95rem" }}>{sol.description}</p>
                  <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1.5rem" }}>
                    <h5 style={{ color: "#ffffff", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                      Integrated Capabilities:
                    </h5>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {sol.capabilities.map((cap) => (
                        <li key={cap} style={{ fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ color: "var(--accent-primary)" }}>✓</span> {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LOWER-FRICTION CONVERSION (CTA section with custom form) */}
        <CTA />
      </main>

      {/* Global Footer */}
      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
