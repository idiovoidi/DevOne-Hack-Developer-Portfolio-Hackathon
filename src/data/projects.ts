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
 *      category: 'development',                   // 'development' | 'game' | 'art' | 'design'
 *      featured: true                             // Optional: highlight important projects
 *    }
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  embedUrl?: string;        // For embedded interactive demos (games, web apps)
  category: 'development' | 'game' | 'art' | 'design';
  featured?: boolean;
}

// Add your projects here
export const projects: Project[] = [
  {
    id: 'tower-defense-game',
    title: 'Tower Defense Game',
    description: 'An interactive browser-based tower defense game built with TypeScript and Pixi.js. Features multiple tower types, enemy waves, and strategic gameplay.',
    image: '/projects/placeholder.svg', // Replace with: /projects/tower-defense-thumb.webp
    technologies: ['TypeScript', 'Pixi.js', 'HTML5 Canvas', 'Vite'],
    liveUrl: 'https://yourusername.github.io/tower-defense',
    githubUrl: 'https://github.com/yourusername/tower-defense',
    embedUrl: 'https://yourusername.github.io/tower-defense', // Allows playing directly in portfolio
    category: 'game',
    featured: true
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack online store with product catalog, shopping cart, and secure payment integration using Stripe API.',
    image: '/projects/placeholder.svg', // Replace with: /projects/ecommerce-thumb.webp
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    category: 'development',
    featured: true
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/projects/placeholder.svg', // Replace with: /projects/task-app-thumb.webp
    technologies: ['React', 'TypeScript', 'Firebase', 'React DnD', 'Material-UI'],
    liveUrl: 'https://task-manager-demo.netlify.app',
    githubUrl: 'https://github.com/yourusername/task-manager',
    category: 'development',
    featured: false
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A responsive weather application that displays current conditions and forecasts using the OpenWeather API with beautiful data visualizations.',
    image: '/projects/placeholder.svg', // Replace with: /projects/weather-thumb.webp
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API', 'CSS Modules'],
    liveUrl: 'https://weather-dashboard-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    category: 'development',
    featured: false
  }
];

// Helper function to get projects by category
export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};
