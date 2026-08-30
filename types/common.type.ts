export type CursorModeType = "default" | "project" | "article" | "grow";

export type NavLinkItemType = {
  label: string;
  href: string;
  isAnchor?: boolean;
};

export type SocialLinkItemType = {
  platform: string;
  url: string;
  handle: string;
  iconName: string;
};

export type ClientLogoItemType = {
  id: string;
  name: string;
  svgIcon: string;
};
