import fs from "fs";
import path from "path";

const WIKI_DIR = path.join(process.cwd(), "content/wiki");

export type WikiMeta = {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
};

export type WikiListItem = WikiMeta & {
  slug: string;
  tags: string[];
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
        tags: meta.tags ?? [],
      };
    })
  );

  return items.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return a.title.localeCompare(b.title);
  });
}

/**
 * 모든 글에 쓰인 태그를 모아 글 수와 함께 반환.
 * 글이 많은 태그가 먼저 오고, 같으면 가나다순.
 */
export async function getWikiTags(): Promise<{ tag: string; count: number }[]> {
  const list = await getWikiList();
  const counts = new Map<string, number>();

  for (const item of list) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
