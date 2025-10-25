import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  embedUrl?: string; // Optional: For NFT or other embeddable content
  nftUrl?: string; // Optional: Link to NFT marketplace
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt = 'Lightbox image',
  title,
  embedUrl,
  nftUrl,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden';
      
      // Handle ESC key press
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
        aria-label="Close lightbox"
      >
        <IoClose size={32} />
      </button>
      
      {/* Content container */}
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
        {title && (
          <h3 className="text-white text-xl font-semibold mb-4 text-center">
            {title}
          </h3>
        )}
        
        {/* NFT Embed or Regular Image */}
        {embedUrl ? (
          <div className="w-full max-w-4xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={embedUrl}
              className="w-full aspect-square max-h-[70vh] rounded-lg shadow-2xl border-2 border-accent-primary/30"
              title={title || 'NFT Artwork'}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
            {nftUrl && (
              <a
                href={nftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-6 py-3 bg-accent-primary/20 hover:bg-accent-primary/30 border border-accent-primary rounded-lg text-accent-primary hover:text-white transition-all duration-300 font-medium"
              >
                View on objkt.com →
              </a>
            )}
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};

export default Lightbox;
