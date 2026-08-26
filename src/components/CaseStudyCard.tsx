import React from "react";
import { CaseStudy } from "../data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <div
      style={{
        borderRadius: "var(--border-radius-medium)",
        padding: "3rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2.5rem",
        minHeight: "480px",
        height: "100%",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
      className="glass-panel glass-panel-hover"
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
          <div>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              {study.industry || "Client Partner"}
            </span>
            <h3 style={{ fontSize: "1.8rem", color: "#ffffff", marginTop: "0.25rem" }}>
              {study.client}
            </h3>
          </div>
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50px",
              padding: "0.25rem 0.75rem",
            }}
          >
            Case Study
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2rem" }}>
          <div>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
              Context Constraint:
            </h4>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              {study.problem[0]}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
              Cinova Core Work:
            </h4>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              {study.solution[0]} {study.solution[1] || ""}
            </p>
          </div>
        </div>
      </div>

      {study.verifiedResults.length > 0 && (
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          {study.verifiedResults.slice(0, 2).map((result) => (
            <div key={result.label}>
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  display: "block",
                }}
              >
                {result.value}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", lineHeight: "1.2", marginTop: "0.1rem" }}>
                {result.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
