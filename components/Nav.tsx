import Link from "next/link";

type NavProps = {
  active?: "wiki" | "resume";
};

export default function Nav({ active }: NavProps) {
  return (
    <nav className="h-14 flex items-center justify-between px-8 border-b border-white/10">
      <Link
        href="/"
        className="text-sm font-mono tracking-widest uppercase text-white/80 hover:text-white transition-colors"
      >
        ZaMan&apos;s SITE
      </Link>
    </nav>
  );
}
