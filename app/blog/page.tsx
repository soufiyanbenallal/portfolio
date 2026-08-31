import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articlesData } from "@/data/articles.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { Reveal } from "@/components/motion/reveal.motion";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { PageTransition, SharedElement } from "@/components/motion/page-transition.motion";

export const metadata = {
  title: "Engineering Insights — Soufiyan Benallal",
  description:
    "Reflections on scalable systems, Shopify architecture, React 19, and autonomous AI integrations.",
};

/**
 * Article index.
 *
 * Every cover is a view-transition participant, so an article opens by
 * growing its own thumbnail into the detail hero. The reader never loses
 * track of which card they clicked.
 */
export default function BlogIndexPage() {
  return (
    <PageTransition>
      <div className="w-full">
        <Container className="flex flex-col gap-12 pt-32 pb-24">
          <div className="border-gray-30 flex flex-col gap-4 border-b pb-8">
            <span className="text-label block text-gray-50">
              Engineering &amp; Architecture Insights
            </span>
            <TextReveal
              as="h1"
              by="word"
              trigger="mount"
              text="Engineering insights & technical notes."
              className="text-4xl font-medium tracking-tight text-black sm:text-5xl md:text-6xl"
            />
            <Reveal preset="fadeUp" delay={0.3}>
              <p className="text-gray-60 max-w-xl text-base">
                Deep dives into full-stack software engineering, Shopify apps &amp; Polaris,
                deterministic AI pipelines, and sub-second web performance.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {articlesData.map((article, index) => (
              <Reveal
                key={article.id}
                preset="card3D"
                delay={Math.min(index * 0.07, 0.35)}
                className="group h-full"
              >
                <Tilt3D intensity={5} lift={10} className="h-full">
                  <Link
                    href={`/blog/${article.slug}`}
                    transitionTypes={["nav-forward"]}
                    data-cursor="article"
                    data-cursor-text="Read"
                    className="border-gray-30 card-shadow hover:card-shadow-hover flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[20px] border bg-white p-4 transition-shadow duration-300 sm:p-5"
                  >
                    <div className="flex flex-col gap-4">
                      <SharedElement name={`article-media-${article.slug}`}>
                        <div className="bg-gray-10 relative aspect-16/10 w-full overflow-hidden rounded-[16px]">
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            priority={index < 2}
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-black backdrop-blur-md">
                            {article.category}
                          </span>
                        </div>
                      </SharedElement>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-mono text-xs text-gray-50">
                          <span>{article.publishedAt}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h2 className="group-hover:text-gray-60 text-xl font-medium tracking-tight text-black transition-colors">
                          {article.title}
                        </h2>

                        <p className="text-gray-60 line-clamp-3 text-xs leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="border-gray-20 flex items-center gap-1.5 border-t pt-3 text-xs font-medium text-black">
                      <span>Read full article</span>
                      <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
