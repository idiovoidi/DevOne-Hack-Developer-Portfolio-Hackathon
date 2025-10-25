import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [
    "from-purple-500 via-pink-500 to-cyan-500",
    "from-cyan-500 via-blue-500 to-purple-500",
    "from-pink-500 via-purple-500 to-blue-500",
    "from-blue-500 via-cyan-500 to-pink-500",
  ];

  useEffect(() => {
    // Color rotation interval
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000);

    // Random glitch trigger
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 400);
      }
    }, 2000);

    return () => {
      clearInterval(colorInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text with gradient */}
      <motion.h2
        className={`section-heading bg-gradient-to-r ${colors[colorIndex]} bg-clip-text text-transparent relative z-10`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        {text}
      </motion.h2>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Red glitch layer */}
          <motion.h2
            className="section-heading absolute top-0 left-0 text-red-500 opacity-70 z-0"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [-2, 2, -2, 3, -1],
              y: [1, -1, 2, -2, 1],
            }}
            transition={{
              duration: 0.4,
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            style={{
              textShadow: "2px 0 #ff0000",
              mixBlendMode: "screen",
            }}
          >
            {text}
          </motion.h2>

          {/* Cyan glitch layer */}
          <motion.h2
            className="section-heading absolute top-0 left-0 text-cyan-500 opacity-70 z-0"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [2, -2, 3, -3, 1],
              y: [-1, 1, -2, 2, -1],
            }}
            transition={{
              duration: 0.4,
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
            style={{
              textShadow: "-2px 0 #00ffff",
              mixBlendMode: "screen",
            }}
          >
            {text}
          </motion.h2>

          {/* Glitch bars */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute w-full h-1 bg-white"
              style={{
                top: "30%",
                mixBlendMode: "difference",
              }}
            />
            <div
              className="absolute w-full h-1 bg-white"
              style={{
                top: "70%",
                mixBlendMode: "difference",
              }}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default GlitchText;
