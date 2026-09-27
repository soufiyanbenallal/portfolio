/**
 * Each service owns a palette (`.svc-commerce` / `.svc-product` / `.svc-ai`
 * in globals.css) exposing `--svc-hue`, `--svc-deep`, `--svc-soft` and
 * `--svc-tint` to everything rendered inside it.
 */
export type ServiceThemeType = "commerce" | "product" | "ai";

export type ServiceItemType = {
  id: string;
  /** Anchor id of the service's section on the homepage. */
  slug: string;
  theme: ServiceThemeType;
  /** One-word discipline label ("Commerce"). */
  kicker: string;
  title: string;
  /** One line for the services index. */
  summary: string;
  /** Two-tone pitch: statement in ink, consequence in faint. */
  headline: readonly [string, string];
  description: string;
  deliverables: string[];
  stack: string[];
  /** Where this has been done before — taken from the resume. */
  proof: string;
  /** Long-form explanation for the full service section. */
  deepDive?: ServiceDeepDiveType;
  order: number;
};

export type ServiceDeepDiveType = {
  /** What gets built, each with a sentence on why it matters. */
  capabilities: Array<{ title: string; description: string }>;
  /** How an engagement runs — a real sequence, so it is numbered. */
  process: Array<{ title: string; description: string }>;
  /** The stack, grouped by layer; the last group is cross-cutting delivery. */
  stackGroups: Array<{ label: string; items: string[] }>;
};

export type EngagementModelType = {
  id: string;
  title: string;
  description: string;
};
