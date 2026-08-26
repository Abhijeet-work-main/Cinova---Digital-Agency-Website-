"use client";

import React, { useState } from "react";
import { systemSteps } from "../data/solutions";

export default function CinovaSystem() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="system"
      style={{
        padding: "8rem 2rem",
        backgroundColor: "var(--bg-secondary)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
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
            The Cinova Blueprint
          </span>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#ffffff", marginBottom: "1rem" }}>
            A Connected Growth System.
          </h2>
          <p style={{ maxWidth: "650px", margin: "0 auto", fontSize: "1.1rem" }}>
            We do not sell a menu of fragmented services. We align and connect the components that drive actual visitor conversion.
          </p>
        </div>

        {/* Desktop Step Flow */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="system-grid"
        >
          {/* Timeline Indicators */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {systemSteps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.name}
                  onClick={() => setActiveStep(idx)}
                  className="glass-panel"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.2rem 2rem",
                    borderRadius: "16px",
                    cursor: "pointer",
                    textAlign: "left",
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                    borderColor: isActive ? "var(--accent-primary)" : "rgba(255, 255, 255, 0.05)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: isActive ? "var(--accent-primary)" : "var(--text-muted)",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-primary)", fontSize: "1.1rem", fontWeight: 600 }}>{step.name}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{step.description}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Panel */}
          <div
            style={{
              minHeight: "350px",
              padding: "4rem 3rem",
              borderRadius: "var(--border-radius-medium)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            className="glass-panel"
          >
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "4rem",
                fontWeight: 900,
                color: "rgba(182, 245, 0, 0.1)",
                lineHeight: 1,
              }}
            >
              0{activeStep + 1}
            </span>
            <h3 style={{ fontSize: "2.5rem", color: "#ffffff" }}>
              {systemSteps[activeStep].name}
            </h3>
            <h4
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "1.2rem",
                color: "var(--accent-primary)",
                fontWeight: 500,
              }}
            >
              {systemSteps[activeStep].description}
            </h4>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.7", color: "var(--text-secondary)", maxWidth: "550px" }}>
              {systemSteps[activeStep].detail}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 990px) {
          .system-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
