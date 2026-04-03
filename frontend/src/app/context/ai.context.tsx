import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getGraphResult, type BattleResult } from "../services/api.service";

export type BattleHistoryItem = {
  id: string;
  query: string;
  createdAt: number;
  result: BattleResult;
};

type AiContextValue = {
  battleResult: BattleResult | null;
  battleHistory: BattleHistoryItem[];
  selectedBattleId: string | null;
  isLoading: boolean;
  error: string | null;
  askQuestion: (query: string) => Promise<void>;
  selectBattle: (battleId: string) => void;
  startNewBattle: () => void;
  resetBattle: () => void;
};

export const AiContext = createContext<AiContextValue | undefined>(undefined);

const LOCAL_STORAGE_HISTORY_KEY = "battle_arena_history";
const LOCAL_STORAGE_SELECTED_ID_KEY = "battle_arena_selected_id";

export const AiProvider = ({ children }: { children: React.ReactNode }) => {
  const [battleHistory, setBattleHistory] = useState<BattleHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse battle history from localStorage", e);
    }
    return [];
  });
  
  const [selectedBattleId, setSelectedBattleId] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_STORAGE_SELECTED_ID_KEY) || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(battleHistory));
      if (selectedBattleId) {
        localStorage.setItem(LOCAL_STORAGE_SELECTED_ID_KEY, selectedBattleId);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_SELECTED_ID_KEY);
      }
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [battleHistory, selectedBattleId]);

  const askQuestion = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getGraphResult(query);
      const battleId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const historyItem: BattleHistoryItem = {
        id: battleId,
        query,
        createdAt: Date.now(),
        result,
      };

      setBattleHistory((prev) => [historyItem, ...prev]);
      setSelectedBattleId(battleId);
    } catch (requestError) {
      if (requestError instanceof Error) {
        setError(requestError.message);
      } else {
        setError("Unable to get a response right now. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectBattle = useCallback((battleId: string) => {
    setSelectedBattleId(battleId);
  }, []);

  const startNewBattle = useCallback(() => {
    setSelectedBattleId("NEW");
  }, []);

  const resetBattle = useCallback(() => {
    setBattleHistory([]);
    setSelectedBattleId(null);
    setError(null);
  }, []);

  const battleResult = useMemo(() => {
    if (selectedBattleId === "NEW") return null;
    if (!selectedBattleId) {
      return battleHistory[0]?.result ?? null;
    }

    return (
      battleHistory.find((item) => item.id === selectedBattleId)?.result ?? null
    );
  }, [battleHistory, selectedBattleId]);

  const value = useMemo(
    () => ({
      battleResult,
      battleHistory,
      selectedBattleId,
      isLoading,
      error,
      askQuestion,
      selectBattle,
      startNewBattle,
      resetBattle,
    }),
    [
      battleResult,
      battleHistory,
      selectedBattleId,
      isLoading,
      error,
      askQuestion,
      selectBattle,
      startNewBattle,
      resetBattle,
    ],
  );

  return <AiContext.Provider value={value}>{children}</AiContext.Provider>;
};
