import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VoidEyeball: React.FC = () => {
  // Smooth spring animation for eye movement
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
      
      // Limit movement range (max 15% of iris size)
      const maxMove = 15;
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
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          width: '800px',
          height: '500px',
          pointerEvents: 'none',
        }}
      >
        {/* Eyeball container */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Eye white */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, rgba(200, 200, 220, 0.3), rgba(150, 150, 180, 0.2))',
              boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.3), 0 0 100px rgba(139, 92, 246, 0.2)',
            }}
          />

          {/* Iris - follows cursor */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, rgba(139, 92, 246, 0.6), rgba(88, 28, 135, 0.8), rgba(59, 7, 100, 0.9))',
              boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
              x: eyeXSpring,
              y: eyeYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            {/* Iris details */}
            <div
              style={{
                position: 'absolute',
                inset: '10%',
                borderRadius: '50%',
                background: 'repeating-radial-gradient(circle at 40% 40%, transparent, transparent 10px, rgba(167, 139, 250, 0.2) 10px, rgba(167, 139, 250, 0.2) 12px)',
              }}
            />
          </motion.div>

          {/* Pupil - follows cursor */}
          <motion.div
            animate={{
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '25%',
              height: '25%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(50, 50, 80, 0.9), rgba(0, 0, 0, 1))',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
              x: eyeXSpring,
              y: eyeYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            {/* Light reflection */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '30%',
                height: '30%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)',
              }}
            />
          </motion.div>

          {/* Highlight/shine */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '20%',
              width: '35%',
              height: '35%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 60%)',
              filter: 'blur(20px)',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VoidEyeball;
