import React from "react";
import { notFound } from "next/navigation";
import { polarisDocComponentsData } from "../data/polaris-docs.data";
import { PolarisBlockPreviewPart } from "../components/polaris-block-preview.part";

export function generateStaticParams() {
  return polarisDocComponentsData.map((comp) => ({
    componentSlug: comp.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ componentSlug: string }>;
}) {
  const { componentSlug } = await params;
  const component = polarisDocComponentsData.find(
    (c) => c.slug === componentSlug,
  );

  if (!component) {
    return {
      title: "Component Not Found — Polaris Playground",
    };
  }

  return {
    title: `${component.name} — Polaris Web Components`,
    description: component.description,
  };
}

export default async function PolarisComponentDetailPage({
  params,
}: {
  params: Promise<{ componentSlug: string }>;
}) {
  const { componentSlug } = await params;
  const component = polarisDocComponentsData.find(
    (c) => c.slug === componentSlug,
  );

  if (!component) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl w-full space-y-6 pb-10">
      {component.examples.map((example) => (
        <PolarisBlockPreviewPart
          key={example.id}
          example={example}
          componentSlug={component.slug}
          componentName={component.name}
          defaultInstallCommand={`npx shadcn@latest add ${component.slug}`}
        />
      ))}
    </div>
  );
}
