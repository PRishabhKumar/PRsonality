import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";

const getRepoPath = (url) => {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch (e) {
    return null;
  }
  return null;
};

const fetchFileContent = async (owner, repo, path) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
    );
    if (response.data.type === "file") {
      const content = atob(response.data.content.replace(/\n/g, ""));
      return { name: path, content };
    }
    return null;
  } catch (error) {
    console.warn(`Failed to fetch ${path}:`, error);
    return null;
  }
};

export const getRepoDetails = async (repoUrl) => {
  const repoInfo = getRepoPath(repoUrl);
  if (!repoInfo) throw new Error("Invalid GitHub URL");

  const { owner, repo } = repoInfo;
  const files = [];

  try {
    // 1. Fetch Root Content to find README and Configs
    const rootResponse = await axios.get(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents`,
    );
    const rootItems = rootResponse.data;

    // Priorities: README, then config files
    const readmeFile = rootItems.find((item) =>
      item.name.toLowerCase().startsWith("readme"),
    );
    const configFiles = rootItems.filter((item) =>
      [
        "package.json",
        "requirements.txt",
        "pyproject.toml",
        "go.mod",
        "cargo.toml",
        "pom.xml",
        "build.gradle",
      ].includes(item.name.toLowerCase()),
    );

    if (readmeFile)
      await fetchFileContent(owner, repo, readmeFile.path).then(
        (f) => f && files.push(f),
      );
    for (const file of configFiles) {
      if (files.length >= 3) break; // Limit config files
      await fetchFileContent(owner, repo, file.path).then(
        (f) => f && files.push(f),
      );
    }

    // 2. Fetch Source Content (Simplified: Look in root or src/ for source files)
    // For MVP, we'll try to find a 'src' directory or just take valid code files from root
    let sourceCandidates = rootItems.filter(
      (item) =>
        item.type === "file" &&
        /\.(js|jsx|ts|tsx|py|go|rs|java|cpp|c|h|css|html)$/i.test(item.name),
    );

    // If few source files in root, check 'src' folder
    const srcDir = rootItems.find(
      (item) => item.type === "dir" && item.name === "src",
    );
    if (srcDir) {
      const srcResponse = await axios.get(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/src`,
      );
      const srcItems = srcResponse.data.filter(
        (item) =>
          item.type === "file" &&
          /\.(js|jsx|ts|tsx|py|go|rs|java|cpp|c|h|css|html)$/i.test(item.name),
      );
      sourceCandidates = [...sourceCandidates, ...srcItems];
    }

    // Fetch up to 10 source files
    for (const item of sourceCandidates) {
      if (files.length >= 12) break; // Total limit ~12 files
      await fetchFileContent(owner, repo, item.path).then(
        (f) => f && files.push(f),
      );
    }

    return { owner, repo, files };
  } catch (error) {
    throw new Error("Failed to fetch repository data. Ensure it is public.");
  }
};
