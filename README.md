# LangGraph Battle Arena

A modern AI comparison app where two model-generated solutions compete and a judge model scores both responses.

The project includes:

- A React + Vite frontend with a dark, battle-style interface
- An Express + LangGraph backend orchestration pipeline
- Markdown rendering with syntax highlighting for rich AI output
- Local history persistence in the browser

## Demo Concept

User prompt -> Solution Model A + Solution Model B -> Judge scoring -> Battle UI

## Features

- Dual-solution generation for the same user problem
- Judge scoring (`solution_1_score`, `solution_2_score`) with reasoning
- Real backend integration (`POST /graph`)
- LocalStorage history panel
- Loading skeleton animations while waiting for results
- Markdown rendering + code highlighting (`react-markdown` + `highlight.js`)
- Copy button for markdown blocks

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Sass
- Axios
- React Markdown
- Highlight.js

### Backend

- Node.js + Express 5
- TypeScript
- LangGraph / LangChain
- Zod
- Cohere, Mistral, Gemini providers

## Project Structure

```text
langgraph-battle-arena/
  backend/
    src/
      ai/
      config/
      app.ts
    server.ts
  frontend/
    src/
      api/
      app/
      components/arena/
```

## API Contract

### Endpoint

`POST /graph`

### Request

```json
{
  "problem": "what is the capital of France?"
}
```

### Response (shape)

```json
{
  "problem": "what is the capital of France?",
  "solution_1": "...",
  "solution_2": "...",
  "judge": {
    "solution_1_score": 9,
    "solution_2_score": 10,
    "solution_1_reasoning": "...",
    "solution_2_reasoning": "..."
  }
}
```

## Quick Start

## 1) Clone and install

```bash
git clone <your-repo-url>
cd langgraph-battle-arena

cd backend
npm install

cd ../frontend
npm install
```

## 2) Configure backend environment

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_key
MISTRAL_API_KEY=your_mistral_key
COHERE_API_KEY=your_cohere_key
```

## 3) Run backend

```bash
cd backend
npm run dev
```

Backend default URL: `http://localhost:3000`

## 4) Run frontend

```bash
cd frontend
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Frontend API Base URL

Frontend uses:

- `VITE_API_BASE_URL` if provided
- fallback: `http://localhost:3000`

Optional `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## How It Works

1. User submits a problem in the frontend.
2. Frontend sends `POST /graph` to backend.
3. LangGraph runs:
   - `solutionNode`: Mistral + Cohere generate responses in parallel
   - `judgeNode`: Gemini evaluates both and returns scores/reasoning
4. Backend returns a single structured JSON payload.
5. Frontend renders battle cards, judge recommendation, and stores result in history.

## Scripts

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Roadmap

- Add streaming token-by-token response rendering
- Add per-history delete action
- Add export/share for battle sessions
- Add tests for API contract and UI states

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

## License

ISC
