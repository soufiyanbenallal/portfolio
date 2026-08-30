import type { OnboardingStepId, SyncTask, CoreTool, OptionalTool } from './types';

export const STEP_ORDER: OnboardingStepId[] = [
  'initializing',
  'revenue-foundation',
  'default-configuration',
  'add-tools',
  'sequential-setup',
  'shopify-validation',
  'celebration',
];

export const STEP_LABELS: Record<OnboardingStepId, string> = {
  initializing: 'Setting up',
  'revenue-foundation': 'Revenue foundation',
  'default-configuration': 'Default configuration',
  'add-tools': 'Add more tools',
  'sequential-setup': 'Quick setup',
  'shopify-validation': 'Activate theme embed',
  celebration: "You're live",
};

export const INITIAL_SYNC_TASKS: SyncTask[] = [
  { id: 'connect', label: 'Connecting to your store', status: 'pending' },
  { id: 'catalog', label: 'Syncing product catalog', status: 'pending' },
  { id: 'currency', label: 'Detecting store currency', status: 'pending' },
  { id: 'provision', label: 'Provisioning revenue engine', status: 'pending' },
  { id: 'finalize', label: 'Finalizing your setup', status: 'pending' },
];

export const CORE_TOOLS: CoreTool[] = [
  {
    id: 'cart-drawer',
    name: 'Slide-Out Cart Drawer',
    description: 'Turns every cart click into an on-brand checkout moment.',
  },
  {
    id: 'fbt',
    name: 'Frequently Bought Together',
    description: 'Smart product pairings that lift average order value.',
  },
  {
    id: 'analytics',
    name: 'Real-Time Analytics',
    description: 'Live visibility into revenue, conversion, and attach rate.',
  },
];

export const INITIAL_OPTIONAL_TOOLS: OptionalTool[] = [
  {
    id: 'volume-discounts',
    name: 'Volume Discounts',
    description: 'Reward bigger carts with automatic quantity-break pricing.',
    impact: '+9% AOV*',
    selected: false,
    configured: false,
    deferred: false,
    selectedPresetId: null,
    presets: [
      { id: 'gentle', label: 'Buy 2, save 10%', description: 'A light nudge toward multi-buys.' },
      { id: 'aggressive', label: 'Buy 3, save 15%', description: 'A bigger incentive for bulk buyers.' },
    ],
  },
  {
    id: 'post-purchase-upsell',
    name: 'Post-Purchase 1-Click Upsell',
    description: 'Offer one relevant upgrade the instant checkout completes.',
    impact: '+6% AOV*',
    selected: false,
    configured: false,
    deferred: false,
    selectedPresetId: null,
    presets: [
      { id: 'best-seller', label: 'Recommend best-seller', description: 'Show your top-selling companion item.' },
      { id: 'related', label: 'Recommend related item', description: 'Match based on what was just purchased.' },
    ],
  },
  {
    id: 'product-addons',
    name: 'Product Add-Ons',
    description: 'Let shoppers customize with extras like gift wrap or engraving.',
    impact: '+4% AOV*',
    selected: false,
    configured: false,
    deferred: false,
    selectedPresetId: null,
    presets: [
      { id: 'gift-wrap', label: 'Gift wrapping', description: 'Flat-fee wrap option at checkout.' },
      { id: 'custom-text', label: 'Custom text / engraving', description: 'Free-text personalization field.' },
    ],
  },
  {
    id: 'checkout-bumps',
    name: 'Checkout Bumps',
    description: 'Surface a one-click impulse offer right before payment.',
    impact: '+7% AOV*',
    selected: false,
    configured: false,
    deferred: false,
    selectedPresetId: null,
    presets: [
      { id: 'low-cost', label: 'Low-cost add-on', description: 'A small, high-margin impulse item.' },
      { id: 'warranty', label: 'Extended warranty', description: 'A protection-plan upsell.' },
    ],
  },
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];

export const DEFAULT_FREE_SHIPPING_THRESHOLD = 75;

/** Sample cart total used only to drive the live preview in Step 3. */
export const SAMPLE_CART_TOTAL = 32;
