/**
 * Skills Data
 * 
 * This file contains your technical skills organized by category.
 * 
 * HOW TO ADD NEW SKILLS:
 * 1. Find the appropriate category in the skillsData array below
 * 2. Add a new skill object to the skills array:
 *    {
 *      name: 'Skill Name',
 *      category: 'frontend',  // Must match the category type
 *      icon: 'SiReact',       // Optional: Icon name from react-icons/si (Simple Icons)
 *      proficiency: 85        // Optional: 1-100 scale
 *    }
 * 
 * 3. To add a new category, add a new object to skillsData:
 *    {
 *      name: 'Category Name',
 *      skills: [...]
 *    }
 * 
 * ICON REFERENCE:
 * - Use Simple Icons from react-icons: https://react-icons.github.io/react-icons/icons/si/
 * - Format: 'Si' + PascalCaseName (e.g., 'SiJavascript', 'SiReact', 'SiTailwindcss')
 */

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design' | 'other';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;           // Icon name from react-icons (e.g., 'SiReact')
  proficiency?: number;    // Optional: 1-100 scale
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

// Add your skills here, organized by category
export const skillsData: SkillGroup[] = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'React', category: 'frontend', icon: 'SiReact', proficiency: 90 },
      { name: 'TypeScript', category: 'frontend', icon: 'SiTypescript', proficiency: 85 },
      { name: 'JavaScript', category: 'frontend', icon: 'SiJavascript', proficiency: 95 },
      { name: 'HTML5', category: 'frontend', icon: 'SiHtml5', proficiency: 95 },
      { name: 'CSS3', category: 'frontend', icon: 'SiCss3', proficiency: 90 },
      { name: 'Tailwind CSS', category: 'frontend', icon: 'SiTailwindcss', proficiency: 85 },
      { name: 'Next.js', category: 'frontend', icon: 'SiNextdotjs', proficiency: 80 },
      { name: 'Vue.js', category: 'frontend', icon: 'SiVuedotjs', proficiency: 70 }
    ]
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', category: 'backend', icon: 'SiNodedotjs', proficiency: 85 },
      { name: 'Express', category: 'backend', icon: 'SiExpress', proficiency: 80 },
      { name: 'Python', category: 'backend', icon: 'SiPython', proficiency: 75 },
      { name: 'MongoDB', category: 'backend', icon: 'SiMongodb', proficiency: 80 },
      { name: 'PostgreSQL', category: 'backend', icon: 'SiPostgresql', proficiency: 75 },
      { name: 'Firebase', category: 'backend', icon: 'SiFirebase', proficiency: 85 },
      { name: 'REST API', category: 'backend', proficiency: 90 },
      { name: 'GraphQL', category: 'backend', icon: 'SiGraphql', proficiency: 70 }
    ]
  },
  {
    name: 'Tools & Technologies',
    skills: [
      { name: 'Git', category: 'tools', icon: 'SiGit', proficiency: 90 },
      { name: 'GitHub', category: 'tools', icon: 'SiGithub', proficiency: 90 },
      { name: 'VS Code', category: 'tools', icon: 'SiVisualstudiocode', proficiency: 95 },
      { name: 'Vite', category: 'tools', icon: 'SiVite', proficiency: 85 },
      { name: 'Webpack', category: 'tools', icon: 'SiWebpack', proficiency: 75 },
      { name: 'Docker', category: 'tools', icon: 'SiDocker', proficiency: 70 },
      { name: 'Vercel', category: 'tools', icon: 'SiVercel', proficiency: 85 },
      { name: 'Netlify', category: 'tools', icon: 'SiNetlify', proficiency: 80 }
    ]
  },
  {
    name: 'Design & Creative',
    skills: [
      { name: 'Figma', category: 'design', icon: 'SiFigma', proficiency: 80 },
      { name: 'Adobe Photoshop', category: 'design', icon: 'SiAdobephotoshop', proficiency: 75 },
      { name: 'Blender', category: 'design', icon: 'SiBlender', proficiency: 65 },
      { name: 'Framer Motion', category: 'design', icon: 'SiFramer', proficiency: 85 },
      { name: 'UI/UX Design', category: 'design', proficiency: 80 }
    ]
  }
];

// Helper function to get all skills flattened
export const getAllSkills = (): Skill[] => {
  return skillsData.flatMap(group => group.skills);
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return getAllSkills().filter(skill => skill.category === category);
};

// Helper function to get top skills by proficiency
export const getTopSkills = (limit: number = 10): Skill[] => {
  return getAllSkills()
    .filter(skill => skill.proficiency !== undefined)
    .sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0))
    .slice(0, limit);
};
