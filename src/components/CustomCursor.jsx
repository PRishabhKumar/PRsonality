import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity } from "framer-motion";
import { useCursor } from "../context/CursorContext";

const CustomCursor = () => {
  const { cursorVariant, cursorText, cursorSize, cursorStyle } = useCursor();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics for smoother, fluid movement
  // Lower stiffness/damping for a "floaty" feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity for jelly-like deformation
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const updateVelocity = () => {
      const vx = velocityX.get();
      const vy = velocityY.get();
      const speed = Math.sqrt(vx * vx + vy * vy);
      const maxStretch = 1.4; // More stretch for fluid feel

      if (speed > 5) {
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        setRotation(angle);

        const stretch = Math.min(1 + speed / 800, maxStretch);
        setScaleX(stretch);
        setScaleY(1 / stretch);
      } else {
        setScaleX(1);
        setScaleY(1);
        // Don't reset rotation immediately for organic feel
      }
    };

    const unsubscribeX = velocityX.on("change", updateVelocity);
    const unsubscribeY = velocityY.on("change", updateVelocity);
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [velocityX, velocityY]);

  const variants = {
    default: {
      height: 24,
      width: 24,
      backgroundColor: "#ffffff",
      // Using a solid white core that blends subtractively/difference for visibility
      mixBlendMode: "difference",
      borderRadius: "50%",
      filter: "blur(0px)",
      opacity: 1,
    },
    text: {
      height: 32,
      width: 4,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference",
      borderRadius: "2px",
      filter: "blur(0px)",
      opacity: 1,
      rotate: -15, // Force slanted for text
    },
    button: {
      height: 0,
      width: 0,
      backgroundColor: "transparent",
      mixBlendMode: "normal",
      borderRadius: "0px",
      filter: "blur(0px)",
      opacity: 1,
    },
  };

  // Secondary "Glow" cursor that follows with lag
  // This provides the "Aurora" color effect
  const glowSpring = { damping: 50, stiffness: 200, mass: 1 }; // Slower, heavier
  const glowX = useSpring(mouseX, glowSpring);
  const glowY = useSpring(mouseY, glowSpring);

  return (
    <>
      {/* Primary Interaction Cursor (High Precision, High Contrast) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX: cursorVariant === "text" ? 1 : scaleX,
          scaleY: cursorVariant === "text" ? 1 : scaleY,
          rotate:
            cursorVariant === "text"
              ? -15
              : cursorVariant === "button"
                ? 0
                : rotation,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {/* Adaptive Brackets */}
        {cursorVariant === "button" && (
          <motion.svg
            width={cursorSize.width + 32} // Padding for brackets
            height={cursorSize.height}
            viewBox={`0 0 ${cursorSize.width + 32} ${cursorSize.height}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <defs>
              <mask id="bracket-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                {/* Mask Top Center */}
                <rect
                  x="12"
                  y="-5"
                  width={cursorSize.width + 32 - 24}
                  height="20"
                  fill="black"
                />
                {/* Mask Bottom Center */}
                <rect
                  x="12"
                  y={cursorSize.height - 10}
                  width={cursorSize.width + 32 - 24}
                  height="20"
                  fill="black"
                />
              </mask>
            </defs>
            <motion.rect
              x="2"
              y="0"
              width={cursorSize.width + 28}
              height={cursorSize.height}
              fill="none"
              stroke="white"
              strokeWidth={2}
              mask="url(#bracket-mask)"
              initial={{ rx: 0 }}
              animate={{
                rx: cursorStyle?.borderRadius || 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.svg>
        )}
      </motion.div>

      {/* Aurora Glow Follower (Decorative) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full opacity-60 blur-2xl"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 150,
          height: 150,
          background: "linear-gradient(to right, #8b5cf6, #06b6d4)", // Violet point to Cyan
        }}
        animate={{
          scale: cursorVariant === "button" ? 1.5 : 1,
          opacity: cursorVariant === "button" ? 0.4 : 0.6,
        }}
      />

      {/* Text Label */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-[10px] font-mono-space tracking-widest border border-white/10 whitespace-nowrap"
          style={{
            x: smoothX,
            y: smoothY,
            left: 20,
            top: 20,
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 20 }}
          exit={{ opacity: 0, x: 10 }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
