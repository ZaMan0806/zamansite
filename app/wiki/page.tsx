import Link from "next/link";
import { getWikiList } from "@/lib/wiki";
import Nav from "@/components/Nav";

export default async function WikiPage() {
  const entries = await getWikiList();

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Nav active="wiki" />

      <div className="max-w-5xl mx-auto w-full px-8 py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-white/60 mb-4">
          knowledge
        </p>
        <h1 className="text-6xl font-bold tracking-tight mb-16">Wiki</h1>

        {entries.length === 0 ? (
          <p className="text-white/30">아직 글이 없어요.</p>
        ) : (
          <ul className="flex flex-col border-t border-white/40">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/wiki/${entry.slug}`}
                  className="group flex items-center justify-between py-6 border-b border-white/40 hover:bg-white/5 transition-colors px-2"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-xl font-light">{entry.title}</span>
                    {entry.description && (
                      <span className="text-sm text-white/30">
                        {entry.description}
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