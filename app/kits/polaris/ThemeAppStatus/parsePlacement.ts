/**
 * Turns a raw App Bridge placement target into a page/template label the
 * merchant recognises.
 *
 * Shopify documents one shape:
 *   `template--product.alternate/main/my_app_product_rating_GPzUYy`
 * and real themes also emit id-bearing variants:
 *   `template--15945716433--product/main/{blockId}`
 *   `sections--15945716433--header/{blockId}`
 * Embeds report `theme`, or `theme/{blockKey}`.
 *
 * The format is not contractual, so this is best-effort: anything unrecognised
 * returns `null` and the UI falls back to showing the raw target rather than
 * inventing a page name.
 */

const TITLE_CASE_EXCEPTIONS: Record<string, string> = {
  index: "Home page",
  product: "Product page",
  collection: "Collection page",
  cart: "Cart page",
  page: "Page",
  blog: "Blog page",
  article: "Article page",
  search: "Search page",
  customers: "Customer pages",
  "404": "404 page",
  password: "Password page",
  list_collections: "Collections list page",
};

function humanize(token: string): string {
  const known = TITLE_CASE_EXCEPTIONS[token];
  if (known) return known;
  const spaced = token.replace(/[-_]/g, " ").trim();
  if (!spaced) return token;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export interface ParsedPlacement {
  /** Merchant-facing page label, or null when the target isn't recognised. */
  pageLabel: string | null;
  /**
   * Raw template token for a theme-editor deep link (`product`,
   * `product.alternate`, `index`). Null for section groups and embeds, where
   * `?template=` wouldn't resolve to anything.
   */
  templateId: string | null;
  /** True for a whole-theme placement (how embeds report themselves). */
  isWholeTheme: boolean;
}

const EMPTY: ParsedPlacement = {
  pageLabel: null,
  templateId: null,
  isWholeTheme: false,
};

export function parsePlacement(target: string): ParsedPlacement {
  if (!target) return EMPTY;

  // `template--product.alternate/main/blockId` -> `template--product.alternate`
  const head = target.split("/")[0];
  if (!head) return EMPTY;

  // Embeds attach to the document, not a template. Documented as the literal
  // `theme`, but real stores also emit `theme/{blockKey}` — treat both the same,
  // or the key leaks into the UI as an unrecognised target.
  if (head === "theme") {
    return { pageLabel: null, templateId: null, isWholeTheme: true };
  }

  const match = /^(template|sections)--/.exec(head);
  if (!match) return EMPTY;

  const isTemplate = match[1] === "template";
  const body = head.replace(/^(template|sections)--/, "");

  // Drop theme-id segments: `15945716433--product` -> `product`.
  // Fall back to the unfiltered segments when everything looks numeric, so a
  // legitimately numeric template (`template--404`) still resolves.
  const all = body.split("--").filter(Boolean);
  const nonNumeric = all.filter((s) => !/^\d+$/.test(s));
  const segments = nonNumeric.length > 0 ? nonNumeric : all;
  const last = segments[segments.length - 1];
  if (!last) return EMPTY;

  // `product.alternate` -> base `product`, variant `alternate`
  const [base, ...variantParts] = last.split(".");
  if (!base) return EMPTY;

  const variant = variantParts.join(".");
  const label = humanize(base);

  return {
    pageLabel: variant ? `${label} (${humanize(variant)})` : label,
    // Only `template--` targets map to a `?template=` deep link. A section
    // group (`sections--header`) isn't a template, so linking would 404.
    templateId: isTemplate ? last : null,
    isWholeTheme: false,
  };
}
