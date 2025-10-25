import React from 'react';

export interface SkillBadgeProps {
  name: string;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full 
        bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20
        transition-all duration-200 hover:bg-opacity-20 hover:scale-105 ${className}`}
    >
      {name}
    </span>
  );
};

export default SkillBadge;
