import fs from "fs";
import path from "path";

const WIKI_DIR = path.join(process.cwd(), "content/wiki");

export type WikiEntry = {
  slug: string;
  title: string;
  html: string;
};

export type WikiListItem = Omit<WikiEntry, "html">;

function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getWikiList(): WikiListItem[] {
  if (!fs.existsSync(WIKI_DIR)) return [];

  return fs
    .readdirSync(WIKI_DIR)
    .filter((file) => file.endsWith(".html"))
    .map((file) => {
      const slug = file.replace(/\.html$/, "");
      return { slug, title: slugToTitle(slug) };
    });
}

export function getWikiEntry(slug: string): WikiEntry | null {
  const filePath = path.join(WIKI_DIR, `${slug}.html`);
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, "utf-8");
  return { slug, title: slugToTitle(slug), html };
}