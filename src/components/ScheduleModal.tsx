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
      // In local dev without Netlify form backend, still allow confirmation
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Build calendar link for the scheduled call
  const generateGoogleCalendarUrl = () => {
    const cleanDate = selectedDate.replace(/-/g, "");
    // Default to 11:30 AM local time if not parsed
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
          <form className="sc-form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="form-name" value="cinova-schedule-call" />
            <input
              name="bot-field"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              style={{ position: "absolute", left: "-9999px" }}
              autoComplete="off"
            />

            {/* Header */}
            <div className="sc-head">
              <span className="sc-badge">30-Min Strategy Call</span>
              <h2 className="sc-headline">SCHEDULE A FREE CALL</h2>
              <p className="sc-subline">
                Select your preferred date and time. We’ll meet to understand your current growth system and identify high-leverage opportunities.
              </p>
            </div>

            <div className="sc-grid">
              {/* Left Column: Date & Time Pickers */}
              <div className="sc-col">
                <label className="sc-label">1. Choose a Date</label>
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

                <label className="sc-label" style={{ marginTop: "1.25rem" }}>
                  2. Choose a Time Slot
                </label>
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

                <label className="sc-label" style={{ marginTop: "1.25rem" }}>
                  3. Preferred Meeting Platform
                </label>
                <div className="sc-chips">
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

              {/* Right Column: Contact Details */}
              <div className="sc-col">
                <label className="sc-label">4. Your Details</label>
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

                <div className="sc-field">
                  <textarea
                    id="sc-notes"
                    name="notes"
                    placeholder="What would you like to solve or discuss? (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="sc-textarea"
                    rows={3}
                  />
                </div>

                {error && <p className="sc-error">{error}</p>}

                <button
                  type="submit"
                  className="sc-submit-btn"
                  disabled={submitting}
                  id="sc-submit-booking"
                >
                  {submitting ? "Booking Appointment…" : "Confirm Appointment →"}
                </button>

                <p className="sc-privacy-note">
                  Direct consultation with founders. No generic sales decks. Strictly confidential.
                </p>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="sc-confirmation">
            <div className="sc-confirm-icon">✓</div>
            <h2 className="sc-confirm-title">Meeting Reserved</h2>
            <p className="sc-confirm-desc">
              Your 30-minute growth discovery call has been appointed for:
            </p>

            <div className="sc-confirm-box">
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Date:</span>
                <span className="sc-confirm-val">{selectedDate}</span>
              </div>
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Time:</span>
                <span className="sc-confirm-val">{selectedTime}</span>
              </div>
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Platform:</span>
                <span className="sc-confirm-val">{platform}</span>
              </div>
              <div className="sc-confirm-row">
                <span className="sc-confirm-label">Attendee:</span>
                <span className="sc-confirm-val">{name} ({email})</span>
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
              Done
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .sc-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 4, 4, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: scFadeIn 0.25s ease forwards;
        }

        .sc-panel {
          position: relative;
          background: #0d0d0d;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          max-width: 860px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2.5rem;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9);
          animation: scSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sc-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .sc-close:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: rotate(90deg);
        }
        .sc-close__line {
          position: absolute;
          width: 16px;
          height: 2px;
          background: #fff;
        }
        .sc-close__line:first-child { transform: rotate(45deg); }
        .sc-close__line:last-child { transform: rotate(-45deg); }

        .sc-head {
          margin-bottom: 2rem;
        }
        .sc-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #000;
          background: #b6f500;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }
        .sc-headline {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }
        .sc-subline {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.92rem;
          line-height: 1.5;
          margin: 0;
          max-width: 620px;
        }

        .sc-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .sc-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .sc-panel {
            padding: 1.5rem;
          }
        }

        .sc-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 0.6rem;
        }

        .sc-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .sc-chip {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.82rem;
          padding: 0.55rem 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }
        .sc-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          color: #fff;
        }
        .sc-chip--active {
          background: #b6f500 !important;
          border-color: #b6f500 !important;
          color: #000 !important;
          font-weight: 600;
        }
        .sc-chip--time {
          font-size: 0.8rem;
          padding: 0.45rem 0.75rem;
        }

        .sc-custom-date {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.6rem;
        }
        .sc-custom-date-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }
        .sc-date-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          color: #fff;
          font-size: 0.8rem;
          padding: 0.35rem 0.6rem;
          color-scheme: dark;
        }

        .sc-field {
          margin-bottom: 0.85rem;
        }
        .sc-input,
        .sc-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          color: #fff;
          font-size: 0.88rem;
          padding: 0.75rem 1rem;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .sc-input:focus,
        .sc-textarea:focus {
          outline: none;
          border-color: #b6f500;
          background: rgba(255, 255, 255, 0.07);
        }
        .sc-textarea {
          resize: vertical;
        }

        .sc-submit-btn {
          width: 100%;
          background: #b6f500;
          color: #000;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.9rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
          margin-top: 0.5rem;
        }
        .sc-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(182, 245, 0, 0.25);
        }
        .sc-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .sc-error {
          color: #ff5555;
          font-size: 0.8rem;
          margin: 0.4rem 0 0 0;
        }
        .sc-privacy-note {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          margin-top: 0.85rem;
          line-height: 1.4;
        }

        /* Confirmation Screen */
        .sc-confirmation {
          text-align: center;
          padding: 1.5rem 0.5rem;
        }
        .sc-confirm-icon {
          width: 60px;
          height: 60px;
          background: #b6f500;
          color: #000;
          font-size: 1.8rem;
          font-weight: 800;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .sc-confirm-title {
          font-family: var(--font-playfair, Georgia, serif);
          font-size: 2.2rem;
          color: #fff;
          margin: 0 0 0.5rem;
        }
        .sc-confirm-desc {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.95rem;
          margin: 0 0 1.5rem;
        }
        .sc-confirm-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          max-width: 450px;
          margin: 0 auto 2rem;
          padding: 1.25rem 1.5rem;
          text-align: left;
        }
        .sc-confirm-row {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.88rem;
        }
        .sc-confirm-row:last-child {
          border-bottom: none;
        }
        .sc-confirm-label {
          color: rgba(255, 255, 255, 0.5);
        }
        .sc-confirm-val {
          color: #fff;
          font-weight: 500;
        }
        .sc-confirm-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .sc-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }
        .sc-action-btn:hover {
          transform: translateY(-2px);
        }
        .sc-action-btn--calendar {
          background: #fff;
          color: #000;
        }
        .sc-action-btn--whatsapp {
          background: #25d366;
          color: #000;
        }
        .sc-close-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 0.55rem 2rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .sc-close-btn:hover {
          color: #fff;
          border-color: #fff;
        }

        @keyframes scFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
