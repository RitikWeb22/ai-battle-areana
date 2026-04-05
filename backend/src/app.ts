import express from "express";
import graphRun from "./ai/langgraph.langchain.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "everything is running smoothly" });
});

app.post("/graph", async (req, res) => {
  const problem = req.body?.problem;

  if (typeof problem !== "string" || !problem.trim()) {
    res
      .status(400)
      .json({
        error: "Invalid request body. 'problem' must be a non-empty string.",
      });
    return;
  }

  try {
    const result = await graphRun(problem.trim());
    res.status(200).json(result);
  } catch (error) {
    console.error("/graph route failed:", error);
    res.status(500).json({ error: "Failed to generate battle results." });
  }
});

export default app;
