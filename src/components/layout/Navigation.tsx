import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "../../hooks";

interface NavLink {
  id: string;
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "art-gallery", label: "Art", href: "#art-gallery" },
  { id: "nft-gallery", label: "NFTs", href: "#nft-gallery" },
  { id: "music", label: "Music", href: "#music" },
  { id: "videos", label: "Videos", href: "#videos" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(navLinks.map((link) => link.id));

  // Handle smooth scroll
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="container-custom">
      <div className="flex items-center justify-between h-20">
        {/* Logo/Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-2xl font-bold text-gradient focus-visible-ring"
          style={{
            fontFamily: "var(--font-glitch)",
            fontWeight: 900,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          idiovoidi
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-base font-medium transition-colors duration-200 focus-visible-ring ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary"
              }`}
              style={{
                color:
                  activeSection === link.id
                    ? "var(--color-primary)"
                    : "var(--color-text-secondary)",
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center focus-visible-ring rounded"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
              className="w-full h-0.5 bg-current origin-center"
              style={{ backgroundColor: "var(--color-text-primary)" }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-0.5 bg-current"
              style={{ backgroundColor: "var(--color-text-primary)" }}
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
              className="w-full h-0.5 bg-current origin-center"
              style={{ backgroundColor: "var(--color-text-primary)" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              style={{ top: "80px" }}
              onClick={() => setIsMobileMenuOpen(false)}
              role="button"
              tabIndex={-1}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Escape") setIsMobileMenuOpen(false);
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-20 bottom-0 w-64 bg-surface shadow-2xl md:hidden"
              style={{
                backgroundColor: "var(--color-surface)",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <div className="flex flex-col p-6 space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-lg font-medium transition-colors duration-200 focus-visible-ring ${
                      activeSection === link.id
                        ? "text-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                    style={{
                      color:
                        activeSection === link.id
                          ? "var(--color-primary)"
                          : "var(--color-text-secondary)",
                    }}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSectionMobile"
                        className="h-0.5 bg-primary mt-1"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
