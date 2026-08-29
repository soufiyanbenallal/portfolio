/**
 * Types for the ThemeAppStatus component.
 *
 * The App Bridge types (`ExtensionInfo`, `ThemeExtensionActivation`, ...) ship
 * as *ambient* declarations — `@shopify/app-bridge-types` ends in `export {}`,
 * so they cannot be imported by name. The `Raw*` types below mirror that
 * contract (app-bridge-types 0.7.1) so this component stays self-contained.
 */

/** Mirrors App Bridge `ActivationStatus`. */
export type RawActivationStatus = "active" | "available" | "unavailable";

/** Mirrors App Bridge `ThemeAppBlockTarget` — app blocks live in sections. */
export type RawBlockTarget = "section";

/** Mirrors App Bridge `ThemeAppEmbedTarget` — embeds live in the document. */
export type RawEmbedTarget = "head" | "body" | "compliance_head";

/** Mirrors App Bridge `ThemeAppBlockActivation` — one placement in one theme. */
export interface RawThemeBlockActivation {
  /** e.g. `template--product.custom/main/my_app_rating_GPzUYy`, or `theme`. */
  target: string;
  /** `gid://shopify/OnlineStoreTheme/{id}` */
  themeId: string;
}

/** Mirrors App Bridge `ThemeExtensionActivation` — one block or embed. */
export interface RawThemeExtensionActivation {
  target: RawBlockTarget | RawEmbedTarget;
  handle: string;
  name: string;
  status: RawActivationStatus;
  activations: RawThemeBlockActivation[];
}

/** Mirrors App Bridge `UiExtensionActivation` — a target, and nothing else. */
export interface RawUiExtensionActivation {
  /** e.g. `purchase.thank-you.block.render`. */
  target: string;
}

/** Mirrors App Bridge `ExtensionInfo`. */
export interface RawExtensionInfo {
  handle: string;
  type: "ui_extension" | "theme_app_extension";
  activations: unknown[];
}

/**
 * A UI extension (checkout, customer account, admin, POS).
 *
 * App Bridge reports less for these than for theme blocks: a handle and target
 * strings, with no display name and — unlike `ThemeExtensionActivation` — no
 * explicit `status` field. So status is *inferred*: an activation target being
 * present is the activation. No targets means it isn't live anywhere.
 */
export type UiExtensionStatus = "active" | "not_added";

export interface UiExtensionItem {
  handle: string;
  /** Handle prettified for display — no display name is exposed. */
  title: string;
  status: UiExtensionStatus;
  /** Humanised surface names, e.g. "Thank you page". */
  surfaces: string[];
  /** Raw targets, kept for the debug view / tooltips. */
  targets: string[];
}

/**
 * Merchant-facing status, derived from `status` + the nested per-theme
 * activations. Ordered most-live to least-live.
 */
export type ThemeAppItemStatus =
  "active_on_published" | "active_on_any" | "available_not_added" | "unavailable";

/**
 * Per-placement status.
 * - `live`    — on the published theme; the customer can see it.
 * - `draft`   — on a theme that isn't published.
 * - `unknown` — no `publishedThemeId` was supplied, so we can't tell. Never
 *   claim "draft" here: absence of proof isn't proof of absence.
 */
export type ThemeAppPlacementStatus = "live" | "draft" | "unknown";

/** One concrete placement of a block/embed inside one theme. */
export interface ThemeAppPlacement {
  /**
   * Theme name for `themeId`, when the theme lookup resolved. Null when Direct
   * API access is unavailable — App Bridge reports only the id.
   */
  themeName?: string | null;
  /**
   * True when the placement covers a whole theme rather than one template —
   * how embeds report themselves. The UI names the theme instead of a page.
   */
  isWholeTheme?: boolean;
  themeId: string;
  status: ThemeAppPlacementStatus;
  /** Raw App Bridge target, e.g. `template--product.custom/main/{blockId}`. */
  target: string;
  /** Page/template label, or null when the target shape isn't recognised. */
  pageLabel: string | null;
  /**
   * Theme-editor deep link opening this exact template, or null when the
   * target isn't a template (section groups, embeds).
   */
  editorUrl: string | null;
  /** True when this placement is on the published theme. */
  isPublished: boolean;
}

/** One block or embed, resolved for display. */
export interface ThemeAppItem {
  handle: string;
  name: string;
  status: ThemeAppItemStatus;
  /** True for an embed (head/body/compliance_head), false for an app block. */
  isEmbed: boolean;
  /**
   * Theme-editor deep link that opens this item ready to be turned on, or null
   * when it can't be built honestly — no published theme resolved, no app id
   * available, or the item is already active. A dead "Enable" button is worse
   * than none, so the UI renders the action only when this is set.
   */
  enableUrl: string | null;
  /** Distinct themes this item is placed on. 0 unless status is active. */
  themeCount: number;
  /**
   * Where this item actually sits. Empty unless active. When a
   * `publishedThemeId` is supplied these are narrowed to the live theme, so
   * the UI lists the pages the merchant can actually see.
   */
  placements: ThemeAppPlacement[];
}

/**
 * Note on shape: the brief specified a singular `embed`, but a theme app
 * extension may declare more than one (`head` + `body` + `compliance_head`).
 * Collapsing them would hide an embed from the merchant — and from the
 * reviewer — so embeds is a list. Apps with one embed still render one row.
 */
export interface ThemeExtensionStatus {
  embeds: ThemeAppItem[];
  blocks: ThemeAppItem[];
  /** Non-theme extensions (checkout / customer account / admin / POS). */
  uiExtensions: UiExtensionItem[];
  /**
   * Whole-app rollup for the header badge: "active" when any block or embed is
   * live somewhere, otherwise "inactive".
   */
  overall: "active" | "inactive";
  /** Blocks currently active — drives the "You have N active app blocks" line. */
  activeBlockCount: number;
}
