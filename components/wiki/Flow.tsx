import { type ReactNode } from "react";

/* ─────────────────────────────────────────────
 * 위키 글에서 흐름을 시각화하는 컴포넌트 모음.
 * 다크 톤(#0a0a0a, white/xx 투명도)에 맞춰 디자인됨.
 * MDX의 prose 컨테이너 안에서도 깨지지 않도록
 * 각 컴포넌트는 not-prose 래퍼로 감쌈.
 * ───────────────────────────────────────────── */

/* not-prose 영역 안의 <code> 인라인 스타일.
   prose가 닿지 않으므로 직접 입혀 준다. */
const codeStyle =
  "[&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 " +
  "[&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-white/90 " +
  "[&_code]:whitespace-nowrap";

function wrap(children: ReactNode) {
  return <div className={`not-prose my-8 ${codeStyle}`}>{children}</div>;
}

/* ── Aside: 본문 흐름을 끊지 않는 작은 부연 설명/용어 메모 ── */

export function Aside({
  term,
  children,
}: {
  term?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`not-prose my-4 border-l-2 border-white/25 pl-3 text-xs leading-relaxed text-white/45 ${codeStyle}`}
    >
      {term && (
        <span className="mr-1 font-mono uppercase tracking-wider text-white/35">
          {term}
        </span>
      )}
      {children}
    </div>
  );
}

/* ── Steps: 번호가 매겨진 세로 타임라인 (내용은 항상 표시) ── */

type Step = {
  title: string;
  desc?: ReactNode;
  detail?: ReactNode;
};

export function Steps({ steps }: { steps: Step[] }) {
  return wrap(
    <ol className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <li key={i} className="relative pl-12">
          {/* 세로 연결선 */}
          {i < steps.length - 1 && (
            <span className="absolute left-[15px] top-8 bottom-0 w-px bg-white/25" />
          )}
          {/* 번호 원 */}
          <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#0a0a0a] font-mono text-xs text-white/60">
            {i + 1}
          </span>

          <div className="pb-6">
            <span className="text-lg font-medium text-white">
              {step.title}
            </span>
            {step.desc && (
              <p className="mt-1 text-sm leading-relaxed text-white/50">
                {step.desc}
              </p>
            )}
            {step.detail && (
              <div className="mt-3 rounded-lg border border-white/20 bg-white/[0.02] p-4 text-sm leading-relaxed text-white/70">
                {step.detail}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Sequence: 클라이언트↔서버 메시지 교환 다이어그램 ── */

type Message = {
  from: "left" | "right";
  label: string;
  note?: string;
};

export function Sequence({
  left = "Client",
  right = "Server",
  messages,
}: {
  left?: string;
  right?: string;
  messages: Message[];
}) {
  return wrap(
    <div className="rounded-xl border border-white/20 bg-white/[0.02] p-6">
      <div className="mb-4 flex justify-between font-mono text-xs uppercase tracking-widest text-white/40">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <div className="flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col">
            <div
              className={`flex items-center gap-2 ${
                m.from === "left" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <span
                className={`flex-1 border-t border-dashed border-white/30 ${
                  m.from === "left" ? "" : ""
                }`}
              />
              <span className="shrink-0 rounded-md border border-white/25 bg-[#0a0a0a] px-3 py-1.5 font-mono text-xs text-white/80">
                {m.from === "left" ? "→ " : "← "}
                {m.label}
              </span>
              <span className="flex-1 border-t border-dashed border-white/30" />
            </div>
            {m.note && (
              <p
                className={`mt-1 text-xs text-white/35 ${
                  m.from === "left" ? "text-left" : "text-right"
                }`}
              >
                {m.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Pipeline: 가로로 이어지는 단계 박스 (A → B → C) ── */

export function Pipeline({
  stages,
}: {
  stages: { label: string; sub?: string }[];
}) {
  return wrap(
    <div className="flex flex-wrap items-stretch gap-2">
      {stages.map((s, i) => (
        <div key={i} className="flex items-stretch gap-2">
          <div className="flex min-w-[110px] flex-col justify-center rounded-lg border border-white/25 bg-white/[0.03] px-4 py-3">
            <span className="text-sm font-medium text-white">{s.label}</span>
            {s.sub && (
              <span className="mt-0.5 font-mono text-[11px] text-white/40">
                {s.sub}
              </span>
            )}
          </div>
          {i < stages.length - 1 && (
            <span className="flex items-center text-white/25">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Callout: 강조/팁/주의 박스 ── */

const calloutStyles: Record<string, { border: string; tag: string; label: string }> = {
  info: { border: "border-sky-400/30", tag: "text-sky-300/80", label: "참고" },
  tip: { border: "border-emerald-400/30", tag: "text-emerald-300/80", label: "팁" },
  warn: { border: "border-amber-400/30", tag: "text-amber-300/80", label: "주의" },
  deep: { border: "border-violet-400/30", tag: "text-violet-300/80", label: "심화" },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warn" | "deep";
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[type] ?? calloutStyles.info;
  return (
    <div className={`not-prose my-6 rounded-lg border ${s.border} bg-white/[0.02] p-4 ${codeStyle}`}>
      <div className={`mb-2 font-mono text-xs uppercase tracking-widest ${s.tag}`}>
        {title ?? s.label}
      </div>
      <div className="text-sm leading-relaxed text-white/70 [&>p]:m-0 [&>p+p]:mt-2">
        {children}
      </div>
    </div>
  );
}

/* ── Compare: 두 항목 나란히 비교 (HTTP/1.1 vs HTTP/2 같은 것) ── */

export function Compare({
  items,
}: {
  items: { title: string; points: string[] }[];
}) {
  return wrap(
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-lg border border-white/20 bg-white/[0.02] p-4"
        >
          <div className="mb-3 font-mono text-sm font-medium text-white">
            {it.title}
          </div>
          <ul className="flex flex-col gap-2">
            {it.points.map((p, j) => (
              <li
                key={j}
                className="flex gap-2 text-sm leading-relaxed text-white/60"
              >
                <span className="text-white/25">·</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}