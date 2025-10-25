import React, { useState } from "react";
import { motion } from "framer-motion";
import { nfts, nftCollections } from "../../data/nfts";
import NFTCard from "../ui/NFTCard";
import Lightbox from "../ui/Lightbox";
import { useInView } from "../../hooks";
import { RiNftLine } from "react-icons/ri";
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <RiNftLine className="text-accent-primary" size={32} />
            <h2 className="section-heading">NFT Collection</h2>
          </div>
          <p className="section-subheading max-w-2xl mx-auto">
            Featured pieces from my blockchain art collections
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
            <h3 className="text-2xl font-bold text-text-primary text-center">
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
                className="group relative bg-surface border border-accent-primary/20 rounded-lg overflow-hidden hover:border-accent-primary/50 transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
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
                    <h4 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                      {collection.name}
                    </h4>
                    <FiExternalLink
                      className="text-accent-primary shrink-0 ml-2"
                      size={20}
                    />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10" />
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
