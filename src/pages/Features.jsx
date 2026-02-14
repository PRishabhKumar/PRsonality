import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Target, Cpu, MessageSquare, Code2 } from "lucide-react";

const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI-Powered Audit",
    description:
      "Multi-layered code analysis using Google's Gemini Pro models to identify security flaws and optimizations.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Personas",
    description:
      "Choose from various AI personalities, from 'Rude Interviewer' to 'Senior Mentor', for tailored feedback.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precision Fixes",
    description:
      "Get direct suggestions and code snippets to fix identified issues with one click.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy First",
    description:
      "Your code is processed securely with focus on data privacy and local context analysis.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Results",
    description:
      "Lightning-fast repository scanning and analysis, providing feedback in seconds.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Line-by-Line Trace",
    description:
      "Drill down into specific files and lines where errors occur for maximum clarity.",
    color: "from-amber-500 to-yellow-500",
  },
];

function Features() {
  return (
    <div className="space-y-20 py-10">
      <section className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-display text-white tracking-tight"
        >
          Technological <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            Excellence
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 max-w-xl mx-auto text-lg font-light"
        >
          Discover the powerful capabilities that make PRsonality the most
          sophisticated AI code reviewer.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 backdrop-blur-sm overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            />

            <div className="relative z-10 space-y-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Stats or extra section if needed */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-12 rounded-[3rem] bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-white/5 backdrop-blur-xl text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to elevate your code?
        </h2>
        <p className="text-white/60 mb-8 max-w-lg mx-auto">
          Join thousands of developers using PRsonality for cleaner, safer, and
          more efficient software development.
        </p>
        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
          Try Now
        </button>
      </motion.section>
    </div>
  );
}

export default Features;
