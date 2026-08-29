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
    <div key={item.handle} className="p-3 bg-muted/40 rounded-lg border border-border space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">{item.name}</span>
        <div className="flex items-center gap-2">
          {isActive && item.themeCount > 1 && (
            <span className="text-xs text-muted-foreground">
              {labels.themeCount(item.themeCount)}
            </span>
          )}
          {tone && <s-badge tone={tone}>{labels.status[item.status]}</s-badge>}
          {item.enableUrl && (
            <a
              href={item.enableUrl}
              target={isExternal(item.enableUrl) ? "_blank" : undefined}
              rel="noreferrer"
              className="text-xs font-semibold text-primary underline"
            >
              {item.isEmbed ? labels.enableEmbed : labels.addBlock}
            </a>
          )}
        </div>
      </div>

      {isActive && pages.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-border/40">
          <span className="text-[10px] uppercase font-bold text-muted-foreground block">
            {labels.onPages}
          </span>
          {pages.map(({ placement: p, label, count }) => (
            <div
              key={`${label}::${p.status}`}
              className="flex items-center justify-between text-xs gap-2"
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
      <div className="p-5 rounded-xl border border-border bg-card space-y-3">
        <h2 className="text-sm font-bold text-foreground">{labels.heading}</h2>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-5 rounded-xl border border-border bg-card space-y-3">
        <h2 className="text-sm font-bold text-foreground">{labels.heading}</h2>
        <p className="text-xs text-destructive">{labels.loadError}</p>
        <s-button variant="secondary" onClick={refetch}>
          {labels.retry}
        </s-button>
      </div>
    );
  }

  const hasAny = data.embeds.length > 0 || data.blocks.length > 0;

  return (
    <div className="p-5 rounded-xl border border-border bg-card shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-foreground">{labels.heading}</h2>
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
            className="text-xs font-semibold text-primary underline"
          >
            {labels.openTheme} →
          </a>
        )}
      </div>

      {!hasAny && <p className="text-xs text-muted-foreground">{labels.empty}</p>}

      {/* Summary info */}
      {hasAny && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {data.activeBlockCount > 0
              ? labels.summaryBlocks(data.activeBlockCount)
              : "No active blocks"}
          </span>
          {collapsible && (
            <button
              type="button"
              onClick={toggle}
              className="text-xs text-primary font-semibold hover:underline"
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
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {labels.embedLabel}
              </h3>
              {data.embeds.map((item) => (
                <StatusRow key={item.handle} item={item} labels={labels} />
              ))}
            </div>
          )}

          {data.blocks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
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
