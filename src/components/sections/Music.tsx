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
      className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-background-secondary)" }}
    >
      {/* Pulsing Beats Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Beat circles - different sizes and speeds */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            animation: 'musicPulse 2s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
            animation: 'musicPulse 2.5s ease-in-out infinite 0.3s',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            animation: 'musicPulse 3s ease-in-out infinite 0.6s',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)',
            animation: 'musicPulse 2.2s ease-in-out infinite 0.9s',
          }}
        />
        
        {/* Soundwave lines */}
        <div className="absolute left-0 top-1/2 w-full h-1 opacity-10">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            style={{
              animation: 'soundwave 4s ease-in-out infinite',
            }}
          />
        </div>
        <div className="absolute left-0 top-1/3 w-full h-1 opacity-10">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
            style={{
              animation: 'soundwave 3.5s ease-in-out infinite 0.5s',
            }}
          />
        </div>
        <div className="absolute left-0 top-2/3 w-full h-1 opacity-10">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            style={{
              animation: 'soundwave 4.5s ease-in-out infinite 1s',
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mb-12">
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

        {/* View All Music Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://open.spotify.com/artist/1haA9Lfr8e35mJlalAbPFz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            View All Music on Spotify
          </a>
        </motion.div>
      </div>
    </section>
  );
};
