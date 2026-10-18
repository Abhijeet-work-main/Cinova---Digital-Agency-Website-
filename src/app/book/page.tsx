import React from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book Your Free Strategy Call | Cinova",
  description:
    "Schedule a free 30-minute growth diagnostic with Cinova. We identify your conversion bottlenecks and leave you with a clear, actionable growth plan.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book Your Free Strategy Call | Cinova",
    description:
      "Schedule a free 30-minute growth diagnostic with Cinova. We identify your conversion bottlenecks and leave you with a clear, actionable growth plan.",
    url: "/book",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/hero-cinematic.png",
        width: 1920,
        height: 1080,
        alt: "Book a free strategy call with Cinova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Free Strategy Call | Cinova",
    description:
      "Schedule a free 30-minute growth diagnostic with Cinova.",
    images: ["/hero-cinematic.png"],
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What happens on the call?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We run a live diagnostic across your funnel, creative, and distribution setup. You get specific, prioritized observations and a clear set of next actions before the call ends.",
      },
    },
    {
      "@type": "Question",
      name: "Is it really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, 100%. We use this call to evaluate whether our approach aligns with your growth stage. You receive our diagnostic insights and recommendations regardless of whether we end up working together.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to prepare anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Having your website link, current performance benchmarks (traffic, conversion rates, or ad metrics if applicable), and your primary goal for the next 3 to 6 months will help us deliver maximum value.",
      },
    },
    {
      "@type": "Question",
      name: "Which time zone are the slots in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Slots are shown in your local browser time zone automatically. The Cinova team is based in India (IST, UTC+5:30) and takes calls across global time zones.",
      },
    },
    {
      "@type": "Question",
      name: "Can I reschedule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, use the link in your confirmation email.",
      },
    },
    {
      "@type": "Question",
      name: "What if I am not ready to hire yet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That is completely fine. The call is designed to be genuinely useful regardless of timing. Many clients book a second call months later when the time is right, having already validated our thinking.",
      },
    },
  ],
};

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Header />
      <BookPageClient />
    </>
  );
}
