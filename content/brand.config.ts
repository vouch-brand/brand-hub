export const brand = {
  name: "Vouch",
  tagline: "Your employees have great stories. Getting them to share is the hard part. Vouch makes it effortless.",
  description:
    "The platform Employer Brand and Internal Comms teams use to collect, edit and share employee content — with AI that does the heavy lifting.",
  contact: {
    name: "Ian Cook",
    role: "Creative Lead",
    email: "ian@vouchfor.com",
  },
  version: "V1",
  lastUpdated: "2025-08-06",

  colours: {
    main: [
      {
        name: "Sea Blue Mid",
        hex: "#44607B",
        rgb: "68, 96, 123",
        cmyk: "45%, 22%, 0%, 52%",
        pantone: "6112 C",
        role: "Primary brand colour. Used for logo wordmark, primary CTAs, headings.",
      },
      {
        name: "Sea Blue Dark",
        hex: "#001D39",
        rgb: "0, 29, 57",
        cmyk: "100%, 49%, 0%, 78%",
        pantone: "282 C",
        role: "Dark backgrounds, high-contrast applications.",
      },
      {
        name: "Sand Light",
        hex: "#F9F6F1",
        rgb: "249, 246, 241",
        cmyk: "0%, 1%, 3%, 2%",
        pantone: "9285 C",
        role: "Primary background colour. Warm off-white.",
      },
    ],
    expanded: {
      seaBlue: [
        { name: "Sea Blue Light", hex: "#97A6B5", rgb: "151, 166, 181", cmyk: "17%, 8%, 0%, 29%", pantone: "7543 C" },
        { name: "Sea Blue Mid", hex: "#44607B", rgb: "68, 96, 123", cmyk: "45%, 22%, 0%, 52%", pantone: "6112 C" },
        { name: "Sea Blue Dark", hex: "#001D39", rgb: "0, 29, 57", cmyk: "100%, 49%, 0%, 78%", pantone: "282 C" },
      ],
      green: [
        { name: "Green Light", hex: "#9AB4A7", rgb: "154, 180, 167", cmyk: "14%, 0%, 7%, 29%", pantone: "5507 C" },
        { name: "Green Mid", hex: "#688F7A", rgb: "104, 143, 122", cmyk: "27%, 0%, 15%, 44%", pantone: "8284 C" },
        { name: "Green Dark", hex: "#244F39", rgb: "36, 79, 57", cmyk: "54%, 0%, 28%, 69%", pantone: "6161 C" },
      ],
      sun: [
        { name: "Sun Light", hex: "#FCE5BD", rgb: "252, 229, 189", cmyk: "0%, 9%, 25%, 1%", pantone: "918 C" },
        { name: "Sun Mid", hex: "#F7B139", rgb: "247, 177, 57", cmyk: "0%, 28%, 77%, 3%", pantone: "2010 C" },
        { name: "Sun Dark", hex: "#C37600", rgb: "195, 118, 0", cmyk: "0%, 39%, 100%, 24%", pantone: "2019 C" },
      ],
      skyBlue: [
        { name: "Sky Blue Light", hex: "#E9F2F4", rgb: "233, 242, 244", cmyk: "5%, 1%, 0%, 4%", pantone: "9063 C" },
        { name: "Sky Blue Mid", hex: "#9DC4CE", rgb: "157, 196, 206", cmyk: "24%, 5%, 0%, 19%", pantone: "4156 C" },
        { name: "Sky Blue Dark", hex: "#5F8A96", rgb: "95, 138, 150", cmyk: "37%, 8%, 0%, 41%", pantone: "8242 C" },
      ],
      purple: [
        { name: "Purple Light", hex: "#A497D9", rgb: "164, 151, 217", cmyk: "24%, 30%, 0%, 15%", pantone: "2645 C" },
        { name: "Purple Mid", hex: "#796BB2", rgb: "121, 107, 178", cmyk: "32%, 40%, 0%, 30%", pantone: "4122 C" },
        { name: "Purple Dark", hex: "#463880", rgb: "70, 56, 128", cmyk: "45%, 56%, 0%, 50%", pantone: "10428 C" },
      ],
    },
    neutrals: [
      {
        name: "Dark Neutral",
        hex: "#212121",
        rgb: "33, 33, 33",
        cmyk: "0%, 0%, 0%, 87%",
        pantone: "Neutral Black C",
      },
      {
        name: "Sand Light",
        hex: "#F9F6F1",
        rgb: "249, 246, 241",
        cmyk: "0%, 1%, 3%, 2%",
        pantone: "9285 C",
      },
    ],
    sand: [
      { name: "Sand Lightest", hex: "#FDFDFB", role: "Near-white — use for elevated surfaces on sand backgrounds" },
      { name: "Sand Light", hex: "#F9F6F1", role: "Primary background" },
      { name: "Sand Dark", hex: "#F3ECE2", role: "Subtle warm dividers, section backgrounds" },
      { name: "Sand Darkest", hex: "#EADFCD", role: "Strong warm contrast — borders, cards" },
    ],
  },

  typography: {
    primary: {
      name: "Martina Plantijn",
      role: "Headings, key messaging, display text",
      weights: ["Regular", "Bold"],
      googleFallback: "Source Serif 4",
      systemFallback: "Georgia, serif",
    },
    secondary: {
      name: "Inter",
      role: "Body text, UI elements, supporting copy",
      weights: ["Regular", "Medium", "SemiBold"],
      file: "/assets/fonts/Inter/WOFF 2/InterVariable.woff2",
      googleFallback: "Roboto",
      systemFallback: "Arial, sans-serif",
    },
    scale: {
      h1: { size: "48px", weight: "Medium", kerning: "-3", lineHeight: "90%" },
      h2: { size: "36px", weight: "Medium", kerning: "-3", lineHeight: "90%" },
      h3: { size: "28px", weight: "Medium", kerning: "-3", lineHeight: "100%" },
      p1: { size: "20px", weight: "Regular", kerning: "0", lineHeight: "150%" },
      p2: { size: "18px", weight: "Regular", kerning: "0", lineHeight: "150%" },
      p3: { size: "16px", weight: "Regular", kerning: "0", lineHeight: "150%" },
    },
    spacing: {
      lineHeight: "1.5x body text size",
      kerningHeadings: "-3",
      kerningBody: "0",
      paragraphSpacing: "1.5x font size",
    },
    // Responsive web scale — sourced from Vouch Marketing Site Figma (V3 Rebrand)
    webScale: {
      desktop: {
        display: { size: "112px", rem: "7rem" },
        h1:      { size: "80px",  rem: "5rem" },
        h2:      { size: "64px",  rem: "4rem" },
        h3:      { size: "48px",  rem: "3rem" },
        h4:      { size: "32px",  rem: "2rem" },
        h5:      { size: "24px",  rem: "1.5rem" },
        h6:      { size: "20px",  rem: "1.25rem" },
        large:   { size: "20px",  rem: "1.25rem" },
        main:    { size: "16px",  rem: "1rem" },
        small:   { size: "14px",  rem: "0.875rem" },
      },
      tablet: {
        display: { size: "88px", rem: "5.5rem" },
        h1:      { size: "64px", rem: "4rem" },
        h2:      { size: "48px", rem: "3rem" },
        h3:      { size: "40px", rem: "2.5rem" },
        h4:      { size: "28px", rem: "1.75rem" },
      },
      mobileLandscape: {
        display: { size: "64px", rem: "4rem" },
        h1:      { size: "48px", rem: "3rem" },
        h2:      { size: "40px", rem: "2.5rem" },
        h3:      { size: "36px", rem: "2.25rem" },
      },
    },
  },

  logo: {
    type: "Wordmark only — no standalone icon",
    description:
      "Lowercase 'vouch' in a rounded geometric sans-serif. The wordmark is the logo — it should never be typeset, only used as supplied asset files.",
    clearSpace: "Minimum clear space = logo height on all four sides",
    variants: [
      {
        name: "Blue on Sand",
        file: "/assets/logo/Vouch blue.svg",
        usage: "Primary — use on light/sand backgrounds",
      },
      {
        name: "White on Dark",
        file: "/assets/logo/Vouch not white.svg",
        usage: "Use on dark or coloured backgrounds",
      },
      {
        name: "Dark on White",
        file: "/assets/logo/Vouch dark blue.svg",
        usage: "Use on pure white backgrounds",
      },
    ],
    misuse: [
      "Do not rotate or tilt the logo",
      "Do not stretch or distort proportions",
      "Do not recolour in unapproved colours",
      "Do not recreate using typography — always use supplied files",
      "Do not place on busy or low-contrast backgrounds",
    ],
  },

  positioning: {
    status: "Draft — pending customer research validation (expected w/c April 20)",
    oneLiner: "A faster, easier way to turn employee stories into content teams can actually use.",
    boldClaim: "Employees are your best distribution channel. Vouch makes it effortless.",
    problem: "Your best content already exists inside your company. Vouch helps you turn employee stories into content you can use and share, fast.",
    whatWeDo: "Vouch captures authentic employee stories and turns them into usable, shareable content — fast. The more your team uses Vouch, the more powerful your content library becomes.",
    loop: [
      { step: "Capture", description: "Collect authentic employee stories at scale", product: "Content" },
      { step: "Distribute", description: "Get employees to actually share, where they already work", product: "Advocacy" },
      { step: "Activate", description: "Put those stories to work in hiring, automatically", product: "Recruiter" },
      { step: "Amplify", description: "Ask Vouch makes the whole thing run with less effort", product: "AI" },
    ],
    marketPosition: "The system that makes employee content actually work in practice",
    notJust: [
      { label: "Just storytelling", note: "Seenit stops at capturing stories — Vouch makes them usable" },
      { label: "Just AI automation", note: "CultureHQ is system-led — Vouch keeps the human connection" },
      { label: "Just campaigns", note: "Martec is marketing-heavy — Vouch solves day-to-day workflow pain" },
      { label: "Just video creation", note: "VideoMyJob is narrow — Vouch is a broader content system" },
    ],
    valuePropositions: {
      primary: [
        "Real employee stories, turned into content you can use — fast.",
        "Create, reuse, and share content across channels without starting from scratch.",
        "AI that takes care of the repetitive, manual work — not AI hype.",
      ],
      secondary: [
        "One searchable library your whole team can access and build on over time.",
        "Content that's finished and ready to publish — not raw footage or drafts.",
        "Built for EB and Comms teams under pressure to produce more with less.",
        "The more your team uses Vouch, the more valuable your content becomes.",
      ],
    },
    whyWeRebranded: "It's about aligning a visual system that reflects our purpose, personality, and ambition with our expanding, maturing product. An intentional brand identity is sellable and defendable — it's a differentiator.",
  },

  brandPersonality: {
    keywords: ["Calm", "Clear", "Modern", "Human"],
    aesthetic: "A sense of ease — low-contrast, open, a nice place to be. Paper-like neutral backgrounds, serif font — rounded, confident, not stuffy. More Kindle, less iPad: focused, warm, non-distracting.",
  },

  visualIdentity: {
    summary: "Vouch is designed to feel like the antithesis of a typical SaaS platform — deliberately decaffeinated in a world that's permanently turned up to eleven. Less digital, more editorial. Paper-like backgrounds, film grain, a serif that's confident without being formal, low contrast, generous space. Where most SaaS feels glaring and clinical, Vouch feels grounded and real. More Kindle, less iPad.",
    keywords: ["flow", "context", "decaffeinated", "frictionless", "weightless", "space", "collaboration", "human", "effortless", "texture", "tactility", "grain", "editorial"],
  },

  voice: {
    status: "Draft — pending internal review",
    characteristics: ["Confident", "Human", "Decaffeinated"],
    preferredPhrases: [
      "Talent teams",
      "Your team",
      "Effortless",
      "In one place",
      "Built for",
    ],
    avoidPhrases: [
      "Revolutionary",
      "Game-changing",
      "Disruptive",
      "Powerful",
      "Supercharge",
      "Next-generation",
    ],
  },

  values: [
    {
      name: "Expert",
      description:
        "We bring deep knowledge and precision to everything we do.",
    },
    {
      name: "Innovative",
      description:
        "We embrace technology and push boundaries in our industry.",
    },
    {
      name: "Trustworthy",
      description:
        "We are transparent and reliable in all client interactions.",
    },
    {
      name: "Collaborative",
      description:
        "We believe in teamwork, open communication, and fostering strong relationships to drive success.",
    },
  ],

  experiencePrinciples: [
    {
      name: "Optimistic",
      description: "We inspire confidence and ambition.",
    },
    {
      name: "Empowering",
      description:
        "We enable confidence and autonomy, ensuring every interaction feels inspiring and forward-thinking.",
    },
    {
      name: "Multi-Dimensional",
      description: "Our brand is adaptable and flexible.",
    },
    {
      name: "Harmonious",
      description:
        "We create a seamless and balanced experience that feels intuitive and effortless.",
    },
  ],
};
