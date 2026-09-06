import React from "react";
import { CaseStudy } from "../data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  variant?: "featured" | "default";
}

export default function CaseStudyCard({
  study,
  variant = "default",
}: CaseStudyCardProps) {
  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <div
        style={{
          borderRadius: "var(--border-radius-medium)",
          padding: "3.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderTop: "2px solid var(--accent-primary)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          position: "relative",
        }}
        className="cs-featured-card"
      >
        {/* Top meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {study.industry && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--accent-primary)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  border: "1px solid rgba(182, 245, 0, 0.3)",
                  borderRadius: "50px",
                  padding: "0.2rem 0.7rem",
                }}
              >
                {study.industry}
              </span>
            )}
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.12em",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50px",
                padding: "0.2rem 0.7rem",
              }}
            >
              {study.category}
            </span>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50px",
              padding: "0.25rem 0.75rem",
            }}
          >
            Featured Case Study
          </span>
        </div>

        {/* Client name + challenge */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            {study.client}
          </h3>
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              The Challenge
            </span>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                maxWidth: "680px",
              }}
            >
              {study.problem[0]}
            </p>
          </div>
        </div>

        {/* Metrics — all verified results at featured scale */}
        {study.verifiedResults.length > 0 && (
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              paddingTop: "2rem",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              Verified Results
            </span>
            <div className="cs-featured-metrics">
              {study.verifiedResults.map((result) => (
                <div key={result.label} style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {result.value}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.78rem",
                      color: "var(--accent-primary)",
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {result.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What Cinova Did */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "2rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              display: "block",
              marginBottom: "1rem",
            }}
          >
            What Cinova Did
          </span>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {study.solution.slice(0, 3).map((s) => (
              <li
                key={s}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    color: "var(--accent-primary)",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "0.05rem",
                  }}
                >
                  ✓
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <a
            href={`/work/${study.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--accent-primary)",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
            className="cs-featured-link"
          >
            View Full Case Study
            <span
              className="cs-arrow"
              style={{ display: "inline-block", transition: "transform 0.2s ease" }}
            >
              →
            </span>
          </a>
        </div>
      </div>
    );
  }

  /* ── DEFAULT (supporting) card ─────────────────────────────── */
  return (
    <div
      style={{
        borderRadius: "var(--border-radius-medium)",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2rem",
        height: "100%",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
      className="glass-panel glass-panel-hover cs-default-card"
    >
      {/* Top section */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              {study.industry || "Client Partner"}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                color: "#ffffff",
                marginTop: "0.25rem",
                lineHeight: 1.15,
              }}
            >
              {study.client}
            </h3>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50px",
              padding: "0.2rem 0.65rem",
              flexShrink: 0,
            }}
          >
            Case Study
          </span>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
        >
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.35rem",
              }}
            >
              The Challenge
            </span>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {study.problem[0]}
            </p>
          </div>

          <div>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.35rem",
              }}
            >
              What Cinova Did
            </span>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {study.solution[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section — metrics or CTA */}
      <div>
        {study.verifiedResults.length > 0 && (
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              paddingTop: "1.25rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            {study.verifiedResults.slice(0, 2).map((result) => (
              <div key={result.label}>
                <span
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {result.value}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    display: "block",
                    lineHeight: 1.3,
                  }}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <a
          href={`/work/${study.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--accent-primary)",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
          className="cs-default-link"
        >
          View Case Study
          <span
            className="cs-arrow"
            style={{ display: "inline-block", transition: "transform 0.2s ease" }}
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
}
