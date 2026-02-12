import React, { useState } from "react";
import {
  Search,
  Github,
  ArrowRight,
  Zap,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useCursor } from "../context/CursorContext";

const cn = (...inputs) => twMerge(clsx(inputs));

const PERSONALITIES = [
  {
    id: "Kind Senior Engineer",
    emoji: "🌱",
    icon: ShieldCheck,
    role: "The Mentor",
    desc: "Empathy-first feedback. Focuses on growth, best practices, and clean patterns.",
    gradient: "from-emerald-900/50 to-teal-900/50",
    border: "group-hover:border-emerald-500/50",
    textData: "text-emerald-400",
  },
  {
    id: "Brutally Honest Reviewer",
    emoji: "🔥",
    icon: Flame,
    role: "The Destroyer",
    desc: "No mercy. Tears down bad code, highlights security risks, and demands efficiency.",
    gradient: "from-red-900/50 to-rose-900/50",
    border: "group-hover:border-rose-500/50",
    textData: "text-rose-400",
  },
  {
    id: "Startup CTO",
    emoji: "🚀",
    icon: Zap,
    role: "The Visionary",
    desc: "Speed is everything. Prioritizes shipping features, scalability, and trade-offs.",
    gradient: "from-amber-900/50 to-orange-900/50",
    border: "group-hover:border-amber-500/50",
    textData: "text-amber-400",
  },
];

const RepoForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState("");
  const [personality, setPersonality] = useState(PERSONALITIES[0].id);
  const [focused, setFocused] = useState(false);
  const { setCursorVariant, setCursorText, setCursorSize, setCursorStyle } =
    useCursor();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url && personality) onSubmit(url, personality);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="w-full max-w-4xl mx-auto space-y-12"
    >
      {/* Floating Command Bar Input */}
      <form onSubmit={handleSubmit} className="relative group z-20">
        <div
          className={cn(
            "absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-600 opacity-20 blur-xl transition-opacity duration-500",
            focused ? "opacity-60" : "opacity-20",
          )}
        />

        <div className="relative flex items-center bg-[#0a0a0a]/100 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 group-hover:border-white/20">
          <div className="pl-4 pr-3 text-white/50">
            <Github className="w-6 h-6" />
          </div>
          <input
            type="url"
            required
            placeholder="paste_github_repo_url_here..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20 focus:ring-0 text-lg font-mono-space py-4"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => {
              setFocused(true);
              setCursorVariant("text");
            }}
            onBlur={() => {
              setFocused(false);
              setCursorVariant("default");
            }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => {
              setCursorVariant("default");
              setCursorStyle({ borderRadius: 0 });
            }}
          />
          <button
            type="submit"
            className="analyzeButton px-8 py-3 rounded-xl font-bold font-display text-sm tracking-wide transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-white to-gray-50 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] shadow-[0_0_10px_rgba(255,255,255,0.4)] border border-white/20"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCursorSize({ width: rect.width, height: rect.height });
              setCursorStyle({ borderRadius: 12 });
              setCursorVariant("button");
            }}
            onMouseLeave={() => setCursorVariant("default")}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black animate-bounce" />
                PROCESSING
              </span>
            ) : (
              <>
                ANALYZE <ArrowRight className="w-4 h-4 mb-0.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Holographic Personality Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PERSONALITIES.map((p) => {
          const isActive = personality === p.id;
          const Icon = p.icon;

          return (
            <motion.button
              key={p.id}
              onClick={() => setPersonality(p.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCursorSize({ width: rect.width, height: rect.height });
                setCursorStyle({ borderRadius: 16 });
                setCursorVariant("button");
              }}
              onMouseLeave={() => {
                setCursorVariant("default");
                setCursorStyle({ borderRadius: 0 });
              }}
              className={cn(
                "cursor-pointer relative text-left rounded-2xl p-6 border transition-all duration-300 overflow-hidden group h-full flex flex-col",
                isActive
                  ? "bg-white/5 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                  : "bg-transparent border-white/5 hover:bg-white/[0.02]",
              )}
            >
              {/* Active Gradient Mesh */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                  p.gradient,
                  isActive ? "opacity-20" : "opacity-0",
                )}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={cn(
                      "p-3 rounded-xl bg-white/5 border border-white/5 transition-colors",
                      isActive ? p.textData : "text-white/50",
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]"
                    />
                  )}
                </div>

                <h3
                  className={cn(
                    "text-lg font-bold font-display mb-1 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white/90",
                  )}
                >
                  {p.id}
                </h3>

                <p
                  className={cn(
                    "text-[10px] font-bold font-mono-space uppercase tracking-[0.2em] mb-4 transition-colors",
                    isActive ? p.textData : "text-white/30",
                  )}
                >
                  {p.role}
                </p>

                <p className="text-sm text-white/50 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RepoForm;
