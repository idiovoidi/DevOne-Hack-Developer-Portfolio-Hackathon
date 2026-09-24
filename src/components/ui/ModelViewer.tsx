import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader, OrbitControls, RoomEnvironment } from "three-stdlib";

interface ModelViewerProps {
  src: string;
  alt: string;
  poster?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  className?: string;
}

/**
 * 3D Model Viewer — Three.js canvas for GLB/GLTF models.
 */
export const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  alt,
  poster,
  autoRotate = true,
  cameraControls = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const autoRotateRef = useRef(autoRotate);
  const cameraControlsRef = useRef(cameraControls);
  autoRotateRef.current = autoRotate;
  cameraControlsRef.current = cameraControls;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let modelRoot: THREE.Object3D | null = null;

    setIsLoaded(false);
    setError(null);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 5000);
    camera.position.set(0, 0.5, 2.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.setAttribute("aria-label", alt);
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.35);
    fillLight.position.set(-4, 1, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffaa88, 0.25);
    rimLight.position.set(0, 2, -4);
    scene.add(rimLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.autoRotate = autoRotateRef.current;
    controls.autoRotateSpeed = 1.2;
    // Preview cards: keep auto-rotate, but let card click-through open the lightbox.
    const interactive = cameraControlsRef.current;
    controls.enableZoom = interactive;
    controls.enableRotate = interactive || autoRotateRef.current;
    renderer.domElement.style.pointerEvents = interactive ? "auto" : "none";

    const frameModel = (object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z, 0.001);

      object.position.sub(center);

      const fitDist = maxDim / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
      camera.position.set(0, maxDim * 0.15, fitDist * 1.55);
      camera.near = maxDim / 100;
      camera.far = maxDim * 100;
      camera.updateProjectionMatrix();

      controls.target.set(0, 0, 0);
      controls.minDistance = fitDist * 0.5;
      controls.maxDistance = fitDist * 4;
      controls.update();
    };

    const setSize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];
              materials.forEach((m) => m.dispose());
            }
          });
          return;
        }

        modelRoot = gltf.scene;
        scene.add(modelRoot);
        frameModel(modelRoot);
        setIsLoaded(true);
        setError(null);
      },
      undefined,
      (err) => {
        if (disposed) return;
        console.error("Model loading error:", err, "path:", src);
        setError("Failed to load 3D model");
        setIsLoaded(false);
      },
    );

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const interactive = cameraControlsRef.current;
      controls.autoRotate = autoRotateRef.current;
      controls.enableZoom = interactive;
      controls.enableRotate = interactive || autoRotateRef.current;
      renderer.domElement.style.pointerEvents = interactive ? "auto" : "none";
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();

      if (modelRoot) {
        scene.remove(modelRoot);
        modelRoot.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];
            materials.forEach((m) => m.dispose());
          }
        });
      }

      renderer.dispose();
      pmrem.dispose();
      if (scene.environment) {
        scene.environment.dispose();
      }
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [src, alt]);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg z-10"
        >
          <div className="text-center">
            {poster ? (
              <img
                src={poster}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            ) : null}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="relative w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full mx-auto mb-3"
            />
            <p className="relative text-cyan-400 text-sm">Loading 3D model...</p>
          </div>
        </motion.div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg z-10">
          <div className="text-center p-4">
            <p className="text-red-400 text-sm mb-2">{error}</p>
            <p className="text-gray-500 text-xs">Unable to display this model</p>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: "400px", backgroundColor: "transparent" }}
      />

      {isLoaded && cameraControls && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-xs text-cyan-400 pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
          }}
        >
          Drag to rotate • Scroll to zoom
        </motion.div>
      )}
    </div>
  );
};
