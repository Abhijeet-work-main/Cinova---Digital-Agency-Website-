"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "1rem 2rem" : "1.5rem 2rem",
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(5, 5, 5, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            cinova<span style={{ color: "var(--accent-primary)" }}>.</span>
          </a>

          {/* Navigation Bubble */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {/* Desktop Navigation Links */}
            <div
              style={{
                display: "none",
                gap: "2rem",
                marginRight: "1rem",
              }}
              className="desktop-nav"
            >
              {["Work", "Solutions", "Industries"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#audit"
              className="glass-panel"
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "50px",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-primary)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(182, 245, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Free Audit
            </a>

            {/* Menu Trigger Bubble */}
            <button
              onClick={toggleMenu}
              className="glass-panel"
              aria-label="Toggle navigation menu"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                borderRadius: "50px",
                color: "#ffffff",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "0.85rem",
              }}
            >
              <span>menu</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  width: "14px",
                }}
              >
                <div style={{ height: "2px", backgroundColor: "#fff", width: "100%" }}></div>
                <div style={{ height: "2px", backgroundColor: "#fff", width: "100%" }}></div>
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Styled Overlay Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(5, 5, 5, 0.98)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={toggleMenu}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            [close]
          </button>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {["Work", "Solutions", "Industries", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggleMenu}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
