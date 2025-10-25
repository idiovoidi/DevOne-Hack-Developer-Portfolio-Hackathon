import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { ProjectCard } from '../ui';
import { useInView } from '../../hooks';
import { usePerformance } from '../../contexts/PerformanceContext';

type CategoryFilter = 'all' | 'development' | 'game' | 'art' | 'design';

const categories: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'development', label: 'Development' },
  { value: 'game', label: 'Games' },
  { value: 'art', label: 'Art' },
  { value: 'design', label: 'Design' },
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: filtersRef, inView: filtersInView } = useInView({ threshold: 0.2 });
  const { settings } = usePerformance();

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Projects</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A collection of my work spanning web development, interactive games, and creative design
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          ref={filtersRef}
          initial={{ opacity: 0, y: 30 }}
          animate={filtersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 
                ${
                  activeCategory === category.value
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-background text-text-secondary hover:bg-primary hover:bg-opacity-10 hover:text-primary'
                }`}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={activeCategory === category.value}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                disableTilt={!settings.enableTiltEffect}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-text-secondary text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
