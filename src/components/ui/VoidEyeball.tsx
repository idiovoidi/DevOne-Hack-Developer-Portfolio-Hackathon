import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VoidEyeball: React.FC = () => {
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

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 0.35,
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
          {/* Floating void particles */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const distance = 120 + (i % 4) * 40;
            const size = 2 + (i % 3);
            const isSquare = i % 4 === 0;

            return (
              <motion.div
                key={`particle-${i}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: isSquare ? "0%" : "50%",
                  background: `rgba(${
                    i % 2 === 0 ? "167, 139, 250" : "236, 72, 153"
                  }, ${0.7 + (i % 3) * 0.1})`,
                  boxShadow: `0 0 ${
                    8 + (i % 3) * 4
                  }px rgba(167, 139, 250, 0.8)`,
                }}
                animate={{
                  x: [
                    Math.cos(angle) * distance,
                    Math.cos(angle + Math.PI * 0.5) * (distance * 0.6),
                    Math.cos(angle + Math.PI) * (distance * 0.4),
                  ],
                  y: [
                    Math.sin(angle) * distance,
                    Math.sin(angle + Math.PI * 0.5) * (distance * 0.6),
                    Math.sin(angle + Math.PI) * (distance * 0.4),
                  ],
                  scale: [1, 0.6, 0.2],
                  opacity: [0.8, 0.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + (i % 3) * 2,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: (i * 0.15) % 3,
                }}
              />
            );
          })}

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
