import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CaseStudies.module.css";

const CASE_STUDIES = [
  // Row 1
  {
    slug: "saanvi-botanical",
    title: "Saanvi Botanical",
    description: "Plant-powered identity for a wellness brand",
    tags: ["Branding", "Content"],
    cover: "/brands/saanvi-botanical/cover.png",
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
    slug: "curate-home",
    title: "Curate Home",
    description: "Heritage rituals, reimagined for modern living",
    tags: ["Strategy", "Creative"],
    cover: "/brands/curate-home/cover.png",
    logo: "/brands/curate-home/logo.png",
    size: "mid",
  },
  // Row 2
  {
    slug: "gloss-shine",
    title: "Gloss & Shine",
    description: "Premium auto detailing, elevated online",
    tags: ["Branding", "Digital"],
    cover: "/brands/gloss-shine/cover.png",
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
    slug: "purple-swan",
    title: "Purple Swan",
    description: "Gentle care, naturally — skincare with a clean conscience",
    tags: ["Packaging", "Branding"],
    cover: "/brands/purple-swan/cover.jpg",
    logo: "/brands/purple-swan/logo.png",
    size: "mid",
  },
  // Row 3
  {
    slug: "erminio-palamino",
    title: "Erminio Palamino",
    description: "Elegant retail identity and digital presence", // PLACEHOLDER COPY - review
    tags: ["Retail", "Identity"], // PLACEHOLDER COPY - review
    cover: "/brands/erminio-palamino/cover.png",
    logo: "/brands/erminio-palamino/logo.png",
    size: "tall",
  },
  {
    slug: "noor",
    title: "Noor",
    description: "Custom booking system and refined brand architecture", // PLACEHOLDER COPY - review
    tags: ["Web Dev", "Systems"], // PLACEHOLDER COPY - review
    cover: "/brands/noor/cover.png",
    logo: "/brands/noor/logo.png",
    size: "short",
  },
  {
    slug: "pegah-toutak",
    title: "Pegah Toutak",
    description: "Refined personal branding that commands authority", // PLACEHOLDER COPY - review
    tags: ["Branding", "Strategy"], // PLACEHOLDER COPY - review
    cover: "/brands/pegah-toutak/cover.jpeg",
    logo: "/brands/pegah-toutak/logo.png",
    size: "mid",
  },
];

export default function CaseStudies() {
  return (
    <div className={styles.root}>
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
            <h1 className={styles.h1}>Case studies</h1>
            <p className={styles.sub}>Our top work till &copy;2026</p>
          </div>
        </div>

        {/* Row C: lead paragraph. The leading spaces are preserved for indent. */}
        <div className={styles.row12}>
          <div></div>
          <p className={styles.lead}>
            {"                        "}Our clients range from wellness startups to artisan jewellers &mdash; every project rooted in strategy, built around identity, and designed to convert.
          </p>
        </div>
      </header>

      {/* CARD GRID */}
      <main className={styles.grid}>
        {CASE_STUDIES.map((study) => (
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
              <h2 className={styles.title}>{study.title}</h2>
              <p className={styles.desc}>{study.description}</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
