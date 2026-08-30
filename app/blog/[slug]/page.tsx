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
import { PageTransition, SharedElement } from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articlesData.filter((a) => article.relatedArticleSlugs.includes(a.slug));

  return (
    <PageTransition>
      <article className="w-full">
        <Container className="flex max-w-[760px] flex-col gap-10 pt-32 pb-24 sm:gap-14">
          {/* Back link */}
          <div>
            <Link
              href="/blog"
              transitionTypes={["nav-back"]}
              className="group text-gray-60 inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-black"
            >
              <Icons.ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <div className="border-gray-30 flex flex-col gap-5 border-b pb-8">
            <div className="flex items-center gap-3">
              <TagBadgeUi variant="dark">{article.category}</TagBadgeUi>
              <span className="font-mono text-xs text-gray-50">{article.publishedAt}</span>
              <span className="text-gray-40 text-xs">·</span>
              <span className="font-mono text-xs text-gray-50">{article.readTime}</span>
            </div>

            <TextReveal
              as="h1"
              by="word"
              trigger="mount"
              text={article.title}
              className="text-3xl leading-tight font-medium tracking-tight text-black sm:text-5xl"
            />

            <p className="text-gray-60 text-base leading-relaxed sm:text-lg">{article.subtitle}</p>

            {/* Author row */}
            <div className="flex items-center gap-3 pt-3">
              <div className="border-gray-30 relative h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-tight font-semibold text-black">
                  {article.author.name}
                </span>
                <span className="text-xs text-gray-50">{article.author.role}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <SharedElement name={`article-media-${article.slug}`}>
            <div className="bg-gray-10 border-gray-30 relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border shadow-sm">
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
          <div className="text-body-xl flex flex-col gap-8 leading-relaxed text-black">
            <p className="border-l-2 border-black pl-5 text-lg leading-relaxed font-normal text-black italic sm:text-xl">
              {article.intro}
            </p>

            {article.sections.map((section, idx) => (
              <Reveal key={idx} preset="fadeUp" className="flex flex-col gap-4 pt-4">
                <h2 className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-60 text-base leading-relaxed sm:text-lg">
                    {p}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="bg-gray-10 my-4 rounded-2xl border-l-4 border-black p-6 text-base font-medium text-black italic sm:text-lg">
                    &ldquo;{section.quote}&rdquo;
                  </blockquote>
                )}
              </Reveal>
            ))}

            {article.conclusion && (
              <div className="border-gray-30 border-t pt-6">
                <p className="text-base leading-relaxed font-medium text-black sm:text-lg">
                  {article.conclusion}
                </p>
              </div>
            )}
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="border-gray-30 flex flex-col gap-6 border-t pt-12">
              <span className="font-mono text-xs tracking-widest text-gray-50 uppercase">
                More Insights
              </span>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group border-gray-30 card-shadow hover:card-shadow-hover block rounded-[20px] border bg-white p-4 transition-all"
                  >
                    <span className="mb-1 block font-mono text-[11px] text-gray-50">
                      {rel.publishedAt}
                    </span>
                    <h4 className="group-hover:text-gray-60 line-clamp-2 text-base font-medium text-black transition-colors">
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
