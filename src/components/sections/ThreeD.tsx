import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TextEffect, ModelViewer } from "../ui";
import { useState } from "react";

/**
 * 3D Section Component
 *
 * Displays 3D work and models
 */

interface ThreeDWork {
  id: string;
  title: string;
  description?: string;
  modelPath: string;
  thumbnail?: string;
  category?: string;
}

// Your 3D models - add more as you convert them
const threeDWorks: ThreeDWork[] = [
  {
    id: "barrel",
    title: "Barrel",
    description: "3D barrel model",
    modelPath: "/3D/AnyConv.com__Barrel_FBX.glb",
    category: "Model",
  },
  {
    id: "corrupted-healthpack",
    title: "Corrupted Healthpack",
    description: "Corrupted health restoration item with PBR textures",
    modelPath: "/3D/corrupted-healthpack-textured.glb",
    category: "Model",
  },
  {
    id: "enemy",
    title: "Enemy Character",
    description: "3D enemy character model",
    modelPath: "/3D/enemy.glb",
    category: "Character",
  },
  // Add more models here as you convert them
];

export const ThreeD = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedModel, setSelectedModel] = useState<ThreeDWork | null>(null);

  return (
    <section
      id="three-d"
      className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            {/* Void connection indicator */}
            <div
              className="absolute -top-3 left-0 right-0 h-[2px] rounded-full mx-auto"
              style={{
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, #00D9FF 30%, #0099CC 70%, transparent)",
                boxShadow: "0 0 6px #00D9FF",
                opacity: 0.4,
              }}
            />
            <TextEffect
              effect="glitch"
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00D9FF, #0099CC, #00D9FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "0 0 15px rgba(0, 217, 255, 0.4), 0 0 30px rgba(0, 153, 204, 0.3)",
              }}
            >
              3Ð W0RKS
            </TextEffect>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            <TextEffect
              effect="flicker"
              className="font-bold"
              style={{
                color: "#00D9FF",
                textShadow: "0 0 8px #00D9FF, 0 0 15px rgba(0, 217, 255, 0.5)",
              }}
            >
              Dimensional creations from the void
            </TextEffect>
          </p>
        </motion.div>

        {/* 3D Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {threeDWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedModel(work)}
            >
              <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 h-full">
                {/* 3D Model Preview */}
                <div className="relative aspect-square overflow-hidden">
                  <ModelViewer
                    src={work.modelPath}
                    alt={work.title}
                    poster={work.thumbnail}
                    autoRotate={true}
                    cameraControls={false}
                    className="w-full h-full"
                  />
                  {/* Click to interact overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-cyan-400 text-sm font-medium px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-cyan-500/30">
                      Click to interact
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    {work.title}
                  </h3>
                  {work.category && (
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {work.category}
                    </span>
                  )}
                  {work.description && (
                    <p className="text-sm text-gray-400 mt-2">{work.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Message */}
        {threeDWorks.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-500 italic">
              More 3D works coming soon...
            </p>
          </motion.div>
        )}
      </div>

      {/* Full Screen Model Viewer Modal */}
      {selectedModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedModel(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl h-[80vh] bg-black/60 rounded-lg border border-cyan-500/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 0 60px rgba(0, 217, 255, 0.3)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:text-cyan-300 transition-all"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Model Info */}
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-1">
                {selectedModel.title}
              </h3>
              {selectedModel.description && (
                <p className="text-sm text-gray-400">{selectedModel.description}</p>
              )}
            </div>

            {/* Full Model Viewer */}
            <ModelViewer
              src={selectedModel.modelPath}
              alt={selectedModel.title}
              autoRotate={true}
              cameraControls={true}
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
