/**
 * NFT Data
 *
 * This file contains your NFT collection data.
 *
 * HOW TO ADD NEW NFTs:
 * 1. Add a screenshot/thumbnail to public/nft/ folder
 * 2. Add a new object to the nfts array below
 */

export interface NFT {
  id: string;
  title: string;
  description?: string;
  image: string; // Thumbnail/screenshot
  collection: string;
  blockchain: string; // e.g., "Tezos", "Ethereum"
  contractAddress: string;
  tokenId: string;
  mintDate: string; // YYYY-MM-DD format
  marketplaceUrl: string; // objkt.com, OpenSea, etc.
  embedUrl?: string; // For iframe embedding
  price?: string; // Optional: listing price
  sold?: boolean; // Optional: sale status
}

export const nfts: NFT[] = [
  {
    id: "nft-1",
    title: "NFT #15 - Collection 1",
    description: "Minted NFT artwork on Tezos blockchain",
    image: "https://assets.objkt.media/file/assets-003/QmbtUvGdxFuaauaYYSBnySzEYqruaMdJ6p74kAhr5A7TN5/artifact",
    collection: "Collection 1",
    blockchain: "Tezos",
    contractAddress: "KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K",
    tokenId: "15",
    mintDate: "2024-01-01",
    marketplaceUrl: "https://objkt.com/tokens/KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K/15",
    embedUrl: "https://objkt.com/tokens/KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K/15",
  },
  {
    id: "nft-2",
    title: "NFT #15 - Collection 2",
    description: "Minted NFT artwork on Tezos blockchain",
    image: "/nft/placeholder-2.svg", // TODO: Add actual asset URL
    collection: "Collection 2",
    blockchain: "Tezos",
    contractAddress: "KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew",
    tokenId: "15",
    mintDate: "2024-01-01",
    marketplaceUrl: "https://objkt.com/tokens/KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/15",
    embedUrl: "https://objkt.com/tokens/KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/15",
  },
  {
    id: "nft-3",
    title: "NFT #11",
    description: "Minted NFT artwork on Tezos blockchain",
    image: "/nft/placeholder-3.svg", // TODO: Add actual asset URL
    collection: "Collection 3",
    blockchain: "Tezos",
    contractAddress: "KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M",
    tokenId: "11",
    mintDate: "2024-01-01",
    marketplaceUrl: "https://objkt.com/tokens/KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M/11",
    embedUrl: "https://objkt.com/tokens/KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M/11",
  },
  {
    id: "nft-4",
    title: "NFT #12",
    description: "Minted NFT artwork on Tezos blockchain",
    image: "/nft/placeholder-4.svg", // TODO: Add actual asset URL
    collection: "Collection 2",
    blockchain: "Tezos",
    contractAddress: "KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew",
    tokenId: "12",
    mintDate: "2024-01-01",
    marketplaceUrl: "https://objkt.com/tokens/KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/12",
    embedUrl: "https://objkt.com/tokens/KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew/12",
  },
];

// Helper function to get NFTs by collection
export const getNFTsByCollection = (collection: string): NFT[] => {
  return nfts.filter((nft) => nft.collection === collection);
};

// Helper function to get all unique collections
export const getCollections = (): string[] => {
  const collections = nfts.map((nft) => nft.collection);
  return Array.from(new Set(collections));
};

// Helper function to get NFTs by blockchain
export const getNFTsByBlockchain = (blockchain: string): NFT[] => {
  return nfts.filter((nft) => nft.blockchain === blockchain);
};
