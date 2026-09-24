export interface NavLink {
  id: string;
  label: string;
  href: string;
  isArtGroup?: boolean;
}

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "art-gallery", label: "Art", href: "#art-gallery", isArtGroup: true },
  { id: "nft-gallery", label: "NFTs", href: "#nft-gallery", isArtGroup: true },
  { id: "music", label: "Music", href: "#music", isArtGroup: true },
  { id: "videos", label: "Videos", href: "#videos", isArtGroup: true },
  { id: "three-d", label: "3D", href: "#three-d", isArtGroup: true },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "software-experience", label: "Software Experience", href: "#software-experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];
