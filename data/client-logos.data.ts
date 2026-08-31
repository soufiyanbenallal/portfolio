import type { ClientLogoItemType, NavLinkItemType, SocialLinkItemType } from "@/types";

export const clientLogosData: ClientLogoItemType[] = [
  { id: "logo-1", name: "Frequencii", svgIcon: "frequencii" },
  { id: "logo-2", name: "Kintsugi", svgIcon: "kintsugi" },
  { id: "logo-3", name: "CoreOS", svgIcon: "coreos" },
  { id: "logo-4", name: "Luminary", svgIcon: "luminary" },
  { id: "logo-5", name: "KYMA", svgIcon: "kyma" },
  { id: "logo-6", name: "Kora", svgIcon: "kora" },
  { id: "logo-7", name: "Mugen", svgIcon: "mugen" },
  { id: "logo-8", name: "Axiom", svgIcon: "axiom" },
];

export const navLinksData: NavLinkItemType[] = [
  { label: "Work", href: "#projects", isAnchor: true },
  { label: "Services", href: "#services", isAnchor: true },
  { label: "Blog", href: "#blog", isAnchor: true },
  { label: "Polaris", href: "/polaris-playground", isAnchor: false },
  { label: "Contact", href: "#contact", isAnchor: true },
];

export const socialLinksData: SocialLinkItemType[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/soufiyan-benallal",
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
    platform: "X / Twitter",
    url: "https://x.com",
    handle: "@soufiyanbenallal",
    iconName: "x",
  },
  {
    platform: "Email",
    url: "mailto:benallalsoufiane1@gmail.com",
    handle: "benallalsoufiane1@gmail.com",
    iconName: "mail",
  },
];
