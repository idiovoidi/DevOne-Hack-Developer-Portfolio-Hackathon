import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { nfts, getCollections } from '../../data/nfts';
import NFTCard from '../ui/NFTCard';
import Lightbox from '../ui/Lightbox';
import { useInView } from '../../hooks';
import { RiNftLine } from 'react-icons/ri';

const NFTGallery: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
  });

  const collections = ['all', ...getCollections()];
  
  const filteredNFTs = selectedCollection === 'all'
    ? nfts
    : nfts.filter(nft => nft.collection === selectedCollection);

  const handleNFTClick = (index: number) => {
    // Find the actual index in the full nfts array
    const actualIndex = nfts.findIndex(nft => nft.id === filteredNFTs[index].id);
    setSelectedNFT(actualIndex);
  };

  const handleCloseLightbox = () => {
    setSelectedNFT(null);
  };

  const currentNFT = selectedNFT !== null ? nfts[selectedNFT] : null;

  return (
    <section
      id="nft-gallery"
      className="section"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <RiNftLine className="text-accent-primary" size={32} />
            <h2 className="section-heading">NFT Collection</h2>
          </div>
          <p className="section-subheading max-w-2xl mx-auto">
            Explore my digital art minted on the blockchain
          </p>
        </motion.div>

        {/* Collection Filter */}
        {collections.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  selectedCollection === collection
                    ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                    : 'bg-surface border-accent-primary/20 text-text-secondary hover:border-accent-primary/50 hover:text-text-primary'
                }`}
              >
                {collection === 'all' ? 'All NFTs' : collection}
              </button>
            ))}
          </motion.div>
        )}

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.length > 0 ? (
            filteredNFTs.map((nft, index) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                index={index}
                onClick={() => handleNFTClick(index)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-text-secondary text-lg">
                No NFTs available in this collection.
              </p>
            </motion.div>
          )}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-surface border border-accent-primary/20 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent-primary mb-2">
              {nfts.length}
            </div>
            <div className="text-text-secondary">Total NFTs</div>
          </div>
          
          <div className="bg-surface border border-accent-primary/20 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent-primary mb-2">
              {getCollections().length}
            </div>
            <div className="text-text-secondary">Collections</div>
          </div>
          
          <div className="bg-surface border border-accent-primary/20 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent-primary mb-2">
              Tezos
            </div>
            <div className="text-text-secondary">Blockchain</div>
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
