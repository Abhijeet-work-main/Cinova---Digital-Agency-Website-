import { CaseStudy } from "./caseStudies";

export interface Solution {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  problemStatement: string;
  problems: string[];
  whyItHappens: string;
  howCinovaHelps: string;
  capabilities: string[];
  delayConsequence: string;
  relevantCaseSlugs: string[];
  relatedIndustrySlugs: string[];
}

export const solutions: Solution[] = [
  {
    id: "websites",
    slug: "websites",
    name: "Conversion Websites",
    tagline: "Stop losing qualified traffic to weak digital funnels.",
    heroHeadline: "Your website is getting traffic. It's not turning it into business.",
    heroSubtext: "Most websites look professional but are structurally built to receive visitors — not convert them. We change that.",
    problemStatement: "Traffic without conversion is just an expense.",
    problems: [
      "Visitors land on your website but leave without booking, buying, or reaching out",
      "Manual appointment coordination is disorganized and loses leads",
      "Your e-commerce store has checkout friction that abandons purchases",
      "You are spending on ads or content but the website doesn't support what they promise",
    ],
    whyItHappens:
      "Most websites are built to 'look good' rather than convert. Designers optimize for aesthetics. Developers optimize for code. Nobody owns the gap where attention becomes revenue.",
    howCinovaHelps:
      "We design and build websites around the visitor's decision journey — not around the client's preference for aesthetics. Every section earns its space by moving the visitor closer to acting.",
    capabilities: [
      "Conversion-focused UI/UX design",
      "Next.js web development",
      "Booking & calendar automation",
      "E-commerce funnel optimization",
      "Landing page systems",
    ],
    delayConsequence:
      "Every month your website is structurally weak, qualified visitors who found you are leaving and going to your competitors — without you knowing they were ever there.",
    relevantCaseSlugs: ["noor", "erminio-palamino"],
    relatedIndustrySlugs: ["ecommerce", "service-brands"],
  },
  {
    id: "paid-growth",
    slug: "paid-growth",
    name: "Paid Acquisition & Ads",
    tagline: "Turn ad spend into measurable market placement.",
    heroHeadline: "Your ads are running. Your sales aren't growing proportionally.",
    heroSubtext: "The problem is rarely the budget. It's usually the creative, targeting, or conversion architecture downstream.",
    problemStatement: "Ad spend without a connected conversion system is wasted money.",
    problems: [
      "High Cost Per Click and poor return on ad spend",
      "Ad creatives that don't stop the scroll or drive action",
      "No clear picture of which campaigns or audiences are actually working",
      "Traffic arrives from ads but the landing page doesn't convert",
    ],
    whyItHappens:
      "Paid acquisition is only one part of the system. When ads, creative, landing pages, and measurement aren't connected, even a perfectly targeted campaign leaks money.",
    howCinovaHelps:
      "We structure campaigns, creative, and conversion architecture together — so that paid traffic lands somewhere it can actually convert. We've driven high-volume campaigns with sub-₹0.30 CPC for luxury e-commerce clients.",
    capabilities: [
      "Meta Ads strategy and campaign setup",
      "Ad creative concept and direction",
      "Audience targeting and segmentation",
      "Attribution architecture",
      "Campaign performance review",
    ],
    delayConsequence:
      "Attention is expensive. Every month you run campaigns without a connected creative and conversion system, you are paying to send qualified buyers to a leaking funnel.",
    relevantCaseSlugs: ["erminio-palamino", "balbeer"],
    relatedIndustrySlugs: ["ecommerce", "creators"],
  },
  {
    id: "creative-production",
    slug: "creative-production",
    name: "Premium Video & Creative Production",
    tagline: "High-retention storytelling that holds attention and drives action.",
    heroHeadline: "Your content isn't performing because it wasn't built to perform.",
    heroSubtext: "Most content is produced to fill a schedule. We produce content engineered to hold attention, build trust, and earn the next action.",
    problemStatement: "Content without strategy is just noise.",
    problems: [
      "Videos lose viewers in the first 3 seconds because the hook doesn't land",
      "Instagram Reels or YouTube content gets views but doesn't drive inquiries or sales",
      "Your brand looks inconsistent across platforms",
      "You have no clear content strategy connecting what you post to business outcomes",
    ],
    whyItHappens:
      "Most content is created reactively. There's no brief connecting the hook to the audience's specific problem, no edit structure designed for retention, and no distribution plan connecting the content to a conversion path.",
    howCinovaHelps:
      "We plan, script, shoot, and edit content with a clear audience and outcome in mind — from YouTube long-form to short-form Reels. We've helped creators with 100k+ subscribers elevate the quality and retention of their content.",
    capabilities: [
      "Content strategy and planning",
      "Scripting and hook writing",
      "Professional videography",
      "High-end video editing",
      "Reels and short-form production",
      "YouTube long-form editing",
    ],
    delayConsequence:
      "Every piece of weak content you post trains your audience to scroll past you. The opportunity cost compounds over time as competitors who invest in quality content build the trust you are waiting to build.",
    relevantCaseSlugs: ["pb-investing", "balbeer", "gloss-and-shine"],
    relatedIndustrySlugs: ["creators", "service-brands"],
  },
  {
    id: "social-growth",
    slug: "social-growth",
    name: "Social Media & Brand Presence",
    tagline: "Turn your social accounts from passive archives into active acquisition channels.",
    heroHeadline: "You have social media accounts. They're not generating business.",
    heroSubtext: "Posting consistently isn't a strategy. We build social presences that create recognition, trust, and qualified inquiries.",
    problemStatement: "Social media presence without a system is just visibility without direction.",
    problems: [
      "Posting regularly but follower count and engagement remain stagnant",
      "No consistent brand voice or visual identity across platforms",
      "Social accounts aren't generating inquiries or driving traffic",
      "No plan connecting content to actual business goals",
    ],
    whyItHappens:
      "Most social accounts are run reactively — posting when there's time, using whatever assets are available, without a defined audience or outcome in mind. The result is activity that looks productive but generates no commercial return.",
    howCinovaHelps:
      "We manage social accounts with a defined strategy, consistent visual identity, and content engineered for the platform's discovery algorithm and the client's business objectives.",
    capabilities: [
      "Instagram account strategy and management",
      "Content calendar development",
      "Reels and short-form content",
      "Brand voice and visual consistency",
      "Community engagement",
    ],
    delayConsequence:
      "Brand recognition is built over time. Every month you post inconsistently or without strategy, competitors in your category are building the trust and familiarity that makes buyers choose them over you.",
    relevantCaseSlugs: ["balbeer", "gloss-and-shine", "erminio-palamino"],
    relatedIndustrySlugs: ["service-brands", "ecommerce"],
  },
];

export interface SystemStep {
  name: string;
  description: string;
  detail: string;
}

export const systemSteps: SystemStep[] = [
  {
    name: "Strategy",
    description: "Outcome Alignment",
    detail: "Diagnosing growth leaks and organizing marketing around business outcomes.",
  },
  {
    name: "Creative",
    description: "Concept Design",
    detail: "High-contrast styling, scripting, and layout direction built for conversion.",
  },
  {
    name: "Production",
    description: "Asset Execution",
    detail: "Capturing videography, designing vector imagery, and post-production editing.",
  },
  {
    name: "Digital",
    description: "Conversion Platform",
    detail: "Building responsive Next.js interfaces and automated scheduler flows.",
  },
  {
    name: "Distribution",
    description: "Paid & Organic Ads",
    detail: "Deploying campaigns on Meta Ads and seeding retention-optimized content.",
  },
  {
    name: "Intelligence",
    description: "Measurement System",
    detail: "Attributing link clicks, form events, and customer pathways via telemetry.",
  },
  {
    name: "Optimization",
    description: "Iterative Testing",
    detail: "Refining pricing structures, offers, visual hooks, and landing variants.",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
