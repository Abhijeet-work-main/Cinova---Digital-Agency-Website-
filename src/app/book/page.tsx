import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import FooterCard from "../../components/FooterCard";
import CalBookingEmbed from "../../components/CalBookingEmbed";

export const metadata: Metadata = {
  title: "Book Your Free Strategy Call",
  description:
    "Schedule a free 30-minute growth diagnostic with Cinova. We identify your conversion bottlenecks and leave you with a clear, actionable growth plan.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book Your Free Strategy Call | Cinova",
    description:
      "Schedule a free 30-minute growth diagnostic with Cinova. We identify your conversion bottlenecks and leave you with a clear, actionable growth plan.",
    url: "/book",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/hero-cinematic.png",
        width: 1920,
        height: 1080,
        alt: "Book a free strategy call with Cinova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Free Strategy Call | Cinova",
    description:
      "Schedule a free 30-minute growth diagnostic with Cinova.",
    images: ["/hero-cinematic.png"],
  },
};

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
    desc: "We pinpoint the high-leverage fixes—whether landing page architecture, offer messaging, or ad-to-conversion alignment.",
  },
  {
    step: "03",
    title: "Custom Action Plan",
    desc: "You walk away with a prioritized roadmap tailored to your target milestone that you can execute immediately.",
  },
];

const FAQS = [
  {
    q: "Who is this strategy call for?",
    a: "This session is designed for founders, brands, and marketing leaders who have existing traction or ambition, but feel their marketing pieces are disconnected and conversion is lagging behind attention.",
  },
  {
    q: "Is this really free and without obligation?",
    a: "Yes, 100%. We use this call to evaluate whether our approach aligns with your growth stage. You receive our diagnostic insights and recommendations regardless of whether we end up working together.",
  },
  {
    q: "What should I have prepared for the call?",
    a: "Having your website link, current performance benchmarks (traffic, conversion rates, or ad metrics if applicable), and your primary goal for the next 3–6 months will help us deliver maximum value.",
  },
  {
    q: "What happens if I need to reschedule?",
    a: "Life happens. You can reschedule or cancel at any time with a single click using the link provided in your confirmation email.",
  },
];

export default function BookPage() {
  return (
    <div className="book-page">
      <Header />

      <main className="book-main">
        {/* Hero / Intro */}
        <section className="book-hero" aria-labelledby="book-headline">
          <div className="book-hero__glow" aria-hidden="true" />
          <div className="book-hero__container">
            <span className="book-hero__tag">Direct Growth Diagnostic</span>
            <h1 id="book-headline" className="book-hero__headline">
              Book your free strategy call
            </h1>
            <p className="book-hero__subheading">
              Select a time that works best for you. We will inspect your current funnel and map out a clear growth action plan.
            </p>

            {/* Trust Bullets */}
            <div className="book-trust-strip" role="list" aria-label="Call guarantees">
              {TRUST_BULLETS.map((bullet) => (
                <div key={bullet} className="book-trust-pill" role="listitem">
                  <svg
                    className="book-trust-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cal.com Embed Container */}
        <section className="book-embed-section" aria-label="Calendar booking widget">
          <div className="book-embed-wrapper glass-panel">
            <CalBookingEmbed />
          </div>
        </section>

        {/* 3-Step Strip: What happens on the call */}
        <section className="book-steps-section" aria-labelledby="steps-headline">
          <div className="book-container">
            <div className="book-section-header">
              <span className="book-section-eyebrow">The Process</span>
              <h2 id="steps-headline" className="book-section-title">
                What happens on the call
              </h2>
              <p className="book-section-sub">
                A focused, practical working session centered entirely on your business.
              </p>
            </div>

            <div className="book-steps-grid">
              {CALL_STEPS.map((s) => (
                <div key={s.step} className="book-step-card glass-panel">
                  <span className="book-step-num" aria-hidden="true">{s.step}</span>
                  <h3 className="book-step-title">{s.title}</h3>
                  <p className="book-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Question FAQ */}
        <section className="book-faq-section" aria-labelledby="faq-headline">
          <div className="book-container">
            <div className="book-section-header">
              <span className="book-section-eyebrow">Common Questions</span>
              <h2 id="faq-headline" className="book-section-title">
                Everything you need to know
              </h2>
            </div>

            <div className="book-faq-grid">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="book-faq-card glass-panel">
                  <h3 className="book-faq-q">{faq.q}</h3>
                  <p className="book-faq-a">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer role="contentinfo">
        <FooterCard />
      </footer>

      <style>{`
        .book-page {
          background-color: var(--text-primary);
          color: #FAFAFA;
          min-height: 100vh;
        }

        .book-main {
          position: relative;
          z-index: 10;
        }

        .book-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── HERO ────────────────────────────────────────── */
        .book-hero {
          position: relative;
          padding: 9rem 1.5rem 3rem;
          text-align: center;
          overflow: hidden;
        }

        .book-hero__glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 720px;
          height: 480px;
          background: radial-gradient(circle, rgba(182, 245, 0, 0.12) 0%, transparent 68%);
          pointer-events: none;
          z-index: 1;
        }

        .book-hero__container {
          position: relative;
          z-index: 2;
          max-width: 860px;
          margin: 0 auto;
        }

        .book-hero__tag {
          display: inline-block;
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 1.25rem;
        }

        .book-hero__headline {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 700;
          color: #FAFAFA;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
        }

        .book-hero__subheading {
          font-family: var(--font-primary);
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #A3A3A3;
          line-height: 1.6;
          max-width: 640px;
          margin: 0 auto 2.25rem;
        }

        /* Trust Bullets */
        .book-trust-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .book-trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #E5E5E5;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .book-trust-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        /* ── CALENDAR EMBED ──────────────────────────────── */
        .book-embed-section {
          padding: 1.5rem 1.5rem 6rem;
          max-width: 1140px;
          margin: 0 auto;
        }

        .book-embed-wrapper {
          background: #0d0d0d;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 20px;
          padding: 1.5rem 1rem;
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        @media (max-width: 480px) {
          .book-embed-wrapper {
            padding: 0.75rem 0.25rem;
            border-radius: 14px;
          }
        }

        /* ── SECTION HEADERS ─────────────────────────────── */
        .book-section-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3.5rem;
        }

        .book-section-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.85rem;
        }

        .book-section-title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700;
          color: #FAFAFA;
          line-height: 1.15;
          margin-bottom: 0.85rem;
        }

        .book-section-sub {
          font-size: 1rem;
          color: #A3A3A3;
          line-height: 1.6;
        }

        /* ── STEPS STRIP ─────────────────────────────────── */
        .book-steps-section {
          padding: 5rem 0 6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.25);
        }

        .book-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 860px) {
          .book-steps-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .book-step-card {
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .book-step-card:hover {
          border-color: rgba(182, 245, 0, 0.3);
          transform: translateY(-2px);
        }

        .book-step-num {
          font-family: var(--font-display);
          font-size: 2.4rem;
          font-weight: 700;
          color: rgba(182, 245, 0, 0.25);
          line-height: 1;
          margin-bottom: 1.25rem;
        }

        .book-step-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 600;
          color: #FAFAFA;
          margin-bottom: 0.75rem;
        }

        .book-step-desc {
          font-size: 0.92rem;
          color: #999999;
          line-height: 1.65;
        }

        /* ── FAQ GRID ────────────────────────────────────── */
        .book-faq-section {
          padding: 6rem 0 8rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .book-faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .book-faq-grid {
            grid-template-columns: 1fr;
          }
        }

        .book-faq-card {
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 2.25rem 2rem;
        }

        .book-faq-q {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
          color: #FAFAFA;
          margin-bottom: 0.75rem;
          line-height: 1.35;
        }

        .book-faq-a {
          font-size: 0.92rem;
          color: #999999;
          line-height: 1.65;
          margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .book-step-card {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
