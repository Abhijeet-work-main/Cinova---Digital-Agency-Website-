# Phase C Implementation Plan: Visual Experience & Polish

## A. Current Visual Gap Audit
The current Phase A & B Next.js implementation is functionally sound, correctly passing data to pages and generating the right routes. However, it completely lacks the premium visual language of the reference HTML. The main gaps are:
1. **Hero Section**: Currently a basic text layout. Missing the immersive `gallery-box` with draggable/parallax images.
2. **Backgrounds**: The `chromatic-waves` WebGL canvas and `glitter-canvas` are missing. The site feels flat without these dynamic textures.
3. **Cursor and Interactions**: Missing the custom cursor (`cursor-follower`), magnetic hover effects on buttons/menu, and the draggable card containers for services and projects.
4. **Navigation**: The current Header is functional but lacks the fullscreen overlay menu, SVG curved marquee, and smooth stagger animations from the reference.
5. **Loading State**: Missing the initial `loading-screen` with the progress bar.
6. **Animations**: The Lottie animations (`lottie-check`, `lottie-attention-choose-us`) in the comparison table and the liquid glass SVG filters are not implemented.

## B. Reference Effects Inventory
| Effect | Location in Reference | Decision | Reason & Proposed Next.js Implementation |
|--------|-----------------------|----------|------------------------------------------|
| **Loading Screen** | Initial load | **KEEP (Modified)** | Essential for masking initial WebGL/asset load, but should be a Next.js `loading.tsx` or a brief `AnimatePresence` overlay. |
| **Custom Cursor** | Global | **ADAPT** | Essential for premium feel, but must disable on mobile/touch. Implement as a global context + Framer Motion. |
| **Fullscreen Menu**| Navigation | **KEEP** | Convert to a Next.js client component with magnetic bubble trigger (`Magnetic_hover_button` from Assets). |
| **Hero Gallery** | `#home` | **ADAPT** | Adapt into a performant CSS Grid + Framer Motion parallax rather than complex custom drag math. |
| **Chromatic Waves**| Background | **ADAPT** | Keep the WebGL shader but wrap it in a React `useRef`/`useEffect` component with `IntersectionObserver` to pause when out of view. |
| **Draggable Cards**| Services/Projects | **REPLACE** | Replace raw JS drag with `framer-motion`'s `drag` prop or use standard CSS horizontal scroll snap for better mobile UX. |
| **Glitter Canvas** | `#projects` | **KEEP** | Convert to a React canvas component. Pause off-screen. |
| **Liquid Glass SVG**| Global | **KEEP** | Easy to include as a hidden SVG in `layout.tsx` and apply via CSS `filter`. |
| **Comparison Table**| `#about` | **KEEP** | Convert to a React component using the Lottie JSON files. |
| **Curved Marquee** | Services | **REPLACE** | Use the `Text_path` or `Text_ring` asset from `Essential Element Code` instead of raw SVG path manipulation. |

## C. Asset Inventory
The `Assets/` directory contains highly valuable React components that can upgrade the site without bloated dependencies.
- **`Magnetic_hover_button`**: Use for the menu bubble and primary CTAs. (Essential)
- **`Text_path` / `Text_ring`**: Use for section dividers (like the Services marquee). (Essential)
- **`Liquid_distortion` / `Inkbleed`**: Use for hover effects on Case Study cards. (Optional but highly recommended for cinematic feel)
- **`Reactive_grid`**: Could replace the `glitter-canvas` if a more tech-focused background is desired for the Services section. (Optional)
- **Lottie JSONs**: Use `lottie-react` for the checks and attention animations in the Comparison Table.

## D. Exact Implementation Files Likely to Change
- `src/app/layout.tsx` (Add cursor, SVG filters, loading state)
- `src/app/page.tsx` (Update hero, add chromatic waves, drag cards)
- `src/components/Header.tsx` (Convert to fullscreen menu + magnetic button)
- `src/components/CinovaSystem.tsx` (Add text path, drag cards)
- `src/app/globals.css` (Add utility classes for animations)
- **[NEW]** `src/components/ui/CustomCursor.tsx`
- **[NEW]** `src/components/ui/ChromaticWaves.tsx`
- **[NEW]** `src/components/ui/GlitterCanvas.tsx`
- **[NEW]** `src/components/ui/MagneticButton.tsx`

## E. Component-by-Component Visual Strategy
1. **Layout & Cursor**: Wrap children in a client provider for cursor tracking. Use `framer-motion` `useSpring` for smooth follower lag.
2. **Hero**: Rebuild the image masonry using CSS Grid and `framer-motion` `useScroll` for scroll-linked parallax.
3. **Backgrounds (WebGL)**: Create standalone React components for `ChromaticWaves` and `GlitterCanvas`. They **must** accept a `pause` prop or use an internal `IntersectionObserver` to halt `requestAnimationFrame` when off-screen.
4. **Data Routes (Solutions/Industries/Work)**: Share the `MagneticButton` and Liquid Glass filters, but do not inject WebGL backgrounds into every single sub-page to keep navigation fast. Use `Inkbleed` for case study hero images.

## F. Animation and Interaction Specification
- **Hover**: Magnetic pull on buttons (radius ~40px). Image scale up (1.05) on case study cards.
- **Scroll**: Sections fade up (`y: 40`, `opacity: 0` to `1`) using `whileInView` with a 0.2 threshold.
- **Transitions**: Page transitions should be handled natively by Next.js, but initial load will use the black loading screen sliding up.

## G. Mobile and Reduced-Motion Strategy
- **Mobile**: Disable custom cursor entirely. Disable magnetic button pull. Switch horizontal drag cards to native `overflow-x: auto; scroll-snap-type: x mandatory`.
- **Reduced Motion**: Use CSS `@media (prefers-reduced-motion: reduce)` to disable parallax, pause WebGL backgrounds, and default all `framer-motion` transition durations to `0`.

## H. Performance Safeguards
> [!WARNING]
> WebGL backgrounds and scroll listeners are the biggest risk to the site's performance.
- **RAF Limits**: WebGL loops will ONLY run if the canvas is intersecting the viewport.
- **Libraries**: Do not install heavy animation libraries like GSAP. Stick to `framer-motion` and vanilla React/WebGL.
- **Images**: Ensure all hero gallery images are Next.js `<Image>` components with `priority={true}` for LCP, and the rest are lazy-loaded.
- **Canvas limits**: Limit pixel ratio to `Math.min(window.devicePixelRatio, 2)` to save GPU on high-res screens.

## I. Phase C Sub-Phases
To ensure safe, reviewable progress, Phase C is split:

### Phase C.1: Global Interactions & Header
- Implement `CustomCursor.tsx`.
- Implement `MagneticButton.tsx` (from Assets).
- Update `Header.tsx` to the fullscreen menu.
- Add Liquid Glass SVG to `layout.tsx`.

### Phase C.2: Hero & Backgrounds
- Create `ChromaticWaves.tsx` (porting `reference_chromatic-waves.js`).
- Rebuild the Hero section in `page.tsx` with the image gallery.

### Phase C.3: Scrolling Content & Draggables
- Implement horizontal scroll/drag for Services and Projects cards.
- Add `Text_path` / `Text_ring` components.
- Implement the Comparison Table with Lottie animations.

### Phase C.4: Polish & Performance Pass
- Implement the Loading Screen overlay.
- Apply scroll-reveal animations across all pages.
- Final mobile and reduced-motion audits.

## J. Exact Build Verification
After each sub-phase:
1. `npm run build` must pass with 0 errors.
2. Lighthouse performance score should remain > 85 on desktop.
3. Verify no layout shift (CLS) occurs on load.

## K. Things Explicitly NOT to Change
- The data models (`solutions.ts`, `caseStudies.ts`, etc.)
- The Next.js App Router structure (`/for/[industry]`, etc.)
- The core typography and color variables in `globals.css` (they are already correct).

## L. Recommended Execution Order
Proceed with **Phase C.1** first.
