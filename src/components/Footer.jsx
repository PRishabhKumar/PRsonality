import React from "react";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";
import { useCursor } from "../context/CursorContext";

const Footer = () => {
  const { setCursorVariant, setCursorSize, setCursorStyle } = useCursor();
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#0a0a0a]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-2xl font-bold font-display tracking-tight text-white">
              PRsonality
            </h3>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              Elevate your code quality with AI-driven insights. Get
              personalized feedback from multiple personas to refine your
              projects.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                {
                  Icon: Github,
                  color: "hover:border-violet-500/30 hover:text-violet-400",
                },
                {
                  Icon: Twitter,
                  color: "hover:border-cyan-500/30 hover:text-cyan-400",
                },
                {
                  Icon: Linkedin,
                  color: "hover:border-fuchsia-500/30 hover:text-fuchsia-400",
                },
              ].map(({ Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 ${color} transition-all text-white/60 cursor-none`}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setCursorSize({ width: rect.width, height: rect.height });
                    setCursorStyle({ borderRadius: "50%" });
                    setCursorVariant("button");
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default");
                    setCursorStyle({ borderRadius: 0 });
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-mono-space uppercase tracking-widest text-white/80">
              Product
            </h4>
            <ul className="space-y-2 text-base text-white/50">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors cursor-none"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-mono-space uppercase tracking-widest text-white/80">
              Company
            </h4>
            <ul className="space-y-2 text-base text-white/50">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30 font-mono-space">
          <p>© 2026 PRsonality AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500/20" />
            <span>by Rishabh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
