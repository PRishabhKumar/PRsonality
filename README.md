# PRsonality — AI Code Reviewer with an Attitude

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**PRsonality** is a premium, AI-powered codebase auditor that doesn't just review your code—it analyzes it with character. By blending high-performance AI reasoning with high-fidelity UI design, PRsonality provides deep technical insights through distinct professional personas.

<br />

<div align="center">

<a href="https://prsonality.vercel.app/">
  <img src="https://img.shields.io/badge/EXPERIENCE-PRSONALITY-06B6D4?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000" alt="Live Demo" height="45" />
</a>

</div>

<br />

[Problem & Solution](#-the-core-challenge) • [Features](#-key-features) • [AI Personas](#-strategic-ai-personas) • [Installation](#-getting-started) • [Technical Deep Dive](#-technical-deep-dive)

</div>

---

## 🌩️ The Core Challenge: Why PRsonality?

Manual code reviews are vital but suffer from three chronic friction points:

1.  **Subjectivity & Bias**: Different engineers focus on different things, often missing the "big picture" or getting bogged down in style nitpicks.
2.  **The "Where" Lag**: Identifying _that_ an error exists is easy; tracing it back to the exact line in a complex directory structure is time-consuming.
3.  **The Context Deficit**: Standard AI reviewers often treat code as isolated snippets, failing to understand the architecture or the "personality" of the project.

### 💡 The PRsonality Solution

PRsonality solves this by treating your repository as a living organism. Using our **"Mental Cloning"** technology, it selectively ingests core files to build a holistic understanding. When it finds a flaw, it doesn't just tell you—it **Traces Error Locations** with surgical precision and **Generates Implementation Plans** (Fix Prompts) that account for your project's specific context.

---

## ✨ Key Features

### 🕵️‍♂️ Intelligence Layer

- **"Mental Cloning" Fetching**: A prioritized selector that extracts the most critical files (README, configs, core source) to build a dense context for AI analysis.
- **Trace Error Location**: Real-time identification of specific files and line numbers where issues reside, including snippets and detailed context.
- **AI-Powered Solutions**: Generates structured implementation plans and corrective prompts to fix identified issues instantly.

### 🎨 Visual Excellence

- **Aurora Background**: Fluid, animated gradient orbs with noise texture overlays for a premium aesthetic.
- **Glassmorphism UI**: High-contrast, translucent components with sophisticated backdrop blurring.
- **Interactive HUD**: System-style overview dashboards and diagnostic feeds.

---

## 🎭 Strategic AI Personas

Choosing the right reviewer is half the battle. PRsonality offers three distinct minds tailored for different stages of the development lifecycle.

| Persona                         | Philosophy                                        | Ideal For                                                                                        | Avoid If...                                                                     |
| :------------------------------ | :------------------------------------------------ | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 👩‍💻 **Kind Senior Engineer**     | Mentorship and long-term growth.                  | **Learning phases**, junior devs, or when you need gentle guidance on best practices.            | You're hours away from a critical production launch and need a "hard truth."    |
| 😈 **Brutally Honest Reviewer** | Efficiency and production-readiness at all costs. | **Pre-merge audits**, mission-critical systems, or when you suspect technical debt is hiding.    | You are having a bad day or just looking for a pat on the back.                 |
| 🚀 **Startup CTO**              | Velocity, scalability, and business impact.       | **Prototype phases**, rapidly scaling apps, or when you need to decide if to "refactor or ship." | You are building a safety-critical medical device (CTOs take calculated risks). |

---

## 🏎️ Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/PRishabhKumar/PRsonality.git
   cd PRsonality
   ```

2. **Configure Environment**
   Create a `.env` file in the **root** directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

3. **Setup Backend**
   ```bash
   cd Backend
   npm install
   npm start
   ```

4. **Setup Frontend (New Terminal)**
   ```bash
   # From the root directory
   npm install
   npm run dev
   ```

---

## 🔬 Technical Deep Dive

### 🏗️ Architecture: The Hybrid Core
PRsonality uses a decoupled architecture to separate intense AI processing from the high-fidelity UI:
- **Frontend (Vite/React)**: Handles the "Mental Cloning" file selector and the premium UI/UX.
- **Backend (Node.js/Express)**: Manages AI context construction and performs robust JSON parsing to ensure AI responses are always valid and actionable.

### 🧩 Directory Structure

```text
PRsonality/
├── Backend/            # Express.js Server
│   ├── Controllers/    # AI reasoning & JSON parsing logic
│   ├── Routes/         # API endpoint definitions
│   ├── prompts/        # System-level AI personality definitions
│   └── start.js        # Server entry point
├── src/                # React Frontend
│   ├── components/     # UI elements (ReviewResult, CustomCursor)
│   ├── context/        # Cursor & UI state management
│   ├── pages/          # Core views (Home, Features, etc.)
│   └── services/       # GitHub & Backend API integrations
├── tailwind.config.js  # Custom design system tokens
└── .env                # Global configuration (Ignored by Git)
```

---

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, new feature, or a new AI persona, feel free to open a PR.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

Built with ❤️ by [PRishabhKumar](https://github.com/PRishabhKumar)

</div>
