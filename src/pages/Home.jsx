import React, { useState } from "react";
import { motion } from "framer-motion";
import RepoForm from "../components/RepoForm";
import ReviewResult from "../components/ReviewResult";
import Loading from "../components/Loading";
import { getRepoDetails } from "../services/github";
import { analyzeRepo } from "../services/gemini";
import { AlertTriangle } from "lucide-react";

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentPersonality, setCurrentPersonality] = useState(null);
  const [files, setFiles] = useState(null);

  const handleReview = async (url, personality) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setFiles(null);
    setCurrentPersonality(personality);

    try {
      const repoData = await getRepoDetails(url);
      setFiles(repoData.files);
      const analysis = await analyzeRepo(repoData, personality);
      setResult(analysis);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "An unexpected error occurred. Please check the URL and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center relative pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-8xl md:text-[13rem] font-bold font-display text-white tracking-tighter leading-[0.9] scale-110 origin-top">
            CODE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-white animate-text-shimmer">
              REVIEWER
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-white/50 font-light leading-relaxed">
            Drop your GitHub repository link below. Select an AI persona.
            <br className="hidden md:block" />
            Receive an instantaneous, high-precision code audit.
          </p>
        </motion.div>
      </section>

      {/* Input Section */}
      <section className="relative z-20">
        <RepoForm onSubmit={handleReview} loading={loading} />
      </section>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 flex items-center justify-center gap-4 max-w-2xl mx-auto backdrop-blur-md"
        >
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <p className="font-mono-space text-sm text-red-200">{error}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && <Loading />}

      {/* Results Section */}
      {result && (
        <section id="results" className="scroll-mt-32">
          <ReviewResult
            result={result}
            personality={currentPersonality}
            files={files}
          />
        </section>
      )}
    </div>
  );
}

export default Home;
