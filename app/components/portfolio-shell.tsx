"use client";

import { useEffect } from "react";
import { SbTv } from "./sb-tv";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    elements.forEach((element) => element.classList.add("reveal--pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <nav className="site-nav">
          <a className="brand" href="#top" aria-label="Soufiyan Benallal, back to top">
            <span>SB</span>
            <strong>Soufiyan Benallal</strong>
          </a>
          <div className="site-nav__links">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#expertise">Expertise</a>
            <SbTv />
            <a className="contact-link" href="#contact">Contact <span>→</span></a>
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
