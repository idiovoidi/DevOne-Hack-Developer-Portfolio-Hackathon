import React, { useState } from "react";
import { motion } from "framer-motion";
import { artworks } from "../../data/artworks";
import ArtPieceCard from "../ui/ArtPieceCard";
import Lightbox from "../ui/Lightbox";
import GlitchText from "../ui/GlitchText";
import GalleryBackground from "../ui/GalleryBackground";
import { useInView } from "../../hooks";

const ArtGallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
  });

  const handleArtworkClick = (index: number) => {
    setSelectedArtwork(index);
  };

  const handleCloseLightbox = () => {
    setSelectedArtwork(null);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const currentArtwork =
    selectedArtwork !== null ? artworks[selectedArtwork] : null;

  const visibleArtworks = artworks.slice(0, visibleCount);
  const hasMore = visibleCount < artworks.length;

  return (
    <section
      id="art-gallery"
      className="section relative"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Animated Background */}
      <GalleryBackground />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            {/* Void connection indicator */}
            <div
              className="absolute -top-3 left-0 right-0 h-[2px] rounded-full mx-auto"
              style={{
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, var(--color-primary) 30%, var(--color-accent) 70%, transparent)",
                boxShadow: "0 0 6px var(--color-primary)",
                opacity: 0.4,
              }}
            />
            <GlitchText text="Art Gallery" />
          </div>
          <p
            className="section-subheading max-w-2xl mx-auto"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            A showcase of my 2015 Photography / Photoshop artworks
          </p>
        </motion.div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.length > 0 ? (
            visibleArtworks.map((artwork, index) => (
              <ArtPieceCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onClick={() => handleArtworkClick(index)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-text-secondary text-lg">
                No artwork available at the moment.
              </p>
            </motion.div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mt-12"
          >
            <div className="relative inline-block">
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={
                  isButtonHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                }
                transition={{ duration: 0.2 }}
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-purple-900/95 border border-purple-500/50 rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-20"
              >
                <span className="text-purple-100 text-sm font-medium">
                  Oh yes, please click me 👁️👅👁️
                </span>
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-900 border-l border-t border-purple-500/50 rotate-45" />
              </motion.div>

              <motion.button
                onClick={handleLoadMore}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className="group relative mx-auto px-8 py-3 bg-linear-to-r from-purple-900/30 via-stone-900/40 to-purple-900/30 border-2 border-purple-500/30 rounded-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Load more artworks"
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Button content */}
                <div className="relative flex flex-col items-center justify-center gap-0.5">
                  {/* Eyes row */}
                  <div className="flex items-center gap-2">
                    {/* Left eye */}
                    <motion.div
                      className="text-2xl"
                      animate={{
                        rotateY: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      👁️
                    </motion.div>

                    {/* Text */}
                    <span
                      className="text-base font-light tracking-[0.2em] uppercase text-purple-200 group-hover:text-purple-100 transition-colors"
                      style={{
                        fontFamily: "'Courier New', monospace",
                        letterSpacing: "0.25em",
                      }}
                    >
                      Reveal More
                    </span>

                    {/* Right eye */}
                    <motion.div
                      className="text-2xl"
                      animate={{
                        rotateY: [360, 180, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      👁️
                    </motion.div>
                  </div>

                  {/* Mouth */}
                  <motion.div
                    className="text-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    👄
                  </motion.div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400/50 group-hover:border-pink-400/70 transition-colors" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400/50 group-hover:border-pink-400/70 transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400/50 group-hover:border-pink-400/70 transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400/50 group-hover:border-pink-400/70 transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox for full-size viewing */}
      {currentArtwork && (
        <Lightbox
          isOpen={selectedArtwork !== null}
          onClose={handleCloseLightbox}
          imageSrc={currentArtwork.fullImage || currentArtwork.image}
          imageAlt={currentArtwork.title}
          title={`${currentArtwork.title} - ${currentArtwork.medium}`}
          embedUrl={currentArtwork.embedUrl}
          nftUrl={currentArtwork.nftUrl}
        />
      )}
    </section>
  );
};

export default ArtGallery;
