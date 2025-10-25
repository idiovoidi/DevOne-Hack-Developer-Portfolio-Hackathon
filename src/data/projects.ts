/**
 * Projects Data
 *
 * This file contains all your portfolio projects.
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Add your project images to the public/projects/ folder
 *    - Use descriptive kebab-case names: project-name-thumb.webp
 *    - Optimize images (thumbnails should be < 200KB)
 *
 * 2. Add a new object to the projects array below with this structure:
 *    {
 *      id: 'unique-project-id',
 *      title: 'Project Name',
 *      description: 'Brief description of what the project does',
 *      image: '/projects/project-thumb.webp',
 *      technologies: ['React', 'TypeScript', 'Tailwind'],
 *      liveUrl: 'https://your-demo.com',        // Optional
 *      githubUrl: 'https://github.com/user/repo', // Optional
 *      embedUrl: 'https://game-url.com',         // Optional: for embedded demos
 *      category: 'development',                   // 'development' | 'game'
 *      featured: true                             // Optional: highlight important projects
 *    }
 */

export interface ProjectScreenshot {
  image: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  screenshots?: ProjectScreenshot[]; // Optional: Additional screenshots with captions
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  embedUrl?: string; // For embedded interactive demos (games, web apps)
  category: "development" | "game";
  featured?: boolean;
}

// Add your projects here
export const projects: Project[] = [
  {
    id: "zombie-tower-defence",
    title: "Zombie Tower Defence",
    description:
      "A strategic tower defense game where you defend against waves of zombies. Features multiple tower types, upgrade systems, and challenging gameplay mechanics.",
    image: "/projects/zombie-td-thumb.png",
    technologies: ["TypeScript", "Pixi.js", "HTML5 Canvas", "Vite"],
    liveUrl: "https://idiovoidi.github.io/Zombie_Tower_Defence-OS2",
    githubUrl: "https://github.com/idiovoidi/Zombie_Tower_Defence-OS2",
    // embedUrl removed - users will click "View Demo" to play on GitHub Pages
    category: "game",
    featured: true,
  },
  {
    id: "social-content-manager",
    title: "Social Content Manager",
    description:
      "A desktop application for organizing and scheduling artwork posts across social media platforms with ethical posting practices and automated workflows.",
    image: "/projects/social-content-manager-1.webp",
    screenshots: [
      {
        image: "/projects/social-content-manager-1.webp",
        caption: "Main dashboard showing content queue and scheduling overview",
      },
      {
        image: "/projects/social-content-manager-2.webp",
        caption: "Content library with artwork organization and tagging system",
      },
      {
        image: "/projects/social-content-manager-3.webp",
        caption: "Post composer with platform-specific formatting and preview",
      },
      {
        image: "/projects/social-content-manager-4.webp",
        caption: "Analytics dashboard tracking engagement and posting metrics",
      },
      {
        image: "/projects/social-content-manager-5.webp",
        caption: "Schedule calendar view with drag-and-drop functionality",
      },
      {
        image: "/projects/social-content-manager-6.webp",
        caption:
          "Settings panel for platform integrations and automation rules",
      },
    ],
    technologies: ["Python", "PyQt6", "MongoDB", "REST APIs"],
    // Private/unreleased project - no live URL or GitHub repo
    category: "development",
    featured: true,
  },
  {
    id: "idioview",
    title: "ID:I/O VIEW",
    description:
      "Organizational media library & Viewer for curation and sorting of media assets, features advanced metadata and JSON parsing for working with large libraries of both traditional and generative AI based metadata",
    image: "/projects/idioview-1-metadata.png",
    screenshots: [
      {
        image: "/projects/idioview-1-metadata.png",
        caption: "Metadata parsing and extraction from image files",
      },
      {
        image: "/projects/idioview-2-main.webp",
        caption: "Main interface with image preview and metadata display",
      },
      {
        image: "/projects/idioview-3-gallery.webp",
        caption: "Gallery view with thumbnail navigation and filtering",
      },
      {
        image: "/projects/idioview-4-details.webp",
        caption: "Detailed metadata editor with field validation",
      },
      {
        image: "/projects/idioview-5-settings.webp",
        caption:
          "Settings panel for customizing metadata fields and preferences",
      },
      {
        image: "/projects/idioview-6-preview.webp",
        caption: "Preview mode with metadata overlay and export options",
      },
    ],
    technologies: ["Python", "PyQt6", "Pillow", "ExifTool"],
    githubUrl: "https://github.com/idiovoidi/IDIOVIEW",
    category: "development",
    featured: true,
  },
  {
    id: "stardew-gift-tracker",
    title: "Stardew Valley Gift Tracker",
    description:
      "A PyQt6 desktop application for tracking villager gift preferences in Stardew Valley. Features character cards, gift recommendations, inventory sync, and multiple view modes for efficient gift planning.",
    image: "/projects/stardew-gift-tracker-villagers.png",
    screenshots: [
      {
        image: "/projects/stardew-gift-tracker-villagers.png",
        caption:
          "Villagers list ordered by relationship status and gift history",
      },
      {
        image: "/projects/stardew-gift-tracker-most-liked.png",
        caption: "Most-liked gifts view for quick reference and planning",
      },
      {
        image: "/projects/stardew-gift-tracker-gift-card.png",
        caption: "Detailed gift card showing preferences and reactions",
      },
      {
        image: "/projects/stardew-gift-tracker-inventory.png",
        caption: "Inventory sync feature for tracking available gifts",
      },
      {
        image: "/projects/stardew-gift-tracker-character.png",
        caption: "Character card with detailed relationship information",
      },
      {
        image: "/projects/stardew-gift-tracker-alt-view.png",
        caption: "Alternative view mode for compact information display",
      },
    ],
    technologies: ["Python", "PyQt6", "SQLite", "Qt Designer"],
    githubUrl: "https://github.com/idiovoidi/Stardew_Valley_Gift_Tracker",
    category: "development",
    featured: true,
  },
  {
    id: "gta-classic-arcade",
    title: "GTA Classic Arcade",
    description:
      "GTA2 inspired arcade demo created with basic Javascript with no additional libraries as a learning experience.",
    image: "/projects/gta-classic-arcade-thumb.png",
    technologies: ["JavaScript", "HTML5 Canvas"],
    liveUrl: "https://idiovoidi.github.io/GTA_Classic_Arcade/",
    githubUrl: "https://github.com/idiovoidi/GTA_Classic_Arcade",
    category: "game",
    featured: false,
  },
  {
    id: "fish-evo",
    title: "Fish Evo",
    description:
      "An evolutionary simulation game where fish compete for survival. Features genetic algorithms, predator-prey dynamics, and natural selection mechanics in an aquatic ecosystem.",
    image: "/projects/fish-evo-thumb.png",
    technologies: ["JavaScript", "Babylon.js", "Yuka", "ECSY", "Recast.js"],
    githubUrl: "https://github.com/idiovoidi/Fish_Evo",
    category: "game",
    featured: false,
  },
];

// Helper function to get projects by category
export const getProjectsByCategory = (
  category: Project["category"]
): Project[] => {
  return projects.filter((project) => project.category === category);
};

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};
