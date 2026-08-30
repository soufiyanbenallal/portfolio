import { useCallback, useEffect, useState } from "react";
import { parsePlacement } from "./parsePlacement";
import { parseUiTarget } from "./parseUiTarget";
import type {
  RawExtensionInfo,
  RawThemeExtensionActivation,
  RawUiExtensionActivation,
  ThemeAppItem,
  ThemeAppItemStatus,
  ThemeAppPlacement,
  ThemeExtensionStatus,
  UiExtensionItem,
} from "./types";

/**
 * `claimify-form-customer` -> `Claimify form customer`.
 * UI extensions expose no display name, so the handle is all there is; this at
 * least keeps it from reading as a raw identifier.
 */
function humanizeHandle(handle: string): string {
  const spaced = handle.replace(/[-_]/g, " ").trim();
  if (!spaced) return handle;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * What the client-side theme lookup resolves via Direct API access — the same
 * `shopify:admin/...graphql.json` path the rest of commons uses. Best-effort:
 * both fields come back empty if Direct API access isn't enabled
 * (`embedded_app_direct_api_access` in shopify.app.toml), the `read_themes`
 * scope is missing, or the request fails. The card then degrades honestly to
 * "on at least one theme", with theme ids in place of names.
 */
interface ThemeLookup {
  publishedThemeId?: string;
  /** `gid://shopify/OnlineStoreTheme/{id}` -> theme name. */
  themeNames: Record<string, string>;
}

const EMPTY_THEME_LOOKUP: ThemeLookup = { themeNames: {} };

/**
 * Resolves the published theme and every theme's name in one query. Names turn
 * a bare `themeId` into something the merchant recognises ("Dawn") — App Bridge
 * reports the id only.
 */
async function fetchThemes(apiVersion: string): Promise<ThemeLookup> {
  try {
    const res = await fetch(`shopify:admin/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ themes(first: 50) { nodes { id name role } } }`,
      }),
    });
    if (!res.ok) return EMPTY_THEME_LOOKUP;
    const json = await res.json();
    if (json?.errors) return EMPTY_THEME_LOOKUP;

    const nodes = json?.data?.themes?.nodes ?? [];
    const themeNames: Record<string, string> = {};
    let published: string | undefined;

    for (const node of nodes) {
      if (!node?.id) continue;
      if (node.name) themeNames[node.id] = node.name;
      if (node.role === "MAIN") published = node.id;
    }

    return { publishedThemeId: published, themeNames };
  } catch {
    return EMPTY_THEME_LOOKUP;
  }
}

/** `gid://shopify/OnlineStoreTheme/123` -> `123`. */
function themeNumericId(gid: string): string | null {
  const id = gid?.split("/").pop();
  return id && /^\d+$/.test(id) ? id : null;
}

/**
 * Theme editor link for one template.
 *
 * With a shop domain we emit an absolute `admin.shopify.com` URL — the
 * canonical admin host — so the link can open in a new tab. `shopify://` is
 * resolved by App Bridge inside the admin frame and cannot be opened
 * externally, so it is only the fallback when no domain is supplied.
 *
 *   ansezz-me.myshopify.com
 *     -> https://admin.shopify.com/store/ansezz-me/themes/123/editor?template=collection
 */
function buildEditorUrl(themeId: string, templateId: string, shopDomain?: string): string | null {
  const numeric = themeNumericId(themeId);
  if (!numeric) return null;
  const query = `template=${encodeURIComponent(templateId)}`;

  const storeHandle = shopDomain?.replace(/\.myshopify\.com$/, "");
  if (storeHandle) {
    return `https://admin.shopify.com/store/${storeHandle}/themes/${numeric}/editor?${query}`;
  }
  return `shopify://admin/themes/${numeric}/editor?${query}`;
}

/**
 * Theme-editor deep link that opens an item ready to be enabled.
 *
 * Two different links, because they are two different merchant actions:
 *
 * - **Embed** — `activateAppId` switches it on for the whole theme. One click,
 *   nothing to place, so this is exact.
 * - **Block** — `addAppBlockId` opens the editor with the block ready to drop
 *   in, but a block has to land *somewhere*, and only the merchant can say
 *   where. The template and target below are a starting point, not the final
 *   placement; the merchant still confirms in the editor.
 *
 * Returns null unless every part is known. An "Enable" button that opens a
 * theme editor pointed at nothing teaches the merchant to distrust the card.
 */
function buildEnableUrl(
  themeId: string | undefined,
  handle: string,
  isEmbedItem: boolean,
  appId?: string,
  shopDomain?: string
): string | null {
  if (!appId || !handle) return null;

  // The published theme is a nicety here, not a requirement: the theme editor
  // resolves `current` to whatever is published. Requiring the id meant that a
  // store where the Direct API lookup failed — the exact store most likely to
  // have nothing enabled — got no button at all.
  const theme = (themeId && themeNumericId(themeId)) || "current";

  const id = `${appId}/${handle}`;
  const query = isEmbedItem
    ? `context=apps&activateAppId=${encodeURIComponent(id)}`
    : `template=index&addAppBlockId=${encodeURIComponent(id)}&target=mainSection`;

  const storeHandle = shopDomain?.replace(/\.myshopify\.com$/, "");
  if (storeHandle) {
    return `https://admin.shopify.com/store/${storeHandle}/themes/${theme}/editor?${query}`;
  }
  return `shopify://admin/themes/${theme}/editor?${query}`;
}

export interface UseThemeAppStatusOptions {
  /**
   * `gid://shopify/OnlineStoreTheme/{id}` of the published theme. **Optional.**
   * When omitted, the hook resolves it itself via Direct API access (see
   * `fetchThemes`). Pass it to override that — e.g. resolve it in a loader if
   * the app doesn't have Direct API access enabled. Without either, active
   * items degrade to `active_on_any` and per-page badges are dropped.
   */
  publishedThemeId?: string;
  /**
   * Restrict to one theme app extension by handle. Omit to include every
   * theme app extension the app declares.
   */
  extensionHandle?: string;
  /**
   * `{shop}.myshopify.com`. **Optional** — defaults to `shopify.config.shop`.
   * Only used to build absolute `https://` theme-editor links that open in a
   * new tab; without it links fall back to `shopify://` (in-admin only).
   */
  shopDomain?: string;
  /**
   * Id the theme editor resolves a block/embed deep link with — the app's
   * client id. **Optional**, defaults to App Bridge `shopify.config.apiKey`.
   * Pass it only when that default is wrong (an app whose theme extension is
   * addressed by its extension UUID instead). Without one, no Enable action is
   * offered — a guessed id yields a link that opens an empty editor.
   */
  appId?: string;
  /**
   * Skip the client-side Direct API lookup of the published theme. Set this if
   * the app has no Direct API access and always supplies `publishedThemeId`.
   */
  disableDirectApi?: boolean;
  /** Admin API version for the Direct API theme lookup. Defaults to 2025-07. */
  apiVersion?: string;
  /**
   * Log the raw `shopify.app.extensions()` payload and the derived status to
   * the console. Off by default — this is shared code, so noise would leak
   * into every app. Turn it on while wiring up a new theme app extension to
   * see every extension, block, embed and placement target the store reports.
   */
  debug?: boolean;
}

export interface UseThemeAppStatusResult {
  data: ThemeExtensionStatus | null;
  loading: boolean;
  /** Set when App Bridge is unavailable or the call failed. */
  error: Error | null;
  refetch: () => void;
}

/** App blocks are placed in sections; embeds live in head/body/compliance_head. */
function isEmbed(activation: RawThemeExtensionActivation): boolean {
  return activation.target !== "section";
}

/**
 * Maps the raw `status` plus the nested per-theme activations onto a single
 * merchant-facing status.
 *
 * `status` alone only says whether the block *can* be used. The nested
 * `activations` say where it actually *is* — so an item is only "live" when one
 * of those placements points at the published theme.
 */
function deriveStatus(
  activation: RawThemeExtensionActivation,
  publishedThemeId?: string
): ThemeAppItemStatus {
  if (activation.status === "unavailable") return "unavailable";

  if (activation.status === "active") {
    const placements = activation.activations ?? [];
    // Defensive: "active" with no placements shouldn't happen, but if it does,
    // claiming it is live would be a lie. Report it as not added.
    if (placements.length === 0) return "available_not_added";
    if (publishedThemeId && placements.some((p) => p.themeId === publishedThemeId)) {
      return "active_on_published";
    }
    // Active, but either on draft themes only or we don't know which is live.
    return "active_on_any";
  }

  // status === "available": installed and usable, but not placed anywhere.
  return "available_not_added";
}

function toItem(
  activation: RawThemeExtensionActivation,
  publishedThemeId?: string,
  shopDomain?: string,
  themeNames: Record<string, string> = {},
  appId?: string
): ThemeAppItem {
  const status = deriveStatus(activation, publishedThemeId);
  const isActive = status === "active_on_published" || status === "active_on_any";
  const isEmbedItem = isEmbed(activation);
  const raw = activation.activations ?? [];

  // Every placement is surfaced and badged individually rather than filtered to
  // the live theme — the merchant can then see a page is only on a draft theme,
  // which filtering would have hidden entirely.
  const placements: ThemeAppPlacement[] = raw.map((p) => {
    const { pageLabel, templateId, isWholeTheme } = parsePlacement(p.target);
    const isPublished = !!publishedThemeId && p.themeId === publishedThemeId;
    return {
      themeId: p.themeId,
      themeName: themeNames[p.themeId] ?? null,
      isWholeTheme,
      status: !publishedThemeId ? "unknown" : isPublished ? "live" : "draft",
      target: p.target,
      pageLabel,
      editorUrl: templateId ? buildEditorUrl(p.themeId, templateId, shopDomain) : null,
      isPublished,
    };
  });

  // Live placements first — that's what the merchant cares about most.
  const rank: Record<ThemeAppPlacement["status"], number> = {
    live: 0,
    unknown: 1,
    draft: 2,
  };
  placements.sort((a, b) => rank[a.status] - rank[b.status]);

  return {
    handle: activation.handle,
    name: activation.name,
    status,
    isEmbed: isEmbedItem,
    // Offered only where it means something: an item that is already live has
    // nothing to enable, and `unavailable` means the theme cannot host it at
    // all — sending the merchant to the editor there would waste the trip.
    enableUrl:
      status === "available_not_added"
        ? buildEnableUrl(publishedThemeId, activation.handle, isEmbedItem, appId, shopDomain)
        : null,
    themeCount: isActive ? new Set(raw.map((p) => p.themeId)).size : 0,
    placements: isActive ? placements : [],
  };
}

/**
 * Reads theme app block / embed status straight from App Bridge
 * (`shopify.app.extensions()`). No Admin API involved.
 */
export function useThemeAppStatus(options: UseThemeAppStatusOptions = {}): UseThemeAppStatusResult {
  const {
    publishedThemeId,
    extensionHandle,
    shopDomain,
    appId,
    disableDirectApi,
    apiVersion = "2025-07",
    debug,
  } = options;

  const [data, setData] = useState<ThemeExtensionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [nonce, setNonce] = useState(0);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        // `shopify` is an App Bridge global — present only inside the embedded
        // admin. Guard so a non-embedded render surfaces an error rather than
        // throwing a ReferenceError.
        const bridge = typeof shopify !== "undefined" ? (shopify as any) : undefined;
        if (!bridge?.app?.extensions) {
          throw new Error("App Bridge App API is unavailable.");
        }

        // Resolve the two inputs the render needs, prop-first:
        //  - shop domain: prop, else App Bridge config (no network call)
        //  - published theme id: prop, else Direct API (best-effort)
        const resolvedShopDomain: string | undefined =
          shopDomain ?? (bridge?.config?.shop as string | undefined);

        // The app's client id, which is what a theme-editor deep link is keyed
        // on. App Bridge already knows it, so no app needs to wire it through.
        const resolvedAppId: string | undefined =
          appId ?? (bridge?.config?.apiKey as string | undefined);

        const [extensions, themeLookup] = await Promise.all([
          bridge.app.extensions() as Promise<RawExtensionInfo[]>,
          disableDirectApi ? Promise.resolve(EMPTY_THEME_LOOKUP) : fetchThemes(apiVersion),
        ]);

        // An explicit prop wins for the published theme, but names still come
        // from the lookup — the two are independent.
        const resolvedThemeId = publishedThemeId ?? themeLookup.publishedThemeId;
        const themeNames = themeLookup.themeNames;

        if (debug) {
          console.log("[ThemeAppStatus] resolved inputs:", {
            shopDomain: resolvedShopDomain ?? "(none)",
            // The only input that can suppress the Enable / Add to theme
            // actions — everything else has a working fallback.
            appId: resolvedAppId ?? "(none — enable actions hidden)",
            appIdSource: appId ? "prop" : "app-bridge",
            publishedThemeId: resolvedThemeId ?? "(unresolved)",
            source: publishedThemeId ? "prop" : disableDirectApi ? "disabled" : "direct-api",
            themeNames,
          });
        }

        if (debug) {
          // Every extension the app declares, including ui_extensions — useful
          // for confirming the theme app extension handle and seeing the raw
          // placement targets before they're parsed into page labels.
          console.groupCollapsed(
            `[ThemeAppStatus] shopify.app.extensions() -> ${extensions.length} extension(s)`
          );
          console.log("raw payload:", extensions);
          console.table(
            extensions.map((e) => ({
              handle: e.handle,
              type: e.type,
              activations: (e.activations ?? []).length,
            }))
          );
          for (const e of extensions) {
            if (e.type !== "theme_app_extension") continue;
            for (const a of (e.activations ?? []) as RawThemeExtensionActivation[]) {
              console.log(
                `${e.handle} › ${a.handle} (${a.name}) target=${a.target} status=${a.status}`,
                (a.activations ?? []).map((p) => ({
                  themeId: p.themeId,
                  target: p.target,
                }))
              );
            }
          }
          console.groupEnd();
        }

        const themeExtensions = extensions.filter(
          (e) =>
            e.type === "theme_app_extension" && (!extensionHandle || e.handle === extensionHandle)
        );

        // One app may ship several theme app extensions — flatten them, since
        // the merchant only cares about blocks and embeds, not which bundle
        // they came from.
        const activations = themeExtensions.flatMap(
          (e) => (e.activations ?? []) as RawThemeExtensionActivation[]
        );

        const embeds = activations
          .filter(isEmbed)
          .map((a) => toItem(a, resolvedThemeId, resolvedShopDomain, themeNames, resolvedAppId));
        const blocks = activations
          .filter((a) => !isEmbed(a))
          .map((a) => toItem(a, resolvedThemeId, resolvedShopDomain, themeNames, resolvedAppId));

        const isLive = (i: ThemeAppItem): boolean =>
          i.status === "active_on_published" || i.status === "active_on_any";

        // UI extensions (checkout / customer account / admin / POS). App Bridge
        // exposes no `status` for these, so it's inferred: an activation target
        // present means it's live on that surface; none means it isn't added.
        // Extensions with zero targets are kept — "not added" is precisely the
        // state the merchant needs to see.
        const uiExtensions: UiExtensionItem[] = extensions
          .filter((e) => e.type === "ui_extension")
          .map((e) => {
            const targets = ((e.activations ?? []) as RawUiExtensionActivation[]).map(
              (a) => a.target
            );
            return {
              handle: e.handle,
              title: humanizeHandle(e.handle),
              status: targets.length > 0 ? ("active" as const) : ("not_added" as const),
              surfaces: Array.from(new Set(targets.map(parseUiTarget))),
              targets,
            };
          });

        const next: ThemeExtensionStatus = {
          embeds,
          blocks,
          uiExtensions,
          // Rollup covers the theme surface only — that's what the header badge
          // and the App Store criterion are about.
          overall: embeds.some(isLive) || blocks.some(isLive) ? "active" : "inactive",
          activeBlockCount: blocks.filter(isLive).length,
        };

        if (debug) {
          console.log("[ThemeAppStatus] derived:", {
            publishedThemeId: resolvedThemeId ?? "(not supplied)",
            ...next,
          });
        }

        if (!cancelled) setData(next);
      } catch (e) {
        if (!cancelled) {
          setData(null);
          setError(e instanceof Error ? e : new Error(String(e)));
        }
        if (debug) console.error("[ThemeAppStatus] failed:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [
    publishedThemeId,
    extensionHandle,
    shopDomain,
    appId,
    disableDirectApi,
    apiVersion,
    debug,
    nonce,
  ]);

  return { data, loading, error, refetch };
}
