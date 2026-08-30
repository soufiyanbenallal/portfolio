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
import { PageTransition, SharedElement } from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData.filter((p) => project.relatedProjectSlugs.includes(p.slug));

  return (
    <PageTransition>
      <article className="w-full">
        <Container className="flex flex-col gap-12 pt-32 pb-24 sm:gap-16">
          {/* Back Link */}
          <div>
            <Link
              href="/projects"
              transitionTypes={["nav-back"]}
              className="text-gray-60 group inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-black"
            >
              <Icons.ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="border-gray-30 flex flex-col gap-6 border-b pb-10">
            <Reveal preset="fade" className="flex flex-wrap items-center gap-3">
              <TagBadgeUi variant="dark">{project.category}</TagBadgeUi>
              <span className="font-mono text-xs text-gray-50">{project.year}</span>
              <span className="text-gray-40 text-xs">/</span>
              <span className="text-gray-60 text-xs font-medium">{project.client}</span>
            </Reveal>

            <TextReveal
              as="h1"
              by="word"
              trigger="mount"
              text={`${project.title} — ${project.tagline}`}
              className="max-w-3xl text-3xl font-medium tracking-tight text-black sm:text-5xl md:text-6xl"
            />

            <Reveal preset="fadeUp" delay={0.25}>
              <p className="text-gray-60 max-w-2xl text-base leading-relaxed sm:text-lg">
                {project.description}
              </p>
            </Reveal>
          </div>

          {/* Hero cover. Paired by name with the card the reader clicked, so the
            thumbnail physically becomes this image across the route change. */}
          <SharedElement name={`project-media-${project.slug}`}>
            <div className="bg-gray-10 border-gray-30 relative aspect-[16/9] w-full overflow-hidden rounded-[24px] border shadow-sm">
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
              className="border-gray-30 grid grid-cols-1 gap-4 border-y py-8 sm:grid-cols-3"
              stagger={0.1}
            >
              {project.stats.map((stat, i) => (
                <StaggerItem key={i} className="flex flex-col gap-1 text-center sm:text-left">
                  <span className="font-mono text-xs tracking-widest text-gray-50 uppercase">
                    {stat.label}
                  </span>
                  <span className="font-price text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    {stat.value}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {/* Narrative Columns (Overview, Challenge, Solution) */}
          <div className="grid grid-cols-1 gap-10 py-4 md:grid-cols-12 md:gap-12">
            <div className="flex flex-col gap-6 md:col-span-4">
              <span className="block font-mono text-xs tracking-widest text-gray-50 uppercase">
                Project Architecture
              </span>
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-gray-40 mb-1 block text-xs">Client</span>
                  <span className="text-sm font-semibold text-black">{project.client}</span>
                </div>
                <div>
                  <span className="text-gray-40 mb-1 block text-xs">Scope</span>
                  <span className="text-sm font-semibold text-black">{project.typeOfWork}</span>
                </div>
                <div>
                  <span className="text-gray-40 mb-2 block text-xs">Technologies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-10 border-gray-30 rounded-md border px-2.5 py-1 font-mono text-xs text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-body-xl flex flex-col gap-8 leading-relaxed text-black md:col-span-8">
              <div>
                <h2 className="mb-3 text-xl font-medium text-black">Overview</h2>
                <p className="text-gray-60">{project.overview}</p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-medium text-black">The Challenge</h2>
                <p className="text-gray-60">{project.challenge}</p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-medium text-black">The Solution</h2>
                <p className="text-gray-60">{project.solution}</p>
              </div>

              {project.results && project.results.length > 0 && (
                <div className="border-gray-20 border-t pt-4">
                  <h2 className="mb-4 text-xl font-medium text-black">Key Outcomes</h2>
                  <ul className="flex flex-col gap-3">
                    {project.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-black">
                        <Icons.Check className="text-availability-green mt-0.5 h-4 w-4 shrink-0" />
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
            <div className="border-gray-30 flex flex-col gap-8 border-t pt-8">
              <span className="font-mono text-xs tracking-widest text-gray-50 uppercase">
                Visual Highlights
              </span>
              <div className="flex flex-col gap-8">
                {project.gallery.map((img, i) => (
                  <Reveal key={i} preset="card3D" className="flex flex-col gap-2">
                    <div className="bg-gray-10 border-gray-30 relative aspect-[16/9] w-full overflow-hidden rounded-[20px] border">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1080px"
                        className="object-cover"
                      />
                    </div>
                    {img.caption && (
                      <span className="px-1 text-right font-mono text-xs text-gray-50">
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
            <div className="border-gray-30 flex flex-col gap-6 border-t pt-12">
              <span className="font-mono text-xs tracking-widest text-gray-50 uppercase">
                Related Case Studies
              </span>
              <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.1}>
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
