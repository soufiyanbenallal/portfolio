import React from "react";
import { getGithubRepos } from "@/lib/github";
import { Container } from "@/components/shared/container.shared";
import { Stagger, StaggerItem } from "@/components/motion/reveal.motion";
import { SectionHeading } from "@/components/shared/section-heading.shared";
import { ArrowLink } from "@/components/ui/arrow-link.ui";
import { Icons } from "@/components/ui/social-icons.ui";
import type { RepoItemType } from "@/types";

const GITHUB_PROFILE_URL = "https://github.com/soufiyanbenallal";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Shell: "#89e051",
  Blade: "#f7523f",
  Ruby: "#701516",
  Go: "#00ADD8",
  Java: "#b07219",
  Dart: "#00B4AB",
  Rust: "#dea584",
  Liquid: "#67b8de",
};

function formatRelativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 30) return `Updated ${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `Updated ${diffMonths}mo ago`;
  return `Updated ${Math.floor(diffMonths / 12)}y ago`;
}

function RepoCard({ repo }: { repo: RepoItemType }) {
  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="project"
      data-cursor-text="View repo"
      className="surface-card hover:card-shadow-hover group flex h-full flex-col gap-4 p-6 transition-[box-shadow,translate] duration-300 ease-entrance hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="group-hover:text-gray-60 truncate font-mono text-[15px] font-medium tracking-tight text-black transition-colors">
          {repo.name}
        </span>
        <span className="border-gray-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
          <Icons.ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <p className="text-gray-60 line-clamp-2 min-h-[2.5em] text-[13px] leading-relaxed">
        {repo.description || "No description provided."}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-50">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "var(--color-gray-50)" }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Icons.Star className="h-3.5 w-3.5" />
          {repo.stars}
        </span>
        <span className="font-mono">{formatRelativeTime(repo.updatedAt)}</span>
      </div>
    </a>
  );
}

/**
 * GitHub projects.
 *
 * A server component — it fetches the profile's public repos directly from
 * the GitHub REST API at request time (revalidated hourly), so this is real,
 * currently-shipping code rather than curated case studies. Renders nothing
 * if the API is unreachable or rate-limited rather than showing a broken
 * section.
 */
export async function GithubProjectsPart() {
  const repos = await getGithubRepos(6);

  if (repos.length === 0) return null;

  return (
    <div className="w-full">
      <Container className="gap-stack py-section flex flex-col">
        <SectionHeading
          eyebrow="Open source"
          title="Code I actually ship."
          action={
            <ArrowLink href={GITHUB_PROFILE_URL} external>
              View GitHub profile
            </ArrowLink>
          }
        />

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {repos.map((repo) => (
            <StaggerItem key={repo.id} preset="fadeUp">
              <RepoCard repo={repo} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </div>
  );
}
