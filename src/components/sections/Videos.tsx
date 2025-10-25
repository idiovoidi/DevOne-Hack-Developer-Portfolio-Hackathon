import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TextEffect } from "../ui";

/**
 * Videos Section Component
 *
 * Displays YouTube video embeds
 */

interface VideoEmbed {
  id: string;
  url: string;
  title?: string;
}

const videos: VideoEmbed[] = [
  {
    id: "XZNmMa9m4jI",
    url: "https://www.youtube.com/watch?v=XZNmMa9m4jI",
    title: "Featured Video",
  },
];

export const Videos = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="videos"
      className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <TextEffect
            effect="glitch"
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
          >
            VIÐɆ0
          </TextEffect>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <TextEffect effect="flicker" className="font-bold text-orange-400">
              Transmissions from the void
            </TextEffect>
          </p>
        </motion.div>

        {/* YouTube Embeds Grid */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    title={video.title || `YouTube video ${index + 1}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
