"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { articlesData } from "@/data/articles.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { EASINGS } from "@/lib/motion.config";

export function BlogInsightsPart() {
  const featuredArticle = articlesData[0];
  const supportingArticles = articlesData.slice(1, 3);

  return (
    <section
      id="blog"
      className="w-full bg-white border-t border-gray-30 select-none"
    >
      <Container className="flex flex-col gap-10 md:gap-14 py-12 md:py-24 lg:py-32">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-gray-30 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block mb-1">
              Thoughts & Insights
            </span>
            <h2 className="text-h2-sm font-medium tracking-tight text-black">
              From my blog, design insights.
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-black hover:text-gray-60 transition-colors"
          >
            <span>View All Articles</span>
            <Icons.ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Featured Article Card (Spans full width on desktop / horizontal 50-50 split) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASINGS.standard }}
            className="md:col-span-2 group"
          >
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="block rounded-[20px] bg-white border border-gray-30 p-4 sm:p-5 card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image Area (50% on desktop) */}
                <div className="md:col-span-6 relative aspect-[16/10] md:aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-10">
                  <Image
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-medium text-black">
                    Featured
                  </div>
                </div>

                {/* Text Area (50% on desktop) */}
                <div className="md:col-span-6 flex flex-col justify-between h-full p-2 md:p-4 gap-4">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-50">
                      <span>{featuredArticle.publishedAt}</span>
                      <span>·</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-black group-hover:text-gray-60 transition-colors">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-60 line-clamp-3 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-black pt-2">
                    <span>Read Full Insight</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 2 Supporting Vertical Article Cards */}
          {supportingArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: EASINGS.standard }}
              className="group"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="block rounded-[20px] bg-white border border-gray-30 p-4 card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden h-full flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-gray-10">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-50">
                      <span>{article.publishedAt}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-medium tracking-tight text-black group-hover:text-gray-60 transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-xs text-gray-60 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-black pt-2 border-t border-gray-20">
                  <span>Read Article</span>
                  <Icons.ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
