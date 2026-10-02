"use client";

import React, { useEffect, useRef, useState } from "react";

const SOCIALS = [
  { label: "X (Twitter)", href: "https://twitter.com/cinovadigital" },
  { label: "LinkedIn", href: "https://linkedin.com/company/cinova" },
  { label: "Instagram", href: "https://instagram.com/cinova.in" },
  { label: "WhatsApp", href: "https://wa.me/919999999999" },
];

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Escape key + body lock */
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement;
    setTimeout(() => nameRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="cm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Cinova"
      onClick={handleOverlayClick}
    >
      <div className="cm-panel">

        {/* ── Close ──────────────────────────────── */}
        <button className="cm-close" onClick={onClose} aria-label="Close contact form">
          <span className="cm-close__line" />
          <span className="cm-close__line" />
        </button>

        {!submitted ? (
          <form className="cm-form" onSubmit={handleSubmit} noValidate>

            {/* ── Headline block ──────────────────── */}
            <div className="cm-head">
              <h2 className="cm-headline">LET&apos;S CONNECT</h2>
              <div className="cm-head__rule" />
              <p className="cm-subline">
                Outline your project and what you have in mind. We&apos;ll review it and get in touch to talk it through.
              </p>
            </div>

            {/* ── Body: two columns ───────────────── */}
            <div className="cm-body">

              {/* LEFT */}
              <div className="cm-col cm-col--left">
                <div className="cm-field">
                  <input
                    ref={nameRef}
                    id="cm-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="cm-input"
                    autoComplete="name"
                  />
                </div>

                <div className="cm-field">
                  <input
                    id="cm-email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="cm-input"
                    autoComplete="email"
                  />
                </div>



                {/* Social links — separated by gap */}
                <div className="cm-socials">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cm-social"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="cm-col cm-col--right">
                <div className="cm-field cm-field--message">
                  <textarea
                    id="cm-message"
                    name="message"
                    placeholder="Your message"
                    value={formState.message}
                    onChange={handleChange}
                    className="cm-textarea"
                  />
                </div>

                {/* Submit row */}
                <div className="cm-submit-row">
                  <button type="submit" className="cm-submit">
                    <span className="cm-submit__label">Submit</span>
                    <span className="cm-submit__arrow" aria-hidden="true">→</span>
                  </button>
                </div>

                {/* Trust note */}
                <p className="cm-trust">
                  We work with a focused number of clients at a time.<br />
                  If it&apos;s a fit, we&apos;ll come back with clear next steps.
                </p>

                {/* Human touch — person card */}
                <div className="cm-person">
                  <div className="cm-person__avatar" aria-hidden="true">
                    <span className="cm-person__initials">AB</span>
                  </div>
                  <div className="cm-person__text">
                    <span className="cm-person__name">Abhijeet</span>
                    <span className="cm-person__role">Growth Strategist</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* ── Success state ──────────────────────── */
          <div className="cm-success">
            <div className="cm-success__icon" aria-hidden="true">✓</div>
            <h2 className="cm-success__title">Message received.</h2>
            <p className="cm-success__body">
              We review every enquiry personally. If it&apos;s a strong fit,
              you&apos;ll hear back within 1–2 business days.
            </p>
            <button className="cm-success__close" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════
           OVERLAY
        ═══════════════════════════════════════════════════════ */
        .cm-overlay {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: cm-fade 0.22s ease;
        }
        @keyframes cm-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ═══════════════════════════════════════════════════════
           PANEL — fits inside viewport with no scroll
        ═══════════════════════════════════════════════════════ */
        .cm-panel {
          position: relative;
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 1060px;
          padding: 3rem 3.5rem 2.75rem;
          box-shadow: 0 24px 80px rgba(0,0,0,0.3);
          animation: cm-up 0.3s cubic-bezier(0.16,1,0.3,1);
          max-height: 92vh;
          overflow: hidden;
        }
        @keyframes cm-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ═══════════════════════════════════════════════════════
           CLOSE BUTTON
        ═══════════════════════════════════════════════════════ */
        .cm-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1.5px solid rgba(0,0,0,0.18);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .cm-close:hover { border-color: rgba(0,0,0,0.5); background: rgba(0,0,0,0.04); }
        .cm-close__line {
          display: block;
          width: 14px;
          height: 1.5px;
          background: #0a0a0a;
          transform-origin: center;
        }
        .cm-close__line:first-child { transform: rotate(45deg) translate(3.5px, 3.5px); }
        .cm-close__line:last-child  { transform: rotate(-45deg) translate(3.5px, -3.5px); }

        /* ═══════════════════════════════════════════════════════
           HEADLINE BLOCK
        ═══════════════════════════════════════════════════════ */
        .cm-head {
          margin-bottom: 1rem;
        }
        /* Reference: Ultra-heavy, condensed, all-caps, full width */
        .cm-headline {
          font-family: 'Inter', 'Arial Black', system-ui, sans-serif;
          font-size: clamp(3.2rem, 8.5vw, 6.8rem);
          font-weight: 900;
          color: #0a0a0a;
          line-height: 0.95;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin: 0 0 0.7rem;
          /* Fill horizontal space */
          white-space: nowrap;
        }
        .cm-head__rule {
          height: 1px;
          background: rgba(0,0,0,0.1);
          margin-bottom: 0.65rem;
        }
        .cm-subline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(0,0,0,0.5);
          margin: 0;
          line-height: 1.5;
        }

        /* ═══════════════════════════════════════════════════════
           BODY — two equal columns
        ═══════════════════════════════════════════════════════ */
        .cm-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 3.5rem;
          margin-top: 0.75rem;
        }

        /* ═══════════════════════════════════════════════════════
           COLUMNS
        ═══════════════════════════════════════════════════════ */
        .cm-col { display: flex; flex-direction: column; }

        /* ── FIELDS ───────────────────────────── */
        .cm-field {
          border-bottom: 2px solid rgba(0,0,0,0.15);
        }
        .cm-field--last {
          border-bottom: 2px solid rgba(0,0,0,0.15);
        }
        .cm-field--message {
          flex: 1;
          border-bottom: 2px solid rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
        }

        .cm-input,
        .cm-select,
        .cm-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #0a0a0a;
          padding: 1.1rem 0;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1.4;
        }
        .cm-input::placeholder,
        .cm-textarea::placeholder { 
          color: #0a0a0a;
          font-weight: 500;
        }
        .cm-select { cursor: pointer; }
        .cm-select--ph { color: rgba(0,0,0,0.4); }
        .cm-select option { color: #0a0a0a; background: #fff; }

        .cm-textarea {
          resize: none;
          flex: 1;
          min-height: 140px;
          display: block;
          padding-top: 0.9rem;
        }

        /* ── SOCIALS — separated visually from fields ─ */
        .cm-socials {
          display: flex;
          flex-direction: column;
          margin-top: 5.5rem;
          flex: 1;
        }
        .cm-social {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.45);
          text-decoration: none;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.18s ease, padding-left 0.2s ease;
        }
        .cm-social:first-child { border-top: 1px solid rgba(0,0,0,0.1); }
        .cm-social::after {
          content: '↗';
          font-size: 0.7rem;
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .cm-social:hover {
          color: #0a0a0a;
          padding-left: 0.35rem;
        }
        .cm-social:hover::after { opacity: 1; }

        /* ── SUBMIT ROW ───────────────────────── */
        .cm-submit-row {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          margin-top: 2rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .cm-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .cm-submit__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #0a0a0a;
          letter-spacing: -0.01em;
          line-height: 1;
          transition: color 0.18s ease;
        }
        .cm-submit:hover .cm-submit__label { color: #333; }
        .cm-submit__arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #0a0a0a;
          font-size: 1rem;
          /* Arrow slides right on hover via CSS group */
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.2s;
        }
        .cm-submit:hover .cm-submit__arrow {
          transform: translateX(6px);
          background: #c8f500;
        }

        /* ── TRUST NOTE ───────────────────────── */
        .cm-trust {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          color: rgba(0,0,0,0.55);
          line-height: 1.6;
          margin: 0.75rem 0 0;
        }

        /* ── PERSON CARD (Human Touch) ────────── */
        .cm-person {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        .cm-person__avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #e8e8e6;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.08);
        }
        .cm-person__initials {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #0a0a0a;
          letter-spacing: 0.02em;
        }
        .cm-person__text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .cm-person__name {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.2;
        }
        .cm-person__role {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: rgba(0,0,0,0.45);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ═══════════════════════════════════════════════════════
           SUCCESS STATE
        ═══════════════════════════════════════════════════════ */
        .cm-success {
          text-align: center;
          padding: 3.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .cm-success__icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--accent-primary);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; color: #0a0a0a;
        }
        .cm-success__title {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          color: #0a0a0a;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .cm-success__body {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          color: rgba(0,0,0,0.5);
          max-width: 420px;
          line-height: 1.6;
          margin: 0;
        }
        .cm-success__close {
          background: #0a0a0a; color: #fff;
          border: none; border-radius: 50px;
          padding: 0.75rem 2.25rem;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cm-success__close:hover { background: #333; }

        /* ═══════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════ */
        @media (max-width: 820px) {
          .cm-panel { padding: 2.25rem 2.25rem 2rem; max-height: 94vh; border-radius: 14px; }
          .cm-headline { font-size: clamp(2.8rem, 11vw, 5rem); white-space: normal; }
          .cm-body { grid-template-columns: 1fr; gap: 1.5rem; }
          .cm-col--right { order: -1; }
          .cm-textarea { min-height: 90px; }
        }

        @media (max-width: 480px) {
          .cm-panel { padding: 1.5rem 1.25rem; border-radius: 12px; }
          .cm-overlay { padding: 0.75rem; align-items: flex-end; }
          .cm-panel { border-radius: 18px 18px 12px 12px; }
          .cm-headline { font-size: clamp(2.4rem, 13vw, 4rem); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cm-overlay, .cm-panel { animation: none !important; }
          .cm-submit__arrow, .cm-submit__label,
          .cm-social { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
