"use client";

import React, { useState, useRef, useEffect } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section${visible ? " contact-section--visible" : ""}`}
      aria-label="Contact Cinova"
    >
      {/* Animated ticker — CINOVA · CONTACT */}
      <div className="contact-ticker" aria-hidden="true">
        <div className="contact-ticker__track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="contact-ticker__item">
              CINOVA<span className="contact-ticker__dot">·</span>CONTACT
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="contact-inner">
        {/* Left column */}
        <div className="contact-left">
          {/* Section label */}
          <div className="contact-label">
            <span className="contact-label__icon" aria-hidden="true">✦</span>
            <span>CONTACT</span>
          </div>

          <h2 className="contact-heading">
            Let&apos;s talk about what you&apos;re building{" "}
            <span className="contact-heading--muted">and how we can help.</span>
          </h2>

          <ul className="contact-info-list">
            <li className="contact-info-item">
              <span className="contact-info-item__label">Want to call us?</span>
              <a href="tel:+919876543210" className="contact-info-item__value">
                +91 98765 43210
              </a>
            </li>
            <li className="contact-info-item">
              <span className="contact-info-item__label">Prefer the old way?</span>
              <a href="mailto:hello@cinova.in" className="contact-info-item__value">
                hello@cinova.in
              </a>
            </li>
          </ul>
        </div>

        {/* Right column — form */}
        <div className="contact-right">
          <div className="contact-form-header">
            <p className="contact-form-headline">Let&apos;s start</p>
            <p className="contact-form-headline contact-form-headline--muted">the conversation.</p>
          </div>

          {submitted ? (
            <div className="contact-success">
              <div className="contact-success__icon" aria-hidden="true">✓</div>
              <h3 className="contact-success__title">Message sent.</h3>
              <p className="contact-success__body">
                We&apos;ll review your message and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-field__label">
                  Your name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact-field__input"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-field__label">
                  Your e-mail *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-field__input"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-field__label">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  className="contact-field__input contact-field__input--textarea"
                  placeholder="your message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  required
                />
              </div>

              <button
                type="submit"
                className={`contact-submit${submitting ? " contact-submit--loading" : ""}`}
                disabled={submitting || !formData.name || !formData.email || !formData.message}
              >
                <span>{submitting ? "Sending..." : "Send message"}</span>
                {!submitting && (
                  <span className="contact-submit__icon" aria-hidden="true">↗</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
