"use client";

import React from "react";
import { Sparkles, Terminal, BookOpen, Search, Layers } from "lucide-react";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";

export function PlaygroundHeaderPart() {
  const searchQuery = usePolarisPlaygroundStore((state) => state.searchQuery);
  const setSearchQuery = usePolarisPlaygroundStore((state) => state.setSearchQuery);

  return (
    <div className="flex flex-col gap-6 border-b border-gray-30 pb-8">
      {/* ── Top Badges ── */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-medium text-emerald-700 border border-emerald-200/60">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          @shopify/polaris-types 1.0.7
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-medium text-blue-700 border border-blue-200/60">
          <Terminal className="h-3.5 w-3.5" />
          Native Web Components Runtime
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 font-mono text-xs font-medium text-purple-700 border border-purple-200/60">
          <Sparkles className="h-3.5 w-3.5" />
          App Home Ready
        </span>
      </div>

      {/* ── Title & Intro ── */}
      <div className="flex flex-col gap-3">
        <TextReveal
          as="h1"
          by="word"
          trigger="mount"
          text="Shopify Polaris Web Components Playground"
          className="text-3xl font-medium tracking-tight text-black sm:text-4xl md:text-5xl"
        />
        <Reveal preset="fadeUp" delay={0.2}>
          <p className="max-w-3xl text-base leading-relaxed text-gray-60">
            Interactive explorer and live sandbox for Shopify Polaris native web components (<code className="rounded bg-gray-10 px-1.5 py-0.5 font-mono text-xs font-medium text-black">&lt;s-*&gt;</code>). Explore App Home patterns, test interactive state configurations, and copy typed JSX/TSX or HTML snippets.
          </p>
        </Reveal>
      </div>

      {/* ── Search & Quick Links ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search web components (e.g. s-button, s-grid, table)..."
            className="w-full rounded-xl border border-gray-30 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-gray-40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://shopify.dev/docs/api/app-home/web-components"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-30 bg-white px-3.5 py-2 text-xs font-medium text-gray-70 hover:text-black hover:border-black transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Polaris Documentation
          </a>
          <a
            href="https://www.npmjs.com/package/@shopify/polaris-types"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-30 bg-white px-3.5 py-2 text-xs font-medium text-gray-70 hover:text-black hover:border-black transition-colors"
          >
            <Layers className="h-3.5 w-3.5" />
            NPM Package
          </a>
        </div>
      </div>
    </div>
  );
}
