import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "@google/model-viewer";

/**
 * 3D Model Viewer Component
 * 
 * Uses Google's Model Viewer web component for displaying GLB/GLTF models
 */

interface ModelViewerProps {
  src: string;
  alt: string;
  poster?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  className?: string;
}

// Extend JSX to include model-viewer element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          poster?: string;
          'auto-rotate'?: boolean;
          'camera-controls'?: boolean;
          'shadow-intensity'?: string;
          'exposure'?: string;
          'shadow-softness'?: string;
          loading?: string;
          'interaction-prompt'?: string;
          'ar'?: boolean;
          'ar-modes'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  alt,
  poster,
  autoRotate = true,
  cameraControls = true,
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      console.log("✅ Model loaded successfully:", src);
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (event: Event) => {
      console.error("❌ Model loading error:", event);
      console.error("Model path:", src);
      setError("Failed to load 3D model");
      setIsLoaded(false);
    };

    const handleProgress = (event: Event) => {
      const progressEvent = event as any;
      if (progressEvent.detail?.totalProgress) {
        console.log("Loading progress:", Math.round(progressEvent.detail.totalProgress * 100) + "%");
      }
    };

    modelViewer.addEventListener("load", handleLoad);
    modelViewer.addEventListener("error", handleError);
    modelViewer.addEventListener("progress", handleProgress);

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
      modelViewer.removeEventListener("error", handleError);
      modelViewer.removeEventListener("progress", handleProgress);
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {/* Loading State */}
      {!isLoaded && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg z-10"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full mx-auto mb-3"
            />
            <p className="text-cyan-400 text-sm">Loading 3D model...</p>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg z-10">
          <div className="text-center p-4">
            <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>
            <p className="text-gray-500 text-xs">Check console for details</p>
          </div>
        </div>
      )}

      {/* Model Viewer */}
      <model-viewer
        ref={modelViewerRef}
        src={src}
        alt={alt}
        poster={poster}
        auto-rotate={autoRotate}
        camera-controls={cameraControls}
        shadow-intensity="1"
        exposure="1"
        shadow-softness="0.5"
        loading="eager"
        interaction-prompt="none"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "400px",
          backgroundColor: "transparent",
        }}
      />

      {/* Controls Hint */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-cyan-400 pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
          }}
        >
          🖱️ Drag to rotate • Scroll to zoom
        </motion.div>
      )}
    </div>
  );
};
