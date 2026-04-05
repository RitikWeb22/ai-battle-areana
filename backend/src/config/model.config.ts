import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    gemini: process.env.GEMINI_API_KEY || '',
    mistral: process.env.MISTRAL_API_KEY || '',
    cohere: process.env.COHERE_API_KEY || '',
}

