import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  Send,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useCursor } from "../context/CursorContext";
import "./Contact.css";

function Contact() {
  const { setCursorVariant, setCursorSize, setCursorStyle } = useCursor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-10 space-y-20">
      <section className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold font-display text-white tracking-tight"
        >
          Let's{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">
            Spark a Conversation
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 max-w-xl mx-auto text-lg font-light"
        >
          Have questions or want to collaborate? Reach out to the team.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-sm font-mono-space uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-white text-lg">rishabh260405@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-sm font-mono-space uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-white text-lg">
                    Vellore, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-white/70 font-semibold tracking-wider text-sm uppercase">
              Connect me though my socials
            </h3>
            <div className="flex gap-6 pt-4">
              {[
                {
                  icon: <Github className="w-6 h-6" />,
                  color: "hover:bg-white/10 hover:text-white",
                  label: "GitHub",
                  url: "https://github.com/PRishabhKumar",
                },
                {
                  icon: <Linkedin className="w-6 h-6" />,
                  color: "hover:bg-emerald-500/20 hover:text-emerald-400",
                  label: "LinkedIn",
                  url: "https://www.linkedin.com/in/p-rishabh-kumar-9336b0289/",
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  color: "hover:bg-white/10 hover:text-white",
                  label: "Portfolio",
                  url: "https://rishiverse.framer.website/",
                },
              ].map((social, i) => (
                <div key={i} className="social-icon-wrapper">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title=""
                    className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 ${social.color} hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                  <span className="social-tooltip">{social.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
          <form
            onSubmit={handleSubmit}
            className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold font-mono-space tracking-[0.2em] uppercase ml-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  onFocus={() => setCursorVariant("text")}
                  onBlur={() => setCursorVariant("default")}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="w-full px-6 py-5 rounded-2xl bg-[#0a0a0a]/50 border border-white/5 focus:border-emerald-500/40 focus:bg-[#0a0a0a]/80 transition-all duration-500 outline-none text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold font-mono-space tracking-[0.2em] uppercase ml-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  onFocus={() => setCursorVariant("text")}
                  onBlur={() => setCursorVariant("default")}
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className="w-full px-6 py-5 rounded-2xl bg-[#0a0a0a]/50 border border-white/5 focus:border-emerald-500/40 focus:bg-[#0a0a0a]/80 transition-all duration-500 outline-none text-white placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white/40 text-[10px] font-bold font-mono-space tracking-[0.2em] uppercase ml-1">
                Message
              </label>
              <textarea
                required
                rows="6"
                placeholder="How can we help you today?"
                onFocus={() => setCursorVariant("text")}
                onBlur={() => setCursorVariant("default")}
                onMouseEnter={() => setCursorVariant("text")}
                onMouseLeave={() => setCursorVariant("default")}
                className="w-full px-6 py-5 rounded-2xl bg-[#0a0a0a]/50 border border-white/5 focus:border-emerald-500/40 focus:bg-[#0a0a0a]/80 transition-all duration-500 outline-none text-white placeholder:text-white/20 resize-none"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={submitted}
              whileHover={{ scale: 1.02 }}
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
              className="group relative w-full py-6 rounded-2xl overflow-hidden transition-all duration-500 bg-[#0a0a0a]"
            >
              {/* Button Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="absolute inset-0 border border-white/10 group-hover:border-emerald-500/50 rounded-2xl transition-all duration-500 shadow-[inset_0_0_20px_rgba(16,185,129,0)] group-hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]" />

              {/* Animated Inner Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)]" />

              <span className="relative z-10 flex items-center justify-center gap-3 font-display font-bold text-sm tracking-[0.4em] transition-all duration-500 group-active:scale-95">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, letterSpacing: "0.4em" }}
                    className="text-emerald-400 flex items-center gap-2"
                  >
                    MESSAGE SENT
                  </motion.div>
                ) : (
                  <>
                    <span className="text-white/90 group-hover:text-emerald-50 transition-colors">
                      SEND MESSAGE
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-2 transition-transform duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </>
                )}
              </span>

              {/* Interaction Pulse on Click */}
              <motion.div
                initial={false}
                animate={
                  submitted
                    ? { scale: [1, 1.5], opacity: [0.3, 0] }
                    : { scale: 1, opacity: 0 }
                }
                className="absolute inset-0 bg-emerald-500/30 rounded-2xl pointer-events-none"
              />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
