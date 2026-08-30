import type { ArticleDetailType } from "@/types";

export const articlesData: ArticleDetailType[] = [
  {
    id: "art-1",
    slug: "how-designers-and-developers-can-actually-collaborate",
    title: "How designers and developers can actually collaborate.",
    subtitle:
      "Discover proven strategies to bridge the designer-developer gap and ship better products faster.",
    publishedAt: "Mar 6, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "5 min read",
    category: "Architecture",
    coverImage:
      "https://framerusercontent.com/images/tBF8hMQFxONWA4CXtHf3R4.jpg?scale-down-to=1024",
    featured: true,
    excerpt:
      "Discover proven strategies to bridge the designer-developer gap. Learn how top teams eliminate handoff friction and ship better products faster through true collaboration.",
    intro:
      "For decades, the standard product development cycle relied on a flawed premise: design finishes a prototype, throws it over an imaginary wall to engineering, and hopes the final shipped product resembles the original vision. This 'handoff from hell' wastes billions annually in lost velocity, redesign cycles, and fractured team morale.",
    sections: [
      {
        heading: "The Two Cultures Problem",
        paragraphs: [
          "Designers think in flows, spatial relationships, visual hierarchy, and emotional resonance. Developers think in state machines, edge cases, bundle constraints, and API contracts. When these two worldviews only communicate via static Figma frames or Jira tickets, nuance is lost.",
          "The solution isn't making every designer a senior backend engineer, nor turning every engineer into a typographer. It's establishing a shared vocabulary built around functional tokens and living code components.",
        ],
        quote:
          "Design and engineering are not sequential steps in a waterfall—they are two hands shaping the same clay simultaneously.",
      },
      {
        heading: "Tools That Actually Bridge The Gap",
        paragraphs: [
          "With modern component-driven architectures (like React 19, Tailwind CSS v4, and modern CSS primitives), the boundary between visual design and implementation has compressed dramatically. Design tokens defined in code reflect directly in Figma variables.",
          "Teams that adopt synchronous pairing—where engineers review interaction prototypes before final polish, and designers participate in PR reviews—ship features with 60% fewer visual regression bugs.",
        ],
      },
      {
        heading: "Building Bridges, Not Walls",
        paragraphs: [
          "Start small: invite an engineer to your next wireframe review. Ask them about the database schema before you design the search filters. Build a lightweight living styleguide together. True collaboration is a daily habit of shared curiosity.",
        ],
      },
    ],
    conclusion:
      "When designers and developers respect each other's constraints and co-create from day one, magical software ceases to be an accident and becomes an inevitable outcome.",
    relatedArticleSlugs: ["why-faster-isn-t-always-better", "designing-for-human-connection"],
  },
  {
    id: "art-2",
    slug: "why-faster-isn-t-always-better",
    title: "Why faster isn't always better.",
    subtitle:
      "When Google's golden child sprinted to failure, and the rise of intentional slow design.",
    publishedAt: "Apr 22, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "7 min read",
    category: "Strategy",
    coverImage:
      "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg?scale-down-to=1024",
    featured: false,
    excerpt:
      "Speed is the tech industry's favorite metric. But when velocity replaces reflection, products lose their soul. Here is how balanced design velocity outperforms manic sprints.",
    intro:
      "The tech industry has spent the last decade fetishizing speed. 'Move fast and break things', 5-day design sprints, and two-week agile release cycles have trained us to measure engineering productivity strictly by tickets closed rather than value created.",
    sections: [
      {
        heading: "The Seductive Promise of Velocity",
        paragraphs: [
          "Moving fast feels exhilarating. It creates the illusion of relentless progress. Yet when teams compress problem-definition to a single afternoon brainstorm, they inevitably build high-fidelity solutions to the wrong problems.",
          "Rushing through foundational architecture produces crippling design debt that takes quarters to remediate.",
        ],
      },
      {
        heading: "The Slow Design Counter-Movement",
        paragraphs: [
          "Slow design is not laziness—it is extreme intentionality. It is the discipline to sit with user feedback, examine analogous systems, and prototype alternative architectures before writing a single line of production code.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "how-designers-and-developers-can-actually-collaborate",
      "the-psychology-of-white-space",
    ],
  },
  {
    id: "art-3",
    slug: "designing-for-human-connection",
    title: "Designing for human connection.",
    subtitle:
      "How thoughtful micro-interactions transform cold screens into memorable emotional moments.",
    publishedAt: "Apr 1, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "4 min read",
    category: "Frontend",
    coverImage:
      "https://framerusercontent.com/images/q3ruKmoVYmFXP9EeyZlQPnTDuVw.jpg?scale-down-to=1024",
    featured: false,
    excerpt:
      "Micro-interactions are the heartbeat of modern UI. Explore how physics-based animation, haptic feedback, and emotional design systems foster deep user trust.",
    intro:
      "Software often feels sterile—a matrix of gray rectangles and blue buttons. Yet the products we fall in love with always have an undeniable spark of humanity.",
    sections: [
      {
        heading: "The Science of Digital Emotion",
        paragraphs: [
          "When a button gently squashes on press, or an accordion expands with a high-damped spring, our brains perceive the digital element as tangible and trustworthy.",
          "Motion is not visual noise; it is spatial continuity that guides attention and rewards user curiosity.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "how-designers-and-developers-can-actually-collaborate",
      "the-psychology-of-white-space",
    ],
  },
  {
    id: "art-4",
    slug: "the-psychology-of-white-space",
    title: "The psychology of white space.",
    subtitle: "Why generous spacing improves comprehension by 32% and drives luxury perception.",
    publishedAt: "Feb 12, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "6 min read",
    category: "UI Engineering",
    coverImage:
      "https://framerusercontent.com/images/3IIKOQ9VkCZyf0KlL2N5yBg1cQ.jpg?scale-down-to=1024",
    featured: false,
    excerpt:
      "White space isn't empty—it's your most powerful design tool. Learn why generous spacing improves comprehension 32% and drives premium perception.",
    intro:
      "In 2013, New York's JFK Airport spent $300 million on new signage. The old signs were cramped, overwhelming, and universally hated. The new ones had 40% fewer words and 200% more white space. Passenger complaints dropped 60%.",
    sections: [
      {
        heading: "Why Our Brains Crave Breathing Room",
        paragraphs: [
          "Cognitive scientists have found that our brains process visual information in chunks. When elements are crammed together, our neural pathways work overtime trying to separate and categorize each piece.",
          "White space acts like punctuation for the eyes. It tells our brains where one thought ends and another begins.",
        ],
      },
    ],
    relatedArticleSlugs: ["why-faster-isn-t-always-better", "designing-for-human-connection"],
  },
];

export const getFeaturedArticle = (): ArticleDetailType =>
  articlesData.find((a) => a.featured) || articlesData[0];

export const getArticleBySlug = (slug: string): ArticleDetailType | undefined =>
  articlesData.find((a) => a.slug === slug);
