"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "../data/siteConfig";

export default function ThankYouClient() {
  const searchParams = useSearchParams();

  // Untrusted param handling
  const rawUid = searchParams.get("uid") || "";
  const isValidUid = /^[A-Za-z0-9_-]{8,64}$/.test(rawUid);
  const uid = isValidUid ? rawUid : null;

  const rawStartTime = searchParams.get("startTime") || "";
  let validStartDate: Date | null = null;
  if (rawStartTime) {
    const parsed = new Date(rawStartTime);
    const now = new Date();
    const maxFuture = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const minPast = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (!isNaN(parsed.getTime()) && parsed >= minPast && parsed <= maxFuture) {
      validStartDate = parsed;
    }
  }

  // TODO: [Meta Pixel Integration]
  // Fire standard Meta Pixel "Schedule" event on booking confirmation load:
  // useEffect(() => {
  //   if (typeof window !== "undefined" && (window as any).fbq) {
  //     (window as any).fbq("track", "Schedule", {
  //       content_name: "Free Strategy Call",
  //       currency: "USD",
  //       value: 0.0,
  //     });
  //   }
  // }, []);

  // Format date in visitor's own timezone
  let localTimeStr = "";
  let istTimeStr = "";
  if (validStartDate) {
    try {
      const localFormatter = new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
      localTimeStr = localFormatter.format(validStartDate);
    } catch {
      localTimeStr = validStartDate.toLocaleString();
    }

    try {
      const istFormatter = new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
        timeZoneName: "short",
      });
      istTimeStr = istFormatter.format(validStartDate);
    } catch {
      istTimeStr = "";
    }
  }

  // Google Calendar URL
  let gcalUrl = "";
  if (validStartDate) {
    const toUtcStr = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const endDate = new Date(validStartDate.getTime() + 30 * 60 * 1000);
    const dates = `${toUtcStr(validStartDate)}/${toUtcStr(endDate)}`;
    const text = encodeURIComponent("Free Strategy Call with Cinova");
    const details = encodeURIComponent(
      `Free 30-minute growth strategy diagnostic session with Cinova.\nJoin link: ${
        uid ? `https://cal.com/booking/${uid}` : "Check your confirmation email"
      }`
    );
    gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
  }

  // ICS File Download fallback
  const handleDownloadIcs = () => {
    if (!validStartDate) return;
    const endDate = new Date(validStartDate.getTime() + 30 * 60 * 1000);
    const toUtcStr = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Cinova//Strategy Call//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid || `cinova-${Date.now()}`}@cinova.agency`,
      `DTSTAMP:${toUtcStr(new Date())}`,
      `DTSTART:${toUtcStr(validStartDate)}`,
      `DTEND:${toUtcStr(endDate)}`,
      "SUMMARY:Free Strategy Call with Cinova",
      `DESCRIPTION:Free 30-minute growth strategy diagnostic session with Cinova.\\nJoin link: ${
        uid ? `https://cal.com/booking/${uid}` : "Check confirmation email"
      }`,
      `URL:${uid ? `https://cal.com/booking/${uid}` : "https://cinova.agency"}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cinova-strategy-call.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Cinova%2C%20I%20just%20booked%20a%20strategy%20call`;

  return (
    <div className="ty-container">
      {/* Top Badge & Heading */}
      <div className="ty-header">
        <div className="ty-icon-circle" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="ty-title">You&apos;re booked</h1>
        <p className="ty-subtitle">
          {validStartDate
            ? "We're looking forward to speaking with you. Here are the details of your strategy session."
            : "Check your email for your confirmation and calendar invitation from Cal.com."}
        </p>
      </div>

      {/* Date & Time Card (Hidden if no valid startTime) */}
      {validStartDate && (
        <div className="ty-card glass-panel" aria-label="Booked session time">
          <div className="ty-card__top">
            <span className="ty-card__tag">Confirmed Session</span>
            <span className="ty-card__duration">30 minutes</span>
          </div>

          <div className="ty-time-info">
            <div className="ty-time-row">
              <span className="ty-time-label">Your Local Time</span>
              <span className="ty-time-val">{localTimeStr}</span>
            </div>

            {istTimeStr && (
              <div className="ty-time-row ty-time-row--sub">
                <span className="ty-time-label">Cinova Team Time (IST)</span>
                <span className="ty-time-val">{istTimeStr}</span>
              </div>
            )}
          </div>

          {/* Calendar Actions */}
          <div className="ty-cal-actions">
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ty-btn ty-btn--ghost"
              aria-label="Add to Google Calendar"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Add to Google Calendar
            </a>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="ty-btn ty-btn--ghost"
              aria-label="Download ICS calendar file"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download .ics
            </button>
          </div>
        </div>
      )}

      {/* Primary Action Button (Only if valid UID) */}
      {uid && (
        <div className="ty-primary-action-wrap">
          <a
            href={`https://cal.com/booking/${uid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ty-btn ty-btn--primary"
            aria-label="Open booking and join link on Cal.com"
          >
            <span>Open booking and join link</span>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="ty-join-note">
            Your Google Meet link is also in the confirmation email from Cal.com.
          </p>
        </div>
      )}

      {/* WhatsApp Immediate Line */}
      <div className="ty-whatsapp-wrap">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ty-whatsapp-btn"
          aria-label="Message Cinova on WhatsApp"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>Need to share something beforehand? Message us on WhatsApp</span>
        </a>
      </div>

      {/* How to prepare checklist */}
      <div className="ty-prepare-section glass-panel">
        <h2 className="ty-prepare-heading">How to prepare for maximum impact</h2>
        <p className="ty-prepare-sub">Three quick things to note before we jump on the call:</p>

        <ul className="ty-prepare-list">
          <li className="ty-prepare-item">
            <span className="ty-prepare-item__num" aria-hidden="true">1</span>
            <div className="ty-prepare-item__text">
              <strong className="ty-prepare-item__title">Share your website or ad account access</strong>
              <p className="ty-prepare-item__desc">
                Drop your store or landing page link in advance, or prepare viewer access so we can inspect actual metrics rather than generic hypotheticals.
              </p>
            </div>
          </li>

          <li className="ty-prepare-item">
            <span className="ty-prepare-item__num" aria-hidden="true">2</span>
            <div className="ty-prepare-item__text">
              <strong className="ty-prepare-item__title">List your top 3 growth goals</strong>
              <p className="ty-prepare-item__desc">
                Identify your primary bottlenecks (e.g. low ROAS, weak landing page conversion, creator coordination) and what milestone matters most over the next 90 days.
              </p>
            </div>
          </li>

          <li className="ty-prepare-item">
            <span className="ty-prepare-item__num" aria-hidden="true">3</span>
            <div className="ty-prepare-item__text">
              <strong className="ty-prepare-item__title">Note your monthly growth budget</strong>
              <p className="ty-prepare-item__desc">
                Have a clear sense of your allocated paid media and production budget so we can recommend the most mathematically viable execution roadmap.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Secondary Links */}
      <div className="ty-links-row">
        <Link href="/work" className="ty-sec-link">
          <span>Explore our case studies</span>
          <span aria-hidden="true">→</span>
        </Link>
        <span className="ty-sec-divider" aria-hidden="true">·</span>
        <Link href="/" className="ty-sec-link">
          <span>Return to Cinova homepage</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <style>{`
        .ty-container {
          max-width: 820px;
          margin: 0 auto;
          padding: 8rem 1.5rem 6rem;
        }

        .ty-header {
          text-align: center;
          margin-bottom: 2.75rem;
        }

        .ty-icon-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(182, 245, 0, 0.12);
          color: var(--accent-primary);
          border: 1px solid rgba(182, 245, 0, 0.3);
          margin-bottom: 1.5rem;
        }

        .ty-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 700;
          color: #FAFAFA;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .ty-subtitle {
          font-family: var(--font-primary);
          font-size: 1.05rem;
          color: #A3A3A3;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── CARD ────────────────────────────────────────── */
        .ty-card {
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 2rem 2.25rem;
          margin-bottom: 2rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .ty-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1rem;
        }

        .ty-card__tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-primary);
        }

        .ty-card__duration {
          font-size: 0.85rem;
          font-weight: 600;
          color: #E5E5E5;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.75rem;
          border-radius: 50px;
        }

        .ty-time-info {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
        }

        .ty-time-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ty-time-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #737373;
        }

        .ty-time-val {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          color: #FAFAFA;
        }

        .ty-time-row--sub .ty-time-val {
          font-size: 1.05rem;
          color: #CCCCCC;
        }

        .ty-cal-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* ── BUTTONS ─────────────────────────────────────── */
        .ty-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          font-family: var(--font-primary);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 100px;
          padding: 0.75rem 1.4rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          border: none;
        }

        .ty-btn--primary {
          background: var(--accent-primary);
          color: #0A0A0A;
          font-size: 1rem;
          padding: 0.95rem 2.2rem;
        }

        .ty-btn--primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(182, 245, 0, 0.25);
        }

        .ty-btn--ghost {
          background: rgba(255, 255, 255, 0.05);
          color: #FAFAFA;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ty-btn--ghost:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .ty-primary-action-wrap {
          text-align: center;
          margin-bottom: 2rem;
        }

        .ty-join-note {
          font-size: 0.85rem;
          color: #888888;
          margin-top: 0.85rem;
        }

        /* ── WHATSAPP ────────────────────────────────────── */
        .ty-whatsapp-wrap {
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .ty-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.8rem 1.4rem;
          background: rgba(37, 211, 102, 0.08);
          border: 1px solid rgba(37, 211, 102, 0.25);
          color: #25D366;
          border-radius: 100px;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .ty-whatsapp-btn:hover {
          background: rgba(37, 211, 102, 0.15);
          border-color: rgba(37, 211, 102, 0.4);
        }

        /* ── PREPARE CHECKLIST ───────────────────────────── */
        .ty-prepare-section {
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 2.5rem 2.25rem;
          margin-bottom: 2.5rem;
        }

        .ty-prepare-heading {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 600;
          color: #FAFAFA;
          margin-bottom: 0.4rem;
        }

        .ty-prepare-sub {
          font-size: 0.92rem;
          color: #888888;
          margin-bottom: 1.75rem;
        }

        .ty-prepare-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .ty-prepare-item {
          display: flex;
          align-items: flex-start;
          gap: 1.1rem;
        }

        .ty-prepare-item__num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(182, 245, 0, 0.12);
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.82rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .ty-prepare-item__title {
          display: block;
          font-size: 0.98rem;
          color: #FAFAFA;
          margin-bottom: 0.25rem;
        }

        .ty-prepare-item__desc {
          font-size: 0.88rem;
          color: #999999;
          line-height: 1.55;
          margin: 0;
        }

        /* ── SECONDARY LINKS ─────────────────────────────── */
        .ty-links-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .ty-sec-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #A3A3A3;
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .ty-sec-link:hover {
          color: var(--accent-primary);
        }

        .ty-sec-divider {
          color: #555555;
        }

        @media (max-width: 600px) {
          .ty-card,
          .ty-prepare-section {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
