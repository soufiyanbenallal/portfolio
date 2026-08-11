"use client";

import { useState } from "react";
import styles from "../advanced-portfolio.module.css";

function DraftPanel() {
  return (
    <div className={styles.builderDraft} aria-hidden="true">
      <div className={styles.draftToolbar}>
        <span />
        <span />
        <span />
        <strong>FRAME / HOME</strong>
      </div>
      <div className={styles.draftCanvas}>
        <div className={styles.draftEyebrow} />
        <div className={styles.draftHeadline}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.draftCopy}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.draftActions}>
          <span />
          <span />
        </div>
        <div className={styles.draftObject}>
          <span>3D / OBJ</span>
          <i />
          <b />
        </div>
      </div>
      <span className={styles.measureX}>612 PX</span>
      <span className={styles.measureY}>AUTO</span>
    </div>
  );
}

function FinishedPanel() {
  return (
    <div className={styles.builderFinished} aria-hidden="true">
      <div className={styles.finishedToolbar}>
        <span />
        <span />
        <span />
        <strong>LIVE / PRODUCT STUDIO</strong>
      </div>
      <div className={styles.finishedCanvas}>
        <p>FROM ROUGH IDEA</p>
        <h3>
          Build the system.
          <br />
          Ship the signal.
        </h3>
        <span className={styles.finishedCopy}>
          Strategy, architecture and interface working as one product practice.
        </span>
        <div className={styles.finishedActions}>
          <span>Explore work ↗</span>
          <span>View system</span>
        </div>
        <div className={styles.finishedObject}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function BuilderPreview() {
  const [progress, setProgress] = useState(54);

  return (
    <div className={styles.builderModule}>
      <div className={styles.builderTopbar}>
        <div>
          <span className={styles.builderStatusDot} />
          BUILD COMPARISON · LIVE
        </div>
        <span>{progress}% DESIGNED</span>
      </div>

      <div className={styles.builderViewport}>
        <DraftPanel />
        <div
          className={styles.builderFinishedClip}
          style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
        >
          <FinishedPanel />
        </div>
        <div className={styles.builderDivider} style={{ left: `${progress}%` }} aria-hidden="true">
          <span>↔</span>
        </div>
      </div>

      <div className={styles.builderControls}>
        <span>WIREFRAME</span>
        <label>
          <span className={styles.visuallyHidden}>Reveal finished design</span>
          <input
            type="range"
            min="12"
            max="88"
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
          />
        </label>
        <span>SHIP MODE</span>
      </div>
    </div>
  );
}
