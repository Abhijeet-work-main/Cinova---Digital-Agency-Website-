import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";
import CaseStudies from "../../components/CaseStudies";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore Cinova's client work — brand campaigns, paid media, websites, and creative systems built for luxury retail, creators, and growth-focused brands.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work | Cinova",
    description:
      "Explore Cinova's client work — brand campaigns, paid media, websites, and creative systems built for luxury retail, creators, and growth-focused brands.",
    url: "/work",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/hero-cinematic.png",
        width: 1920,
        height: 1080,
        alt: "Cinova client work portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Cinova",
    description:
      "Explore Cinova's client work — brand campaigns, paid media, websites, and creative systems.",
    images: ["/hero-cinematic.png"],
  },
};

export default function WorkPage() {
  return (
    <div className="work-page-root">
      <Header />

      <main>
        <CaseStudies />
      </main>

      <SharedPageClosing />

      <style>{`
        .work-page-root {
          background-color: var(--bg-primary);
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
