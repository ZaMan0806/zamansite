import Nav from "@/components/Nav";

export default function ResumePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Nav active="resume" />

      <div className="max-w-3xl mx-auto w-full px-8 py-16">
        <p className="font-mono text-xs tracking-widest uppercase text-white/30 mb-4">
          about
        </p>
        <h1 className="text-6xl font-bold tracking-tight mb-16">Resume</h1>

        <p className="text-white/30">준비 중이에요.</p>
      </div>
    </main>
  );
}