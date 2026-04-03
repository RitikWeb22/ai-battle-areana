import express from "express";
import cors from "cors";
import graphResult from "../src/ai/graph.model.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.post("/graph", async (req, res) => {
  try {
    const { query } = req.body as { query?: string };

    if (!query || !query.trim()) {
      res.status(400).json({ message: "Query is required" });
      return;
    }

    const result = await graphResult(query.trim());
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while generating graph response:", error);
    res.status(500).json({ message: "Failed to generate graph response" });
  }
});

export default app;
