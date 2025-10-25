import React from 'react';
import { motion } from 'framer-motion';
import * as SimpleIcons from 'react-icons/si';

export interface SkillBadgeProps {
  name: string;
  icon?: string;
  proficiency?: number;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  name, 
  icon, 
  proficiency, 
  className = '' 
}) => {
  // Dynamically get the icon component from react-icons/si
  const IconComponent = icon ? (SimpleIcons as any)[icon] : null;

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`skill-badge ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem 1rem',
        borderRadius: '1rem',
        backgroundColor: 'rgba(15, 15, 25, 0.8)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        backdropFilter: 'blur(10px)',
        cursor: 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.1)',
      }}
    >
      {/* Neural pulse effect */}
      <motion.div
        className="skill-badge-pulse"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hover glow effect */}
      <motion.div
        className="skill-badge-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.3) 0%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      {IconComponent && (
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '2.5rem',
            marginBottom: '0.75rem',
            color: 'rgba(167, 139, 250, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))',
          }}
        >
          <IconComponent />
        </motion.div>
      )}

      {/* Skill Name */}
      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'rgba(226, 232, 240, 0.95)',
          textAlign: 'center',
          lineHeight: '1.3',
          zIndex: 1,
        }}
      >
        {name}
      </span>

      {/* Optional Proficiency Indicator - Neural synapse style */}
      {proficiency !== undefined && (
        <div
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3px',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.8) 0%, rgba(167, 139, 250, 1) 100%)',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)',
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SkillBadge;
