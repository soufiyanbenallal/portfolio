import type { CSSProperties } from 'react';
import type { CartDrawerTheme } from './types';

/**
 * Flattens a CartDrawerTheme into CSS custom properties. Spread the result
 * onto the drawer's root element style prop and every section's
 * .module.css can simply read var(--cart-*). This is the ONLY place that
 * needs to know how the theme object maps to CSS — add a field to
 * CartDrawerTheme, add one line here, and it's themeable everywhere.
 */
export function buildThemeVars(theme: CartDrawerTheme): CSSProperties {
  const vars: Record<string, string> = {
    '--cart-color-bg': theme.colors.background,
    '--cart-color-surface': theme.colors.surface,
    '--cart-color-surface-muted': theme.colors.surfaceMuted,
    '--cart-color-text': theme.colors.text,
    '--cart-color-text-muted': theme.colors.textMuted,
    '--cart-color-border': theme.colors.border,
    '--cart-color-primary': theme.colors.primary,
    '--cart-color-primary-text': theme.colors.primaryText,
    '--cart-color-accent': theme.colors.accent,
    '--cart-color-accent-text': theme.colors.accentText,
    '--cart-color-success': theme.colors.success,
    '--cart-color-danger': theme.colors.danger,

    '--cart-font-display': theme.typography.displayFont,
    '--cart-font-body': theme.typography.bodyFont,
    '--cart-font-size-base': theme.typography.baseSize,
    '--cart-font-weight-heading': String(theme.typography.headingWeight),
    '--cart-font-weight-body': String(theme.typography.bodyWeight),
    '--cart-letter-spacing-tight': theme.typography.letterSpacingTight,

    '--cart-radius-sm': theme.radius.sm,
    '--cart-radius-md': theme.radius.md,
    '--cart-radius-lg': theme.radius.lg,
    '--cart-radius-pill': theme.radius.pill,

    '--cart-space-xs': theme.space.xs,
    '--cart-space-sm': theme.space.sm,
    '--cart-space-md': theme.space.md,
    '--cart-space-lg': theme.space.lg,
    '--cart-space-xl': theme.space.xl,

    '--cart-shadow-drawer': theme.shadow.drawer,
    '--cart-shadow-card': theme.shadow.card,

    '--cart-drawer-width': theme.drawer.width,
    '--cart-drawer-max-width': theme.drawer.maxWidth,
    '--cart-drawer-duration': theme.drawer.animationDuration,
    '--cart-overlay-color': theme.drawer.overlayColor,
  };

  return vars as CSSProperties;
}
