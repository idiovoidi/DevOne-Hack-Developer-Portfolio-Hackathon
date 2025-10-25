import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArtPiece } from '../../data/artworks';

export interface ArtPieceCardProps {
  artwork: ArtPiece;
  index: number;
  onClick: () => void;
}

const ArtPieceCard: React.FC<ArtPieceCardProps> = ({ artwork, index, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${artwork.title} in full size`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-background">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg mb-1">{artwork.title}</h3>
          <p className="text-gray-300 text-sm mb-2">{artwork.medium}</p>
          <div className="flex flex-wrap gap-1">
            {artwork.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full text-white"
              >
                {tool}
              </span>
            ))}
            {artwork.tools.length > 3 && (
              <span className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full text-white">
                +{artwork.tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtPieceCard;
