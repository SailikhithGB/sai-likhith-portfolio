# Sai Likhith GB – Personal Portfolio + AI Assistant 🌐

Hi, I'm **Sai Likhith GB** — a 16-year-old self-taught full-stack developer from Bengaluru, India.

This repository contains my portfolio site plus a built-in AI Assistant you can try locally.

---

## Tech Stack

- React 18 + Vite + TypeScript
- TailwindCSS + shadcn/ui
- React Router
- Optional: OpenAI for LLM responses (browser fetch)

---

## Getting Started

1) Install

```bash
npm ci
```

2) Run Dev Server

```bash
npm run dev
```

Open http://localhost:8080 and navigate to `/assistant` or use the navbar link.

3) Build

```bash
npm run build
npm run preview
```

---

## AI Assistant

- Route: `/assistant`
- Features:
  - Chat UI with animated bubbles
  - Microphone input (Web Speech API) and TTS output
  - Memory stored per conversation (localStorage)
  - Skills: reminders, open URL, web search (opens a new tab), small talk
  - Optional LLM responses via OpenAI when configured

### Environment variables (optional)
Create a `.env` in the project root for browser env:

```bash
VITE_OPENAI_API_KEY=sk-...
# For existing contact form
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

If `VITE_OPENAI_API_KEY` is set and `llmProvider` is `openai`, the assistant uses OpenAI for more human-like replies when no strong skill is matched.

---

## Projects Highlighted

- ShopVerse – E-commerce platform built with MERN stack (Coming Soon)
- Custom Python Tools – CLI tools, automation scripts, and mini-apps

---

## Links

- Portfolio: https://sailikhithgb.lovable.app/
- GitHub: https://github.com/sailikhithking
- LinkedIn: https://www.linkedin.com/in/sai-likhith-g-b-180b332a4
- Instagram: https://www.instagram.com/sai_likhith_2009

> “The best way to learn is to build. I’m just getting started.” — Sai Likhith GB
