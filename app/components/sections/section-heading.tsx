import styles from "../../advanced-portfolio.module.css";
import { Reveal } from "../motion/motion-system";
import type { SectionHeadingPropsType } from "@/types";

export function SectionHeading({
  index,
  eyebrow,
  title,
  body,
  inverse = false,
  className = "",
}: SectionHeadingPropsType) {
  return (
    <Reveal
      className={`${styles.sectionHeading} ${inverse ? styles.sectionHeadingInverse : ""} ${className}`.trim()}
    >
      <div className={styles.sectionHeadingMeta}>
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <h2>{title}</h2>
      <p className={styles.sectionHeadingBody}>{body}</p>
    </Reveal>
  );
}
