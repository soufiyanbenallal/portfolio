import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projects.data";
import { articlesData } from "@/data/articles.data";
import {
  polarisDocComponentsData,
  type PolarisDocComponentType,
} from "@/app/polaris-playground/data/polaris-docs.data";

const SITE_URL = "https://soufiyanbenallal.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/polaris-playground`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Project dynamic routes
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog dynamic routes
  const articleRoutes: MetadataRoute.Sitemap = articlesData.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Polaris playground dynamic routes
  const polarisRoutes: MetadataRoute.Sitemap = polarisDocComponentsData.map(
    (comp: PolarisDocComponentType) => ({
      url: `${SITE_URL}/polaris-playground/${comp.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...polarisRoutes];
}
