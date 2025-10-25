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
    image: "https://assets.objkt.media/file/assets-003/QmW66bkjRdN65RtuwFmVNQtJX57zwhbCjVmqRSC5jxuYk3/artifact",
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
    image: "https://assets.objkt.media/file/assets-003/QmXRLk4VACrzL6z1u3eAy8ffwdiXH7mjPtxkDc48xUh3fp/artifact",
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
    image: "https://assets.objkt.media/file/assets-003/bafybeihh6ms2oqiwjav4l5vqy7edomdt5wz36hpzbhkjxpu23tznlqgf6a/artifact",
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

// NFT Collections
export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  contractAddress: string;
  collectionUrl: string;
  itemCount?: number;
  coverImage: string; // Use one of the NFT images as cover
}

export const nftCollections: NFTCollection[] = [
  {
    id: "collection-1",
    name: "𖣐ƿ℮ɲ ΣĐ!էὶꝋn",
    description: "Explore the full collection on objkt.com",
    contractAddress: "KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K",
    collectionUrl: "https://objkt.com/collections/KT1SJawrAnz4qnt3XLGa924WQR5Jkp95UL9K",
    coverImage: "https://assets.objkt.media/file/assets-003/Qmc4ESmrXwj8VyToKubMgNbXAsQu8h78LAfbt4bTDaxrbU/thumb400",
  },
  {
    id: "collection-2",
    name: "M¡ɲƋ_Ƌ∆T∆_",
    description: "Explore the full collection on objkt.com",
    contractAddress: "KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew",
    collectionUrl: "https://objkt.com/collections/KT1D8cNYvhvoE5URCoj6Q5iPhc2EQzWaR9ew",
    coverImage: "https://assets.objkt.media/file/assets-003/QmfBFcs5TXhQiATstLJumVMdeLFkgsmzYHduS5ALoARziZ/thumb400",
  },
  {
    id: "collection-3",
    name: "𐌼!ɳɖ~ʍɛꝆ₸Ɀ",
    description: "Explore the full collection on objkt.com",
    contractAddress: "KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M",
    collectionUrl: "https://objkt.com/collections/KT1EQFjF1qDm99nkZvqNtw14kNb6YJAnDM5M",
    coverImage: "https://assets.objkt.media/file/assets-003/QmSEXA6iNGgFzas1aZ1UvHtHVrrbbA1Ep8UvfaQT8fZigM/thumb400",
  },
];
