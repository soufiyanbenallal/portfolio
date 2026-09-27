import type { ProjectDetailType, ProjectItemType } from "@/types";

/*
 * Selected work — real, published and checkable.
 *
 * Every project here is live on npm, on GitHub or on this site. Stats are
 * facts that can be verified at the link (versions, licences, component
 * counts from each README), never performance claims. Covers are rendered
 * from the real thing: a live screenshot, or code quoted from the README.
 */
export const projectsData: ProjectDetailType[] = [
  {
    id: "proj-corex",
    slug: "corex-ui",
    title: "CoreX UI",
    client: "XCO Agency · open source",
    category: "Shopify",
    typeOfWork: "React component library",
    year: "2026",
    tagline: "Legacy Polaris React APIs, running on Shopify's new Polaris web components.",
    description:
      "A React wrapper layer that keeps the familiar @shopify/polaris component API while rendering Shopify's actively maintained Polaris web components underneath.",
    thumbnail: "/images/work/corex-ui.jpg",
    heroImage: "/images/work/corex-ui.jpg",
    accentColor: "#1f8a5b",
    liveUrl: "https://www.npmjs.com/package/@xco-agency/corex-ui",
    featured: true,
    order: 1,
    overview:
      "Shopify's Polaris moved from a React library to web components (`s-*` custom elements). CoreX UI lets an existing embedded app make that move by changing one import: the prop names stay the same, and the components render the new web components.",
    challenge:
      "Apps built on @shopify/polaris face a rewrite to adopt the new Polaris web components — every component, prop and event handler changes shape at once.",
    solution:
      "A thin, dependency-free wrapper layer: each component maps legacy props and events onto its `s-*` element, with a doc page per component listing the prop mapping. App Bridge helpers (AppWindow, AppNav, SaveBar, useToast, useSaveBar) come with it. The package is typed, built to ESM and CJS with tsup, and its prop and event mapping is covered by Vitest unit tests.",
    results: [
      "Migration by import swap — no prop renames in app code",
      "28 components plus App Bridge helpers in the current release",
      "Zero runtime dependencies; React is the only peer",
      "Published on npm under MIT",
    ],
    stats: [
      { label: "Components", value: "28" },
      { label: "Latest", value: "v0.1.8" },
      { label: "License", value: "MIT" },
    ],
    gallery: [
      {
        src: "/images/work/corex-ui.jpg",
        alt: "CoreX UI migration diff and the Polaris form it renders",
        aspectRatio: "16:9",
        caption: "The migration: swap the import source, keep the props",
      },
    ],
    techStack: ["React", "TypeScript", "Polaris web components", "App Bridge", "tsup", "Vitest"],
    relatedProjectSlugs: ["polaris-playground", "sirius-ui"],
  },
  {
    id: "proj-polaris",
    slug: "polaris-playground",
    title: "Polaris Playground",
    client: "Personal project",
    category: "Shopify",
    typeOfWork: "Component docs & playground",
    year: "2026",
    tagline: "Ready-made Shopify app screens, built on Polaris web components.",
    description:
      "An interactive catalog of Shopify admin app blocks — onboarding, setup guides, pricing matrices, data tables — each with a live preview, its source and an install command.",
    thumbnail: "/images/work/polaris-playground.jpg",
    heroImage: "/images/work/polaris-playground.jpg",
    accentColor: "#5157d6",
    liveUrl: "/polaris-playground",
    featured: true,
    order: 2,
    overview:
      "Most Shopify apps rebuild the same screens: onboarding, a setup checklist, billing plans, activity logs. The Polaris Playground collects them as reusable blocks built on Polaris web components, so a new app can start from working screens instead of blank ones.",
    challenge:
      "Polaris documents individual components, not the complete app screens merchants actually move through — and those screens are where most app-building time goes.",
    solution:
      "A documentation app with a category-grouped sidebar, a live preview per block with desktop, tablet and mobile widths, a Preview / Code toggle and a one-line install command for each block.",
    results: [
      "17 app UI blocks across 7 categories",
      "Live preview, source and install command for every block",
      "Runs on this site — open it from the navigation",
    ],
    stats: [
      { label: "Blocks", value: "17" },
      { label: "Categories", value: "7" },
      { label: "Status", value: "Live" },
    ],
    gallery: [
      {
        src: "/images/work/polaris-playground.jpg",
        alt: "Setup guide block in the Polaris Playground",
        aspectRatio: "16:9",
        caption: "A merchant setup checklist block, with preview and install command",
      },
      {
        src: "/images/work/polaris-playground-overview.jpg",
        alt: "Polaris Playground overview of block categories",
        aspectRatio: "16:9",
        caption: "The overview: blocks grouped by what the merchant is doing",
      },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Polaris web components", "Tailwind CSS"],
    relatedProjectSlugs: ["corex-ui", "sirius-ui"],
  },
  {
    id: "proj-sirius",
    slug: "sirius-ui",
    title: "Sirius UI",
    client: "Ader Solutions",
    category: "Design systems",
    typeOfWork: "React & Vue component libraries",
    year: "2025",
    tagline: "One design system, shipped as matching React and Vue libraries.",
    description:
      "Ader Solutions' UI component libraries for React and Vue 3, published alongside the company's SVG icon package.",
    thumbnail: "/images/work/sirius-ui.jpg",
    heroImage: "/images/work/sirius-ui.jpg",
    accentColor: "#2b6fd6",
    liveUrl: "https://www.npmjs.com/package/@adersolutions/sirius-react",
    featured: true,
    order: 3,
    overview:
      "Sirius is the component library behind Ader Solutions' products, published twice — once for React and once for Vue 3 — with the same components, the same variants and the same styling, plus @adersolutions/icons for iconography.",
    challenge:
      "Products written in two frameworks drift apart visually when each keeps its own buttons, forms and overlays.",
    solution:
      "Two typed packages with a shared component list and a single stylesheet, built on Headless UI for accessible primitives and Tailwind CSS for styling. Components cover actions, feedback, forms, layout, navigation, overlays, tables and typography.",
    results: [
      "36 components in each of the React and Vue packages",
      "Accessible primitives through Headless UI",
      "Companion icon package: @adersolutions/icons",
      "Published on npm under MIT",
    ],
    stats: [
      { label: "Components", value: "36" },
      { label: "Frameworks", value: "React · Vue" },
      { label: "License", value: "MIT" },
    ],
    gallery: [
      {
        src: "/images/work/sirius-ui.jpg",
        alt: "Sirius UI usage in React and Vue, with component counts by category",
        aspectRatio: "16:9",
        caption: "Same components, both frameworks",
      },
    ],
    techStack: ["React", "Vue 3", "TypeScript", "Headless UI", "Tailwind CSS"],
    relatedProjectSlugs: ["corex-ui", "polaris-playground"],
  },
  {
    id: "proj-nwsbox",
    slug: "nwsbox",
    title: "nwsbox",
    client: "XCO Agency · open source",
    category: "Tooling",
    typeOfWork: "Developer CLI",
    year: "2025",
    tagline: "virtualenv for Node — isolated versions, auth, caches and config per project.",
    description:
      "A command-line tool that gives every project its own Node.js version, CLI credentials, package-manager caches and config files.",
    thumbnail: "/images/work/nwsbox.jpg",
    heroImage: "/images/work/nwsbox.jpg",
    accentColor: "#d0661e",
    liveUrl: "https://github.com/XCO-Agency/nwsbox",
    featured: true,
    order: 4,
    overview:
      "Working across many client projects means juggling Node versions, npm tokens and CLI logins. nwsbox creates a `.ws/` workspace inside a project so everything it needs is isolated there, and activates it with one line in the shell.",
    challenge:
      "Global Node installs mix everything together: versions conflict, credentials leak between projects, and shared npm, yarn and pnpm caches pollute each other.",
    solution:
      "An oclif CLI with `init`, `node install / use / list`, `run`, `exec`, `activate` and `info` commands. Each workspace gets its own Node.js binaries, shims on PATH, isolated caches and config, so `npm login` in one project never touches another.",
    results: [
      "Per-project Node.js versions, auth, caches and config",
      "Shell activation with `eval \"$(nwsbox activate)\"`",
      "Six releases on npm, MIT licensed",
    ],
    stats: [
      { label: "Latest", value: "v0.4.6" },
      { label: "Releases", value: "6" },
      { label: "License", value: "MIT" },
    ],
    gallery: [
      {
        src: "/images/work/nwsbox.jpg",
        alt: "nwsbox quick start in a terminal",
        aspectRatio: "16:9",
        caption: "The quick start, straight from the README",
      },
    ],
    techStack: ["Node.js", "TypeScript", "oclif", "CLI"],
    relatedProjectSlugs: ["cw-router", "corex-ui"],
  },
  {
    id: "proj-cw-router",
    slug: "cw-router",
    title: "cw-router",
    client: "Open source",
    category: "Tooling",
    typeOfWork: "Preact router",
    year: "2026",
    tagline: "A virtual router for embedded widgets, in under 2 KB.",
    description:
      "A minimal Preact router that reads its route from a query parameter, for widgets embedded on sites whose URLs they don't control.",
    thumbnail: "/images/work/cw-router.jpg",
    heroImage: "/images/work/cw-router.jpg",
    accentColor: "#3a3b41",
    liveUrl: "https://www.npmjs.com/package/cw-router",
    featured: false,
    order: 5,
    overview:
      "An embedded widget can't own the host page's path, so pathname-based routers don't fit. cw-router routes on a `_cw` query parameter instead, which keeps deep links working inside someone else's site.",
    challenge:
      "Routers like React Router or Wouter assume `window.location.pathname` is theirs — on a third-party page, it isn't.",
    solution:
      "A Preact-native router with `Route`, `Switch`, `Link` and `useLocation`, dynamic `:param` segments, and patched `pushState` / `replaceState` so programmatic navigation updates components immediately.",
    results: [
      "About 1.96 KB minified, with Preact as its only dependency",
      "Deep links through the `_cw` query parameter",
      "Published on npm under ISC",
    ],
    stats: [
      { label: "Size", value: "~2 KB" },
      { label: "Latest", value: "v1.0.1" },
      { label: "License", value: "ISC" },
    ],
    gallery: [
      {
        src: "/images/work/cw-router.jpg",
        alt: "cw-router usage example and its _cw routing contract",
        aspectRatio: "16:9",
        caption: "Routes, and how `_cw` values resolve",
      },
    ],
    techStack: ["Preact", "TypeScript"],
    relatedProjectSlugs: ["nwsbox", "corex-ui"],
  },
];

export const getProjectBySlug = (slug: string): ProjectDetailType | undefined =>
  projectsData.find((project) => project.slug === slug);

export const getFeaturedProjects = (): ProjectItemType[] =>
  projectsData.filter((project) => project.featured);
