import type { RepoItemType } from "@/types";

const GITHUB_USERNAME = "soufiyanbenallal";

type GithubRepoResponseType = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics: string[];
  fork: boolean;
  private: boolean;
  archived: boolean;
};

/**
 * Fetches public repos for the profile GitHub account, ranked by stars then
 * recency. The unauthenticated REST API can't surface "pinned" repos (that
 * needs GraphQL + a token), so this is the closest honest approximation.
 */
export async function getGithubRepos(limit = 6): Promise<RepoItemType[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const repos = (await res.json()) as GithubRepoResponseType[];

    return repos
      .filter((repo) => !repo.fork && !repo.private && !repo.archived)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      })
      .slice(0, limit)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.pushed_at,
        topics: repo.topics ?? [],
      }));
  } catch {
    return [];
  }
}
