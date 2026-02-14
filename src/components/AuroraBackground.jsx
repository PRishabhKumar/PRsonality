import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AuroraBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative w-full bg-[#030014] text-white">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[128px] animate-float-slow" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[128px] animate-float-slow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] bg-fuchsia-600/10 rounded-full blur-[128px] animate-float-slow"
        style={{ animationDelay: "4s" }}
      />

      {/* Grid Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

      {/* Grid Lines (Cyber Aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;
