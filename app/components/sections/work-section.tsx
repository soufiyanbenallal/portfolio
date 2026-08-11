import styles from "../../advanced-portfolio.module.css";
import { projects } from "../../data/portfolio-v2";
import { CommerceCaseMotif, PlatformCaseMotif, RealtimeCaseMotif } from "../studio-illustrations";
import { Reveal, Stagger, StaggerItem } from "../motion/motion-system";
import { SectionHeading } from "./section-heading";

function ProjectVisual({ visual }: { visual: "architecture" | "commerce" }) {
  if (visual === "architecture") {
    return (
      <div className={`${styles.caseVisual} ${styles.caseVisualCoral}`}>
        <div className={styles.caseVisualToolbar}>
          <span />
          <span />
          <span />
          <p>ARCHITECTURE / LIVE</p>
        </div>
        <PlatformCaseMotif className={styles.caseMotif} />
        <div className={styles.architectureMap} aria-hidden="true">
          <span>PRODUCT</span>
          <i>→</i>
          <span>SYSTEM</span>
          <i>→</i>
          <span>TEAM</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.caseVisual} ${styles.caseVisualAqua}`}>
      <div className={styles.caseVisualToolbar}>
        <span />
        <span />
        <span />
        <p>COMMERCE / DEPLOYED</p>
      </div>
      <CommerceCaseMotif className={styles.caseMotif} />
      <div className={styles.commerceTickets} aria-hidden="true">
        <span>APP</span>
        <span>THEME</span>
        <span>SAAS</span>
      </div>
    </div>
  );
}

export function WorkSection() {
  return (
    <section id="work" className={`${styles.section} ${styles.workSection}`}>
      <SectionHeading
        index="01"
        eyebrow="SELECTED SYSTEMS"
        title="Work where product decisions meet production code."
        body="Not a wall of screenshots. Two long-running engagements that show the decisions, responsibilities and systems behind the interface."
      />

      <div className={styles.caseList}>
        {projects.map((project, projectIndex) => (
          <Reveal className={styles.caseStudy} key={project.company}>
            <div className={styles.caseMetaRail}>
              <span className={`${styles.caseIndex} ${styles[`accentBg${project.accent}`]}`}>
                {project.index}
              </span>
              <p>{project.company}</p>
              <span>{project.period}</span>
            </div>

            <div className={styles.caseBody}>
              <div className={styles.caseCopy}>
                <p className={styles.caseOverline}>FLAGSHIP ENGAGEMENT · {projectIndex + 1} / 2</p>
                <h3>{project.title}</h3>
                <p className={styles.caseSummary}>{project.summary}</p>

                <dl className={styles.caseFacts}>
                  <div>
                    <dt>OWNERSHIP</dt>
                    <dd>{project.responsibility}</dd>
                  </div>
                  <div>
                    <dt>VALUE</dt>
                    <dd>{project.outcome}</dd>
                  </div>
                </dl>

                <ul className={styles.tagList} aria-label={`${project.company} technologies`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <ProjectVisual visual={project.visual} />
            </div>
          </Reveal>
        ))}
      </div>

      <Stagger className={styles.supportGrid}>
        <StaggerItem className={styles.supportCard}>
          <span className={styles.supportNumber}>03</span>
          <div className={styles.supportArt}>
            <RealtimeCaseMotif />
          </div>
          <p>FORNET · ARA SYSTÈMES · MORROCOW3</p>
          <h3>APIs, realtime operations and client platforms—the earlier layers of the stack.</h3>
          <span>2018 — 2021 · MOROCCO</span>
        </StaggerItem>

        <StaggerItem className={`${styles.supportCard} ${styles.supportCardDark}`}>
          <span className={styles.supportNumber}>04</span>
          <div className={styles.packageGrid} aria-hidden="true">
            <span>npm</span>
            <span>SB</span>
            <span>↗</span>
            <span>pkg</span>
          </div>
          <p>OPEN-SOURCE SIGNAL</p>
          <h3>Small tools, shared publicly—not every useful build needs a case study.</h3>
          <a href="https://www.npmjs.com/~beyonder.sb" target="_blank" rel="noreferrer">
            Browse packages as beyonder.sb ↗
          </a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
