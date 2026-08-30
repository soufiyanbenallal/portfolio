import { useCallback, useState } from "react";
import type { ThemeAppItem, ThemeAppItemStatus, ThemeAppPlacement } from "./types";
import { useThemeAppStatus } from "./useThemeAppStatus";

type BadgeTone = "success" | "attention" | "info" | undefined;

function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

export type ThemeAppStatusLabelsType = {
  heading: string;
  appActive: string;
  appInactive: string;
  openTheme: string;
  enableEmbed: string;
  addBlock: string;
  embedLabel: string;
  blocksLabel: string;
  themeCount: (count: number) => string;
  onPages: string;
  pageLive: string;
  pageDraft: string;
  wholeTheme: string;
  pageCount: (count: number) => string;
  showDetails: string;
  hideDetails: string;
  summaryBlocks: (count: number) => string;
  summaryUiExtensions: (count: number) => string;
  uiExtensionsLabel: string;
  uiExtensionActive: string;
  uiExtensionNotAdded: string;
  loadError: string;
  retry: string;
  empty: string;
  status: Record<ThemeAppItemStatus, string>;
};

export const DEFAULT_THEME_APP_STATUS_LABELS: ThemeAppStatusLabelsType = {
  heading: "Theme app status",
  appActive: "Active",
  appInactive: "Inactive",
  openTheme: "Open theme editor",
  enableEmbed: "Enable",
  addBlock: "Add to theme",
  embedLabel: "App embed",
  blocksLabel: "App blocks",
  themeCount: (count) => `on ${count} themes`,
  onPages: "On:",
  pageLive: "Live",
  pageDraft: "Draft theme",
  wholeTheme: "Entire theme",
  pageCount: (count) => `× ${count}`,
  showDetails: "Show details",
  hideDetails: "Hide details",
  summaryBlocks: (count) => (count === 1 ? "1 active app block" : `${count} active app blocks`),
  summaryUiExtensions: (count) => (count === 1 ? "1 other extension" : `${count} other extensions`),
  uiExtensionsLabel: "Other extensions",
  uiExtensionActive: "Enabled",
  uiExtensionNotAdded: "Not added",
  loadError: "Unable to load theme app status. Please refresh.",
  retry: "Retry",
  empty: "This app doesn't add any blocks or embeds to your theme.",
  status: {
    active_on_published: "Added — live on your published theme",
    active_on_any: "Added — on at least one theme",
    available_not_added: "Not added to any theme",
    unavailable: "Unavailable on this store",
  },
};

function toneFor(status: ThemeAppItemStatus): "success" | "info" | "warning" | undefined {
  switch (status) {
    case "active_on_published":
      return "success";
    case "active_on_any":
      return "info";
    case "available_not_added":
      return "warning";
    case "unavailable":
      return undefined;
  }
}

export type ThemeAppStatusPropsType = {
  publishedThemeId?: string;
  extensionHandle?: string;
  shopDomain?: string;
  appId?: string;
  disableDirectApi?: boolean;
  apiVersion?: string;
  themeEditorUrl?: string;
  defaultOpen?: boolean;
  collapsible?: boolean;
  showUiExtensions?: boolean;
  debug?: boolean;
  labels?: Partial<ThemeAppStatusLabelsType>;
};

function StatusRow({ item, labels }: { item: ThemeAppItem; labels: ThemeAppStatusLabelsType }) {
  const isActive = item.status === "active_on_published" || item.status === "active_on_any";

  const pages = Array.from(
    item.placements
      .reduce((acc, p) => {
        const label = p.pageLabel ?? p.themeName ?? (p.isWholeTheme ? labels.wholeTheme : p.target);
        const key = `${label}::${p.status}`;
        const existing = acc.get(key);
        if (existing) existing.count += 1;
        else acc.set(key, { placement: p, label, count: 1 });
        return acc;
      }, new Map<string, { placement: ThemeAppPlacement; label: string; count: number }>())
      .values()
  );

  const tone = toneFor(item.status);

  return (
    <div key={item.handle} className="bg-muted/40 border-border space-y-2 rounded-lg border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-foreground text-xs font-semibold">{item.name}</span>
        <div className="flex items-center gap-2">
          {isActive && item.themeCount > 1 && (
            <span className="text-muted-foreground text-xs">
              {labels.themeCount(item.themeCount)}
            </span>
          )}
          {tone && <s-badge tone={tone}>{labels.status[item.status]}</s-badge>}
          {item.enableUrl && (
            <a
              href={item.enableUrl}
              target={isExternal(item.enableUrl) ? "_blank" : undefined}
              rel="noreferrer"
              className="text-primary text-xs font-semibold underline"
            >
              {item.isEmbed ? labels.enableEmbed : labels.addBlock}
            </a>
          )}
        </div>
      </div>

      {isActive && pages.length > 0 && (
        <div className="border-border/40 space-y-1 border-t pt-1">
          <span className="text-muted-foreground block text-[10px] font-bold uppercase">
            {labels.onPages}
          </span>
          {pages.map(({ placement: p, label, count }) => (
            <div
              key={`${label}::${p.status}`}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-1.5">
                {p.editorUrl ? (
                  <a
                    href={p.editorUrl}
                    target={isExternal(p.editorUrl) ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-foreground hover:underline"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-foreground">{label}</span>
                )}
                {count > 1 && (
                  <span className="text-muted-foreground font-mono">{labels.pageCount(count)}</span>
                )}
              </div>
              {p.status !== "unknown" && (
                <s-badge tone={p.status === "live" ? "success" : "warning"}>
                  {p.status === "live" ? labels.pageLive : labels.pageDraft}
                </s-badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ThemeAppStatus({
  publishedThemeId,
  extensionHandle,
  shopDomain,
  appId,
  disableDirectApi,
  apiVersion,
  themeEditorUrl,
  showUiExtensions = false,
  defaultOpen = false,
  collapsible = true,
  debug,
  labels: labelOverrides,
}: ThemeAppStatusPropsType): JSX.Element {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const expanded = collapsible ? open : true;

  const labels: ThemeAppStatusLabelsType = {
    ...DEFAULT_THEME_APP_STATUS_LABELS,
    ...labelOverrides,
    status: {
      ...DEFAULT_THEME_APP_STATUS_LABELS.status,
      ...(labelOverrides?.status ?? {}),
    },
  };

  const { data, loading, error, refetch } = useThemeAppStatus({
    publishedThemeId,
    extensionHandle,
    shopDomain,
    appId,
    disableDirectApi,
    apiVersion,
    debug,
  });

  if (loading) {
    return (
      <div className="border-border bg-card space-y-3 rounded-xl border p-5">
        <h2 className="text-foreground text-sm font-bold">{labels.heading}</h2>
        <div className="animate-pulse space-y-2">
          <div className="bg-muted h-4 w-3/4 rounded" />
          <div className="bg-muted h-4 w-1/2 rounded" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border-border bg-card space-y-3 rounded-xl border p-5">
        <h2 className="text-foreground text-sm font-bold">{labels.heading}</h2>
        <p className="text-destructive text-xs">{labels.loadError}</p>
        <s-button variant="secondary" onClick={refetch}>
          {labels.retry}
        </s-button>
      </div>
    );
  }

  const hasAny = data.embeds.length > 0 || data.blocks.length > 0;

  return (
    <div className="border-border bg-card space-y-4 rounded-xl border p-5 shadow-xs">
      {/* Header */}
      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b pb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-foreground text-sm font-bold">{labels.heading}</h2>
          {hasAny && (
            <s-badge tone={data.overall === "active" ? "success" : "warning"}>
              {data.overall === "active" ? labels.appActive : labels.appInactive}
            </s-badge>
          )}
        </div>
        {themeEditorUrl && (
          <a
            href={themeEditorUrl}
            target={isExternal(themeEditorUrl) ? "_blank" : undefined}
            rel="noreferrer"
            className="text-primary text-xs font-semibold underline"
          >
            {labels.openTheme} →
          </a>
        )}
      </div>

      {!hasAny && <p className="text-muted-foreground text-xs">{labels.empty}</p>}

      {/* Summary info */}
      {hasAny && (
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>
            {data.activeBlockCount > 0
              ? labels.summaryBlocks(data.activeBlockCount)
              : "No active blocks"}
          </span>
          {collapsible && (
            <button
              type="button"
              onClick={toggle}
              className="text-primary text-xs font-semibold hover:underline"
            >
              {open ? labels.hideDetails : labels.showDetails}
            </button>
          )}
        </div>
      )}

      {/* Details List */}
      {expanded && hasAny && (
        <div className="space-y-4 pt-2">
          {data.embeds.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                {labels.embedLabel}
              </h3>
              {data.embeds.map((item) => (
                <StatusRow key={item.handle} item={item} labels={labels} />
              ))}
            </div>
          )}

          {data.blocks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                {labels.blocksLabel}
              </h3>
              {data.blocks.map((item) => (
                <StatusRow key={item.handle} item={item} labels={labels} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ThemeAppStatus;
