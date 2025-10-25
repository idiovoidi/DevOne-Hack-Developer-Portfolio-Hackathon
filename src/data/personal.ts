/**
 * Personal Information Data
 * 
 * This file contains your personal information, bio, and social links.
 * Update the values below to customize your portfolio.
 */

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'email' | 'other';
  url: string;
  username: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location?: string;
  resumeUrl?: string;
  social: SocialLink[];
}

// Update this data with your personal information
export const personalInfo: PersonalInfo = {
  name: 'idiovoidi',
  title: 'Full Stack Developer & Digital Artist',
  tagline: 'Crafting immersive experiences from the void of imagination',
  bio: 'I am a passionate developer with experience in modern web technologies. I love creating interactive applications and bringing ideas to life through code.',
  email: 'your.email@example.com',
  location: 'Your City, Country',
  resumeUrl: '/resume.pdf', // Optional: Add your resume PDF to the public folder
  social: [
    {
      platform: 'github',
      url: 'https://github.com/yourusername',
      username: 'yourusername'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/yourusername',
      username: 'yourusername'
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/yourusername',
      username: '@yourusername'
    },
    {
      platform: 'email',
      url: 'mailto:your.email@example.com',
      username: 'your.email@example.com'
    }
  ]
};
