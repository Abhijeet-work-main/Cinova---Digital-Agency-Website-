"use client";

import React, { useState } from "react";

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    channel: "",
    problem: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Capture telemetry placeholder matching audit expectations
    if (typeof window !== "undefined") {
      console.log("Telemetry event: diagnostic_completed", formData);
      // Custom event hooks for future GA4/Pixel tracking
      const event = new CustomEvent("cinova_audit_submit", { detail: formData });
      window.dispatchEvent(event);
    }

    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <section
      id="audit"
      style={{
        padding: "8rem 2rem",
        backgroundColor: "var(--bg-primary)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "var(--border-radius-large)",
          padding: "4rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          textAlign: "center",
        }}
        className="glass-panel"
      >
        <div>
          <span
            style={{
              color: "var(--accent-primary)",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            Zero-Cost Diagnostic
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            Identify Where Your <em style={{ fontStyle: "italic", color: "var(--accent-primary)" }}>Growth System</em> Leaks.
          </h2>
          <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>
            Every month your attention attribution is unmapped, qualified demand is lost. We will review your site, ad concepts, and positioning parameters.
          </p>
        </div>

        {status === "success" ? (
          <div
            style={{
              padding: "3rem 1rem",
              borderRadius: "20px",
              backgroundColor: "rgba(182, 245, 0, 0.05)",
              border: "1px solid rgba(182, 245, 0, 0.2)",
            }}
          >
            <h3 style={{ color: "var(--accent-primary)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Diagnostic Request Received
            </h3>
            <p style={{ color: "#ffffff" }}>
              We will review your channels and follow up with structural feedback within 2 business days.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              textAlign: "left",
              maxWidth: "600px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="form-row">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="name" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "0.8rem",
                    color: "#ffffff",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="brand" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brand"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "0.8rem",
                    color: "#ffffff",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="channel" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Website / Instagram URL
              </label>
              <input
                type="text"
                id="channel"
                required
                placeholder="e.g. yourbrand.com"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "0.8rem",
                  color: "#ffffff",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="problem" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                What is your main growth constraint?
              </label>
              <textarea
                id="problem"
                required
                placeholder="e.g. Getting traffic but zero product sales..."
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "0.8rem",
                  color: "#ffffff",
                  minHeight: "100px",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Contact Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "0.8rem",
                  color: "#ffffff",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                backgroundColor: "var(--accent-primary)",
                border: "none",
                borderRadius: "50px",
                padding: "1rem",
                color: "#000000",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginTop: "1rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--accent-primary)")}
            >
              {status === "submitting" ? "Submitting Request..." : "Request My Free Growth Audit"}
            </button>
          </form>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 580px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
