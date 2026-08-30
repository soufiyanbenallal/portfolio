# COMPLETE VS CODE IMPLEMENTATION PROMPT — EDITORIAL DESIGNER PORTFOLIO

You are a senior full-stack frontend engineer. Build a high-fidelity, responsive editorial portfolio for a full-stack designer. Use Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and a typed local content layer. The target is not a generic SaaS template: it is a refined, lightly structured personal portfolio with a pale neutral canvas, thin architectural borders, soft elevation, large editorial typography, card rails, polished microinteractions, and deliberate scroll transitions.

## 1. Deliverables and code organization

Create these folders:

- app: routed pages and layouts
- components: layout, sections, cards, controls, motion primitives
- data: projects, posts, testimonials, services, FAQ, work history, pricing
- types: data contracts
- lib: utility functions, motion config, smooth-scroll wrapper
- public/images: local placeholder images or documented image URLs

Create routes: /, /projects, /projects/[slug], /blog, /blog/[slug], /quotes/[slug], /terms, /privacy-policy, and not-found.

Use local typed data arrays and generate all repeated project, article, testimonial, service, logo, FAQ, work history, and quote views from data. Do not hardcode repeated JSX cards.

## 2. Visual system

### Color tokens

Use these exact light-mode tokens:

- white: rgb(255,255,255)
- gray-5: rgb(250,250,250)
- gray-10: rgb(247,247,247)
- gray-20: rgb(240,240,240)
- gray-30: rgb(222,222,222)
- gray-40: rgb(184,184,184)
- gray-50: rgb(130,130,130)
- gray-60: rgb(84,84,84)
- black-90: rgb(43,43,43)
- black: rgb(0,0,0)
- availability-green: rgb(33,179,11)

The main page surface is gray-5 or white; cards are white; primary dark cards and footer are black; most dividers are 1px solid gray-30. Do not introduce loud gradients or saturated colors. Use the green only for availability status.

### Typography

Use Switzer as the main family, with Inter Display used only for price amounts. If Switzer cannot be used, use a similarly compact neo-grotesque sans. All headings use weight 500 and tracking around -0.03em.

Desktop/tablet/phone type scale:

- H1: 72/64/48/42px across 1200, 992, 768, 0 breakpoints; line-height 95%.
- Large H2: 64/54/46/36px; line-height 100%.
- Small H2: 32/30/28/24px; line-height 115%.
- Big H3: 32/30/28/26px; line-height 115%.
- Small H3: 24/24/22/20px; line-height 130%.
- Body XL: 22/20/18/18px, line-height 140%, tracking -0.03em.
- Body L: 18/18/16/16px, line-height 140%, tracking -0.02em.
- Body M: 16/16/14/14px, line-height 150%.
- Body S: 14px, line-height 160%.
- Labels: 12–14px, weight 600.
- Price L: Inter Display weight 600, 40/40/38/36px, tracking -0.03em.

Headlines should balance cleanly. Avoid huge billboard text beyond the defined scale.

### Surface and component rules

- Main desktop content rail: max-width 1080px, with 44px inner side padding. Phone side padding: 22px.
- Direct full-page sections use 128px vertical padding on desktop, 48px on phone. Big quote uses 64px desktop and 32px phone.
- Most cards use 16px radius; nested internal surfaces use 12px; pills use 24–32px radius.
- White cards use a 1px gray-30 border and subtle multi-stop soft shadow: nearly invisible at top, max about 15px blur with low black opacity.
- Dark buttons use black fill, black border, inset white highlight, low exterior shadow, and 24px pill radius.
- Use a fixed lower viewport blur gradient as a visual screen edge, pointer-events none.

## 3. Shared app shell

Build a SiteLayout that has:

1. pale page background;
2. a fixed centered floating navbar at 24px from the top, z-index above content;
3. a thin desktop-only decorative border rail constrained to 1080px width;
4. main routed content;
5. black footer;
6. a fixed bottom gradient blur, about 25 percent viewport height;
7. a fixed bottom-center contact control, about 12px from the bottom, above the blur.

On large desktop, the navbar is a translucent white glass pill with 1px gray-30 border, 5px backdrop blur, 12px padding, 32px radius, and 64px gap. It should feel compact and centered rather than stretch across the viewport.

## 4. Navigation, footer, dialogs, and reusable patterns

### Navigation

Build variants: desktop-default, desktop-compact, desktop-open, mobile-closed, mobile-open.

- Desktop default: glass pill with logo/dots, desktop links, and contact control.
- On scroll down, animate to compact state with less gap, not a hard cut.
- Desktop expanded state can reveal additional navigation details and closes on pointer leave.
- Mobile closed state is a compact vertical pill showing only top-row controls.
- Mobile open reveals the mobile links underneath inside the same rounded glass shell.
- Use a spring around duration 0.6 with gentle bounce. Support Escape and focusable links.
- Nav links on homepage must smooth-scroll to hero, projects, services, pricing, and FAQ. On other pages, link normally.

### Contact modal

Use a real accessible dialog with focus trap and Escape close.

- Dismissible darkened or transparent backdrop that blocks page scroll.
- Desktop panel around 480px wide, phone fills 390px width.
- White, lightly blurred interior with 32px desktop / 24px mobile padding.
- Close icon at top right.
- Use text inputs, select/radio fields as needed, and a full-width 44px black rounded submit button.
- Button variants: Default, Loading with centered spinner and hidden label, Success, Error.
- Dialog and button transitions use spring-duration about 0.4 seconds.

### Footer

Build desktop, tablet, and phone variants. Footer surface is pure black with white typography. Desktop internal content width is 1080px. Use 64px top/side padding and large bottom breathing room around 211px; tablet bottom room about 153px; phone padding 32px 22px with 76px bottom room. Include contact prompt, navigation/legal links, social links, and a strong large-footer typography moment. Keep the footer simple, graphic, and spacious.

### Other reusable patterns

- ProjectCard: image, type of work, title, arrow/link, custom cursor mode. Image radius 16px, 4:3 desktop thumbnail proportions, 12px internal gap. Hover blends/reveals metadata and uses a 0.6s editorial tween.
- ServiceRow: outlined dark circular icon chip, service text in Body XL, 12px gap.
- TestimonialCard: white border card, 16px radius, fixed roughly 280px card height, 24px padding, quote plus avatar/name/role anchored at the bottom.
- FAQItem: white 16px rounded card, 1px border; question row padded 12px 16px; answer padded 16px; plus/minus icon. Animate height and opacity with a 0.4s spring.
- ArticleCard: default vertical card and featured horizontal card; white surface, 16px radius, thin border, shadow, image crop, 32px text padding. Featured is 992px wide and 500px high on desktop with image 50 percent and text 50 percent.
- LogoTicker: continuously scrolling logos inside an overflow-hidden horizontal strip. Pause on hover/focus and disable under reduced motion.

## 5. Homepage: exact section sequence, hierarchy, layout, and content

### A. Hero section

Section id concept: hero. Full width and centered content. Desktop top padding 144px, phone 128px.

Structure:

- Hero
  - content container max 1080px, 44px desktop side padding, 22px phone, bottom padding 96px desktop and 48px phone
    - intro stack, gap 24px
      - availability pill
      - description stack, gap 24px
        - H1: Design that delivers results. Use intended two-line wrapping on desktop.
        - body L, max width 390px: Strategic design that drives growth, not just looks good. I create everything your brand needs to attract customers and turn them into sales.
    - Book a call pill CTA
  - client logo strip with top and bottom 1px gray-30 borders, 32px vertical padding
    - inner max 1080px wrapper
    - overlapping five-avatar Happy Clients cluster with 99+ Happy clients label
    - logo ticker taking remaining width

Hero desktop headline takes about half the container width. On phone stack everything left aligned and keep the CTA compact.

### B. Latest Projects

Full-width gray-5 section with 128px vertical padding, 48px section gap, anchor projects.

Structure:

- content container max 1080px
  - title row with H2 Latest Projects
  - projects stack, 24px gap
    - top row: two equal project collection cards, 24px gap
    - bottom row: two equal project collection cards, 24px gap
  - centered text link: View all my projects

Desktop project grid is two columns of equal width, cards roughly 363px tall image area. On phone stack or use a naturally flowing single column; never retain the layered scroll transforms below tablet.

### C. Big quote testimonial

Top divider, white background, 64px vertical padding.

- centered max-width 1080px wrapper
- quote component with 24px interior padding
- centered large quote in 28px desktop / 22px phone style
- client row: circular avatar, Thomas Weber, Co-founder of KYMA
- quote copy: “Working with Joseph felt like having a seasoned design partner who truly understood our vision for KYMA and brought it to life in ways we hadn't even imagined.”

### D. Services

Top divider, 128px vertical padding, anchor services.

- max 1080px horizontal layout, 64px gap
  - left tech-stack column, 1.5fr:
    - H2 Services that supercharge your business.
    - tech-stack label
    - wrapped icon/logo row, 8px gap
  - right services column, 1fr, vertical 48px gaps: - Framer Development - Brand Design - Web Apps - Landing Pages - Motion Graphics - 3D Design, lower emphasis - UX / UI Consultation, lower emphasis
    On tablet/phone stack this into heading/tech stack then services list.

### E. About and work history

Top divider, 128px vertical padding.

- max 1080px vertical stack with 64px gap
  - H2: Designing experiences / that solve real problems. Use muted gray emphasis on the first line.
  - horizontal content row, 64px gap
    - left column 1fr:
      - profile/details card or identity block
      - expandable work history
    - right column 1.5fr:
      - Body XL bio in generous 140 percent leading
      - signature mark

Bio copy:
I love turning ideas into something real through design. What started as a hobby turned into a career when I discovered how design can make things both look great and work better.

I focus on creating user interfaces that serve a real purpose – making sure they're not just pretty, but actually solve problems. Whether I'm working on a mobile app or a website, my goal is to make something that feels natural and easy to use.

I'm a bit of a perfectionist when it comes to the small stuff, but I think that's what makes good design great. This attention to detail helps me build strong relationships with clients, as they know I'll put the same care into their project that they would.

Work history defaults to a concise closed list and a small white pill control. Expand reveals additional roles. Toggle using an accessible button and animated layout spring.

### F. Pricing

Top divider, 128px vertical padding, anchor pricing.

- content stack, 64px gap
  - description row, bottom aligned, 24px gap
    - H2 Simple pricing. Standout designs. taking two-thirds
    - Body L, half-fr width: Clear costs, no hidden fees. Select from monthly subscriptions or individual project rates.
  - how-it-works stack, 96px gap
    - 3 horizontal steps with 64px spacing: Subscribe, Request, Receive
    - pricing container: gray-20 background, 16px radius, 6px padding
      - top row: two pricing paths in white cards
      - bottom white Single Project card with dark border and soft shadow

Use strong visual hierarchy for Unlimited Design: price $8,000 / month, one flat monthly rate, black call-to-action. Cards should be tactile but restrained.

### G. Client logos strip

A repeated slim logo marquee band with a top 1px divider, 32px vertical padding, overflow hidden.

### H. Testimonials

Top divider, 128px vertical padding.

- content stack, 64px gap
  - heading row bottom-aligned: H2 Hear from what my clients have to say. plus Happy Clients avatar cluster
  - 3-column, 2-row testimonial grid, 16px gap, six equal cards around 280px tall
    Use staggered entrances. Tablet and phone should use horizontal scroll rail, hide native scrollbar, preserve card widths.

### I. FAQ and booking side card

Top divider, 128px vertical padding, anchor faq.

- max 1080px horizontal layout, 32px gap
  - left 1.5fr, 64px vertical gap:
    - H2 Your questions answered.
    - FAQ stack, 16px gap, one open by default
  - right 1fr sticky booking card, top 88px
    - black card, white copy, 16px radius, 1px border, soft shadow, 32px padding
    - profile picture
    - short discovery-call headline: Still not sure? Book a free discovery call
    - explanatory copy
    - Schedule Now button and small scheduling mark

FAQ data: five questions about project duration, using existing branding, unique process, ongoing support, confidentiality/IP. The accordion needs visual open/closed variants; ensure only one is open at a time.

### J. Articles

Top divider, 128px vertical padding.

- content stack, 64px gap
  - heading row: H2 From my blog, design insights. plus View All link
  - two-column grid with 12px gap, rendered from Blog data, showing three items
  - first item is Featured and spans both grid columns; desktop featured card is horizontal 992x500.
  - remaining cards render as standard vertical article cards.
    On phone: one column; featured stacks image over content.

### K. Fixed bottom contact control

Fixed centered nav/control at bottom 12px, z-index 9. It should arrive from below when page scrolls into active state. Clicking opens the contact dialog. Use a z-index 10 backdrop/dialog.

## 6. Responsive transformation details

Large desktop 1200+: use 1080px rail and full compositions described above.
Desktop 992–1199: retain two-column structure but reduce headline scale and rail availability; border rail can be 95 percent max width.
Tablet 768–991: retain 44px content gutter. Project composition may use a simpler 2-column grid. About can remain 2-column if readable; testimonials and article content become horizontally scrollable where appropriate. Footer uses tablet variant.
Phone under 768: use 390px target width. 22px gutters. Hero uses 128px top padding, 48px inner bottom spacing. Latest projects, services, about, pricing, testimonials, FAQ, and articles use 48px vertical section padding. Testimonials and article cards become horizontal scroll rails or single columns. Mobile navbar uses open/closed states. Footer uses phone variant. Remove custom cursor and complex layered scroll project animation. Keep touch targets at least 44px.

## 7. Exact animation and transition specification

Create a central motion config. All animation must be disabled or simplified if reduced motion is preferred.

### Global page transition

Use AnimatePresence around route content.

- enter: opacity 1, y 0, with a mask or clip reveal from lower edge; duration 0.5s, ease [0.68,0,0.22,0.83]
- exit: opacity 0, y -30 percent, duration 0.5s, same ease
- a page-level spring may use stiffness 500, damping 60, mass 1.

### Text reveal preset

For H1/H2 section headings:

- use word tokenization or per-word spans
- initial opacity 0, y 10px, blur 5px
- animate to opacity 1, y 0, blur 0
- tween duration 0.8s, ease [0.4,0,0.2,1]
- first word delay 0.05s; heading text stagger duration approximately 0.2s
- once only, trigger at 50 percent visibility

For descriptions:

- initial opacity 0, y 10px, blur 5px
- duration 0.8s, delay around 0.55s after heading
- once only.

### Hero sequence

- availability and call CTA: mount animation from opacity 0 to 1, 0.6s duration, 0.4s delay.
- client logo ticker wrapper: same fade, 0.6s delay.
- headline and description use text reveal preset.

### Project section entrance

- project grid wrapper initial opacity 0, y 200px, scale 0.8
- animate to opacity 1, y 0, scale 1
- tween 0.5s, ease [0.4,0,0.2,1]

### Scroll-driven project-card exit choreography

Use Framer Motion useScroll with section-level offset. As Latest Projects becomes the scroll target, each project card transforms continuously with spring smoothing equivalent to stiffness 1000, damping 130, mass 1.

At large desktop, progress toward:

- project one: x 530px, y -850px, scale 0.7, rotate 10deg
- project two: x 80px, y -850px, scale 0.7, rotate 15deg
- project three: x 480px, y -1250px, scale 0.7, rotate -5deg
- project four: x 30px, y -1200px, scale 0.7, rotate 5deg
  At 992px desktop, slightly reduce upward distance and use project two x about 105px.
  At tablet, target x values approximately 400, 90, 380, 50; y about -775, -775, -1050, -1010; scale 0.6; preserve rotations 10, 15, -5, 5 degrees.
  Do not run this effect on phone. Instead use normal in-view reveals.

### Testimonial stagger

For the six testimonial cards:

- initial opacity 0; x offsets by sequence: -5, -10, -15, -5, -10, -15px
- duration 0.6s; ease [0.4,0,0.2,1]
- delays: 0, 0.1, 0.2, 0.3, 0.4, 0.5 seconds
- fire once when around 50 percent visible.

### General stagger pattern

For groups that need eight-item stagger, use offsets -5, -10, -15, -20, -25, -30, -35, -35px with 0.1 second increments from 0 to 0.7 seconds. Use this for long service/detail lists where it improves comprehension, but do not overuse it.

### Floating decorative card

One small work-history decorative card continuously mirrors between its neutral state and x 2px, y -5px, rotate -6 degrees. Duration about 7 seconds, easing [0.44,0,0.56,1], repeat infinity with mirror behavior. Keep this decorative and not essential to reading.

### Side media and blur entry

- use x 500px to x 0 entry for side media panels on mount, spring around 0.8s without bounce.
- blur backgrounds fade from opacity 0 to 1 on mount in about 0.6s.

### Navigation behavior

- fixed navigation reacts on downward scroll by switching from desktop-default to desktop-compact.
- desktop open nav returns to compact on mouse leave.
- mobile open/close animates container height, internal link opacity, and gap with a 0.6s spring.
- an animated dots element may cycle after 2 seconds on appearance.

### Accordion and work-history transitions

- animate layout height automatically with Framer Motion layout prop.
- open answer opacity 0 to 1 with y 4px to 0; close fades then collapses.
- spring approximately duration 0.4, moderate damping.
- do not use display none before exit finishes.

### Card/button hover states

- Project cards: reveal/brighten metadata area with blend/exclusion effect or contrast shift; 0.6s editorial tween using [0.68,0,0.22,0.83].
- Article cards: same editorial tween with gentle image scale or shadow refinement.
- Primary dark button: preserve shape and reduce outer shadow on hover, not large scaling.
- Tickers pause on hover/focus.

### Fixed bottom contact transition

- initial state should be y 100px below its visible position.
- animate to y 0 with spring duration about 0.6, bounce 0.2, when target is active; it may replay as required.
- modal backdrop and form panel use 0.6s spring enter/exit.

## 8. Accessibility and quality bar

Use semantic section, main, nav, footer, heading, button, dialog, list, and article elements. All cards have visible keyboard focus; custom cursor is purely enhancement and disabled for touch and reduced-motion. Dialog must trap focus and restore focus on close. Image data needs alt text. Marquees must be pausable. Accordion buttons need aria-expanded and aria-controls. Respect reduced motion by turning off continuous/masked/scroll-linked transforms and use short fades or no animation. Use image aspect-ratio containers to avoid layout shift.

## 9. Final acceptance criteria

The result should contain all sections and routes, share one consistent visual system, use the precise desktop/tablet/phone layout transformations, include complete reusable component architecture, and reproduce the important motion behavior: word-level text reveals, hero sequencing, scroll-driven layered project card choreography, testimonial stagger, floating decoration, compact-on-scroll navigation, responsive mobile menu, accordion/work-history transitions, hover states, ticker pause behavior, page transitions, fixed contact control, and accessible contact modal states.
