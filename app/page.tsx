import Link from "next/link";
import Nav from "@/components/Nav";
import TypingText from "@/components/TypingText";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Nav />

      {/* Hero */}
      <section className="flex-1 flex items-center justify-between py-24 max-w-6xl mx-auto w-full">
        {/* Left */}
        <div className="-translate-y-6">
          <h1 className="text-8xl font-bold tracking-tight leading-none mb-1 -ml-1">
            <TypingText />
          </h1>
          <p className="text-white/80 text-lg font-mono tracking-widest uppercase mb-4">
            My Personal Site
          </p>
          <div className="flex flex-col gap-2 mb-12">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-mono px-3 py-1 border border-white/30 text-white/90">🤓 배재현</span>
              <span className="text-sm font-mono px-3 py-1 border border-white/30 text-white/90">🏫 광주소프트웨어마이스터고</span>
              <span className="text-sm font-mono px-3 py-1 border border-white/30 text-white/90">🔧 Backend Engineer</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-mono px-3 py-1 border border-orange-300/70 text-white/90">Java</span>
              <span className="text-sm font-mono px-3 py-1 border border-purple-400/70 text-white/90">Kotlin</span>
              <span className="text-sm font-mono px-3 py-1 border border-blue-400/70 text-white/70">Go</span>
              <span className="text-sm font-mono px-3 py-1 border border-cyan-600/70 text-white/70">MySQL</span>
              <span className="text-sm font-mono px-3 py-1 border border-blue-500/70 text-white/70">Docker</span>
              <span className="text-sm font-mono px-3 py-1 border border-orange-400/70 text-white/70">AWS</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/ZaMan0806"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono px-4 py-2 border border-white text-white hover:text-white/80 hover:border-white/60 transition-colors w-fit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5M19 5H9M19 5v10" />
              </svg>
            </a>
            <a
              href="mailto:roblery128@gmail.com"
              className="text-sm font-mono text-white hover:text-white/80 transition-colors"
            >
              Email | roblery128@gmail.com
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col border border-white/25">
          <Link
            href="/wiki"
            className="group flex items-center justify-between gap-40 px-8 py-8 border-b border-white/25 hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-sm font-mono tracking-widest uppercase text-white mb-1">
                AI가 작성한 글을 봐요
              </p>
              <p className="text-3xl font-light">AI Tech Wiki</p>
            </div>
            <span className="text-white/30 group-hover:text-white/70 transition-colors text-xl">
              →
            </span>
          </Link>

          <Link
            href="/resume"
            className="group flex items-center justify-between gap-60 px-8 py-8 hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-sm font-mono tracking-widest uppercase text-white mb-1">
                배재현은 누구일까요?
              </p>
              <p className="text-3xl font-light">Resume</p>
            </div>
            <span className="text-white/30 group-hover:text-white/70 transition-colors text-xl">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
