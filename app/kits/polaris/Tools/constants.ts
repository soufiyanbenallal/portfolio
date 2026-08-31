import type { ToolCategoryType } from "./types";

// ─── Default Category & Tool Configuration ────────────────────────────────────

export const TOOLS_CATEGORIES_DEFAULT: ToolCategoryType[] = [
  {
    id: "product-discovery",
    title: "Product Discovery & Detail Page",
    icon: "search",
    tools: [
      {
        id: "fbt",
        name: "Frequently Bought Together (FBT)",
        tag: "Core Default",
        description:
          "Amazon-style multi-item bundling directly on product detail pages to boost order sizes.",
        status: "active",
        actionVariant: "switch",
      },
      {
        id: "product-addons",
        name: "Product Add-Ons & Protection",
        description:
          "Optional add-ons (shipping protection, gift wrapping, priority processing) on product & cart pages.",
        status: "needs_setup",
        actionVariant: "setup",
        actionLabel: "Set Up",
      },
      {
        id: "ai-recommendations",
        name: "Smart AI Recommendations",
        description:
          "Automated co-occurrence recommendations surfaced dynamically across storefront touchpoints.",
        status: "active",
        actionVariant: "switch",
      },
    ],
  },
  {
    id: "in-cart",
    title: "In-Cart & Cart Drawer Experience",
    icon: "cart",
    tools: [
      {
        id: "cart-drawer",
        name: "Slide-Out Cart Drawer",
        tag: "Core Default",
        description:
          "A high-converting slide-out cart with a rewards progress bar, urgency timer, and in-cart upsells.",
        status: "needs_setup",
        actionVariant: "setup",
        actionLabel: "Set Up",
      },
      {
        id: "in-cart-upsells",
        name: "In-Cart Upsells",
        tag: "Core Default",
        description:
          "Targeted 1-click upsell product recommendations surfaced inside the slide-out cart.",
        status: "active",
        actionVariant: "switch",
      },
      {
        id: "volume-breaks",
        name: "Native Discounts & Volume Breaks",
        description:
          "Tiered quantity breaks and BOGO rules evaluated natively in Shopify Checkout via Functions.",
        status: "locked",
        actionVariant: "upgrade",
        actionLabel: "Upgrade to PRO",
      },
      {
        id: "free-gifts",
        name: "Free Gifts with Purchase",
        description:
          "Automatic free gift tier unlocks based on cart subtotal thresholds or qualifying items.",
        status: "needs_setup",
        actionVariant: "setup",
        actionLabel: "Set Up",
      },
    ],
  },
  {
    id: "checkout",
    title: "High-Intent Checkout Experience",
    icon: "credit-card",
    tools: [
      {
        id: "checkout-bumps",
        name: "Checkout Offers & Order Bumps",
        description: "High-intent impulse order bumps rendered directly inside Shopify Checkout.",
        status: "locked",
        actionVariant: "upgrade",
        actionLabel: "Upgrade to PRO",
      },
    ],
  },
  {
    id: "post-purchase",
    title: "Post-Purchase & Customer Retention",
    icon: "heart",
    tools: [
      {
        id: "post-purchase-upsells",
        name: "1-Click Post-Purchase Upsells",
        description:
          "High-converting 1-click upsell offers shown between checkout and the order thank-you page.",
        status: "locked",
        actionVariant: "upgrade",
        actionLabel: "Upgrade to PRO",
      },
      {
        id: "thank-you-offers",
        name: "Thank You & Order Status Offers",
        description:
          "Post-checkout cross-sells, referral rewards, customer surveys, and 1-click reorders.",
        status: "active",
        actionVariant: "switch",
      },
    ],
  },
];
