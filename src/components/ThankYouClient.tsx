"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "../data/siteConfig";

function isValidMeetUrl(url: unknown): string | null {
  if (typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (parsed.username || parsed.password) return null;

    if (parsed.hostname === "meet.google.com") {
      if (/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(parsed.pathname)) {
        return `https://meet.google.com${parsed.pathname}`;
      }
      return null;
    }

    if (parsed.hostname === "app.cal.com") {
      if (parsed.pathname.startsWith("/video/")) {
        return parsed.href;
      }
      return null;
    }
  } catch {
    // not a valid URL
  }
  return null;
}

function getTimeUntilCall(date: Date | null): string | null {
  if (!date) return null;
  const now = Date.now();
  const diffMs = date.getTime() - now;
  if (diffMs <= 0 || diffMs > 24 * 60 * 60 * 1000) return null;

  const diffMins = Math.round(diffMs / (60 * 1000));
  if (diffMins < 1) return "Starts in less than a min";
  if (diffMins < 60) return `Starts in ${diffMins} min`;
  const hours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;
  if (remainingMins === 0) {
    return `Starts in ${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `Starts in ${hours}h ${remainingMins}m`;
}

export default function ThankYouClient() {
  const searchParams = useSearchParams();

  // Untrusted param handling
  const rawUid = searchParams.get("uid") || "";
  const isValidUid = /^[A-Za-z0-9_-]{8,64}$/.test(rawUid);
  const uid = isValidUid ? rawUid : null;

  const rawMeetUrl = searchParams.get("meetingUrl") || "";
  const initialMeetUrl = isValidMeetUrl(rawMeetUrl);

  const rawStartTime = searchParams.get("startTime") || "";
  let parsedStartDate: Date | null = null;
  if (rawStartTime) {
    const parsed = new Date(rawStartTime);
    const now = new Date();
    const maxFuture = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    const minPast = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (!isNaN(parsed.getTime()) && parsed >= minPast && parsed <= maxFuture) {
      parsedStartDate = parsed;
    }
  }

  const [meetUrl, setMeetUrl] = useState<string | null>(initialMeetUrl);
  const [meetState, setMeetState] = useState<
    "loading" | "ready" | "timeout" | "cancelled" | "empty"
  >(initialMeetUrl ? "ready" : uid ? "loading" : "empty");
  const [copied, setCopied] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(parsedStartDate);

  // Poll for verified meeting details when uid is present (prefers API over URL param)
  useEffect(() => {
    if (!uid) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 15; // 15 attempts * 3s = 45s max
    let isCancelled = false;

    const poll = async (): Promise<boolean> => {
      attempts++;
      try {
        const res = await fetch(`/api/booking/${uid}`, { cache: "no-store" });
        if (!res.ok) {
          if (res.status === 404 || res.status === 400) {
            if (!isCancelled && !initialMeetUrl) setMeetState("timeout");
            return true;
          }
          if (attempts >= maxAttempts) {
            if (!isCancelled && !initialMeetUrl) setMeetState("timeout");
            return true;
          }
          return false;
        }

        const data = await res.json();
        if (isCancelled) return true;

        if (data.status === "cancelled") {
          setMeetState("cancelled");
          setMeetUrl(null);
          return true;
        }

        if (data.startTime) {
          const parsed = new Date(data.startTime);
          if (!isNaN(parsed.getTime())) {
            setSessionStartTime((prev) => prev || parsed);
          }
        }

        const validApiUrl = isValidMeetUrl(data.meetingUrl);
        if (validApiUrl) {
          // Prefer value returned by /api/booking/[uid] over param
          setMeetUrl(validApiUrl);
          setMeetState("ready");
          return true;
        }

        if (attempts >= maxAttempts) {
          if (!initialMeetUrl) {
            setMeetState("timeout");
          }
          return true;
        }

        return false;
      } catch {
        if (attempts >= maxAttempts) {
          if (!isCancelled && !initialMeetUrl) setMeetState("timeout");
          return true;
        }
        return false;
      }
    };

    let intervalId: ReturnType<typeof setInterval> | null = null;

    poll().then((finished) => {
      if (finished || isCancelled) return;
      intervalId = setInterval(async () => {
        const done = await poll();
        if (done && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 3000);
    });

    return () => {
      isCancelled = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [uid, initialMeetUrl]);

  const activeStartDate = sessionStartTime || parsedStartDate;

  // Format date in visitor's own timezone
  let localTimeStr = "";
  let istTimeStr = "";
  if (activeStartDate) {
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
      localTimeStr = localFormatter.format(activeStartDate);
    } catch {
      localTimeStr = activeStartDate.toLocaleString();
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
      istTimeStr = istFormatter.format(activeStartDate);
    } catch {
      istTimeStr = "";
    }
  }

  // Google Calendar URL
  let gcalUrl = "";
  if (activeStartDate) {
    const toUtcStr = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const endDate = new Date(activeStartDate.getTime() + 30 * 60 * 1000);
    const dates = `${toUtcStr(activeStartDate)}/${toUtcStr(endDate)}`;
    const text = encodeURIComponent("Free Strategy Call with Cinova");
    const details = encodeURIComponent(
      `Free 30-minute growth strategy diagnostic session with Cinova.\nJoin link: ${
        meetUrl || (uid ? `https://cal.com/booking/${uid}` : "Check your confirmation email")
      }`
    );
    gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
  }

  // ICS File Download fallback
  const handleDownloadIcs = () => {
    if (!activeStartDate) return;
    const endDate = new Date(activeStartDate.getTime() + 30 * 60 * 1000);
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
      `DTSTART:${toUtcStr(activeStartDate)}`,
      `DTEND:${toUtcStr(endDate)}`,
      "SUMMARY:Free Strategy Call with Cinova",
      `DESCRIPTION:Free 30-minute growth strategy diagnostic session with Cinova.\\nJoin link: ${
        meetUrl || (uid ? `https://cal.com/booking/${uid}` : "Check confirmation email")
      }`,
      `URL:${meetUrl || (uid ? `https://cal.com/booking/${uid}` : "https://cinova.agency")}`,
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

  const handleCopyLink = async () => {
    if (!meetUrl) return;
    try {
      await navigator.clipboard.writeText(meetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = meetUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Cinova%2C%20I%20just%20booked%20a%20strategy%20call`;
  const timeoutWhatsappLink = `https://wa.me/${siteConfig.whatsappNumber}?text=Hi%20Cinova%2C%20I%20am%20waiting%20for%20my%20meeting%20link${
    uid ? `%20for%20booking%20${encodeURIComponent(uid)}` : ""
  }`;
  const timeUntil = getTimeUntilCall(activeStartDate);

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
          {activeStartDate
            ? "We are looking forward to speaking with you. Here are the details of your strategy session."
            : "Check your email for your confirmation and calendar invitation."}
        </p>
      </div>

      {/* ── YOUR CALL CARD ───────────────────────────────── */}
      {activeStartDate && (
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
              <svg
                width="14"
                height="14"
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
              Add to Google Calendar
            </a>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="ty-btn ty-btn--outline"
              aria-label="Download ICS calendar file"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
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
          {timeUntil && meetState === "ready" && (
            <span className="ty-meet-countdown-pill">{timeUntil}</span>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true">
          {meetState === "ready" && meetUrl && (
            <div className="ty-meet-ready-wrap">
              <div className="ty-meet-url-row" aria-label="Meeting link">
                <a
                  href={meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ty-meet-url-text"
                  aria-label="Google Meet link"
                >
                  {meetUrl.replace(/^https?:\/\//, "")}
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="ty-meet-copy-icon-btn"
                  aria-label={copied ? "Link copied" : "Copy meeting link"}
                  title="Copy link"
                >
                  {copied ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="ty-meet-actions">
                <a
                  href={meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ty-btn ty-btn--primary ty-btn--join"
                  aria-label="Join Google Meet session in a new tab"
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
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <span>Join Google Meet</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="ty-btn ty-btn--copy"
                  aria-label="Copy Google Meet link to clipboard"
                >
                  {copied ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              </div>

              <div aria-live="polite" className="sr-only">
                {copied ? "Meeting link copied to clipboard" : ""}
              </div>

              <p className="ty-join-note">
                We also emailed your invitation and this link to you.
              </p>
            </div>
          )}

          {meetState === "loading" && (
            <div className="ty-meet-loading-wrap">
              <div className="ty-meet-loading-row">
                <span className="ty-spinner" aria-hidden="true" />
                <span className="ty-meet-loading-text">Preparing your Google Meet link...</span>
              </div>
              <p className="ty-meet-loading-sub">
                This usually takes a few seconds while Google Calendar creates the session.
              </p>
            </div>
          )}

          {meetState === "timeout" && (
            <div className="ty-meet-timeout-wrap">
              <p className="ty-meet-timeout-msg">
                We are still setting up your link. It will arrive in your confirmation email. Prefer not to wait? Message us on WhatsApp and we will send it right away.
              </p>
              <div className="ty-meet-actions">
                <a
                  href={timeoutWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ty-btn ty-btn--timeout-wa"
                  aria-label="Message Cinova on WhatsApp for your meeting link"
                >
                  <svg
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
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Message on WhatsApp</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}?subject=Meeting%20Link%20for%20Strategy%20Call`}
                  className="ty-btn ty-btn--outline"
                  aria-label={`Email ${siteConfig.email} for your meeting link`}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email us</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          )}

          {meetState === "cancelled" && (
            <div className="ty-meet-cancelled-wrap">
              <p className="ty-meet-cancelled-msg">
                This booking has been cancelled. If you would like to reschedule, you can choose a new time slot anytime.
              </p>
              <Link href="/book" className="ty-btn ty-btn--primary">
                <span>Schedule a new call</span>
                <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          )}

          {meetState === "empty" && (
            <p className="ty-join-empty">
              Your meeting link will appear in your confirmation email.
              Check your inbox (and spam folder) for details.
            </p>
          )}
        </div>

        {uid && meetState !== "cancelled" && (
          <div className="ty-meet-manage-wrap">
            <a
              href={`https://cal.com/booking/${uid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ty-meet-manage-link"
              aria-label="Need to reschedule or cancel?"
            >
              <span>Need to reschedule or cancel?</span>
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        )}
      </div>

      {/* ── GET READY CHECKLIST ──────────────────────────── */}
      <div className="ty-card ty-card--checklist" aria-label="Preparation checklist">
        <div className="ty-card__top">
          <span className="ty-card__tag">Get Ready</span>
        </div>
        <h2 className="ty-checklist-heading">How to get ready</h2>
        <p className="ty-checklist-sub">Three quick things that make the call more useful.</p>

        <ol className="ty-checklist">
          <li className="ty-checklist-item">
            <span className="ty-checklist-num" aria-hidden="true">1</span>
            <div className="ty-checklist-text">
              <strong className="ty-checklist-title">Share your website or ad account</strong>
              <p className="ty-checklist-desc">
                Send us your website or landing page link before the call. If you run ads, viewer access to your ad account lets us look at real numbers.
              </p>
            </div>
          </li>
          <li className="ty-checklist-item">
            <span className="ty-checklist-num" aria-hidden="true">2</span>
            <div className="ty-checklist-text">
              <strong className="ty-checklist-title">List your top 3 goals</strong>
              <p className="ty-checklist-desc">
                For example more leads, a lower cost per lead, or better video content. Tell us what matters most in the next 90 days.
              </p>
            </div>
          </li>
          <li className="ty-checklist-item">
            <span className="ty-checklist-num" aria-hidden="true">3</span>
            <div className="ty-checklist-text">
              <strong className="ty-checklist-title">Note your monthly budget</strong>
              <p className="ty-checklist-desc">
                A rough number for ads and production is enough, so we can suggest a realistic plan.
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
          border: 1px solid #8c8c88;
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
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #3f6212;
        }

        .ty-card__badge {
          font-size: 0.82rem;
          font-weight: 600;
          color: #0a0a0a;
          background: #f3f3f3;
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
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          color: #3d3d38;
        }

        .ty-time-val {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .ty-time-val--sub {
          font-size: 14px;
          color: #3d3d38;
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
          padding: 0.85rem 1.85rem;
        }
        .ty-btn--primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(182,245,0,0.25);
        }
        .ty-btn--primary:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 3px;
        }

        .ty-btn--primary.ty-btn--join {
          font-size: 15px;
          font-weight: 700;
          color: #0a0a0a;
        }

        .ty-btn--copy {
          background: #ffffff;
          color: #0a0a0a;
          border: 1.5px solid #0a0a0a;
          font-size: 14px;
          font-weight: 600;
          padding: 0.85rem 1.6rem;
        }
        .ty-btn--copy:hover {
          background: #f4f4f0;
          transform: translateY(-1px);
        }
        .ty-btn--copy:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 3px;
        }

        .ty-btn--timeout-wa {
          background: #f0fdf4;
          border: 1.5px solid #16a34a;
          color: #15803d;
          font-size: 14px;
          font-weight: 600;
          padding: 0.8rem 1.5rem;
        }
        .ty-btn--timeout-wa:hover {
          background: #dcfce7;
          border-color: #15803d;
          transform: translateY(-1px);
        }
        .ty-btn--timeout-wa:focus-visible {
          outline: 2px solid #15803d;
          outline-offset: 3px;
        }

        .ty-btn--outline {
          background: transparent;
          color: #0a0a0a;
          border: 1.5px solid #0a0a0a;
          font-size: 14px;
          font-weight: 600;
        }
        .ty-btn--outline:hover {
          background: var(--bg-secondary);
          border-color: #0a0a0a;
          transform: translateY(-1px);
        }
        .ty-btn--outline:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 3px;
        }

        /* ── READ-ONLY URL ROW ────────────────────────────── */
        .ty-meet-url-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          background: #f8f8f6;
          border: 1px solid #8c8c88;
          border-radius: 12px;
          padding: 0.7rem 1rem;
          margin-bottom: 1rem;
          min-width: 0;
        }

        .ty-meet-url-text {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          color: #0a0a0a;
          text-decoration: underline;
          text-decoration-color: #c4c4be;
          text-underline-offset: 3px;
          overflow-wrap: anywhere;
          word-break: break-word;
          min-width: 0;
          flex: 1;
          transition: color 0.15s ease, text-decoration-color 0.15s ease;
        }
        .ty-meet-url-text:hover {
          color: #15803d;
          text-decoration-color: #15803d;
        }
        .ty-meet-url-text:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 2px;
          border-radius: 2px;
        }

        .ty-meet-copy-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #ffffff;
          border: 1.5px solid #0a0a0a;
          color: #0a0a0a;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .ty-meet-copy-icon-btn:hover {
          background: #f0f0ec;
          border-color: #0a0a0a;
        }
        .ty-meet-copy-icon-btn:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 2px;
        }

        /* ── MEET ACTIONS & COUNTDOWN ─────────────────────── */
        .ty-meet-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
        }

        .ty-meet-countdown-pill {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 600;
          color: #15803d;
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
        }

        .ty-meet-loading-wrap {
          padding: 0.5rem 0 0.85rem;
        }

        .ty-meet-loading-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.4rem;
        }

        .ty-meet-loading-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-primary);
        }

        .ty-meet-loading-sub {
          font-size: 14px;
          color: #3d3d38;
          margin: 0;
          line-height: 1.5;
        }

        .ty-spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid #e8e8e5;
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: ty-spin 0.8s linear infinite;
        }

        @keyframes ty-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .ty-meet-timeout-wrap {
          padding: 0.25rem 0 0.75rem;
        }

        .ty-meet-timeout-msg {
          font-size: 14px;
          color: #3d3d38;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .ty-meet-cancelled-wrap {
          padding: 0.25rem 0 0.75rem;
        }

        .ty-meet-cancelled-msg {
          font-size: 14px;
          color: #b91c1c;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .ty-meet-manage-wrap {
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px dashed #e8e8e5;
        }

        .ty-meet-manage-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 14px;
          color: #3d3d38;
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .ty-meet-manage-link:hover {
          color: #0a0a0a;
          text-decoration: underline;
        }

        .ty-meet-manage-link:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 2px;
          border-radius: 2px;
        }

        .ty-join-note {
          font-size: 14px;
          color: #3d3d38;
          margin-top: 0.75rem;
          line-height: 1.5;
        }

        .ty-join-empty {
          font-size: 14px;
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
          font-size: 14px;
          color: #3d3d38;
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
          font-size: 14px;
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
          border: 1.5px solid #16a34a;
          color: #15803d;
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.18s ease, border-color 0.18s ease;
        }

        .ty-whatsapp-btn:hover {
          background: #dcfce7;
          border-color: #15803d;
        }

        .ty-whatsapp-btn:focus-visible {
          outline: 2px solid #0a0a0a;
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
          font-size: 14px;
          font-weight: 500;
          color: #3d3d38;
          text-decoration: none;
          transition: color 0.18s ease;
        }

        .ty-sec-link:hover { color: var(--text-primary); }
        .ty-sec-link:focus-visible {
          outline: 2px solid #0a0a0a;
          outline-offset: 3px;
          border-radius: 3px;
        }

        .ty-sec-sep { color: #d0d0cc; font-size: 0.75rem; }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* ── RESPONSIVE ───────────────────────────────────── */
        @media (max-width: 600px) {
          .ty-card { padding: 1.6rem 1.25rem; }
          .ty-cal-actions { flex-direction: column; }
          .ty-btn { width: 100%; justify-content: center; }
          .ty-meet-actions { flex-direction: column; width: 100%; }
          .ty-btn--join { width: 100%; }
          .ty-btn--copy { width: 100%; }
          .ty-meet-url-row { padding: 0.65rem 0.85rem; }
        }
      `}</style>
    </div>
  );
}
