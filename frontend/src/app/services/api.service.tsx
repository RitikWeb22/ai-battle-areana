import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export type JudgeResult = {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
};

export type BattleResult = {
  problem: string;
  solution_1: string;
  solution_2: string;
  judge: JudgeResult;
};

export const getGraphResult = async (query: string) => {
  try {
    const response = await api.post<BattleResult>("/graph", { query });
    return response.data;
  } catch (error) {
    console.error("Error fetching graph result:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Could not fetch AI battle result. Please try again.",
      );
    }

    throw new Error("Unexpected error while fetching AI battle result.");
  }
};
