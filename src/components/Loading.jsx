import React, { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Cloning repository (mentally)...",
  "Judging your variable names...",
  "Looking for console.log statements to roast...",
  "Analyzing architectural purity...",
  "Preparing constructive feedback...",
  "Checking tab vs space alignment...",
  "Reading the README (someone has to)...",
];

const Loading = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>
        <div
          className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin-reverse"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>
      <p className="text-gray-400 font-medium animate-pulse text-lg">
        {LOADING_MESSAGES[msgIndex]}
      </p>
    </div>
  );
};

export default Loading;
