import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VoidEyeball: React.FC = () => {
  const [glitchTrigger, setGlitchTrigger] = useState(0);

  // Chaotic movement with jittery spring
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 200 };
  const eyeXSpring = useSpring(eyeX, springConfig);
  const eyeYSpring = useSpring(eyeY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      const maxMove = 20;
      eyeX.set(deltaX * maxMove);
      eyeY.set(deltaY * maxMove);
    };

    // Random glitch triggers
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchTrigger((prev) => prev + 1);
      }
    }, 2000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, [eyeX, eyeY]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <motion.div
        key={glitchTrigger}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 0.35,
          filter:
            glitchTrigger % 2 === 0 ? "hue-rotate(0deg)" : "hue-rotate(10deg)",
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        {/* Chaotic void container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Glitched fragmented arcs */}
          {[0, 1, 2, 3, 4].map((i) => {
            const size = 90 - i * 18;
            const rotation = i * 72;
            return (
              <motion.div
                key={`glitch-arc-${i}`}
                animate={{
                  rotate: [rotation, rotation + (i % 2 === 0 ? 360 : -360)],
                  opacity: [0.2, 0.5, 0.1, 0.4],
                }}
                transition={{
                  rotate: {
                    duration: 20 - i * 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: `${size}%`,
                  height: `${size}%`,
                  borderRadius: "50%",
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    rgba(124, 58, 237, 0.3) 30deg,
                    transparent 60deg,
                    transparent 120deg,
                    rgba(167, 139, 250, 0.25) 150deg,
                    transparent 180deg,
                    transparent 240deg,
                    rgba(124, 58, 237, 0.2) 270deg,
                    transparent 300deg
                  )`,
                  filter: `blur(${3 + i * 2}px)`,
                  mixBlendMode: "screen",
                }}
              />
            );
          })}

          {/* Corrupted data particles */}
          {Array.from({ length: 50 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const isSquare = i % 3 === 0;

            return (
              <motion.div
                key={`corrupt-${i}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  borderRadius: isSquare ? "0%" : "50%",
                  background: `rgba(${
                    i % 2 === 0 ? "167, 139, 250" : "236, 72, 153"
                  }, ${0.7 + Math.random() * 0.3})`,
                  boxShadow: `0 0 ${
                    8 + Math.random() * 8
                  }px rgba(167, 139, 250, 0.8)`,
                }}
                animate={{
                  x: [
                    Math.cos(angle) * distance,
                    Math.cos(angle + Math.PI * 0.5) * (distance * 0.5),
                    Math.cos(angle + Math.PI) * (distance * 0.3),
                  ],
                  y: [
                    Math.sin(angle) * distance,
                    Math.sin(angle + Math.PI * 0.5) * (distance * 0.5),
                    Math.sin(angle + Math.PI) * (distance * 0.3),
                  ],
                  scale: [1, 0.5, 0],
                  opacity: [0.8, 0.4, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: Math.random() * 2,
                }}
              />
            );
          })}

          {/* Glitch scan lines */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`scanline-${i}`}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
                rotate: i * 45,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.8), transparent)",
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Chaotic void core with RGB split */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "30%",
              height: "30%",
              borderRadius: "50%",
              x: eyeXSpring,
              y: eyeYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* RGB chromatic aberration layers */}
            {[
              { color: "rgba(255, 0, 100, 0.3)", offset: -3 },
              { color: "rgba(0, 255, 255, 0.3)", offset: 3 },
              { color: "rgba(0, 0, 0, 0.9)", offset: 0 },
            ].map((layer, idx) => (
              <motion.div
                key={`rgb-${idx}`}
                animate={{
                  x: [layer.offset, -layer.offset, layer.offset],
                  y: [layer.offset, layer.offset, -layer.offset],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
                  boxShadow:
                    idx === 2
                      ? "inset 0 0 60px rgba(0, 0, 0, 1), 0 0 80px rgba(124, 58, 237, 0.6)"
                      : "none",
                }}
              />
            ))}

            {/* Unstable core pulse */}
            <motion.div
              animate={{
                scale: [1, 1.4, 0.9, 1.2, 1],
                opacity: [0.8, 1, 0.6, 1, 0.8],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: "20%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167, 139, 250, 0.9) 0%, rgba(124, 58, 237, 0.5) 40%, transparent 70%)",
                filter: "blur(12px)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>

          {/* Digital corruption artifacts */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const width = 20 + Math.random() * 60;
            const height = 2 + Math.random() * 4;
            const angle = (i / 7) * 360;

            return (
              <motion.div
                key={`artifact-${i}`}
                animate={{
                  opacity: [0, 0.6, 0],
                  scaleX: [0, 1, 0],
                  x: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: 0.3 + Math.random() * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                  repeatDelay: 2 + Math.random() * 3,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${width}px`,
                  height: `${height}px`,
                  background: `linear-gradient(90deg, 
                    transparent, 
                    rgba(${
                      i % 2 === 0 ? "167, 139, 250" : "236, 72, 153"
                    }, 0.8), 
                    transparent
                  )`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${
                    80 + i * 20
                  }px)`,
                  filter: "blur(1px)",
                }}
              />
            );
          })}

          {/* Distortion field with noise */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: "-50%",
              borderRadius: "50%",
              background: `
                radial-gradient(
                  circle,
                  transparent 30%,
                  rgba(124, 58, 237, 0.15) 50%,
                  rgba(167, 139, 250, 0.2) 70%,
                  rgba(236, 72, 153, 0.1) 85%,
                  transparent 100%
                )
              `,
              filter: "blur(60px) contrast(1.3)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default VoidEyeball;
