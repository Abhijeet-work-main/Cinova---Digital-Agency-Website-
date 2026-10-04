"use client";

import React from "react";
import Header from "../../components/Header";
import SharedPageClosing from "../../components/SharedPageClosing";
import CaseStudies from "../../components/CaseStudies";

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
