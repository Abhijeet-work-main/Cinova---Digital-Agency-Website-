import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import SharedPageClosing from "../components/SharedPageClosing";

export default function NotFound() {
  return (
    <div className="nf-root">
      <Header />

      <main className="nf-main">
        <div className="nf-container">
          <span className="nf-badge">Error 404</span>

          <h1 className="nf-code">404</h1>

          <h2 className="nf-headline">Lost in the digital void.</h2>

          <p className="nf-sub">
            The page or case study you were looking for doesn&apos;t exist, has been relocated, or is temporarily unavailable. Let&apos;s guide you back to where real growth happens.
          </p>

          <div className="nf-actions">
            <Link href="/" className="nf-btn-primary">
              Return to Home
            </Link>
            <Link href="/work" className="nf-btn-secondary">
              Explore Our Work →
            </Link>
          </div>

          <div className="nf-links-panel">
            <span className="nf-links-title">Quick Destinations:</span>
            <div className="nf-links-grid">
              <Link href="/pricing" className="nf-link-item">
                <span className="nf-link-label">Engagement Models</span>
                <span className="nf-link-arrow">↗</span>
              </Link>
              <Link href="/work/erminio-palamino" className="nf-link-item">
                <span className="nf-link-label">Erminio Palamino Case Study</span>
                <span className="nf-link-arrow">↗</span>
              </Link>
              <Link href="/for/ecommerce" className="nf-link-item">
                <span className="nf-link-label">Cinova for E-Commerce</span>
                <span className="nf-link-arrow">↗</span>
              </Link>
              <Link href="/solutions/websites" className="nf-link-item">
                <span className="nf-link-label">Conversion Websites</span>
                <span className="nf-link-arrow">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SharedPageClosing />

      <style>{`
        .nf-root {
          background-color: var(--bg-primary, #060606);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .nf-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 11rem 2rem 7rem;
          position: relative;
          overflow: hidden;
        }

        .nf-main::before {
          content: "";
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(182, 245, 0, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .nf-container {
          max-width: 760px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .nf-badge {
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
          margin-bottom: 1.5rem;
        }

        .nf-code {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(6rem, 15vw, 11rem);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: rgba(255, 255, 255, 0.15);
          margin: 0 0 1rem;
          user-select: none;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.03) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nf-headline {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(2rem, 4vw, 3rem);
          color: #fff;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0 0 1.25rem;
        }

        .nf-sub {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 2.5rem;
        }

        .nf-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .nf-btn-primary {
          background: var(--accent-primary, #b6f500);
          color: #000;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.85rem 1.8rem;
          border-radius: 50px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .nf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(182, 245, 0, 0.25);
        }

        .nf-btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.85rem 1.8rem;
          border-radius: 50px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }

        .nf-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }

        .nf-links-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          text-align: left;
        }

        .nf-links-title {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 1rem;
        }

        .nf-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem 1.5rem;
        }

        @media (max-width: 600px) {
          .nf-links-grid {
            grid-template-columns: 1fr;
          }
        }

        .nf-link-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s, transform 0.2s;
        }

        .nf-link-item:hover {
          color: var(--accent-primary, #b6f500);
          transform: translateX(4px);
        }

        .nf-link-arrow {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .nf-link-item:hover .nf-link-arrow {
          color: var(--accent-primary, #b6f500);
        }
      `}</style>
    </div>
  );
}
