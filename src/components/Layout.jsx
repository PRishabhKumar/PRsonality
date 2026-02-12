import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import AuroraBackground from "./AuroraBackground.jsx";
import { Github, Sparkles } from "lucide-react";
import { useCursor } from "../context/CursorContext";

const Layout = ({ children }) => {
  const { setCursorVariant } = useCursor();
  return (
    <AuroraBackground>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-[2px]"
      >
        <div
          className="flex items-center gap-2 group cursor-none"
          onMouseEnter={() => setCursorVariant("button")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-violet-500/50 transition-colors">
            <Sparkles className="w-4 h-4 text-violet-400 group-hover:text-white transition-colors" />
            <div className="absolute inset-0 bg-violet-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg font-bold font-display tracking-tight text-white/90 group-hover:text-white transition-colors">
            PRsonality
          </span>
        </div>

        <a
          href="https://github.com/PRishabhKumar/NexMeet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all font-mono-space text-xs tracking-wide text-white/70 hover:text-white cursor-none"
          onMouseEnter={() => setCursorVariant("button")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <Github className="w-3.5 h-3.5" />
          <span>GITHUB</span>
        </a>
      </motion.nav>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </AuroraBackground>
  );
};

export default Layout;
