import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articlesData, getArticleBySlug } from "@/data/articles.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { TagBadgeUi } from "@/components/ui/badge.ui";
import { Container } from "@/components/shared/container.shared";
import { Reveal } from "@/components/motion/reveal.motion";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import {
  PageTransition,
  SharedElement,
} from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articlesData.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  return (
    <PageTransition>
      <article className="w-full">
      <Container className="max-w-[760px] flex flex-col gap-10 sm:gap-14 pt-32 pb-24">
        {/* Back link */}
        <div>
          <Link
            href="/blog"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-2 text-xs font-medium text-gray-60 hover:text-black transition-colors"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="flex flex-col gap-5 border-b border-gray-30 pb-8">
          <div className="flex items-center gap-3">
            <TagBadgeUi variant="dark">{article.category}</TagBadgeUi>
            <span className="text-xs font-mono text-gray-50">{article.publishedAt}</span>
            <span className="text-xs text-gray-40">·</span>
            <span className="text-xs font-mono text-gray-50">{article.readTime}</span>
          </div>

          <TextReveal
            as="h1"
            by="word"
            trigger="mount"
            text={article.title}
            className="text-3xl sm:text-5xl font-medium tracking-tight text-black leading-tight"
          />

          <p className="text-base sm:text-lg text-gray-60 leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-3 pt-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-30 shrink-0">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black leading-tight">
                {article.author.name}
              </span>
              <span className="text-xs text-gray-50">{article.author.role}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <SharedElement name={`article-media-${article.slug}`}>
          <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-gray-10 border border-gray-30 shadow-sm">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 760px"
              className="object-cover"
            />
          </div>
        </SharedElement>

        {/* Article Body Content with Editorial Measure */}
        <div className="flex flex-col gap-8 text-black text-body-xl leading-relaxed">
          <p className="text-lg sm:text-xl font-normal text-black leading-relaxed border-l-2 border-black pl-5 italic">
            {article.intro}
          </p>

          {article.sections.map((section, idx) => (
            <Reveal key={idx} preset="fadeUp" className="flex flex-col gap-4 pt-4">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-gray-60 text-base sm:text-lg leading-relaxed">
                  {p}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-4 p-6 rounded-2xl bg-gray-10 border-l-4 border-black text-base sm:text-lg font-medium text-black italic">
                  &ldquo;{section.quote}&rdquo;
                </blockquote>
              )}
            </Reveal>
          ))}

          {article.conclusion && (
            <div className="pt-6 border-t border-gray-30">
              <p className="text-base sm:text-lg text-black font-medium leading-relaxed">
                {article.conclusion}
              </p>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="flex flex-col gap-6 pt-12 border-t border-gray-30">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50">
              More Insights
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group block rounded-[20px] bg-white border border-gray-30 p-4 card-shadow hover:card-shadow-hover transition-all"
                >
                  <span className="text-[11px] font-mono text-gray-50 block mb-1">
                    {rel.publishedAt}
                  </span>
                  <h4 className="text-base font-medium text-black group-hover:text-gray-60 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
      </article>
    </PageTransition>
  );
}
