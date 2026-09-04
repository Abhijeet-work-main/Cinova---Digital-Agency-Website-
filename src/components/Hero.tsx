import React from "react";
import Image from "next/image";
import Link from "next/link";
import KineticGrid from "./ui/KineticGrid";

export default function Hero() {
  return (
    <section className="cinova-hero">
      {/* Background base */}
      <div className="cinova-hero__base"></div>

      {/* Kinetic Grid Layer (Full Width) */}
      <div className="cinova-hero__grid-layer">
        <KineticGrid
          background="transparent"
          dotColor="rgba(255,255,255,0.4)"
          lineColor="rgba(255,255,255,0.1)"
          trailColor="rgba(182, 245, 0, 0.4)"
          spacing={40}
          radius={300}
          strength={4}
          trail={true}
        />
      </div>

      {/* Hero Image — desktop: mirrored (subject right, space left for type) */}
      <div className="cinova-hero__image-wrapper cinova-hero__image-wrapper--desktop">
        <Image
          src="/hero-cinematic.png"
          alt="Cinova — premium creative and digital growth agency"
          fill
          priority
          sizes="100vw"
          className="cinova-hero__image"
        />
        {/* Gradients to blend image into the dark background */}
        <div className="cinova-hero__image-gradient-left"></div>
        <div className="cinova-hero__image-gradient-bottom"></div>
      </div>

      {/* Hero Image — mobile: non-mirrored for better composition */}
      <div className="cinova-hero__image-wrapper cinova-hero__image-wrapper--mobile">
        <Image
          src="/hero-mobile.png"
          alt="Cinova — premium creative and digital growth agency"
          fill
          priority
          sizes="100vw"
          className="cinova-hero__image"
          style={{ objectPosition: "center top" }}
        />
        <div className="cinova-hero__image-gradient-left"></div>
        <div className="cinova-hero__image-gradient-bottom"></div>
      </div>

      {/* Content Block (Left Aligned) */}
      <div className="cinova-hero__content-wrapper">
        <div className="cinova-hero__content">
          <span className="cinova-hero__eyebrow">Digital Growth Agency</span>

          <h1 className="cinova-hero__headline">
            Make your brand<br />
            impossible to<br />
            ignore.
          </h1>

          <p className="cinova-hero__subcopy">
            We connect creative direction, paid acquisition, and conversion architecture into one integrated system.
          </p>

          <div className="cinova-hero__cta-group">
            <Link href="/#audit" className="cinova-hero__cta-primary">
              Get Free Growth Audit
            </Link>
            <Link href="/work/erminio-palamino" className="cinova-hero__cta-secondary glass-panel">
              See our work →
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="cinova-hero__scroll-indicator">
        <span className="cinova-hero__scroll-arrow">↓</span>
      </div>
    </section>
  );
}
