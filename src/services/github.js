import apiClient from "./apiClient";

export const getRepoDetails = async (repoUrl) => {
  try {
    const response = await apiClient.post("/fetchRepo", { repoUrl });
    return response.data;
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch repository details"
    );
  }
};
