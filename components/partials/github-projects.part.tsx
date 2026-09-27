import React from "react";
import { getGithubRepos } from "@/lib/github";
import { Section } from "@/components/shared/section.shared";
import { ChapterHead } from "@/components/shared/chapter.shared";
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

function RepoCell({ repo }: { repo: RepoItemType }) {
  return (
    <li>
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="project"
        data-cursor-text="View repo"
        className="group hover:bg-raised flex h-full flex-col gap-4 p-6 transition-colors sm:p-8"
      >
        <span className="flex items-start justify-between gap-3">
          <span className="text-ink truncate font-mono text-[14px]">{repo.name}</span>
          <Icons.ArrowUpRight className="text-ink-faint group-hover:text-ink h-3.5 w-3.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        <span className="text-ink-muted line-clamp-2 min-h-[2.6em] text-[13px] leading-relaxed">
          {repo.description || "No description provided."}
        </span>

        <span className="text-ink-faint mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px]">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: LANGUAGE_COLORS[repo.language] ?? "var(--color-ink-faint)",
                }}
                aria-hidden="true"
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 tabular-nums">
            <Icons.Star className="h-3 w-3" />
            {repo.stars}
          </span>
          <span className="font-mono text-[11px]">{formatRelativeTime(repo.updatedAt)}</span>
        </span>
      </a>
    </li>
  );
}

/**
 * GitHub — a server component. It fetches the profile's public repos from
 * the GitHub REST API (revalidated hourly), so this is currently shipping
 * code rather than curated case studies. Repos are cells sharing one edge;
 * a row the repos don't fill is closed with hatch, never an empty cell.
 * Renders nothing if the API is unreachable, rather than a broken section.
 */
export async function GithubProjectsPart() {
  const repos = await getGithubRepos(6);

  if (repos.length === 0) return null;

  const fillLarge = (3 - (repos.length % 3)) % 3;
  const fillSmall = repos.length % 2;

  return (
    <Section id="github">
      <ChapterHead
        eyebrow="Open source"
        title={["Code I actually ship.", "Straight from GitHub."]}
        action={
          <ArrowLink href={GITHUB_PROFILE_URL} external>
            View GitHub profile
          </ArrowLink>
        }
      />

      <ul className="cells border-line border-t sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <RepoCell key={repo.id} repo={repo} />
        ))}
        {Array.from({ length: fillLarge }, (_, index) => (
          <li key={`fill-lg-${index}`} className="hatch hidden lg:block" aria-hidden="true" />
        ))}
        {fillSmall > 0 && <li className="hatch hidden sm:block lg:hidden" aria-hidden="true" />}
      </ul>
    </Section>
  );
}
