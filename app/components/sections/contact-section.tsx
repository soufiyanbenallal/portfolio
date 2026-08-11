import styles from "../../advanced-portfolio.module.css";
import { MagneticLink, Reveal } from "../motion/motion-system";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/soufiyan-benallal" },
  { label: "GitHub", href: "https://github.com/soufiyanbenallal" },
  { label: "npm", href: "https://www.npmjs.com/~beyonder.sb" },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactGrid}>
        <Reveal className={styles.contactCopy}>
          <p>06 · OPEN CHANNEL</p>
          <h2>
            Have a difficult product problem?
            <br />
            <mark>Put it on the table.</mark>
          </h2>
          <p>
            Senior and lead engineering roles, commerce products, product architecture and select
            consulting builds. I&apos;ll tell you honestly where I can help.
          </p>
        </Reveal>

        <Reveal className={styles.contactPanel} delay={0.08}>
          <span className={styles.contactStatus}>
            <i /> AVAILABLE · UTC+1
          </span>
          <MagneticLink className={styles.emailLink} href="mailto:benallalsoufiane1@gmail.com">
            <span>benallalsoufiane1</span>
            <span>@gmail.com ↗</span>
          </MagneticLink>
          <a className={styles.phoneLink} href="tel:+212708024535">
            +212 708 024 535
          </a>
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <div className={styles.contactMarquee} aria-hidden="true">
        <span>LET&apos;S BUILD SOMETHING THAT HOLDS UP ·</span>
        <span>LET&apos;S BUILD SOMETHING THAT HOLDS UP ·</span>
      </div>
    </section>
  );
}
