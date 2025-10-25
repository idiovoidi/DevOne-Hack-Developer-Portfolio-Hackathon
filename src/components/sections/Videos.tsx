import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaYoutube } from "react-icons/fa";
import { TextEffect } from "../ui";
import { CRTEffect } from "../ui/CRTEffect";

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
  {
    id: "dkI2rrzEIhQ",
    url: "https://www.youtube.com/watch?v=dkI2rrzEIhQ",
    title: "Video 2",
  },
  {
    id: "nyYRJY9G-as",
    url: "https://www.youtube.com/watch?v=nyYRJY9G-as",
    title: "Video 3",
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
      className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* CRT Film Effect Background */}
      <CRTEffect />

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
                  "linear-gradient(90deg, transparent, #FF0000 30%, #CC0000 70%, transparent)",
                boxShadow: "0 0 6px #FF0000",
                opacity: 0.4,
              }}
            />
            <TextEffect
              effect="glitch"
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FF0000, #CC0000, #FF0000)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "0 0 15px rgba(255, 0, 0, 0.4), 0 0 30px rgba(204, 0, 0, 0.3)",
              }}
            >
              VIÐɆ0
            </TextEffect>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <TextEffect
              effect="flicker"
              className="font-bold"
              style={{
                color: "#FF0000",
                textShadow: "0 0 8px #FF0000, 0 0 15px rgba(255, 0, 0, 0.5)",
              }}
            >
              Transmissions from the void
            </TextEffect>
          </p>
        </motion.div>

        {/* YouTube Embeds Grid */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto mb-12">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-red-500/20 hover:border-red-500/50 transition-all duration-300">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
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

        {/* View All Videos Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://www.youtube.com/@idiovoidi/featured"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300 group"
            style={{
              boxShadow: "0 0 20px rgba(255, 0, 0, 0.1)",
            }}
          >
            <FaYoutube className="text-xl group-hover:scale-110 transition-transform" />
            <span className="font-medium">View All Videos</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
