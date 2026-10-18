import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../../components/Header";
import SharedPageClosing from "../../../components/SharedPageClosing";
import WorkCard from "../../../components/WorkCard";
import { getBrand, getDiscoverMore, brands } from "../../../data/brands";
import styles from "../../../components/BrandPage.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Not Found" };
  const firstSentence = brand.overview.summary
    ? brand.overview.summary.split(".")[0] + "."
    : `${brand.name} | Cinova case study.`;
  return {
    title: `${brand.name} | Case Study`,
    description: firstSentence,
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${brand.name} | Case Study | Cinova`,
      description: firstSentence,
      url: `/work/${slug}`,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/hero-cinematic.png",
          width: 1920,
          height: 1080,
          alt: `${brand.name} case study: Cinova`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} | Case Study | Cinova`,
      description: firstSentence,
      images: ["/hero-cinematic.png"],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);

  if (!brand) notFound();

  if (brand.comingSoon) {
    return (
      <div className={styles.root} style={{ backgroundColor: "var(--bp-bg)", minHeight: "100vh" }}>
        <Header />
        <main>
          <section className={styles.comingSoon}>
            <img src={brand.cover} alt={`${brand.name} cover`} className={styles.comingSoonCover} />
            <h1 className={styles.comingSoonTitle}>{brand.name}</h1>
            <p className={styles.comingSoonMsg}>Case study coming soon.</p>
            <Link href="/work" className={styles.backLink}>
              &larr; Back to all work
            </Link>
          </section>
        </main>
        <SharedPageClosing />
      </div>
    );
  }

  const discoverBrands = getDiscoverMore(slug);

  return (
    <div className={styles.root} style={{ backgroundColor: "var(--bp-bg)", minHeight: "100vh" }}>
      <Header />

      <main>
        {/* 1. HERO */}
        <section className={styles.hero} id="brand-hero">
          <div className={styles.heroGrid}>
            <ul className={styles.metaList}>
              <li className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>{brand.client}</span>
              </li>
              <li className={styles.metaItem}>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaValue}>{brand.duration}</span>
              </li>
              <li className={styles.metaItem}>
                <span className={styles.metaLabel}>Date</span>
                <span className={styles.metaValue}>{brand.date}</span>
              </li>
            </ul>

            <div className={styles.heroContent}>
              <span className={styles.heroService}>#{brand.services[0]}</span>
              <h1 className={styles.heroHeadline}>{brand.cardLine}</h1>
              <p className={styles.heroSub}>
                {brand.overview.summary.split(".")[0]}.
              </p>
              <a href="#brand-banner" className={styles.heroCta}>
                Scroll to explore
              </a>
            </div>
          </div>
        </section>

        {/* 2. BANNER */}
        <section className={styles.banner} id="brand-banner">
          <div className={styles.bannerInner}>
            <img src={brand.banner} alt={`${brand.name} banner`} className={styles.bannerImg} />
          </div>
        </section>

        {/* 3. OVERVIEW / CHALLENGE / SOLUTION */}
        <section className={styles.contentSection}>
          <div className={styles.contentGrid}>
            <div aria-hidden="true" />
            <div className={styles.contentRight}>
              <div className={styles.block}>
                <h2 className={styles.blockHeading}>Overview</h2>
                <p className={styles.blockBody}>{brand.overview.summary}</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockHeading}>The challenge</h2>
                <p className={styles.challengeHeadline}>{brand.challenge.headline}</p>
                <p className={styles.blockBody}>{brand.challenge.body}</p>
                <ul className={styles.pains}>
                  {brand.challenge.pains.map((pain, i) => (
                    <li key={i} className={styles.pain}>{pain}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.blockHeading}>Our solution</h2>
                <div className={styles.workstreams}>
                  {brand.solution.map((ws, i) => (
                    <div key={i} className={styles.workstream}>
                      <p className={styles.workstreamNum}>0{i + 1}</p>
                      <h3 className={styles.workstreamTitle}>{ws.title}</h3>
                      <p className={styles.workstreamDesc}>{ws.description}</p>
                      {ws.deliverables.length > 0 && (
                        <div className={styles.deliverables}>
                          {ws.deliverables.map((d) => (
                            <span key={d} className={styles.deliverable}>{d}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CREATIVE */}
        {brand.creative.length > 0 && (
          <section className={styles.creative}>
            <div className={styles.creativeInner}>
              {brand.creative.length === 1 && (
                <div className={`${styles.creativeRow} ${styles.one}`}>
                  <img src={brand.creative[0]} alt={`${brand.name} creative`} className={styles.creativeImg} />
                </div>
              )}
              {brand.creative.length === 2 && (
                <div className={`${styles.creativeRow} ${styles.two}`}>
                  {brand.creative.map((src, i) => (
                    <img key={i} src={src} alt={`${brand.name} creative ${i + 1}`} className={styles.creativeImg} />
                  ))}
                </div>
              )}
              {brand.creative.length >= 3 && (
                <>
                  <div className={`${styles.creativeRow} ${styles.two}`}>
                    <img src={brand.creative[0]} alt={`${brand.name} creative 1`} className={styles.creativeImg} />
                    <img src={brand.creative[1]} alt={`${brand.name} creative 2`} className={styles.creativeImg} />
                  </div>
                  <div className={`${styles.creativeRow} ${styles.one}`}>
                    <img src={brand.creative[2]} alt={`${brand.name} creative 3`} className={styles.creativeImg} />
                  </div>
                  {brand.creative[3] && (
                    <div className={`${styles.creativeRow} ${styles.one}`}>
                      <img src={brand.creative[3]} alt={`${brand.name} creative 4`} className={styles.creativeImg} />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {/* 5. CONCLUSION */}
        <section className={styles.conclusion}>
          <div className={styles.conclusionInner}>
            <h2 className={styles.conclusionHeading}>Conclusion</h2>
            <div className={styles.outcomes}>
              {brand.results.outcomes.map((o, i) => (
                <p key={i} className={styles.outcomeText}>{o}</p>
              ))}
            </div>
            {brand.results.metrics.some((m) => m.value !== "") && (
              <div className={styles.metrics}>
                {brand.results.metrics
                  .filter((m) => m.value !== "")
                  .map((m) => (
                    <div key={m.label} className={styles.metric}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* 6. DISCOVER MORE */}
        {discoverBrands.length > 0 && (
          <section className={styles.discoverMore}>
            <hr className={styles.discoverHairline} />
            <div className={styles.discoverInner}>
              <div className={styles.discoverHeader}>
                <div className={styles.discoverLeft}>
                  <span className={styles.discoverIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                  </span>
                  <span className={styles.discoverLabel}>Discover more</span>
                </div>
                <div className={styles.discoverRight}>
                  <p className={styles.discoverHeading}>
                    <span className={styles.discoverLine1}>Want to check more?</span><br />
                    <span className={styles.discoverLine2}>Discover our other projects.</span>
                  </p>
                </div>
              </div>

              <div className={styles.discoverGrid}>
                {discoverBrands.map((b) => (
                  <WorkCard
                    key={b.slug}
                    slug={b.slug}
                    title={b.name}
                    description={b.cardLine}
                    tags={b.services.slice(0, 2)}
                    cover={b.cover}
                    logo={b.logo}
                    size="mid"
                    headingTag="h3"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SharedPageClosing />
    </div>
  );
}