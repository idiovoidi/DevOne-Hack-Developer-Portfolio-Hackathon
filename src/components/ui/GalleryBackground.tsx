import React from "react";
import { motion } from "framer-motion";

const GalleryBackground: React.FC = () => {
  // Generate floating frame positions
  const frames = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 60 + Math.random() * 80,
    delay: Math.random() * 2,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating gallery frames */}
      {frames.map((frame) => (
        <motion.div
          key={frame.id}
          className="absolute border border-purple-500/20 rounded-sm"
          style={{
            left: `${frame.x}%`,
            top: `${frame.y}%`,
            width: `${frame.size}px`,
            height: `${frame.size * 1.2}px`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.8, 1, 0.8],
            y: [0, -30, 0],
          }}
          transition={{
            duration: frame.duration,
            delay: frame.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 border border-cyan-500/10 rounded-sm m-2" />
        </motion.div>
      ))}

      {/* Spotlight beams */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-purple-500/20 via-purple-500/5 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleY: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-transparent"
        animate={{
          opacity: [0.6, 0.3, 0.6],
          scaleY: [1, 0.8, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -60],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default GalleryBackground;
