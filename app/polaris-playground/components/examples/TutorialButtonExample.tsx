"use client";

import React from "react";
import { TutorialButton } from "@/app/kits/polaris/TutorialButton";

export function TutorialButtonExample() {
  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-xl border border-border bg-card/60 text-center space-y-3">
      <h4 className="text-sm font-semibold text-foreground">
        Embedded Video & Onboarding Tutorial Hub
      </h4>
      <p className="text-xs text-muted-foreground">
        Notice the floating tutorial launcher anchored at the bottom-left corner of the screen.
        Click it to watch the embedded setup video walkthrough without leaving the page.
      </p>

      <div className="pt-2">
        <TutorialButton
          compact={false}
          collapsible={false}
          videos={{
            default: {
              title: "Watch 2-Minute Quickstart Video",
              videoId: "dQw4w9WgXcQ",
              disabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}
