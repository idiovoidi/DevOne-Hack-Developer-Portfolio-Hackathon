import React, { useState } from "react";
import { motion } from "framer-motion";
import { artworks } from "../../data/artworks";
import ArtPieceCard from "../ui/ArtPieceCard";
import Lightbox from "../ui/Lightbox";
import { useInView } from "../../hooks";

const ArtGallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
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
    setVisibleCount((prev) => prev + 6);
  };

  const currentArtwork =
    selectedArtwork !== null ? artworks[selectedArtwork] : null;
  
  const visibleArtworks = artworks.slice(0, visibleCount);
  const hasMore = visibleCount < artworks.length;

  return (
    <section
      id="art-gallery"
      className="section"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">Art Gallery</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            A showcase of digital art, 3D models, and design work
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
            className="text-center mt-8"
          >
            <button
              onClick={handleLoadMore}
              className="group flex items-center justify-center gap-4 mx-auto px-8 py-4 bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/30 hover:border-accent-primary rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              aria-label="Load more artworks"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary group-hover:to-accent-secondary transition-colors duration-300"></div>
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                👁️
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary group-hover:to-accent-secondary transition-colors duration-300"></div>
            </button>
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
