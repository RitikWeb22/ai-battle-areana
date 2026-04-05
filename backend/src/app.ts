import express from "express";
import graphRun from "./ai/langgraph.langchain.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.resolve(__dirname, "../../public");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-battle-areana.onrender.com"],
    credentials: true,
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());
app.use(express.static(staticPath));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "everything is running smoothly" });
});

app.post("/graph", async (req, res) => {
  const problem = req.body?.problem;

  if (typeof problem !== "string" || !problem.trim()) {
    res.status(400).json({
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

app.get("*", (req, res) => {
  const indexPath = path.join(staticPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend build not found");
  }
});

export default app;
