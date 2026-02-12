# AI Code Reviewer With a Personality

Detailed, personality-driven code reviews for your GitHub repositories using Gemini 3.

## Features

- **GitHub Repository Analysis**: Fetches README, configuration, and source files.
- **Personality Modes**:
  - 👩‍💻 **Kind Senior Engineer**: Constructive, educational feedback.
  - 😈 **Brutally Honest Reviewer**: Direct, no-nonsense critique.
  - 🚀 **Startup CTO**: Scalability and business-focused insights.
- **Gemini 3 Integration**: Uses Google's latest models for deep code understanding.
- **Modern UI**: Clean, dark-mode interface with Tailwind CSS.

## Setup

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env` file in the root directory and add your Gemini API Key:

    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

    (You can get a key from [Google AI Studio](https://aistudio.google.com/))

3.  **Run Development Server**:

    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to `http://localhost:5173` (or the URL shown in terminal).

## Usage

1.  Paste a public GitHub repository URL (e.g., `https://github.com/facebook/react`).
2.  Select a reviewer personality.
3.  Click "Review Repository".
4.  View the detailed analysis, issues, and suggestions.

## Troubleshooting

- **API Key Error**: Ensure `VITE_GEMINI_API_KEY` is set in `.env` and restart the server.
- **Build Failures**: Ensure you are using a compatible Node.js version (LTS recommended, v18+). If you see `postcss` errors, try listing `postcss.config.js` content or updating dependencies.
