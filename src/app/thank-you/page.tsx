import React, { Suspense } from "react";
import type { Metadata } from "next";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";
import ThankYouClient from "../../components/ThankYouClient";

export const metadata: Metadata = {
  title: "Booking Confirmed | Cinova",
  description: "Your free strategy call with Cinova is confirmed.",
  alternates: {
    canonical: "/thank-you",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function ThankYouFallback() {
  return (
    <div
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "10rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
        Loading your booking confirmation...
      </p>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <main>
        <Suspense fallback={<ThankYouFallback />}>
          <ThankYouClient />
        </Suspense>
      </main>

      <SharedPageClosing />
    </div>
  );
}
