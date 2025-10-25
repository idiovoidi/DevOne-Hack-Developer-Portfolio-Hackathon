import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaGamepad } from 'react-icons/fa';
import { Project } from '../../data/projects';
import SkillBadge from './SkillBadge';
import EmbeddedDemo from './EmbeddedDemo';
import Button from './Button';

export interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePlayDemo = () => {
    if (project.embedUrl) {
      setIsEmbedOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-surface rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-background">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
          >
            <div className="flex gap-2 mb-2">
              {project.embedUrl && (
                <Button
                  variant="primary"
                  size="small"
                  onClick={handlePlayDemo}
                  aria-label={`Play ${project.title} demo`}
                  className="flex items-center gap-2"
                >
                  <FaGamepad size={16} />
                  <span>Play Demo</span>
                </Button>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="secondary"
                    size="small"
                    aria-label={`View ${project.title} live demo`}
                    className="flex items-center gap-2"
                  >
                    <FaExternalLinkAlt size={14} />
                    <span>View Demo</span>
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="small"
                    aria-label={`View ${project.title} source code`}
                    className="flex items-center gap-2 bg-black bg-opacity-50 hover:bg-opacity-70"
                  >
                    <FaGithub size={16} />
                    <span>Code</span>
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <SkillBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Embedded Demo Modal */}
      {project.embedUrl && (
        <EmbeddedDemo
          isOpen={isEmbedOpen}
          onClose={() => setIsEmbedOpen(false)}
          embedUrl={project.embedUrl}
          title={project.title}
          aspectRatio="16:9"
        />
      )}
    </>
  );
};

export default ProjectCard;
