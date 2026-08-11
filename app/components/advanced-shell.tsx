"use client";

import type { ReactNode } from "react";
import styles from "../advanced-portfolio.module.css";
import { navigation } from "../data/portfolio-v2";
import { SbTv } from "./sb-tv";
import { MotionProvider, PageProgress } from "./motion/motion-system";

function BrandMark() {
  return (
    <span className={styles.brandMark} aria-hidden="true">
      <span>S</span>
      <span>B</span>
    </span>
  );
}

export function AdvancedShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <PageProgress className={styles.pageProgress} />

      <div className={styles.siteShell} data-portfolio-shell>
        <header className={styles.siteHeader}>
          <nav className={styles.navigation} aria-label="Main navigation">
            <a className={styles.brand} href="#top" aria-label="Soufiyan Benallal, back to top">
              <BrandMark />
              <span className={styles.brandCopy}>
                <strong>Soufiyan Benallal</strong>
                <small>Product-minded engineer</small>
              </span>
            </a>

            <div className={styles.navLinks}>
              {navigation.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className={styles.navActions}>
              <div className={styles.navTv}>
                <SbTv />
              </div>
              <a className={styles.navContact} href="#contact">
                Let&apos;s talk <span aria-hidden="true">↗</span>
              </a>
            </div>
          </nav>
        </header>

        <main id="main-content">{children}</main>

        <footer className={styles.footer}>
          <div>
            <BrandMark />
            <p>Built from the sketch up in Meknès, Morocco.</p>
          </div>
          <p>© {new Date().getFullYear()} Soufiyan Benallal</p>
          <a href="#top">Back to the top ↑</a>
        </footer>
      </div>
    </MotionProvider>
  );
}
