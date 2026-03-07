import React from 'react';
import { motion } from 'framer-motion';
import { getActiveCategories, getSoftwareByCategory } from '../../data/softwareData';
import SoftwareCard from '../ui/SoftwareCard';
import { useInView } from '../../hooks';

/**
 * SoftwareExperience Section Component
 * 
 * Displays software tools and technologies organized by category.
 * Implements scroll-triggered animations with staggered category groups.
 * 
 * Layout:
 * - Responsive grid: 1 column (mobile <768px), 2 columns (tablet 768-1024px), 3 columns (desktop ≥1024px)
 * - Maximum content width: 1280px
 * - Categories rendered in order defined in categoryConfig
 * 
 * Styling:
 * - Dark void aesthetic with glowing purple accents
 * - Consistent with existing portfolio sections (Skills, Projects)
 * - Scroll-triggered animations using Framer Motion and useInView hook
 * 
 * Future Enhancement:
 * - onClick handler can be added to enable filtering of portfolio pieces by software
 */
const SoftwareExperience: React.FC = () => {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.2 });

  // Get all active categories sorted by display order
  const categories = getActiveCategories();

  // Animation variants for category containers
  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section 
      id="software-experience" 
      className="section relative" 
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="container-custom relative z-10" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-5xl"
            >
              🛠️
            </motion.div>
            <h2 className="section-heading bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              Software Experience
            </h2>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="text-5xl"
            >
              🛠️
            </motion.div>
          </div>
          <p className="section-subheading max-w-2xl mx-auto">
            Tools and technologies that power my creative journey across music, design, development, and more
          </p>
        </motion.div>

        {/* Render each category */}
        {categories.map(({ category, title }, categoryIndex) => {
          const software = getSoftwareByCategory(category);
          
          if (software.length === 0) return null;

          return (
            <CategorySection
              key={category}
              title={title}
              software={software}
              categoryIndex={categoryIndex}
              categoryVariants={categoryVariants}
            />
          );
        })}
      </div>
    </section>
  );
};

// Separate component for each category section to manage individual inView state
interface CategorySectionProps {
  title: string;
  software: any[];
  categoryIndex: number;
  categoryVariants: any;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  software, 
  categoryIndex,
  categoryVariants 
}) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={categoryVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={categoryIndex < getActiveCategories().length - 1 ? "mb-16" : ""}
    >
      {/* Category Title */}
      <h3
        className="text-2xl font-semibold mb-6"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {title}
      </h3>

      {/* Software Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {software.map((item, index) => (
          <SoftwareCard
            key={item.id}
            software={item}
            index={index}
            // Future: Add onClick handler for filtering
            // onClick={(softwareId) => handleSoftwareClick(softwareId)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SoftwareExperience;
