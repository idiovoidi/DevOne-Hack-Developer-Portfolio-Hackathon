import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/skills';
import SkillBadge from '../ui/SkillBadge';
import NeuralBackground from '../ui/NeuralBackground';
import { useInView } from '../../hooks';

const Skills: React.FC = () => {
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.1 });

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Animation variants for category groups
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
    <section id="skills" className="section relative" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Neural Brain Background */}
      <NeuralBackground />
      
      <div className="container-custom relative z-10">
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
              🧠
            </motion.div>
            <h2 className="section-heading bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              Skills & Technologies
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
              🧠
            </motion.div>
          </div>
          <p className="section-subheading max-w-2xl mx-auto">
            Neural pathways of technical expertise - where knowledge connects and evolves
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <motion.div
          ref={skillsRef}
          variants={containerVariants}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
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
