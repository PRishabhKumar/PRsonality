import apiClient from "./apiClient";

export const analyzeRepo = async (repoData, personality) => {
  try {
    const response = await apiClient.post("/analyze", { repoData, personality });
    return response.data;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error(
      error.response?.data?.error || "Failed to analyze repository"
    );
  }
};

export const getErrorLocation = async (errorInfo, files) => {
  try {
    const response = await apiClient.post("/get_error_location", { errorInfo, files });
    return response.data;
  } catch (error) {
    console.error("Gemini Error Location Error:", error);
    throw new Error(
      error.response?.data?.error || "Failed to locate error"
    );
  }
};

export const handleGetPrompt = async (errorInfo) => {
  try {
    const response = await apiClient.post("/get_solution", { errorInfo });
    return response.data;
  } catch (error) {
    console.error("Gemini Correction Error:", error);
    throw new Error(
      error.response?.data?.error || "Failed to get correction prompt"
    );
  }
};
