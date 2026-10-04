"use client";

import React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   Real Cinova client images — beautiful wall-sign mockups
   ───────────────────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Curate Home",       src: "/clients/Curate Home Monogram Wall Sign.png" },
  { name: "Erminio Palamino",  src: "/clients/Embossed Erminio Palamino Monogram.png" },
  { name: "Kap.mtl",           src: "/clients/Kap.mtl Raised Script Logo.png" },
  { name: "Lustre Jewellery",  src: "/clients/Lustre Jewellery Logo on Warm Beige Wall.png" },
  { name: "Luxury byXiu",      src: "/clients/Luxury byXiu Embossed Logo.png" },
  { name: "Gloss & Shine",     src: "/clients/Premium Gloss & Shine Wall Logo.png" },
  { name: "Purple Swan",       src: "/clients/Purple Swan 3D Wall Sign.png" },
  { name: "Saanvi Botanicals", src: "/clients/Saanvi Botanicals Embossed Logo.png" },
];

/* Duplicate for seamless infinite scroll */
const TRACK = [...CLIENTS, ...CLIENTS];

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

        {/* Headline */}
        <h2 className="prt-headline">
          {"We've partnered with forward-thinking "}
          <span className="prt-headline__muted">
            companies across brand, retail, media, and lifestyle.
          </span>
        </h2>

      </div>

      {/* ── Marquee strip ── */}
      <div className="prt-marquee" aria-label="Client logos" role="list">
        {/* Left fade */}
        <div className="prt-marquee__fade prt-marquee__fade--left" aria-hidden="true" />

        <div className="prt-track">
          {TRACK.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="prt-slide"
              role="listitem"
              aria-label={client.name}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={320}
                height={180}
                className="prt-slide__img"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Right fade */}
        <div className="prt-marquee__fade prt-marquee__fade--right" aria-hidden="true" />
      </div>

      <style>{`
        /* ── Section ── */
        .prt-section {
          padding: 6rem 0 6rem;
          background: linear-gradient(160deg,
            #f0ece6 0%,
            #ede8e0 30%,
            #e8e2d8 55%,
            #ede8e0 75%,
            #f2ede8 100%
          );
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(180,160,130,0.18);
          overflow: hidden;
        }
        .prt-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          padding: 0 2rem;
        }

        /* ── Eyebrow ── */
        .prt-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 1.6rem;
        }
        .prt-eyebrow__bracket,
        .prt-eyebrow__dot,
        .prt-eyebrow__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: var(--text-muted, #888);
          letter-spacing: 0.06em;
        }
        .prt-eyebrow__label {
          font-weight: 500;
          text-transform: uppercase;
        }

        /* ── Headline ── */
        .prt-headline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          font-weight: 400;
          color: var(--text-primary, #0a0a0a);
          line-height: 1.32;
          letter-spacing: -0.02em;
          max-width: 780px;
          margin: 0 auto 3.5rem;
        }
        .prt-headline__muted {
          color: rgba(10,10,10,0.42);
          font-weight: 400;
        }

        /* ── Marquee container ── */
        .prt-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* ── Scrolling track ── */
        .prt-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: prt-scroll 36s linear infinite;
          will-change: transform;
        }
        .prt-track:hover {
          animation-play-state: paused;
        }

        /* ── Individual slide card ── */
        .prt-slide {
          flex: 0 0 auto;
          width: 240px;
          height: 140px;
          border-radius: 10px;
          border: 1px solid rgba(180,155,120,0.22);
          background: rgba(255,252,247,0.82);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
          cursor: default;
        }
        .prt-slide:hover {
          border-color: rgba(0,0,0,0.15);
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .prt-slide__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          user-select: none;
        }

        /* ── Edge fades ── */
        .prt-marquee__fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .prt-marquee__fade--left {
          left: 0;
          background: linear-gradient(to right, #f0ece6 0%, transparent 100%);
        }
        .prt-marquee__fade--right {
          right: 0;
          background: linear-gradient(to left, #f2ede8 0%, transparent 100%);
        }

        /* ── Keyframe ── */
        @keyframes prt-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .prt-section { padding: 4.5rem 0 4.5rem; }
          .prt-slide { width: 190px; height: 112px; }
          .prt-track { gap: 0.75rem; }
          .prt-headline { font-size: clamp(1.5rem, 5vw, 1.9rem); margin-bottom: 2.5rem; }
          .prt-marquee__fade { width: 60px; }
        }

        /* ── Accessibility ── */
        @media (prefers-reduced-motion: reduce) {
          .prt-track { animation: none; }
          .prt-slide:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
