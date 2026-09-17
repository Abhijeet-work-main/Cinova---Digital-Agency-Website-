"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA — all sourced from real caseStudies entries.
   image1 = primary (default state)
   image2 = preview (revealed inside hover frame)
   Swap these paths when final creative assets are ready.
   ───────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: "balbeer",
    client: "Balbeer",
    descriptor: "Videography and social growth strategy for an apparel brand.",
    tags: ["Apparel", "Videography"],
    image1: "/Dummy_Image/Balbeer1.jpg",
    image2: "/Dummy_Image/Balbeer2.jpg",
  },
  {
    slug: "erminio-palamino",
    client: "Erminio Palamino",
    descriptor: "Luxury retail growth through Meta Ads and e-commerce conversion architecture.",
    tags: ["Luxury Retail", "Meta Ads"],
    image1: "/Dummy_Image/erminio1.jpg",
    image2: "/Dummy_Image/erminio2.jpg",
  },
  {
    slug: "noor",
    client: "Noor",
    descriptor: "Custom booking system that automated appointment management entirely.",
    tags: ["Beauty & Bridal", "Web Dev"],
    image1: "/Dummy_Image/noor1.jpg",
    image2: "/Dummy_Image/noor2.jpg",
  },
  {
    slug: "pb-investing",
    client: "PBInvesting",
    descriptor: "YouTube content strategy and post-production for a financial channel.",
    tags: ["Financial Media", "YouTube"],
    image1: "/Dummy_Image/pb1.jpg",
    image2: "/Dummy_Image/pb2.jpg",
  },
  {
    slug: "mandara",
    client: "Mandara",
    descriptor: "Brand strategy and digital rollout for a wellness and lifestyle space.",
    tags: ["Wellness", "Brand Strategy"],
    image1: "/Dummy_Image/mandara1.jpg",
    image2: "/Dummy_Image/mandara2.jpg",
  },
  {
    slug: "gloss-and-shine",
    client: "Gloss & Shine",
    descriptor: "Social advertising and videography that generated leads across multiple regions.",
    tags: ["Beauty & Auto", "Social Ads"],
    image1: "/Dummy_Image/GandS.jpg",
    image2: "/Dummy_Image/GandS1.jpg",
  },
];

const ERMINIO_SLUG = "erminio-palamino";
type CardSize = "tall" | "small";
interface CardDef { slug: string; size: CardSize; }

// ROW 1: Balbeer (TALL) | Erminio (SMALL/FEATURED) | Noor (TALL)
const ROW_1: CardDef[] = [
  { slug: "balbeer",          size: "tall"  },
  { slug: "erminio-palamino", size: "small" },
  { slug: "noor",             size: "tall"  },
];

// ROW 2: PBInvesting (SMALL) | Mandara (TALL) | Gloss & Shine (SMALL)
const ROW_2: CardDef[] = [
  { slug: "pb-investing",   size: "small" },
  { slug: "mandara",        size: "tall"  },
  { slug: "gloss-and-shine",size: "small" },
];

/* Small folder/work SVG icon */
function WorkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <rect x="0.7" y="3.7" width="12.6" height="9.6" rx="1.4" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M4.2 3.7V2.8a.9.9 0 01.9-.9h3.8a.9.9 0 01.9.9v.9" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROOF CARD — pure CSS :hover, no React state
   ───────────────────────────────────────────────────────────── */
function ProofCard({ slug, size }: { slug: string; size: CardSize }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  const isFeatured = slug === ERMINIO_SLUG;

  return (
    <Link
      href={`/work/${slug}`}
      className={`prf-card prf-card--${size}${isFeatured ? " prf-card--featured" : ""}`}
      aria-label={`View ${project.client} case study`}
    >
      {/* ── Image region ───────────────────────────────────── */}
      <div className="prf-card__media">

        {/* Dark nav-bar style tags — always readable over any image */}
        <div className="prf-card__pills">
          {project.tags.map((t) => (
            <span key={t} className="prf-card__pill">{t}</span>
          ))}
        </div>

        {/* Main image — blurs + darkens on hover (PUMA style) */}
        <div className="prf-card__img-main">
          <Image
            src={project.image1}
            alt={project.client}
            fill
            sizes="(max-width:680px) 100vw,(max-width:1024px) 50vw,33vw"
            style={{ objectFit: "cover" }}
            priority={isFeatured}
          />
        </div>

        {/* Preview frame — revealed in centre on hover */}
        <div className="prf-card__preview" aria-hidden="true">
          <div className="prf-card__preview-inner">
            <Image
              src={project.image2}
              alt=""
              fill
              sizes="22vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* ── Info beneath image ─────────────────────────────── */}
      <div className="prf-card__info">
        {isFeatured && (
          <div className="prf-card__feat-strip" aria-hidden="true">
            <span className="prf-card__feat-rule" />
            <span className="prf-card__feat-label">Featured Project</span>
            <span className="prf-card__feat-rule" />
          </div>
        )}
        <h3 className={`prf-card__title${isFeatured ? " prf-card__title--lime" : ""}`}>
          {project.client}
        </h3>
        <p className="prf-card__desc">{project.descriptor}</p>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROOF SECTION
   ───────────────────────────────────────────────────────────── */
export default function ProofSection() {
  return (
    <section id="work" className="prf-section">
      <div className="prf-section__inner">

        {/* ── Section Introduction ────────────────────────── */}
        <div className="prf-intro">
          {/* Work label — top-left, like the reference */}
          <div className="prf-intro__worklabel">
            <WorkIcon />
            <span>Work</span>
          </div>

          {/* Centered editorial block */}
          <div className="prf-intro__center">
            <h2 className="prf-intro__h2">Case Studies</h2>
            <p className="prf-intro__sub">Featured work between &copy;2024&ndash;25</p>
            <p className="prf-intro__body">
              Real problems. Connected thinking. Measurable outcomes.
              Every project below started with a business challenge and was built to deliver a result.
            </p>
            <Link href="/work" className="prf-btn">
              Discover all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* ── Project Grid ────────────────────────────────── */}
        <div className="prf-grid">
          <div className="prf-row">
            {ROW_1.map((c) => (
              <ProofCard key={`r1-${c.slug}`} slug={c.slug} size={c.size} />
            ))}
          </div>
          <div className="prf-row">
            {ROW_2.map((c) => (
              <ProofCard key={`r2-${c.slug}`} slug={c.slug} size={c.size} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <div className="prf-bottom">
          <Link href="/work" className="prf-btn">
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>

      {/* ── Scoped styles ───────────────────────────────────── */}
      <style>{`
        /* ── SECTION ────────────────────────────────────────── */
        .prf-section {
          padding: 7rem 2rem 6rem;
          background: #f5f5f3;
          position: relative;
          z-index: 10;
        }
        .prf-section__inner {
          max-width: 1360px;
          margin: 0 auto;
        }

        /* ── INTRO ──────────────────────────────────────────── */
        .prf-intro {
          position: relative;
          text-align: center;
          padding-top: 0.5rem;
          margin-bottom: 5rem;
        }

        /* Work icon label — top-left */
        .prf-intro__worklabel {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-primary);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.01em;
          text-decoration: none;
        }

        /* Centered content block */
        .prf-intro__center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Big editorial headline */
        .prf-intro__h2 {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.04em;
          line-height: 1;
          margin: 0 0 1.1rem;
        }

        /* Supporting sub-headline */
        .prf-intro__sub {
          font-family: var(--font-primary);
          font-size: 1rem;
          color: var(--text-secondary);
          margin: 0 0 1.1rem;
          font-weight: 400;
        }

        /* Short descriptor paragraph */
        .prf-intro__body {
          font-family: var(--font-primary);
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.65;
          max-width: 500px;
          margin: 0 0 2.4rem;
        }

        /* ── LIME BUTTON ──────────────────────────────────────── */
        .prf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: var(--accent-primary);
          color: #0a0a0a;
          font-family: var(--font-primary);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 0.72rem 1.8rem;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .prf-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(182,245,0,0.35);
        }

        /* ── GRID ───────────────────────────────────────────── */
        .prf-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;           /* Gap between Row 1 and Row 2 */
        }

        /* Each row: 3 equal columns */
        .prf-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: start;  /* Heights differ — no stretching */
        }

        /* ── CARD ───────────────────────────────────────────── */
        .prf-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          position: relative;
        }

        /* ── MEDIA (image container) ─────────────────────────── */
        .prf-card__media {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          background: #1c1c1c;
          margin-bottom: 1rem;
        }

        /* Height via aspect-ratio — equal width guarantees equal heights */
        .prf-card--tall  .prf-card__media { aspect-ratio: 3 / 4; }
        .prf-card--small .prf-card__media { aspect-ratio: 4 / 3; }

        /* Featured: lime top-line on the media container */
        .prf-card--featured .prf-card__media {
          border-top: 3px solid var(--accent-primary);
        }

        /* ── MAIN IMAGE — blurs on hover (PUMA) ─────────────── */
        .prf-card__img-main {
          position: absolute;
          inset: 0;
          transition: filter 0.55s ease, transform 0.55s ease;
        }
        .prf-card:hover .prf-card__img-main {
          filter: blur(7px) brightness(0.65);
          transform: scale(1.04);
        }

        /* ── PREVIEW — centred frame revealed on hover ───────── */
        .prf-card__preview {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transform: scale(0.88);
          transition: opacity 0.4s ease 0.06s, transform 0.45s cubic-bezier(0.16,1,0.3,1) 0.06s;
          z-index: 10;
        }
        .prf-card:hover .prf-card__preview {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        /* The framed inner preview box */
        .prf-card__preview-inner {
          position: relative;
          width: 64%;
          aspect-ratio: 16 / 10;
          border: 2.5px solid rgba(255,255,255,0.92);
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.55);
        }

        /* ── TAGS — dark nav-bar pills ───────────────────────── */
        .prf-card__pills {
          position: absolute;
          top: 0.9rem;
          left: 0.9rem;
          display: flex;
          gap: 0.4rem;
          z-index: 20;
          flex-wrap: wrap;
          max-width: calc(100% - 1.8rem);
        }
        .prf-card__pill {
          display: inline-block;
          background: rgba(8, 8, 8, 0.78);
          color: #fff;
          font-family: var(--font-primary);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          padding: 0.26rem 0.65rem;
          border-radius: 50px;
          white-space: nowrap;
          line-height: 1.4;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* ── INFO ────────────────────────────────────────────── */
        .prf-card__info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        /* Featured strip: ——— FEATURED PROJECT ——— */
        .prf-card__feat-strip {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.3rem;
        }
        .prf-card__feat-rule {
          flex: 1;
          height: 1px;
          background: var(--accent-primary);
          max-width: 40px;
        }
        .prf-card__feat-label {
          font-family: var(--font-primary);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--accent-primary);
          white-space: nowrap;
        }

        /* Project title */
        .prf-card__title {
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 1.8vw, 1.5rem);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
          margin: 0;
          transition: color 0.2s ease;
        }
        .prf-card__title--lime {
          color: var(--accent-primary);
        }
        .prf-card:hover .prf-card__title {
          color: var(--text-primary);
        }
        .prf-card--featured:hover .prf-card__title {
          color: var(--accent-primary);
        }

        /* Project descriptor */
        .prf-card__desc {
          font-family: var(--font-primary);
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* ── BOTTOM CTA ──────────────────────────────────────── */
        .prf-bottom {
          display: flex;
          justify-content: center;
          margin-top: 4.5rem;
        }

        /* ── RESPONSIVE ─────────────────────────────────────── */
        @media(max-width:1024px) {
          .prf-intro {
            padding-top: 2.5rem; /* Push intro down so Work label doesn't overlap h2 */
            margin-bottom: 4rem;
          }
          .prf-intro__worklabel {
            position: static;
            justify-content: center;
            margin-bottom: 1.25rem;
          }
          .prf-intro__h2 {
            font-size: clamp(3rem, 7vw, 5rem);
          }
          .prf-row {
            grid-template-columns: 1fr 1fr;
          }
          /* On tablet: third card in row 1 spans full width */
          .prf-row:first-child .prf-card:nth-child(3) {
            grid-column: 1 / -1;
          }
          /* On tablet: second card (tall) in row 2 spans full width */
          .prf-row:last-child .prf-card:nth-child(2) {
            grid-column: 1 / -1;
          }
          .prf-card--tall  .prf-card__media { aspect-ratio: 16 / 11; }
          .prf-card--small .prf-card__media { aspect-ratio: 16 / 10; }
        }

        @media(max-width:680px) {
          .prf-section {
            padding: 5rem 1.25rem 4rem;
          }
          .prf-intro {
            padding-top: 2.5rem;
          }
          .prf-intro__worklabel {
            position: static;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .prf-row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .prf-row:first-child .prf-card:nth-child(3),
          .prf-row:last-child  .prf-card:nth-child(2) {
            grid-column: auto;
          }
          .prf-card--tall  .prf-card__media { aspect-ratio: 4 / 3; }
          .prf-card--small .prf-card__media { aspect-ratio: 16 / 9; }
          .prf-card__preview-inner { width: 70%; }
        }

        /* ── REDUCED MOTION ──────────────────────────────────── */
        @media(prefers-reduced-motion:reduce) {
          .prf-card__img-main,
          .prf-card__preview,
          .prf-btn {
            transition: none !important;
            transform: none !important;
            filter: none !important;
          }
          .prf-card:hover .prf-card__preview {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
