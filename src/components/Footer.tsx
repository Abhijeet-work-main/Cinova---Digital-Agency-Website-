import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "6rem 2rem 4rem 2rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "3rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "1.8rem",
                color: "#ffffff",
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
              }}
            >
              cinova<span style={{ color: "var(--accent-primary)" }}>.</span>
            </h3>
            <p style={{ maxWidth: "320px", fontSize: "0.95rem" }}>
              Connecting strategy, production, websites, and paid attribution networks to resolve growth bottlenecks.
            </p>
          </div>

          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "1rem", marginBottom: "1.2rem", fontWeight: 600 }}>Navigation</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <li><a href="#work" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>Work</a></li>
                <li><a href="#solutions" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>Solutions</a></li>
                <li><a href="#system" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>Our System</a></li>
                <li><a href="#audit" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>Free Audit</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: "#ffffff", fontSize: "1rem", marginBottom: "1.2rem", fontWeight: 600 }}>Attribution Focus</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <li><a href="#audit" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>Growth Diagnostic</a></li>
                <li><span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Client Partners Portal</span></li>
                <li><span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Attribution Active (GA4/Meta Pixel ready)</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Cinova. All rights reserved.
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Premium Growth Ecosystem. Focus on verified metrics.
          </p>
        </div>
      </div>
    </footer>
  );
}
