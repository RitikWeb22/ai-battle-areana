import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";
export const geminiModel = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: config.googleApiKey,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.mistralApiKey,
});

export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.cohereApiKey,
});
