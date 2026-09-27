import type React from "react";
import type { NavLinkItemType } from "./common.type";

type AnchorClickHandlerType = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  isAnchor?: boolean
) => void;

export type NavbarActionsPropsType = {
  /** Collapsed pill: icon-only actions. */
  collapsed: boolean;
  /** Show the primary "Book a call" action (hidden while the hero's own CTA is on screen). */
  showPrimary: boolean;
  onOpenContact: () => void;
  className?: string;
};

export type NavbarDesktopPropsType = {
  isCollapsed: boolean;
  showPrimary: boolean;
  navLinks: NavLinkItemType[];
  activeSection: string;
  isHomepage: boolean;
  onAnchorClick: AnchorClickHandlerType;
  onOpenContact: () => void;
  resolveHref: (href: string, isAnchor?: boolean) => string;
};

export type NavbarMobilePropsType = {
  isCollapsed: boolean;
  showPrimary: boolean;
  isOpen: boolean;
  navLinks: NavLinkItemType[];
  onToggle: () => void;
  onAnchorClick: AnchorClickHandlerType;
  onOpenContact: () => void;
  resolveHref: (href: string, isAnchor?: boolean) => string;
};

export type NavbarSharedPropsType = {
  className?: string;
};
