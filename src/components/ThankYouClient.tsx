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
    <div className="ty-page">
      {/* ── SUCCESS HEADER ───────────────────────────────── */}
      <div className="ty-header">
        <div className="ty-icon-circle" aria-hidden="true">
          <svg
            width="26"
            height="26"
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
            ? "We are looking forward to speaking with you. Here are the details of your strategy session."
            : "Check your email for your confirmation and calendar invitation from Cal.com."}
        </p>
      </div>

      {/* ── YOUR CALL CARD ───────────────────────────────── */}
      {validStartDate && (
        <div className="ty-card" aria-label="Booked session time">
          <div className="ty-card__top">
            <span className="ty-card__tag">Confirmed Session</span>
            <span className="ty-card__badge">30 min</span>
          </div>

          <div className="ty-time-block">
            <div className="ty-time-row">
              <span className="ty-time-label">Your Local Time</span>
              <span className="ty-time-val">{localTimeStr}</span>
            </div>
            {istTimeStr && (
              <div className="ty-time-row ty-time-row--sub">
                <span className="ty-time-label">Cinova Team Time (IST)</span>
                <span className="ty-time-val ty-time-val--sub">{istTimeStr}</span>
              </div>
            )}
          </div>

          <div className="ty-cal-actions">
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ty-btn ty-btn--outline"
              aria-label="Add to Google Calendar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              className="ty-btn ty-btn--outline"
              aria-label="Download ICS calendar file"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download .ics
            </button>
          </div>
        </div>
      )}

      {/* ── JOIN THE CALL CARD ───────────────────────────── */}
      <div className="ty-card" aria-label="Join the call">
        <div className="ty-card__top">
          <span className="ty-card__tag">Join the Call</span>
        </div>
        {uid ? (
          <>
            <a
              href={`https://cal.com/booking/${uid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ty-btn ty-btn--primary"
              aria-label="Open booking and join link on Cal.com"
            >
              <span>Open booking and join link</span>
              <span aria-hidden="true">&#8599;</span>
            </a>
            <p className="ty-join-note">
              Your Google Meet link is also in the confirmation email from Cal.com.
            </p>
          </>
        ) : (
          <p className="ty-join-empty">
            Your meeting link will appear in the confirmation email from Cal.com.
            Check your inbox (and spam folder) for details.
          </p>
        )}
      </div>

      {/* ── GET READY CHECKLIST ──────────────────────────── */}
      <div className="ty-card ty-card--checklist" aria-label="Preparation checklist">
        <div className="ty-card__top">
          <span className="ty-card__tag">Get Ready</span>
        </div>
        <h2 className="ty-checklist-heading">How to prepare for maximum impact</h2>
        <p className="ty-checklist-sub">Three quick things to note before we jump on the call:</p>

        <ol className="ty-checklist">
          <li className="ty-checklist-item">
            <span className="ty-checklist-num" aria-hidden="true">1</span>
            <div className="ty-checklist-text">
              <strong className="ty-checklist-title">Share your website or ad account access</strong>
              <p className="ty-checklist-desc">
                Drop your store or landing page link in advance, or prepare viewer access so we can inspect actual metrics rather than generic hypotheticals.
              </p>
            </div>
          </li>
          <li className="ty-checklist-item">
            <span className="ty-checklist-num" aria-hidden="true">2</span>
            <div className="ty-checklist-text">
              <strong className="ty-checklist-title">List your top 3 growth goals</strong>
              <p className="ty-checklist-desc">
                Identify your primary bottlenecks (e.g. low ROAS, weak landing page conversion, creator coordination) and what milestone matters most over the next 90 days.
              </p>
            </div>
          </li>
          <li className="ty-checklist-item">
            <span className="ty-checklist-num" aria-hidden="true">3</span>
            <div className="ty-checklist-text">
              <strong className="ty-checklist-title">Note your monthly growth budget</strong>
              <p className="ty-checklist-desc">
                Have a clear sense of your allocated paid media and production budget so we can recommend the most mathematically viable execution roadmap.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* ── WHATSAPP ─────────────────────────────────────── */}
      <div className="ty-whatsapp-wrap">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ty-whatsapp-btn"
          aria-label="Message Cinova on WhatsApp"
        >
          <svg
            width="17"
            height="17"
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

      {/* ── SECONDARY LINKS ──────────────────────────────── */}
      <div className="ty-links-row">
        <Link href="/work" className="ty-sec-link">
          <span>Explore our case studies</span>
          <span aria-hidden="true">&#8594;</span>
        </Link>
        <span className="ty-sec-sep" aria-hidden="true">&#183;</span>
        <Link href="/" className="ty-sec-link">
          <span>Return to Cinova homepage</span>
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>

      <style>{`
        /* ── PAGE WRAPPER ──────────────────────────────────── */
        .ty-page {
          max-width: 720px;
          margin: 0 auto;
          padding: 8rem 1.5rem 5rem;
        }

        /* ── SUCCESS HEADER ────────────────────────────────── */
        .ty-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .ty-icon-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #0a0a0a;
          margin-bottom: 1.5rem;
        }

        .ty-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 0.85rem;
        }

        .ty-subtitle {
          font-family: var(--font-body);
          font-size: 1.02rem;
          color: #3d3d38;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── CARD ─────────────────────────────────────────── */
        .ty-card {
          background: #ffffff;
          border: 1px solid #e8e8e5;
          border-radius: 18px;
          padding: 2rem 2.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04);
        }

        .ty-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0f0ec;
        }

        .ty-card__tag {
          font-family: var(--font-label);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-text);
        }

        .ty-card__badge {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-secondary);
          padding: 0.28rem 0.75rem;
          border-radius: 50px;
        }

        /* ── TIME BLOCK ────────────────────────────────────── */
        .ty-time-block {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
        }

        .ty-time-row {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .ty-time-label {
          font-family: var(--font-label);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .ty-time-val {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .ty-time-val--sub {
          font-size: 1rem;
          color: #595959;
        }

        /* ── CALENDAR ACTIONS ──────────────────────────────── */
        .ty-cal-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* ── BUTTONS ──────────────────────────────────────── */
        .ty-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 100px;
          padding: 0.7rem 1.35rem;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
          border: none;
        }

        .ty-btn--primary {
          background: var(--accent-primary);
          color: #0a0a0a;
          font-size: 0.95rem;
          padding: 0.9rem 2rem;
          margin-bottom: 0.75rem;
        }
        .ty-btn--primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(182,245,0,0.25);
        }
        .ty-btn--primary:focus-visible {
          outline: 2px solid var(--text-primary);
          outline-offset: 3px;
        }

        .ty-btn--outline {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid #dcdcd8;
          font-size: 0.85rem;
        }
        .ty-btn--outline:hover {
          background: var(--bg-secondary);
          border-color: #c8c8c4;
          transform: translateY(-1px);
        }
        .ty-btn--outline:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 3px;
        }

        .ty-join-note {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 0;
          line-height: 1.5;
        }

        .ty-join-empty {
          font-size: 0.92rem;
          color: #3d3d38;
          line-height: 1.6;
          margin: 0;
        }

        /* ── CHECKLIST ────────────────────────────────────── */
        .ty-checklist-heading {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }

        .ty-checklist-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        .ty-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .ty-checklist-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .ty-checklist-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: #0a0a0a;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.82rem;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .ty-checklist-text {
          flex: 1;
        }

        .ty-checklist-title {
          display: block;
          font-family: var(--font-display);
          font-size: 0.97rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }

        .ty-checklist-desc {
          font-size: 0.87rem;
          color: #3d3d38;
          line-height: 1.6;
          margin: 0;
        }

        /* ── WHATSAPP ─────────────────────────────────────── */
        .ty-whatsapp-wrap {
          margin-bottom: 2rem;
          text-align: center;
        }

        .ty-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.35rem;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: 0.86rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.18s ease, border-color 0.18s ease;
        }

        .ty-whatsapp-btn:hover {
          background: #dcfce7;
          border-color: #86efac;
        }

        .ty-whatsapp-btn:focus-visible {
          outline: 2px solid #15803d;
          outline-offset: 3px;
          border-radius: 100px;
        }

        /* ── SECONDARY LINKS ──────────────────────────────── */
        .ty-links-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.1rem;
          flex-wrap: wrap;
          padding-bottom: 4rem;
        }

        .ty-sec-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.87rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .ty-sec-link:hover { color: var(--text-primary); }
        .ty-sec-link:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 3px;
          border-radius: 3px;
        }

        .ty-sec-sep { color: #d0d0cc; font-size: 0.75rem; }

        /* ── RESPONSIVE ───────────────────────────────────── */
        @media (max-width: 600px) {
          .ty-card { padding: 1.6rem 1.25rem; }
          .ty-cal-actions { flex-direction: column; }
          .ty-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
