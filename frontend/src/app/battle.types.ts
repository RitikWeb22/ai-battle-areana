export type Judge = {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
};

export type BattlePayload = {
  problem: string;
  solution_1: string;
  solution_2: string;
  judge: Judge;
};

export type BattleResult = {
  id: string;
  payload: BattlePayload;
  createdAt: string;
};

export const isBattlePayload = (value: unknown): value is BattlePayload => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  const judge = payload.judge as Record<string, unknown> | undefined;

  return (
    typeof payload.problem === "string" &&
    typeof payload.solution_1 === "string" &&
    typeof payload.solution_2 === "string" &&
    !!judge &&
    typeof judge.solution_1_score === "number" &&
    typeof judge.solution_2_score === "number" &&
    typeof judge.solution_1_reasoning === "string" &&
    typeof judge.solution_2_reasoning === "string"
  );
};

export const isBattleResult = (value: unknown): value is BattleResult => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Record<string, unknown>;
  return (
    typeof result.id === "string" &&
    typeof result.createdAt === "string" &&
    isBattlePayload(result.payload)
  );
};
