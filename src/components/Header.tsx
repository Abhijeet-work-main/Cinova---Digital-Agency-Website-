"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const NAV_SECTIONS = [
  {
    label: "Solutions",
    sub: [
      { label: "Conversion Websites", href: "/solutions/websites" },
      { label: "Paid Acquisition & Ads", href: "/solutions/paid-growth" },
      { label: "Creative Production", href: "/solutions/creative-production" },
      { label: "Social Media Growth", href: "/solutions/social-growth" },
    ],
  },
  {
    label: "Industries",
    sub: [
      { label: "E-commerce & Retail", href: "/for/ecommerce" },
      { label: "Service Businesses", href: "/for/service-brands" },
      { label: "Content Creators", href: "/for/creators" },
      { label: "Fashion & Apparel", href: "/for/fashion-apparel" },
    ],
  },
  {
    label: "Work",
    sub: [
      { label: "Erminio Palamino", href: "/work/erminio-palamino" },
      { label: "Balbeer", href: "/work/balbeer" },
      { label: "Gloss & Shine", href: "/work/gloss-and-shine" },
      { label: "Noor", href: "/work/noor" },
      { label: "PBInvesting", href: "/work/pb-investing" },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll state ─────────────────────────── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Body scroll lock ─────────────────────── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Move focus into menu on open
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      // Return focus to menu button on close
      menuBtnRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── Keyboard: Escape + focus trap ──────────── */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const menu = menuRef.current;
        if (!menu) return;
        const focusable = menu.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  return (
    <>
      {/* ─── HEADER BAR ─── */}
      <header
        className={`cinova-header${scrolled ? " cinova-header--scrolled" : ""}`}
        role="banner"
      >
        <div className="cinova-header__inner">
          {/* Logo */}
          <Link
            href="/"
            className="cinova-header__logo"
            onClick={closeMenu}
            aria-label="Cinova — home"
          >
            cinova<span className="cinova-header__logo-dot">.</span>
          </Link>

          {/* Right side controls */}
          <nav className="cinova-header__nav" aria-label="Primary navigation">
            {/* Desktop quick links */}
            <div className="cinova-header__links" aria-hidden="true">
              <Link href="/solutions/paid-growth" className="cinova-header__link">
                Solutions
              </Link>
              <Link href="/for/ecommerce" className="cinova-header__link">
                Industries
              </Link>
              <Link href="/work/erminio-palamino" className="cinova-header__link">
                Work
              </Link>
            </div>

            {/* Audit CTA */}
            <Link
              href="/#audit"
              className="cinova-header__cta glass-panel"
              onClick={closeMenu}
            >
              Free Audit
            </Link>

            {/* Menu bubble trigger */}
            <button
              ref={menuBtnRef}
              onClick={toggleMenu}
              className="cinova-header__menu-btn glass-panel"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="cinova-fullscreen-menu"
            >
              <span className="cinova-header__menu-label">menu</span>
              <span className="cinova-header__hamburger" aria-hidden="true">
                <span
                  className={`cinova-header__bar${menuOpen ? " cinova-header__bar--open-top" : ""}`}
                />
                <span
                  className={`cinova-header__bar${menuOpen ? " cinova-header__bar--open-btm" : ""}`}
                />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* ─── FULLSCREEN MENU OVERLAY ─── */}
      <div
        id="cinova-fullscreen-menu"
        ref={menuRef}
        className={`cinova-menu${menuOpen ? " cinova-menu--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        {/* Backdrop click to close */}
        <div
          className="cinova-menu__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div className="cinova-menu__panel glass-panel">
          {/* Close button */}
          <button
            ref={closeRef}
            className="cinova-menu__close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <span className="cinova-menu__close-line" aria-hidden="true" />
            <span className="cinova-menu__close-line" aria-hidden="true" />
          </button>

          {/* Menu content */}
          <div className="cinova-menu__content">
            {/* Left: nav sections */}
            <div className="cinova-menu__sections">
              {NAV_SECTIONS.map((section, si) => (
                <div
                  key={section.label}
                  className="cinova-menu__section"
                  style={{ "--section-index": si } as React.CSSProperties}
                >
                  <p className="cinova-menu__section-label">{section.label}</p>
                  <ul className="cinova-menu__list" role="list">
                    {section.sub.map((item, ii) => (
                      <li
                        key={item.href}
                        style={{ "--item-index": ii } as React.CSSProperties}
                      >
                        <Link
                          href={item.href}
                          className="cinova-menu__link"
                          onClick={closeMenu}
                          tabIndex={menuOpen ? 0 : -1}
                        >
                          <span className="cinova-menu__link-text">{item.label}</span>
                          <span className="cinova-menu__link-arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: Growth Diagnostic CTA */}
            <div className="cinova-menu__cta-col">
              <div className="cinova-menu__cta-block">
                <p className="cinova-menu__cta-eyebrow">Ready to grow?</p>
                <h2 className="cinova-menu__cta-headline">
                  Get your free<br />
                  <em>Growth Diagnosis.</em>
                </h2>
                <p className="cinova-menu__cta-body">
                  We identify your biggest conversion leak in 15 minutes — no obligation.
                </p>
                <Link
                  href="/#audit"
                  className="cinova-menu__cta-btn"
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  Claim Your Free Audit
                </Link>
              </div>

              {/* Contact info */}
              <div className="cinova-menu__contact">
                <a
                  href="mailto:xabhijeetxa@gmail.com"
                  className="cinova-menu__contact-link"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  xabhijeetxa@gmail.com
                </a>
                <a
                  href="tel:+917428245045"
                  className="cinova-menu__contact-link"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  +91 74282 45045
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
