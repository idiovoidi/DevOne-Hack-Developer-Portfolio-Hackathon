import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/skills';
import SkillBadge from '../ui/SkillBadge';

const Skills: React.FC = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for category groups
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="skills" className="section" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          {skillsData.map((group) => (
            <motion.div
              key={group.name}
              variants={categoryVariants}
              className="skill-category"
            >
              {/* Category Title */}
              <h3
                className="text-2xl font-semibold mb-6"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {group.name}
              </h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={`${skill.name}-${skillIndex}`}
                    name={skill.name}
                    icon={skill.icon}
                    proficiency={skill.proficiency}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
