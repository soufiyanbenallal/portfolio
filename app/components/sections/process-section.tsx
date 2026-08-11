import styles from "../../advanced-portfolio.module.css";
import { BuilderPreview } from "../builder-preview";
import { Reveal, Stagger, StaggerItem } from "../motion/motion-system";
import { SectionHeading } from "./section-heading";

const processSteps = [
  {
    index: "01",
    title: "Find the real constraint",
    body: "Start with the user, the business decision and the operational edge cases—not the requested component.",
  },
  {
    index: "02",
    title: "Draw the system",
    body: "Make the boundaries, states and ownership visible before code turns assumptions into infrastructure.",
  },
  {
    index: "03",
    title: "Ship a durable slice",
    body: "Deliver the smallest complete loop, observe it in production, then strengthen the system around evidence.",
  },
] as const;

export function ProcessSection() {
  return (
    <section id="process" className={`${styles.section} ${styles.processSection}`}>
      <SectionHeading
        index="02"
        eyebrow="THE BUILD METHOD"
        title="Half blueprint. Half living product."
        body="The visual idea is also the working method: keep the reasoning visible while turning it into something people can actually use. Drag the divider—or use your keyboard—to move between both states."
        inverse
      />

      <Reveal className={styles.builderWrap}>
        <BuilderPreview />
      </Reveal>

      <Stagger className={styles.processSteps}>
        {processSteps.map((step) => (
          <StaggerItem className={styles.processStep} key={step.index}>
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
