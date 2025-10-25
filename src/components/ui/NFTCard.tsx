import React from 'react';
import { motion } from 'framer-motion';
import { NFT } from '../../data/nfts';
import { FaEthereum } from 'react-icons/fa';
import { RiNftLine } from 'react-icons/ri';

interface NFTCardProps {
  nft: NFT;
  index: number;
  onClick: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, index, onClick }) => {
  const getBlockchainIcon = () => {
    switch (nft.blockchain.toLowerCase()) {
      case 'tezos':
        return <RiNftLine className="text-accent-primary" size={20} />;
      case 'ethereum':
        return <FaEthereum className="text-accent-primary" size={20} />;
      default:
        return <RiNftLine className="text-accent-primary" size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-surface border border-accent-primary/20 rounded-lg overflow-hidden hover:border-accent-primary/50 transition-all duration-300 cursor-pointer"
      onClick={onClick}
      style={{
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
      }}
    >
      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
          <span className="text-accent-primary font-medium">View NFT</span>
        </div>

        {/* Blockchain Badge */}
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 border border-accent-primary/30">
          {getBlockchainIcon()}
          <span className="text-xs font-medium text-text-primary">{nft.blockchain}</span>
        </div>
      </div>

      {/* NFT Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors duration-300">
          {nft.title}
        </h3>
        
        <p className="text-sm text-text-secondary mb-3">
          {nft.collection}
        </p>

        {nft.description && (
          <p className="text-sm text-text-secondary line-clamp-2">
            {nft.description}
          </p>
        )}
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10" />
      </div>
    </motion.div>
  );
};

export default NFTCard;
