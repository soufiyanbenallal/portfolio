# ThemeAppStatus

Drop-in card for an app's home page showing **which of the app's theme app blocks and embeds are actually live on the merchant's theme**, and on which pages.

It exists to satisfy Built-for-Shopify **4.2.3 "Helpful homepage"**:

> Your app must communicate the status of the theme app block and/or theme app embed on the app's homepage. […] each time the merchant opens the app, they can quickly see if the app embed or any app blocks are enabled or disabled.

```tsx
import ThemeAppStatus from "~/commons/components/ThemeAppStatus";

<ThemeAppStatus />; // works with zero props — English defaults
```

---

## Setup in another app

### Prerequisites

- The app is **embedded** (App Bridge v4 present — `shopify` global). Outside the admin there is no App API and the card renders its error state.
- Polaris is installed (the card is Polaris-only).
- The app has a **theme app extension**. With none, `extensions()` returns no theme entries and the card shows "This app doesn't add any blocks or embeds to your theme."

### 1. Get the component

It lives in `shopify-remix-commons`. In the consuming app:

```bash
git submodule update --remote app/commons
```

Nothing to install — no new dependencies.

### 2. Drop it in — that's the whole setup

```tsx
import ThemeAppStatus from "~/commons/components/ThemeAppStatus";

<ThemeAppStatus />;
```

The component resolves everything it needs **on the client**, no loader wiring:

- **Block/embed status** — `shopify.app.extensions()`.
- **Which theme is published** — a Direct API query (`themes(first: 1, roles: [MAIN])`) via `fetch("shopify:admin/…/graphql.json")`. Unlocks "live on your published theme" and per-page Live/Draft badges.
- **Shop domain** (for external links) — `shopify.config.shop`, no call.

**Requirements for the theme lookup** (both usually already true for an embedded app):

- **Direct API access** enabled in `shopify.app.toml`:
  ```toml
  [access.admin]
  embedded_app_direct_api_access = true
  ```
- The **`read_themes`** access scope.

If either is missing the query fails silently and the card degrades honestly to "on at least one theme" (no per-page badges). Everything else still works.

### 3. Fallback: no Direct API access

If the app can't use Direct API, resolve the theme in a loader and pass it as a prop — this overrides the client lookup. Set `disableDirectApi` to skip the (doomed) client call:

```ts
// loader
const { session, admin } = await authenticate.admin(request);
const res = await admin.graphql(`{ themes(first: 50) { nodes { id role } } }`);
const main = (await res.json())?.data?.themes?.nodes?.find((t) => t.role === "MAIN");
return json({ publishedThemeId: main?.id, shopDomain: session.shop });
```

```tsx
<ThemeAppStatus
  publishedThemeId={data.publishedThemeId}
  shopDomain={data.shopDomain}
  disableDirectApi
/>
```

### 4. Enabling from the card

A row reading **"Not added to any theme"** carries its own action, so the
merchant can act on the status instead of hunting for the theme editor:

| Row       | Action           | What the link does                                                    |
| --------- | ---------------- | --------------------------------------------------------------------- |
| App embed | **Enable**       | `activateAppId` — switches the embed on for the published theme.      |
| App block | **Add to theme** | `addAppBlockId` — opens the editor with the block ready to be placed. |

The embed link is exact: an embed applies to the whole theme, so there is
nothing for the merchant to position. The block link is a starting point —
a block has to land somewhere, and only the merchant can say where, so the
editor opens on the home template with the block ready to drop in.

The one input that matters is the app's **client id**. It defaults to App Bridge
(`shopify.config.apiKey`); pass `appId` to supply it yourself — from
`process.env.SHOPIFY_API_KEY` via the loader, say, which does not depend on
App Bridge's config being populated:

```tsx
<ThemeAppStatus appId={apiKey} />
```

**With no id, no button renders** — a deep link built on a guessed id opens an
empty editor, which is worse than no button. The published theme is _not_
required: the editor resolves `current` to whatever is published, so a store
where the Direct API lookup fails still gets a working action.

### 5. Optional

```tsx
<ThemeAppStatus
  themeEditorUrl={deepLink} // renders "Open theme editor"
  showUiExtensions // also list checkout/customer-account/admin/POS
  defaultOpen // start expanded
  extensionHandle="my-theme-ext" // if the app ships several theme extensions
/>
```

### 6. Localization

Only if the app has i18n — defaults are English. See [Localization](#localization). Add the keys to **every** locale file the app ships, not just `en`.

### 7. Verify

Load the home page with `?debug_theme=1` (wire `debug` to a query param — see [Debugging](#debugging)) and check the console against the rendered card:

- Every block in the app's theme extension appears.
- A block you've added to the live theme reads **"Added — live on your published theme"**; its pages show **Live**.
- A block you haven't added reads **"Not added to any theme"**.
- Remove the block in the theme editor, reload → status flips.

That last check is the one worth doing. Status detection is only trustworthy once you've seen it change.

---

## How the check works

Block/embed status comes from **App Bridge** (no server involvement):

```ts
const extensions = await shopify.app.extensions();
```

`shopify` is an App Bridge global (`declare global { var shopify: ShopifyGlobal }`), so it only exists inside the embedded admin. The hook guards for that and surfaces an error rather than throwing.

The one thing `extensions()` omits — which theme is _published_ — the hook fetches itself with a small **Direct API** query from the same client (no loader). See [What App Bridge does _not_ give you](#what-app-bridge-does-not-give-you).

### The data shape

The theme lookup also returns every theme's **name**, so a placement can be labelled "Dawn" rather than a bare id. Without Direct API access the names are unavailable and a whole-theme placement falls back to the `wholeTheme` label ("Entire theme").

`extensions()` returns `ExtensionInfo[]`. Each entry is either a `ui_extension` or a `theme_app_extension`, and the `activations` shape depends on which:

```
ExtensionInfo
├─ handle: "claimify-preact-extension"
├─ type:   "theme_app_extension"
└─ activations: ThemeExtensionActivation[]        ← one per block/embed
   ├─ handle: "claimify_preact_settings"
   ├─ name:   "File Claim Widget"                 ← from the block's {% schema %}
   ├─ target: "section" | "head" | "body" | "compliance_head"
   ├─ status: "active" | "available" | "unavailable"
   └─ activations: ThemeAppBlockActivation[]      ← one per placement
      ├─ themeId: "gid://shopify/OnlineStoreTheme/123"
      └─ target:  "template--product.custom/main/blk_GPzUYy"
```

There are **two nested levels of `activations`** and they mean different things:

- The **outer** level is "this block exists and can be used" (`status`).
- The **inner** level is "this block is actually placed here" (`themeId` + `target`).

`status: "active"` alone does **not** mean the merchant can see it — it could be active only on an unpublished theme. That's why both levels are combined.

### Blocks vs embeds

Distinguished purely by `target`:

| `target`                            | Kind      |
| ----------------------------------- | --------- |
| `section`                           | App block |
| `head` / `body` / `compliance_head` | App embed |

### Status derivation

Per block/embed (`ThemeAppItemStatus`):

| Raw `status`  | Placements                       | Derived               | Shown as                               |
| ------------- | -------------------------------- | --------------------- | -------------------------------------- |
| `active`      | one matches `publishedThemeId`   | `active_on_published` | "Added — live on your published theme" |
| `active`      | placements exist, none published | `active_on_any`       | "Added — on at least one theme"        |
| `active`      | none _(shouldn't happen)_        | `available_not_added` | "Not added to any theme"               |
| `available`   | —                                | `available_not_added` | "Not added to any theme"               |
| `unavailable` | —                                | `unavailable`         | "Unavailable on this store"            |

Per placement (`ThemeAppPlacementStatus`):

| Condition                      | Status    | Badge         |
| ------------------------------ | --------- | ------------- |
| `themeId === publishedThemeId` | `live`    | "Live"        |
| on some other theme            | `draft`   | "Draft theme" |
| no `publishedThemeId` supplied | `unknown` | _(no badge)_  |

`unknown` deliberately renders **no badge**. Without knowing the published theme we can't distinguish "draft" from "live", and guessing would misinform the merchant.

---

## What App Bridge does _not_ give you

Two gaps drive most of the component's design. Both are worth knowing before changing anything here.

### 1. `extensions()` doesn't say which theme is published

`ThemeAppBlockActivation` gives a `themeId`, but nothing in the `extensions()` payload marks it as the live one. The hook fills this gap itself with a **separate Direct API query** (`themes(first: 1, roles: [MAIN])`) — so from the merchant's side it's still zero-config, it just isn't the same call.

If Direct API access or `read_themes` is unavailable, that query returns nothing and the component degrades to "on at least one theme" with no per-page badges. Pass `publishedThemeId` from a loader to override (see setup step 3).

### 2. UI extensions have no status

Theme blocks get a real `status` field. UI extensions (checkout / customer account / admin / POS) get **only** `{ target }` — no display name, no status.

So for those, status is **inferred**: activation targets present → `active`; none → `not_added`. The handle is prettified for display because no name is exposed.

This is a weaker signal than the theme-block badges. It's why `showUiExtensions` is **off by default**, and why BFS 4.2.3 — which asks about theme blocks and embeds — is satisfied without it.

---

## Placement targets → page names

`parsePlacement()` turns a raw target into a page label and a template id for deep linking.

| Raw target                              | Page label               | Template id         |
| --------------------------------------- | ------------------------ | ------------------- |
| `template--product.alternate/main/blk`  | Product page (Alternate) | `product.alternate` |
| `template--15945716433--index/main/blk` | Home page                | `index`             |
| `template--404/main/blk`                | 404 page                 | `404`               |
| `sections--15945716433--header/blk`     | Header                   | `null`              |
| `theme`                                 | _(whole theme — embeds)_ | `null`              |
| anything unrecognised                   | `null` → raw shown       | `null`              |

**This format is not contractual.** Shopify documents exactly one example; the id-bearing variants are observed in real themes. So parsing is best-effort and _always_ falls back to showing the raw target rather than inventing a page name. Treat the table as "what we've seen", not "what's guaranteed".

Only `template--` targets produce a deep link — a section group isn't a template, so `?template=` wouldn't resolve.

> Watch out: the theme-id filter strips numeric-only segments, which once swallowed `template--404` whole (404 is numeric). It now falls back to the unfiltered segments. Keep that case in any refactor.

---

## Links

| `shopDomain` | URL built                                              | Opens         |
| ------------ | ------------------------------------------------------ | ------------- |
| supplied     | `https://{shop}/admin/themes/{id}/editor?template={t}` | new tab       |
| omitted      | `shopify://admin/themes/{id}/editor?template={t}`      | in-admin only |

`shopify://` is resolved by App Bridge _inside_ the admin frame and **cannot** be opened externally — pass `shopDomain` if you want new-tab links.

---

## Props

All props are optional — `<ThemeAppStatus />` works on its own.

| Prop               | Type                            | Default               | Notes                                                                      |
| ------------------ | ------------------------------- | --------------------- | -------------------------------------------------------------------------- |
| `publishedThemeId` | `string`                        | _(Direct API)_        | `gid://shopify/OnlineStoreTheme/{id}`. Overrides the client lookup.        |
| `shopDomain`       | `string`                        | `shopify.config.shop` | `{shop}.myshopify.com`. Only affects link building.                        |
| `disableDirectApi` | `boolean`                       | `false`               | Skip the client theme lookup (pair with `publishedThemeId` from a loader). |
| `apiVersion`       | `string`                        | `"2025-07"`           | Admin API version for the theme lookup.                                    |
| `extensionHandle`  | `string`                        | —                     | Restrict to one theme app extension. Omit for all.                         |
| `themeEditorUrl`   | `string`                        | —                     | Renders the "Open theme editor" action.                                    |
| `showUiExtensions` | `boolean`                       | `false`               | List checkout/customer-account/admin/POS extensions (inferred status).     |
| `defaultOpen`      | `boolean`                       | `false`               | Start expanded.                                                            |
| `collapsible`      | `boolean`                       | `true`                | Set `false` to always show details and drop the toggle.                    |
| `debug`            | `boolean`                       | `false`               | Console-log the raw payload. See below.                                    |
| `labels`           | `Partial<ThemeAppStatusLabels>` | English               | Per-key override; unset keys keep defaults.                                |

### Collapsed vs expanded

Collapsed still shows the header badge, the summary line, and **every block/embed row with its status badge** — hiding those would defeat the criterion the card exists for. Only page placements and the other-extensions list collapse.

`collapsible={false}` removes the toggle and renders the expanded view permanently. Worth it for an app with a single embed, where the collapsed view withholds detail without saving much height.

The summary line drops a zero block count instead of printing "0 active app blocks" — for an embed-only app that reads as a fault when nothing is wrong. With no blocks and no listed UI extensions the line is omitted entirely.

---

## Localization

Defaults are English. Apps with i18n pass `labels`:

```tsx
<ThemeAppStatus
  labels={{
    heading: t("theme_status.heading"),
    status: {
      active_on_published: t("theme_status.active_live"),
      active_on_any: t("theme_status.active_any"),
      available_not_added: t("theme_status.not_added"),
      unavailable: t("theme_status.unavailable"),
    },
    themeCount: (count) => t("theme_status.theme_count", { count: String(count) }),
  }}
/>
```

`labels.status` is merged key-by-key, so a partial override is fine.

---

## Debugging

```
/app?debug_theme=1
```

Claimify wires `debug` to that query param. It logs, in a collapsed console group:

- the raw `shopify.app.extensions()` array (every extension, including `ui_extension`s)
- a table of handle / type / activation count
- one line per block/embed: `handle › block (Name) target=… status=…` with every placement's `themeId` + raw `target`
- the derived `ThemeExtensionStatus`

Use it when a block reports the wrong status — the raw placement targets show what the store actually returned before parsing.

Debug is off by default: this is shared code, and console noise would leak into every app.

---

## Full example (Claimify)

No loader wiring for status — the component self-resolves. The loader only
supplies the app-specific theme-editor deep link:

```tsx
<ThemeAppStatus
  themeEditorUrl={themeAppStatus?.appEmbed?.deepLink}
  showUiExtensions
  debug={debugThemeStatus}
  labels={{/* … */}}
/>
```

---

## Files

| File                   | Role                                                       |
| ---------------------- | ---------------------------------------------------------- |
| `ThemeAppStatus.tsx`   | The card. Layout, badges, collapsible, labels.             |
| `useThemeAppStatus.ts` | Calls App Bridge, derives status, builds links. The logic. |
| `parsePlacement.ts`    | Placement target → page label + template id.               |
| `parseUiTarget.ts`     | UI extension target → surface name.                        |
| `types.ts`             | Public types + `Raw*` mirrors of the App Bridge contract.  |

### Why `Raw*` types exist

`@shopify/app-bridge-types` ends in `export {}` — its types (`ExtensionInfo`, `ThemeExtensionActivation`, …) are **ambient declarations and cannot be imported by name**. The `Raw*` types in `types.ts` mirror that contract (verified against app-bridge-types **0.7.1**) so this component stays self-contained.

If App Bridge changes the shape, `types.ts` is the only file to update. Note the real names differ from some docs: it's `ThemeExtensionActivation` (not `ThemeExtensionBlockActivation`) and `ThemeAppBlockActivation` (not `ThemeBlockActivation`).

---

## Conventions

- **No red.** Badge tones are `success` / `info` / `attention` only. A block the merchant hasn't added is a normal state, not an error or a destructive action (BFS 4.3.3).
- **Client-side, zero-config.** Status from App Bridge; the published theme from a client Direct API call; the shop domain from `shopify.config.shop`. No loader input required (though `publishedThemeId` can be passed to override).
- **Explicit wording.** "Enabled" / "Not added" / "Live", never "OK" or "Configured" — the criterion is about a merchant seeing state at a glance.
