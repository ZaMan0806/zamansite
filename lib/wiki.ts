import fs from "fs";
import path from "path";

const WIKI_DIR = path.join(process.cwd(), "content/wiki");

export type WikiMeta = {
  title: string;
  date?: string;
  description?: string;
};

export type WikiListItem = WikiMeta & {
  slug: string;
};

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** content/wiki 안의 .mdx 파일 slug 목록 */
export function getWikiSlugs(): string[] {
  if (!fs.existsSync(WIKI_DIR)) return [];

  return fs
    .readdirSync(WIKI_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * 모든 글의 메타데이터를 모아 목록 생성.
 * 각 .mdx 파일은 `export const metadata = { title, date?, description? }` 를 내보냄.
 * date가 있으면 최신순 정렬.
 */
export async function getWikiList(): Promise<WikiListItem[]> {
  const slugs = getWikiSlugs();

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/wiki/${slug}.mdx`);
      const meta: WikiMeta = mod.metadata ?? {};
      return {
        slug,
        title: meta.title ?? slugToTitle(slug),
        date: meta.date,
        description: meta.description,
      };
    })
  );

  return items.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return a.title.localeCompare(b.title);
  });
}
