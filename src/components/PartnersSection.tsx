"use client";

import React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   Real Cinova client logos — replace src with finals when ready.
   ───────────────────────────────────────────────────────────── */
const LOGOS = [
  { name: "Balbeer",          src: "/logos/balbeer.jpg",     w: 140, h: 56 },
  { name: "Erminio Palamino", src: "/logos/erminio.jpg",     w: 150, h: 56 },
  { name: "Gloss & Shine",    src: "/logos/gloss-shine.jpg", w: 150, h: 56 },
  { name: "Cuts & Looks",     src: "/logos/cuts-looks.jpg",  w: 150, h: 56 },
  { name: "Saira",            src: "/logos/saira.jpg",       w: 130, h: 56 },
  { name: "Velmora",          src: "/logos/velmora.png",     w: 150, h: 56 },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="prt-section">
      <div className="prt-inner">

        {/* Eyebrow */}
        <div className="prt-eyebrow">
          <span className="prt-eyebrow__bracket">( 00-03 )</span>
          <span className="prt-eyebrow__dot" aria-hidden="true">•</span>
          <span className="prt-eyebrow__label">OUR CLIENTS</span>
        </div>

        {/* Headline — Inter, centered */}
        <h2 className="prt-headline">
          {"We've partnered with forward-thinking "}
          <span className="prt-headline__muted">
            companies across brand, retail, media, and lifestyle.
          </span>
        </h2>

        {/* Logo Grid — 3 col × 2 row, cards tall and compact gutters */}
        <div className="prt-grid" role="list" aria-label="Client logos">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="prt-card" role="listitem">
              <div className="prt-card__inner">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  style={{ objectFit: "contain", width: "auto", height: "auto", maxWidth: "75%", maxHeight: "60%" }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
      <style>{`
        .prt-section {
          padding: 9rem 2rem 8rem;
          background: #f5f5f3;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .prt-inner {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        /* ── Eyebrow ── */
        .prt-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 2.5rem;
        }
        .prt-eyebrow__bracket,
        .prt-eyebrow__dot,
        .prt-eyebrow__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }
        .prt-eyebrow__label {
          font-weight: 500;
          text-transform: uppercase;
        }

        /* ── Headline — Inter (matches reference: Inter 400, 42px) ── */
        .prt-headline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2.2rem, 3.2vw, 2.8rem);
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.3;
          letter-spacing: -0.02em;
          max-width: 820px;
          margin: 0 auto 4.5rem;
        }
        .prt-headline__muted {
          color: rgba(10,10,10,0.45);
          font-weight: 400;
        }

        /* ── Grid — 3 columns, compact gutters, tall cards ── */
        .prt-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          max-width: 960px;
          margin: 0 auto;
        }
        .prt-card {
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.07);
          background: #fff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .prt-card:hover {
          border-color: rgba(0,0,0,0.14);
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }
        .prt-card__inner {
          display: flex;
          align-items: center;
          justify-content: center;
          /* Tall cards matching reference proportions */
          padding: 3rem 2rem;
          min-height: 140px;
        }

        /* ── Responsive ── */
        @media(max-width:768px) {
          .prt-section { padding: 6rem 1.25rem 5rem; }
          .prt-grid { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
          .prt-card__inner { min-height: 110px; padding: 2rem 1.5rem; }
          .prt-headline { font-size: clamp(1.7rem, 5vw, 2.2rem); margin-bottom: 3rem; }
        }
        @media(prefers-reduced-motion:reduce) {
          .prt-card { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
