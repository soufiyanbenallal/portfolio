import React from "react";
import { notFound } from "next/navigation";
import { polarisDocComponentsData } from "../data/polaris-docs.data";
import {
  PolarisBlockPreviewPart,
  type BlockFileItemType,
} from "../components/polaris-block-preview.part";
import { getSourceCode } from "../utils/source-loader.util";
import { FeedbackCard } from "@/app/kits/polaris/ui/feedbacks/FeedbackCard";

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
    (c) => c.slug === componentSlug
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
    (c) => c.slug === componentSlug
  );

  if (!component) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl w-full space-y-8 pb-12">
      {component.examples.map((example) => {
        const files: BlockFileItemType[] = example.fileSources.map((source) => ({
          name: source.name,
          path: source.path,
          content: getSourceCode(source.sourcePath),
          language: source.language || "tsx",
        }));

        return (
          <PolarisBlockPreviewPart
            key={example.id}
            example={example}
            componentSlug={component.slug}
            componentName={component.name}
            defaultInstallCommand={
              example.installCommand || `npx shadcn@latest add ${component.slug}`
            }
            files={files}
          />
        );
      })}

      {/* Merchant / Developer Feedback Box */}
      <div className="pt-4 max-w-xl mx-auto">
        <FeedbackCard />
      </div>
    </div>
  );
}
