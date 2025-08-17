# Changelog

## 2025-08-17

- Added in-browser AI Assistant page (`src/pages/Assistant.tsx`) with chat UI, microphone input (Web Speech API), and TTS output
- Implemented assistant core modules:
  - Types (`src/assistant/types.ts`)
  - Persistent storage (`src/assistant/storage.ts`) using `localStorage`
  - Skills framework (`src/assistant/skills.ts`) with built-in skills: reminders, open URL, web search (via Google), and small talk
  - Agent (`src/assistant/agent.ts`) handling conversation flow and memory
  - Speech helpers (`src/assistant/speech.ts`) for STT/TTS with graceful fallbacks
- Wired routing and navigation: `/assistant` route and navbar link
- Added CTA in home page to try the assistant
- Added `src/env.d.ts` for typed environment variables
- Added simple assistant avatar asset `public/assistant-avatar.svg`
- Ensured TypeScript build passes and Vite production build works