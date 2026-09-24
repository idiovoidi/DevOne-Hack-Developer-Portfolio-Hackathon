import { useState } from "react";
import { motion } from "framer-motion";
import type { CommercialWork } from "../../data/commercial";
import { commercialTagLabel } from "../../data/commercialTags";

export interface CommercialCardProps {
  work: CommercialWork;
  index: number;
  onClick: () => void;
}

const CommercialCard = ({ work, index, onClick }: CommercialCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${work.title} in full size`}
    >
      <div
        className="relative rounded-sm p-[10px] shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 252, 245, 0.95) 0%, rgba(245, 230, 196, 0.92) 100%)",
          boxShadow: isHovered
            ? "0 18px 40px rgba(0, 0, 0, 0.35), 0 0 28px rgba(253, 230, 138, 0.28)"
            : "0 10px 28px rgba(0, 0, 0, 0.28)",
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-amber-50/80">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
            </div>
          )}
          <img
            src={work.image}
            alt={work.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {work.tags[0] && (
            <span
              className="absolute top-3 left-3 max-w-[85%] truncate rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-900"
              style={{ background: "rgba(253, 230, 138, 0.92)" }}
            >
              {commercialTagLabel(work.tags[0])}
            </span>
          )}
          <motion.div
            initial={{ y: "100%" }}
            animate={isHovered ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/95 via-stone-900/75 to-transparent p-4 pt-8"
          >
            <h3 className="mb-1 text-lg font-semibold text-amber-50">{work.title}</h3>
            <p className="text-sm text-amber-100/80">{work.medium}</p>
            {work.client && (
              <p className="mt-1 text-xs uppercase tracking-wider text-amber-200/70">
                {work.client}
              </p>
            )}
            {work.description && (
              <p className="mt-2 line-clamp-2 text-xs text-amber-100/70">{work.description}</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export { CommercialCard };
export default CommercialCard;
