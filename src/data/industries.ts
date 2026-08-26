export interface Industry {
  slug: string;
  name: string;
  heroHeadline: string;
  heroSubtext: string;
  problemStatement: string;
  recognitionProblems: string[];
  whyItHappens: string;
  cinova_approach: string;
  relevantSolutionSlugs: string[];
  relevantCaseSlugs: string[];
  delayConsequence: string;
}

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    name: "E-commerce & Online Retail",
    heroHeadline: "You have products, a store, and traffic. But sales aren't growing.",
    heroSubtext:
      "The gap between attention and purchase is where most e-commerce businesses leak revenue. We close that gap by connecting your creative, ads, and conversion architecture.",
    problemStatement: "Traffic without conversion is an expense, not a growth engine.",
    recognitionProblems: [
      "You're running Meta Ads but the return doesn't justify the spend",
      "Your product pages look fine but cart abandonment is high",
      "Your Instagram has followers but they're not converting to buyers",
      "You're on Amazon or Flipkart but struggling to stand out",
      "You don't know which part of your funnel is leaking",
    ],
    whyItHappens:
      "Most e-commerce brands treat ads, website, and social as three separate projects managed by different people with different goals. When they don't speak to each other, qualified buyers fall through every gap.",
    cinova_approach:
      "We build e-commerce acquisition architectures that connect your ad creative to the landing experience, the landing experience to the purchase trigger, and the purchase trigger to a retention loop. We've helped luxury e-commerce brands generate 16,000+ link clicks at under ₹0.30 CPC.",
    relevantSolutionSlugs: ["paid-growth", "websites", "social-growth"],
    relevantCaseSlugs: ["erminio-palamino"],
    delayConsequence:
      "Every month your conversion funnel has unresolved gaps, you're paying to attract buyers your system isn't capturing. That cost compounds over every campaign you run.",
  },
  {
    slug: "service-brands",
    name: "Service Businesses & Local Brands",
    heroHeadline: "You deliver an excellent service. But your online presence isn't reflecting it.",
    heroSubtext:
      "Potential clients find you — or they don't. When they do, your digital presence either builds trust or loses it in the first 10 seconds.",
    problemStatement: "Offline excellence that isn't visible online loses business to competitors who are.",
    recognitionProblems: [
      "Appointment and inquiry management is chaotic and disorganized",
      "Potential clients can't easily find you or book online",
      "Your social media doesn't reflect the quality of your actual service",
      "You're generating leads but struggling to convert or follow up effectively",
      "You want to expand geographically but have no digital infrastructure to support it",
    ],
    whyItHappens:
      "Service businesses often grow through word of mouth to a ceiling. Breaking through that ceiling requires a digital presence that can scale enquiries, build trust before the first conversation, and automate the initial intake process.",
    cinova_approach:
      "We build the digital infrastructure that service businesses need to scale beyond referrals — from booking-enabled websites to social media that communicates quality and trust. We've helped beauty and wellness brands go from zero online appointment capability to fully automated scheduling.",
    relevantSolutionSlugs: ["websites", "social-growth", "creative-production"],
    relevantCaseSlugs: ["noor", "gloss-and-shine"],
    delayConsequence:
      "Every week without a functioning appointment system, online enquiries, or a credible digital presence, you are leaving business to competitors who have invested in their infrastructure.",
  },
  {
    slug: "creators",
    name: "Content Creators & YouTube Channels",
    heroHeadline: "You're creating content consistently. The growth isn't matching the effort.",
    heroSubtext:
      "The difference between channels that grow and channels that plateau is rarely effort. It's strategy, hook quality, and the editorial standard of the content itself.",
    problemStatement: "Content without retention strategy is effort without compounding return.",
    recognitionProblems: [
      "Your videos get some views but retention drops significantly after the first 30 seconds",
      "You're posting consistently but subscriber growth has plateaued",
      "Your editing looks dated compared to channels in your category",
      "You have ideas but no structured content strategy connecting them to audience growth",
      "Your hook doesn't stop the scroll in the first 3 seconds",
    ],
    whyItHappens:
      "Most creators optimise for output — posting more, more often. But the algorithm rewards retention, engagement, and session time. Without editorial strategy and quality production, more content just means more average content.",
    cinova_approach:
      "We work with creators on content strategy, scripting for retention, and high-end editing — with a focus on the hook quality and pacing that drives platform performance. We've supported financial media creators with audiences up to 123k subscribers.",
    relevantSolutionSlugs: ["creative-production", "social-growth"],
    relevantCaseSlugs: ["pb-investing"],
    delayConsequence:
      "The creator economy rewards compounding. Every month you produce content below your audience's rising expectations, you are training them to disengage. Rebuilding that trust later is harder than building it now.",
  },
  {
    slug: "fashion-apparel",
    name: "Fashion & Apparel Brands",
    heroHeadline: "Your products are strong. Your online presence isn't selling them yet.",
    heroSubtext:
      "Fashion is a visual, emotional category. Buyers need to feel the brand before they trust it enough to purchase. Most fashion brands underinvest in the infrastructure that creates that feeling.",
    problemStatement: "A great product without great brand communication doesn't sell itself online.",
    recognitionProblems: [
      "Your Instagram looks inconsistent and doesn't convey the brand identity clearly",
      "You're producing content but it doesn't feel premium enough to justify your price point",
      "You've tried Meta Ads but the CPCs were too high or the ROAS didn't work",
      "Your website exists but isn't set up to convert product interest into purchase",
      "You know you have a strong product but don't know how to communicate it online",
    ],
    whyItHappens:
      "Fashion brands often invest in product and underinvest in communication. The creative assets, social presence, and ad infrastructure are treated as secondary — when for online buyers, they are the primary buying signal.",
    cinova_approach:
      "We help fashion and apparel brands build the creative and distribution infrastructure they need to sell online — from campaign videography and Reels to structured Meta Ads and optimized product discovery.",
    relevantSolutionSlugs: ["creative-production", "social-growth", "paid-growth"],
    relevantCaseSlugs: ["balbeer"],
    delayConsequence:
      "Brand identity compounds. Every month your visual identity is inconsistent or your creative quality doesn't match your product quality, you are eroding the perception that justifies your pricing.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
