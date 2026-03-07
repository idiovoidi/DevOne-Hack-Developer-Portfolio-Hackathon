/**
 * Software Experience Data
 *
 * This file contains software tools and technologies organized by current and past usage.
 * The data structure is designed to support future filtering of portfolio pieces by software tags.
 *
 * HOW TO ADD NEW SOFTWARE:
 * 1. Add a new SoftwareEntry object to the softwareData array:
 *    {
 *      id: 'software-name',           // Unique identifier (kebab-case)
 *      name: 'Software Name',         // Display name
 *      category: 'main',              // 'main' for current, 'past' for retired
 *      icon: '/software/logo.webp',   // Path to logo (WebP format)
 *      version: '4.2',                // Optional: version number
 *      yearLastUsed: 2022,            // Optional: for 'past' category only
 *      tags: ['3d', 'modeling'],      // Optional: for future filtering
 *      portfolioIds: [],              // Optional: for future filtering
 *    }
 *
 * FUTURE TAG ASSOCIATION IMPLEMENTATION:
 * 
 * To enable filtering of portfolio pieces by software in the future:
 * 
 * 1. ADD PORTFOLIO IDS TO SOFTWARE ENTRIES:
 *    Update the portfolioIds array with IDs of portfolio pieces that use this software:
 *    {
 *      id: 'blender',
 *      portfolioIds: ['3d-character-model', 'environment-scene', 'nft-artwork-1'],
 *    }
 * 
 * 2. ADD SOFTWARE IDS TO PORTFOLIO ENTRIES:
 *    In projects.ts, artworks.ts, or nfts.ts, add a softwareUsed field:
 *    {
 *      id: '3d-character-model',
 *      title: '3D Character Model',
 *      softwareUsed: ['blender', 'photoshop'],  // Add this field
 *    }
 * 
 * 3. IMPLEMENT FILTERING LOGIC:
 *    In SoftwareCard.tsx, implement the onClick handler:
 *    const handleSoftwareClick = (softwareId: string) => {
 *      const portfolioIds = getPortfolioBySoftwareId(softwareId);
 *      // Filter portfolio pieces by IDs
 *      // Option A: Navigate to filtered portfolio view
 *      // Option B: Highlight matching items in existing sections
 *      // Option C: Show modal with filtered results
 *    };
 * 
 * 4. UPDATE HELPER FUNCTION:
 *    The getPortfolioBySoftwareId function below is ready to use once portfolioIds are populated.
 *    You may also want to create a reverse lookup function in portfolio data files.
 */

export type SoftwareCategory = 'main' | 'past';

export interface SoftwareEntry {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  category: SoftwareCategory;    // 'main' for current, 'past' for retired
  icon: string;                  // Path to logo/icon (WebP format)
  version?: string;              // Optional: version number (e.g., "4.2")
  yearLastUsed?: number;         // Optional: year last used (for 'past' category)
  tags?: string[];               // Optional: tags for filtering (e.g., ['3d', 'modeling'])
  portfolioIds?: string[];       // Optional: IDs of portfolio pieces using this software
}

// Software entries organized by current and past usage
export const softwareData: SoftwareEntry[] = [
  // Main (Current) Software
  {
    id: 'blender',
    name: 'Blender',
    category: 'main',
    icon: '/software/blender.webp',
    version: '4.2',
    tags: ['3d', 'modeling', 'animation', 'rendering'],
    portfolioIds: [], // Future: Add IDs of 3D projects and artworks
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'main',
    icon: '/software/photoshop.webp',
    tags: ['design', 'image-editing', 'digital-art'],
    portfolioIds: [], // Future: Add IDs of art pieces and design projects
  },
  {
    id: 'react',
    name: 'React',
    category: 'main',
    icon: '/software/react.webp',
    tags: ['frontend', 'web-development', 'javascript'],
    portfolioIds: [], // Future: Add IDs of web projects
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'main',
    icon: '/software/typescript.webp',
    tags: ['frontend', 'backend', 'web-development'],
    portfolioIds: [], // Future: Add IDs of TypeScript projects
  },
  
  // Past (Retired) Software
  {
    id: 'unity',
    name: 'Unity',
    category: 'past',
    icon: '/software/unity.webp',
    yearLastUsed: 2022,
    tags: ['game-dev', '3d', 'c-sharp'],
    portfolioIds: [], // Future: Add IDs of Unity game projects
  },
  {
    id: 'maya',
    name: 'Autodesk Maya',
    category: 'past',
    icon: '/software/maya.webp',
    yearLastUsed: 2020,
    tags: ['3d', 'modeling', 'animation'],
    portfolioIds: [], // Future: Add IDs of Maya projects
  },
];

/**
 * Get software entries by category
 * @param category - 'main' for current software, 'past' for retired software
 * @returns Array of software entries in the specified category
 */
export const getSoftwareByCategory = (category: SoftwareCategory): SoftwareEntry[] => {
  return softwareData.filter(software => software.category === category);
};

/**
 * Get a specific software entry by ID
 * @param id - Unique software identifier (kebab-case)
 * @returns Software entry or undefined if not found
 */
export const getSoftwareById = (id: string): SoftwareEntry | undefined => {
  return softwareData.find(software => software.id === id);
};

/**
 * Get portfolio piece IDs associated with a software entry
 * This function is ready for future filtering implementation.
 * 
 * @param softwareId - Unique software identifier
 * @returns Array of portfolio piece IDs, or empty array if none found
 * 
 * @example
 * // Once portfolioIds are populated:
 * const blenderProjects = getPortfolioBySoftwareId('blender');
 * // Returns: ['3d-character-model', 'environment-scene', 'nft-artwork-1']
 */
export const getPortfolioBySoftwareId = (softwareId: string): string[] => {
  const software = getSoftwareById(softwareId);
  return software?.portfolioIds || [];
};

/**
 * Get all software entries (both main and past)
 * @returns Array of all software entries
 */
export const getAllSoftware = (): SoftwareEntry[] => {
  return softwareData;
};

/**
 * Get software entries by tag
 * This function is ready for future tag-based filtering.
 * 
 * @param tag - Tag to filter by (e.g., '3d', 'design', 'web-development')
 * @returns Array of software entries with the specified tag
 * 
 * @example
 * const threeDSoftware = getSoftwareByTag('3d');
 * // Returns: [Blender, Unity, Maya]
 */
export const getSoftwareByTag = (tag: string): SoftwareEntry[] => {
  return softwareData.filter(software => 
    software.tags?.includes(tag)
  );
};
