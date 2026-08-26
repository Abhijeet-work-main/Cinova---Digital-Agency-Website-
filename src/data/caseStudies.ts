export interface CaseStudy {
  slug: string;
  client: string;
  category: string;
  industry?: string;
  problem: string[];
  solution: string[];
  verifiedResults: {
    label: string;
    value: string;
    description?: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "erminio-palamino",
    client: "Erminio Palamino",
    category: "Meta Ads & E-Commerce Redesign",
    industry: "Luxury Retail",
    problem: [
      "Low online store traffic volume.",
      "Zero product conversions or sales recorded directly through the website.",
      "Absence of a defined advertising strategy to optimize media spend."
    ],
    solution: [
      "Fully redesigned the website focusing on conversion elements.",
      "Introduced strategic offers, coupons, and genuine incentive systems.",
      "Conducted Meta Ads strategy and campaign execution targeting qualified luxury buyers.",
      "Supported expansion into major online marketplaces including Amazon and Flipkart."
    ],
    verifiedResults: [
      {
        label: "Campaign Link Clicks",
        value: "16,555",
        description: "Aggregated across active Meta Ad campaign sets (10,467 and 6,088 clicks)."
      },
      {
        label: "Average Cost Per Click",
        value: "₹0.27",
        description: "Optimized click pricing achieved (₹0.26 and ₹0.28 per click)."
      },
      {
        label: "Initial Ad Media Spend",
        value: "₹4,454.90",
        description: "Verified budget parameters across setup phases (₹1,725.49 and ₹2,729.41 spent)."
      },
      {
        label: "Instagram Account Reach",
        value: "~170,000",
        description: "Estimated reach visibility driven through localized branding efforts."
      }
    ]
  },
  {
    slug: "balbeer",
    client: "Balbeer",
    category: "Videography & Social Growth",
    industry: "Apparel & Clothing",
    problem: [
      "Weak organic social media visibility.",
      "Low brand awareness and sluggish online retail conversions."
    ],
    solution: [
      "Produced custom, high-quality campaign videography assets.",
      "Managed active Instagram content publication cycles.",
      "Designed and edited Reels targeted at organic social discovery algorithms.",
      "Formulated Meta Ads campaigns and creative concepts."
    ],
    verifiedResults: []
  },
  {
    slug: "gloss-and-shine",
    client: "Gloss & Shine",
    category: "Videography & Social Advertising",
    industry: "Beauty & Auto Care Services",
    problem: [
      "Weak social media presence and engagement.",
      "Lack of organized digital traffic generation and online customer awareness."
    ],
    solution: [
      "Produced promotional videography focused on service delivery quality.",
      "Provided social media account management and growth content.",
      "Designed high-impact Reels and distributed social media advertising.",
      "Helped generate service inquiries and leads across multiple Indian regions."
    ],
    verifiedResults: []
  },
  {
    slug: "noor",
    client: "Noor",
    category: "Web Development & Booking Systems",
    industry: "Cosmetics & Bridal Makeup",
    problem: [
      "Online appointment scheduling was completely unavailable.",
      "Managing bookings and calendar allocations manually was disorganized and time-intensive."
    ],
    solution: [
      "Designed and developed a custom service website.",
      "Implemented a structured appointment scheduling utility.",
      "Integrated booking automation synced directly with real-time calendar systems."
    ],
    verifiedResults: [
      {
        label: "Appointment Management",
        value: "100% Automated",
        description: "Eliminated manual coordination errors by syncing schedules to the client's master calendar."
      }
    ]
  },
  {
    slug: "pb-investing",
    client: "PBInvesting & Omar Waseem",
    category: "YouTube Content Strategy & Production",
    industry: "Financial Media",
    problem: [
      "Inconsistent content strategy and topic ideation.",
      "Video editing required higher visual retention hooks.",
      "Content lacked immersive editing structure to hold viewer interest."
    ],
    solution: [
      "Developed strategic content planning blueprints.",
      "Authored optimized script outlines prioritizing user retention.",
      "Executed high-quality, immersive post-production video editing.",
      "Restructured narrative pacing to improve retention hooks."
    ],
    verifiedResults: [
      {
        label: "Omar Waseem Subscribers",
        value: "13.5k+",
        description: "Subscribers recorded at audit time."
      },
      {
        label: "Omar Waseem Video Views",
        value: "32,011+",
        description: "Verified views recorded on featured video."
      },
      {
        label: "PBInvesting Subscribers",
        value: "123k+",
        description: "Audience milestones reached under creative curation."
      },
      {
        label: "PBInvesting Video Views",
        value: "20,267+",
        description: "Verified views on featured tutorial video."
      }
    ]
  }
];
