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
            const width = 30 + i * 8;
            const height = 2 + (i % 3);
            const angle = (i / 7) * 360;
            const xOffset = i % 2 === 0 ? 10 : -10;

            return (
              <motion.div
                key={`artifact-${i}`}
                animate={{
                  opacity: [0, 0.6, 0],
                  scaleX: [0, 1, 0],
                  x: [0, xOffset],
                }}
                transition={{
                  duration: 0.4 + i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                  repeatDelay: 2.5 + i * 0.3,
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
