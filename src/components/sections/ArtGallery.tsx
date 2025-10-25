import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { artworks } from '../../data/artworks';
import ArtPieceCard from '../ui/ArtPieceCard';
import Lightbox from '../ui/Lightbox';

const ArtGallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);

  const handleArtworkClick = (index: number) => {
    setSelectedArtwork(index);
  };

  const handleCloseLightbox = () => {
    setSelectedArtwork(null);
  };

  const currentArtwork = selectedArtwork !== null ? artworks[selectedArtwork] : null;

  return (
    <section id="art-gallery" className="section" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            artworks.map((artwork, index) => (
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
      </div>

      {/* Lightbox for full-size viewing */}
      {currentArtwork && (
        <Lightbox
          isOpen={selectedArtwork !== null}
          onClose={handleCloseLightbox}
          imageSrc={currentArtwork.fullImage || currentArtwork.image}
          imageAlt={currentArtwork.title}
          title={`${currentArtwork.title} - ${currentArtwork.medium}`}
        />
      )}
    </section>
  );
};

export default ArtGallery;
