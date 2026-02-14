# 🤖 PRsonality — AI Code Reviewer with an Attitude

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)

**PRsonality** is a premium, AI-powered codebase auditor that doesn't just review your code—it analyzes it with character. By blending high-performance AI reasoning with high-fidelity UI design, PRsonality provides deep technical insights through distinct professional personas.

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

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PRishabhKumar/PRsonality.git
   cd PRsonality
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 🔬 Technical Deep Dive

### 🖱️ Momentum-Based Cursor Physics

PRsonality features a custom cursor system built on a custom physics engine:

- **Spring Physics**: Uses `useSpring` with targeted damping (20) and stiffness (300) to eliminate input lag.
- **Jelly Deformation**: Calculates movement velocity to dynamically "stretch" and rotate the cursor in the direction of movement.
- **Adaptive Morphing**: The cursor intelligently transforms into an I-Beam for text inputs and Bracketed Corners `[]` for buttons via a global `CursorContext`.
- **Aurora Trail**: A secondary "glow" follower with heavier mass creates a soft, luminous trail.

### 🧩 Directory Structure

```text
PRsonality/
├── src/
│   ├── components/     # High-fidelity UI elements (ReviewResult, CustomCursor)
│   ├── context/        # Global state management (CursorContext)
│   ├── pages/          # Core views (Home, Features, Contact)
│   ├── services/       # AI (Gemini) and GitHub API integrations
│   └── assets/         # Static visual resources
├── prompts/            # System-level AI personality definitions
├── public/             # Static public assets
└── tailwind.config.js  # Custom design system tokens
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
