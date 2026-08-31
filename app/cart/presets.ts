import type { CartDrawerTheme, CartDrawerSettings, SectionConfig } from './types';

/**
 * ---------------------------------------------------------------------------
 * PRESETS
 * ---------------------------------------------------------------------------
 * These stand in for what an admin panel would eventually persist (e.g. one
 * JSON blob per merchant in Shopify metafields). Nothing here is imported by
 * the components directly — they only ever consume a CartDrawerTheme /
 * CartDrawerSettings object, so wiring up a real settings UI later is just
 * building a form that edits these shapes and passing the result as props.
 */

const editorial: CartDrawerTheme = {
  colors: {
    background: '#FBF7F0',
    surface: '#FFFFFF',
    surfaceMuted: '#F1EBE0',
    text: '#211D18',
    textMuted: '#726B5E',
    border: '#E4DBC9',
    primary: '#211D18',
    primaryText: '#FBF7F0',
    accent: '#B5502A',
    accentText: '#FFFFFF',
    success: '#3F6B4A',
    danger: '#B23B2E',
  },
  typography: {
    displayFont: "'Fraunces', 'Iowan Old Style', Georgia, serif",
    bodyFont:
      "'Inter var', 'Helvetica Neue', Arial, sans-serif",
    baseSize: '14px',
    headingWeight: 600,
    bodyWeight: 400,
    letterSpacingTight: '-0.01em',
  },
  radius: { sm: '4px', md: '10px', lg: '18px', pill: '999px' },
  space: { xs: '6px', sm: '12px', md: '18px', lg: '28px', xl: '40px' },
  shadow: {
    drawer: '-12px 0 40px rgba(33, 29, 24, 0.14)',
    card: '0 1px 2px rgba(33, 29, 24, 0.06)',
  },
  drawer: {
    position: 'right',
    width: '440px',
    maxWidth: '92vw',
    animationDuration: '380ms',
    overlayColor: 'rgba(33, 29, 24, 0.45)',
  },
};

const midnight: CartDrawerTheme = {
  colors: {
    background: '#0F1115',
    surface: '#181B21',
    surfaceMuted: '#20242C',
    text: '#F3F4F6',
    textMuted: '#9AA1AC',
    border: '#2A2E37',
    primary: '#F3F4F6',
    primaryText: '#0F1115',
    accent: '#7C9CFF',
    accentText: '#0F1115',
    success: '#5FD98B',
    danger: '#FF7B72',
  },
  typography: {
    displayFont: "'Space Grotesk', 'Segoe UI', sans-serif",
    bodyFont: "'Inter var', 'Segoe UI', sans-serif",
    baseSize: '14px',
    headingWeight: 600,
    bodyWeight: 400,
    letterSpacingTight: '-0.01em',
  },
  radius: { sm: '4px', md: '8px', lg: '14px', pill: '999px' },
  space: { xs: '6px', sm: '12px', md: '18px', lg: '28px', xl: '40px' },
  shadow: {
    drawer: '-12px 0 40px rgba(0, 0, 0, 0.5)',
    card: '0 1px 2px rgba(0, 0, 0, 0.4)',
  },
  drawer: {
    position: 'right',
    width: '440px',
    maxWidth: '92vw',
    animationDuration: '320ms',
    overlayColor: 'rgba(0, 0, 0, 0.6)',
  },
};

const minimal: CartDrawerTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceMuted: '#F5F5F5',
    text: '#111111',
    textMuted: '#767676',
    border: '#E8E8E8',
    primary: '#111111',
    primaryText: '#FFFFFF',
    accent: '#111111',
    accentText: '#FFFFFF',
    success: '#1F7A45',
    danger: '#C0342C',
  },
  typography: {
    displayFont: "'Helvetica Neue', Arial, sans-serif",
    bodyFont: "'Helvetica Neue', Arial, sans-serif",
    baseSize: '13px',
    headingWeight: 500,
    bodyWeight: 400,
    letterSpacingTight: '0em',
  },
  radius: { sm: '0px', md: '0px', lg: '0px', pill: '999px' },
  space: { xs: '6px', sm: '12px', md: '18px', lg: '26px', xl: '36px' },
  shadow: {
    drawer: '-8px 0 24px rgba(0, 0, 0, 0.08)',
    card: 'none',
  },
  drawer: {
    position: 'right',
    width: '420px',
    maxWidth: '92vw',
    animationDuration: '260ms',
    overlayColor: 'rgba(0, 0, 0, 0.35)',
  },
};

export const THEME_PRESETS = {
  editorial,
  midnight,
  minimal,
} satisfies Record<string, CartDrawerTheme>;

export type ThemePresetName = keyof typeof THEME_PRESETS;

/**
 * Default section order. An admin panel just needs to persist this array
 * (id, enabled, order) — the drawer sorts + filters it on every render.
 */
export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'topBar', enabled: true, order: 10 },
  { id: 'timer', enabled: true, order: 20 },
  { id: 'promoProgress', enabled: true, order: 30 },
  { id: 'cartItems', enabled: true, order: 40 },
  { id: 'productUpsell', enabled: true, order: 50 },
  { id: 'trustBadges', enabled: true, order: 60 },
  { id: 'sideUpsell', enabled: false, order: 70 },
  { id: 'footer', enabled: true, order: 80 },
];

export const DEFAULT_SETTINGS: CartDrawerSettings = {
  theme: editorial,
  sections: DEFAULT_SECTIONS,
  currency: 'USD',
  topBar: {
    title: 'Your Cart',
    showItemCount: true,
  },
  timer: {
    enabled: true,
    minutes: 10,
    message: 'Items reserved for',
    expiredMessage: 'Your reservation has expired — items may sell out.',
    persist: false,
  },
  promoProgress: {
    tiers: [
      { threshold: 50, label: 'Free shipping', reachedLabel: 'Free shipping unlocked!' },
      { threshold: 100, label: 'Free gift', reachedLabel: 'Free gift unlocked!' },
    ],
  },
  productUpsell: {
    heading: 'Frequently bought together',
    layout: 'carousel',
  },
  sideUpsell: {
    heading: 'Complete the look',
    badge: 'Recommended',
  },
  footer: {
    showSubtotal: true,
    subtotalNote: 'Taxes and shipping calculated at checkout',
    checkoutLabel: 'Checkout',
    continueShoppingLabel: 'Continue shopping',
  },
};
