import type { ClientLogoItemType, NavLinkItemType, SocialLinkItemType } from "@/types";

export const clientLogosData: ClientLogoItemType[] = [
  { id: "logo-1", name: "Ader Solutions", svgIcon: "ader-solutions" },
  { id: "logo-2", name: "Le Ventures", svgIcon: "le-ventures" },
  { id: "logo-3", name: "FORNET MAROC", svgIcon: "fornet-maroc" },
  { id: "logo-4", name: "ARA Systèmes & Technologie", svgIcon: "ara-systemes" },
  { id: "logo-5", name: "Morrocow3", svgIcon: "morrocow3" },
];

export const navLinksData: NavLinkItemType[] = [
  { label: "Work", href: "#projects", isAnchor: true },
  { label: "Services", href: "#services", isAnchor: true },
  { label: "About", href: "#about", isAnchor: true },
  { label: "GitHub", href: "#github", isAnchor: true },
  { label: "Blog", href: "#blog", isAnchor: true },
  { label: "Polaris", href: "/polaris-playground", isAnchor: false },
  { label: "Contact", href: "#contact", isAnchor: true },
];

export const socialLinksData: SocialLinkItemType[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/soufiyanbenallal",
    handle: "Soufiyan Benallal",
    iconName: "linkedin",
  },
  {
    platform: "GitHub",
    url: "https://github.com/soufiyanbenallal",
    handle: "soufiyanbenallal",
    iconName: "github",
  },
  {
    platform: "NPM",
    url: "https://www.npmjs.com/~beyonder.sb",
    handle: "beyonder.sb",
    iconName: "npm",
  },
  {
    platform: "Email",
    url: "mailto:benallalsoufiane1@gmail.com",
    handle: "benallalsoufiane1@gmail.com",
    iconName: "mail",
  },
];
