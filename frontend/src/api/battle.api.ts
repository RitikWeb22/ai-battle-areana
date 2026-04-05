import axios from "axios";
import { type BattlePayload, isBattlePayload } from "../app/battle.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const requestBattle = async (
  problem: string,
): Promise<BattlePayload> => {
  const response = await api.post("/graph", { problem });
  const data: unknown = response.data;

  if (!isBattlePayload(data)) {
    throw new Error("Unexpected API response format");
  }

  return data;
};
