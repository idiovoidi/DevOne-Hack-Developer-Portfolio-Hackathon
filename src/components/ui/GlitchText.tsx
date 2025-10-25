import React from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Static gradient text - no animation */}
      <h2
        className="section-heading bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent relative z-10"
        style={{
          backgroundSize: "200% 200%",
          backgroundPosition: "50% 50%",
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default GlitchText;
