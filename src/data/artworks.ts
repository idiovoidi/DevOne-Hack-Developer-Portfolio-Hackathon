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
  image: string;           // Path to thumbnail image
  fullImage?: string;      // Path to full-resolution image for lightbox
  medium: string;          // e.g., "Digital Art", "3D Modeling", "Concept Art"
  tools: string[];         // e.g., ["Blender", "Photoshop", "Procreate"]
  date: string;            // Creation date (YYYY-MM format)
  category?: string;       // e.g., "Character Design", "Environment", "UI/UX"
}

// Add your artworks here
export const artworks: ArtPiece[] = [
  {
    id: 'cyberpunk-character',
    title: 'Cyberpunk Character Concept',
    description: 'A futuristic character design for a sci-fi game project, featuring neon accents and cybernetic enhancements.',
    image: '/art/placeholder.svg', // Replace with: /art/cyberpunk-char-thumb.webp
    fullImage: '/art/placeholder.svg', // Replace with: /art/cyberpunk-char-full.webp
    medium: 'Digital Art',
    tools: ['Photoshop', 'Procreate'],
    date: '2025-01',
    category: 'Character Design'
  },
  {
    id: 'fantasy-environment',
    title: 'Mystical Forest Environment',
    description: 'An atmospheric environment piece showcasing lighting and mood for a fantasy game setting.',
    image: '/art/placeholder.svg', // Replace with: /art/forest-env-thumb.webp
    fullImage: '/art/placeholder.svg', // Replace with: /art/forest-env-full.webp
    medium: 'Digital Painting',
    tools: ['Photoshop', 'Blender'],
    date: '2024-12',
    category: 'Environment'
  },
  {
    id: 'ui-design-mockup',
    title: 'Mobile App UI Design',
    description: 'Clean and modern UI design for a fitness tracking mobile application.',
    image: '/art/placeholder.svg', // Replace with: /art/ui-mockup-thumb.webp
    fullImage: '/art/placeholder.svg', // Replace with: /art/ui-mockup-full.webp
    medium: 'UI/UX Design',
    tools: ['Figma', 'Adobe XD'],
    date: '2024-11',
    category: 'UI/UX'
  },
  {
    id: '3d-robot-model',
    title: '3D Robot Character',
    description: 'A low-poly robot character model with PBR textures, ready for game integration.',
    image: '/art/placeholder.svg', // Replace with: /art/robot-3d-thumb.webp
    fullImage: '/art/placeholder.svg', // Replace with: /art/robot-3d-full.webp
    medium: '3D Modeling',
    tools: ['Blender', 'Substance Painter'],
    date: '2024-10',
    category: 'Character Design'
  }
];

// Helper function to get artworks by category
export const getArtworksByCategory = (category: string): ArtPiece[] => {
  return artworks.filter(artwork => artwork.category === category);
};

// Helper function to get artworks by medium
export const getArtworksByMedium = (medium: string): ArtPiece[] => {
  return artworks.filter(artwork => artwork.medium === medium);
};

// Helper function to get all unique categories
export const getArtworkCategories = (): string[] => {
  const categories = artworks
    .map(artwork => artwork.category)
    .filter((category): category is string => category !== undefined);
  return Array.from(new Set(categories));
};
