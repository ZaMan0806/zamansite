import { getWikiEntry, getWikiList } from "@/lib/wiki";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";

export function generateStaticParams() {
  return getWikiList().map((entry) => ({ slug: entry.slug }));
}

export default async function WikiEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWikiEntry(slug);

  if (!entry) notFound();

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Nav active="wiki" />

      <div className="max-w-3xl mx-auto w-full px-8 py-16">
        <Link
          href="/wiki"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors mb-12"
        >
          ← wiki
        </Link>

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </div>
    </main>
  );
}
