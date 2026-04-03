import { useAi } from "../../hooks/useAi";

export const BattleSidebar = () => {
  const {
    battleHistory,
    selectedBattleId,
    selectBattle,
    isLoading,
    resetBattle,
    startNewBattle,
  } = useAi();

  return (
    <aside className="arena-sidebar rounded-2xl border border-white/10 p-4 shrink-0  flex flex-col hidden lg:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-cyan-200">Arena Battle</h1>
        <button
          type="button"
          onClick={startNewBattle}
          disabled={isLoading}
          className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + New
        </button>
      </div>
      <div className="flex flex-col flex-1 mt-5 min-h-0">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase shrink-0">
          Battle History
        </p>
        <div className="chat-scroll flex-1 space-y-2 overflow-y-auto pr-1">
          {battleHistory.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
              No rounds yet.
            </p>
          ) : (
            battleHistory.map((item) => {
              const isSelected =
                selectedBattleId === item.id ||
                (!selectedBattleId && battleHistory[0]?.id === item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectBattle(item.id)}
                  className={`history-pill w-full rounded-xl border p-3 text-left transition ${
                    isSelected
                      ? "border-cyan-300/50 bg-cyan-300/12"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="line-clamp-2 text-xs leading-5 text-slate-100">
                    {item.query}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-300 flex justify-between">
                    <span>Alpha: {item.result.judge.solution_1_score}</span>
                    <span>Omega: {item.result.judge.solution_2_score}</span>
                  </p>
                </button>
              );
            })
          )}
        </div>

        <button
          type="button"
          onClick={resetBattle}
          disabled={isLoading || battleHistory.length === 0}
          className="mt-4 shrink-0 w-full rounded-lg bg-cyan-300 px-3 py-2 text-xs font-bold tracking-wide text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Session
        </button>
      </div>
    </aside>
  );
};
