/**
 * Artworks Data
 *
 * This file contains your art portfolio pieces.
 *
 * HOW TO ADD NEW ARTWORK:
 * 1. Add your artwork images to the public/art/ folder
 *    - Thumbnails: artwork-name-thumb.webp (< 200KB)
 *    - Full size: artwork-name-full.webp (< 500KB)
 *    - Use descriptive kebab-case names
 *
 * 2. Add a new object to the artworks array below:
 *    {
 *      id: 'unique-artwork-id',
 *      title: 'Artwork Title',
 *      description: 'Optional description or story behind the piece',
 *      image: '/art/artwork-thumb.webp',
 *      fullImage: '/art/artwork-full.webp',  // For lightbox view
 *      medium: 'Digital Art',                 // e.g., 'Digital Art', '3D Modeling', 'Concept Art'
 *      tools: ['Photoshop', 'Blender'],       // Tools/software used
 *      date: '2025-01',                       // Creation date (YYYY-MM format)
 *      category: 'Character Design'           // Optional category
 *    }
 */

export interface ArtPiece {
  id: string;
  title: string;
  description?: string;
  image: string; // Path to thumbnail image
  fullImage?: string; // Path to full-resolution image for lightbox
  medium: string; // e.g., "Digital Art", "3D Modeling", "Concept Art"
  tools: string[]; // e.g., ["Blender", "Photoshop", "Procreate"]
  date: string; // Creation date (YYYY-MM format)
  category?: string; // e.g., "Character Design", "Environment", "UI/UX"
  nftUrl?: string; // Optional: objkt.com or other NFT marketplace URL
  embedUrl?: string; // Optional: iframe embed URL for NFTs
}

// Add your artworks here
export const artworks: ArtPiece[] = [
  {
    id: "lonely-tower",
    title: "A Lonely Tower Basks in Eternal Solitude",
    image: "/art/a-lonely-tower-basks-in-eternal-solitude-thumb.webp",
    fullImage: "/art/a-lonely-tower-basks-in-eternal-solitude-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Landscape",
  },
  {
    id: "eternal-stream",
    title: "An Ever-Flowing Stream of Eternity",
    image: "/art/an-ever-flowing-stream-of-eternity--thumb.webp",
    fullImage: "/art/an-ever-flowing-stream-of-eternity--full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "cigaz",
    title: "Cigaz",
    image: "/art/cigaz-thumb.webp",
    fullImage: "/art/cigaz-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "dark-skies-1",
    title: "Dark Skies I",
    image: "/art/dark-skies-1-thumb.webp",
    fullImage: "/art/dark-skies-1-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Sky",
  },
  {
    id: "dark-skies-2",
    title: "Dark Skies II",
    image: "/art/dark-skies-2-thumb.webp",
    fullImage: "/art/dark-skies-2-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Sky",
  },
  {
    id: "eclipse",
    title: "Eclipse",
    image: "/art/eclipse-thumb.webp",
    fullImage: "/art/eclipse-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "eye-cross",
    title: "Eye Cross",
    image: "/art/eye-crossptds-thumb.webp",
    fullImage: "/art/eye-crossptds-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "fantasy-forest",
    title: "Fantasy Forest",
    image: "/art/fantasy-forest-thumb.webp",
    fullImage: "/art/fantasy-forest-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "fantasy-garden",
    title: "Fantasy Garden",
    image: "/art/fantasy-garden-thumb.webp",
    fullImage: "/art/fantasy-garden-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "fantasy-refined",
    title: "Fantasy Refined",
    image: "/art/fantasy-refined-2-thumb.webp",
    fullImage: "/art/fantasy-refined-2-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "flipz",
    title: "Flipz",
    image: "/art/flipz-thumb.webp",
    fullImage: "/art/flipz-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "frozen-domain",
    title: "Frozen Domain",
    image: "/art/frozen-domain-thumb.webp",
    fullImage: "/art/frozen-domain-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "glitched-tree",
    title: "Glitched Tree Meta",
    image: "/art/glitched-tree-meta-thumb.webp",
    fullImage: "/art/glitched-tree-meta-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "hallowed-falls",
    title: "Hallowed Falls",
    image: "/art/hallowed-falls-thumb.webp",
    fullImage: "/art/hallowed-falls-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "baby-shroomie",
    title: "Lil Baby Shroomie",
    image: "/art/lil-baby-shroomie-thumb.webp",
    fullImage: "/art/lil-baby-shroomie-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "metallic-mushroom",
    title: "Metallic Mushroom",
    image: "/art/metallic-mushroom-thumb.webp",
    fullImage: "/art/metallic-mushroom-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "nature-watching",
    title: "Nature is Always Watching, Observing, Perceiving",
    image: "/art/nature-is-always-watching-observing-perceiving--thumb.webp",
    fullImage: "/art/nature-is-always-watching-observing-perceiving--full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "observer",
    title: "Observer",
    image: "/art/observer-thumb.webp",
    fullImage: "/art/observer-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "rainforest-trunks",
    title: "Rainforest Tree Trunks",
    image: "/art/rainforest-tree-trunks-thumb.webp",
    fullImage: "/art/rainforest-tree-trunks-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "sunshine",
    title: "Sunshineee",
    image: "/art/sunshineee-thumb.webp",
    fullImage: "/art/sunshineee-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "thorns-blade",
    title: "Thorns Blade",
    image: "/art/thornsbladedresized-thumb.webp",
    fullImage: "/art/thornsbladedresized-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
  {
    id: "toxic-world",
    title: "Toxic Flipped World",
    image: "/art/toxic-flipped-world-thumb.webp",
    fullImage: "/art/toxic-flipped-world-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "tree-inv",
    title: "Tree Inverted",
    image: "/art/tree-inv-thumb.webp",
    fullImage: "/art/tree-inv-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Abstract",
  },
  {
    id: "tree-redo",
    title: "Tree Redo",
    image: "/art/tree-redo-thumb.webp",
    fullImage: "/art/tree-redo-full.webp",
    medium: "Photography",
    tools: ["Canon EOS 600D"],
    date: "2015",
    category: "Nature",
  },
];

// Helper function to get artworks by category
export const getArtworksByCategory = (category: string): ArtPiece[] => {
  return artworks.filter((artwork) => artwork.category === category);
};

// Helper function to get artworks by medium
export const getArtworksByMedium = (medium: string): ArtPiece[] => {
  return artworks.filter((artwork) => artwork.medium === medium);
};

// Helper function to get all unique categories
export const getArtworkCategories = (): string[] => {
  const categories = artworks
    .map((artwork) => artwork.category)
    .filter((category): category is string => category !== undefined);
  return Array.from(new Set(categories));
};
