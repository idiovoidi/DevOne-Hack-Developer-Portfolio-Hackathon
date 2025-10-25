import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArtPiece } from "../../data/artworks";

export interface ArtPieceCardProps {
  artwork: ArtPiece;
  index: number;
  onClick: () => void;
}

const ArtPieceCard: React.FC<ArtPieceCardProps> = ({
  artwork,
  index,
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${artwork.title} in full size`}
    >
      {/* Outer holographic frame */}
      <div className="relative p-1 bg-gradient-to-br from-purple-500/30 via-cyan-500/30 to-pink-500/30 rounded-sm">
        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 group-hover:border-purple-400 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 group-hover:border-purple-400 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 group-hover:border-purple-400 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 group-hover:border-purple-400 transition-colors duration-300" />

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100"
          animate={isHovered ? {
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.5)",
              "0 0 30px rgba(6, 182, 212, 0.5)",
              "0 0 20px rgba(139, 92, 246, 0.5)",
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Inner frame */}
        <div className="relative bg-black/80 backdrop-blur-sm rounded-sm overflow-hidden">
          {/* Scanning line effect */}
          {isHovered && (
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Image Container */}
          <div className="relative w-full aspect-square overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={artwork.image}
              alt={artwork.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Info panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={isHovered ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent p-4 border-t border-cyan-500/30"
            >
              {/* Title with glow */}
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                {artwork.title}
              </h3>
              
              {/* Medium */}
              <p className="text-cyan-300 text-sm mb-2 font-mono">{artwork.medium}</p>
              
              {/* Tools badges */}
              <div className="flex flex-wrap gap-1">
                {artwork.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-purple-200 font-mono"
                  >
                    {tool}
                  </span>
                ))}
                {artwork.tools.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-200 font-mono">
                    +{artwork.tools.length - 3}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Status indicator */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 0.8, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-cyan-400 font-mono">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtPieceCard;
