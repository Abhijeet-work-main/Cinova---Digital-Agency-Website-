export interface Solution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problems: string[];
  capabilities: string[];
}

export const solutions: Solution[] = [
  {
    id: "websites",
    name: "Conversion Websites",
    tagline: "Stop losing qualified traffic to weak digital funnels.",
    description: "We build fast, high-contrast digital interfaces that turn attention into inquiries, appointments, and retail purchases.",
    problems: [
      "Visitors arrive but leave without taking action",
      "Manual appointment coordination is disorganized",
      "E-commerce funnel has checkout friction"
    ],
    capabilities: ["UI/UX Interface Design", "Next.js Web Development", "Booking & Calendar Automation", "E-commerce Optimization"]
  },
  {
    id: "paid-growth",
    name: "Paid Acquisition & Ads",
    tagline: "Turn ad spend into measurable market placement.",
    description: "Strategic campaign setup, precise targeting configurations, and structured creative concepts designed for low customer acquisition costs.",
    problems: [
      "High Cost Per Click (CPC) and ad waste",
      "Inability to track attribution and conversions",
      "Stale ad creatives that fail discovery triggers"
    ],
    capabilities: ["Meta Ads Strategy", "Creative Direction", "Attribution Architecture", "Audience Targeting"]
  },
  {
    id: "creative-production",
    name: "Premium Production & Video",
    tagline: "High-retention storytelling designed to retain attention.",
    description: "From scripting to final post-production, we edit short-form and long-form video content optimized for platforms like YouTube and Instagram.",
    problems: [
      "Drop-off in viewer retention during the first 3 seconds",
      "Weak hook design and pacing",
      "Lack of premium editorial visuals"
    ],
    capabilities: ["Scripting & Planning", "High-End Video Editing", "Organic Hook Optimization", "Motion Graphics"]
  }
];

export interface SystemStep {
  name: string;
  description: string;
  detail: string;
}

export const systemSteps: SystemStep[] = [
  { name: "Strategy", description: "Outcome Alignment", detail: "Diagnosing growth leaks and organizing marketing around business outcomes." },
  { name: "Creative", description: "Concept Design", detail: "High-contrast styling, scripting, and layout direction built for conversion." },
  { name: "Production", description: "Asset Execution", detail: "Capturing videography, designing vector imagery, and post-production editing." },
  { name: "Digital", description: "Conversion Platform", detail: "Building responsive Next.js instances and automated scheduler flows." },
  { name: "Distribution", description: "Paid & Organic Ads", detail: "Deploying campaigns on Meta Ads and seeding retention-optimized content." },
  { name: "Intelligence", description: "Measurement System", detail: "Attributing link clicks, form events, and customer pathways via telemetry." },
  { name: "Optimization", description: "Iterative Testing", detail: "Refining pricing structures, offers, visual hooks, and landing variants." }
];
