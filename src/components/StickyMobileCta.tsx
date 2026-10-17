"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  // Hidden on /book and /thank-you pages
  const isExcludedPage = pathname === "/book" || pathname === "/thank-you";

  useEffect(() => {
    if (isExcludedPage) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show after scrolling past hero (~380px)
          const pastHero = window.scrollY > 380;
          setVisible(pastHero);

          // Check if footer is currently in view to prevent overlap
          const footer = document.querySelector("footer");
          if (footer) {
            const footerRect = footer.getBoundingClientRect();
            // If top of footer enters bottom of viewport
            if (footerRect.top <= window.innerHeight + 10) {
              setNearFooter(true);
            } else {
              setNearFooter(false);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isExcludedPage]);

  if (isExcludedPage) return null;

  const shouldShow = visible && !nearFooter;

  return (
    <aside
      className={`sticky-mobile-cta-wrapper ${shouldShow ? "sticky-mobile-cta--visible" : ""}`}
      aria-label="Mobile quick booking action"
      aria-hidden={!shouldShow}
    >
      <div className="sticky-mobile-cta-glass">
        <Link
          href="/book"
          className="sticky-mobile-cta-btn"
          data-cta="sticky-mobile"
          aria-label="Book a Free Call with Cinova"
          tabIndex={shouldShow ? 0 : -1}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Book a Free Call</span>
          <span className="sticky-mobile-cta-arrow" aria-hidden="true">→</span>
        </Link>
      </div>

      <style>{`
        .sticky-mobile-cta-wrapper {
          display: none;
        }

        @media (max-width: 768px) {
          .sticky-mobile-cta-wrapper {
            display: block;
            position: fixed;
            bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
            left: 1rem;
            right: 1rem;
            z-index: 99;
            pointer-events: none;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .sticky-mobile-cta--visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .sticky-mobile-cta-glass {
            background: rgba(14, 14, 14, 0.92);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 100px;
            padding: 0.45rem;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .sticky-mobile-cta-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            width: 100%;
            padding: 0.85rem 1.4rem;
            background: var(--accent-primary);
            color: #050505;
            font-family: var(--font-primary);
            font-size: 0.95rem;
            font-weight: 700;
            letter-spacing: 0.01em;
            text-decoration: none;
            border-radius: 100px;
            box-shadow: 0 4px 14px rgba(182, 245, 0, 0.25);
            transition: background 0.2s ease, transform 0.2s ease;
          }

          .sticky-mobile-cta-btn:active {
            transform: scale(0.98);
          }

          .sticky-mobile-cta-btn:focus-visible {
            outline: 2px solid #ffffff;
            outline-offset: 3px;
          }

          .sticky-mobile-cta-arrow {
            font-size: 1.1rem;
            line-height: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sticky-mobile-cta-wrapper {
            transition: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
