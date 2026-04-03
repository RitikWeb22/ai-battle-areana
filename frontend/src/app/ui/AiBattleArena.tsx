import { useMemo, useEffect, useRef } from "react";
import { useAi } from "../hooks/useAi";
import { BattleSidebar } from "./components/BattleSidebar";
import { ChatComposer } from "./components/ChatComposer";
import { ModelCard } from "./components/ModelCard";
import { JudgeCard } from "./components/JudgeCard";

const AiBattleArena = () => {
  const { battleHistory, selectedBattleId, isLoading, error } = useAi();
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeBattle = useMemo(() => {
    if (selectedBattleId) {
      return battleHistory.find((item) => item.id === selectedBattleId) ?? null;
    }
    return battleHistory[0] ?? null;
  }, [battleHistory, selectedBattleId]);

  const recommendation = useMemo(() => {
    if (!activeBattle) {
      return null;
    }
    const { solution_1_score, solution_2_score } = activeBattle.result.judge;
    if (solution_1_score === solution_2_score) {
      return "It's a tie. Both solutions are recommended for different strengths.";
    }
    return solution_1_score > solution_2_score
      ? "Judge recommendation: Model Alpha wins this round."
      : "Judge recommendation: Model Omega wins this round.";
  }, [activeBattle]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
        });
    }
  }, [activeBattle, isLoading]);

  return (
    <main className="arena-shell min-h-screen p-3 text-slate-100 md:p-4 flex flex-col md:flex-row">
      <section className="arena-grid mx-auto w-full max-w-[1500px] gap-4 rounded-2xl flex flex-1 h-[calc(100vh-2rem)]">
        <BattleSidebar />

        <section className="arena-main flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 relative overflow-hidden bg-[#0A0D14]/80 backdrop-blur-md shadow-2xl">
          <header className="border-b border-white/5 bg-[#0A0D14]/90 px-6 py-4 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between">
            <h2 className="text-sm font-bold text-cyan-100 uppercase tracking-[0.2em] lg:hidden">
              AI Battle Arena
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 ml-auto">
              <span className="h-2 w-2 rounded-full border border-white/20 bg-white/5" />
              <span className="h-2 w-2 rounded-full border border-white/20 bg-white/5" />
              <span className="h-2 w-2 rounded-full border border-white/20 bg-white/5" />
            </div>
          </header>

          <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
            <div className="conversation-stack min-h-full gap-6 md:gap-8 max-w-5xl mx-auto pb-4">
              {activeBattle ? (
                <>
                  <article className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-6 py-5 backdrop-blur-sm">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-200/60 uppercase mb-3">
                      User Prompt
                    </p>
                    <p className="text-lg leading-relaxed text-slate-100 font-medium">
                      "{activeBattle.query}"
                    </p>
                  </article>

                  <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] xl:items-stretch">
                    <ModelCard
                      title="Prototype 01"
                      modelName="Model Alpha"
                      solutionText={activeBattle.result.solution_1}
                      score={activeBattle.result.judge.solution_1_score}
                      sampling="Greedy"
                      accent="cyan"
                    />

                    <div className="hidden items-center justify-center xl:flex py-8">
                      <div className="h-full w-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                    </div>

                    <ModelCard
                      title="Prototype 02"
                      modelName="Model Omega"
                      solutionText={activeBattle.result.solution_2}
                      score={activeBattle.result.judge.solution_2_score}
                      sampling="Nucleus"
                      accent="fuchsia"
                    />
                  </div>

                  <JudgeCard
                    score1={activeBattle.result.judge.solution_1_score}
                    score2={activeBattle.result.judge.solution_2_score}
                    reasoning1={activeBattle.result.judge.solution_1_reasoning}
                    reasoning2={activeBattle.result.judge.solution_2_reasoning}
                    recommendation={recommendation}
                  />
                </>
              ) : null}

              {!activeBattle && !isLoading && (
                <div className="flex h-full flex-col items-center justify-center pt-[15vh] text-center opacity-60">
                  <div className="mb-6 h-16 w-16 rounded-2xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-center rotate-3 relative shadow-lg">
                    <svg className="w-8 h-8 text-cyan-400/80 -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-200 mb-3 tracking-wide">Ready to Battle</h3>
                  <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
                    Submit a prompt below to see side-by-side model outputs and detailed judge analysis.
                  </p>
                </div>
              )}

              {isLoading && (
                <section className="space-y-6 animate-pulse mt-4">
                  <div className="grid gap-6 xl:grid-cols-2">
                    <article className="arena-card p-6 bg-slate-900/30 border-slate-800/50">
                      <div className="h-3 w-20 rounded bg-slate-800 mb-3" />
                      <div className="h-6 w-36 rounded bg-slate-700/80 mb-6" />
                      <div className="mt-3 space-y-3">
                        <div className="h-3 w-full rounded bg-slate-800/60" />
                        <div className="h-3 w-[92%] rounded bg-slate-800/60" />
                        <div className="h-3 w-[86%] rounded bg-slate-800/60" />
                        <div className="h-3 w-[96%] rounded bg-slate-800/60" />
                      </div>
                    </article>
                    <article className="arena-card p-6 bg-slate-900/30 border-slate-800/50">
                      <div className="h-3 w-20 rounded bg-slate-800 mb-3" />
                      <div className="h-6 w-36 rounded bg-slate-700/80 mb-6" />
                      <div className="mt-3 space-y-3">
                        <div className="h-3 w-full rounded bg-slate-800/60" />
                        <div className="h-3 w-[90%] rounded bg-slate-800/60" />
                        <div className="h-3 w-[82%] rounded bg-slate-800/60" />
                        <div className="h-3 w-[95%] rounded bg-slate-800/60" />
                      </div>
                    </article>
                  </div>
                </section>
              )}

              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-300 flex items-start gap-3 mt-4">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}
            </div>
          </div>

          <ChatComposer />
        </section>
      </section>
    </main>
  );
};

export default AiBattleArena;
