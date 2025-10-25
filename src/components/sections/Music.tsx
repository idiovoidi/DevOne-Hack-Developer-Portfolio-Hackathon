import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TextEffect } from "../ui";

/**
 * Music Section Component
 *
 * Displays Spotify embeds of featured tracks
 */

interface SpotifyTrack {
  id: string;
  url: string;
  title?: string;
}

const spotifyTracks: SpotifyTrack[] = [
  {
    id: "1G1lhf2zGBSr6EPjEur2Zc",
    url: "https://open.spotify.com/track/1G1lhf2zGBSr6EPjEur2Zc",
  },
  {
    id: "5rpU8Ytpkb3r3lshsElyZX",
    url: "https://open.spotify.com/track/5rpU8Ytpkb3r3lshsElyZX",
  },
  {
    id: "6c3VWJKzKt0oQ3ORm2dem6",
    url: "https://open.spotify.com/track/6c3VWJKzKt0oQ3ORm2dem6",
  },
];

export const Music = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="music"
      className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background-secondary)" }}
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
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            MUSIC
          </TextEffect>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Sounds from the{" "}
            <TextEffect effect="flicker" className="font-bold text-purple-400">
              void
            </TextEffect>
          </p>
        </motion.div>

        {/* Spotify Embeds Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {spotifyTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                  title={`Spotify track ${index + 1}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
