import Link from "next/link";
import { getWikiList, getWikiTags } from "@/lib/wiki";
import Nav from "@/components/Nav";

export default async function WikiPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParams;
  const [entries, tags] = await Promise.all([getWikiList(), getWikiTags()]);

  const filtered = activeTag
    ? entries.filter((e) => e.tags.includes(activeTag))
    : entries;

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Nav active="wiki" />

      <div className="max-w-5xl mx-auto w-full px-8 py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-white/60 mb-4">
          knowledge
        </p>
        <h1 className="text-6xl font-bold tracking-tight mb-10">Wiki</h1>

        {/* 태그 필터 바 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <Link
              href="/wiki"
              className={`rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                !activeTag
                  ? "border-white/60 bg-white/10 text-white"
                  : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
              }`}
            >
              전체
              <span className="ml-1.5 text-white/30">{entries.length}</span>
            </Link>
            {tags.map(({ tag, count }) => {
              const active = tag === activeTag;
              return (
                <Link
                  key={tag}
                  href={`/wiki?tag=${encodeURIComponent(tag)}`}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                    active
                      ? "border-white/60 bg-white/10 text-white"
                      : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  {tag}
                  <span className="ml-1.5 text-white/30">{count}</span>
                </Link>
              );
            })}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-white/30">
            {activeTag
              ? `'${activeTag}' 태그의 글이 아직 없어요.`
              : "아직 글이 없어요."}
          </p>
        ) : (
          <ul className="flex flex-col border-t border-white/40">
            {filtered.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/wiki/${entry.slug}`}
                  className="group flex items-center justify-between gap-4 py-6 border-b border-white/40 hover:bg-white/5 transition-colors px-2"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="text-xl font-light">{entry.title}</span>
                    {entry.description && (
                      <span className="text-sm text-white/30">
                        {entry.description}
                      </span>
                    )}
                    {entry.tags.length > 0 && (
                      <span className="flex flex-wrap gap-1.5 mt-1">
                        {entry.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[11px] text-white/40"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="text-white/20 group-hover:text-white/60 transition-colors">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
