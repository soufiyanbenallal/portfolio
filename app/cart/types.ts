import type { ReactNode } from "react";

/**
 * ---------------------------------------------------------------------------
 * SECTION SYSTEM
 * ---------------------------------------------------------------------------
 * Every visual block of the drawer is a "section". Sections are declared as
 * data (id + enabled + order), not hardcoded JSX order, so a future admin
 * panel can simply persist an array of SectionConfig and the drawer will
 * reorder/show/hide itself automatically.
 */
export type SectionId =
  | "topBar"
  | "timer"
  | "promoProgress"
  | "cartItems"
  | "productUpsell"
  | "trustBadges"
  | "sideUpsell"
  | "footer";

export interface SectionConfig {
  id: SectionId;
  enabled: boolean;
  /** Lower renders first. Gaps are fine (10, 20, 30…) so an admin panel can
   *  insert sections between existing ones without renumbering everything. */
  order: number;
}

/**
 * ---------------------------------------------------------------------------
 * THEME / PRESET SYSTEM
 * ---------------------------------------------------------------------------
 * Everything here maps 1:1 to a CSS custom property consumed by the .module.css
 * files (see theme.ts -> buildThemeVars). Swapping the whole visual identity
 * of the drawer is just swapping this object — no component code changes.
 */
export interface CartDrawerTheme {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    primaryText: string;
    accent: string;
    accentText: string;
    success: string;
    danger: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
    baseSize: string;
    headingWeight: number;
    bodyWeight: number;
    letterSpacingTight: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadow: {
    drawer: string;
    card: string;
  };
  drawer: {
    position: "left" | "right";
    width: string;
    maxWidth: string;
    animationDuration: string;
    overlayColor: string;
  };
}

export interface CartDrawerSettings {
  theme: CartDrawerTheme;
  sections: SectionConfig[];
  currency?: string;

  topBar?: {
    title: string;
    showItemCount: boolean;
    closeAriaLabel?: string;
  };

  timer?: {
    enabled: boolean;
    minutes: number;
    message: string;
    expiredMessage: string;
    /** Reset the countdown every time the drawer opens vs. persist it. */
    persist: boolean;
  };

  promoProgress?: {
    /** Ordered reward tiers. The bar fills across all of them. */
    tiers: { threshold: number; label: string; reachedLabel: string }[];
  };

  productUpsell?: {
    heading: string;
    layout: "carousel" | "grid";
  };

  sideUpsell?: {
    heading: string;
    badge?: string;
  };

  trustBadges?: {
    badges: TrustBadge[];
  };

  footer?: {
    showSubtotal: boolean;
    subtotalNote?: string;
    checkoutLabel: string;
    continueShoppingLabel?: string;
  };
}

export interface CartItem {
  id: string;
  title: string;
  variantTitle?: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image: string;
  properties?: Record<string, string>;
}

export interface UpsellProduct {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
}

export interface TrustBadge {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface CartDrawerHandlers {
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddUpsell: (product: UpsellProduct) => void;
  onCheckout: () => void;
  onContinueShopping?: () => void;
}
