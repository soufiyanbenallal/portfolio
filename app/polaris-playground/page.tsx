import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/shared/container.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { PolarisScriptLoader } from "@/components/shared/polaris-script-loader.shared";
import { PlaygroundHeaderPart } from "./partials/playground-header.part";
import { PlaygroundNavTabsPart } from "./partials/playground-nav-tabs.part";
import { PlaygroundCanvasPart } from "./partials/playground-canvas.part";
import { PlaygroundPropsControlPart } from "./partials/playground-props-control.part";
import { PlaygroundCodePanelPart } from "./partials/playground-code-panel.part";
import { PlaygroundComponentGridPart } from "./partials/playground-component-grid.part";

export const metadata: Metadata = {
  title: "Polaris Web Components Playground",
  description:
    "Interactive developer playground for Shopify Polaris App Home web components powered by @shopify/polaris-types and native custom elements.",
};

export default function PolarisPlaygroundPage() {
  return (
    <PageTransition>
      <div className="w-full">
        {/* ── Native Polaris Web Component CDN script loader ── */}
        <PolarisScriptLoader />

        <Container className="flex flex-col gap-10 pb-24 pt-32">
          {/* ── Page Header & Info ── */}
          <PlaygroundHeaderPart />

          {/* ── Category Navigation Tabs ── */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-50 font-mono">
              Component Categories
            </span>
            <PlaygroundNavTabsPart />
          </div>

          {/* ── Live Rendered Web Component Canvas ── */}
          <Reveal preset="fadeUp" delay={0.1}>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-50 font-mono">
                Live Interactive Canvas (App Home Environment)
              </span>
              <PlaygroundCanvasPart />
            </div>
          </Reveal>

          {/* ── Interactive Props Configurator ── */}
          <Reveal preset="fadeUp" delay={0.15}>
            <PlaygroundPropsControlPart />
          </Reveal>

          {/* ── Live Generated Code & Snippet Inspector ── */}
          <Reveal preset="fadeUp" delay={0.2}>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-50 font-mono">
                Generated Code Snippet
              </span>
              <PlaygroundCodePanelPart />
            </div>
          </Reveal>

          {/* ── Component Catalog Grid ── */}
          <Reveal preset="fadeUp" delay={0.25}>
            <div className="flex flex-col gap-4 border-t border-gray-30 pt-8">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-black">Component Reference Library</h3>
                <p className="text-xs text-gray-60">
                  Explore tags, props, and direct links to Shopify Polaris documentation.
                </p>
              </div>
              <PlaygroundComponentGridPart />
            </div>
          </Reveal>
        </Container>
      </div>
    </PageTransition>
  );
}
