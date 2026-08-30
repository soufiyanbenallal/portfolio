import type React from "react";
import type { NavLinkItemType } from "./common.type";

export type NavbarActionsVariantType = "default" | "compact";

export type NavbarActionsPropsType = {
  variant?: NavbarActionsVariantType;
  onOpenContact: () => void;
  onOpenBooking: () => void;
  className?: string;
};

export type NavbarDesktopPropsType = {
  isPastHero: boolean;
  navLinks: NavLinkItemType[];
  activeSection: string;
  isHomepage: boolean;
  onAnchorClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isAnchor?: boolean
  ) => void;
  onOpenContact: () => void;
  onOpenBooking: () => void;
  resolveHref: (href: string, isAnchor?: boolean) => string;
};

export type NavbarMobilePropsType = {
  isPastHero: boolean;
  isOpen: boolean;
  navLinks: NavLinkItemType[];
  isHomepage: boolean;
  onToggle: () => void;
  onClose: () => void;
  onAnchorClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isAnchor?: boolean
  ) => void;
  onOpenContact: () => void;
  onOpenBooking: () => void;
  resolveHref: (href: string, isAnchor?: boolean) => string;
};

export type NavbarSharedPropsType = {
  className?: string;
};
