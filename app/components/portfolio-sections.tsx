import {
  AderArchitectureIllustration,
  ApiIcon,
  CommerceIllustration,
  HeroSystemIllustration,
  PlatformIcon,
  RealtimeIcon,
} from "./illustrations";
import { expertiseAreas, principles, roles } from "../data/portfolio";

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-intro">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function PillList({ items, inverse = false }: { items: string[]; inverse?: boolean }) {
  return (
    <div className={`pill-list${inverse ? " pill-list--inverse" : ""}`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      <section id="top" className="hero page-container">
        <div className="hero__grid">
          <div>
            <div className="availability reveal">
              <span aria-hidden="true" />
              Open to senior roles &amp; select consulting
            </div>
            <h1 className="reveal">
              I design the system, write the code, and lead the team that <mark>ships it</mark>.
            </h1>
            <p className="hero__lede reveal">
              Eight years of full-stack engineering across commerce platforms, Shopify apps and AI-assisted tooling — React, TypeScript, Node.js, Laravel. Currently Lead Full Stack at <strong>Ader Solutions</strong>, owning strategy and architecture end to end.
            </p>
            <div className="hero__actions reveal">
              <a className="button button--accent" href="#work">See the work <span>→</span></a>
              <a className="button button--paper" href="mailto:benallalsoufiane1@gmail.com">Start a conversation</a>
            </div>
            <div className="hero__meta">
              <span>Meknès, Morocco · UTC+1</span>
              <span>Remote-first — 2+ yrs with a U.S. team</span>
              <span>AR · EN · FR</span>
            </div>
          </div>
          <div className="hero__illustration reveal">
            <HeroSystemIllustration />
          </div>
        </div>
      </section>

      <section className="metrics page-container" aria-label="Career highlights">
        <div className="metrics__grid">
          <div className="metric reveal">
            <strong>8</strong>
            <span>Years shipping production software</span>
          </div>
          <div className="metric metric--tertiary reveal">
            <strong>3<small>yr</small>8<small>mo</small></strong>
            <span>Leading engineering as Lead Full Stack</span>
          </div>
          <div className="metric reveal">
            <strong>5</strong>
            <span>Engineering teams across Morocco &amp; the U.S.</span>
          </div>
          <div className="metric reveal">
            <strong>npm</strong>
            <span><a href="https://www.npmjs.com/~beyonder.sb" target="_blank" rel="noreferrer">Packages published as beyonder.sb ↗</a></span>
          </div>
          <div className="metric metric--secondary reveal">
            <strong>MSc</strong>
            <span>Computer Science · 2025, JUST China</span>
          </div>
        </div>
      </section>
    </>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="content-section page-container">
      <SectionIntro
        eyebrow="Selected work"
        title="Five engagements, drawn flat"
        description="The two most recent carry the weight: a lead role owning strategy and architecture, and three years inside the Shopify ecosystem."
      />

      <article className="feature-card reveal">
        <div className="feature-card__grid">
          <div className="feature-card__content">
            <div className="work-label-row">
              <span className="work-label work-label--accent">01 · CURRENT</span>
              <span>Ader Solutions · Rabat · 2023 — present</span>
            </div>
            <h3>Owning the technology strategy of a product company — and the architecture underneath it</h3>
            <p>Hired to lead full-stack engineering. The role spans two things most companies split in half: defining what gets built and the roadmap it follows, then designing the scalable, secure, maintainable architecture that carries it.</p>
            <p>React, TypeScript, Node.js, Laravel and Shopify in the codebase; code review, CI/CD and deployment discipline around it; a team of engineers mentored toward the same standards.</p>
            <div className="fact-list">
              <div><span>Role</span><strong>Lead Full Stack — strategy, architecture, delivery, mentoring</strong></div>
              <div><span>Decisions</span><strong>Security and maintainability first; CI/CD as a default; AI integrated where it changes the product</strong></div>
              <div><span>Impact</span><strong>Engineering practice standardised across the team; product innovation driven by AI and modern web tooling</strong></div>
            </div>
            <PillList items={["React", "TypeScript", "Node.js", "Laravel", "Shopify", "AI integration"]} />
          </div>
          <div className="feature-card__visual feature-card__visual--secondary">
            <AderArchitectureIllustration />
          </div>
        </div>
      </article>

      <article className="feature-card feature-card--dark reveal">
        <div className="feature-card__grid">
          <div className="feature-card__visual feature-card__visual--dark">
            <CommerceIllustration />
          </div>
          <div className="feature-card__content">
            <div className="work-label-row">
              <span className="work-label work-label--tertiary">02 · COMMERCE</span>
              <span>Le Ventures · Remote, U.S. · 2020 — 2023</span>
            </div>
            <h3>Shopify apps, custom themes and SaaS that merchants run their stores on</h3>
            <p>Three years inside the Shopify ecosystem: embedded apps, Liquid themes on Online Store 2.0, and SaaS tooling around them — built for merchants who lose money when something breaks.</p>
            <p>React and TypeScript on the front, Node.js and Laravel behind it, wired into Shopify APIs, webhooks and third-party platforms. Delivered from Morocco into a U.S. Agile team — the timezone was never the constraint.</p>
            <div className="mini-metrics">
              <div><strong>2<small>yr</small>3<small>mo</small></strong><span>Fully remote with a U.S. team</span></div>
              <div><strong>Web+mobile</strong><span>Apps, themes, SaaS, React Native</span></div>
            </div>
            <PillList inverse items={["Shopify apps", "Liquid · OS 2.0", "React", "TypeScript", "Node.js", "Laravel"]} />
          </div>
        </div>
      </article>

      <div className="supporting-work reveal">
        <article className="compact-card">
          <ApiIcon />
          <div className="compact-card__meta"><span>03</span><span>FORNET Maroc · 2020 — 2021</span></div>
          <h3>APIs built to be integrated against</h3>
          <p>Scalable APIs, third-party integration and responsive interfaces, in an Agile team where reliability mattered more than novelty.</p>
          <div className="compact-card__stack">React · TypeScript · Node.js · Laravel</div>
        </article>
        <article className="compact-card">
          <RealtimeIcon />
          <div className="compact-card__meta"><span>04</span><span>ARA Systèmes · 2019 — 2020</span></div>
          <h3>Restaurant operations, plus the delivery app beside it</h3>
          <p>A management web app, an Angular SPA dashboard and a delivery app — one realtime Firebase backend serving three very different users.</p>
          <div className="compact-card__stack">Ionic · Angular · Firebase</div>
        </article>
        <article className="compact-card">
          <PlatformIcon />
          <div className="compact-card__meta"><span>05</span><span>morrocow3 · 2018 — 2019</span></div>
          <h3>Custom platforms, built with the clients who ran them</h3>
          <p>Where the client work started: Laravel and MySQL platforms, REST integrations, and the habit of sitting with a client until the requirement is understood.</p>
          <div className="compact-card__stack">Laravel · PHP · JavaScript · MySQL</div>
        </article>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="content-section page-container">
      <SectionIntro
        eyebrow="Experience"
        title="Frontend → full stack → lead"
        description="Each move added a layer of responsibility rather than a new framework."
      />
      <div className="timeline">
        {roles.map((role) => (
          <article className="timeline__row reveal" key={`${role.company}-${role.years}`}>
            <div>
              <span className="timeline__years">{role.years}</span>
              <h3>{role.company}</h3>
              <p>{role.place}</p>
            </div>
            <div>
              <h4>{role.title}</h4>
              <p>{role.note}</p>
            </div>
            <div>
              <span className="timeline__label">Step change</span>
              <p className="timeline__shift">{role.shift}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExpertiseSection() {
  return (
    <section id="expertise" className="content-section page-container">
      <SectionIntro
        eyebrow="Expertise"
        title="Five areas, not forty logos"
        description="Depth described by what it shipped, not by a progress bar."
      />
      <div className="expertise-grid">
        {expertiseAreas.map((area) => (
          <article className="expertise-card" key={area.id}>
            <div className="expertise-card__heading">
              <span>{area.id}</span>
              <p>{area.tag}</p>
            </div>
            <h3>{area.title}</h3>
            <p>{area.body}</p>
            <div>{area.stack}</div>
          </article>
        ))}
      </div>

      <div className="principles-grid">
        <aside className="quote-card">
          <span>How I work</span>
          <blockquote>“Success is often achieved by those who don&apos;t know that failure is inevitable.”</blockquote>
          <p>That line has been on my profile for years. In practice it means shipping — then making what shipped hold up.</p>
        </aside>
        <div className="principles-list">
          {principles.map((principle) => (
            <article key={principle.id}>
              <span>{principle.id}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailsSection() {
  return (
    <section className="details-section page-container">
      <div className="details-grid reveal">
        <article>
          <span className="details-label">Education</span>
          <h3>MSc, Computer Science</h3>
          <p>Jiangsu University of Science &amp; Technology · 2023 — 2025</p>
          <h3>BTech, Web &amp; Multimedia Management</h3>
          <p>Ibn Tofaïl University, Kénitra · 2019 — 2020</p>
          <h3>DTS, Information Technology</h3>
          <p>ISTA Bab Tizimi, Meknès · 2015 — 2018</p>
        </article>
        <article>
          <span className="details-label">Open source</span>
          <a href="https://www.npmjs.com/~beyonder.sb" target="_blank" rel="noreferrer">npm · beyonder.sb ↗</a>
          <p>Packages published to the public registry</p>
          <a href="https://github.com/soufiyanbenallal" target="_blank" rel="noreferrer">github.com/soufiyanbenallal ↗</a>
          <p>Code, experiments and side work</p>
        </article>
        <article>
          <span className="details-label">Languages</span>
          <div className="language-list">
            <div><span>Arabic</span><span>Native</span></div>
            <div><span>English</span><span>Professional</span></div>
            <div><span>French</span><span>Working</span></div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <footer id="contact" className="contact-section">
      <div className="page-container contact-section__inner">
        <div className="contact-grid">
          <div>
            <div className="eyebrow eyebrow--accent">Contact</div>
            <h2>Tell me what you&apos;re building. I&apos;ll tell you honestly whether I&apos;m the right engineer for it.</h2>
            <p>I read every message. If it&apos;s a fit, you&apos;ll get architecture thinking back — not a sales reply.</p>
            <a className="button button--contact" href="mailto:benallalsoufiane1@gmail.com">benallalsoufiane1@gmail.com <span>→</span></a>
          </div>
          <div>
            <span className="contact-label">Open to</span>
            <div className="open-to-list">
              <div><span>01</span><div><h3>Senior &amp; lead engineering roles</h3><p>Remote or hybrid, product teams that ship</p></div></div>
              <div><span>02</span><div><h3>Shopify apps, themes &amp; commerce SaaS</h3><p>Consulting or build engagements</p></div></div>
              <div><span>03</span><div><h3>AI integration &amp; automation work</h3><p>Features inside real products, not demos</p></div></div>
            </div>
            <div className="social-grid">
              <a href="https://www.linkedin.com/in/soufiyan-benallal" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a href="https://github.com/soufiyanbenallal" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
              <a href="https://www.npmjs.com/~beyonder.sb" target="_blank" rel="noreferrer">npm <span>↗</span></a>
              <a href="tel:+212708024535">+212 708 024 535 <span>→</span></a>
            </div>
          </div>
        </div>
        <div className="footer-line">
          <span><strong>SB</strong> Soufiyan Benallal — Meknès, Morocco</span>
          <span>Senior Full-Stack Engineer · Engineering Lead</span>
        </div>
      </div>
    </footer>
  );
}
