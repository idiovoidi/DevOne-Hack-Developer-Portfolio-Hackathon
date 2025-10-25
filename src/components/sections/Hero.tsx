import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { FiChevronDown } from 'react-icons/fi';

export const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        className="container-custom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: 'center',
          maxWidth: '900px',
        }}
      >
        {/* Name with glitch effect */}
        <motion.h1
          variants={itemVariants}
          className="glitch-text text-gradient"
          data-text={personalInfo.name}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontFamily: 'var(--font-glitch)',
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: '1.2',
          }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Title with fade-in animation */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            fontWeight: '600',
            color: 'var(--color-text-primary)',
            marginBottom: '1.5rem',
          }}
        >
          {personalInfo.title}
        </motion.h2>

        {/* Tagline with staggered animation */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-text-secondary)',
            marginBottom: '3rem',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
          }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection('projects')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.125rem',
            }}
          >
            View Projects
          </button>
          <button
            className="btn btn-outline"
            onClick={() => scrollToSection('contact')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.125rem',
            }}
          >
            Contact Me
          </button>
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
        }}
        onClick={() => scrollToSection('projects')}
      >
        <FiChevronDown
          size={32}
          style={{
            color: 'var(--color-text-secondary)',
          }}
        />
      </motion.div>
    </section>
  );
};
