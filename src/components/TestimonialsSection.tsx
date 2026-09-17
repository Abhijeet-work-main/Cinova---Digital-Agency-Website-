"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   REVIEWS — placeholder copy, human-voice framing.
   Replace with verified client quotes when available.
   ───────────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    id: 1,
    quote: "Before Cinova, we were throwing money at ads without knowing what was working. They rebuilt our entire approach — the site, the targeting, everything. We finally started seeing real traction.",
    author: "Erminio Palamino",
    role: "Founder, Erminio Palamino",
    initials: "EP",
  },
  {
    id: 2,
    quote: "The content they produced felt genuinely like us. Not polished agency work — actually us. Our Reels started performing in a way they never had before and we didn't have to keep explaining the brand.",
    author: "Balbeer",
    role: "Founder, Balbeer",
    initials: "BA",
  },
  {
    id: 3,
    quote: "We used to manage bookings manually across three different tools. Cinova built us something clean and simple that just works. Clients notice the difference and so do we.",
    author: "Noor",
    role: "Founder, Noor Studio",
    initials: "NO",
  },
  {
    id: 4,
    quote: "Our channel had solid content but the packaging was holding us back. Cinova changed how we think about thumbnails, titles, everything. The numbers tell the story — 32,000 views on a single video.",
    author: "PBInvesting",
    role: "Creator, PBInvesting",
    initials: "PB",
  },
];

const BOTTOM_METRICS = [
  { value: 100, suffix: "+",       label: "brands and websites\nbuilt across industries"           },
  { value: 2,   suffix: "x faster", label: "project delivery compared\nto traditional agencies"    },
  { value: 100, suffix: "%",        label: "of clients return\nfor ongoing work"                   },
];

/* ── Reusable count-up hook ─────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1000): number {
  const [count, setCount] = useState(0);
  const raf   = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  const tick = useCallback((ts: number) => {
    if (start.current === null) start.current = ts;
    const p = Math.min((ts - start.current) / duration, 1);
    setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
    if (p < 1) raf.current = requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (active) {
      start.current = null;
      setCount(0);
      raf.current = requestAnimationFrame(tick);
    } else {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      setCount(0);
    }
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current); };
  }, [active, tick]);

  return count;
}

/* ── Bottom metric item (hooks-at-top-level via component) ── */
function MetricItem({ m, active, reduced }: { m: typeof BOTTOM_METRICS[0]; active: boolean; reduced: boolean }) {
  const count = useCountUp(m.value, active && !reduced);
  const display = reduced ? m.value : count;
  return (
    <div className="tst-metric">
      <span className="tst-metric__value">{display}{m.suffix}</span>
      <span className="tst-metric__label">{m.label}</span>
    </div>
  );
}

const STATEMENT_TEXT = "Our work speaks loudest through the results it creates. But here's what our clients say about the experience.";
const STATEMENT_WORDS = STATEMENT_TEXT.split(" ");

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = REVIEWS.length;
  const review = REVIEWS[current];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [metricsActive, setMetricsActive]   = useState(false);
  const [reduced, setReduced]               = useState(false);

  const sectionRef  = useRef<HTMLElement | null>(null);
  const metricsRef  = useRef<HTMLDivElement | null>(null);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  /* reduced-motion detection */
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Scroll-linked text highlight — starts as SOON as section enters viewport bottom */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh   = window.innerHeight;
      // p goes 0→1 as rect.top goes from vh→0.2*vh
      let p = (vh - rect.top) / (vh * 0.8);
      p = Math.max(0, Math.min(1, p));
      setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* IntersectionObserver for bottom metrics — replay every reveal */
  useEffect(() => {
    const el = metricsRef.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setMetricsActive(e.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="tst-section">
      <div className="tst-inner">

        {/* ── Section label ─────────────────────────── */}
        <div className="tst-label-row" aria-label="Section: Testimonials">
          <svg className="tst-label-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span className="tst-label-text">Testimonials</span>
        </div>

        {/* ── Scroll-reveal editorial statement ────── */}
        <h2 className="tst-statement" aria-label={STATEMENT_TEXT}>
          {STATEMENT_WORDS.map((word, i) => {
            const threshold = i / STATEMENT_WORDS.length;
            const isActive  = reduced ? true : scrollProgress > threshold;
            return (
              <span key={i} className={isActive ? "tst-word tst-word--on" : "tst-word"}>
                {word}{" "}
              </span>
            );
          })}
        </h2>

        {/* ── Two-column: rating card + quote ───────── */}
        <div className="tst-layout">

          {/* LEFT — Rating card */}
          <div className="tst-card" aria-label="Rating summary">
            {/* Plus decorations */}
            <span className="tst-plus tst-plus--tl" aria-hidden="true">+</span>
            <span className="tst-plus tst-plus--tr" aria-hidden="true">+</span>
            <span className="tst-plus tst-plus--bl" aria-hidden="true">+</span>
            <span className="tst-plus tst-plus--br" aria-hidden="true">+</span>

            <div className="tst-card__content">
              <div className="tst-rating-row">
                <span className="tst-rating__num">4.87</span>
                <span className="tst-rating__denom">/5</span>
              </div>
              <p className="tst-rating__sub">Average rating from our clients</p>

              {/* Avatar cluster */}
              <div className="tst-avatars" aria-label="Client avatars">
                {REVIEWS.map(r => (
                  <span key={r.id} className="tst-avatar" title={r.author} aria-label={r.author}>
                    {r.initials}
                  </span>
                ))}
              </div>
              <p className="tst-trusted">Trusted by 50+ teams</p>

              <a
                href="mailto:hello@cinova.in?subject=Client%20Feedback"
                className="tst-review-btn"
              >
                Leave a review
              </a>
            </div>
          </div>

          {/* RIGHT — Quote area */}
          <div className="tst-right">
            <span className="tst-counter" aria-label={`Testimonial ${current + 1} of ${total}`}>
              0{current + 1} / 0{total}
            </span>

            <blockquote className="tst-quote" key={current}>
              <span className="tst-quote__open" aria-hidden="true">&ldquo;</span>
              {review.quote}
              <span className="tst-quote__close" aria-hidden="true">&rdquo;</span>
            </blockquote>

            {/* Author */}
            <div className="tst-author">
              <span className="tst-author__avatar" aria-hidden="true">{review.initials}</span>
              <div className="tst-author__text">
                <span className="tst-author__name">{review.author}</span>
                <span className="tst-author__role">{review.role}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="tst-nav" role="group" aria-label="Navigate testimonials">
              <button
                className="tst-nav__prev"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                className="tst-nav__next"
                onClick={next}
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom metrics ───────────────────────── */}
        <div className="tst-metrics" ref={metricsRef}>
          {BOTTOM_METRICS.map((m, i) => (
            <MetricItem key={i} m={m} active={metricsActive} reduced={reduced} />
          ))}
        </div>

      </div>

      <style>{`
        /* ══════════ SECTION ══════════ */
        .tst-section {
          padding: 10rem 2rem 11rem;
          background: #f5f5f3;
          position: relative;
          z-index: 10;
        }
        .tst-inner { max-width: 1200px; margin: 0 auto; }

        /* ══════════ LABEL ROW ══════════ */
        .tst-label-row {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 3.5rem;
        }
        .tst-label-icon {
          width: 18px;
          height: 18px;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .tst-label-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.01em;
        }

        /* ══════════ STATEMENT ══════════ */
        .tst-statement {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2.4rem, 4vw, 3.5rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.025em;
          max-width: 1050px;
          margin: 0 0 7rem;
        }
        .tst-word {
          color: rgba(10,10,10,0.18);
          transition: color 0.35s ease;
          display: inline;
        }
        .tst-word--on {
          color: rgb(10,10,10);
        }

        /* ══════════ TWO-COLUMN LAYOUT ══════════ */
        .tst-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 5rem;
          align-items: start;
          margin-bottom: 9rem;
        }

        /* ══════════ RATING CARD ══════════ */
        .tst-card {
          position: relative;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 28px;
          padding: 3rem 2.5rem;
          text-align: center;
        }
        .tst-card__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        /* Plus corner decorations */
        .tst-plus {
          position: absolute;
          font-size: 1.1rem;
          font-weight: 300;
          color: rgba(0,0,0,0.25);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .tst-plus--tl { top: 14px;  left: 14px;  }
        .tst-plus--tr { top: 14px;  right: 14px; }
        .tst-plus--bl { bottom: 14px; left: 14px;  }
        .tst-plus--br { bottom: 14px; right: 14px; }

        /* Rating number */
        .tst-rating-row {
          display: flex;
          align-items: baseline;
          gap: 0.15rem;
          margin-bottom: 0.4rem;
        }
        .tst-rating__num {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 4.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .tst-rating__denom {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: rgba(10,10,10,0.4);
          letter-spacing: -0.02em;
        }
        .tst-rating__sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        /* Avatar cluster */
        .tst-avatars {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
        .tst-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e8e8e8;
          color: var(--text-primary);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          margin-left: -8px;
        }
        .tst-avatar:first-child { margin-left: 0; }
        .tst-trusted {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        /* Leave a review button */
        .tst-review-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: var(--text-primary);
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.9rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .tst-review-btn:hover { background: #222; }

        /* ══════════ QUOTE AREA ══════════ */
        .tst-right {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding-top: 0.5rem;
        }
        .tst-counter {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .tst-quote {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(1.6rem, 2.5vw, 2.25rem);
          font-style: italic;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
          letter-spacing: -0.02em;
          margin: 0;
          animation: tst-reveal 0.35s ease;
        }
        .tst-quote__open,
        .tst-quote__close {
          font-style: normal;
          opacity: 0.7;
        }
        @keyframes tst-reveal {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Author */
        .tst-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .tst-author__avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #e2e2e2;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tst-author__text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .tst-author__name {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .tst-author__role {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        /* Navigation buttons — outlined prev + solid next (reference style) */
        .tst-nav {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .tst-nav__prev,
        .tst-nav__next {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          font-size: 1.1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          line-height: 1;
        }
        /* Prev — outlined */
        .tst-nav__prev {
          background: transparent;
          border: 1.5px solid rgba(0,0,0,0.2);
          color: var(--text-primary);
        }
        .tst-nav__prev:hover {
          border-color: rgba(0,0,0,0.5);
          background: rgba(0,0,0,0.04);
        }
        /* Next — solid black pill */
        .tst-nav__next {
          background: var(--text-primary);
          border: none;
          color: #fff;
        }
        .tst-nav__next:hover {
          background: #333;
        }

        /* ══════════ BOTTOM METRICS ══════════ */
        .tst-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          padding-top: 6rem;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .tst-metric {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .tst-metric__value {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(3.5rem, 6vw, 5rem);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }
        .tst-metric__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: var(--text-muted);
          line-height: 1.5;
          white-space: pre-line;
        }

        /* ══════════ RESPONSIVE ══════════ */
        @media(max-width:1024px) {
          .tst-layout { grid-template-columns: 1fr; gap: 4rem; }
          .tst-card { max-width: 380px; }
          .tst-metrics { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width:640px) {
          .tst-section { padding: 7rem 1.25rem 6rem; }
          .tst-statement { font-size: clamp(1.9rem, 6vw, 2.4rem); margin-bottom: 5rem; }
          .tst-layout { gap: 3rem; }
          .tst-metrics { grid-template-columns: 1fr; gap: 3rem; }
          .tst-quote { font-size: clamp(1.5rem, 5vw, 1.9rem); }
          .tst-metric__value { font-size: clamp(3rem, 10vw, 4rem); }
        }
        @media(prefers-reduced-motion:reduce) {
          .tst-quote { animation: none !important; }
          .tst-word { transition: none !important; }
          .tst-nav__prev,
          .tst-nav__next { transition: none !important; }
          .tst-review-btn { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
