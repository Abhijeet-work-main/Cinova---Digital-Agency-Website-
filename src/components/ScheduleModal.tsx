"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "10:00 AM – 10:30 AM",
  "11:30 AM – 12:00 PM",
  "02:00 PM – 02:30 PM",
  "03:30 PM – 04:00 PM",
  "05:00 PM – 05:30 PM",
  "06:30 PM – 07:00 PM",
];

const PLATFORMS = [
  { id: "Google Meet", label: "Google Meet (Video)" },
  { id: "WhatsApp", label: "WhatsApp Audio/Video" },
  { id: "Phone", label: "Phone Call" },
];

function getUpcomingDays() {
  const days: { label: string; value: string; date: Date }[] = [];
  const now = new Date();
  let count = 0;
  let offset = 1;

  while (count < 5) {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    offset++;
    // Skip weekends for business appointments
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const dayNum = d.getDate();

    days.push({
      label: count === 0 ? `Tomorrow (${weekday})` : `${weekday}, ${month} ${dayNum}`,
      value: dateStr,
      date: d,
    });
    count++;
  }
  return days;
}

export default function ScheduleModal({ open, onClose }: ScheduleModalProps) {
  const days = getUpcomingDays();
  const [selectedDate, setSelectedDate] = useState(days[0]?.value || "");
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [platform, setPlatform] = useState("Google Meet");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [botField, setBotField] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement;
    setTimeout(() => nameRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and work email.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const body = new URLSearchParams({
        "form-name": "cinova-schedule-call",
        "bot-field": botField,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        brand: brand.trim(),
        date: selectedDate,
        time: selectedTime,
        platform,
        notes: notes.trim(),
      });

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at hello@getcinova.com.");
    } finally {
      setSubmitting(false);
    }
  };

  // Build calendar link for the scheduled call
  const generateGoogleCalendarUrl = () => {
    const cleanDate = selectedDate.replace(/-/g, "");
    const startHour = selectedTime.includes("10:00")
      ? "100000"
      : selectedTime.includes("11:30")
      ? "113000"
      : selectedTime.includes("02:00")
      ? "140000"
      : selectedTime.includes("03:30")
      ? "153000"
      : selectedTime.includes("05:00")
      ? "170000"
      : "183000";

    const endHour = selectedTime.includes("10:00")
      ? "103000"
      : selectedTime.includes("11:30")
      ? "120000"
      : selectedTime.includes("02:00")
      ? "143000"
      : selectedTime.includes("03:30")
      ? "160000"
      : selectedTime.includes("05:00")
      ? "173000"
      : "190000";

    const title = encodeURIComponent(`Cinova Growth Strategy Call (${name || "Client"})`);
    const details = encodeURIComponent(
      `30-minute private growth consultation with Cinova.\nPlatform: ${platform}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nBrand: ${brand || "N/A"}`
    );
    const location = encodeURIComponent(platform === "Google Meet" ? "Google Meet" : platform);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${cleanDate}T${startHour}/${cleanDate}T${endHour}&details=${details}&location=${location}`;
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Cinova team, I just scheduled a growth discovery call for ${selectedDate} at ${selectedTime} via ${platform}. (Name: ${name || "Client"}, Brand: ${brand || "N/A"}). Looking forward to speaking!`
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="sc-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a Free Discovery Call"
      onClick={handleOverlayClick}
    >
      <div className="sc-panel">
        {/* Close Button */}
        <button className="sc-close" onClick={onClose} aria-label="Close scheduling modal">
          <span className="sc-close__line" />
          <span className="sc-close__line" />
        </button>

        {!submitted ? (
          <form name="cinova-schedule-call" className="sc-form" onSubmit={handleSubmit} noValidate>
            {/* Netlify required hidden field */}
            <input type="hidden" name="form-name" value="cinova-schedule-call" />
            {/* Hidden appointment selections included in DOM */}
            <input type="hidden" name="date" value={selectedDate} />
            <input type="hidden" name="time" value={selectedTime} />
            <input type="hidden" name="platform" value={platform} />

            {/* Honeypot — moved off-screen, not display:none; autoComplete="one-time-code" prevents browser autofill */}
            <input
              name="bot-field"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
              autoComplete="one-time-code"
            />

            {/* Header Block matching ContactModal design */}
            <div className="sc-head">
              <div className="sc-badge-wrap">
                <span className="sc-badge">30-Min Strategy Call</span>
              </div>
              <h2 className="sc-headline">SCHEDULE A FREE CALL</h2>
              <div className="sc-head__rule" />
              <p className="sc-subline">
                Select your preferred date and time. We&apos;ll meet to understand your current growth system and identify high-leverage opportunities.
              </p>
            </div>

            <div className="sc-grid">
              {/* Left Column: Date, Time & Platform Selections */}
              <div className="sc-col sc-col--left">
                <div className="sc-step-group">
                  <label className="sc-step-label">1. Choose a Date</label>
                  <div className="sc-chips">
                    {days.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        className={`sc-chip${selectedDate === d.value ? " sc-chip--active" : ""}`}
                        onClick={() => setSelectedDate(d.value)}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <div className="sc-custom-date">
                    <span className="sc-custom-date-label">Or custom date:</span>
                    <input
                      type="date"
                      className="sc-date-input"
                      value={selectedDate}
                      min={days[0]?.value}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sc-step-group">
                  <label className="sc-step-label">2. Choose a Time Slot</label>
                  <div className="sc-chips sc-chips--time">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`sc-chip sc-chip--time${selectedTime === slot ? " sc-chip--active" : ""}`}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sc-step-group">
                  <label className="sc-step-label">3. Preferred Meeting Platform</label>
                  <div className="sc-chips sc-chips--platform">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`sc-chip${platform === p.id ? " sc-chip--active" : ""}`}
                        onClick={() => setPlatform(p.id)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Details & Submit */}
              <div className="sc-col sc-col--right">
                <label className="sc-step-label">4. Your Details</label>

                <div className="sc-field">
                  <input
                    ref={nameRef}
                    id="sc-name"
                    name="name"
                    type="text"
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="sc-input"
                    autoComplete="name"
                  />
                </div>

                <div className="sc-field">
                  <input
                    id="sc-email"
                    name="email"
                    type="email"
                    placeholder="Work Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="sc-input"
                    autoComplete="email"
                  />
                </div>

                <div className="sc-field">
                  <input
                    id="sc-phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone / WhatsApp Number (Optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="sc-input"
                    autoComplete="tel"
                  />
                </div>

                <div className="sc-field">
                  <input
                    id="sc-brand"
                    name="brand"
                    type="text"
                    placeholder="Brand or Website URL"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="sc-input"
                  />
                </div>

                <div className="sc-field sc-field--notes">
                  <textarea
                    id="sc-notes"
                    name="notes"
                    placeholder="What would you like to solve or discuss? (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="sc-textarea"
                    rows={2}
                  />
                </div>

                {/* Submit Row matching ContactModal */}
                <div className="sc-submit-row">
                  <button
                    type="submit"
                    className="sc-submit"
                    disabled={submitting}
                    aria-disabled={submitting}
                    id="sc-submit-booking"
                  >
                    <span className="sc-submit__label">
                      {submitting ? "Booking Appointment…" : "Confirm Appointment"}
                    </span>
                    <span className="sc-submit__arrow" aria-hidden="true">→</span>
                  </button>
                </div>

                {error && (
                  <p className="sc-error" role="alert">{error}</p>
                )}

                {/* Trust Note matching ContactModal */}
                <p className="sc-trust">
                  Direct consultation with founders. No generic sales decks.<br />
                  Strictly confidential.
                </p>

                {/* Person Card (Human Touch) matching ContactModal */}
                <div className="sc-person">
                  <div className="sc-person__avatar" aria-hidden="true">
                    <span className="sc-person__initials">AB</span>
                  </div>
                  <div className="sc-person__text">
                    <span className="sc-person__name">Abhijeet</span>
                    <span className="sc-person__role">Growth Strategist</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Screen matching ContactModal design system */
          <div className="sc-confirmation">
            <div className="sc-confirm-icon" aria-hidden="true">✓</div>
            <h2 className="sc-confirm-title">MEETING RESERVED</h2>
            <div className="sc-head__rule" style={{ width: "100%", maxWidth: "480px", margin: "0 auto 1.25rem" }} />
            <p className="sc-confirm-desc">
              Your 30-minute growth strategy consultation has been appointed for:
            </p>

            <div className="sc-confirm-box">
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Date</span>
                <span className="sc-confirm-val">{selectedDate}</span>
              </div>
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Time</span>
                <span className="sc-confirm-val">{selectedTime}</span>
              </div>
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Platform</span>
                <span className="sc-confirm-val">{platform}</span>
              </div>
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Attendee</span>
                <span className="sc-confirm-val">{name} {email ? `(${email})` : ""}</span>
              </div>
            </div>

            <div className="sc-confirm-actions">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-action-btn sc-action-btn--calendar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Add to Google Calendar
              </a>

              <a
                href={`https://wa.me/917428245045?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-action-btn sc-action-btn--whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.942.553 3.754 1.512 5.29L2.094 22l4.823-1.405c1.488.89 3.228 1.436 5.114 1.436 5.536 0 10.031-4.495 10.031-10.031S17.567 2 12.031 2zm0 18.232c-1.688 0-3.262-.486-4.6-1.328l-.33-.207-3.23.942.957-3.14-.216-.346A8.17 8.17 0 0 1 3.828 12.03c0-4.522 3.681-8.203 8.203-8.203 4.523 0 8.203 3.681 8.203 8.203 0 4.522-3.68 8.203-8.203 8.203z"/>
                </svg>
                Confirm on WhatsApp
              </a>
            </div>

            <button type="button" onClick={onClose} className="sc-close-btn">
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════
           OVERLAY & MODAL CONTAINER
        ═══════════════════════════════════════════════════════ */
        .sc-overlay {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: scFade 0.22s ease forwards;
        }
        @keyframes scFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .sc-panel {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 1100px;
          padding: 3rem 3.5rem 2.75rem;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
          animation: scUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          max-height: 92vh;
          overflow-y: auto;
          box-sizing: border-box;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        @keyframes scUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sc-panel::-webkit-scrollbar {
          width: 6px;
        }
        .sc-panel::-webkit-scrollbar-track {
          background: transparent;
        }
        .sc-panel::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 999px;
        }
        .sc-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        /* ═══════════════════════════════════════════════════════
           CLOSE BUTTON
        ═══════════════════════════════════════════════════════ */
        .sc-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1.5px solid rgba(0, 0, 0, 0.18);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
          z-index: 10;
        }
        .sc-close:hover {
          border-color: rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.04);
        }
        .sc-close__line {
          display: block;
          width: 14px;
          height: 1.5px;
          background: #0a0a0a;
          transform-origin: center;
        }
        .sc-close__line:first-child {
          transform: rotate(45deg) translate(3.5px, 3.5px);
        }
        .sc-close__line:last-child {
          transform: rotate(-45deg) translate(3.5px, -3.5px);
        }

        /* ═══════════════════════════════════════════════════════
           HEADLINE BLOCK
        ═══════════════════════════════════════════════════════ */
        .sc-head {
          margin-bottom: 1.25rem;
        }
        .sc-badge-wrap {
          margin-bottom: 0.65rem;
        }
        .sc-badge {
          display: inline-block;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: var(--accent-primary, #b6f500);
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
        }
        .sc-headline {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 900;
          color: #0a0a0a;
          line-height: 0.95;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin: 0 0 0.75rem;
          white-space: nowrap;
        }
        .sc-head__rule {
          height: 1px;
          background: rgba(0, 0, 0, 0.1);
          margin-bottom: 0.65rem;
        }
        .sc-subline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.55);
          margin: 0;
          line-height: 1.5;
          max-width: 720px;
        }

        /* ═══════════════════════════════════════════════════════
           BODY: TWO EQUAL COLUMNS
        ═══════════════════════════════════════════════════════ */
        .sc-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 0 3.5rem;
          margin-top: 1rem;
          align-items: start;
        }
        .sc-col {
          display: flex;
          flex-direction: column;
        }

        /* ── STEP LABELS ──────────────────────── */
        .sc-step-group {
          margin-bottom: 1.25rem;
        }
        .sc-step-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 0.6rem;
          display: block;
        }

        /* ── CHIPS (DATE, TIME, PLATFORM) ─────── */
        .sc-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .sc-chips--time {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.45rem;
        }
        .sc-chip {
          background: #f5f5f7;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          color: #1a1a1a;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.55rem 0.85rem;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: center;
        }
        .sc-chip:hover {
          background: #eaeaea;
          border-color: rgba(0, 0, 0, 0.2);
          color: #000;
        }
        .sc-chip--active {
          background: var(--accent-primary, #b6f500) !important;
          border-color: #a4dd00 !important;
          color: #0a0a0a !important;
          font-weight: 700 !important;
          box-shadow: 0 2px 8px rgba(182, 245, 0, 0.35);
        }
        .sc-chip--time {
          font-size: 0.8rem;
          padding: 0.55rem 0.75rem;
        }

        /* ── CUSTOM DATE PICKER ───────────────── */
        .sc-custom-date {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.65rem;
        }
        .sc-custom-date-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.45);
        }
        .sc-date-input {
          background: #f5f5f7;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 6px;
          color: #0a0a0a;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          padding: 0.35rem 0.65rem;
          color-scheme: light;
          outline: none;
          transition: border-color 0.2s;
        }
        .sc-date-input:focus {
          border-color: #0a0a0a;
        }

        /* ── FORM FIELDS (UNDERLINE STYLE) ───── */
        .sc-field {
          border-bottom: 2px solid rgba(0, 0, 0, 0.15);
          margin-bottom: 0.25rem;
          transition: border-bottom-color 0.2s ease;
        }
        .sc-field:focus-within {
          border-bottom-color: #0a0a0a;
        }
        .sc-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          color: #0a0a0a;
          padding: 0.75rem 0;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1.4;
          box-sizing: border-box;
        }
        .sc-input::placeholder,
        .sc-textarea::placeholder {
          color: rgba(0, 0, 0, 0.4);
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 500;
        }
        .sc-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.98rem;
          font-weight: 500;
          color: #0a0a0a;
          padding: 0.75rem 0 0.4rem;
          resize: none;
          line-height: 1.4;
          min-height: 58px;
          box-sizing: border-box;
        }

        /* ── SUBMIT ROW ───────────────────────── */
        .sc-submit-row {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          margin-top: 1.25rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .sc-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .sc-submit__label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #0a0a0a;
          letter-spacing: -0.01em;
          line-height: 1;
          transition: color 0.18s ease;
        }
        .sc-submit:hover:not(:disabled) .sc-submit__label {
          color: #333;
        }
        .sc-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .sc-submit__arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent-primary, #b6f500);
          color: #0a0a0a;
          font-size: 1rem;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s;
        }
        .sc-submit:hover:not(:disabled) .sc-submit__arrow {
          transform: translateX(6px);
          background: #c8f500;
        }

        /* ── ERROR MESSAGE ────────────────────── */
        .sc-error {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.8rem;
          color: #c0392b;
          margin: 0.5rem 0 0;
          line-height: 1.5;
        }

        /* ── TRUST NOTE ───────────────────────── */
        .sc-trust {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          color: rgba(0, 0, 0, 0.55);
          line-height: 1.6;
          margin: 0.75rem 0 0;
        }

        /* ── PERSON CARD (HUMAN TOUCH) ────────── */
        .sc-person {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .sc-person__avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #f0f0ee;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .sc-person__initials {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #0a0a0a;
          letter-spacing: 0.02em;
        }
        .sc-person__text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .sc-person__name {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #0a0a0a;
          line-height: 1.2;
        }
        .sc-person__role {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ═══════════════════════════════════════════════════════
           CONFIRMATION SCREEN
        ═══════════════════════════════════════════════════════ */
        .sc-confirmation {
          text-align: center;
          padding: 2.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sc-confirm-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent-primary, #b6f500);
          color: #0a0a0a;
          font-size: 1.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .sc-confirm-title {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(2rem, 4.5vw, 2.8rem);
          font-weight: 900;
          color: #0a0a0a;
          margin: 0 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .sc-confirm-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          color: rgba(0, 0, 0, 0.55);
          max-width: 480px;
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }
        .sc-confirm-box {
          background: #f7f7f8;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px;
          max-width: 480px;
          width: 100%;
          margin: 0 auto 1.75rem;
          padding: 1.25rem 1.75rem;
          text-align: left;
          box-sizing: border-box;
        }
        .sc-confirm-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          font-size: 0.9rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .sc-confirm-row:last-child {
          border-bottom: none;
        }
        .sc-confirm-label {
          color: rgba(0, 0, 0, 0.45);
          font-weight: 500;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .sc-confirm-val {
          color: #0a0a0a;
          font-weight: 600;
        }
        .sc-confirm-actions {
          display: flex;
          gap: 0.85rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .sc-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1.4rem;
          border-radius: 999px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s;
        }
        .sc-action-btn:hover {
          transform: translateY(-2px);
        }
        .sc-action-btn--calendar {
          background: #0a0a0a;
          color: #fff;
        }
        .sc-action-btn--calendar:hover {
          background: #262626;
        }
        .sc-action-btn--whatsapp {
          background: #25d366;
          color: #fff;
        }
        .sc-action-btn--whatsapp:hover {
          background: #20bd5a;
        }
        .sc-close-btn {
          background: transparent;
          border: 1.5px solid rgba(0, 0, 0, 0.18);
          border-radius: 999px;
          color: #0a0a0a;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.7rem 2.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sc-close-btn:hover {
          border-color: rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.04);
        }

        /* ═══════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════ */
        @media (max-width: 860px) {
          .sc-panel {
            padding: 2.25rem 2rem 2rem;
            max-height: 94vh;
            border-radius: 16px;
          }
          .sc-headline {
            font-size: clamp(2.2rem, 9vw, 3.5rem);
            white-space: normal;
          }
          .sc-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .sc-chips--time {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .sc-panel {
            padding: 1.5rem 1.25rem;
            border-radius: 16px 16px 12px 12px;
          }
          .sc-overlay {
            padding: 0.5rem;
            align-items: flex-end;
          }
          .sc-headline {
            font-size: clamp(2rem, 10vw, 2.8rem);
          }
          .sc-chips--time {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sc-overlay, .sc-panel {
            animation: none !important;
          }
          .sc-submit__arrow, .sc-submit__label, .sc-chip {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
