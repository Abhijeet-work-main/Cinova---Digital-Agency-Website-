"use client";

import React, { useState, useRef, useId } from "react";
import CalBookingEmbed from "../../components/CalBookingEmbed";
import SharedPageClosing from "../../components/SharedPageClosing";

/* ─── DATA ─────────────────────────────────────────────────── */

const TRUST_BULLETS = [
  "Free 30-minute call",
  "No obligation",
  "You leave with a clear plan",
];

const CALL_STEPS = [
  {
    step: "01",
    title: "Diagnostic & Friction Discovery",
    desc: "We look through your current channels, website funnel, and creative setup to identify where attention is being lost.",
  },
  {
    step: "02",
    title: "Opportunity & Leak Mapping",
    desc: "We pinpoint the high-leverage fixes, whether landing page architecture, offer messaging, or ad-to-conversion alignment.",
  },
  {
    step: "03",
    title: "Custom Action Plan",
    desc: "You walk away with a prioritized roadmap tailored to your target milestone that you can execute immediately.",
  },
];

const FAQS = [
  {
    q: "What happens on the call?",
    a: "We run a live diagnostic across your funnel, creative, and distribution setup. You get specific, prioritized observations and a clear set of next actions before the call ends.",
  },
  {
    q: "Is it really free?",
    a: "Yes, 100%. We use this call to evaluate whether our approach aligns with your growth stage. You receive our diagnostic insights and recommendations regardless of whether we end up working together.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "Having your website link, current performance benchmarks (traffic, conversion rates, or ad metrics if applicable), and your primary goal for the next 3 to 6 months will help us deliver maximum value.",
  },
  {
    q: "Which time zone are the slots in?",
    a: "Slots are shown in your local browser time zone automatically. The Cinova team is based in India (IST, UTC+5:30) and takes calls across global time zones.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes, use the link in your confirmation email.",
  },
  {
    q: "What if I am not ready to hire yet?",
    a: "That is completely fine. The call is designed to be genuinely useful regardless of timing. Many clients book a second call months later when the time is right, having already validated our thinking.",
  },
];

/* ─── ACCORDION ITEM ────────────────────────────────────────── */

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  idx,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
}) {
  const uid = useId();
  const triggerId = `faq-btn-${uid}-${idx}`;
  const panelId = `faq-panel-${uid}-${idx}`;
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button
        id={triggerId}
        type="button"
        className="faq-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="faq-trigger__q">{faq.q}</span>
        <span className="faq-trigger__icon" aria-hidden="true">
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="faq-panel"
        style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div ref={innerRef} className="faq-panel__inner">
          <p className="faq-panel__text">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── CHECK ICON ────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─── MAIN CLIENT COMPONENT ─────────────────────────────────── */

export default function BookPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="book-page">
      <main className="book-main">
        {/* ── TWO-COLUMN HERO ──────────────────────────── */}
        <section className="book-hero" aria-labelledby="book-headline" id="book">
          <div className="book-hero__inner">
            {/* LEFT */}
            <div className="book-hero__left">
              <span className="book-eyebrow">Direct Growth Diagnostic</span>
              <h1 id="book-headline" className="book-headline">
                Book your{" "}
                <span className="book-headline__highlight">free</span>{" "}
                strategy call
              </h1>
              <p className="book-subheading">
                Select a time that works for you. We will inspect your current funnel and map out a clear growth action plan -- no sales pitch, just useful work.
              </p>

              <ul className="book-trust-list" aria-label="Call guarantees">
                {TRUST_BULLETS.map((text) => (
                  <li key={text} className="book-trust-item">
                    <span className="book-trust-icon" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              {/* Host card */}
              <div className="book-host-card" aria-label="Your host">
                <div className="book-host-avatar" aria-hidden="true">A</div>
                <div className="book-host-info">
                  <span className="book-host-name">Abhijeet</span>
                  <span className="book-host-role">Founder, Cinova</span>
                </div>
              </div>

              {/* Contact */}
              <div className="book-contact-strip">
                <a href="mailto:hello@getcinova.com" className="book-contact-link" aria-label="Email Cinova">
                  hello@getcinova.com
                </a>
                <span className="book-contact-sep" aria-hidden="true">|</span>
                <a href="tel:+917428245045" className="book-contact-link" aria-label="Call Cinova">
                  +91 74282 45045
                </a>
              </div>
            </div>

            {/* RIGHT: Embed */}
            <div className="book-hero__right">
              <div className="book-embed-card" aria-label="Calendar booking widget">
                <CalBookingEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* ── DARK BAND: 3-STEP PROCESS ─────────────────── */}
        <section className="book-steps-band" aria-labelledby="steps-headline">
          <div className="book-container">
            <div className="book-steps-band__header">
              <span className="book-eyebrow book-eyebrow--on-dark">The Process</span>
              <h2 id="steps-headline" className="book-steps-band__title">
                What happens on the call
              </h2>
              <p className="book-steps-band__sub">
                A focused, practical working session centered entirely on your business.
              </p>
            </div>
            <div className="book-steps-grid" role="list">
              {CALL_STEPS.map((s) => (
                <div key={s.step} className="book-step-card" role="listitem">
                  <span className="book-step-num" aria-hidden="true">{s.step}</span>
                  <h3 className="book-step-title">{s.title}</h3>
                  <p className="book-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ACCORDION ─────────────────────────────── */}
        <section className="book-faq-section" aria-labelledby="faq-headline">
          <div className="book-container book-container--narrow">
            <div className="book-section-header">
              <span className="book-eyebrow">Common Questions</span>
              <h2 id="faq-headline" className="book-section-title">
                Everything you need to know
              </h2>
            </div>
            <div className="book-faq-list">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  faq={faq}
                  idx={idx}
                  isOpen={openFaq === idx}
                  onToggle={() => toggleFaq(idx)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SharedPageClosing />

      <style>{`
        .book-page {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
        }
        .book-main { position: relative; }

        .book-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .book-container--narrow { max-width: 780px; }

        /* Eyebrow */
        .book-eyebrow {
          display: inline-block;
          font-family: var(--font-label);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-text);
          margin-bottom: 1rem;
        }
        .book-eyebrow--on-dark { color: var(--accent-primary); }

        /* ── HERO ──────────────────────────────────────────── */
        .book-hero { padding: 8rem 1.5rem 5rem; }

        .book-hero__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 4rem;
          align-items: start;
        }

        @media (max-width: 1023px) {
          .book-hero__inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .book-hero__left { position: static !important; }
        }

        .book-hero__left {
          position: sticky;
          top: 7rem;
        }

        .book-headline {
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 4.5vw, 3.6rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }

        .book-headline__highlight {
          position: relative;
          display: inline-block;
          z-index: 0;
          color: var(--text-primary);
        }
        .book-headline__highlight::after {
          content: "";
          position: absolute;
          bottom: 4px;
          left: -3px;
          right: -3px;
          height: 38%;
          background: var(--accent-primary);
          z-index: -1;
          border-radius: 3px;
        }

        .book-subheading {
          font-family: var(--font-body);
          font-size: clamp(0.93rem, 1.7vw, 1.05rem);
          color: #3d3d38;
          line-height: 1.65;
          margin-bottom: 2rem;
        }

        /* Trust list */
        .book-trust-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 2rem;
        }
        .book-trust-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .book-trust-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #0a0a0a;
          flex-shrink: 0;
        }

        /* Host card */
        .book-host-card {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          background: #ffffff;
          border: 1px solid #e8e8e5;
          border-radius: 12px;
          padding: 0.85rem 1.2rem;
          margin-bottom: 1.25rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04);
        }
        .book-host-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--text-primary);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .book-host-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .book-host-name {
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .book-host-role {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Contact */
        .book-contact-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .book-contact-link {
          font-size: 0.82rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.18s ease;
        }
        .book-contact-link:hover { color: var(--text-primary); }
        .book-contact-link:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 3px;
          border-radius: 3px;
        }
        .book-contact-sep { color: #d0d0cc; font-size: 0.75rem; }

        /* Embed card */
        .book-hero__right { min-width: 0; }
        .book-embed-card {
          background: #ffffff;
          border: 1px solid #e8e8e5;
          border-radius: 20px;
          padding: 1.5rem 1.25rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
          overflow: hidden;
          min-height: 700px;
        }
        @media (max-width: 480px) {
          .book-embed-card {
            padding: 0.75rem 0.25rem;
            border-radius: 14px;
            min-height: 580px;
          }
        }

        /* ── DARK STEPS BAND ─────────────────────────────── */
        .book-steps-band {
          background: #0a0a0a;
          padding: 6rem 1.5rem;
        }
        .book-steps-band__header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
        }
        .book-steps-band__title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #fafafa;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.85rem;
        }
        .book-steps-band__sub {
          font-size: 1rem;
          color: #a3a3a3;
          line-height: 1.6;
          margin: 0;
        }
        .book-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 860px) {
          .book-steps-grid {
            grid-template-columns: 1fr;
            max-width: 540px;
          }
        }
        .book-step-card {
          background: #161616;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .book-step-card:hover {
          border-color: rgba(182,245,0,0.3);
          transform: translateY(-2px);
        }
        .book-step-num {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: rgba(182,245,0,0.22);
          line-height: 1;
          margin-bottom: 1.25rem;
          letter-spacing: -0.04em;
        }
        .book-step-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: #fafafa;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .book-step-desc {
          font-size: 0.9rem;
          color: #a3a3a3;
          line-height: 1.65;
          margin: 0;
        }

        /* ── FAQ ─────────────────────────────────────────── */
        .book-faq-section {
          padding: 6rem 1.5rem 7rem;
          background: var(--bg-primary);
          border-top: 1px solid var(--structural-border);
        }
        .book-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .book-section-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        /* Accordion */
        .book-faq-list {
          display: flex;
          flex-direction: column;
          border: 1px solid #e8e8e5;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
        }
        .faq-item {
          border-bottom: 1px solid #e8e8e5;
          background: #ffffff;
        }
        .faq-item:last-child { border-bottom: none; }

        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.35rem 1.75rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
          min-height: 56px;
        }
        .faq-trigger:hover { background: #fafaf8; }
        .faq-trigger:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: -2px;
        }
        .faq-trigger__q {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
          flex: 1;
        }
        .faq-trigger__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--bg-secondary);
          color: var(--text-primary);
          flex-shrink: 0;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .faq-item--open .faq-trigger__icon {
          background: var(--accent-primary);
          color: #0a0a0a;
        }

        .faq-panel {
          transition: grid-template-rows 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-panel { transition: none; }
          .book-step-card { transition: none; transform: none !important; }
        }
        .faq-panel__inner {
          overflow: hidden;
          min-height: 0;
        }
        .faq-panel__text {
          font-family: var(--font-body);
          font-size: 0.93rem;
          color: #3d3d38;
          line-height: 1.7;
          padding: 0 1.75rem 1.5rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
