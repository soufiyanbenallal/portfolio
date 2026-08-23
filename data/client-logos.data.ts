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
  { label: "Contact", href: "#contact", isAnchor: true },
];

export const socialLinksData: SocialLinkItemType[] = [
  { platform: "X / Twitter", url: "https://x.com", handle: "@josephalexander", iconName: "x" },
  { platform: "LinkedIn", url: "https://linkedin.com", handle: "Joseph Alexander", iconName: "linkedin" },
  { platform: "Dribbble", url: "https://dribbble.com", handle: "josephalexander", iconName: "dribbble" },
  { platform: "Behance", url: "https://behance.net", handle: "josephalexander", iconName: "behance" },
  { platform: "Instagram", url: "https://instagram.com", handle: "@josephalexander", iconName: "instagram" },
  { platform: "GitHub", url: "https://github.com", handle: "josephalexander", iconName: "github" },
];
