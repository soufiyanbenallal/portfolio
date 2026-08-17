"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { articlesData } from "@/data/articles.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";

export default function BlogIndexPage() {
  return (
    <div className="w-full pt-32 pb-24">
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-30 pb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block">
            Design Insights & Resources
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-black">
            My design insights & creative resources.
          </h1>
          <p className="text-base text-gray-60 max-w-xl">
            Reflections on product engineering, interface psychology, and building durable software at scale.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {articlesData.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="block rounded-[20px] bg-white border border-gray-30 p-4 sm:p-5 card-shadow hover:card-shadow-hover transition-all duration-300 h-full flex flex-col justify-between gap-4 overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-gray-10">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-medium text-black">
                      {article.category}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-50">
                      <span>{article.publishedAt}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-xl font-medium tracking-tight text-black group-hover:text-gray-60 transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-xs text-gray-60 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-black pt-3 border-t border-gray-20">
                  <span>Read Full Article</span>
                  <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
