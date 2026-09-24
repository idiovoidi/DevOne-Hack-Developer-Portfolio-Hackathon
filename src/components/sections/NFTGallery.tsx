import type { FC } from "react";
import { nfts, nftCollections } from "../../data/nfts";
import { NFTCard } from "../ui/NFTCard";
import { Section } from "../ui/Section";
import { FiExternalLink } from "react-icons/fi";

export const NFTGallery: FC = () => {
  return (
    <Section
      id="nft-gallery"
      title="NFT Collection"
      subtitle={
        <span className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="font-bold text-text-primary">Featured:</span>
          {nfts.map((nft) => (
            <a
              key={nft.id}
              href={nft.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-secondary hover:text-primary transition-colors"
            >
              {nft.title}
              <FiExternalLink className="shrink-0" size={14} aria-hidden />
            </a>
          ))}
        </span>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {nfts.map((nft, index) => (
          <NFTCard key={nft.id} nft={nft} index={index} />
        ))}
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-3xl font-bold" style={{ color: "#0d61ff" }}>
            ꜩ
          </span>
          <h3 className="text-2xl font-bold text-text-primary text-center">
            Explore Full Collections
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nftCollections.map((collection) => (
            <a
              key={collection.id}
              href={collection.collectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              style={{
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.15)",
              }}
            >
              <div className="relative aspect-square overflow-hidden bg-background">
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-semibold text-text-primary group-hover:text-purple-400 transition-colors duration-300">
                    {collection.name}
                  </h4>
                  <FiExternalLink className="text-purple-400 shrink-0" size={20} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};
