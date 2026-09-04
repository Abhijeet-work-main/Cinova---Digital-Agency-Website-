import React from "react";

const DATA = {
  tiers: [
    { id: "starter", name: "Starter Engagement", price: "$5,000" },
    { id: "growth", name: "Growth Retainer", price: "$9,000" },
    { id: "leadership", name: "Full-Stack Partnership", price: "$15,000" },
  ],
  groups: [
    {
      name: "Production & Creative",
      features: [
        { label: "Shoot Days/Month", values: ["1", "2", "4 (weekly)"] },
        { label: "Reels Delivered", values: ["4–6", "10–12", "16–20"] },
        { label: "Posts/Month", values: ["16", "24", "30+"] },
        { label: "Creatives", values: ["Static + basic templates", "Static + motion graphics", "Full suite + 3D elements"] },
      ],
    },
    {
      name: "Paid Media & Web",
      features: [
        { label: "Platforms Managed", values: ["2", "3", "All major"] },
        { label: "Paid Ads", values: ["Meta only (1 campaign)", "Meta + Google (multi-campaign)", "Meta + Google + TikTok (full funnel)"] },
        { label: "Min. Ad Spend", values: ["$500–$1,000/mo", "$2,000–$4,000/mo", "$5,000–$12,000/mo"] },
        { label: "Website", values: ["✅ 1-page branded landing page (built once)", "✅ Landing page builds + monthly maintenance", "✅ CRO + SEO + new pages on demand"] },
        { label: "Micro-Influencer", values: ["X", "X", "1–2 activations/month"] },
      ],
    },
    {
      name: "Operations & Leadership",
      features: [
        { label: "Strategy Calls", values: ["Monthly (1×)", "Bi-weekly (2×)", "Weekly (4×)"] },
        { label: "Account Manager", values: ["Shared", "Dedicated", "Senior + dedicated"] },
        { label: "Reporting", values: ["Monthly report", "Bi-weekly report", "Weekly dashboard + full monthly review"] },
        { label: "Turnaround", values: ["Standard (5–7 days)", "Standard (3–5 days)", "Priority (24–48 hrs)"] },
      ],
    },
  ],
};

export default function EngagementModels() {
  return (
    <section
      id="engagement-models"
      style={{
        padding: "8rem 2rem",
        backgroundColor: "var(--bg-secondary)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="em-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span
            style={{
              color: "var(--text-muted)",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            Engagement Models
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#ffffff",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
            }}
          >
            Select the capacity your growth engine requires.
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Transparent scope, dedicated asset production, and multi-channel strategy built for your stage.
          </p>
        </div>

        {/* Desktop View (Grid) */}
        <div className="em-desktop em-grid">
          {/* Header Row */}
          <div className="em-cell em-header-cell em-feature-name" style={{ borderTopLeftRadius: "12px" }}>
            Capabilities & Scope
          </div>
          {DATA.tiers.map((tier, idx) => (
            <div
              key={tier.id}
              className="em-cell em-header-cell"
              style={{ borderTopRightRadius: idx === 2 ? "12px" : "0" }}
            >
              <h3 className="em-tier-name">{tier.name}</h3>
              <div className="em-tier-price">{tier.price}<span style={{fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 400}}>/mo</span></div>
            </div>
          ))}

          {/* Features by Group */}
          {DATA.groups.map((group) => (
            <React.Fragment key={group.name}>
              <div className="em-group-header">{group.name}</div>
              {group.features.map((feature) => (
                <React.Fragment key={feature.label}>
                  <div className="em-cell em-feature-name">{feature.label}</div>
                  {feature.values.map((val, i) => (
                    <div
                      key={i}
                      className="em-cell em-value-cell"
                      style={{
                        color: val === "X" ? "var(--text-muted)" : "var(--text-primary)",
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile View (Stacked Cards) */}
        <div className="em-mobile">
          {DATA.tiers.map((tier, tIdx) => (
            <div key={tier.id} className="em-mobile-card">
              <div className="em-mobile-header">
                <h3 className="em-tier-name">{tier.name}</h3>
                <div className="em-tier-price">{tier.price}<span style={{fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400}}>/mo</span></div>
              </div>
              
              {DATA.groups.map((group) => (
                <div key={group.name}>
                  <div className="em-mobile-group">{group.name}</div>
                  <div style={{ paddingBottom: "1rem" }}>
                    {group.features.map((feature) => {
                      const val = feature.values[tIdx];
                      return (
                        <div key={feature.label} className="em-mobile-row">
                          <div className="em-mobile-label">{feature.label}</div>
                          <div
                            className="em-mobile-value"
                            style={{
                              color: val === "X" ? "var(--text-muted)" : "var(--text-primary)",
                            }}
                          >
                            {val}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .em-container {
          max-width: 1400px;
          margin: 0 auto;
          color: var(--text-primary);
        }
        .em-grid {
          display: grid;
          grid-template-columns: minmax(220px, 1.2fr) repeat(3, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        .em-cell {
          background: var(--bg-primary);
          padding: 1.5rem;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
        }
        .em-header-cell {
          background: rgba(255, 255, 255, 0.02);
          padding: 2.5rem 1.5rem;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .em-tier-name {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .em-tier-price {
          font-size: 1.4rem;
          color: var(--accent-primary);
          font-weight: 500;
        }
        .em-group-header {
          grid-column: 1 / -1;
          background: rgba(255, 255, 255, 0.02);
          padding: 1.2rem 1.5rem;
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .em-feature-name {
          color: var(--text-secondary);
          font-weight: 500;
        }
        .em-value-cell {
          color: var(--text-primary);
        }
        
        .em-mobile { display: none; }
        .em-desktop { display: grid; }
        
        @media (max-width: 950px) {
          .em-desktop { display: none; }
          .em-mobile {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
          }
          .em-mobile-card {
            background: var(--bg-primary);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1);
          }
          .em-mobile-header {
            padding: 2.5rem 2rem;
            background: rgba(255, 255, 255, 0.02);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          .em-mobile-group {
            padding: 2rem 2rem 1rem;
            font-family: var(--font-display);
            font-size: 1.25rem;
            color: #ffffff;
            border-top: 1px solid rgba(255, 255, 255, 0.02);
          }
          .em-mobile-card > div:nth-child(2) > .em-mobile-group {
            border-top: none;
          }
          .em-mobile-row {
            display: flex;
            flex-direction: column;
            padding: 0.75rem 2rem;
          }
          .em-mobile-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 0.25rem;
          }
          .em-mobile-value {
            font-size: 1rem;
            color: var(--text-primary);
          }
        }
      `}</style>
    </section>
  );
}
