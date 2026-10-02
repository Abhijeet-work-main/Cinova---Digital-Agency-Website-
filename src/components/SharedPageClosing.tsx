"use client";

import React from "react";
import CTA from "./CTA";
import ContactSection from "./ContactSection";
import FooterCard from "./FooterCard";

export default function SharedPageClosing() {
  return (
    <>
      <CTA />
      <ContactSection />
      <footer role="contentinfo">
        <FooterCard />
      </footer>
    </>
  );
}
