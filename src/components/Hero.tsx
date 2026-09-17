"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import LiquidImage from "./LiquidImage";

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgLayerRef = useRef<HTMLDivElement>(null);
  const wmarkRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const tagsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    /* ── Shared state for both loops ──────────────────────── */
    let scrollY = 0;
    let scrollTarget = 0;
    let cx = 0, cy = 0;
    let tx = 0, ty = 0;
    let raf: number;

    const onScroll = () => { scrollTarget = window.scrollY; };

    const applyTransforms = () => {
      raf = requestAnimationFrame(applyTransforms);

      /* Smooth scroll lerp */
      scrollY += (scrollTarget - scrollY) * 0.08;

      /* Smooth mouse lerp (only on fine pointer) */
      if (!isCoarse) {
        cx += (tx - cx) * 0.045;
        cy += (ty - cy) * 0.045;
      }

      if (noMotion) return;

      const imgL = imgLayerRef.current;
      const wmL  = wmarkRef.current;
      const tL   = titleRef.current;
      const tgL  = tagsRef.current;

      /* Combined scroll + mouse parallax per layer */
      if (imgL) imgL.style.transform =
        `translate(0px, ${scrollY * 0.5}px) scale(1.12)`;
      if (wmL)  wmL.style.transform  =
        `translate(${cx * 14}px, ${cy * 9 + scrollY * 0.3}px)`;
      if (tL)   tL.style.transform   =
        `translate(${cx * -6}px, ${cy * -4 + scrollY * 0.1}px)`;
      if (tgL)  tgL.style.transform  =
        `translateY(${scrollY * 0.25}px)`;

    };

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth)  - 0.5;
      ty = (e.clientY / window.innerHeight) - 0.5;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isCoarse) {
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave, { passive: true });
    }
    raf = requestAnimationFrame(applyTransforms);

    return () => {
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" aria-label="Cinova Digital Growth Agency">

      {/* L0: Deep Canvas — Liquid Image fills entire hero */}
      <div ref={imgLayerRef} className="hero__img-layer">
        <LiquidImage
          src="/cinova-hero-liquid.jpeg"
          alt="Cinova cinematic visual"
          className="hero__liquid"
        />
        {/* Layered gradient: protects top for header, softens bottom for wordmark readability */}
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      {/* L1: Architectural Wordmark — bottom anchored, clearly visible */}
      <div ref={wmarkRef} className="hero__wordmark" aria-hidden="true">
        CINOVA
      </div>

      {/* L2: Discipline tags — horizontal editorial bar, inspired by reference service row */}
      <div ref={tagsRef} className="hero__discipline-bar" aria-hidden="true">
        <span>Strategy</span>
        <span>Creative</span>
        <span>Paid Media</span>
        <span>Web &amp; Digital</span>
        <span>Growth Intelligence</span>
      </div>

      {/* L3: Editorial Foreground Composition */}
      <div className="hero__stage">

        {/* Main Statement — top-left, very large editorial mass */}
        <h1 ref={titleRef} className="hero__title">
          <span className="hero__title-line">We make your brand</span>
          <span className="hero__title-line hero__title-line--italic"><em>impossible</em></span>
          <span className="hero__title-line">to ignore.</span>
        </h1>

      </div>

    </section>
  );
}
