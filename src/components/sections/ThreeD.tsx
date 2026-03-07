import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TextEffect } from "../ui";

/**
 * 3D Section Component
 *
 * Displays 3D work and models
 */

interface ThreeDWork {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  category?: string;
}

// Placeholder data - replace with your actual 3D work
const threeDWorks: ThreeDWork[] = [
  {
    id: "placeholder-1",
    title: "3D Model 1",
    description: "Coming soon",
    thumbnail: "/projects/placeholder.svg",
    category: "Model",
  },
  {
    id: "placeholder-2",
    title: "3D Model 2",
    description: "Coming soon",
    thumbnail: "/projects/placeholder.svg",
    category: "Scene",
  },
  {
    id: "placeholder-3",
    title: "3D Model 3",
    description: "Coming soon",
    thumbnail: "/projects/placeholder.svg",
    category: "Animation",
  },
];

export const ThreeD = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="three-d"
      className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            {/* Void connection indicator */}
            <div
              className="absolute -top-3 left-0 right-0 h-[2px] rounded-full mx-auto"
              style={{
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, #00D9FF 30%, #0099CC 70%, transparent)",
                boxShadow: "0 0 6px #00D9FF",
                opacity: 0.4,
              }}
            />
            <TextEffect
              effect="glitch"
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00D9FF, #0099CC, #00D9FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "0 0 15px rgba(0, 217, 255, 0.4), 0 0 30px rgba(0, 153, 204, 0.3)",
              }}
            >
              3Ð W0RKS
            </TextEffect>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <TextEffect
              effect="flicker"
              className="font-bold"
              style={{
                color: "#00D9FF",
                textShadow: "0 0 8px #00D9FF, 0 0 15px rgba(0, 217, 255, 0.5)",
              }}
            >
              Dimensional creations from the void
            </TextEffect>
          </p>
        </motion.div>

        {/* 3D Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {threeDWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-sm text-gray-300">{work.description}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    {work.title}
                  </h3>
                  {work.category && (
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {work.category}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-500 italic">
            More 3D works coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
};
