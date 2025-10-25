import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VoidEyeball: React.FC = () => {
  // Smooth spring animation for vortex movement
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const eyeXSpring = useSpring(eyeX, springConfig);
  const eyeYSpring = useSpring(eyeY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized to -1 to 1)
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      
      // Limit movement range
      const maxMove = 20;
      eyeX.set(deltaX * maxMove);
      eyeY.set(deltaY * maxMove);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeX, eyeY]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          width: '600px',
          height: '600px',
          pointerEvents: 'none',
          position: 'relative',
        }}
      >
        {/* Vortex container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Outer vortex rings - rotating */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`ring-${i}`}
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: {
                  duration: 20 - i * 3,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${100 - i * 15}%`,
                height: `${100 - i * 15}%`,
                borderRadius: '50%',
                border: `${2 - i * 0.3}px solid rgba(139, 92, 246, ${0.3 - i * 0.05})`,
                boxShadow: `0 0 ${30 - i * 5}px rgba(139, 92, 246, ${0.4 - i * 0.06})`,
              }}
            />
          ))}

          {/* Swirling particles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 40 + (i % 3) * 30;
            return (
              <motion.div
                key={`particle-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: `rgba(167, 139, 250, ${0.6 - (i % 5) * 0.1})`,
                  boxShadow: '0 0 8px rgba(167, 139, 250, 0.8)',
                }}
                animate={{
                  x: [
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI * 2) * radius,
                  ],
                  y: [
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI * 2) * radius,
                  ],
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 8 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            );
          })}

          {/* Central void/pupil - follows cursor */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '35%',
              height: '35%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(20, 10, 40, 0.8) 40%, transparent 100%)',
              boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(88, 28, 135, 0.5)',
              x: eyeXSpring,
              y: eyeYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            {/* Inner void glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: 'absolute',
                inset: '20%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(88, 28, 135, 0.6) 0%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />
          </motion.div>

          {/* Spiral arms */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
              </linearGradient>
            </defs>
            
            {[0, 1, 2].map((i) => (
              <motion.path
                key={`spiral-${i}`}
                d={`M 300 300 Q ${250 + i * 30} ${200 - i * 20}, ${200 + i * 40} ${150 - i * 10} Q ${150 + i * 30} ${100 - i * 10}, ${100 + i * 20} ${80 - i * 5}`}
                stroke="url(#spiralGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, rotate: i * 120 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  rotate: i * 120 + 360,
                }}
                transition={{
                  pathLength: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{
                  transformOrigin: '300px 300px',
                }}
              />
            ))}
          </svg>

          {/* Outer glow/atmosphere */}
          <div
            style={{
              position: 'absolute',
              inset: '-20%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, transparent 40%, rgba(88, 28, 135, 0.15) 60%, rgba(139, 92, 246, 0.1) 80%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default VoidEyeball;
