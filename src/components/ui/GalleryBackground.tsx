import React from "react";
import { motion } from "framer-motion";

const GalleryBackground: React.FC = () => {
  // Generate organic void elements
  const voidClouds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 200 + Math.random() * 300,
    delay: Math.random() * 3,
    duration: 20 + Math.random() * 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* CSS-based noise/grain texture */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(88, 28, 135, 0.03) 2px,
              rgba(88, 28, 135, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(68, 64, 60, 0.03) 2px,
              rgba(68, 64, 60, 0.03) 4px
            )
          `,
          backgroundSize: '4px 4px',
          filter: 'contrast(1.2) brightness(0.9)',
        }}
      />

      {/* Organic gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-stone-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-stone-950/15" />
      
      {/* Floating void clouds */}
      {voidClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size}px`,
            background: `radial-gradient(circle, rgba(88, 28, 135, 0.15) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle cosmic dust particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-px h-px bg-purple-300/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 2px rgba(216, 180, 254, 0.3)',
          }}
          animate={{
            y: [0, -40, -80],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Organic light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full opacity-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(88, 28, 135, 0.3) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/3 w-px h-full opacity-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(120, 113, 108, 0.2) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />

      {/* Subtle texture overlay using SVG filter simulation */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(88, 28, 135, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(68, 64, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(88, 28, 135, 0.08) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
};

export default GalleryBackground;
