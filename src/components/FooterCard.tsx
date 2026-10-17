"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Book a Call", href: "/book" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/cinovaofficials?dlrf=ZDNlZDc0MzIxNw==" },
  { label: "LinkedIn", href: "#", comingSoon: true },
  { label: "Twitter", href: "#", comingSoon: true },
];

export default function FooterCard() {
  return (
    <div className="footer-card-wrapper">
      {/* Dark rounded rectangle */}
      <div className="footer-card">
        {/* Background image — hero image, blackish overlay */}
        <div className="footer-card__bg" aria-hidden="true">
          <Image
            src="/cinova-hero-liquid.jpeg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="100vw"
            priority={false}
          />
          <div className="footer-card__bg-overlay" />
        </div>

        {/* Card content */}
        <div className="footer-card__content">
          {/* Left column */}
          <div className="footer-card__left">
            <div className="footer-card__brand-group">
              <p className="footer-card__tagline">Strategy × Creative × Digital</p>
              <h2 className="footer-card__brand">
                cinova<span className="footer-card__brand-dot">.</span>
              </h2>
            </div>

            <p className="footer-card__description">
              With Cinova, every part of your growth system works together to build clarity, trust, and momentum — not just visual polish, but real business outcomes.
            </p>

            <div className="footer-card__contacts">
              <a href="tel:+917428245045" className="footer-card__contact-link">
                +91 7428245045
              </a>
              <a href="mailto:hello@getcinova.com" className="footer-card__contact-link">
                hello@getcinova.com
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="footer-card__right">
            {/* Schedule a Call CTA */}
            <div className="footer-card__cta-block">
              <p className="footer-card__cta-label">
                Ready to grow? Schedule a call for free.
              </p>
              <Link
                href="/book"
                className="footer-card__cta-btn"
                id="footer-schedule-call"
                data-cta="footer"
                aria-label="Schedule a free call"
              >
                <svg
                  className="footer-card__cta-btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Schedule a free call
              </Link>
            </div>

            {/* Navigation + Social */}
            <div className="footer-card__links">
              <div className="footer-card__links-col">
                <p className="footer-card__links-heading">Navigation</p>
                <ul className="footer-card__links-list">
                  {NAV_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="footer-card__link">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-card__links-col">
                <p className="footer-card__links-heading">Social</p>
                <ul className="footer-card__links-list">
                  {SOCIAL_LINKS.map((l) => (
                    <li key={l.label}>
                      {l.comingSoon ? (
                        <span
                          className="footer-card__link footer-card__link--soon"
                          style={{ opacity: 0.5, cursor: "default", userSelect: "none" }}
                        >
                          {l.label} <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>(Coming Soon)</span>
                        </span>
                      ) : (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-card__link"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below-card bottom bar */}
      <div className="footer-bottom">
        <p className="footer-bottom__copy">
          © {new Date().getFullYear()} Cinova. All rights reserved.
        </p>
        <div className="footer-bottom__legal">
          <Link href="/privacy" className="footer-bottom__legal-link">
            Privacy Policy
          </Link>
          <Link href="/terms" className="footer-bottom__legal-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
