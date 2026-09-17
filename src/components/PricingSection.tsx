"use client";

import React from "react";
import Link from "next/link";

/* ── Cinova pricing details for the $2,999/m featured plan ── */
const FEATURES_LEFT = [
  "1 Shoot day & 4–6 Reels/mo",
  "16 Social posts/mo",
  "Static & basic templates",
  "1-page branded landing page",
];
const FEATURES_RIGHT = [
  "Meta Ads management",
  "2 Platforms managed",
  "Monthly strategy call & report",
  "Shared account manager",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="prx-section">
      <div className="prx-inner">

        {/* ── Label (Pricing icon + text) ── */}
        <div className="prx-label-row">
          {/* Swatch/palette icon matching reference */}
          <svg className="prx-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 13.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5"/>
            <path d="M2 10.5V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5.5"/>
            <line x1="12" y1="3" x2="12" y2="21"/>
          </svg>
          <span className="prx-label-text">Pricing</span>
        </div>

        {/* ── Headline ── */}
        <h2 className="prx-headline">
          We believe in clarity from the start.
          <br />
          <span className="prx-headline__muted">That includes how we price our work.</span>
        </h2>

        {/* ── Two-card layout ── */}
        <div className="prx-cards">

          {/* LEFT — dark custom card */}
          <div className="prx-card prx-card--dark">
            <div className="prx-card-dark__top">
              <span className="prx-card-dark__label">Custom</span>
              <h3 className="prx-card-dark__title">Got something in mind?</h3>
              <p className="prx-card-dark__sub">Let&apos;s figure it out together.</p>
            </div>

            <div className="prx-card-dark__bottom">
              <div className="prx-card-dark__person">
                <span className="prx-card-dark__name">Abhijeet Mishra</span>
                <span className="prx-card-dark__role">Founder &amp; Lead, Cinova</span>
              </div>
              <a
                href="/pricing"
                className="prx-card-dark__cta"
                aria-label="See all Cinova packages"
              >
                See all packages
              </a>
            </div>
          </div>

          {/* RIGHT — white À La Carte card */}
          <div className="prx-card prx-card--light">
            <div className="prx-card-light__top">
              <span className="prx-card-light__label">À La Carte</span>
              <h3 className="prx-card-light__title">Want it done right?</h3>
              <p className="prx-card-light__sub">We&apos;ll handle it.</p>
            </div>

            <div className="prx-price-row">
              <span className="prx-price__currency">$</span>
              <span className="prx-price__amount">2,999</span>
              <span className="prx-price__period">/m</span>
            </div>

            <a href="/pricing" className="prx-start-btn">Start your project</a>

            <div className="prx-features">
              <ul className="prx-features__col">
                {FEATURES_LEFT.map(f => (
                  <li key={f} className="prx-feature-item">{f}</li>
                ))}
              </ul>
              <ul className="prx-features__col">
                {FEATURES_RIGHT.map(f => (
                  <li key={f} className="prx-feature-item">{f}</li>
                ))}
              </ul>
            </div>

            {/* See all pricing link */}
            <div className="prx-see-all">
              <Link href="/pricing" className="prx-see-all__link">
                See all pricing details →
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* ══════════ SECTION ══════════ */
        .prx-section {
          padding: 9rem 2rem 10rem;
          background: #f5f5f3;
          position: relative;
          z-index: 10;
        }
        .prx-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ══════════ LABEL ══════════ */
        .prx-label-row {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 2.5rem;
        }
        .prx-icon {
          width: 22px;
          height: 22px;
          color: rgba(10,10,10,0.5);
          flex-shrink: 0;
        }
        .prx-label-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: rgba(10,10,10,0.55);
          letter-spacing: 0.005em;
        }

        /* ══════════ HEADLINE ══════════ */
        .prx-headline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 400;
          color: rgb(10,10,10);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0 0 4rem;
        }
        .prx-headline__muted {
          color: rgba(10,10,10,0.38);
          font-weight: 400;
        }

        /* ══════════ CARD ROW ══════════ */
        .prx-cards {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 0;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 2px 24px rgba(0,0,0,0.06);
        }

        /* ══════════ DARK CARD ══════════ */
        .prx-card--dark {
          background: #111;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 380px;
          position: relative;
          /* subtle background texture */
          background-image: radial-gradient(ellipse at 60% 80%, rgba(255,255,255,0.04) 0%, transparent 65%);
        }
        .prx-card-dark__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 1rem;
        }
        .prx-card-dark__title {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(1.35rem, 2vw, 1.6rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.25;
          margin: 0 0 0.5rem;
        }
        .prx-card-dark__sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }
        .prx-card-dark__bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 3rem;
        }
        .prx-card-dark__person {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .prx-card-dark__name {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #fff;
        }
        .prx-card-dark__role {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
        }
        .prx-card-dark__cta {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding-bottom: 1px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .prx-card-dark__cta:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.6);
        }

        /* ══════════ LIGHT CARD ══════════ */
        .prx-card--light {
          background: #fff;
          padding: 2.5rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .prx-card-light__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(10,10,10,0.4);
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 0.75rem;
        }
        .prx-card-light__title {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(1.5rem, 2.2vw, 1.9rem);
          font-weight: 500;
          color: rgb(10,10,10);
          line-height: 1.2;
          margin: 0 0 0.35rem;
        }
        .prx-card-light__sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(10,10,10,0.38);
          margin: 0 0 2rem;
        }

        /* Price */
        .prx-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.1rem;
          margin-bottom: 1.5rem;
        }
        .prx-price__currency {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: rgb(10,10,10);
          letter-spacing: -0.01em;
        }
        .prx-price__amount {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2.5rem, 4vw, 3.2rem);
          font-weight: 500;
          color: rgb(10,10,10);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .prx-price__period {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(10,10,10,0.45);
          margin-left: 0.2rem;
        }

        /* Start button — lime from reference */
        .prx-start-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #b6f500;
          color: rgb(10,10,10);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.75rem 1.6rem;
          border-radius: 100px;
          text-decoration: none;
          width: fit-content;
          margin-bottom: 2rem;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .prx-start-btn:hover {
          background: #ceff1a;
          transform: translateY(-1px);
        }

        /* Feature columns */
        .prx-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 2rem;
          margin-bottom: 1.75rem;
        }
        .prx-features__col {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .prx-feature-item {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: rgba(10,10,10,0.65);
          line-height: 1.4;
        }

        /* See all link */
        .prx-see-all {
          padding-top: 1.25rem;
          border-top: 1px solid rgba(0,0,0,0.06);
          margin-top: auto;
        }
        .prx-see-all__link {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(10,10,10,0.5);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .prx-see-all__link:hover { color: rgb(10,10,10); }

        /* ══════════ RESPONSIVE ══════════ */
        @media(max-width: 860px) {
          .prx-cards {
            grid-template-columns: 1fr;
          }
          .prx-card--dark {
            min-height: 280px;
          }
          .prx-section { padding: 7rem 1.25rem 8rem; }
        }
        @media(max-width: 480px) {
          .prx-features { grid-template-columns: 1fr; }
          .prx-card--light { padding: 2rem 1.75rem; }
        }
        @media(prefers-reduced-motion: reduce) {
          .prx-start-btn,
          .prx-card-dark__cta,
          .prx-see-all__link { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
