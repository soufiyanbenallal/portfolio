import styles from "../../advanced-portfolio.module.css";
import { metrics, ticker } from "../../data/portfolio-v2";
import { StudioHeroIllustration, StudioSignalField } from "../studio-illustrations";
import {
  MagneticLink,
  ParallaxLayer,
  Reveal,
  Stagger,
  StaggerItem,
} from "../motion/motion-system";

export function HeroSection() {
  return (
    <>
      <section id="top" className={styles.hero}>
        <StudioSignalField className={styles.signalField} decorative />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <Reveal>
              <div className={styles.availability}>
                <span aria-hidden="true" />
                Available for senior roles &amp; select builds
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className={styles.heroKicker}>FULL-STACK ENGINEER · PRODUCT BUILDER · TEAM LEAD</p>
            </Reveal>

            <Reveal delay={0.12} distance={30}>
              <h1 className={styles.heroTitle}>
                <span>I turn rough ideas</span>
                <span>
                  into <mark>systems</mark>
                </span>
                <span>that ship.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className={styles.heroLede}>
                Eight years moving from interface to architecture to product leadership—building
                commerce platforms, Shopify apps and useful AI workflows with the teams that own them.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className={styles.heroActions}>
                <MagneticLink className={styles.primaryButton} href="#work">
                  Explore selected work <span aria-hidden="true">↘</span>
                </MagneticLink>
                <MagneticLink className={styles.secondaryButton} href="mailto:benallalsoufiane1@gmail.com">
                  Start a conversation
                </MagneticLink>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className={styles.heroFootnote}>
                <span>BASED IN MEKNÈS · MOROCCO</span>
                <span>WORKING WORLDWIDE · UTC+1</span>
              </div>
            </Reveal>
          </div>

          <ParallaxLayer className={styles.heroVisual} distance={24}>
            <div className={styles.visualLabel}>
              <span>SB / PRODUCT STUDIO</span>
              <span>SKETCH → SHIPPED</span>
            </div>
            <StudioHeroIllustration />
            <div className={styles.heroSticker} aria-hidden="true">
              <span>08</span>
              YEARS
              <br />
              IN THE BUILD
            </div>
          </ParallaxLayer>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span />
          SCROLL TO OPEN THE SYSTEM
        </div>
      </section>

      <div className={styles.ticker} aria-label="Core specialities">
        <div className={styles.tickerTrack}>
          {[...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <b aria-hidden="true">✦</b>
            </span>
          ))}
        </div>
      </div>

      <section className={styles.proofStrip} aria-label="Career summary">
        <Stagger className={styles.proofGrid}>
          {metrics.map((metric) => (
            <StaggerItem className={styles.proofItem} key={metric.label}>
              <span className={`${styles.proofMarker} ${styles[`accent${metric.accent}`]}`} />
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
