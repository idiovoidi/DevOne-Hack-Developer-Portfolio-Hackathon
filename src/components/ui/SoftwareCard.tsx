import React from 'react';
import { motion } from 'framer-motion';
import type { SoftwareEntry } from '../../data/softwareData';
import SkillBadge from './SkillBadge';

export interface SoftwareCardProps {
  software: SoftwareEntry;
  index: number;
  onClick?: (softwareId: string) => void; // Future filtering handler
}

/**
 * SoftwareCard Component
 * 
 * Wraps SkillBadge to display software entries with additional metadata
 * (version, year last used). Reuses the existing SkillBadge styling and
 * icon system from react-icons/si.
 * 
 * FUTURE FILTERING IMPLEMENTATION:
 * The onClick handler is prepared for future filtering functionality.
 * When implemented, clicking a software card should:
 * 1. Filter portfolio pieces by the software ID
 * 2. Navigate to a filtered view or highlight matching items
 * 3. Use the getPortfolioBySoftwareId helper from softwareData.ts
 */
const SoftwareCard: React.FC<SoftwareCardProps> = ({ 
  software, 
  index = 0,
  onClick
}) => {
  // Handle click for future filtering
  const handleClick = () => {
    if (onClick) {
      onClick(software.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          handleClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-software-id={software.id}
      className="software-card"
      style={{
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      {/* Reuse SkillBadge for consistent styling */}
      <SkillBadge
        name={software.name}
        icon={software.icon}
        index={index}
      />

      {/* Additional metadata overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Version Number (conditional) */}
        {software.version && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.03 }}
            style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              color: 'rgba(167, 139, 250, 0.9)',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            v{software.version}
          </motion.span>
        )}

        {/* Year Last Used (conditional - only for 'past' category) */}
        {software.category === 'past' && software.yearLastUsed && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.03 }}
            style={{
              fontSize: '0.7rem',
              fontWeight: '400',
              color: 'rgba(148, 163, 184, 0.8)',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Last used: {software.yearLastUsed}
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default SoftwareCard;
