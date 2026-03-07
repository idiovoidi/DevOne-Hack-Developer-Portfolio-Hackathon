FBX to glb conversion script:
node scripts/convert-fbx-to-glb.js "public/3D/your-model.fbx"


File Formats
glTF/GLB (Recommended)

.gltf (JSON + separate textures) or .glb (binary, all-in-one)
Industry standard for web 3D
Compact file sizes, optimized for web
Supports animations, materials, textures
Best compatibility with web viewers
Other Formats

.obj + .mtl - Simple, widely supported, but no animations
.fbx - Needs conversion, larger files
.usdz - Good for AR on iOS, but limited web support
Best Libraries for React
1. React Three Fiber (Recommended)

React wrapper for Three.js
Full control, highly customizable
Great for interactive scenes
~600KB bundle size
2. Model Viewer (Google)

Web component, easiest to use
Built-in AR support
Auto-rotation, camera controls
~200KB bundle size
No React knowledge needed
3. Sketchfab Embed

Host models on Sketchfab
Just embed iframe
Zero bundle size
Limited customization
My Recommendation
For your portfolio, I'd suggest Model Viewer because:

Drop-in simple (like adding an image)
Automatic camera controls
Works with your existing dark theme
Small performance impact
Supports .glb files