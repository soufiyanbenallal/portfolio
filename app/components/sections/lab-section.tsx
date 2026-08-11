import styles from "../../advanced-portfolio.module.css";
import { Flat3DLoader } from "../flat-3d/flat-3d-loader";
import { Reveal } from "../motion/motion-system";
import { SectionHeading } from "./section-heading";

export function LabSection() {
  return (
    <section id="lab" className={`${styles.section} ${styles.labSection}`}>
      <SectionHeading
        index="05"
        eyebrow="FLAT / 3D LAB"
        title="Depth without losing the drawing."
        body="A small orthographic scene built from product primitives: panels, blocks, signals and a working surface. It responds softly to the pointer, but stays deliberately graphic."
        inverse
      />

      <Reveal className={styles.labStage}>
        <div className={styles.labCanvas}>
          <Flat3DLoader className={styles.flatScene} />
          <span className={styles.labAxisX} aria-hidden="true">X / PRODUCT</span>
          <span className={styles.labAxisY} aria-hidden="true">Y / SYSTEM</span>
          <span className={styles.labAxisZ} aria-hidden="true">Z / PEOPLE</span>
        </div>

        <div className={styles.labNotes}>
          <div>
            <span>01</span>
            <p>Orthographic camera keeps the illustration language flat.</p>
          </div>
          <div>
            <span>02</span>
            <p>Toon color steps create depth without glossy realism.</p>
          </div>
          <div>
            <span>03</span>
            <p>Reduced-motion and WebGL fallbacks keep the idea intact.</p>
          </div>
          <div className={styles.labStatus}>
            <span />
            LIVE OBJECT · MOVE POINTER
          </div>
        </div>
      </Reveal>
    </section>
  );
}
