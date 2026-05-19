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
      <div className="flex items-center">
        <Link
          href="/wiki"
          className={`text-sm px-5 h-14 flex items-center border-l border-white/10 transition-colors ${
            active === "wiki"
              ? "text-white"
              : "text-white/40 hover:text-white"
          }`}
        >
          Wiki
        </Link>
        <Link
          href="/resume"
          className={`text-sm px-5 h-14 flex items-center border-l border-white/10 transition-colors ${
            active === "resume"
              ? "text-white"
              : "text-white/40 hover:text-white"
          }`}
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
