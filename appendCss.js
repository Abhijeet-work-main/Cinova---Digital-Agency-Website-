const fs = require('fs');

const heroCss = `
/* =============================================================
   HERO SECTION (Phase C.2)
   ============================================================= */
.cinova-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--bg-primary);
}
.cinova-hero__base {
  position: absolute;
  inset: 0;
  background: var(--bg-primary);
  z-index: 1;
}
.cinova-hero__grid-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
  opacity: 0.8;
  pointer-events: none;
  mix-blend-mode: screen;
}
.cinova-hero__image-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  z-index: 3;
}
/* Desktop wrapper */
.cinova-hero__image-wrapper--desktop { display: block; }
/* Mobile wrapper */
.cinova-hero__image-wrapper--mobile { display: none; }
@media (max-width: 768px) {
  .cinova-hero__image-wrapper--desktop { display: none; }
  .cinova-hero__image-wrapper--mobile { display: block; width: 100%; }
}
.cinova-hero__image-gradient-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(to right, var(--bg-primary) 0%, transparent 100%);
  z-index: 4;
}
.cinova-hero__image-gradient-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to top, var(--bg-primary) 0%, transparent 100%);
  z-index: 4;
}
.cinova-hero__content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 8rem;
}
@media (max-width: 768px) {
  .cinova-hero__content-wrapper {
    padding: 0 1.5rem;
    padding-top: 0;
  }
}
.cinova-hero__content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cinova-hero__eyebrow {
  color: var(--accent-primary);
  font-family: var(--font-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.3s forwards;
}
.cinova-hero__headline {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(3.5rem, 10vw, 9rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.1s forwards;
}
@media (max-width: 768px) {
  .cinova-hero__headline {
    font-size: clamp(3.2rem, 11vw, 4.5rem);
  }
}
.cinova-hero__subcopy {
  font-family: var(--font-primary);
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  color: var(--text-secondary);
  max-width: 480px;
  line-height: 1.65;
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.5s forwards;
}
.cinova-hero__cta-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.8s ease-out 0.7s forwards;
}
.cinova-hero__cta-primary {
  background-color: var(--accent-primary);
  color: #000000;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color var(--transition-fast);
}
.cinova-hero__cta-primary:hover {
  background-color: var(--accent-hover);
}
.cinova-hero__cta-secondary {
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.cinova-hero__cta-secondary:hover {
  border-color: var(--accent-primary);
}
.cinova-hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  opacity: 0;
  animation: fadeUp 1s ease-out 1.2s forwards;
}
@media (max-width: 768px) {
  .cinova-hero__scroll-indicator {
    display: none;
  }
}
.cinova-hero__scroll-arrow {
  display: block;
  color: var(--text-muted);
  font-size: 1.5rem;
  animation: bounce 2s infinite ease-in-out;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
@media (prefers-reduced-motion: reduce) {
  .cinova-hero__eyebrow,
  .cinova-hero__headline,
  .cinova-hero__subcopy,
  .cinova-hero__cta-group,
  .cinova-hero__scroll-indicator {
    animation: none;
    opacity: 1;
  }
  .cinova-hero__scroll-arrow {
    animation: none;
  }
}
`;

const ctaCss = `
/* =============================================================
   GROWTH DIAGNOSTIC CTA SECTION (Phase C.3B)
   ============================================================= */
.diag-section {
  padding: 8rem 2rem;
  background-color: var(--bg-primary);
  position: relative;
  z-index: 10;
}
.diag-card {
  max-width: 860px;
  margin: 0 auto;
  border-radius: var(--border-radius-large);
  padding: 4rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.diag-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.diag-header__eyebrow {
  display: inline-block;
  color: var(--accent-primary);
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}
.diag-header__headline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
}
.diag-header__headline em {
  font-style: italic;
  color: var(--accent-primary);
}
.diag-progress {
  margin-bottom: 3rem;
}
.diag-progress__labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}
.diag-progress__track {
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
}
.diag-progress__fill {
  height: 100%;
  background: var(--accent-primary);
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.diag-body {
  min-height: 400px;
}
.diag-step {
  animation: diagSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.diag-step--form {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.diag-step__question {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1.25;
}
.diag-options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.diag-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.4rem;
  border-radius: 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  font-family: var(--font-primary);
}
.diag-option:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(182, 245, 0, 0.25);
}
.diag-option:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
}
.diag-option--selected {
  background: rgba(182, 245, 0, 0.04);
  border-color: var(--accent-primary);
  box-shadow: 0 4px 24px rgba(182, 245, 0, 0.07);
}
.diag-option__indicator {
  position: relative;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.diag-option__circle {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.25);
  background: transparent;
  transition: all 0.2s ease;
}
.diag-option__circle--selected {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
}
.diag-option__lottie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  border-radius: 50%;
  overflow: hidden;
}
.diag-option__lottie > div {
  transform: scale(2);
}
.diag-option__label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  line-height: 1.3;
}
.diag-option--selected .diag-option__label {
  color: #ffffff;
}
.diag-fields {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  max-width: 560px;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 3rem;
}
.diag-field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.diag-field__label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}
.diag-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  color: #ffffff;
  font-family: var(--font-primary);
  font-size: 1rem;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}
.diag-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  background: rgba(255,255,255,0.05);
  box-shadow: 0 0 0 4px rgba(182, 245, 0, 0.08);
}
.diag-input::placeholder {
  color: rgba(255,255,255,0.25);
}
.diag-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
}
.diag-nav--right {
  justify-content: flex-end;
}
.diag-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-primary);
  color: #000;
  border: none;
  border-radius: 50px;
  padding: 0.95rem 2rem;
  font-family: var(--font-primary);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.diag-btn-primary:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(182, 245, 0, 0.18);
}
.diag-btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.diag-btn-primary:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
}
.diag-btn-primary__lottie {
  display: inline-flex;
  align-items: center;
  width: 22px;
  height: 22px;
}
.diag-btn-secondary {
  background: transparent;
  color: var(--text-muted);
  border: none;
  padding: 0.95rem 1.2rem;
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
.diag-btn-secondary:hover {
  color: #ffffff;
}
.diag-btn-secondary:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
}
.diag-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 340px;
  animation: diagSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.diag-state__lottie {
  width: 140px;
  height: 140px;
  margin-bottom: 1.5rem;
}
.diag-state__label {
  color: var(--text-muted);
  font-size: 1.1rem;
}
.diag-state__title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #ffffff;
  margin-bottom: 1.2rem;
}
.diag-state__body {
  color: var(--text-secondary);
  max-width: 500px;
  font-size: 1rem;
  line-height: 1.7;
}
.diag-state__body code {
  color: var(--accent-primary);
  font-size: 0.9em;
}
.diag-state__body em {
  font-style: italic;
  color: var(--text-muted);
}
@keyframes diagSlideUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (max-width: 768px) {
  .diag-card {
    padding: 2.5rem 1.5rem;
    border-radius: 24px;
  }
  .diag-options-grid {
    grid-template-columns: 1fr;
  }
  .diag-fields {
    margin: 0 0 2.5rem;
  }
}
`;

fs.appendFileSync('src/app/globals.css', '\n' + heroCss + '\n' + ctaCss);
console.log('Successfully appended Hero and CTA CSS to globals.css');
