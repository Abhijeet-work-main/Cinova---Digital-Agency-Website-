// src/data/brands.ts
// Single typed source of truth for all brand detail pages.
// Metric values that are empty ("") will NOT be rendered — per spec.
// Dates/durations marked "// INVENTED - replace with real" are owner-approved placeholders.
// Assets marked "// DUMMY - replace" use Dummy_Image/ files pending real material.

export interface Metric {
  label: string;
  value: string; // empty string = not rendered
}

export interface SolutionItem {
  title: string;
  description: string;
  deliverables: string[];
}

export interface Brand {
  slug: string;
  name: string;
  client: string;
  cardLine: string;
  services: string[]; // first two used as card tags
  duration: string;
  date: string;
  overview: {
    summary: string;
  };
  challenge: {
    headline: string;
    body: string;
    pains: [string, string, string];
  };
  solution: [SolutionItem, SolutionItem, SolutionItem, SolutionItem];
  results: {
    outcomes: [string, string, string];
    metrics: Metric[];
  };
  banner: string;
  creative: string[];
  cover: string;
  logo: string;
  comingSoon?: boolean;
}

export const brands: Brand[] = [
  {
    slug: "saanvi-botanical",
    name: "Saanvi Botanical",
    client: "Saanvi Botanical",
    cardLine: "Plant-powered identity for a wellness brand",
    services: ["Branding", "Content"],
    duration: "",
    date: "",
    overview: { summary: "" },
    challenge: { headline: "", body: "", pains: ["", "", ""] },
    solution: [
      { title: "", description: "", deliverables: [] },
      { title: "", description: "", deliverables: [] },
      { title: "", description: "", deliverables: [] },
      { title: "", description: "", deliverables: [] },
    ],
    results: { outcomes: ["", "", ""], metrics: [] },
    banner: "/brands/saanvi-botanical/banner.jpg",
    creative: [
      "/brands/saanvi-botanical/creative-1.jpg",
      "/brands/saanvi-botanical/creative-2.jpg",
      "/brands/saanvi-botanical/creative-3.jpg",
    ],
    cover: "/brands/saanvi-botanical/cover.jpg",
    logo: "/brands/saanvi-botanical/logo.png",
    comingSoon: true,
  },
  {
    slug: "kuptuuu",
    name: "KUPTUUU",
    client: "KUPTUUU",
    cardLine: "Odd-shaped utensils with a story",
    services: ["Product Design", "Website", "Ads"],
    duration: "7 months", // INVENTED - replace with real
    date: "Feb 2025 \u2013 Aug 2025", // INVENTED - replace with real
    overview: {
      summary: "KUPTUUU makes utensils that break the rules of shape: kitchen and tableware designed to be noticed, used and talked about.",
    },
    challenge: {
      headline: "A product too different to understand at a glance.",
      body: "Unconventional forms look like novelty unless the design logic is shown. Standard catalogue pages and generic ads undersold the product.",
      pains: [
        "Shoppers could not tell why the shapes mattered.",
        "The products read as decor, not as usable tools.",
        "A generic site and ads that treated the range like any other utensil.",
      ],
    },
    solution: [
      {
        title: "Product design direction",
        description: "A refined shape language, finishes and consistent design system across the range, so the oddness reads as intention.",
        deliverables: ["Design guidelines", "Packaging and presentation direction"],
      },
      {
        title: "Brand identity and creative",
        description: "A script wordmark and a playful, handmade-feeling visual world, with art direction for photography that shows scale, use and material.",
        deliverables: ["Wordmark", "Visual language", "Photography direction"],
      },
      {
        title: "A website that explains the product",
        description: "Story-led pages (shape, function, ritual) with in-use imagery and short demos, and product pages that answer how do I use this?",
        deliverables: ["Website", "Product page template"],
      },
      {
        title: "Ads that show it in use",
        description: "Short creative demonstrating the shapes in action, tested across design lovers, gifting audiences and home cooks.",
        deliverables: ["Ad creatives", "Audience tests", "Reporting"],
      },
    ],
    results: {
      outcomes: [
        "A product that explains itself at a glance.",
        "A brand as distinctive as the products.",
        "Site and ads telling one story.",
      ],
      metrics: [
        { label: "Click-through rate", value: "" },
        { label: "Conversion rate", value: "" },
        { label: "Add-to-cart rate", value: "" },
      ],
    },
    banner: "/brands/kuptuuu/banner.jpg",
    creative: [
      "/brands/kuptuuu/creative-1.jpg",
      "/brands/kuptuuu/creative-2.jpg",
      "/brands/kuptuuu/creative-3.jpg",
    ],
    cover: "/brands/kuptuuu/cover.jpg",
    logo: "/brands/kuptuuu/logo.png",
  },
  {
    slug: "curate-home",
    name: "Curate Home",
    client: "Curate Home",
    cardLine: "Heritage rituals, reimagined for modern living",
    services: ["Branding", "Creative"],
    duration: "10 Weeks", // INVENTED - replace with real
    date: "Nov 2024 \u2013 Jan 2025", // INVENTED - replace with real
    overview: {
      summary: "Curate Home is a home-living brand built around ritual: ornate incense and fragrance pieces in carved wood, brass and marble, rooted in Middle Eastern hospitality and reimagined for modern homes.",
    },
    challenge: {
      headline: "A rich heritage with nothing yet to say it.",
      body: "Beautiful objects can be mistaken for generic decor. The brand needed an identity that carried craft and ceremony, and content that sold the ritual, not just the object.",
      pains: [
        "Products looked like any decor on the market.",
        "No distinct emotional story tied to the ritual.",
        "No premium, giftable presentation.",
      ],
    },
    solution: [
      {
        title: "Brand identity",
        description: "A CH monogram with an arched ornamental crest, a refined serif wordmark and a restrained palette of sand, brass and ink, extended to signage and stationery.",
        deliverables: ["Logo system", "Palette and type", "Wall sign and stationery"],
      },
      {
        title: "Positioning and voice",
        description: "A Ritual Worth Keeping: messaging that sells the moment, not the object.",
        deliverables: ["Positioning", "Tagline", "Tone of voice"],
      },
      {
        title: "Campaign art direction",
        description: "Warm, cinematic imagery in which the product sits inside a real moment of incense, smoke and layered textiles.",
        deliverables: ["Key visual", "Social campaign series", "Art direction notes"],
      },
      {
        title: "Gifting and presentation",
        description: "Packaging and unboxing direction that makes the product feel like a gift worth giving.",
        deliverables: ["Packaging direction"],
      },
    ],
    results: {
      outcomes: [
        "A brand that reads as luxury at first look.",
        "A story customers can repeat.",
        "A reusable creative system for every new product.",
      ],
      metrics: [
        { label: "Engagement rate", value: "" },
        { label: "Gift and repeat orders", value: "" },
      ],
    },
    banner: "/brands/curate-home/banner.jpg",
    creative: [
      "/brands/curate-home/creative-1.jpg",
      "/brands/curate-home/creative-2.jpg",
      "/brands/curate-home/creative-3.jpg",
    ],
    cover: "/brands/curate-home/cover.jpg",
    logo: "/brands/curate-home/logo.png",
  },
  {
    slug: "gloss-shine",
    name: "Gloss & Shine",
    client: "Gloss & Shine",
    cardLine: "Premium auto care, filled with qualified leads",
    services: ["Ads", "Reels", "Lead Nurturing"],
    duration: "5 months", // INVENTED - replace with real
    date: "Jun 2025 \u2013 Oct 2025", // INVENTED - replace with real
    overview: {
      summary: "Gloss & Shine is a car-care studio specialising in paint protection film (PPF), detailing and protection services for owners who care deeply about their cars.",
    },
    challenge: {
      headline: "Enquiries came in. Customers did not.",
      body: "High-ticket services come with long decisions. Leads arrived unpredictably and in mixed quality, and many went cold because follow-up was slow and unstructured.",
      pains: [
        "Unpredictable lead flow.",
        "Low-intent enquiries wasting the team\u2019s time.",
        "Interested leads lost for lack of follow-up.",
      ],
    },
    solution: [
      {
        title: "Proof-led reel content",
        description: "Before and after transformations, process clips and PPF explainers that build trust before a customer ever calls.",
        deliverables: ["Reel series", "Shoot guide", "Covers and captions"],
      },
      {
        title: "Meta lead-generation ads",
        description: "Campaigns by service and car segment, built on transformation creative, with lead forms or click-to-WhatsApp and qualifying questions that filter out low-intent enquiries.",
        deliverables: ["Campaign setup", "Ad creatives", "Audience structure", "Cost-per-lead tracking"],
      },
      {
        title: "Lead nurturing system",
        description: "A structured follow-up: an instant response, a reminder sequence and an education drip (PPF versus coating, care and warranty), with a simple tracker so every lead has a status.",
        deliverables: ["WhatsApp templates", "Follow-up sequence", "Lead tracker"],
      },
      {
        title: "Retargeting and offers",
        description: "Retargeting video viewers and enquirers with service packages and time-bound offers, plus seasonal pushes.",
        deliverables: ["Retargeting audiences", "Package creative", "Offer calendar"],
      },
    ],
    results: {
      outcomes: [
        "A steady, measurable flow of inbound leads.",
        "Better qualified enquiries.",
        "No lead left without a follow-up.",
      ],
      metrics: [
        { label: "Cost per lead", value: "" },
        { label: "Leads per month", value: "" },
        { label: "Enquiry-to-booking rate", value: "" },
      ],
    },
    banner: "/brands/gloss-shine/banner.jpg",
    creative: [
      "/brands/gloss-shine/creative-1.jpg",
      "/brands/gloss-shine/creative-2.jpg",
      "/brands/gloss-shine/creative-3.jpg",
    ],
    cover: "/brands/gloss-shine/cover.jpg",
    logo: "/brands/gloss-shine/logo.png",
  },
  {
    slug: "lustre-jewellery",
    name: "Lustre Jewellery",
    client: "Lustre Jewellery",
    cardLine: "Jewellery designed to stand apart",
    services: ["Identity", "Photography"],
    duration: "12 Weeks", // INVENTED - replace with real
    date: "Apr 2026 \u2013 Jun 2026", // INVENTED - replace with real
    overview: {
      summary: "Lustre Jewellery creates contemporary statement jewellery: sculptural gold-toned earrings set with rose-toned stones, for women who want pieces with presence.",
    },
    challenge: {
      headline: "A crowded market full of lookalikes.",
      body: "Most jewellery brands share the same visuals. Lustre\u2019s pieces were distinctive, but the brand was not: nothing in its presentation signalled that.",
      pains: [
        "The brand blended in with generic jewellery.",
        "Product shots did not convey scale or wearability.",
        "No recognisable campaign idea.",
      ],
    },
    solution: [
      {
        title: "Brand identity",
        description: "A LUSTRE wordmark in spaced capitals with a compass-star emblem in a black oval, built for the details of jewellery packaging.",
        deliverables: ["Wordmark", "Emblem", "Palette and type"],
      },
      {
        title: "Campaign concept",
        description: "Designed to Stand Apart: a window-frame motif that presents each piece like a gallery moment.",
        deliverables: ["Campaign concept", "Key visual"],
      },
      {
        title: "Editorial photography direction",
        description: "Profile portraits in warm neutrals with the earring as the hero.",
        deliverables: ["Shot list", "Styling and lighting direction"],
      },
      {
        title: "Catalogue and social system",
        description: "Templates for product drops, lookbooks and posts, so new collections look instantly like Lustre.",
        deliverables: ["Templates", "Lookbook layout"],
      },
    ],
    results: {
      outcomes: [
        "A brand that is recognisable before the logo appears.",
        "Photography that shows scale and wearability.",
        "A repeatable system for every new collection.",
      ],
      metrics: [
        { label: "Engagement rate", value: "" },
        { label: "Click-through rate", value: "" },
        { label: "Collection sell-through", value: "" },
      ],
    },
    banner: "/brands/lustre-jewellery/banner.jpg",
    creative: [
      "/brands/lustre-jewellery/creative-1.jpg",
      "/brands/lustre-jewellery/creative-2.jpg",
      "/brands/lustre-jewellery/creative-3.jpg",
    ],
    cover: "/brands/lustre-jewellery/cover.jpg",
    logo: "/brands/lustre-jewellery/logo.png",
  },
  {
    slug: "purple-swan",
    name: "Purple Swan",
    client: "Purple Swan",
    cardLine: "Gentle care, naturally",
    services: ["Packaging", "Branding"],
    duration: "3 months", // INVENTED - replace with real
    date: "Aug 2024 \u2013 Oct 2024", // INVENTED - replace with real
    overview: {
      summary: "Purple Swan is a skincare brand making an eczema relief cream with natural ingredients for people with sensitive, reactive skin.",
    },
    challenge: {
      headline: "In sensitive-skin care, trust is the product.",
      body: "Buyers are cautious and have tried many products. The category is cluttered with either clinical or generic natural looks, so the brand had to feel safe, calm and credible at a glance.",
      pains: [
        "Low trust from first-time buyers.",
        "Packaging that blended into the shelf.",
        "Messaging risk, because health-adjacent claims must stay careful.",
      ],
    },
    solution: [
      {
        title: "Brand identity",
        description: "A swan-and-lotus mark in a calm purple and rose palette, with a logo system and usage guidelines.",
        deliverables: ["Logo system", "Palette and type", "Guidelines"],
      },
      {
        title: "Packaging design",
        description: "A jar label with a clear hierarchy (name, benefit, ingredients) and a soft, premium finish.",
        deliverables: ["Label design", "Packaging mockups"],
      },
      {
        title: "Messaging with care",
        description: "Gentle Care, Naturally: a reassuring, clear tone, with claims phrased conservatively (to be checked by the brand's regulatory adviser).",
        deliverables: ["Tagline", "Messaging guide"],
      },
      {
        title: "Campaign creative",
        description: "Serene botanical imagery (aloe, oats, water, stone) that communicates gentleness.",
        deliverables: ["Key visuals", "Social and marketplace images"],
      },
    ],
    results: {
      outcomes: [
        "A product that looks trustworthy on shelf and on screen.",
        "One consistent brand across packaging and advertising.",
        "Clear, careful messaging.",
      ],
      metrics: [
        { label: "Conversion rate", value: "" },
        { label: "Ratings and reviews", value: "" },
        { label: "Repeat purchase rate", value: "" },
      ],
    },
    banner: "/brands/purple-swan/banner.jpg",
    creative: [
      "/brands/purple-swan/creative-1.jpg",
      "/brands/purple-swan/creative-2.jpg",
      "/brands/purple-swan/creative-3.jpg",
    ],
    cover: "/brands/purple-swan/cover.jpg",
    logo: "/brands/purple-swan/logo.png",
  },
  {
    slug: "erminio-palamino",
    name: "Erminio Palamino",
    client: "Erminio Palamino",
    cardLine: "Luxury accessories, built to sell online",
    services: ["Ads", "Website", "Offers", "Marketplaces"],
    duration: "6 months",
    date: "Oct 2025 \u2013 Apr 2026",
    overview: {
      summary: "Erminio Palamino is a luxury accessories house: designer frames, handbags and watches for customers who buy on craftsmanship and status.",
    },
    challenge: {
      headline: "Premium products, no direct line to the customer.",
      body: "The collection looked like a luxury label but lacked the machinery to sell like one: ads that generated clicks without purchases, no purpose-built store, no clear offer to move a first-time buyer, and no presence on the marketplaces where high-intent shoppers compare luxury accessories.",
      pains: [
        "Ad spend drove traffic but little revenue.",
        "No branded storefront that sold the full collection.",
        "Invisible on marketplaces such as Amazon.",
      ],
    },
    solution: [
      {
        title: "Performance advertising",
        description: "We rebuilt Meta and search campaigns around product-led creative, with separate audiences for frames, handbags and watches. A prospecting, retargeting and offer-led funnel was optimised weekly against cost per purchase.",
        deliverables: ["Campaign architecture", "Ad creative sets", "Tracking setup", "Weekly reporting"],
      },
      {
        title: "Brand website and store",
        description: "A fast, premium storefront with clear category architecture, product pages that sell craftsmanship (detail imagery, materials, sizing guidance) and a secure, mobile-first checkout.",
        deliverables: ["E-commerce website", "Product page template", "Analytics and pixel setup"],
      },
      {
        title: "Offer strategy",
        description: "Structured offers that protect the luxury positioning: launch bundles, gifting edits, seasonal drops and limited-time perks instead of blanket discounts.",
        deliverables: ["Offer calendar", "Landing pages", "Promo creative"],
      },
      {
        title: "Marketplace retailing",
        description: "Expansion onto marketplaces such as Amazon with optimised listings: keyword-led titles, premium imagery and consistent brand content, kept in sync with the main catalogue.",
        deliverables: ["Listing setup and optimisation", "Brand content", "Catalogue sync"],
      },
    ],
    results: {
      outcomes: [
        "An owned storefront customers can browse and buy from.",
        "Advertising tied to a measurable path to purchase.",
        "A second sales channel through marketplaces.",
      ],
      metrics: [
        { label: "Return on ad spend", value: "" },
        { label: "Online revenue growth", value: "" },
        { label: "Marketplace listings live", value: "" },
      ],
    },
    banner: "/brands/erminio-palamino/banner.jpg",
    creative: [
      "/brands/erminio-palamino/creative-1.jpg",
      "/brands/erminio-palamino/creative-2.jpg",
    ],
    cover: "/brands/erminio-palamino/cover.jpg",
    logo: "/brands/erminio-palamino/logo.png",
  },
  {
    slug: "noor",
    name: "Noor",
    client: "Noor",
    cardLine: "A makeup brand, now booked online",
    services: ["Website", "Reach", "Creative"],
    duration: "12 Weeks", // INVENTED - replace with real
    date: "Mar 2025 \u2013 May 2025", // INVENTED - replace with real
    overview: {
      summary: "Noor is a makeup brand for clients who want a polished look for occasions and everyday glamour, with services they book in advance.",
    },
    challenge: {
      headline: "Every booking started with a phone call.",
      body: "Demand existed, but the process could not carry it. Phones were constantly busy, enquiries repeated the same questions, reach was limited, and the visuals did not match the artistry.",
      pains: [
        "The team was stuck answering calls and repeat questions.",
        "Bookings were lost when calls went unanswered.",
        "Limited reach and inconsistent visual presentation.",
      ],
    },
    solution: [
      {
        title: "A website with online booking",
        description: "Clients browse services, pick a date and time and confirm, with automatic confirmations and reminders. This took the repetitive calls off the team's plate.",
        deliverables: ["Website", "Booking flow", "Confirmations and reminders"],
      },
      {
        title: "Service and pricing clarity",
        description: "Service pages, pricing, preparation guidance and FAQs that answer the most common questions before they become calls.",
        deliverables: ["Service pages", "FAQ content"],
      },
      {
        title: "Reach engine",
        description: "Social and local search presence, an Instagram content plan and ad support to attract new clients.",
        deliverables: ["Content plan", "Ad campaigns", "Local search profile"],
      },
      {
        title: "Creative system",
        description: "Consistent templates for portfolios, before and afters and offers, with shoot direction that shows the work properly.",
        deliverables: ["Creative templates", "Shoot direction"],
      },
    ],
    results: {
      outcomes: [
        "Clients book themselves, at any hour.",
        "Far fewer routine calls.",
        "A presence that matches the artistry.",
      ],
      metrics: [
        { label: "Bookings via website", value: "" },
        { label: "Reduction in call volume", value: "" },
        { label: "Monthly reach", value: "" },
      ],
    },
    banner: "/brands/noor/banner.jpg",
    creative: [
      "/brands/noor/creative-1.jpg",
      "/brands/noor/creative-2.jpg",
      "/brands/noor/creative-3.jpg",
    ],
    cover: "/brands/noor/cover.jpg",
    logo: "/brands/noor/logo.png",
  },
  {
    slug: "pegah-toutak",
    name: "Pegah Toutak",
    client: "Pegah Toutak",
    cardLine: "Quiet luxury for the finishing touch",
    services: ["Branding", "Creative"],
    duration: "10 Weeks", // INVENTED - replace with real
    date: "Jun 2026 \u2013 Aug 2026", // INVENTED - replace with real
    overview: {
      summary: "Pegah Toutak designs formalwear accessories (cufflinks, hand-woven silk bow ties and pocket squares) for men who dress with attention to detail.",
    },
    challenge: {
      headline: "Small details are easily overlooked.",
      body: "Accessories are a secondary purchase. They need a story and a premium feel to be chosen on purpose. Without one, they compete on price against anonymous alternatives.",
      pains: [
        "Seen as commodity accessories.",
        "The craft of hand-woven silk was invisible.",
        "No editorial look to support a premium price.",
      ],
    },
    solution: [
      {
        title: "Quiet-luxury positioning",
        description: "A confident, understated idea (The Quietest Detail.) that turns a small product into a deliberate choice.",
        deliverables: ["Positioning", "Tagline system"],
      },
      {
        title: "Identity",
        description: "A serif wordmark in a navy and ivory palette that feels tailored.",
        deliverables: ["Wordmark", "Palette and type", "Guidelines"],
      },
      {
        title: "Editorial creative",
        description: "Tight, macro product imagery and campaign lines such as Silk, With a Story.",
        deliverables: ["Campaign visuals", "Social templates"],
      },
      {
        title: "Craft storytelling",
        description: "The hand-woven origin, materials and process made visible on product pages and social.",
        deliverables: ["Product copy", "Story content"],
      },
    ],
    results: {
      outcomes: [
        "A premium look that justifies the price.",
        "Craft that customers can see.",
        "A campaign system that scales to new products.",
      ],
      metrics: [
        { label: "Engagement rate", value: "" },
        { label: "Average order value", value: "" },
      ],
    },
    banner: "/brands/pegah-toutak/banner.jpg",
    creative: [
      "/brands/pegah-toutak/creative-1.jpg",
      "/brands/pegah-toutak/creative-2.jpg",
      "/brands/pegah-toutak/creative-3.jpg",
    ],
    cover: "/brands/pegah-toutak/cover.jpeg",
    logo: "/brands/pegah-toutak/logo.png",
  },
  {
    slug: "balbeer",
    name: "Balbeer",
    client: "Balbeer",
    cardLine: "Traditional Indian wear, discovered through reels",
    services: ["Content", "Reels", "Strategy"],
    duration: "4 months", // INVENTED - replace with real
    date: "Feb 2026 \u2013 May 2026", // INVENTED - replace with real
    overview: {
      summary: "Balbeer makes traditional Indian clothing for men and women: pieces rooted in craft, made for weddings, festivals and everyday occasions.",
    },
    challenge: {
      headline: "Beautiful clothing that almost nobody could find.",
      body: "Good garments do not sell themselves online. Balbeer's catalogue was not turning into attention: no recognisable content identity, no reel presence, and no reason for a stranger scrolling Instagram to stop on the brand.",
      pains: [
        "Low awareness beyond existing customers.",
        "Static product posts that earned little reach.",
        "No repeatable content system; posting was irregular.",
      ],
    },
    solution: [
      {
        title: "Reel-first brand strategy",
        description: "We defined clear content pillars: festive and wedding styling, fabric and craft stories, men's and women's lookbooks, and customer moments. Each pillar has a goal (reach, trust or enquiry).",
        deliverables: ["Content pillars", "Audience and tone guide"],
      },
      {
        title: "Reel production system",
        description: "Scripted hooks, shot lists and edit templates so every reel opens strongly in its first seconds, uses current formats and is fast to produce again and again.",
        deliverables: ["Hook bank", "Shot lists", "Edit templates", "Monthly shoot plan"],
      },
      {
        title: "Profile and discovery setup",
        description: "A refreshed bio, highlights and pinned reels, with captions and hashtags written for search, so a new viewer understands the brand in seconds and knows where to buy.",
        deliverables: ["Profile revamp", "Caption and hashtag framework"],
      },
      {
        title: "Cadence and learning loop",
        description: "A fixed posting rhythm, with weekly review of watch time, shares and profile visits, then doubling down on the formats that travel.",
        deliverables: ["Content calendar", "Monthly performance review"],
      },
    ],
    results: {
      outcomes: [
        "A recognisable brand look on Instagram.",
        "A reel pipeline that runs every week.",
        "More people discovering Balbeer without paid push.",
      ],
      metrics: [
        { label: "Reel views", value: "" }, // DUMMY - replace
        { label: "Profile visits", value: "" }, // DUMMY - replace
        { label: "Follower growth", value: "" }, // DUMMY - replace
      ],
    },
    banner: "/brands/balbeer/banner.jpg", // DUMMY - replace
    creative: [
      "/brands/balbeer/creative-1.jpg",
      "/brands/balbeer/creative-2.jpg",
      "/brands/balbeer/creative-3.jpg",
    ],
    cover: "/brands/balbeer/cover.jpg", // DUMMY - replace
    logo: "/brands/balbeer/logo.png", // DUMMY - replace
  },
  {
    slug: "pb-investing",
    name: "PB Investing",
    client: "PB Investing",
    cardLine: "Investing education, scripted to be watched",
    services: ["Content", "Strategy"],
    duration: "6 months", // INVENTED - replace with real
    date: "Oct 2024 \u2013 Mar 2025", // INVENTED - replace with real
    overview: {
      summary: "PB Investing is a YouTube channel that explains investing and markets in plain language for everyday viewers.",
    },
    challenge: {
      headline: "Valuable knowledge, weak retention.",
      body: "Expertise does not hold attention on its own. Scripts drifted, openings were slow, thumbnails and titles were not earning clicks, and there was no consistent plan for what to publish next.",
      pains: [
        "Viewers dropping off early.",
        "Videos not earning clicks.",
        "Production time consuming the creator's week.",
      ],
    },
    solution: [
      {
        title: "Channel strategy",
        description: "A clear audience and positioning, content pillars (explainers, market updates, beginner guides), series structure and a publishing calendar.",
        deliverables: ["Channel strategy", "Content pillars", "Calendar"],
      },
      {
        title: "Scripting framework",
        description: "A hook, promise, story and payoff structure with plain-language explanations and retention beats, written in the creator's voice.",
        deliverables: ["Script template", "Scripts", "Hook bank"],
      },
      {
        title: "Editing and packaging",
        description: "Tight pacing, clear on-screen graphics and charts that make numbers readable, plus thumbnails and titles built to earn the click.",
        deliverables: ["Edited videos", "Thumbnails", "Title options"],
      },
      {
        title: "Analytics loop and repurposing",
        description: "A per-video review of retention and click-through, with Shorts and reels cut from long-form videos.",
        deliverables: ["Monthly analytics review", "Short-form cutdowns"],
      },
    ],
    results: {
      outcomes: [
        "Videos built to hold attention.",
        "A repeatable weekly production flow.",
        "A clear view of what works.",
      ],
      metrics: [
        { label: "Average view duration", value: "" }, // DUMMY - replace
        { label: "Click-through rate", value: "" }, // DUMMY - replace
        { label: "Subscribers gained", value: "" }, // DUMMY - replace
      ],
    },
    banner: "/brands/pb-investing/banner.jpg", // DUMMY - replace
    creative: [
      "/brands/pb-investing/creative-1.jpg",
      "/brands/pb-investing/creative-2.jpg",
      "/brands/pb-investing/creative-3.jpg",
    ],
    cover: "/brands/pb-investing/cover.jpg", // DUMMY - replace
    logo: "/brands/pb-investing/logo.png", // DUMMY - replace
  },
  {
    slug: "byxiu-designs",
    name: "byXiu Designs",
    client: "byXiu Designs",
    cardLine: "Wear your story — bespoke jewellery made once, for you",
    services: ["Branding", "Creative Direction", "Editorial Photography"],
    duration: "4 months",
    date: "2025",
    overview: {
      summary:
        "byXiu Designs crafts one-of-a-kind bespoke jewellery sculpted around personal stories. Each piece is handmade once and never replicated.",
    },
    challenge: {
      headline: "Artisanal storytelling lost in commercial jewellery noise.",
      body: "Bespoke jewellery defies mass e-commerce presentation. Standard commercial product grids and transactional staging failed to communicate the emotional depth, organic textures, and one-of-a-kind philosophy of each piece.",
      pains: [
        "Standard jewellery staging made bespoke art look like mass-market retail.",
        "The core bespoke philosophy ('Made once, for you') was lost in generic product listings.",
        "Prospective collectors lacked a guided journey to understand custom commissioning.",
      ],
    },
    solution: [
      {
        title: "Editorial narrative and positioning",
        description:
          "Framed the collection around wearable memories and poetic introspection, positioning byXiu as an artisan atelier rather than a conventional commercial label.",
        deliverables: ["Brand narrative", "Tone of voice", "Art direction guidelines"],
      },
      {
        title: "Location-based campaign photography",
        description:
          "Captured the collection in natural daylight against brutalist and heritage architectural corridors, contrasting textured organic metals with minimalist contemporary silhouettes.",
        deliverables: ["Editorial lookbook", "Campaign stills", "Social asset suite"],
      },
      {
        title: "Digital gallery presentation",
        description:
          "Designed a tranquil, narrative-first digital experience that lets collectors explore the conceptual provenance, material origins, and bespoke commissioning process.",
        deliverables: ["Digital presence", "Storytelling templates", "Commissioning flow"],
      },
      {
        title: "Collector engagement and content cadence",
        description:
          "Structured an intimate publishing rhythm highlighting workbench details, artisan craftsmanship, and personal stories behind individual pieces.",
        deliverables: ["Content pillars", "Studio reels", "Collector guide"],
      },
    ],
    results: {
      outcomes: [
        "A distinctive editorial identity that positions byXiu as a bespoke art atelier.",
        "Visual storytelling that honors the 'Made once, for you' brand promise.",
        "Higher engagement and elevated collector inquiries for bespoke pieces.",
      ],
      metrics: [],
    },
    banner: "/brands/byxiu-designs/banner.jpg",
    creative: [
      "/brands/byxiu-designs/creative-1.jpg",
      "/brands/byxiu-designs/creative-2.jpg",
      "/brands/byxiu-designs/creative-3.jpg",
    ],
    cover: "/brands/byxiu-designs/cover.jpg",
    logo: "/brands/byxiu-designs/logo.png",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export const contentBrands = brands.filter((b) => !b.comingSoon);

export function getDiscoverMore(currentSlug: string): Brand[] {
  const idx = contentBrands.findIndex((b) => b.slug === currentSlug);
  const base = idx === -1 ? 0 : idx + 1;
  const result: Brand[] = [];
  for (let i = 0; result.length < 3; i++) {
    const next = contentBrands[(base + i) % contentBrands.length];
    if (next.slug !== currentSlug) result.push(next);
    if (i >= contentBrands.length) break;
  }
  return result;
}
