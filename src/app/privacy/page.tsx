import React from "react";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cinova protects and manages client information, consultation inquiries, and website visitor privacy.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Cinova",
    description:
      "How Cinova protects and manages client information, consultation inquiries, and website visitor privacy.",
    url: "/privacy",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Cinova",
    description: "How Cinova manages client and visitor privacy.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="legal-root">
      <Header />

      <main className="legal-main">
        <div className="legal-container">
          <header className="legal-header">
            <span className="legal-badge">Legal</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-subtitle">
              Last updated: October 2026. This policy outlines how Cinova handles and safeguards information gathered through our website and client consultations.
            </p>
          </header>

          <article className="legal-content">
            <section className="legal-section">
              <h2>1. Commitment to Client Confidentiality</h2>
              <p>
                At Cinova (&ldquo;Cinova,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), privacy and commercial discretion are foundational to how we operate. We work with discerning brands, founders, and creators. We do not sell, rent, or monetize your personal or commercial data to third-party brokers.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information We Collect</h2>
              <p>We only collect information necessary to deliver strategic clarity and execute client engagements:</p>
              <ul>
                <li>
                  <strong>Consultation &amp; Contact Inquiries:</strong> When you complete our contact forms, request a growth diagnostic, or schedule a discovery session, we collect your name, email address, phone/WhatsApp number, company name, brand website, and any project notes you provide.
                </li>
                <li>
                  <strong>Direct Communications:</strong> Any correspondence sent via email (hello@getcinova.com) or direct messaging channels.
                </li>
                <li>
                  <strong>Technical &amp; Usage Data:</strong> Standard server logs and privacy-centric telemetry such as browser type, referral source, pages viewed, and device parameters to ensure fast page loads and responsiveness.
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the data we collect solely for the following business purposes:</p>
              <ul>
                <li>To evaluate and respond to inbound inquiries, project briefs, and growth diagnosis requests.</li>
                <li>To schedule and conduct strategy consultations via Google Meet, WhatsApp, or phone.</li>
                <li>To formulate tailored project scopes, deliverables, and service proposals.</li>
                <li>To fulfill our contractual deliverables and maintain continuous client support.</li>
                <li>To maintain the security, uptime, and integrity of our digital platforms.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Client Work, Metrics &amp; Commercial Secrets</h2>
              <p>
                In line with our strict factual integrity policy, we never invent or misrepresent client numbers. Any case study data, creative assets, or performance metrics published on this website are shown solely with explicit client consent or anonymized to protect competitive trade secrets. We treat all client roadmaps, revenue numbers, and marketing funnels as strictly confidential.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Third-Party Service Providers</h2>
              <p>
                We use vetted technical infrastructure providers to host and operate our services:
              </p>
              <ul>
                <li><strong>Netlify:</strong> Form processing, SSL encryption, and high-performance edge hosting.</li>
                <li><strong>Google Calendar:</strong> Direct appointment scheduling and calendar invite generation.</li>
                <li><strong>WhatsApp / Meta:</strong> Direct real-time messaging when initiated by you.</li>
              </ul>
              <p>These providers adhere to rigorous enterprise-grade security standards and process data only in accordance with our instructions.</p>
            </section>

            <section className="legal-section">
              <h2>6. Data Retention &amp; Security</h2>
              <p>
                We retain project inquiry data only for as long as needed to fulfill communication or contractual needs. We apply HTTPS encryption, restricted internal access, and modern web application security practices to protect your information against unauthorized access, loss, or disclosure.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Your Rights</h2>
              <p>
                You have the right to request access to the personal information we hold about you, request corrections, or ask for complete deletion of your records from our consultation intake database. To exercise these rights, please email us directly.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Contact Our Team</h2>
              <p>
                If you have questions regarding this Privacy Policy or our data management practices, please contact us:
              </p>
              <div className="legal-contact-card">
                <p><strong>Cinova Digital Agency</strong></p>
                <p>Email: <a href="mailto:hello@getcinova.com">hello@getcinova.com</a></p>
                <p>Phone / WhatsApp: <a href="tel:+917428245045">+91 7428245045</a></p>
                <p>Direct Inquiries: Strategy, Creative Direction &amp; Digital Infrastructure</p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <SharedPageClosing />

      <style>{`
        .legal-root {
          background-color: var(--bg-primary, #060606);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .legal-main {
          flex: 1;
          padding: 11rem 2rem 7rem;
        }

        .legal-container {
          max-width: 820px;
          margin: 0 auto;
        }

        .legal-header {
          margin-bottom: 4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 2.5rem;
        }

        .legal-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-primary, #b6f500);
          background: rgba(182, 245, 0, 0.1);
          border: 1px solid rgba(182, 245, 0, 0.25);
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }

        .legal-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 1rem;
        }

        .legal-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          margin: 0;
        }

        .legal-content {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.02rem;
          line-height: 1.8;
        }

        .legal-section {
          margin-bottom: 3rem;
        }

        .legal-section h2 {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 400;
          color: #fff;
          letter-spacing: -0.01em;
          margin: 0 0 1rem;
          padding-top: 0.5rem;
        }

        .legal-section p {
          margin: 0 0 1rem;
        }

        .legal-section ul {
          margin: 0.5rem 0 1.25rem 1.25rem;
          padding: 0;
        }

        .legal-section li {
          margin-bottom: 0.65rem;
          line-height: 1.7;
        }

        .legal-section strong {
          color: #fff;
        }

        .legal-contact-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1.25rem;
        }

        .legal-contact-card p {
          margin: 0.35rem 0;
          font-size: 0.95rem;
        }

        .legal-contact-card a {
          color: var(--accent-primary, #b6f500);
          text-decoration: none;
        }

        .legal-contact-card a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
