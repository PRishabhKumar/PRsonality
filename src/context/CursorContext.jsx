import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext({
  cursorVariant: "default",
  setCursorVariant: () => {},
  cursorText: "",
  setCursorText: () => {},
  cursorSize: { width: 0, height: 0 },
  setCursorSize: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [cursorSize, setCursorSize] = useState({ width: 0, height: 0 });
  const [cursorStyle, setCursorStyle] = useState({ borderRadius: 0 });

  const value = {
    cursorVariant,
    setCursorVariant,
    cursorText,
    setCursorText,
    cursorSize,
    setCursorSize,
    cursorStyle,
    setCursorStyle,
  };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
