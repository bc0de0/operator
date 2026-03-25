# Contributing to Operator

First off, thank you for considering contributing to Operator! The goal of this project is to create the ultimate lightweight, anti-chatbot execution engine for creatives and makers.

## How You Can Help

There are many ways to contribute:

### 1. Add New Skills (The Easiest Way to Help!)

Operator is powerful because of its modular skill system. You don't even need to know how to code to contribute a new skill!

- Go to the `/skills` folder.
- Create or duplicate a `.json` file and tweak it for a new operational workflow.
- Ensure the JSON schema is valid and the `promptTemplate` explicitly asks the LLM for a **structured JSON return object** without markdown wrapping.
- Submit a Pull Request!

### 2. Improve the Core Engine

If you're comfortable with Node.js, HTML, CSS, and Vanilla JS, you can help improve the core Electron app:

- **Local Models:** Add native `fetch` support for local inference engines like Ollama or LM Studio natively alongside OpenAI and Claude.
- **UI Enhancements:** Improve the parsing engine in `renderer.js` to dynamically handle more complex JSON outputs (like rendering nested markdown or tables).
- **Security & IPC:** Help audit or strengthen the context bridge and isolated preload scripts.

## Pull Request Process

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature` or `git checkout -b skill/NewWorkflow`.
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`.
4. Push to the branch: `git push origin feature/AmazingFeature` or `skill/NewWorkflow`.
5. Open a Pull Request!

## Environment Setup

See the `README.md` for instructions on how to set up the `.env` variables and run the `npm start` execution environment locally before testing your changes.

Thanks for helping us build the anti-chatbot!
