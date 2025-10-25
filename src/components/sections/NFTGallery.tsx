import React, { useState } from "react";
import { motion } from "framer-motion";
import { nfts, nftCollections } from "../../data/nfts";
import NFTCard from "../ui/NFTCard";
import Lightbox from "../ui/Lightbox";
import { useInView } from "../../hooks";
import { FiExternalLink } from "react-icons/fi";

const NFTGallery: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
  });
  const { ref: collectionsRef, inView: collectionsInView } = useInView({
    threshold: 0.2,
  });

  const handleNFTClick = (index: number) => {
    setSelectedNFT(index);
  };

  const handleCloseLightbox = () => {
    setSelectedNFT(null);
  };

  const currentNFT = selectedNFT !== null ? nfts[selectedNFT] : null;

  return (
    <section
      id="nft-gallery"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 bg-clip-text text-transparent">
            NFT COLLECTION
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Featured:</span>
          </p>
        </motion.div>

        {/* Featured NFTs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {nfts.map((nft, index) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              index={index}
              onClick={() => handleNFTClick(index)}
            />
          ))}
        </div>

        {/* Collections Section */}
        <motion.div
          ref={collectionsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            collectionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-3xl font-bold" style={{ color: "#0d61ff" }}>
              ꜩ
            </span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
              Explore Full Collections
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nftCollections.map((collection, index) => (
              <motion.a
                key={collection.id}
                href={collection.collectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  collectionsInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.15)",
                }}
              >
                {/* Collection Cover */}
                <div className="relative aspect-square overflow-hidden bg-background">
                  <img
                    src={collection.coverImage}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-text-primary group-hover:text-purple-400 transition-colors duration-300">
                      {collection.name}
                    </h4>
                    <FiExternalLink
                      className="text-purple-400 shrink-0 ml-2"
                      size={20}
                    />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox for NFT viewing */}
      {currentNFT && (
        <Lightbox
          isOpen={selectedNFT !== null}
          onClose={handleCloseLightbox}
          imageSrc={currentNFT.image}
          imageAlt={currentNFT.title}
          title={`${currentNFT.title} - ${currentNFT.collection}`}
          embedUrl={currentNFT.embedUrl}
          nftUrl={currentNFT.marketplaceUrl}
        />
      )}
    </section>
  );
};

export default NFTGallery;
