# CINOVA — AI CONTINUATION HANDOFF

## 1. WHAT CINOVA IS

Cinova is a premium client-acquisition and conversion system for a digital growth agency.

The website is designed to sell an integrated growth partnership rather than present Cinova as a generic collection of disconnected services.

The core commercial idea is:

Creative + Paid Growth + Web + Social should operate as a connected growth system.

The primary objective is commercial conversion, not design-only visual impressiveness.

---

# 2. DESIRED VISITOR PSYCHOLOGY

The experience should guide visitors toward:

1. "These people understand my specific problem."

2. "This is exactly what I was looking for."

3. "They can connect and solve multiple parts of my growth."

4. "They have evidence that they can actually execute this."

5. "I should talk to them before continuing to lose opportunities."

The website therefore follows a deliberate persuasion sequence:

Hero
→ Problem Recognition
→ Growth Diagnostic
→ Solutions
→ Proof
→ Engagement Models
→ Diagnostic CTA

Do not optimize individual sections in isolation if doing so damages this overall progression.

---

# 3. VISUAL / DESIGN DIRECTION

Primary background:

- Dark palette approximately `#050505` → `#161616`

Accent:

- Neon lime approximately `#b6f500`

Typography:

- Display serif: Playfair Display
- Clean sans-serif: Inter

Visual characteristics:

- Premium
- Editorial
- Cinematic
- Minimal
- High contrast
- Restrained motion
- Controlled use of glass surfaces
- Strong typography
- Intentional spacing

Core principle:

> Conversion clarity > decorative complexity.

Visual effects must support comprehension, credibility, or interaction.

---

# 4. CURRENT TECHNICAL ARCHITECTURE

Framework:

- Next.js 16
- App Router
- TypeScript

Important routes:

- `/`
- `/solutions/[solution]`
- `/for/[industry]`
- `/work/[slug]`

Core data:

- `src/data/solutions.ts`
- `src/data/industries.ts`
- `src/data/caseStudies.ts`

Core components include:

- `Header.tsx`
- `Footer.tsx`
- `CTA.tsx`
- `CaseStudyCard.tsx`
- `MagneticButton.tsx`

---

# 5. SOURCE OF TRUTH RULE

The current codebase is the primary source of truth.

Older documentation may contain stale implementation assumptions.

When documentation conflicts with the actual repository:

1. Inspect the code.
2. Inspect the actual assets/data.
3. Inspect the current routes.
4. Inspect build/runtime behavior.
5. Treat the verified implementation as authoritative.

Do not resurrect deleted components or obsolete architecture merely because an old document mentions them.

---

# 6. COMPLETED + FROZEN WORK

## C.1 — Header / Global Interactions

COMPLETE + FROZEN.

Includes:

- Cinematic fullscreen navigation.
- Scroll-aware header.
- Keyboard navigation.
- Escape handling.
- Tab focus trap.
- Focus restoration.
- Body scroll locking.
- Staggered navigation animation.
- Hamburger animation.
- Reduced-motion support.
- MagneticButton.

Custom cursor was intentionally not implemented.

Do not add one without explicit approval.

---

## C.2 — Hero

COMPLETE + FROZEN.

Includes:

- Cinematic Hero direction.
- KineticGrid.
- Layered composition.
- CSS entrance animation.
- Corrected Hero image orientation.

Do not redesign the Hero during later phases.

---

## C.3A — Problem Recognition

COMPLETE + FROZEN.

Current framing:

"Where is your growth system leaking?"

Core ideas:

- Traffic Without Conversion
- Creative Without a System
- Vendors Without Accountability

No fabricated metrics.

Do not reopen.

---

## C.3B — Progressive Growth Audit CTA

COMPLETE + FROZEN.

`CTA.tsx` now contains the progressive diagnostic flow.

Uses:

- Lottie
- Progressive steps
- Loading state
- Success state
- Existing analytics event
- Responsive layout
- Reduced-motion support

Do not claim a real audit submission without backend integration.

Do not reopen.

---

## C.3C — Engagement Models

COMPLETE + APPROVED + FROZEN.

Uses factual `Pricing details.png` data.

Models:

- Starter Engagement
- Growth Retainer
- Full-Stack Partnership (Leadership)

Includes the verified feature matrix and minimum ad-spend information.

Actual-device testing revealed mobile imperfections.

Those are intentionally deferred to final responsive QA.

Do not reopen now.

---

## C.3D — Solutions

COMPLETE + APPROVED + FROZEN.

Updated:

- Homepage Solutions discovery.
- Dedicated solution-page presentation.

Uses the existing `solutions.ts` data.

Do not redesign the Header or solution architecture.

Do not reopen.

---

# 7. C.3E — CURRENT NEXT TASK

## PROOF / WORK / CASE STUDIES

C.3E is the next implementation phase.

Strategic purpose:

Proof must reduce perceived risk after the visitor has already:

- recognized their growth problem,
- seen Cinova's solution categories,
- understood that Cinova can operate as a connected partner.

Proof should answer:

> "Can they actually do this?"

The section should emphasize:

- Specificity
- Evidence
- Relevance
- Credibility
- Visual proof
- Clear case-study pathways

---

# 8. CASE-STUDY FACTUAL RULES

Never fabricate:

- ROAS
- Revenue
- Sales
- Percentages
- Testimonials
- Quotes
- Awards
- Client claims
- Timelines
- Performance improvements
- Results

Only verified information may be presented as fact.

Known verified information includes:

### Erminio Palamino

- 16,555 campaign clicks
- Average CPC ₹0.27
- Initial spend ₹4,454.90
- Approximately 170,000 Instagram account reach

### Omar Waseem / PBInvesting

Omar Waseem:

- 13.5k+ subscribers
- 32,011+ views

PBInvesting:

- 123k+ subscribers
- 20,267+ views

### Noor / Balbeer / Gloss & Shine

- Qualitative proof only.
- No verified quantitative metrics should be invented.

Always verify against the current `caseStudies.ts` before implementation.

---

# 9. C.3E SCOPE PROTECTION

C.3E must not reopen:

- Hero
- Header
- C.3A
- C.3B
- C.3C
- C.3D
- CTA architecture
- Engagement Models
- Existing data models unless strictly necessary
- Unrelated sections

Avoid unnecessary global CSS changes.

Avoid introducing new global animation systems.

---

# 10. OLD REFERENCE IMPLEMENTATION WARNING

The original Phase C audit proposed several systems including:

- Custom cursor
- Chromatic Waves
- Glitter Canvas
- Hero gallery rebuild
- Draggable cards
- Loading screen
- Liquid distortion
- Large animation systems

Those recommendations belong to the original visual audit and are NOT automatic requirements for the current implementation.

Do not resurrect them during C.3E.

The current Cinova direction prioritizes:

- Conversion clarity
- Editorial hierarchy
- Performance
- Factual proof
- Controlled interaction

---

# 11. MOBILE PRINCIPLES

Mobile is a first-class experience.

Avoid:

- Horizontal page overflow.
- Fragile drag interactions.
- Tiny interaction targets.
- Desktop-only layouts.
- Excessive animation.
- Overloaded card structures.

Normal vertical stacking is preferred unless horizontal interaction has a clear UX benefit.

Reduced-motion behavior must remain supported.

---

# 12. PERFORMANCE PRINCIPLES

Do not introduce heavy dependencies without explicit approval.

Avoid unnecessary:

- RAF loops
- WebGL systems
- global scroll listeners
- large animation libraries
- expensive background effects

Images should be appropriately optimized.

The website must remain fast enough for mobile users.

---

# 13. IMPLEMENTATION PROTOCOL

Every new phase follows:

1. Inspect current repository.
2. Plan.
3. Review plan.
4. Get explicit approval.
5. Implement smallest approved scope.
6. Run production build.
7. Run code-quality checks.
8. Perform desktop visual QA.
9. Perform iPhone 15 Pro/mobile QA.
10. Fix only issues belonging to the active phase.
11. Get sign-off.
12. Freeze the phase.

Do not silently expand scope.

---

# 14. MODEL USAGE

Use:

### Gemini 3.1 Pro

For:

- Architecture planning
- Project audits
- Complex reasoning
- Documentation/state reconciliation
- Strategic review

### Gemini 3.8 Flash

For:

- Straightforward implementation
- Scoped UI changes
- Repetitive coding
- Build-fix iterations

Avoid unnecessary model churn.

Do not use a more expensive reasoning model for routine implementation when Flash is sufficient.

---

# 15. CURRENT STATUS

COMPLETE:

- Foundation
- Phase A
- Phase B
- C.0
- C.1
- C.2
- C.3A
- C.3B
- C.3C
- C.3D

CURRENT:

- C.3E — Proof / Work / Case Studies

FUTURE:

- C.3F — Selective LottieFlow integration
- C.3G — Color / visual polish
- C.3H — Final QA
- Backend integrations
- Deployment verification

---

# 16. COMMIT POLICY

Do not commit phase changes unless explicitly instructed.

Keep each phase reviewable and reversible.

---

# 17. DEFINITION OF DONE

A phase is not considered complete merely because the code compiles.

A phase is complete when:

- Scope is implemented.
- No unrelated files are changed.
- Build passes.
- No obvious runtime errors exist.
- Desktop visual QA passes.
- Mobile visual QA passes where applicable.
- Reduced-motion behavior remains valid.
- No factual claims were invented.
- User explicitly approves the result.

Only then should the phase be marked COMPLETE + FROZEN.
