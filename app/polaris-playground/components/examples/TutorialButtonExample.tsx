"use client";

import React from "react";
import { TutorialButton } from "@/app/kits/polaris/TutorialButton";

export function TutorialButtonExample() {
  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base" alignItems="center">
          <s-heading>Embedded Video & Onboarding Tutorial Hub</s-heading>
          <s-paragraph>
            Click the tutorial button below to launch the video walkthrough without leaving the
            page.
          </s-paragraph>

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
        </s-stack>
      </s-box>
    </s-page>
  );
}
