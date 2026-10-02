"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";

const TIERS = [
  {
    index: "01", id: "starter", name: "Starter", price: "$2,999", period: "/mo",
    tagline: "A focused starting engagement for brands building their growth foundation.",
    scope: [
      { label: "Shoot Days", value: "1 day/month" },
      { label: "Reels", value: "10 reels" },
      { label: "Platforms", value: "2 platforms" },
      { label: "Posts", value: "16 posts/month" },
      { label: "Creative Format", value: "Static + basic templates" },
      { label: "Paid Media", value: "Meta only — 1 campaign" },
      { label: "Landing Page", value: "An advanced 3D website" },
      { label: "Influencer", value: "1 influencer" },
      { label: "Strategy", value: "Monthly strategy call" },
      { label: "Account Manager", value: "Shared AM" },
      { label: "Reporting", value: "Monthly report" },
      { label: "Turnaround", value: "5–7 days" },
      { label: "Min. Ad Spend", value: "$500–$1,000/mo" },
    ],
  },
  {
    index: "02", id: "growth", name: "Growth", price: "$4,999", period: "/mo",
    tagline: "A broader and more sustained growth system across multiple channels.",
    scope: [
      { label: "Shoot Days", value: "2 days/month" },
      { label: "Reels", value: "15-18 reels" },
      { label: "Platforms", value: "3 platforms" },
      { label: "Posts", value: "24 posts/month" },
      { label: "Creative Format", value: "Static + motion graphics" },
      { label: "Paid Media", value: "Meta + Google multi-campaign" },
      { label: "Landing Page", value: "Advanced 3D website + CRO" },
      { label: "Influencer", value: "3 influencers" },
      { label: "Strategy", value: "Biweekly strategy calls" },
      { label: "Account Manager", value: "Dedicated AM" },
      { label: "Reporting", value: "Biweekly report" },
      { label: "Turnaround", value: "3–5 days" },
      { label: "Min. Ad Spend", value: "$2,000–$4,000/mo" },
    ],
  },
  {
    index: "03", id: "leadership", name: "Full-Stack Partnership", price: "$7,999", period: "/mo",
    tagline: "Deep ongoing strategic and executional partnership across the full growth system.",
    scope: [
      { label: "Shoot Days", value: "4 shoots in a month (one per week)" },
      { label: "Reels", value: "20-25 reels" },
      { label: "Platforms", value: "All major platforms" },
      { label: "Posts", value: "30+ posts/month" },
      { label: "Creative Format", value: "Full suite + 3D elements" },
      { label: "Paid Media", value: "Meta + Google + TikTok full funnel" },
      { label: "Landing Page", value: "Advanced 3D website + CRO + ongoing expansion" },
      { label: "Influencer", value: "5+ influencers" },
      { label: "Strategy", value: "Weekly strategy sessions" },
      { label: "Account Manager", value: "Senior + dedicated AM" },
      { label: "Reporting", value: "Weekly dashboard + full monthly review" },
      { label: "Turnaround", value: "24–48 hrs (priority)" },
      { label: "Min. Ad Spend", value: "$5,000–$12,000/mo" },
    ],
  },
] as const;


function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function PricingPage() {
  return (
    <div className="pxp-root">
      <Header />
      <main>
        <PricingHero />
        <EngagementContextSection />
        <ProofStrip />
        <ModelsSection />
        <PricingProjectsSection />
        <PricingReviewsSection />
        <DecisionReassuranceSection />
      </main>
      <SharedPageClosing />
      <style>{STYLES}</style>
    </div>
  );
}

function PricingHero() {
  return (
    <section className="pxp-hero" aria-label="Pricing overview">
      <div className="pxp-hero__inner">
        <span className="pxp-eyebrow">Engagement Models</span>
        <h1 className="pxp-hero__headline">
          Choose the level of partnership
          <br />
          <em className="pxp-hero__headline-em">your growth requires.</em>
        </h1>
        <p className="pxp-hero__sub">
          Three structured engagement models. Each is a structured engagement
          not a bundle of isolated services. The difference between them is capacity,
          speed, and depth of partnership.
        </p>
        <div className="pxp-hero__actions">
          <a href="#models" className="pxp-btn-primary">Explore the models</a>
          <Link href="/#contact" className="pxp-btn-ghost">Talk to us &#8594;</Link>
        </div>
      </div>
      <div className="pxp-hero__rule" aria-hidden="true" />
    </section>
  );
}

function ModelsSection() {
  return (
    <section id="models" className="pxp-models-section" aria-label="Engagement models">
      <div className="pxp-models-inner">
        <div className="pxp-section-header">
          <span className="pxp-eyebrow">Three Models</span>
          <h2 className="pxp-section-h2">A comprehensive engagement at every level</h2>
          <p className="pxp-section-header__sub">
            Each model combines production, distribution, paid media, and strategic
            leadership. Scope, speed, and depth scale as you move up.
          </p>
        </div>
        <div className="pxp-models-grid">
          {TIERS.map((tier, i) => (
            <ModelCard key={tier.id} tier={tier} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({ tier, delay }: { tier: typeof TIERS[number]; delay: number }) {
  const { ref, visible } = useReveal();
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`pxp-model-card pxp-model-card--${tier.id}${visible ? " pxp-model-card--visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={`${tier.name} engagement model`}
    >
      <div className="pxp-model-card__top">
        <span className="pxp-model-card__index" aria-hidden="true">{tier.index}</span>
        <div>
          <h2 className="pxp-model-card__name">{tier.name}</h2>
          <p className="pxp-model-card__tagline">{tier.tagline}</p>
        </div>
      </div>
      <div className="pxp-model-card__price-row">
        <span className="pxp-model-card__price">{tier.price}</span>
        <span className="pxp-model-card__period">{tier.period}</span>
      </div>
      <div className="pxp-model-card__divider" aria-hidden="true" />
      <ul className="pxp-model-card__scope" aria-label={`${tier.name} scope`}>
        {tier.scope.map((item) => (
          <li key={item.label} className="pxp-model-card__scope-item">
            <span className="pxp-model-card__scope-label">{item.label}</span>
            <span className="pxp-model-card__scope-value">
              {item.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="pxp-model-card__footer">
        <Link href="/#contact" className="pxp-model-card__cta" id={`pricing-cta-${tier.id}`}>
          Start a conversation
          <span className="pxp-model-card__cta-arrow" aria-hidden="true"> &#8594;</span>
        </Link>
      </div>
    </article>
  );
}


function EngagementContextSection() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`pxp-engage-ctx ${visible ? "pxp-engage-ctx--visible" : ""}`} aria-label="Why engagement matters">
      <div className="pxp-engage-ctx__inner">
        <h2 className="pxp-engage-ctx__h2">
          Most growth problems aren&apos;t caused by one missing service.<br/>
          <em className="pxp-engage-ctx__em">They&apos;re caused by disconnected pieces.</em>
        </h2>
        <div className="pxp-engage-ctx__grid">
          <div className="pxp-engage-ctx__card">
            <h3>Traffic Without Conversion</h3>
            <p>Your ads may be working. Your funnel may not. Attention is not the problem. Conversion is.</p>
          </div>
          <div className="pxp-engage-ctx__card">
            <h3>Creative Without a System</h3>
            <p>Content without a connected system earns attention for algorithms, not revenue for the business.</p>
          </div>
          <div className="pxp-engage-ctx__card">
            <h3>Vendors Without Accountability</h3>
            <p>Separate agencies own separate parts. When something underperforms, accountability dissolves.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`pxp-proof-strip ${visible ? "pxp-proof-strip--visible" : ""}`} aria-label="Cinova Credibility">
      <div className="pxp-proof-strip__inner">
        <div className="pxp-proof-stat">
          <span className="pxp-proof-stat__num">8+</span>
          <span className="pxp-proof-stat__label">Years</span>
        </div>
        <div className="pxp-proof-stat">
          <span className="pxp-proof-stat__num">120+</span>
          <span className="pxp-proof-stat__label">Projects</span>
        </div>
        <div className="pxp-proof-stat">
          <span className="pxp-proof-stat__num">100%</span>
          <span className="pxp-proof-stat__label">Client Retention</span>
        </div>
      </div>
    </section>
  );
}


const PRICING_PROJECTS = [
  {
    slug: "balbeer",
    client: "Balbeer",
    descriptor: "Videography and social growth strategy for an apparel brand.",
    tags: ["Apparel", "Videography"],
    image1: "/Dummy_Image/Balbeer1.jpg",
    image2: "/Dummy_Image/Balbeer2.jpg",
  },
  {
    slug: "erminio-palamino",
    client: "Erminio Palamino",
    descriptor: "Luxury retail growth through Meta Ads and e-commerce conversion architecture.",
    tags: ["Luxury Retail", "Meta Ads"],
    image1: "/Dummy_Image/erminio1.jpg",
    image2: "/Dummy_Image/erminio2.jpg",
  },
  {
    slug: "noor",
    client: "Noor",
    descriptor: "Custom booking system that automated appointment management entirely.",
    tags: ["Beauty & Bridal", "Web Dev"],
    image1: "/Dummy_Image/noor1.jpg",
    image2: "/Dummy_Image/noor2.jpg",
  },
];

function PricingProjectsSection() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`pxp-projects ${visible ? "pxp-projects--visible" : ""}`} aria-label="Recent Projects">
      <div className="pxp-projects__inner">
        <div className="pxp-section-header pxp-section-header--centered">
          <h2 className="pxp-section-h2">Proven in Production</h2>
          <p className="pxp-section-header__sub">Real problems. Connected thinking. Measurable outcomes.</p>
        </div>
        <div className="prf-row">
          {PRICING_PROJECTS.map((project, i) => {
            const size = i === 1 ? "small" : "tall";
            const isFeatured = i === 1;
            return (
              <Link key={project.slug} href={`/work/${project.slug}`} className={`prf-card prf-card--${size}${isFeatured ? " prf-card--featured" : ""}`}>
                <div className="prf-card__media">
                  <div className="prf-card__pills">
                    {project.tags.map((t) => (
                      <span key={t} className="prf-card__pill">{t}</span>
                    ))}
                  </div>
                  <div className="prf-card__img-main">
                    <Image src={project.image1} alt={project.client} fill sizes="(max-width:680px) 100vw,33vw" style={{ objectFit: "cover" }} priority={isFeatured} />
                  </div>
                  <div className="prf-card__preview" aria-hidden="true">
                    <div className="prf-card__preview-inner">
                      <Image src={project.image2} alt="" fill sizes="22vw" style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                </div>
                <div className="prf-card__info">
                  {isFeatured && (
                    <div className="prf-card__feat-strip" aria-hidden="true">
                      <span className="prf-card__feat-rule" />
                      <span className="prf-card__feat-label">Featured Project</span>
                      <span className="prf-card__feat-rule" />
                    </div>
                  )}
                  <h3 className={`prf-card__title${isFeatured ? " prf-card__title--lime" : ""}`}>{project.client}</h3>
                  <p className="prf-card__desc">{project.descriptor}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    id: 1,
    quote: "Before Cinova, we were throwing money at ads without knowing what was working. They rebuilt our entire approach — the site, the targeting, everything. We finally started seeing real traction.",
    author: "Erminio Palamino",
    role: "Founder, Erminio Palamino",
    initials: "EP",
  },
  {
    id: 2,
    quote: "The content they produced felt genuinely like us. Not polished agency work — actually us. Our Reels started performing in a way they never had before and we didn't have to keep explaining the brand.",
    author: "Balbeer",
    role: "Founder, Balbeer",
    initials: "BA",
  },
  {
    id: 3,
    quote: "We used to manage bookings manually across three different tools. Cinova built us something clean and simple that just works. Clients notice the difference and so do we.",
    author: "Noor",
    role: "Founder, Noor Studio",
    initials: "NO",
  },
  {
    id: 4,
    quote: "Our channel had solid content but the packaging was holding us back. Cinova changed how we think about thumbnails, titles, everything. The numbers tell the story — 32,000 views on a single video.",
    author: "PBInvesting",
    role: "Creator, PBInvesting",
    initials: "PB",
  },
];

function PricingReviewsSection() {
  const [current, setCurrent] = useState(0);
  const total = REVIEWS.length;
  const review = REVIEWS[current];
  const { ref, visible } = useReveal();
  
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`pxp-reviews ${visible ? "pxp-reviews--visible" : ""}`} aria-label="Client Reviews">
      <div className="pxp-reviews__inner">
        <div className="tst-layout">
          <div className="tst-card" aria-label="Rating summary">
            <span className="tst-plus tst-plus--tl" aria-hidden="true">+</span>
            <span className="tst-plus tst-plus--tr" aria-hidden="true">+</span>
            <span className="tst-plus tst-plus--bl" aria-hidden="true">+</span>
            <span className="tst-plus tst-plus--br" aria-hidden="true">+</span>
            <div className="tst-card__content">
              <div className="tst-rating-row">
                <span className="tst-rating__num">4.87</span>
                <span className="tst-rating__denom">/5</span>
              </div>
              <p className="tst-rating__sub">Average rating from our clients</p>
              <div className="tst-avatars" aria-label="Client avatars">
                {REVIEWS.map(r => (
                  <span key={r.id} className="tst-avatar" title={r.author} aria-label={r.author}>
                    {r.initials}
                  </span>
                ))}
              </div>
              <p className="tst-trusted">Trusted by 50+ teams</p>
              <a href="mailto:hello@cinova.in?subject=Client%20Feedback" className="tst-review-btn">
                Leave a review
              </a>
            </div>
          </div>
          <div className="tst-right">
            <span className="tst-counter" aria-label={`Testimonial ${current + 1} of ${total}`}>
              0{current + 1} / 0{total}
            </span>
            <blockquote className="tst-quote" key={current}>
              <span className="tst-quote__open" aria-hidden="true">&ldquo;</span>
              {review.quote}
              <span className="tst-quote__close" aria-hidden="true">&rdquo;</span>
            </blockquote>
            <div className="tst-author">
              <span className="tst-author__avatar" aria-hidden="true">{review.initials}</span>
              <div className="tst-author__text">
                <span className="tst-author__name">{review.author}</span>
                <span className="tst-author__role">{review.role}</span>
              </div>
            </div>
            <div className="tst-nav" role="group" aria-label="Navigate testimonials">
              <button className="tst-nav__prev" onClick={prev} aria-label="Previous testimonial">←</button>
              <button className="tst-nav__next" onClick={next} aria-label="Next testimonial">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionReassuranceSection() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`pxp-reassurance ${visible ? "pxp-reassurance--visible" : ""}`} aria-label="Decision Reassurance">
      <div className="pxp-reassurance__inner">
        <h2 className="pxp-section-h2">Not sure which level fits?</h2>
        <p className="pxp-reassurance__p">
          You don&apos;t need to choose based on a pricing table alone. Tell us what you&apos;re trying to improve, where the current system is breaking, and what you&apos;re building. We&apos;ll tell you which level makes sense &mdash; or whether we&apos;re the right fit at all.
        </p>
        <p className="pxp-reassurance__transition">
          Don&apos;t choose from a table.<br/>
          <em className="pxp-reassurance__em">Diagnose the gap first.</em>
        </p>
      </div>
    </section>
  );
}

const STYLES = `
.pxp-root { background-color: var(--bg-primary); min-height: 100vh; }

.pxp-eyebrow {
  display: inline-block;
  font-family: var(--font-primary);
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 1.25rem;
}
.pxp-eyebrow--light { color: rgba(255,255,255,0.45); }

.pxp-section-h2 {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 600; color: var(--text-primary);
  line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 1rem;
}

.pxp-section-header { margin-bottom: 4rem; }
.pxp-section-header--centered {
  text-align: center; max-width: 700px;
  margin-left: auto; margin-right: auto; margin-bottom: 4rem;
}
.pxp-section-header__sub {
  font-family: var(--font-primary);
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: var(--text-secondary); line-height: 1.7;
  max-width: 600px; margin: 0;
}
.pxp-section-header--centered .pxp-section-header__sub { margin: 0 auto; }

.pxp-btn-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--accent-primary); color: var(--text-primary);
  font-family: var(--font-primary); font-size: 0.88rem; font-weight: 600;
  padding: 0.8rem 1.75rem; border-radius: 100px; text-decoration: none;
  letter-spacing: 0.01em; white-space: nowrap;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.pxp-btn-primary:hover {
  background: var(--accent-hover); transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(182,245,0,0.2);
}
.pxp-btn-primary--large { font-size: 1rem; padding: 1rem 2.25rem; }

.pxp-btn-ghost {
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: transparent; color: var(--text-secondary);
  font-family: var(--font-primary); font-size: 0.88rem; font-weight: 500;
  padding: 0.8rem 0; text-decoration: none; white-space: nowrap;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  transition: color 0.2s ease, border-color 0.2s ease;
}
.pxp-btn-ghost:hover { color: var(--text-primary); border-color: rgba(0,0,0,0.35); }
.pxp-btn-ghost--light { color: rgba(255,255,255,0.6); border-bottom-color: rgba(255,255,255,0.18); }
.pxp-btn-ghost--light:hover { color: #fff; border-color: rgba(255,255,255,0.5); }

.pxp-hero {
  padding: 11rem 2rem 7rem; background: var(--bg-primary);
  position: relative; overflow: hidden;
}
.pxp-hero::before {
  content: ''; position: absolute; top: -80px; right: -100px;
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(182,245,0,0.05) 0%, transparent 65%);
  pointer-events: none;
}
.pxp-hero__inner { max-width: 1100px; margin: 0 auto; }
.pxp-hero__headline {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5.5vw, 4.5rem); font-weight: 600;
  color: var(--text-primary); line-height: 1.1; letter-spacing: -0.025em;
  margin: 0 0 1.75rem; max-width: 820px;
}
.pxp-hero__headline-em { font-style: italic; color: var(--text-primary); opacity: 0.45; }
.pxp-hero__sub {
  font-family: var(--font-primary);
  font-size: clamp(1rem, 2vw, 1.2rem); color: var(--text-secondary);
  line-height: 1.7; max-width: 580px; margin: 0 0 3rem;
}
.pxp-hero__actions { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
.pxp-hero__rule {
  margin: 6rem auto 0;
  height: 1px; max-width: 1100px;
  background: linear-gradient(90deg, var(--accent-primary) 0%, rgba(182,245,0,0) 60%);
}

.pxp-models-section { padding: 7rem 2rem 9rem; background: var(--bg-secondary); }
.pxp-models-inner { max-width: 1200px; margin: 0 auto; }
.pxp-models-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid rgba(0,0,0,0.07); border-radius: 16px; overflow: hidden;
  box-shadow: 0 2px 32px rgba(0,0,0,0.05);
}

.pxp-model-card {
  background: var(--bg-primary); padding: 3rem 2.5rem;
  display: flex; flex-direction: column;
  border-right: 1px solid rgba(0,0,0,0.07);
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1);
  position: relative;
}
.pxp-model-card:last-child { border-right: none; }
.pxp-model-card--visible { opacity: 1; transform: translateY(0); }
.pxp-model-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 2px; background: var(--accent-primary); opacity: 0;
  transition: opacity 0.25s ease;
}
.pxp-model-card:hover::before { opacity: 1; }

.pxp-model-card__top { display: flex; align-items: flex-start; gap: 1.25rem; margin-bottom: 2rem; }
.pxp-model-card__index {
  font-family: var(--font-primary); font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.1em; color: var(--text-muted); flex-shrink: 0; margin-top: 0.3rem;
}
.pxp-model-card__name {
  font-family: var(--font-display); font-size: clamp(1.25rem, 2vw, 1.6rem);
  font-weight: 600; color: var(--text-primary); line-height: 1.2; margin: 0 0 0.4rem;
}
.pxp-model-card__tagline {
  font-family: var(--font-primary); font-size: 0.875rem;
  color: var(--text-secondary); line-height: 1.55; margin: 0;
}
.pxp-model-card__price-row { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 2rem; }
.pxp-model-card__price {
  font-family: var(--font-primary); font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 500; color: var(--text-primary); letter-spacing: -0.04em; line-height: 1;
}
.pxp-model-card__period { font-family: var(--font-primary); font-size: 0.95rem; color: var(--text-muted); }
.pxp-model-card__divider { height: 1px; background: rgba(0,0,0,0.07); margin-bottom: 2rem; }
.pxp-model-card__scope { list-style: none; padding: 0; margin: 0; flex: 1; display: flex; flex-direction: column; }
.pxp-model-card__scope-item {
  display: flex; flex-direction: column; gap: 0.1rem;
  padding: 0.65rem 0; border-bottom: 1px solid rgba(0,0,0,0.045);
}
.pxp-model-card__scope-item:last-child { border-bottom: none; }
.pxp-model-card__scope-label {
  font-family: var(--font-primary); font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-muted);
}
.pxp-model-card__scope-value {
  font-family: var(--font-primary); font-size: 0.9rem; color: var(--text-primary); line-height: 1.4;
}
.pxp-model-card__scope-value--muted { color: var(--text-muted); font-style: italic; }
.pxp-model-card__footer { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.07); }
.pxp-model-card__cta {
  display: inline-flex; align-items: center; gap: 0.45rem;
  font-family: var(--font-primary); font-size: 0.875rem; font-weight: 500;
  color: var(--text-secondary); text-decoration: none;
  transition: color 0.2s ease, gap 0.2s ease;
}
.pxp-model-card__cta:hover { color: var(--text-primary); gap: 0.7rem; }
.pxp-model-card__cta-arrow { transition: transform 0.2s ease; }
.pxp-model-card__cta:hover .pxp-model-card__cta-arrow { transform: translateX(3px); }


/* Engagement Context */
.pxp-engage-ctx { padding: 3rem 2rem 4rem; background: var(--bg-primary); opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.pxp-engage-ctx--visible { opacity: 1; transform: translateY(0); }
.pxp-engage-ctx__inner { max-width: 1100px; margin: 0 auto; }
.pxp-engage-ctx__h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 600; color: var(--text-primary); line-height: 1.2; margin-bottom: 3.5rem; max-width: 800px; }
.pxp-engage-ctx__em { font-style: italic; color: var(--accent-primary); }
.pxp-engage-ctx__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; }
.pxp-engage-ctx__card { padding-top: 1.5rem; border-top: 2px solid rgba(0,0,0,0.06); }
.pxp-engage-ctx__card h3 { font-family: var(--font-display); font-size: 1.3rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; }
.pxp-engage-ctx__card p { font-family: var(--font-primary); font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

/* Proof Strip */
.pxp-proof-strip { padding: 3rem 2rem; background: var(--bg-secondary); border-top: 1px solid rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.04); opacity: 0; transition: opacity 0.6s ease; }
.pxp-proof-strip--visible { opacity: 1; }
.pxp-proof-strip__inner { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 3rem; }
.pxp-proof-stat { display: flex; flex-direction: column; gap: 0.2rem; }
.pxp-proof-stat__num { font-family: var(--font-primary); font-size: clamp(3rem, 5vw, 4.5rem); font-weight: 500; color: var(--text-primary); letter-spacing: -0.04em; line-height: 1; }
.pxp-proof-stat__label { font-family: var(--font-primary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); }


/* Projects Section */
.pxp-projects { padding: 5rem 2rem; background: var(--bg-primary); opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.pxp-projects--visible { opacity: 1; transform: translateY(0); }
.pxp-projects__inner { max-width: 1360px; margin: 0 auto; }

/* Proof Grid from Homepage */
.prf-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; align-items: start; }
.prf-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; position: relative; }
.prf-card__media { position: relative; border-radius: 10px; overflow: hidden; background: #1c1c1c; margin-bottom: 1rem; }
.prf-card--tall .prf-card__media { aspect-ratio: 3 / 4; }
.prf-card--small .prf-card__media { aspect-ratio: 4 / 3; }
.prf-card--featured .prf-card__media { border-top: 3px solid var(--accent-primary); }
.prf-card__img-main { position: absolute; inset: 0; transition: filter 0.55s ease, transform 0.55s ease; }
.prf-card:hover .prf-card__img-main { filter: blur(7px) brightness(0.65); transform: scale(1.04); }
.prf-card__preview { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transform: scale(0.88); transition: opacity 0.4s ease 0.06s, transform 0.45s cubic-bezier(0.16,1,0.3,1) 0.06s; z-index: 10; }
.prf-card:hover .prf-card__preview { opacity: 1; transform: scale(1); pointer-events: auto; }
.prf-card__preview-inner { position: relative; width: 64%; aspect-ratio: 16 / 10; border: 2.5px solid rgba(255,255,255,0.92); border-radius: 6px; overflow: hidden; box-shadow: 0 12px 48px rgba(0,0,0,0.55); }
.prf-card__pills { position: absolute; top: 0.9rem; left: 0.9rem; display: flex; gap: 0.4rem; z-index: 20; flex-wrap: wrap; max-width: calc(100% - 1.8rem); }
.prf-card__pill { display: inline-block; background: rgba(8, 8, 8, 0.78); color: #fff; font-family: var(--font-primary); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.025em; padding: 0.26rem 0.65rem; border-radius: 50px; white-space: nowrap; line-height: 1.4; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
.prf-card__info { display: flex; flex-direction: column; gap: 0.35rem; }
.prf-card__feat-strip { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.3rem; }
.prf-card__feat-rule { flex: 1; height: 1px; background: var(--accent-primary); max-width: 40px; }
.prf-card__feat-label { font-family: var(--font-primary); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: var(--accent-primary); white-space: nowrap; }
.prf-card__title { font-family: var(--font-display); font-size: clamp(1.15rem, 1.8vw, 1.5rem); font-weight: 600; color: var(--text-primary); line-height: 1.2; margin: 0; transition: color 0.2s ease; }
.prf-card__title--lime { color: var(--accent-primary); }
.prf-card:hover .prf-card__title { color: var(--text-primary); }
.prf-card--featured:hover .prf-card__title { color: var(--accent-primary); }
.prf-card__desc { font-family: var(--font-primary); font-size: 0.88rem; color: var(--text-muted); line-height: 1.55; margin: 0; }

/* Reviews Section */
.pxp-reviews { padding: 5rem 2rem; background: #f5f5f3; opacity: 0; transition: opacity 0.6s ease; border-top: 1px solid rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.04); }
.pxp-reviews--visible { opacity: 1; }
.pxp-reviews__inner { max-width: 1200px; margin: 0 auto; }

/* Testimonial Grid from Homepage */
.tst-layout { display: grid; grid-template-columns: 340px 1fr; gap: 5rem; align-items: start; }
.tst-card { position: relative; background: #fff; border: 1px solid rgba(0,0,0,0.07); border-radius: 28px; padding: 3rem 2.5rem; text-align: center; }
.tst-card__content { display: flex; flex-direction: column; align-items: center; gap: 0; }
.tst-plus { position: absolute; font-size: 1.1rem; font-weight: 300; color: rgba(0,0,0,0.25); line-height: 1; pointer-events: none; user-select: none; }
.tst-plus--tl { top: 14px; left: 14px; }
.tst-plus--tr { top: 14px; right: 14px; }
.tst-plus--bl { bottom: 14px; left: 14px; }
.tst-plus--br { bottom: 14px; right: 14px; }
.tst-rating-row { display: flex; align-items: baseline; gap: 0.15rem; margin-bottom: 0.4rem; }
.tst-rating__num { font-family: 'Inter', system-ui, sans-serif; font-size: 4.5rem; font-weight: 700; color: var(--text-primary); line-height: 1; letter-spacing: -0.04em; }
.tst-rating__denom { font-family: 'Inter', system-ui, sans-serif; font-size: 1.8rem; font-weight: 600; color: rgba(10,10,10,0.4); letter-spacing: -0.02em; }
.tst-rating__sub { font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; font-weight: 400; color: var(--text-muted); margin-bottom: 2rem; }
.tst-avatars { display: flex; flex-direction: row; justify-content: center; margin-bottom: 0.75rem; }
.tst-avatar { width: 40px; height: 40px; border-radius: 50%; background: #e8e8e8; color: var(--text-primary); font-family: 'Inter', system-ui, sans-serif; font-size: 0.72rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; border: 2px solid #fff; margin-left: -8px; }
.tst-avatar:first-child { margin-left: 0; }
.tst-trusted { font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; font-weight: 400; color: var(--text-muted); margin-bottom: 2.5rem; }
.tst-review-btn { display: inline-flex; align-items: center; justify-content: center; width: 100%; background: var(--text-primary); color: #fff; font-family: 'Inter', system-ui, sans-serif; font-size: 0.9rem; font-weight: 500; padding: 0.9rem 1.5rem; border-radius: 12px; text-decoration: none; transition: background 0.2s ease; }
.tst-review-btn:hover { background: #222; }

.tst-right { display: flex; flex-direction: column; gap: 2.5rem; padding-top: 0.5rem; }
.tst-counter { font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0.05em; }
.tst-quote { font-family: 'Inter', system-ui, sans-serif; font-size: clamp(1.6rem, 2.5vw, 2.25rem); font-style: italic; font-weight: 600; color: var(--text-primary); line-height: 1.35; letter-spacing: -0.02em; margin: 0; animation: tst-reveal 0.35s ease; }
.tst-quote__open, .tst-quote__close { font-style: normal; opacity: 0.7; }
@keyframes tst-reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.tst-author { display: flex; align-items: center; gap: 1rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.07); }
.tst-author__avatar { width: 52px; height: 52px; border-radius: 50%; background: #e2e2e2; font-family: 'Inter', system-ui, sans-serif; font-size: 0.85rem; font-weight: 600; color: var(--text-primary); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tst-author__text { display: flex; flex-direction: column; gap: 0.2rem; }
.tst-author__name { font-family: 'Inter', system-ui, sans-serif; font-size: 1rem; font-weight: 600; color: var(--text-primary); }
.tst-author__role { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; font-weight: 400; color: var(--text-muted); }

.tst-nav { display: flex; align-items: center; gap: 0.6rem; }
.tst-nav__prev, .tst-nav__next { width: 48px; height: 48px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s ease; line-height: 1; }
.tst-nav__prev { background: transparent; border: 1.5px solid rgba(0,0,0,0.2); color: var(--text-primary); }
.tst-nav__prev:hover { border-color: rgba(0,0,0,0.5); background: rgba(0,0,0,0.04); }
.tst-nav__next { background: var(--text-primary); border: none; color: #fff; }
.tst-nav__next:hover { background: #333; }

/* Decision Reassurance */

.pxp-reassurance { padding: 5rem 2rem 4rem; background: var(--bg-primary); text-align: center; opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.pxp-reassurance--visible { opacity: 1; transform: translateY(0); }
.pxp-reassurance__inner { max-width: 720px; margin: 0 auto; }
.pxp-reassurance__p { font-family: var(--font-primary); font-size: clamp(1rem, 2vw, 1.15rem); color: var(--text-secondary); line-height: 1.7; margin-bottom: 4rem; }
.pxp-reassurance__transition { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 600; color: var(--text-primary); line-height: 1.15; margin: 0; }
.pxp-reassurance__em { font-style: italic; color: var(--accent-primary); }

@media (max-width: 1024px) {
  .prf-row { grid-template-columns: 1fr 1fr; }
  .prf-row .prf-card:nth-child(3) { grid-column: 1 / -1; }
  .prf-card--tall .prf-card__media { aspect-ratio: 16 / 11; }
  .prf-card--small .prf-card__media { aspect-ratio: 16 / 10; }
  .tst-layout { grid-template-columns: 1fr; gap: 4rem; }
  .tst-card { max-width: 380px; }
}

@media (max-width: 860px) {
  .pxp-models-grid { grid-template-columns: 1fr; }
  .pxp-model-card { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.07); }
  .pxp-model-card:last-child { border-bottom: none; }
  .pxp-hero { padding: 9rem 1.5rem 5rem; }
  
  .pxp-proof-strip__inner { justify-content: flex-start; gap: 2.5rem; }
  
  .pxp-models-section, .pxp-engage-ctx, .pxp-proof-strip, .pxp-projects, .pxp-reviews { padding-left: 1.5rem; padding-right: 1.5rem; }
  .pxp-reassurance { padding: 5rem 1.5rem 4rem; text-align: left; }
}

@media (max-width: 680px) {
  .prf-row { grid-template-columns: 1fr; gap: 2rem; }
  .prf-row .prf-card:nth-child(3) { grid-column: auto; }
  .prf-card--tall .prf-card__media { aspect-ratio: 4 / 3; }
  .prf-card--small .prf-card__media { aspect-ratio: 16 / 9; }
  .prf-card__preview-inner { width: 70%; }
}

@media (max-width: 560px) {
  .pxp-hero__actions { flex-direction: column; align-items: flex-start; gap: 1.25rem; }
  .pxp-model-card { padding: 2.25rem 1.5rem; }
  .tst-quote { font-size: clamp(1.5rem, 5vw, 1.9rem); }
}

@media (prefers-reduced-motion: reduce) {
  .pxp-model-card, .pxp-engage-ctx, .pxp-proof-strip, .pxp-projects, .pxp-reviews, .pxp-reassurance {
    opacity: 1 !important; transform: none !important; transition: none !important;
  }
  .pxp-btn-primary, .pxp-btn-ghost, .pxp-model-card__cta,
  .pxp-model-card__cta-arrow, .pxp-model-card::before { transition: none !important; }
  .prf-card__img-main, .prf-card__preview { transition: none !important; transform: none !important; filter: none !important; }
  .prf-card:hover .prf-card__preview { opacity: 1; }
  .tst-quote { animation: none !important; }
  .tst-nav__prev, .tst-nav__next, .tst-review-btn { transition: none !important; }
}
`;
