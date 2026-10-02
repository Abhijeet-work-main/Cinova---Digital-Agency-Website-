"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";

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

export default function WorkPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="work-page-root">
      <Header />
      
      <main className="work-main">
        {/* Simple Hero Section */}
        <section className="work-hero">
          <div className="work-hero__inner">
            <h1 className="work-hero__title">Our Work</h1>
            <p className="work-hero__sub">Real problems. Connected thinking. Measurable outcomes.</p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="work-grid-section">
          <div className="work-grid__inner">
            <div className={`work-grid ${mounted ? "work-grid--visible" : ""}`}>
              {PROJECTS.map((project, i) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="work-card">
                  <div className="work-card__media">
                    <div className="work-card__pills">
                      {project.tags.map((t) => (
                        <span key={t} className="work-card__pill">{t}</span>
                      ))}
                    </div>
                    <div className="work-card__img-main">
                      <Image
                        src={project.image1}
                        alt={project.client}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        priority={i < 4}
                      />
                    </div>
                    <div className="work-card__preview" aria-hidden="true">
                      <div className="work-card__preview-inner">
                        <Image
                          src={project.image2}
                          alt=""
                          fill
                          sizes="(max-width:768px) 70vw, 30vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="work-card__info">
                    <h2 className="work-card__title">{project.client}</h2>
                    <p className="work-card__desc">{project.descriptor}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SharedPageClosing />

      <style>{`
        .work-page-root {
          background-color: var(--bg-primary);
          min-height: 100vh;
        }

        .work-hero {
          padding: 12rem 2rem 5rem;
          background: var(--bg-primary);
          text-align: center;
        }
        .work-hero__inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .work-hero__title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .work-hero__sub {
          font-family: var(--font-primary);
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .work-grid-section {
          padding: 0 2rem 8rem;
        }
        .work-grid__inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* 2 cards per row on desktop */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4rem 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .work-grid--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .work-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        /* Landscape rectangle aspect ratio */
        .work-card__media {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #1c1c1c;
          margin-bottom: 1.5rem;
          aspect-ratio: 16 / 10;
        }

        .work-card__img-main {
          position: absolute;
          inset: 0;
          transition: filter 0.55s ease, transform 0.55s ease;
        }
        .work-card:hover .work-card__img-main {
          filter: blur(8px) brightness(0.65);
          transform: scale(1.04);
        }

        .work-card__preview {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transform: scale(0.9);
          transition: opacity 0.4s ease 0.06s, transform 0.45s cubic-bezier(0.16,1,0.3,1) 0.06s;
          z-index: 10;
        }
        .work-card:hover .work-card__preview {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .work-card__preview-inner {
          position: relative;
          width: 55%;
          aspect-ratio: 16 / 10;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.55);
        }

        .work-card__pills {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          display: flex;
          gap: 0.5rem;
          z-index: 20;
          flex-wrap: wrap;
        }
        .work-card__pill {
          display: inline-block;
          background: rgba(8, 8, 8, 0.75);
          color: #fff;
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .work-card__info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .work-card__title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
          margin: 0;
          transition: color 0.2s ease;
        }
        .work-card:hover .work-card__title {
          color: var(--accent-primary);
        }
        .work-card__desc {
          font-family: var(--font-primary);
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Responsive */
        @media(max-width: 900px) {
          .work-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .work-card__media {
            aspect-ratio: 16 / 10;
          }
        }
        
        @media(max-width: 600px) {
          .work-hero {
            padding: 9rem 1.5rem 4rem;
          }
          .work-grid-section {
            padding: 0 1.5rem 6rem;
          }
          .work-card__media {
            aspect-ratio: 4 / 3;
          }
          .work-card__preview-inner {
            width: 70%;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .work-grid {
            opacity: 1; transform: none; transition: none;
          }
          .work-card__img-main,
          .work-card__preview {
            transition: none !important;
            transform: none !important;
            filter: none !important;
          }
          .work-card:hover .work-card__preview {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
