import type { MotionValue } from "motion/react";

export type ProjectCategoryType = "Design" | "Development" | "Branding" | "All";

export type ProjectStatItemType = {
  label: string;
  value: string;
};

export type ProjectGalleryItemType = {
  src: string;
  alt: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "custom";
  caption?: string;
};

export type ProjectItemType = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategoryType;
  typeOfWork: string;
  year: string;
  tagline: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  accentColor?: string;
  liveUrl?: string;
  featured?: boolean;
  order: number;
};

export type ProjectDetailType = ProjectItemType & {
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  stats: ProjectStatItemType[];
  gallery: ProjectGalleryItemType[];
  techStack: string[];
  relatedProjectSlugs: string[];
};

export type DeckCardConfigType = {
  x: number;
  y: number;
  z: number;
  rotate: number;
  exit: { x: number; y: number; rotate: number };
  drift: number;
};

export type ShowcaseAsidePropsType = {
  activeIndex: number;
  progress: MotionValue<number>;
};

export type ShowcaseCardPropsType = {
  project: ProjectDetailType;
  index: number;
  isActive: boolean;
};

export type HeroProjectsUnifiedPropsType = {
  className?: string;
};
