import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articlesData, getArticleBySlug } from "@/data/articles.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Section } from "@/components/shared/section.shared";
import { Chapter, ChapterHead } from "@/components/shared/chapter.shared";
import { ArticleCard } from "@/components/shared/article-card.shared";
import { PageTransition, SharedElement } from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return articlesData.map((article) => ({ slug: article.slug }));
}

/**
 * Article — the cover the reader clicked (morphed across the route), then
 * a spine chapter: the label column carries the article's meta and stays
 * pinned; the body runs at a reading measure beside it.
 */
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
        <Section as="div" seam={false}>
          <div className="flex flex-col gap-6 px-4 pt-10 pb-12 sm:px-10 lg:pb-16">
            <Link
              href="/blog"
              transitionTypes={["nav-back"]}
              className="group text-ink-muted hover:text-ink inline-flex w-fit items-center gap-2 text-[13px] transition-colors"
            >
              <Icons.ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              All articles
            </Link>
            <span className="text-ink-faint font-mono text-[11px] tracking-[0.03em]">
              {article.category} · {article.publishedAt} · {article.readTime}
            </span>
            <h1 className="text-ink max-w-3xl text-[36px] leading-[1.06] font-medium tracking-[-0.04em] text-balance sm:text-[52px]">
              {article.title}
            </h1>
            <p className="text-ink-muted max-w-2xl text-[17px] leading-relaxed">{article.subtitle}</p>
          </div>
        </Section>

        <Section aria-label="Cover">
          <SharedElement name={`article-media-${article.slug}`}>
            <div className="bg-raised relative aspect-16/10 w-full overflow-hidden">
              <Image
                src={article.coverImage}
                alt=""
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </SharedElement>
        </Section>

        <Section aria-label="Article">
          <Chapter label={article.category} summary={`${article.publishedAt} · ${article.readTime}`} accent>
            <div className="flex max-w-[68ch] flex-col gap-10 px-4 py-12 sm:px-10 lg:py-16">
              <div className="flex items-center gap-3">
                <span className="ring-line-2 relative h-8 w-8 overflow-hidden rounded-full ring-1">
                  <Image src={article.author.avatar} alt="" fill sizes="32px" className="object-cover" />
                </span>
                <span className="flex flex-col">
                  <span className="text-ink text-[13px] font-medium">{article.author.name}</span>
                  <span className="text-ink-faint text-[12px]">{article.author.role}</span>
                </span>
              </div>

              <p className="text-ink text-[19px] leading-relaxed tracking-[-0.01em]">{article.intro}</p>

              {article.sections.map((section) => (
                <section key={section.heading} className="flex flex-col gap-4">
                  <h2 className="text-ink text-[24px] leading-tight font-medium tracking-[-0.03em]">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-ink-muted text-[16px] leading-[1.7]">
                      {paragraph}
                    </p>
                  ))}
                  {section.quote && (
                    <blockquote className="border-brand text-ink my-2 border-l-2 pl-5 text-[20px] leading-snug font-medium tracking-[-0.02em]">
                      {section.quote}
                    </blockquote>
                  )}
                </section>
              ))}

              {article.conclusion && (
                <p className="border-line text-ink border-t pt-8 text-[17px] leading-relaxed font-medium">
                  {article.conclusion}
                </p>
              )}
            </div>
          </Chapter>
        </Section>

        {relatedArticles.length > 0 && (
          <Section aria-label="More writing">
            <ChapterHead eyebrow="More writing" title={["Keep reading."]} />
            <ul className="cells border-line border-t md:grid-cols-2">
              {relatedArticles.map((related) => (
                <li key={related.id}>
                  <ArticleCard article={related} />
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
    </PageTransition>
  );
}
