import React from "react";
import Link from "next/link";
import styles from "./WorkCard.module.css";

export interface WorkCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  logo: string;
  size?: "tall" | "mid" | "short";
  headingTag?: "h2" | "h3";
}

export default function WorkCard({
  slug,
  title,
  description,
  tags,
  cover,
  logo,
  size = "mid",
  headingTag = "h2",
}: WorkCardProps) {
  const Heading = headingTag;
  return (
    <Link
      href={`/work/${slug}`}
      className={`${styles.card} ${styles[size]}`}
      aria-label={`Case study: ${title}`}
    >
      <div className={styles.media}>
        <img className={styles.photo} src={cover} alt={`${title} cover`} />
        <div className={styles.shade} />
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.logo}>
          <img src={logo} alt={`${title} logo`} />
        </div>
      </div>
      <div className={styles.meta}>
        <Heading className={styles.title}>{title}</Heading>
        <p className={styles.desc}>{description}</p>
      </div>
    </Link>
  );
}
