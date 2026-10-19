import type { Metadata } from "next";
import PricingClient from "../../components/PricingClient";

export const metadata: Metadata = {
  title: "Engagement Models & Pricing",
  description:
    "Explore Cinova's three engagement tiers: Starter, Growth Retainer, and Full-Stack Partnership. Transparent pricing for brands ready to build a connected growth system.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Engagement Models & Pricing | Cinova",
    description:
      "Explore Cinova's three engagement tiers: Starter, Growth Retainer, and Full-Stack Partnership. Transparent pricing for brands ready to build a connected growth system.",
    url: "/pricing",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/hero-cinematic.png",
        width: 1920,
        height: 1080,
        alt: "Cinova engagement models and pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engagement Models & Pricing | Cinova",
    description:
      "Starter, Growth Retainer, and Full-Stack Partnership: transparent pricing for connected growth.",
    images: ["/hero-cinematic.png"],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
