import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SoftwareEntry } from '../../data/softwareData';

export interface SoftwareCardProps {
  software: SoftwareEntry;
  index: number;
  onClick?: (softwareId: string) => void; // Future filtering handler
}

/**
 * SoftwareCard Component
 * 
 * Displays an individual software entry with logo, name, version (conditional), 
 * and year last used (conditional). Styled with dark void aesthetic and glowing 
 * purple borders consistent with SkillBadge.
 * 
 * FUTURE FILTERING IMPLEMENTATION:
 * The onClick handler is prepared for future filtering functionality.
 * When implemented, clicking a software card should:
 * 1. Filter portfolio pieces by the software ID
 * 2. Navigate to a filtered view or highlight matching items
 * 3. Use the getPortfolioBySoftwareId helper from softwareData.ts
 * 
 * Example implementation:
 * const handleClick = () => {
 *   if (onClick) {
 *     onClick(software.id);
 *     // This will trigger filtering logic in parent component
 *     // Parent can then navigate to filtered portfolio view
 *   }
 * };
 */
const SoftwareCard: React.FC<SoftwareCardProps> = ({ 
  software, 
  index = 0,
  onClick
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Use Intersection Observer for lazy loading and animation
  useEffect(() => {
    if (!cardRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Stagger animation delay based on index
  const animationDelay = prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.6);

  // Handle click for future filtering
  const handleClick = () => {
    if (onClick) {
      onClick(software.id);
      // FUTURE: This will trigger filtering logic
      // Example: Filter portfolio pieces by software.id
      // Navigate to filtered view or highlight matching items
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Generate ARIA label
  const ariaLabel = `${software.name}${
    software.version ? `, version ${software.version}` : ''
  }${
    software.category === 'past' && software.yearLastUsed ? `, last used in ${software.yearLastUsed}` : ''
  }${
    software.category === 'main' ? ', currently in use' : ', retired software'
  }`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: animationDelay }}
      whileHover={!prefersReducedMotion ? { scale: 1.05, y: -4 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      data-software-id={software.id}
      className="software-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1.25rem',
        borderRadius: '1rem',
        backgroundColor: 'rgba(15, 15, 25, 0.8)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        backdropFilter: 'blur(10px)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.1)',
        outline: 'none',
      }}
    >
      {/* Neural pulse effect */}
      {!prefersReducedMotion && isInView && (
        <motion.div
          className="software-card-pulse"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: animationDelay,
          }}
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Hover glow effect */}
      <motion.div
        className="software-card-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.4) 0%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Focus indicator for keyboard navigation */}
      <style>
        {`
          .software-card:focus-visible {
            outline: 2px solid rgba(167, 139, 250, 0.8);
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2), 0 4px 15px rgba(139, 92, 246, 0.3);
          }
        `}
      </style>

      {/* Software Logo - Lazy loaded */}
      <div
        style={{
          width: '64px',
          height: '64px',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {isInView && !imageError && (
          <motion.img
            src={software.icon}
            alt={`${software.name} logo`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.4))',
            }}
          />
        )}
        
        {/* Fallback for missing/error images */}
        {(imageError || !isInView) && (
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'rgba(167, 139, 250, 0.9)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            {software.name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Loading spinner */}
        {isInView && !imageLoaded && !imageError && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              borderTopColor: 'rgba(167, 139, 250, 0.8)',
              borderRadius: '50%',
            }}
          />
        )}
      </div>

      {/* Software Name */}
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: 'rgba(226, 232, 240, 0.95)',
          textAlign: 'center',
          lineHeight: '1.4',
          marginBottom: '0.25rem',
          zIndex: 1,
        }}
      >
        {software.name}
      </h3>

      {/* Version Number (conditional - only for specific software like Blender) */}
      {software.version && (
        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'rgba(167, 139, 250, 0.8)',
            textAlign: 'center',
            marginBottom: '0.25rem',
            zIndex: 1,
          }}
        >
          v{software.version}
        </p>
      )}

      {/* Year Last Used (conditional - only for 'past' category) */}
      {software.category === 'past' && software.yearLastUsed && (
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: '400',
            color: 'rgba(148, 163, 184, 0.7)',
            textAlign: 'center',
            marginTop: '0.5rem',
            zIndex: 1,
          }}
        >
          Last used: {software.yearLastUsed}
        </p>
      )}
    </motion.div>
  );
};

export default SoftwareCard;
