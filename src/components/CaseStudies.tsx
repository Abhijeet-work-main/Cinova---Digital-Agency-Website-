import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CaseStudies.module.css";
import WorkCard from "./WorkCard";

const CASE_STUDIES = [
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
    slug: "curate-home",
    title: "Curate Home",
    description: "Heritage rituals, reimagined for modern living",
    tags: ["Strategy", "Creative"],
    cover: "/brands/curate-home/cover.jpg",
    logo: "/brands/curate-home/logo.png",
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
    description: "Luxury accessories, built to sell online",
    tags: ["Ads", "Website"],
    cover: "/brands/erminio-palamino/cover.jpg",
    logo: "/brands/erminio-palamino/logo.png",
    size: "tall",
  },
  {
    slug: "noor",
    title: "Noor",
    description: "A makeup brand, now booked online",
    tags: ["Website", "Reach"],
    cover: "/brands/noor/cover.jpg",
    logo: "/brands/noor/logo.png",
    size: "short",
  },
  {
    slug: "pegah-toutak",
    title: "Pegah Toutak",
    description: "Quiet luxury for the finishing touch",
    tags: ["Branding", "Creative"],
    cover: "/brands/pegah-toutak/cover.jpeg",
    logo: "/brands/pegah-toutak/logo.png",
    size: "mid",
  },
  // Row 4 -- new brands
  {
    slug: "balbeer",
    title: "Balbeer",
    description: "Traditional Indian wear, discovered through reels",
    tags: ["Content", "Reels"],
    cover: "/brands/balbeer/cover.jpg",
    logo: "/brands/balbeer/logo.png",
    size: "short",
  },
  {
    slug: "pb-investing",
    title: "PB Investing",
    description: "Investing education, scripted to be watched",
    tags: ["Content", "Strategy"],
    cover: "/brands/pb-investing/cover.jpg",
    logo: "/brands/pb-investing/logo.png",
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
          <WorkCard
            key={study.slug}
            slug={study.slug}
            title={study.title}
            description={study.description}
            tags={study.tags}
            cover={study.cover}
            logo={study.logo}
            size={study.size as "tall" | "mid" | "short"}
            headingTag="h2"
          />
        ))}
      </main>
    </div>
  );
}
