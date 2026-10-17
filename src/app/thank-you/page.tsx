import React, { Suspense } from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import FooterCard from "../../components/FooterCard";
import ThankYouClient from "../../components/ThankYouClient";

export const metadata: Metadata = {
  title: "Booking Confirmed | Cinova",
  description: "Your free strategy call with Cinova is confirmed.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function ThankYouFallback() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "10rem 1.5rem", textAlign: "center" }}>
      <p style={{ color: "#888888", fontSize: "1rem" }}>Loading your booking confirmation…</p>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div style={{ backgroundColor: "var(--text-primary)", minHeight: "100vh", color: "#FAFAFA" }}>
      <Header />

      <main>
        <Suspense fallback={<ThankYouFallback />}>
          <ThankYouClient />
        </Suspense>
      </main>

      <footer role="contentinfo">
        <FooterCard />
      </footer>
    </div>
  );
}
