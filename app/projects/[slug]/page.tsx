import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projectsData, getProjectBySlug } from "@/data/projects.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { TagBadgeUi } from "@/components/ui/badge.ui";
import { Section } from "@/components/shared/section.shared";
import { Chapter, ChapterHead } from "@/components/shared/chapter.shared";
import { WorkCard } from "@/components/shared/work-card.shared";
import { PageTransition, SharedElement } from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

/** Renders `code spans` in project copy as inline mono code. */
function InlineText({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, index) =>
        index % 2 === 1 ? (
          <code key={index} className="bg-raised text-ink-2 rounded-[4px] px-1 py-0.5 font-mono text-[0.88em]">
            {part}
          </code>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

/** Where the project lives, in words: npm, GitHub, or this site. */
function describeLiveUrl(url: string) {
  if (url.startsWith("/")) return { label: "Open it live", external: false };
  if (url.includes("npmjs.com")) return { label: "View on npm", external: true };
  if (url.includes("github.com")) return { label: "View on GitHub", external: true };
  return { label: "Visit", external: true };
}

/**
 * Project — a case study in seamed sections: the claim and its links, the
 * cover the reader clicked (morphed across the route), facts as cells, the
 * story as a spine chapter of rows, then related work.
 */
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData.filter((p) => project.relatedProjectSlugs.includes(p.slug));
  const live = project.liveUrl ? describeLiveUrl(project.liveUrl) : null;
  const story = [
    { label: "Overview", body: project.overview },
    { label: "The problem", body: project.challenge },
    { label: "The approach", body: project.solution },
  ];

  return (
    <PageTransition>
      <article className="w-full">
        <Section as="div" seam={false}>
          <div className="flex flex-col gap-8 px-4 pt-10 pb-12 sm:px-10 lg:pb-16">
            <Link
              href="/projects"
              transitionTypes={["nav-back"]}
              className="group text-ink-muted hover:text-ink inline-flex w-fit items-center gap-2 text-[13px] transition-colors"
            >
              <Icons.ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              All projects
            </Link>

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <TagBadgeUi variant="dark">{project.category}</TagBadgeUi>
                <span className="text-ink-faint font-mono text-[11px]">
                  {project.client} · {project.year}
                </span>
              </div>
              <h1 className="text-ink max-w-3xl text-[40px] leading-[1.04] font-medium tracking-[-0.045em] text-balance sm:text-[56px]">
                {project.title}. <span className="text-ink-soft">{project.tagline}</span>
              </h1>
              <p className="text-ink-muted max-w-2xl text-[16px] leading-relaxed">{project.description}</p>
            </div>

            {live && project.liveUrl && (
              <div className="flex flex-wrap gap-2">
                {live.external ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex h-10 items-center gap-2 px-4 text-[13px] font-medium"
                  >
                    {live.label}
                    <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    href={project.liveUrl}
                    className="btn-primary inline-flex h-10 items-center gap-2 px-4 text-[13px] font-medium"
                  >
                    {live.label}
                    <Icons.ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </Section>

        {/* The cover the reader clicked, morphed across the route. */}
        <Section aria-label="Cover">
          <SharedElement name={`project-media-${project.slug}`}>
            <div className="bg-raised relative aspect-16/10 w-full overflow-hidden">
              <Image
                src={project.heroImage}
                alt={`${project.title} — ${project.typeOfWork}`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </SharedElement>
        </Section>

        <Section aria-label="Facts">
          <dl className="cells grid-cols-1 sm:grid-cols-3 [&>*]:bg-bg!">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 p-6 sm:p-8">
                <dt className="text-ink-muted order-2 text-[13px]">{stat.label}</dt>
                <dd className="text-ink order-1 text-[32px] leading-none font-medium tracking-[-0.04em] tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section aria-label="Case study">
          <Chapter label="Case study" summary={project.typeOfWork}>
            <dl className="divide-line divide-y">
              {story.map((part) => (
                <div key={part.label} className="grid gap-2 px-4 py-8 sm:px-10 md:grid-cols-[160px_1fr] md:gap-8">
                  <dt className="text-ink text-[14px] font-medium">{part.label}</dt>
                  <dd className="text-ink-muted max-w-[62ch] text-[15px] leading-relaxed">
                    <InlineText text={part.body} />
                  </dd>
                </div>
              ))}
              <div className="grid gap-3 px-4 py-8 sm:px-10 md:grid-cols-[160px_1fr] md:gap-8">
                <dt className="text-ink text-[14px] font-medium">Outcomes</dt>
                <dd>
                  <ul className="flex flex-col gap-2">
                    {project.results.map((result) => (
                      <li key={result} className="text-ink-2 flex gap-3 text-[14px] leading-relaxed">
                        <span className="bg-green mt-[8px] h-1.5 w-1.5 shrink-0" aria-hidden="true" />
                        <span>
                          <InlineText text={result} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="grid gap-3 px-4 py-8 sm:px-10 md:grid-cols-[160px_1fr] md:gap-8">
                <dt className="text-ink text-[14px] font-medium">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <TagBadgeUi key={tech}>{tech}</TagBadgeUi>
                  ))}
                </dd>
              </div>
            </dl>
          </Chapter>
        </Section>

        {project.gallery.length > 1 && (
          <Section aria-label="Gallery">
            <ul className="cells md:grid-cols-2">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <figure>
                    <div className="border-line relative aspect-16/10 w-full overflow-hidden border-b">
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
                    </div>
                    {image.caption && (
                      <figcaption className="text-ink-faint px-6 py-4 font-mono text-[11px]">{image.caption}</figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {relatedProjects.length > 0 && (
          <Section aria-label="More work">
            <ChapterHead eyebrow="More work" title={["Related projects."]} />
            <div className="dots border-line grid grid-cols-1 gap-6 border-t px-4 py-10 sm:px-10 md:grid-cols-2">
              {relatedProjects.map((related) => (
                <WorkCard key={related.id} project={related} />
              ))}
            </div>
          </Section>
        )}
      </article>
    </PageTransition>
  );
}
