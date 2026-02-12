import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Terminal,
  Lightbulb,
  GitPullRequest,
  MapPin,
  Sparkles,
  XCircle,
  Copy,
  Scan,
  Wand2,
  Cpu,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getErrorLocation, handleGetPrompt } from "../services/gemini.js";

const cn = (...inputs) => twMerge(clsx(inputs));

// --- Premium Components ---

const CyberButton = ({
  onClick,
  disabled,
  loading,
  icon: Icon,
  label,
  loadingLabel,
  color = "cyan",
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(label);
  const colorClass = color === "cyan" ? "text-cyan-400" : "text-violet-400";
  const glowClass =
    color === "cyan"
      ? "group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]"
      : "group-hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)]";
  const borderHoverClass =
    color === "cyan"
      ? "group-hover:border-cyan-400/50"
      : "group-hover:border-violet-400/50";

  useEffect(() => {
    if (!isHovered || loading) {
      setDisplayText(label);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        label
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return label[index];
            }
            if (label[index] === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iterations >= label.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, label, loading]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group overflow-hidden px-10 py-5 w-full sm:w-auto transition-all duration-500",
        "bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl",
        borderHoverClass,
        glowClass,
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {/* Aurora Ambient Background */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          color === "cyan" ? "bg-cyan-500" : "bg-violet-500",
        )}
      />

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-4 z-10">
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className={cn("w-5 h-5", colorClass)} />
            </motion.div>
            <span className={cn("text-sm font-bold tracking-wide", colorClass)}>
              {loadingLabel}
            </span>
          </>
        ) : (
          <>
            <Icon
              className={cn(
                "w-5 h-5 transition-all duration-500 group-hover:scale-110",
                colorClass,
                isHovered && "animate-pulse",
              )}
            />
            <span className="text-sm font-mono font-bold text-white/90 group-hover:text-white transition-colors">
              {displayText}
            </span>
          </>
        )}
      </div>
    </button>
  );
};

const DiagnosticCard = ({ issue, index, getUrgencyColor, files }) => {
  const [errorDesc, setErrorDesc] = useState(null);
  const [correctionPrompt, setCorrectionPrompt] = useState({
    title: null,
    prompt: null,
    tasks: null,
    outcome: null,
  });
  const [loadingAction, setLoadingAction] = useState(null);

  const onGetErrorLocation = async () => {
    if (loadingAction) return;
    setLoadingAction("location");
    try {
      const data = await getErrorLocation(issue.explanation, files);
      setErrorDesc(Array.isArray(data) ? data : [data]);
      setCorrectionPrompt({
        title: null,
        prompt: null,
        tasks: null,
        outcome: null,
      });
    } catch (e) {
      console.error("Error getting location:", e);
      setErrorDesc(null);
    } finally {
      setLoadingAction(null);
    }
  };

  const onGetFixPrompt = async () => {
    if (loadingAction) return;
    setLoadingAction("fix");
    try {
      const data = await handleGetPrompt(issue.explanation);

      // Validate and set the structured data
      if (data && typeof data === "object") {
        setCorrectionPrompt({
          title: data.title || null,
          prompt: data.prompt || null,
          tasks: Array.isArray(data.tasks) ? data.tasks : null,
          outcome: data.outcome || null,
        });
      } else {
        // Fallback if data is malformed
        setCorrectionPrompt({
          title: "Error",
          prompt: "Unable to generate fix prompt. Please try again.",
          tasks: null,
          outcome: null,
        });
      }

      setErrorDesc(null);
    } catch (e) {
      console.error("Error getting fix prompt:", e);
      setCorrectionPrompt({
        title: null,
        prompt: null,
        tasks: null,
        outcome: null,
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const colorClass = getUrgencyColor(issue.importance);

  // Helper to check if correctionPrompt has any data
  const hasCorrectionPrompt =
    correctionPrompt.title ||
    correctionPrompt.prompt ||
    correctionPrompt.tasks ||
    correctionPrompt.outcome;

  // Generate copy text for clipboard
  const getCopyText = () => {
    let text = "";
    if (correctionPrompt.title) text += `${correctionPrompt.title}\n\n`;
    if (correctionPrompt.prompt) text += `${correctionPrompt.prompt}\n\n`;
    if (correctionPrompt.tasks && correctionPrompt.tasks.length > 0) {
      text += `Tasks:\n${correctionPrompt.tasks.map((task) => `- ${task}`).join("\n")}\n\n`;
    }
    if (correctionPrompt.outcome)
      text += `Expected Outcome:\n${correctionPrompt.outcome}`;
    return text.trim();
  };

  // Helper function to format line numbers for display
  const formatLineNumbers = (lineNumber) => {
    if (!lineNumber || lineNumber === "N/A") return "N/A";

    // If it's a string with commas, it's multiple line numbers
    if (typeof lineNumber === "string" && lineNumber.includes(",")) {
      const lines = lineNumber.split(",").map((l) => l.trim());
      return lines.join(", ");
    }

    // Single line number
    return String(lineNumber);
  };

  // Helper to check if there are multiple line numbers
  const hasMultipleLines = (lineNumber) => {
    if (!lineNumber || lineNumber === "N/A") return false;
    return typeof lineNumber === "string" && lineNumber.includes(",");
  };

  return (
    <motion.div
      variants={item}
      className="group relative rounded-none border-l-2 border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md hover:bg-[#0a0a0a]/80 transition-all duration-500 max-w-5xl mx-auto w-full overflow-hidden"
      style={{
        borderLeftColor: colorClass.includes("red")
          ? "#ef4444"
          : colorClass.includes("orange")
            ? "#f97316"
            : colorClass.includes("yellow")
              ? "#eab308"
              : "#22d3ee",
      }}
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />

      <div className="p-6 md:p-10 grid md:grid-cols-[1.2fr_1fr] gap-12 relative z-10">
        {/* Left Column: Title, Actions & Results */}
        <div className="space-y-8 flex flex-col">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest",
                  colorClass,
                )}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {issue.importance}
              </div>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold font-display text-white leading-tight">
              {issue.title}
            </h3>
          </div>

          {/* Buttons Container */}
          <div className="flex flex-wrap gap-4">
            <CyberButton
              onClick={onGetErrorLocation}
              disabled={!!loadingAction}
              loading={loadingAction === "location"}
              icon={MapPin}
              label="Trace Error Location"
              loadingLabel="Locating..."
              color="cyan"
            />

            <CyberButton
              onClick={onGetFixPrompt}
              disabled={!!loadingAction}
              loading={loadingAction === "fix"}
              icon={Wand2}
              label="Generate Solution"
              loadingLabel="Thinking..."
              color="violet"
            />
          </div>

          {/* Dynamic Content Area (MOVED HERE) */}
          <AnimatePresence mode="wait">
            {errorDesc && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-6"
              >
                <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
                    <h5 className="text-xs font-bold text-cyan-400/80 uppercase tracking-widest flex items-center gap-3">
                      <Scan className="w-4 h-4" /> Issue Context
                    </h5>
                    <button
                      onClick={() => setErrorDesc(null)}
                      className="text-white/20 hover:text-white/40 transition-colors p-1"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-8 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {Array.isArray(errorDesc) &&
                      errorDesc.map((err, idx) => {
                        if (!err) return null;

                        const lineNumbers = formatLineNumbers(
                          err.line_number || err.line,
                        );
                        const isMultiLine = hasMultipleLines(
                          err.line_number || err.line,
                        );

                        return (
                          <div
                            key={idx}
                            className={cn(
                              "space-y-6",
                              idx > 0 && "pt-8 border-t border-white/5",
                            )}
                          >
                            <div className="flex items-center gap-2 text-white/20 text-[10px] uppercase font-bold tracking-widest">
                              <span>Location {idx + 1}</span>
                              <div className="h-px flex-1 bg-white/5" />
                            </div>

                            <div className="grid grid-cols-2 gap-6 text-sm">
                              <div className="space-y-1">
                                <span className="text-white/30 text-[10px] uppercase tracking-wider font-bold">
                                  File
                                </span>
                                <p className="text-white/80 break-all font-mono leading-relaxed">
                                  {err.file_path || err.file || "N/A"}
                                </p>
                              </div>

                              <div className="space-y-1">
                                <span className="text-white/30 text-[10px] uppercase tracking-wider font-bold">
                                  Line{isMultiLine && "s"}
                                </span>
                                <p className="text-white/80 font-mono">
                                  {lineNumbers}
                                </p>
                              </div>
                            </div>

                            {err.snippet && err.snippet !== "N/A" && (
                              <div className="relative group/snippet">
                                <div className="p-5 bg-black/40 rounded-2xl border border-white/5 text-red-400/90 text-xs leading-relaxed overflow-x-auto">
                                  <pre className="whitespace-pre-wrap font-mono">
                                    {err.snippet}
                                  </pre>
                                </div>
                              </div>
                            )}

                            {((err.issue_description &&
                              err.issue_description !== "N/A") ||
                              (err.issue && err.issue !== "N/A")) && (
                              <div className="px-5 py-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
                                <p className="text-cyan-200/70 text-sm leading-relaxed italic">
                                  "{err.issue_description || err.issue}"
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </motion.div>
            )}

            {hasCorrectionPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-6"
              >
                <div className="rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col relative shadow-2xl">
                  <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-violet-400/80" />
                      <h5 className="text-xs font-bold text-violet-300/80 uppercase tracking-widest">
                        Proposed Solution
                      </h5>
                    </div>
                    <button
                      onClick={() =>
                        setCorrectionPrompt({
                          title: null,
                          prompt: null,
                          tasks: null,
                          outcome: null,
                        })
                      }
                      className="text-white/20 hover:text-white/40 transition-colors p-1"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-8 flex flex-col space-y-6">
                    <div className="relative group/code">
                      <div className="space-y-6">
                        {/* Title */}
                        {correctionPrompt.title &&
                          correctionPrompt.title !== "N/A" && (
                            <h6 className="text-xl font-bold text-white tracking-tight">
                              {correctionPrompt.title}
                            </h6>
                          )}

                        {/* Main Prompt */}
                        {correctionPrompt.prompt && (
                          <p className="text-white/70 text-sm leading-relaxed font-light">
                            {correctionPrompt.prompt}
                          </p>
                        )}

                        {/* Tasks List */}
                        {correctionPrompt.tasks &&
                          correctionPrompt.tasks.length > 0 &&
                          !(
                            correctionPrompt.tasks.length === 1 &&
                            correctionPrompt.tasks[0] === "N/A"
                          ) && (
                            <div className="space-y-4">
                              <div className="text-violet-300/60 text-[10px] uppercase font-bold tracking-widest">
                                Implementation Plan
                              </div>
                              <ul className="space-y-3">
                                {correctionPrompt.tasks.map((task, idx) => (
                                  <li
                                    key={idx}
                                    className="text-white/80 text-sm flex items-start gap-4 group/task"
                                  >
                                    <span className="w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/task:bg-violet-500/20 transition-colors">
                                      {idx + 1}
                                    </span>
                                    <span className="pt-0.5 leading-relaxed">
                                      {task}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Expected Outcome */}
                        {correctionPrompt.outcome &&
                          correctionPrompt.outcome !== "N/A" && (
                            <div className="pt-4 border-t border-white/5">
                              <div className="text-cyan-400/60 text-[10px] uppercase font-bold tracking-widest mb-3">
                                Expected Result
                              </div>
                              <div className="text-white/60 text-sm italic leading-relaxed font-light">
                                {correctionPrompt.outcome}
                              </div>
                            </div>
                          )}
                      </div>

                      <div className="mt-8">
                        <CyberButton
                          onClick={() =>
                            navigator.clipboard.writeText(getCopyText())
                          }
                          icon={Copy}
                          label="Copy Instructions"
                          color="cyan"
                          className="px-6 py-3 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Analysis & Recommendation */}
        <div className="space-y-8 md:border-l border-white/5 md:pl-12">
          <div className="space-y-8 transition-all duration-500">
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                <GitPullRequest className="w-3.5 h-3.5" /> Analysis
              </h4>
              <p className="text-base text-white/80 leading-relaxed font-light text-justify">
                {issue.explanation}
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <h4 className="flex items-center gap-3 text-[10px] font-bold text-violet-400/60 uppercase tracking-[0.2em]">
                <Lightbulb className="w-3.5 h-3.5" /> Recommendation
              </h4>
              <p className="text-base text-white/80 leading-relaxed font-light text-justify">
                {issue.suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewResult = ({ result, personality, files }) => {
  if (!result) return null;
  const { projectOverview, keyIssues } = result;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const getUrgencyColor = (importance) => {
    switch (importance?.toLowerCase()) {
      case "critical":
        return "text-red-400 border-red-500/50 from-red-500/10";
      case "high":
        return "text-orange-400 border-orange-500/50 from-orange-500/10";
      case "medium":
        return "text-yellow-400 border-yellow-500/50 from-yellow-500/10";
      default:
        return "text-cyan-400 border-cyan-500/50 from-cyan-500/10";
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-16 pb-32"
    >
      {/* Overview HUD */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl p-8 md:p-12 shadow-2xl shadow-black/50"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Terminal className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold font-display tracking-wide text-white">
              SYSTEM_OVERVIEW
            </h2>
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-p:font-light prose-p:leading-8 prose-headings:text-white prose-strong:text-white">
            <ReactMarkdown>{projectOverview}</ReactMarkdown>
          </div>
        </div>
      </motion.div>

      {/* Issues Feed */}
      <div className="space-y-8">
        <motion.div
          variants={item}
          className="flex items-center justify-between px-2"
        >
          <h2 className="text-3xl font-bold font-display text-white">
            Diagnostics
          </h2>
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono-space tracking-widest text-white/50">
            {keyIssues?.length || 0} MODULES FLAGGED
          </div>
        </motion.div>

        <div className="grid gap-6">
          {keyIssues?.map((issue, index) => (
            <DiagnosticCard
              key={index}
              issue={issue}
              index={index}
              getUrgencyColor={getUrgencyColor}
              files={files}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewResult;
