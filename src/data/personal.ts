/**
 * Personal Information Data
 *
 * This file contains your personal information, bio, and social links.
 * Update the values below to customize your portfolio.
 */

export interface SocialLink {
  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "email"
    | "spotify"
    | "youtube"
    | "tumblr"
    | "other";
  url: string;
  username: string;
  icon?: string; // Optional: Custom icon name from react-icons
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
  name: "idiovoidi",
  title: "Full Stack Developer & Digital Artist",
  tagline: "Crafting immersive experiences from the void of imagination",
  bio: "I am a passionate developer with experience in modern web technologies. I love creating interactive applications and bringing ideas to life through code.",
  email: "idiovoidi@gmail.com", // Update this with your actual email
  location: undefined, // Optional: Add your location if you want to display it
  resumeUrl: "/resume.pdf", // Optional: Add your resume PDF to the public folder
  social: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/idiovoidi/",
      username: "@idiovoidi",
    },
    {
      platform: "twitter",
      url: "https://twitter.com/idiovoidi",
      username: "@idiovoidi",
    },
    {
      platform: "spotify",
      url: "https://open.spotify.com/artist/1haA9Lfr8e35mJlalAbPFz?si=u3oEZ3j0ShGYHdGA9wuR4A",
      username: "idiovoidi",
    },
    {
      platform: "tumblr",
      url: "https://vaelzz.tumblr.com/",
      username: "vaelzz",
    },
    {
      platform: "youtube",
      url: "https://www.youtube.com/@idiovoidi/videos",
      username: "@idiovoidi",
    },
  ],
};
