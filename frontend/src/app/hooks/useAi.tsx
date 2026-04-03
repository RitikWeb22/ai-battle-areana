import { useContext } from "react";
import { AiContext } from "../context/ai.context";

export const useAi = () => {
  const context = useContext(AiContext);

  if (!context) {
    throw new Error("useAi must be used inside AiProvider");
  }

  return context;
};
