import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_SECOND_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const jsonModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const PERSONALITY_PROMPTS = {
  "Kind Senior Engineer": import.meta.env.VITE_KIND_SENIOR_ENGINEER_PROMPT,
  "Brutally Honest Reviewer": import.meta.env.VITE_BRUTALLY_HONEST_PROMPT,
  "Startup CTO": import.meta.env.VITE_STARTUP_CTO_PROMPT,
};

export const analyzeRepo = async (repoData, personality) => {
  if (!API_KEY) {
    throw new Error(
      "Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.",
    );
  }

  const { owner, repo, files } = repoData;

  if (!files || files.length === 0) {
    throw new Error(
      "No files found to analyze in this repository. The repository might be empty or private.",
    );
  }

  const fileContext = files
    .map(
      (f) => `
--- FILE: ${f.name} ---
${f.content}
  `,
    )
    .join("\n\n");

  const prompt = `
    Analyze the GitHub repository "${owner}/${repo}".
    
    ${PERSONALITY_PROMPTS[personality] || PERSONALITY_PROMPTS["Kind Senior Engineer"]}
    
    **Goal**: Identify 3–5 high-impact issues. Priority: Design, Maintainability, Scalability.
    Do NOT focus on low-level style/formatting nitpicks.
    
    **Files Provided**:
    ${fileContext}
    
    **Output Format (JSON)**:
    Return a JSON object with this exact structure (no markdown code blocks, just raw JSON if possible, or strictly wrapped in \`\`\`json):
    {
      "projectOverview": "2-4 sentences summarizing the project architecture and purpose.",
      "keyIssues": [
        {
          "title": "Short title of the issue",
          "importance": "High" | "Critical" | "Medium",
          "explanation": "Why this matters (consistent with personality)",
          "suggestion": "Concrete improvement suggestion"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    // Cleanup markdown code blocks if present
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);

    if (error.message.includes("403") || error.message.includes("API key")) {
      throw new Error(
        "Invalid or missing Gemini API Key. Please check your .env file.",
      );
    }
    if (error.message.includes("429")) {
      throw new Error(
        "Gemini API rate limit exceeded. Please try again later.",
      );
    }
    throw new Error(`Failed to analyze repository: ${error.message}`);
  }
};

export const getErrorLocation = async (errorInfo, files) => {
  try {
    // handle basic errors
    if (!API_KEY) {
      throw new Error("There was no API key provided...");
    }

    let fileContext = "";
    if (files && files.length > 0) {
      fileContext = files
        .map(
          (f) => `
    --- FILE: ${f.name} ---
    ${f.content}
      `,
        )
        .join("\n\n");
    }

    const prompt = `
      ${import.meta.env.VITE_GET_ERROR_LOCATION_PROMPT}

      Here is the issue: ${errorInfo}

      Here are the files in the repository:
      ${fileContext}
    `;

    const result = await jsonModel.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log("This is the resposne for error position : ", text);
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);

    if (error.message.includes("403") || error.message.includes("API key")) {
      throw new Error(
        "Invalid or missing Gemini API Key. Please check your .env file.",
      );
    }
    if (error.message.includes("429")) {
      throw new Error(
        "Gemini API rate limit exceeded. Please try again later.",
      );
    }
    throw new Error(`Failed to analyze repository: ${error.message}`);
  }
};

export const handleGetPrompt = async (errorInfo) => {
  try {
    if (!API_KEY) {
      throw new Error("There was not API key provided...");
    }
    const result = await jsonModel.generateContent(
      import.meta.env.VITE_GET_CORRECTION_PROMPT +
        `Here is the issue : ${errorInfo}`,
    );
    const response = await result.response;
    let text = response.text();
    console.log("This is the resposne for the corrective prompt : ", text);
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);

    if (error.message.includes("403") || error.message.includes("API key")) {
      throw new Error(
        "Invalid or missing Gemini API Key. Please check your .env file.",
      );
    }
    if (error.message.includes("429")) {
      throw new Error(
        "Gemini API rate limit exceeded. Please try again later.",
      );
    }
    throw new Error(`Failed to analyze repository: ${error.message}`);
  }
};
