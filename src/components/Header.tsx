"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SOLUTIONS = [
  { label: "Conversion Websites", href: "/solutions/websites" },
  { label: "Paid Acquisition & Ads", href: "/solutions/paid-growth" },
  { label: "Creative Production", href: "/solutions/creative-production" },
  { label: "Social Media Growth", href: "/solutions/social-growth" },
];

const INDUSTRIES = [
  { label: "E-commerce & Retail", href: "/for/ecommerce" },
  { label: "Service Businesses", href: "/for/service-brands" },
  { label: "Content Creators", href: "/for/creators" },
  { label: "Fashion & Apparel", href: "/for/fashion-apparel" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSection(null);
  }, [pathname]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <header className="global-nav" role="banner">
        <div className="global-nav__inner">
          {/* Left: Brand */}
          <Link href="/" className="global-nav__logo" aria-label="Cinova — home">
            cinova<span className="global-nav__dot">.</span>
          </Link>

          {/* Center: Desktop Links */}
          <nav className="global-nav__links" aria-label="Primary navigation">
            <Link href="/" className="global-nav__link">Home</Link>
            <Link href="/work/erminio-palamino" className="global-nav__link">Work</Link>
            <Link href="/solutions/paid-growth" className="global-nav__link">Pricing</Link>

            {/* Industries with Hover Submenu */}
            <div className="global-nav__item-with-dropdown">
              <span
                className="global-nav__link"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Industries
              </span>
              <div className="global-nav__dropdown">
                <ul className="global-nav__dropdown-list">
                  {INDUSTRIES.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="global-nav__dropdown-link">
                        <span className="global-nav__dropdown-label">{item.label}</span>
                        <span className="global-nav__dropdown-arrow" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solutions with Hover Submenu */}
            <div className="global-nav__item-with-dropdown">
              <span
                className="global-nav__link"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Solutions
              </span>
              <div className="global-nav__dropdown">
                <ul className="global-nav__dropdown-list">
                  {SOLUTIONS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="global-nav__dropdown-link">
                        <span className="global-nav__dropdown-label">{item.label}</span>
                        <span className="global-nav__dropdown-arrow" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Right: Contact & Mobile Toggle */}
          <div className="global-nav__right">
            <Link href="/#contact" className="global-nav__contact" id="nav-contact-cta">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Contact
            </Link>
            <button
              className="global-nav__mobile-toggle"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className={`global-nav__hamburger ${mobileMenuOpen ? "global-nav__hamburger--open" : ""}`}>
                <span className="global-nav__hamburger-line"></span>
                <span className="global-nav__hamburger-line"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? "mobile-nav--open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav__content">
          <Link href="/" className="mobile-nav__link">Home</Link>
          <Link href="/work/erminio-palamino" className="mobile-nav__link">Work</Link>
          <Link href="/solutions/paid-growth" className="mobile-nav__link">Pricing</Link>

          <div className="mobile-nav__section">
            <button
              className="mobile-nav__section-toggle"
              onClick={() => toggleSection("industries")}
              aria-expanded={expandedSection === "industries"}
            >
              Industries <span className="mobile-nav__section-icon">{expandedSection === "industries" ? "−" : "+"}</span>
            </button>
            <div className={`mobile-nav__section-content ${expandedSection === "industries" ? "mobile-nav__section-content--open" : ""}`}>
              {INDUSTRIES.map((item) => (
                <Link key={item.href} href={item.href} className="mobile-nav__sublink">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mobile-nav__section">
            <button
              className="mobile-nav__section-toggle"
              onClick={() => toggleSection("solutions")}
              aria-expanded={expandedSection === "solutions"}
            >
              Solutions <span className="mobile-nav__section-icon">{expandedSection === "solutions" ? "−" : "+"}</span>
            </button>
            <div className={`mobile-nav__section-content ${expandedSection === "solutions" ? "mobile-nav__section-content--open" : ""}`}>
              {SOLUTIONS.map((item) => (
                <Link key={item.href} href={item.href} className="mobile-nav__sublink">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
