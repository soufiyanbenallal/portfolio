import styles from "../../advanced-portfolio.module.css";
import { capabilities } from "../../data/portfolio-v2";
import { Stagger, StaggerItem } from "../motion/motion-system";
import { SectionHeading } from "./section-heading";

export function CapabilitiesSection() {
  return (
    <section id="expertise" className={`${styles.section} ${styles.capabilitiesSection}`}>
      <SectionHeading
        index="04"
        eyebrow="OPERATING SYSTEM"
        title="Five connected strengths—not forty floating logos."
        body="Tools matter, but only inside a practice that connects product judgment, architecture, interfaces, delivery and the people maintaining them."
      />

      <Stagger className={styles.capabilityGrid}>
        {capabilities.map((capability) => (
          <StaggerItem
            className={`${styles.capabilityCard} ${styles[`capability${capability.accent}`]} ${
              capability.size === "wide" ? styles.capabilityWide : ""
            }`}
            key={capability.index}
          >
            <div className={styles.capabilityHead}>
              <span>{capability.index}</span>
              <span>SB / CAPABILITY</span>
            </div>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
            <div className={styles.capabilityStack}>{capability.stack}</div>
            <span className={styles.capabilityCorner} aria-hidden="true">↘</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
