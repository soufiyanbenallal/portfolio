import styles from "../../advanced-portfolio.module.css";
import { experience } from "../../data/portfolio-v2";
import { Reveal } from "../motion/motion-system";
import { SectionHeading } from "./section-heading";

export function ExperienceSection() {
  return (
    <section id="experience" className={`${styles.section} ${styles.experienceSection}`}>
      <SectionHeading
        index="03"
        eyebrow="EXPERIENCE ROUTE"
        title="The responsibility grew with every layer."
        body="Frontend became full stack. Full stack became product architecture. Architecture became the standard a team could share."
      />

      <div className={styles.routeMap}>
        <div className={styles.routeLine} aria-hidden="true" />
        {experience.map((item, index) => (
          <Reveal className={styles.routeStop} delay={Math.min(index * 0.04, 0.16)} key={`${item.company}-${item.period}`}>
            <div className={`${styles.routeNode} ${styles[`accentBg${item.accent}`]}`}>
              {String(experience.length - index).padStart(2, "0")}
            </div>
            <div className={styles.routePeriod}>{item.period}</div>
            <div className={styles.routeCompany}>
              <h3>{item.company}</h3>
              <p>{item.location}</p>
            </div>
            <div className={styles.routeRole}>
              <strong>{item.role}</strong>
              <p>{item.shift}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.educationBand}>
        <div>
          <span>ALSO IN THE SYSTEM</span>
          <h3>MSc · Computer Science</h3>
        </div>
        <p>Jiangsu University of Science and Technology · China · 2025</p>
        <div className={styles.educationStamp} aria-hidden="true">MSc</div>
      </Reveal>
    </section>
  );
}
