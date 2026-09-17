"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const STATS = [
  { value: 8,   suffix: "+",  label: "Years"            },
  { value: 120, suffix: "+",  label: "Projects"         },
  { value: 100, suffix: "%",  label: "Client Retention"  },
];

const DURATION = 1100;

function useCountUp(target: number, active: boolean): number {
  const [count, setCount] = useState(0);
  const raf   = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  const tick = useCallback((ts: number) => {
    if (start.current === null) start.current = ts;
    const p = Math.min((ts - start.current) / DURATION, 1);
    setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
    if (p < 1) raf.current = requestAnimationFrame(tick);
  }, [target]);

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

interface StatItemProps { stat: typeof STATS[number]; active: boolean; reduced: boolean; }

function StatItem({ stat, active, reduced }: StatItemProps) {
  const count = useCountUp(stat.value, active && !reduced);
  const display = reduced ? stat.value : count;
  return (
    <div className="sts-stat">
      <span className="sts-stat__number">{display}{stat.suffix}</span>
      <span className="sts-stat__label">{stat.label}</span>
    </div>
  );
}

export default function StatsSection() {
  const [active,  setActive]  = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="data" ref={ref} className="sts-section">
      <div className="sts-inner">

        {/* Top eyebrow label — Geist, small caps */}
        <p className="sts-eyebrow">
          @{new Date().getFullYear()}&mdash;Transform Digital Obstacles into Growth Opportunities
        </p>

        {/* Stat row */}
        <div className="sts-row">
          {STATS.map(s => <StatItem key={s.label} stat={s} active={active} reduced={reduced} />)}
        </div>

        {/* CTA — nav-style translucent dark pill */}
        <div className="sts-cta-wrap">
          <Link href="/#work" className="sts-cta">Get In Touch</Link>
        </div>

      </div>
      <style>{`
        .sts-section {
          padding: 8rem 2rem 10rem;
          background: #f0f0ee;
          position: relative;
          z-index: 10;
        }
        .sts-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Eyebrow — Geist small, uppercase */
        .sts-eyebrow {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 5rem;
        }

        /* Stat row */
        .sts-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          max-width: 1100px;
          margin-bottom: 7rem;
          gap: 2rem;
        }
        .sts-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        /* Numbers — Inter 700, very large (reference: 144px) */
        .sts-stat__number {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(5.5rem, 12vw, 9.5rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.05em;
          font-variant-numeric: tabular-nums;
        }

        /* Labels — Geist 500, substantial size matching reference */
        .sts-stat__label {
          font-family: 'Geist', system-ui, sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.35rem);
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.01em;
        }

        /* CTA Button — translucent nav-style dark pill */
        .sts-cta-wrap { display: flex; justify-content: center; }
        .sts-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 15, 15, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.9rem 3rem;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.12);
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .sts-cta:hover {
          background: rgba(15, 15, 15, 0.8);
          transform: translateY(-2px);
        }

        @media(max-width:768px) {
          .sts-section { padding: 6rem 1.25rem 7rem; }
          .sts-row { flex-direction: column; align-items: center; gap: 4rem; margin-bottom: 5rem; }
          .sts-stat__number { font-size: clamp(5rem, 20vw, 7rem); }
        }
        @media(prefers-reduced-motion:reduce) {
          .sts-cta { transition: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
