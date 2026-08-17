import React from "react";

export type SectionHeadingPropsType = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  inverse?: boolean;
  className?: string;
  metaTheme?: "light" | "dark" | "yellow" | "coral" | "aqua" | "blue";
};

export type ExperienceMetricType = {
  label: string;
  value: string;
  description?: string;
};

export type ExperienceStoryItemType = {
  id: string;
  index: string;
  period: string;
  company: string;
  location: string;
  role: string;
  headline: string;
  eyebrow: string;
  headingTitle: string;
  headingBody: string;
  narrative: string;
  keyResponsibilities: string[];
  outcomes: string[];
  stack: string[];
  theme: {
    backgroundColor: string;
    textColor: string;
    dividerColor: string;
    accentColor: string;
    isDark: boolean;
  };
  metrics?: ExperienceMetricType[];
};
