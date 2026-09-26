---
name: line-grid-design
description: Apply the "Line Grid" design system, a light, Linear-style look built from structural lines (rails, seams, nodes, spine, shared cell edges, dashes, fades) plus two surfaces (hatch for off-limits space, dots for canvases). Use when building or refactoring any page, section, component or whole app to this style, when the user mentions line grid, Keel line grid, Linear/Stripe/Attio-style lines, seams, rails, hatched or dotted sections, or asks to make the UI consistent with this pattern. Covers tokens, CSS classes, layout patterns, component recipes, a refactor workflow and a review checklist.
---

# Line Grid design system

A light, precise interface where **structure is drawn, not boxed**. Every line has a job. Content sits
in a single framed column; sections are separated by full-bleed seams; cards are carved out of the grid
with shared 1px edges; textures only mark meaning (hatch = off-limits, dots = canvas).

A complete reference page built with every pattern ships next to this file as `reference.html`
(open it in a browser, or read it for exact markup). Follow this file exactly. When the project already has tokens or components, map them onto this system
instead of adding a second one. The user's explicit instructions always win.

---

## 1. Principles (non-negotiable)

1. **One frame.** All content lives inside a single centered frame (`max-width: 1200px`) whose left and
   right edges are drawn as **rails**. Rails never break from the nav to the footer.
2. **Sections are separated by seams, never by gaps.** Each section starts with a 1px seam that runs
   edge to edge and fades out beyond the frame. Sections don't get margins between them.
3. **Cards are cells.** Adjacent cards share one 1px edge (`gap: 1px` over a line-coloured background).
   No floating cards with their own border + radius + shadow inside the grid.
4. **Each line type has one meaning** (see grammar). Don't draw a line for decoration.
5. **Textures carry meaning.** Hatch only for off-limits/reserved/future/danger space; dots only behind
   a live object (chart, code, preview, CTA). Never a square grid background.
6. **Light theme only, low contrast lines.** Three line greys, one accent, ink for primary actions.
7. **One moving thing.** At most one ambient animation per page (the beam). Respect reduced motion.

---

## 2. Tokens

```css
:root {
  color-scheme: light;
  /* surfaces */
  --bg: #FBFBFC;        /* page */
  --surface: #FFFFFF;   /* cells, app windows */
  --raised: #F5F5F7;    /* hover, selected rows, code panels */
  /* text */
  --ink: #111113;       /* headings, primary buttons */
  --ink-2: #3A3B41;     /* body strong, button hover */
  --muted: #64656E;     /* body copy */
  --faint: #8E909A;     /* labels, secondary half of headlines, axis text */
  /* lines: three weights, never more */
  --line: #EAEAEE;      /* cell edges, row dividers, dashes inside cells */
  --line-2: #DEDEE4;    /* seams, spine, hatch strokes */
  --line-3: #CFD0D7;    /* rails, nodes, dashes on charts, dots */
  /* accent + semantic */
  --accent: #5157D6;
  --accent-soft: #EEEFFD;
  --green: #2F9E65;
  --amber: #D48A12;
  --red: #DC3E42;
  /* layout */
  --frame: 1200px;
  --spine: 232px;
}
body { background: var(--bg); color: var(--ink); }
```

Semantic colours (green/amber/red) are for status only and never count as the accent.

### Typography

- **Sans:** `"Geist", ui-sans-serif, system-ui, sans-serif` (weights 400/500/600).
- **Mono:** `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace` — IDs, timestamps, numbers
  in tables, labels, axis ticks.
- Headlines are **weight 500**, tight tracking, with a two-tone split: first clause in `--ink`, second
  clause in `--faint` (`<h2>Ship to one percent. <span class="text-faint">Then everyone.</span></h2>`).

| Role | Size / line-height / tracking | Weight |
|---|---|---|
| Hero h1 | 72px (mobile 44px) / 1.02 / -0.045em | 500 |
| Chapter h2 | 44px (mobile 32px) / 1.08 / -0.035em | 500 |
| CTA h2 | 52px (mobile 36px) / 1.05 / -0.04em | 500 |
| Stat number | 36px / -0.04em | 500 |
| Card title | 14px | 500 |
| Body | 15px / relaxed, muted | 400 |
| UI / small body | 13px | 400 |
| Label | 11px mono, uppercase, 0.08em, faint | 400 |

Use `font-variant-numeric: tabular-nums` (`.num`) wherever digits line up. `text-wrap: balance` on headings.

### Radii and shadows

- Buttons, chips, inputs: `6px`. Avatars: full. Dots/nodes: square (0 radius).
- Cells have **no radius and no shadow**. The only shadow in the system is on an object floating on a
  dots canvas: `0 1px 0 var(--line), 0 8px 24px -12px rgb(17 17 19 / .12)` with `8px` radius.

---

## 3. Line grammar

| Name | Class | Spec | Meaning |
|---|---|---|---|
| **Rail** | `.frame` | 1px `--line-3`, left + right of the frame | The page boundary. Runs the full height. |
| **Seam** | `.seam` | 1px `--line-2` at the top of a section, 100vw wide, fades out 160px beyond the frame | A new section begins. |
| **Node** | automatic on `.seam > .frame`, or `.node` | 5×5px square, `--bg` fill, 1px `--line-3` border | A seam crosses a rail or the spine. |
| **Spine** | `.spine-grid` + `.spine` | 1px `--line-2` vertical at 232px (≥1024px) | Splits a chapter's label column from its content; same x in every chapter. |
| **Cell** | `.cells` | `gap: 1px` over `--line` | Peer cards share one edge. |
| **Dash** | `.dash-x`, `.dash-y` | 4px on / 4px off, `--line-3` | Subdivision *inside* a cell, step boundaries, thresholds, timelines. |
| **Fade** | `.fade-x`, `.fade-y` | gradient line, transparent at both ends | Soft split between equal peers (logo row, CTA split). |
| **Beam** | `.beam` | 180px accent gradient travelling one seam | The page's single ambient motion. |

Weights: cells/rows use `--line`, seams/spine use `--line-2`, rails/nodes/chart dashes use `--line-3`.

## 4. Surfaces

| Name | Class | Spec | Use only for |
|---|---|---|---|
| **Hatch** | `.hatch` | -45°, 1px `--line-2` every 7px | Page margins beside a hero product, 40px bands between blocks, empty label columns, reserved/disabled/empty slots, the future on a timeline chart. |
| **Danger hatch** | `.hatch-red` | -45°, red at 22% every 6px | Blocked/halted rows, the "over the limit" zone on a chart. |
| **Dots** | `.dots` | 1px `--line-3` dot, 16px pitch | Canvas behind a live object: chart, code/diff, preview, CTA actions. |
| Masks | `.fade-edges`, `.fade-down` | radial / top-to-bottom mask | Soften any texture; dots almost always get `.fade-edges`. |

Texture sits on an absolutely positioned layer (`pointer-events-none absolute inset-0`) with the content
`relative` above it, so it never affects layout.

---

## 5. The CSS (copy verbatim)

Put this in the global stylesheet (or `critical.css` / a `{% stylesheet %}` in a Shopify theme).

```css
/* ── Rails ── */
.frame { position: relative; max-width: var(--frame); margin-inline: auto; border-inline: 1px solid var(--line-3); }

/* ── Seams + nodes ── */
.seam { position: relative; }
.seam::before {
  content: ""; position: absolute; top: 0; left: 50%; width: 100vw; height: 1px; transform: translateX(-50%);
  background: linear-gradient(90deg, transparent 0,
    var(--line-2) max(0px, calc(50% - var(--frame) / 2 - 160px)),
    var(--line-2) min(100%, calc(50% + var(--frame) / 2 + 160px)),
    transparent 100%);
  pointer-events: none; z-index: 1;
}
.seam > .frame::before, .seam > .frame::after, .node {
  content: ""; position: absolute; top: -2px; width: 5px; height: 5px;
  background: var(--bg); border: 1px solid var(--line-3); z-index: 2;
}
.seam > .frame::before { left: -3px; }
.seam > .frame::after  { right: -3px; }

/* ── Spine ── */
@media (min-width: 1024px) {
  .spine-grid { display: grid; grid-template-columns: var(--spine) minmax(0, 1fr); }
  .spine { border-right: 1px solid var(--line-2); }
  .spine-node { left: calc(var(--spine) - 3px); }
}

/* ── Cells ── */
.cells { display: grid; gap: 1px; background: var(--line); }
.cells > * { background: var(--surface); }

/* ── Dashes + fades ── */
.dash-x { height: 1px; background: repeating-linear-gradient(90deg,  var(--line-3) 0 4px, transparent 4px 8px); }
.dash-y { width: 1px;  background: repeating-linear-gradient(180deg, var(--line-3) 0 4px, transparent 4px 8px); }
.fade-x { height: 1px; background: linear-gradient(90deg,  transparent, var(--line-2) 30%, var(--line-2) 70%, transparent); }
.fade-y { width: 1px;  background: linear-gradient(180deg, transparent, var(--line-2) 30%, var(--line-2) 70%, transparent); }

/* ── Surfaces ── */
.hatch     { background-image: repeating-linear-gradient(-45deg, var(--line-2) 0 1px, transparent 1px 7px); }
.hatch-red { background-image: repeating-linear-gradient(-45deg, color-mix(in srgb, var(--red) 22%, transparent) 0 1px, transparent 1px 6px); }
.dots      { background-image: radial-gradient(circle at 1px 1px, var(--line-3) 1px, transparent 1.2px); background-size: 16px 16px; }
.fade-edges { mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, #000 40%, transparent 100%);
              -webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, #000 40%, transparent 100%); }
.fade-down  { mask-image: linear-gradient(#000, transparent); -webkit-mask-image: linear-gradient(#000, transparent); }
.margins-hatched { position: relative; isolation: isolate; }
.margins-hatched::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background-image: repeating-linear-gradient(-45deg, var(--line-2) 0 1px, transparent 1px 7px); }
.band { height: 40px; }

/* ── Beam ── */
.beam { position: absolute; top: -1px; left: 0; height: 1px; width: 180px; z-index: 3;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: beam 6s cubic-bezier(.6,0,.4,1) infinite; }
@keyframes beam { 0% { transform: translateX(-200px); opacity: 0 } 10% { opacity: 1 } 60% { opacity: 1 }
  70%, 100% { transform: translateX(min(100vw, 1200px)); opacity: 0 } }

/* ── Small parts ── */
.label { font-family: "Geist Mono", ui-monospace, monospace; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--faint); }
.num { font-variant-numeric: tabular-nums; }
.ring { --p: 0; width: 14px; height: 14px; border-radius: 50%; flex: none; padding: 2px; background-clip: content-box;
  background: conic-gradient(var(--c, var(--accent)) calc(var(--p) * 1%), transparent 0);
  box-shadow: inset 0 0 0 1.5px var(--c, var(--accent)); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) { .beam { animation: none; opacity: 0; } }
```

The page root needs `overflow-x: clip` (seams are 100vw wide).

### Tailwind v4 mapping

```css
@theme inline {
  --color-bg: var(--bg); --color-surface: var(--surface); --color-raised: var(--raised);
  --color-ink: var(--ink); --color-ink-2: var(--ink-2); --color-muted: var(--muted); --color-faint: var(--faint);
  --color-line: var(--line); --color-line-2: var(--line-2); --color-line-3: var(--line-3);
  --color-accent: var(--accent); --color-accent-soft: var(--accent-soft);
  --color-green: var(--green); --color-amber: var(--amber); --color-red: var(--red);
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

Tailwind v3: put the same names under `theme.extend.colors` as `'var(--x)'` values. Without Tailwind, use
the classes above plus plain CSS with the tokens; the recipes translate one to one.

---

## 6. Layout patterns

Horizontal padding inside the frame: `px-4` mobile, `sm:px-10` desktop (`px-6` inside the spine column).
Vertical rhythm: chapter heads `py-12 lg:py-16`, cells `p-6 sm:p-8`, CTA `py-16 lg:py-24`.

**A. Section shell** (every section)
```html
<section class="seam">
  <div class="frame"> … </div>
</section>
```

**B. Chapter** (numbered only when the content is a real sequence, e.g. a workflow)
```html
<section class="seam">
  <div class="frame spine-grid">
    <span class="node spine-node hidden lg:block" aria-hidden="true"></span>
    <div class="spine border-b border-line-2 px-4 py-6 sm:px-10 lg:border-b-0 lg:px-6 lg:py-12">
      <div class="lg:sticky lg:top-24">
        <div class="font-mono text-[12px] text-accent">1.0</div>
        <div class="mt-1 text-[13px] font-medium">Ramp</div>
        <p class="mt-3 hidden max-w-[180px] text-[12px] leading-relaxed text-faint lg:block">One-line summary.</p>
      </div>
    </div>
    <div>
      <div class="px-4 py-12 sm:px-10 lg:py-16">
        <h2 class="max-w-2xl text-[32px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[44px]">
          Statement. <span class="text-faint">Consequence.</span></h2>
      </div>
      <div class="cells border-t border-line md:grid-cols-5"> … cells … </div>
    </div>
  </div>
</section>
```
When the label column is otherwise empty, hatch it below the label:
`<div class="hatch fade-down pointer-events-none absolute inset-x-0 bottom-0 top-24 hidden lg:block"></div>`
(give `.spine` `relative`).

**C. App-as-frame** (product shot in the hero): the app window's left/right edges *are* the rails.
Wrap in `<div class="seam margins-hatched"><div class="frame"><div class="relative bg-surface">…`
and end with a bottom fade `absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-bg`.

**D. Band** (reserved space between major blocks): `<div class="seam" aria-hidden="true"><div class="frame band hatch"></div></div>`. Use 2–4 per page, not between every section.

**E. Cell grid**: `.cells` with a column count the items fill exactly (no orphan cells). If a row has a
gap you can't fill with content, fill it with a `.hatch` cell, not an empty white one. Internal
subdivision within a cell uses `.dash-x/.dash-y`, never another solid border.

**F. Peer row** (logos, integrations): equal cells, each divider a `.fade-y` on the right edge.

**G. Split** (CTA, feature + visual): `grid lg:grid-cols-12`, 7/5 split, the divider is a `.fade-y` (soft)
or the cell edge (hard) — pick one per page and keep it.

**H. Stats**: `.cells grid-cols-2 lg:grid-cols-4` with cells on `--bg` (`[&>*]:bg-bg!`), no labels above the number.

**Responsive:** below 1024px the spine becomes a top strip (`border-b`) and nodes on the spine hide;
rails, seams and cells remain. Never let anything exceed the frame horizontally.

---

## 7. Component recipes

- **Nav:** sticky, `h-14`, `border-b border-line-2 bg-bg/80 backdrop-blur-md`, inner `.frame`. Links 13px muted → ink on hover. Primary button: `rounded-md bg-ink px-3 py-1.5 text-white hover:bg-ink-2`.
- **Buttons:** primary = ink fill, white text. Secondary = `border border-line-2 bg-surface hover:bg-raised`. Tertiary = text + `→`. 13px, `font-medium`, `rounded-md`.
- **Announcement pill:** no border: `• dot (accent) + 13px muted text + →`.
- **List rows (app UI):** `divide-y divide-line`, 13px, `px-4 py-2.5`, ID in mono faint `w-14`, status `.ring` (`--p` = percent, `--c` = colour), title truncates, env chip `rounded border border-line-2 px-1.5 font-mono text-[10px]`, value mono right-aligned, initials avatar 20px. Selected row `bg-accent-soft/50`; blocked row `.hatch-red`.
- **Group header in lists:** `border-y border-line px-4 py-2 text-[12px]` with ring + name + count.
- **Sidebar:** `border-r border-line p-2`, items `rounded-md px-2 py-1.5 hover:bg-raised`, active `bg-raised font-medium`, groups split with `.dash-x`.
- **Key/value panel:** `<dl class="divide-y divide-line text-[12px]">` rows `flex justify-between px-4 py-2.5`, key muted.
- **Meters:** track `h-1 rounded-full bg-raised`, fill semantic colour; a limit marker is a 1px `--line-3` tick.
- **Timeline / log:** `.dash-y` spine at `left-[3px]`, 7px square markers (`rounded-sm`): outline for events, filled semantic colour for state changes; timestamp above in mono faint.
- **Charts (SVG):** gridlines solid `--line`, baseline `--line-3`, step/threshold markers dashed `4 4` in `--line-3`, primary series accent or ink 1.6–1.75px, comparison/forecast series dashed `2 3` faint. Hatch the future (pattern `--line-2`, 7px, rotate 45) and the danger zone (red, 28% opacity, 6px). Axis text 10px mono faint. Current point = circle r 3.5, surface fill, coloured stroke. Put the chart cell on `.dots.fade-edges`.
- **Code / diff:** card on a dots canvas (the one allowed shadow), header `border-b border-line`, file path row `border-b border-dashed border-line-3 font-mono text-[11px] text-faint`, removed lines `bg-[#FDECEC] text-red`, added `bg-[#E7F5EE] text-green`.
- **Quote:** in a chapter shell with a hatched label column, 34px/1.25 weight 500, second sentence faint, avatar = initials in `bg-raised ring-1 ring-line-2`.
- **Footer:** `.cells` on `--bg`, then an extra 80px frame without borders whose rails fade out: two `w-px bg-linear-to-b from-line-3 to-transparent` spans at `-left-px` / `-right-px`.
- **Forms (for app screens):** inputs `h-9 rounded-md border border-line-2 bg-surface px-3 text-[13px] focus:border-accent focus:ring-2 focus:ring-accent/15`; field groups separated with `divide-y divide-line`, not boxes; disabled inputs get `.hatch` on `--raised`.
- **Tables:** header row `label` style on `--bg`, rows `divide-y divide-line`, columns split with nothing (alignment only); numeric columns mono + `.num` right aligned; wrap in `overflow-x-auto`.
- **Empty states:** a `.hatch` panel with a centred 13px muted message and one secondary button.
- **Modals / popovers:** the only other place a shadow is allowed; `rounded-lg border border-line-2 bg-surface` with sections split by `border-line`.

---

## 8. Refactor workflow (existing app)

1. **Audit.** List the current tokens (colours, fonts, spacing), layout wrappers, and every card/box
   style. Note which borders are decorative.
2. **Tokens first.** Add the tokens (section 2) and map old tokens to them. Delete duplicates. Load Geist
   and Geist Mono (or keep the project's existing faces if the user wants their brand type).
3. **Install the CSS** (section 5) once, globally. No per-component copies of the line classes.
4. **Frame the layout.** Replace container wrappers with `.frame`; wrap each top-level section in
   `.seam`; remove vertical margins between sections; add `overflow-x: clip` at the root.
5. **Convert cards to cells.** Card lists/grids → `.cells`; strip their borders, radii and shadows.
   Inner borders → `.dash-*` or `divide-line`.
6. **Chapters.** Pages with a label + content structure (settings, docs, product sections) → spine grid.
7. **Textures by meaning.** Hatch disabled/empty/reserved/over-limit areas; dots behind live previews
   and charts. Remove any square-grid, noise or gradient backgrounds.
8. **Typography pass.** Apply the scale; two-tone headlines; mono for IDs, times and numbers.
9. **Components.** Rebuild buttons, rows, chips, inputs, tables from section 7.
10. **Verify** with the checklist below at 1440px and 390px.

Work section by section and keep behaviour unchanged; this is a visual refactor.

### Shopify / Liquid themes

Tokens + section-5 CSS go in `assets/critical.css` (global). Each section file renders
`<section class="seam"><div class="frame">…</div></section>` and keeps its own layout CSS in
`{% stylesheet %}`. Expose only merchant-meaningful settings (e.g. `show_band`, `texture: none|hatch|dots`)
as select settings that toggle classes. Keep all copy in locale files.

---

## 9. Review checklist

- [ ] Rails continuous from nav to footer; nothing crosses them horizontally.
- [ ] Every section starts with a seam; nodes appear at rail (and spine) crossings; no stray margins between sections.
- [ ] No double borders anywhere (cells share edges; the frame edge isn't repeated by a child border).
- [ ] Each line uses the right weight: `--line` cells/rows, `--line-2` seams/spine, `--line-3` rails/nodes/chart dashes.
- [ ] Dashes only inside cells or on charts; fades only between peers.
- [ ] Hatch only on off-limits/reserved/future/danger space; dots only behind a live object; no square grids.
- [ ] Only allowed shadows: object on dots canvas, modal/popover.
- [ ] One accent, used for: chapter numbers, selection, the beam, primary series, focus ring.
- [ ] Headlines weight 500, tight tracking, two-tone; labels mono uppercase 11px.
- [ ] Tabular numbers in every aligned numeric column.
- [ ] At most one animation; `prefers-reduced-motion` disables it.
- [ ] 390px: spine collapses to a top strip, no horizontal scroll, cells stack.
- [ ] Visible focus states on every interactive element.

## 10. Don'ts

- No rounded, shadowed, bordered cards floating inside the frame.
- No square grid backgrounds, noise, glows, or gradient hero washes.
- No numbered markers (01/02/03, 1.0/2.0) unless the content is a real sequence.
- No fourth line grey, no second accent, no dark mode variant unless the user asks.
- No borders added "to make it look structured": if a line has no job from the grammar, remove it.
