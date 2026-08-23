import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectsData, getProjectBySlug } from "@/data/projects.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { TagBadgeUi } from "@/components/ui/badge.ui";
import { Container } from "@/components/shared/container.shared";
import { ProjectCardPart } from "@/components/partials/project-card.part";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal.motion";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import {
  PageTransition,
  SharedElement,
} from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData.filter((p) =>
    project.relatedProjectSlugs.includes(p.slug)
  );

  return (
    <PageTransition>
      <article className="w-full">
      <Container className="flex flex-col gap-12 sm:gap-16 pt-32 pb-24">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-60 hover:text-black transition-colors group"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="flex flex-col gap-6 border-b border-gray-30 pb-10">
          <Reveal preset="fade" className="flex flex-wrap items-center gap-3">
            <TagBadgeUi variant="dark">{project.category}</TagBadgeUi>
            <span className="text-xs font-mono text-gray-50">{project.year}</span>
            <span className="text-xs text-gray-40">/</span>
            <span className="text-xs font-medium text-gray-60">{project.client}</span>
          </Reveal>

          <TextReveal
            as="h1"
            by="word"
            trigger="mount"
            text={`${project.title} — ${project.tagline}`}
            className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-black max-w-3xl"
          />

          <Reveal preset="fadeUp" delay={0.25}>
            <p className="text-base sm:text-lg text-gray-60 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </Reveal>
        </div>

        {/* Hero cover. Paired by name with the card the reader clicked, so the
            thumbnail physically becomes this image across the route change. */}
        <SharedElement name={`project-media-${project.slug}`}>
          <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-gray-10 border border-gray-30 shadow-sm">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1080px"
              className="object-cover object-center"
            />
          </div>
        </SharedElement>

        {/* Stats Metrics Grid */}
        {project.stats && project.stats.length > 0 && (
          <Stagger
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-gray-30 py-8"
            stagger={0.1}
          >
            {project.stats.map((stat, i) => (
              <StaggerItem
                key={i}
                className="flex flex-col gap-1 text-center sm:text-left"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-gray-50">
                  {stat.label}
                </span>
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-price">
                  {stat.value}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* Narrative Columns (Overview, Challenge, Solution) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 py-4">
          <div className="md:col-span-4 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block">
              Project Architecture
            </span>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-gray-40 block mb-1">Client</span>
                <span className="text-sm font-semibold text-black">{project.client}</span>
              </div>
              <div>
                <span className="text-xs text-gray-40 block mb-1">Scope</span>
                <span className="text-sm font-semibold text-black">{project.typeOfWork}</span>
              </div>
              <div>
                <span className="text-xs text-gray-40 block mb-2">Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-gray-10 border border-gray-30 text-xs font-mono text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-8 text-black text-body-xl leading-relaxed">
            <div>
              <h2 className="text-xl font-medium text-black mb-3">Overview</h2>
              <p className="text-gray-60">{project.overview}</p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-black mb-3">The Challenge</h2>
              <p className="text-gray-60">{project.challenge}</p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-black mb-3">The Solution</h2>
              <p className="text-gray-60">{project.solution}</p>
            </div>

            {project.results && project.results.length > 0 && (
              <div className="pt-4 border-t border-gray-20">
                <h2 className="text-xl font-medium text-black mb-4">Key Outcomes</h2>
                <ul className="flex flex-col gap-3">
                  {project.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black">
                      <Icons.Check className="w-4 h-4 text-availability-green shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="flex flex-col gap-8 pt-8 border-t border-gray-30">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50">
              Visual Highlights
            </span>
            <div className="flex flex-col gap-8">
              {project.gallery.map((img, i) => (
                <Reveal key={i} preset="card3D" className="flex flex-col gap-2">
                  <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-gray-10 border border-gray-30">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1080px"
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <span className="text-xs font-mono text-gray-50 text-right px-1">
                      {img.caption}
                    </span>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="flex flex-col gap-6 pt-12 border-t border-gray-30">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50">
              Related Case Studies
            </span>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
              {relatedProjects.map((rel) => (
                <StaggerItem key={rel.id} preset="card3D">
                  <ProjectCardPart project={rel} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </Container>
      </article>
    </PageTransition>
  );
}
