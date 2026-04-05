import { type FormEvent, useEffect, useMemo, useState } from "react";
import { requestBattle } from "../api/battle.api";
import { type BattleResult, isBattleResult } from "./battle.types";
import ArenaComposer from "../components/arena/ArenaComposer";
import ArenaHistory from "../components/arena/ArenaHistory";
import ArenaResults from "../components/arena/ArenaResults";
import ArenaSkeleton from "../components/arena/ArenaSkeleton";

const STORAGE_KEY = "ai-battle-arena-history";

const createResult = async (prompt: string): Promise<BattleResult> => {
  const payload = await requestBattle(prompt);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    payload,
    createdAt: new Date().toISOString(),
  };
};

const formatTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }
  return date.toLocaleString();
};

const AiBattleArena = () => {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<BattleResult[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const sanitized = parsed.filter((item) => isBattleResult(item));
        setHistory(sanitized);
        setSelectedId(sanitized[0]?.id ?? null);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const selectedResult = useMemo(
    () => history.find((item) => item.id === selectedId) ?? null,
    [history, selectedId],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const result = await createResult(prompt);
      setHistory((prev) => [result, ...prev]);
      setSelectedId(result.id);
      setPrompt("");
    } catch {
      setSubmitError("Failed to fetch battle results. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    setSelectedId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="arena-layout">
      <ArenaHistory
        history={history}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onClear={handleClearHistory}
        formatTime={formatTime}
      />

      <main className="arena-main">
        <header className="arena-titlebar">
          <h1>Battle Arena</h1>
          <p>Compare two AI responses and let the judge decide.</p>
        </header>

        {isSubmitting ? <ArenaSkeleton /> : null}

        {!isSubmitting && selectedResult ? (
          <ArenaResults result={selectedResult} />
        ) : null}

        {!isSubmitting && !selectedResult ? (
          <p className="arena-empty-state">
            Enter a prompt below to start a battle with two solutions and judge
            scoring.
          </p>
        ) : null}

        {submitError ? (
          <p className="arena-error-state">{submitError}</p>
        ) : null}

        <ArenaComposer
          prompt={prompt}
          isSubmitting={isSubmitting}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default AiBattleArena;
