import { getRepoDetails } from "./githubController.js";
import { analyzeRepo, getErrorLocation as getGeminiErrorLocation, handleGetPrompt } from "./geminiController.js";

export const fetchRepo = async (req, res) => {
    try {
        const { repoUrl } = req.body;
        if (!repoUrl) {
            return res.status(400).json({ error: "repoUrl is required" });
        }
        const data = await getRepoDetails(repoUrl);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAnalysis = async (req, res) => {
    try {
        const { repoData, personality } = req.body;
        const data = await analyzeRepo(repoData, personality);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getErrorLocation = async (req, res) => {
    try {
        const { errorInfo, files } = req.body;
        const data = await getGeminiErrorLocation(errorInfo, files);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSolution = async (req, res) => {
    try {
        const { errorInfo } = req.body;
        const data = await handleGetPrompt(errorInfo);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
