# CINOVA — AI CONTINUATION HANDOFF

## 1. WHAT CINOVA IS
Cinova is a premium, client-acquisition and conversion system for a digital growth agency. The objective is commercial conversion over design-only visual metrics. It acts as a connected growth partner solving multiple business bottlenecks, not just a generic service provider.

## 2. DESIRED VISITOR PSYCHOLOGY
The design architecture and copy must direct the visitor's psychology to realize:
1. "These people understand my specific problem."
2. "This is exactly what I was looking for."
3. "They can connect and solve multiple parts of my growth (creative + ads + web)."
4. "I should talk to them before continuing to lose opportunities to competitors."

## 3. VISUAL / DESIGN DIRECTION
- **Primary background**: Dark palette `#050505` to `#161616`.
- **Accent highlights**: Neon lime green `#b6f500`.
- **Typography**: Display serif (`Playfair Display`) paired with clean sans-serif (`Inter`).
- **Style elements**: Glassmorphism (`.glass-panel`), high-contrast borders, subtle micro-interactions.
- **Priority**: Conversion clarity > decorative complexity. Visuals should support conversion, not distract from it.

## 4. CURRENT NEXT.JS ARCHITECTURE
The codebase is a Next.js 16 (App Router) project written in TypeScript.
- **`src/app/`**: Contains the App Router structure (`page.tsx`, `layout.tsx`, `globals.css`).
- **`src/app/solutions/[solution]/`**: Dynamic route for solution offerings.
- **`src/app/for/[industry]/`**: Dynamic route for industry verticals.
- **`src/app/work/[slug]/`**: Dynamic route for detailed case studies.
- **`src/components/`**: Reusable UI components (`Header.tsx`, `Footer.tsx`, `CTA.tsx`, `CaseStudyCard.tsx`, `CinovaSystem.tsx`).
- **`src/data/`**: Centralized, statically-typed data stores that feed the dynamic routes (`caseStudies.ts`, `solutions.ts`, `industries.ts`).

## 5. COMPLETED WORK
- **Stage 1**: Conversion audit.
- **Next.js Migration setup**: Fully configured.
- **Phase A (Foundation & Homepage)**: The core UI, global CSS, components, and primary homepage.
- **Phase B (Dynamic Routes)**: Data-driven architecture for solutions, industries, and case studies, completely wired with cross-links.
- All code statically compiles via `npm run build` without errors.

## 6. VERIFIED FACTS & PROHIBITED CLAIMS
Every claim must reflect strictly verified facts. **Do not invent ROAS, revenue numbers, sales value, percentages, testimonials, quotes, or timeframes.**

- **Erminio Palamino** (E-commerce): 16,555 campaign clicks, average CPC of ₹0.27, initial spend of ₹4,454.90. Approximately 170,000 Instagram account reach.
- **PBInvesting & Omar Waseem** (Financial Media): 13.5k+ subscribers and 32,011+ views (Omar Waseem); 123k+ subscribers and 20,267+ views (PBInvesting).
- **Noor**, **Balbeer**, **Gloss & Shine**: *Qualitative results only*. No quantitative metrics verified. Do not invent any numbers here.

## 7. EXISTING ROUTES & DATA RELATIONSHIPS
- **`solutions.ts`** -> Maps to `/solutions/[solution]` (e.g., `websites`, `paid-growth`, `creative-production`, `social-growth`).
- **`industries.ts`** -> Maps to `/for/[industry]` (e.g., `ecommerce`, `service-brands`, `creators`, `fashion-apparel`).
- **`caseStudies.ts`** -> Maps to `/work/[slug]` (e.g., `erminio-palamino`, `balbeer`, `gloss-and-shine`, `noor`, `pb-investing`).
- **Data Cross-linking**: Industries link to relevant Solutions and Case Studies. Solutions link to relevant Industries and Case Studies. Unknown slugs route securely to `notFound()`.

## 8. FILES THAT MUST NOT BE DELETED
Do not overwrite, remove, or discard the original reference files or project scaffolding:
- `reference_index.html`
- `reference_style.css`
- `reference_script.js`
- `reference_chromatic-waves.js`
- `reference_netlify.toml`
- `AGENTS.md`
- `PROGRESS.md`
- `AI_HANDOFF.md`
- `Proof/` and `Assets/` directories.

## 9. SAFEST NEXT IMPLEMENTATION PRIORITIES
The repository is perfectly clean, synced with git (`origin/main`), and statically compiled.
**Do not start any new work.** Wait for explicit instruction regarding Phase C (e.g., integrations, advanced animations, diagnostic backend) from the user.
