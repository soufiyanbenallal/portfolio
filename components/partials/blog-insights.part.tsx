"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { articlesData } from "@/data/articles.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { SharedElement } from "@/components/motion/page-transition.motion";

/**
 * Articles.
 *
 * Each cover image is a view-transition participant, so clicking a card
 * morphs that exact image into the article hero rather than cross-fading two
 * pages. The tilt is kept shallow here — these are reading entry points, and
 * text that leans too far reads as decoration.
 */
export function BlogInsightsPart() {
  const [featured, ...rest] = articlesData;
  const supporting = rest.slice(0, 2);

  return (
    <div className="w-full select-none">
      <Container className="flex flex-col gap-10 py-12 md:gap-14 md:py-24 lg:py-32">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-30 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-label mb-1 block text-gray-50">
              Thoughts &amp; insights
            </span>
            <TextReveal
              as="h2"
              by="word"
              text="From my blog, design insights."
              className="text-h2-sm text-black"
            />
          </div>

          <Reveal preset="fade" delay={0.2}>
            <Link
              href="/blog"
              transitionTypes={["nav-forward"]}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-black transition-colors hover:text-gray-60"
            >
              <span>View all articles</span>
              <Icons.ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Featured — spans both columns */}
          <Reveal preset="card3D" className="group md:col-span-2">
            <Link
              href={`/blog/${featured.slug}`}
              transitionTypes={["nav-forward"]}
              data-cursor="article"
              data-cursor-text="Read"
              className="block overflow-hidden rounded-[20px] border border-gray-30 bg-white p-4 transition-shadow duration-300 card-shadow hover:card-shadow-hover sm:p-5"
            >
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
                <div className="md:col-span-6">
                  <SharedElement name={`article-media-${featured.slug}`}>
                    <div className="relative aspect-16/10 overflow-hidden rounded-[16px] bg-gray-10 md:aspect-4/3">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-medium text-black backdrop-blur-md">
                        Featured
                      </span>
                    </div>
                  </SharedElement>
                </div>

                <div className="flex h-full flex-col justify-between gap-4 p-2 md:col-span-6 md:p-4">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs text-gray-50">
                      <span>{featured.publishedAt}</span>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-black transition-colors group-hover:text-gray-60 sm:text-2xl">
                      {featured.title}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-gray-60 sm:text-sm">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 text-xs font-medium text-black">
                    <span>Read full insight</span>
                    <Icons.ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          {supporting.map((article, index) => (
            <Reveal
              key={article.id}
              preset="card3D"
              delay={0.1 * (index + 1)}
              className="group"
            >
              <Tilt3D intensity={5} lift={10} className="h-full">
                <Link
                  href={`/blog/${article.slug}`}
                  transitionTypes={["nav-forward"]}
                  data-cursor="article"
                  data-cursor-text="Read"
                  className="flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[20px] border border-gray-30 bg-white p-4 transition-shadow duration-300 card-shadow hover:card-shadow-hover"
                >
                  <div className="flex flex-col gap-4">
                    <SharedElement name={`article-media-${article.slug}`}>
                      <div className="relative aspect-16/10 w-full overflow-hidden rounded-[16px] bg-gray-10">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    </SharedElement>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-gray-50">
                        <span>{article.publishedAt}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-base font-medium tracking-tight text-black transition-colors group-hover:text-gray-60 sm:text-lg">
                        {article.title}
                      </h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-gray-60">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 border-t border-gray-20 pt-2 text-xs font-medium text-black">
                    <span>Read article</span>
                    <Icons.ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
