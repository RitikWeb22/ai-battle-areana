interface JudgeCardProps {
  score1: number;
  score2: number;
  reasoning1: string;
  reasoning2: string;
  recommendation: string | null;
}

export const JudgeCard = ({
  score1,
  score2,
  reasoning1,
  reasoning2,
  recommendation,
}: JudgeCardProps) => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-xl font-bold tracking-wide text-slate-100 uppercase">
          Judge Recommendation
        </h2>
        <p className="text-[10px] tracking-[0.2em] text-cyan-200/80 uppercase">
          Neural Arbiter v2.1
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <article className="arena-card p-5">
          <p className="text-xs font-semibold tracking-wide text-cyan-100 uppercase">
            Alpha Score
          </p>
          <div className="mt-2.5 h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000"
              style={{
                width: `${Math.min(score1 * 10, 100)}%`,
              }}
            />
          </div>

          <p className="mt-6 text-xs font-semibold tracking-wide text-fuchsia-100 uppercase">
            Omega Score
          </p>
          <div className="mt-2.5 h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.5)] transition-all duration-1000"
              style={{
                width: `${Math.min(score2 * 10, 100)}%`,
              }}
            />
          </div>

          <p className="mt-6 rounded-xl border border-cyan-300/20 bg-cyan-300/8 px-4 py-3 text-sm font-medium leading-relaxed text-cyan-50">
            {recommendation}
          </p>
        </article>

        <article className="arena-card p-5">
          <p className="text-[10px] tracking-[0.2em] text-slate-400 uppercase">
            Analysis Reasoning
          </p>
          <div className="mt-4 space-y-5 text-sm leading-relaxed text-slate-200">
            <p>
              <span className="font-semibold text-cyan-300 mr-2 uppercase tracking-wide text-xs">
                Alpha:
              </span>
              <span className="opacity-90">{reasoning1}</span>
            </p>
            <p>
              <span className="font-semibold text-fuchsia-300 mr-2 uppercase tracking-wide text-xs">
                Omega:
              </span>
              <span className="opacity-90">{reasoning2}</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
