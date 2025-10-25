import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiTumblr } from 'react-icons/si';

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'instagram' | 'spotify' | 'tumblr' | 'youtube' | 'other';
  url: string;
  label?: string;
}

export interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
}

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  email: FaEnvelope,
  instagram: FaInstagram,
  spotify: FaSpotify,
  tumblr: SiTumblr,
  youtube: FaYoutube,
  other: FaEnvelope,
};

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  className = '', 
  iconSize = 24 
}) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link, index) => {
        const Icon = iconMap[link.platform] || iconMap.other;
        const isEmail = link.platform === 'email';
        const href = isEmail && !link.url.startsWith('mailto:') 
          ? `mailto:${link.url}` 
          : link.url;
        
        return (
          <a
            key={index}
            href={href}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 transform"
            aria-label={link.label || `Visit ${link.platform}`}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
