# ⚙️ Operator

> **The lightweight, AI-agnostic desktop tool for structured execution.**

**Operator** isn't another open-ended AI chatbot. It's an execution engine for founders, marketers, and operators who need structured, predictable output from LLMs. By defining decision workflows as simple local JSON files ("Skills"), Operator transforms sprawling AI conversations into a clean, one-click, forms-based desktop application.

No subscriptions. No cloud databases. Just your API keys and your workflows, running blazingly fast on your local machine.

---

## ✨ Why this exists (The Philosophy)

Most professionals waste hours engineering prompts every time they need to make a decision or draft copy. Chatbots are great for brainstorming, but terrible for repeatable, structured workflows.

Operator solves this by turning **prompts into software**.

Whether you're a founder auditing a new market (Startup Evaluation), or a marketer generating a positioning framework (Brand Architect), Operator forces models like **OpenAI** and **Claude** to output strictly formatted, actionable data. It acts as a local operating system for your best mental models.

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
