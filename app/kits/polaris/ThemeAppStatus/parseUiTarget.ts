/**
 * Turns a UI extension target into a surface name a merchant recognises.
 *
 * Targets look like `purchase.thank-you.block.render` or
 * `customer-account.order-status.block.render`. There are many and Shopify adds
 * more, so this is prefix-based rather than an exhaustive table: we name the
 * surface (checkout / customer account / admin / POS) and humanise the rest.
 * Unrecognised targets fall back to the raw string — better a real identifier
 * than a wrong guess.
 */

const SURFACE_PREFIXES: Array<{ prefix: string; surface: string }> = [
  { prefix: "purchase.thank-you", surface: "Thank you page" },
  { prefix: "purchase.checkout", surface: "Checkout" },
  { prefix: "purchase.address", surface: "Checkout address" },
  { prefix: "customer-account.order-status", surface: "Order status page" },
  { prefix: "customer-account.order-index", surface: "Order list" },
  { prefix: "customer-account.profile", surface: "Customer profile" },
  { prefix: "customer-account", surface: "Customer account" },
  { prefix: "admin.product-details", surface: "Admin — product details" },
  { prefix: "admin.order-details", surface: "Admin — order details" },
  { prefix: "admin.customer-details", surface: "Admin — customer details" },
  { prefix: "admin", surface: "Admin" },
  { prefix: "pos", surface: "Point of Sale" },
];

export function parseUiTarget(target: string): string {
  if (!target) return target;

  // Longest prefix wins — `customer-account.order-status` must beat
  // `customer-account`. The table is ordered specific-first, but sort defensively
  // so future edits can't silently break the match.
  const hit = [...SURFACE_PREFIXES]
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find((s) => target === s.prefix || target.startsWith(`${s.prefix}.`));

  return hit ? hit.surface : target;
}
