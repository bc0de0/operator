# ⚙️ Operator

> **The Anti-Chatbot for Creatives & Makers.**

**Operator** isn't another open-ended AI wrapper. It's a deterministic execution engine for people who are exhausted by noisy chatbots, black-box autonomous agents, and massive enterprise subscriptions. By defining decision workflows as simple local JSON files ("Skills"), Operator transforms sprawling AI conversations into clean, one-click, offline-first native applications.

No subscriptions. No cloud databases. Just your API keys and your workflows, running blazingly fast on your local machine.

---

## ✨ The Philosophy (Why we built this)

There is serious AI fatigue right now. The industry is flooded with overly complex autonomous agents that act as "black-boxes," or conversational UIs that require you to endlessly re-engineer prompts. Creatives and founders hate this because it destroys their agency. You don't want AI to do all your work for you in the background—you want to push a button to unblock a structured thought process and get back in the flow.

Operator solves this by turning **prompts into software**.

Instead of staring at a blank chat interface, you load Operator. You pick a "Skill" (like *The Angle Matrix* or *Startup Evaluator*), fill out a structured form, and get **deterministic, flawlessly formatted data** back. Operator is an opinionated, unbundled tool for people who want to stay Pilots of their own work.

## 🚀 Core Features

- **Local-First & Private:** Runs entirely on your machine. No backend, no databases, no tracking.
- **AI-Agnostic:** Seamlessly switch between OpenAI (GPT-4o) and Anthropic (Sonnet 3.5) models with a single dropdown.
- **BYOK (Bring Your Own Keys):** Powered by your environment variables. No recurring SaaS fees, just pay-per-api-call directly to the providers.
- **Extensible Skill System:** Create entirely new AI workflows by simply adding a `.json` file to the `/skills` folder. The UI automatically generates the form dynamically.
- **Structured Output Engine:** Forces LLMs to output clean, readable, copy-pasteable JSON formats translated directly into native desktop UI elements.

## 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bc0de0/operator.git
   cd operator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure your API keys:**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   Open `.env` and add your API keys:

   ```env
   OPENAI_API_KEY=sk_your_openai_key_here
   ANTHROPIC_API_KEY=sk_your_anthropic_key_here
   ```

4. **Launch the app:**

   ```bash
   npm start
   ```

## 🧠 Building Your Own Skills

Operator's true superpower is its modular skill system. You can add infinite use-cases without touching a single line of user interface code.

Just create a new JSON file (e.g., `copywriter.json`) in the `/skills` directory:

```json
{
  "id": "landing-page-copy",
  "name": "Landing Page Copywriter",
  "description": "Generate high-converting hero sections.",
  "inputs": [
    {
      "id": "product",
      "label": "Product Description",
      "type": "textarea",
      "placeholder": "What does your product do?"
    }
  ],
  "promptTemplate": "You are a world-class copywriter representing this product: {{product}}. Output ONLY a valid JSON object with keys like 'Hero Headline', 'Subheadline', and 'Bullet Points' (as an array)."
}
```

*The app will automatically parse this file, build a native input form, handle the data injection, query the active LLM, and render the output dynamically into native UI components.*

## 🛠️ Tech Stack

- **Electron** (Node.js + Chromium)
- **Vanilla JS, HTML, CSS** (Zero bloated frameworks)
- Context-isolated IPC architecture for maximum security

## 🤝 Contributing

Pull requests are welcome! If you'd like to add support for more local models (like Ollama or Llama.cpp) or create new default skills, feel free to open a PR.

## 📄 License

MIT License
