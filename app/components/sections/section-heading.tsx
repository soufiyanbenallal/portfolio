import styles from "../../advanced-portfolio.module.css";
import { Reveal } from "../motion/motion-system";

export function SectionHeading({
  index,
  eyebrow,
  title,
  body,
  inverse = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  inverse?: boolean;
}) {
  return (
    <Reveal className={`${styles.sectionHeading} ${inverse ? styles.sectionHeadingInverse : ""}`}>
      <div className={styles.sectionHeadingMeta}>
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <h2>{title}</h2>
      <p className={styles.sectionHeadingBody}>{body}</p>
    </Reveal>
  );
}
