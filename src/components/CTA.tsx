"use client";

import React, { useState, useCallback } from "react";
import { Lottie } from "lottie-react";

import checkboxAnimation from "./lottie/lottieflow-checkbox-09-000000-easey.json";
import loadingAnimation from "./lottie/lottieflow-loading-08-000000-easey.json";
import successAnimation from "./lottie/lottieflow-success-03-000000-easey.json";
import ctaAnimation from "./lottie/lottieflow-cta-01-1-000000-easey.json";

type Step = 1 | 2 | 3 | 4 | "loading" | "success";

const STEP_1_OPTIONS = [
  "More sales",
  "Better leads",
  "Lower acquisition costs",
  "Better website conversion",
  "Better content",
  "I don't know yet",
];

const STEP_2_OPTIONS = [
  "Traffic",
  "Paid Ads",
  "Website",
  "Content",
  "Sales",
  "I don't know",
];

/* OptionCard is defined OUTSIDE CTA so React doesn't create a new component
   type on every CTA render, which would cause unnecessary remounts. */
interface OptionCardProps {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
}

function OptionCard({ option, isSelected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      className={`diag-option${isSelected ? " diag-option--selected" : ""}`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <span className="diag-option__indicator" aria-hidden="true">
        <span
          className={`diag-option__circle${isSelected ? " diag-option__circle--selected" : ""}`}
        />
        {isSelected && (
          <span className="diag-option__lottie">
            <Lottie src={checkboxAnimation} loop={false} />
          </span>
        )}
      </span>
      <span className="diag-option__label">{option}</span>
    </button>
  );
}

export default function CTA() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    improvement: "",
    bottleneck: "",
    brand: "",
    channel: "",
    name: "",
    email: "",
    botField: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNext = useCallback(() => {
    if (step === 1 && formData.improvement) setStep(2);
    else if (step === 2 && formData.bottleneck) setStep(3);
    else if (step === 3 && formData.brand && formData.channel) setStep(4);
  }, [step, formData]);

  const handleBack = useCallback(() => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 4) return;
    setSubmitError("");
    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        "form-name": "cinova-growth-diagnostic",
        "bot-field": formData.botField,
        name: formData.name,
        email: formData.email,
        improvement: formData.improvement,
        bottleneck: formData.bottleneck,
        brand: formData.brand,
        channel: formData.channel,
      });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (typeof window !== "undefined") {
        const event = new CustomEvent("cinova_audit_submit", { detail: formData });
        window.dispatchEvent(event);
      }
      setStep("success");
    } catch {
      setSubmitError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderProgressBar = () => {
    if (typeof step === "string") return null;
    const progress = ((step - 1) / 3) * 100;
    return (
      <div className="diag-progress">
        <div className="diag-progress__labels">
          <span>Step {step} of 4</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="diag-progress__track">
          <div className="diag-progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  };

  return (
    <section id="audit" className="diag-section">
      <div className="diag-card glass-panel">
        {/* Header — always visible */}
        <div className="diag-header">
          <span className="diag-header__eyebrow">Growth Diagnostic</span>
          <h2 className="diag-header__headline">
            Identify Your <em>Bottleneck.</em>
          </h2>
        </div>

        {renderProgressBar()}

        {/* Steps */}
        <div className="diag-body">

          {step === 1 && (
            <div className="diag-step" key="step-1">
              <h3 className="diag-step__question">What are you trying to improve?</h3>
              <div className="diag-options-grid" role="group" aria-label="Choose your primary goal">
                {STEP_1_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    option={opt}
                    isSelected={formData.improvement === opt}
                    onSelect={() => setFormData((prev) => ({ ...prev, improvement: opt }))}
                  />
                ))}
              </div>
              <div className="diag-nav diag-nav--right">
                <button
                  type="button"
                  className="diag-btn-primary"
                  onClick={handleNext}
                  disabled={!formData.improvement}
                  aria-disabled={!formData.improvement}
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="diag-step" key="step-2">
              <h3 className="diag-step__question">Where do you think the bottleneck is?</h3>
              <div className="diag-options-grid" role="group" aria-label="Choose bottleneck area">
                {STEP_2_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    option={opt}
                    isSelected={formData.bottleneck === opt}
                    onSelect={() => setFormData((prev) => ({ ...prev, bottleneck: opt }))}
                  />
                ))}
              </div>
              <div className="diag-nav">
                <button type="button" className="diag-btn-secondary" onClick={handleBack}>← Back</button>
                <button
                  type="button"
                  className="diag-btn-primary"
                  onClick={handleNext}
                  disabled={!formData.bottleneck}
                  aria-disabled={!formData.bottleneck}
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="diag-step diag-step--form" key="step-3">
              <h3 className="diag-step__question">Tell us about your brand</h3>
              <div className="diag-fields">
                <div className="diag-field">
                  <label htmlFor="diag-brand" className="diag-field__label">Brand Name</label>
                  <input
                    type="text"
                    id="diag-brand"
                    value={formData.brand}
                    onChange={(e) => setFormData((p) => ({ ...p, brand: e.target.value }))}
                    className="diag-input"
                    placeholder="e.g. Acme Corp"
                    autoComplete="organization"
                  />
                </div>
                <div className="diag-field">
                  <label htmlFor="diag-channel" className="diag-field__label">Website or Instagram URL</label>
                  <input
                    type="text"
                    id="diag-channel"
                    value={formData.channel}
                    onChange={(e) => setFormData((p) => ({ ...p, channel: e.target.value }))}
                    className="diag-input"
                    placeholder="e.g. yourbrand.com"
                    autoComplete="url"
                  />
                </div>
              </div>
              <div className="diag-nav">
                <button type="button" className="diag-btn-secondary" onClick={handleBack}>← Back</button>
                <button
                  type="button"
                  className="diag-btn-primary"
                  onClick={handleNext}
                  disabled={!formData.brand || !formData.channel}
                  aria-disabled={!formData.brand || !formData.channel}
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {(step === 4 || submitting) && (
            <form name="cinova-growth-diagnostic" className="diag-step diag-step--form" key="step-4" onSubmit={handleSubmit} noValidate>
              {/* Netlify required hidden field */}
              <input type="hidden" name="form-name" value="cinova-growth-diagnostic" />
              {/* Hidden multi-step answers included in the payload */}
              <input type="hidden" name="improvement" value={formData.improvement} />
              <input type="hidden" name="bottleneck" value={formData.bottleneck} />
              <input type="hidden" name="brand" value={formData.brand} />
              <input type="hidden" name="channel" value={formData.channel} />

              {/* Honeypot — off-screen, not display:none */}
              <input
                name="bot-field"
                value={formData.botField}
                onChange={(e) => setFormData((p) => ({ ...p, botField: e.target.value }))}
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

              <h3 className="diag-step__question">Where should we send the diagnosis?</h3>
              <div className="diag-fields">
                <div className="diag-field">
                  <label htmlFor="diag-name" className="diag-field__label">Your Name</label>
                  <input
                    type="text"
                    id="diag-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="diag-input"
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                </div>
                <div className="diag-field">
                  <label htmlFor="diag-email" className="diag-field__label">Contact Email</label>
                  <input
                    type="email"
                    id="diag-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="diag-input"
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {submitError && (
                <p role="alert" style={{ fontSize: "0.82rem", color: "#ef4444", marginTop: "0.75rem", lineHeight: 1.5 }}>
                  {submitError}
                </p>
              )}

              <div className="diag-nav">
                <button type="button" className="diag-btn-secondary" onClick={handleBack} disabled={submitting}>← Back</button>
                <button
                  type="submit"
                  className="diag-btn-primary diag-btn-primary--submit"
                  disabled={submitting || !formData.name || !formData.email}
                  aria-disabled={submitting || !formData.name || !formData.email}
                >
                  {submitting ? "Submitting..." : "Request Diagnosis"}
                  <span className="diag-btn-primary__lottie" aria-hidden="true">
                    <Lottie src={ctaAnimation} loop={true} />
                  </span>
                </button>
              </div>
            </form>
          )}

          {step === "loading" && (
            <div className="diag-state diag-state--loading" key="loading">
              <div className="diag-state__lottie">
                <Lottie src={loadingAnimation} loop={true} />
              </div>
              <p className="diag-state__label">Processing request...</p>
            </div>
          )}

          {step === "success" && (
            <div className="diag-state diag-state--success" key="success">
              <div className="diag-state__lottie">
                <Lottie src={successAnimation} loop={false} />
              </div>
              <h3 className="diag-state__title">We&apos;ve Received Your Request</h3>
              <p className="diag-state__body">
                Thank you for completing the diagnostic. We are analyzing your responses and will reach out shortly.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
