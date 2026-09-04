# React + Vite

## Local AI summaries

The family impact page can generate a concise French summary with a local Ollama model. This does not require a paid API key.

1. Install Ollama from https://ollama.com/download.
2. Download and start the configured model:

```powershell
ollama run qwen2.5:3b
```

3. Start the Spring Boot backend from `backend` and the Vite frontend from the project root.
4. Open a family record and select **Generer avec IA**.

The backend endpoint is `POST /api/ai/impact-summary`. It uses `http://localhost:11434/v1` and `qwen2.5:3b` by default. These settings can be overridden with `OPENAI_BASE_URL` and `OPENAI_MODEL`; `OPENAI_API_KEY` is optional for compatible hosted providers.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
