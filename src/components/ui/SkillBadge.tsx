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
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`skill-badge ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem 1rem',
        borderRadius: '0.75rem',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        cursor: 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="skill-badge-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Icon */}
      {IconComponent && (
        <div
          style={{
            fontSize: '2.5rem',
            marginBottom: '0.75rem',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconComponent />
        </div>
      )}

      {/* Skill Name */}
      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--color-text-primary)',
          textAlign: 'center',
          lineHeight: '1.3',
          zIndex: 1,
        }}
      >
        {name}
      </span>

      {/* Optional Proficiency Indicator */}
      {proficiency !== undefined && (
        <div
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '3px',
            backgroundColor: 'var(--color-border)',
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
              backgroundColor: 'var(--color-primary)',
              borderRadius: '2px',
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SkillBadge;
