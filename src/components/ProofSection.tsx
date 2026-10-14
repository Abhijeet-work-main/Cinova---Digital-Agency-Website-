"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CaseStudies.module.css";

const HOME_CASE_STUDIES = [
  // Row 1
  {
    slug: "saanvi-botanical",
    title: "Saanvi Botanical",
    description: "Plant-powered identity for a wellness brand",
    tags: ["Branding", "Content"],
    cover: "/brands/saanvi-botanical/cover.jpg",
    logo: "/brands/saanvi-botanical/logo.png",
    size: "tall",
  },
  {
    slug: "kuptuuu",
    title: "KUPTUUU",
    description: "Made to be odd — craft ceramics with character",
    tags: ["Branding", "Photography"],
    cover: "/brands/kuptuuu/cover.jpg",
    logo: "/brands/kuptuuu/logo.png",
    size: "short",
  },
  {
    slug: "erminio-palamino",
    title: "Erminio Palamino",
    description: "Elegant retail identity and digital presence",
    tags: ["Retail", "Identity"],
    cover: "/brands/erminio-palamino/cover.jpg",
    logo: "/brands/erminio-palamino/logo.png",
    size: "mid",
  },
  // Row 2
  {
    slug: "gloss-shine",
    title: "Gloss & Shine",
    description: "Premium auto detailing, elevated online",
    tags: ["Branding", "Digital"],
    cover: "/brands/gloss-shine/cover.jpg",
    logo: "/brands/gloss-shine/logo.png",
    size: "short",
  },
  {
    slug: "lustre-jewellery",
    title: "Lustre Jewellery",
    description: "Designed to stand apart — jewellery that speaks first",
    tags: ["Identity", "Photography"],
    cover: "/brands/lustre-jewellery/cover.jpg",
    logo: "/brands/lustre-jewellery/logo.png",
    size: "tall",
  },
  {
    slug: "pegah-toutak",
    title: "Pegah Toutak",
    description: "Refined personal branding that commands authority",
    tags: ["Branding", "Strategy"],
    cover: "/brands/pegah-toutak/cover.jpeg",
    logo: "/brands/pegah-toutak/logo.png",
    size: "mid",
  },
];

export default function ProofSection() {
  return (
    <section id="work" className={styles.root} style={{ '--cs-top': '120px' } as React.CSSProperties}>
      {/* HEADER */}
      <header className={styles.top}>
        {/* Row A: plus marks */}
        <div className={styles.plusRow}>
          <div></div>
          <div className={styles.plusWrap}>
            <span className={styles.plus} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.75V18.25M5.75 12H18.25" />
              </svg>
            </span>
            <span className={styles.plus} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.75V18.25M5.75 12H18.25" />
              </svg>
            </span>
            <span className={styles.plus} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5.75V18.25M5.75 12H18.25" />
              </svg>
            </span>
          </div>
        </div>

        {/* Row B: heading + subtitle */}
        <div className={styles.row12}>
          <div></div>
          <div className={styles.hCol}>
            <h2 className={styles.h1} style={{ fontSize: "clamp(56px, 8vw, 120px)" }}>Case studies</h2>
            <p className={styles.sub}>Our top work till &copy;2026</p>
          </div>
        </div>

        {/* Row C: lead paragraph + button */}
        <div className={styles.row12}>
          <div></div>
          <div>
            <p className={styles.lead} style={{ marginBottom: "2rem" }}>
              {"                        "}Our clients range from wellness startups to artisan jewellers &mdash; every project rooted in strategy, built around identity, and designed to convert.
            </p>
            <Link href="/work" className="prf-btn">
              Discover all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CARD GRID */}
      <div className={styles.grid} style={{ paddingBottom: "40px" }}>
        {HOME_CASE_STUDIES.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className={`${styles.card} ${styles[study.size]}`}
            aria-label={`Case study: ${study.title}`}
          >
            <div className={styles.media}>
              <img
                className={styles.photo}
                src={study.cover}
                alt={`${study.title} cover`}
              />
              <div className={styles.shade}></div>
              <div className={styles.tags}>
                {study.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.logo}>
                <img src={study.logo} alt={`${study.title} logo`} />
              </div>
            </div>
            <div className={styles.meta}>
              <h3 className={styles.title}>{study.title}</h3>
              <p className={styles.desc}>{study.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <div className="prf-bottom">
        <Link href="/work" className="prf-btn">
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>

      <style>{`
        /* LIME BUTTON STYLES (Retained from original ProofSection) */
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
          width: fit-content;
        }
        .prf-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(182,245,0,0.35);
        }

        .prf-bottom {
          display: flex;
          justify-content: center;
          padding-bottom: 6rem;
        }
      `}</style>
    </section>
  );
}
