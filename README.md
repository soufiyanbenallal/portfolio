# LaunchFolio — Editorial Designer Portfolio

A production-grade editorial portfolio application for a full-stack designer, cloned and rebuilt from the [LaunchFolio](https://launchfolio.framer.website) Framer template with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

---

## 🎨 Design System & Visual Architecture

- **Canvas & Rails**: Pale neutral canvas (`#fafafa` / `#ffffff`), thin 1px `gray-30` (`#dedede`) structural borders, and a centered 1080px desktop rail with vertical guide borders.
- **Color Tokens**:
  - `white`: `#ffffff`
  - `gray-5`: `#fafafa`
  - `gray-10`: `#f7f7f7`
  - `gray-20`: `#f0f0f0`
  - `gray-30`: `#dedede`
  - `gray-40`: `#b8b8b8`
  - `gray-50`: `#828282`
  - `gray-60`: `#545454`
  - `black-90`: `#2b2b2b`
  - `black`: `#000000`
  - `availability-green`: `#21b30b`
- **Typography Scale**: Switzer for headings (`font-weight: 500`, `tracking: -0.03em`) and body text; Inter Display (`font-weight: 600`) for numeric price typography; Fragment Mono for badges and dates.

---

## ⚡ Motion System & Interactions

1. **Signature Scroll Choreography**: Layered project card sequence in the Latest Projects section using `useScroll` and `useTransform` with high-damped physics springs (`stiffness: 1000, damping: 130`).
2. **Text Reveal Presets**: Word-level blurred fades on section headings with `[0.4, 0, 0.2, 1]` ease.
3. **Hero Sequencing**: Staggered entrance of availability badge, headline, connected avatar indicator, and logo marquee.
4. **Floating Glass Pill Navbar**: Fixed 24px from viewport top, animating smoothly into a compact pill on scroll down, with full mobile expandable menu.
5. **Desktop Custom Cursor**: Physics-smoothed cursor supporting `Default`, `View Project`, `View Article`, and `Grow` modes (disabled on touch devices).
6. **Focus-Trapped Modals**: Accessible Contact Form dialog with validation and Google Meet Discovery Call scheduler.
7. **Prefers-Reduced-Motion**: Automatically disables continuous marquees, transforms, and transitions for accessibility.

---

## 📁 Routes

- `/` — Homepage with all 11 sections in exact sequence
- `/projects` — Project archive with category filters
- `/projects/[slug]` — Interactive project case study detail pages
- `/blog` — Design insights blog index
- `/blog/[slug]` — Editorial reading post detail
- `/quotes/[slug]` — Client proposal and line-item estimate view
- `/terms` — Terms of Service
- `/privacy-policy` — Privacy Policy
- `/not-found` — Branded 404 page

---

## 🛠️ Data Customization

All website content is managed through typed data files in `data/`:
- `data/projects.data.ts` — Case studies, metrics, screenshots, and live links
- `data/articles.data.ts` — Blog posts, reading times, categories, and sections
- `data/testimonials.data.ts` — Client quotes, ratings, and avatars
- `data/services.data.ts` — Services and deliverables
- `data/tech-stack.data.ts` — Tool logos and tooltips
- `data/work-history.data.ts` — Expandable career timeline
- `data/pricing.data.ts` — Retainer and project pricing plans
- `data/faqs.data.ts` — Accordion Q&A items
- `data/quotes.data.ts` — Proposals and client estimates

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run production build
pnpm build

# Start production server
pnpm start
```
