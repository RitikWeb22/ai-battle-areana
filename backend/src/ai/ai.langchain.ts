import { ChatGoogle } from "@langchain/google"
import { ChatMistralAI } from '@langchain/mistralai'
import { ChatCohere } from "@langchain/cohere"
import { CONFIG } from '../config/model.config.js'

export const gemini = new ChatGoogle({
    model: 'gemini-flash-latest',
    apiKey: CONFIG.gemini
})

export const mistral = new ChatMistralAI({
    model: 'mistral-medium-latest',
    apiKey: CONFIG.mistral
})

export const cohere = new ChatCohere({
    model: 'command-a-03-2025',
    apiKey: CONFIG.cohere
})