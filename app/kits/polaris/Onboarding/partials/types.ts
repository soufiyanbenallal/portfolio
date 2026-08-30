export type OnboardingStepId =
  | 'initializing'
  | 'revenue-foundation'
  | 'default-configuration'
  | 'add-tools'
  | 'sequential-setup'
  | 'shopify-validation'
  | 'celebration';

export type SyncTaskId = 'connect' | 'catalog' | 'currency' | 'provision' | 'finalize';

export interface SyncTask {
  id: SyncTaskId;
  label: string;
  status: 'pending' | 'done';
}

export type CoreToolId = 'cart-drawer' | 'fbt' | 'analytics';

export interface CoreTool {
  id: CoreToolId;
  name: string;
  description: string;
}

export type OptionalToolId =
  | 'volume-discounts'
  | 'post-purchase-upsell'
  | 'product-addons'
  | 'checkout-bumps';

export interface ToolPreset {
  id: string;
  label: string;
  description: string;
}

export interface OptionalTool {
  id: OptionalToolId;
  name: string;
  description: string;
  /** Illustrative benchmark copy shown with a footnote — not a live metric. */
  impact: string;
  selected: boolean;
  configured: boolean;
  deferred: boolean;
  presets: ToolPreset[];
  selectedPresetId: string | null;
}

export type EmbedStatus = 'idle' | 'checking' | 'active';

export interface OnboardingState {
  currentStep: OnboardingStepId;
  direction: 1 | -1;
  storeName: string;
  storeCurrency: string;
  syncTasks: SyncTask[];
  syncComplete: boolean;
  coreTools: CoreTool[];
  freeShippingThreshold: number;
  thresholdSaved: boolean;
  optionalTools: OptionalTool[];
  queueIndex: number;
  embedStatus: EmbedStatus;
  onboardingCompleted: boolean;
}

export type OnboardingAction =
  | { type: 'ADVANCE_SYNC_TASK' }
  | { type: 'FORCE_SYNC_COMPLETE' }
  | { type: 'GO_NEXT' }
  | { type: 'GO_BACK' }
  | { type: 'GO_TO_STEP'; step: OnboardingStepId }
  | { type: 'SET_THRESHOLD'; amount: number }
  | { type: 'SET_CURRENCY'; currency: string }
  | { type: 'CONFIRM_THRESHOLD' }
  | { type: 'TOGGLE_OPTIONAL_TOOL'; id: OptionalToolId }
  | { type: 'SELECT_PRESET'; id: OptionalToolId; presetId: string }
  | { type: 'CONFIRM_TOOL_CONFIG'; id: OptionalToolId }
  | { type: 'DEFER_TOOL_CONFIG'; id: OptionalToolId }
  | { type: 'NEXT_IN_QUEUE' }
  | { type: 'SET_EMBED_STATUS'; status: EmbedStatus }
  | { type: 'COMPLETE_ONBOARDING' };
