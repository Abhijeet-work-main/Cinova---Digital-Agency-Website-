import React from "react";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Engagement terms, project scope guidelines, intellectual property ownership, and service agreements for Cinova Digital Agency.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms and Conditions | Cinova",
    description:
      "Engagement terms, project scope guidelines, intellectual property ownership, and service agreements for Cinova Digital Agency.",
    url: "/terms",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Cinova",
    description: "Engagement terms and service agreements for Cinova clients.",
  },
};

export default function TermsPage() {
  return (
    <div className="legal-root">
      <Header />

      <main className="legal-main">
        <div className="legal-container">
          <header className="legal-header">
            <span className="legal-badge">Legal</span>
            <h1 className="legal-title">Terms &amp; Conditions</h1>
            <p className="legal-subtitle">
              Last updated: October 2026. These terms govern all strategic consulting, creative production, web development, and digital marketing engagements with Cinova.
            </p>
          </header>

          <article className="legal-content">
            <section className="legal-section">
              <h2>1. Engagement &amp; Services</h2>
              <p>
                Cinova delivers integrated digital growth services across brand identity, creative production, web architecture, paid acquisition, and organic social distribution. Specific project deliverables, production schedules, and compensation terms are outlined in individual Statements of Work (SOW) or designated monthly partnership models.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Client Cooperation &amp; Assets</h2>
              <p>
                High-leverage growth requires connected alignment. The client agrees to provide timely access to existing brand assets, product samples for shoots, advertising accounts, and feedback on deliverables within agreed review windows. Delays in asset provision or milestone feedback directly adjust project delivery timelines.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Intellectual Property Ownership</h2>
              <ul>
                <li>
                  <strong>Client Deliverables:</strong> Upon receipt of full payment, all completed and accepted deliverables created specifically for the client (including final logos, lookbooks, edited videos, custom website source code, and advertising copy) become the intellectual property of the client.
                </li>
                <li>
                  <strong>Pre-existing Works &amp; Tooling:</strong> Cinova retains all rights to proprietary frameworks, diagnostic templates, code libraries, and generic workflows developed prior to or independently of the project.
                </li>
                <li>
                  <strong>Portfolio &amp; Showcase Rights:</strong> Unless explicitly restricted by an active Non-Disclosure Agreement (NDA), Cinova reserves the right to showcase approved work, campaign visual assets, and verified outcomes in our portfolio, case studies, and industry presentations.
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Payment Terms &amp; Invoicing</h2>
              <p>
                Monthly partnership models (Starter, Growth, Full-Stack) are billed in advance on a recurring monthly schedule. Custom production milestones are invoiced based on agreed project phases (e.g., 50% deposit upon kickoff, balance upon completion). Invoices are payable within 7 business days unless specified otherwise in writing.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Revisions &amp; Scope Adjustments</h2>
              <p>
                Each deliverable includes specified rounds of structured revisions as defined in the scope agreement. Additional requests outside the original scope or substantial changes to approved directions will be evaluated as scope extensions and quoted separately before execution.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Factual Results &amp; Performance Transparency</h2>
              <p>
                Cinova operates with rigorous commercial honesty. We do not guarantee arbitrary or fabricated metrics (such as fixed follower numbers or unrealistic ROAS multiples), as commercial results depend on market demand, supply chain fulfillment, and platform algorithmic shifts. We guarantee rigorous execution, high-retention creative, and transparent reporting.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Confidentiality</h2>
              <p>
                Both parties agree to protect and treat as strictly confidential all proprietary business information, financial data, unreleased creative assets, product formulas, and client strategies exchanged during the course of the partnership.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, neither party shall be liable for indirect, incidental, special, consequential, or punitive damages. Cinova&apos;s total aggregate liability arising from any engagement shall not exceed the total fees paid by the client under the applicable Statement of Work in the preceding three-month period.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Inquiries &amp; Legal Notices</h2>
              <p>
                For questions regarding these Terms &amp; Conditions or to request a customized enterprise Statement of Work, please reach out to our management team:
              </p>
              <div className="legal-contact-card">
                <p><strong>Cinova Digital Agency</strong></p>
                <p>Email: <a href="mailto:hello@getcinova.com">hello@getcinova.com</a></p>
                <p>Direct Inquiries: <a href="tel:+917428245045">+91 7428245045</a></p>
                <p>Managing Director: Abhijeet Mishra</p>
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
