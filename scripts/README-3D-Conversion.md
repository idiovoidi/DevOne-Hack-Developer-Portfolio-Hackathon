# 3D Model Conversion Guide

## Issue: Textures Not Embedding

FBX files often don't properly link textures during automated conversion. Here are your options:

## Option 1: Use Blender (Recommended - Best Quality)

1. **Download Blender** (free): https://www.blender.org/download/
2. **Import FBX**:
   - File → Import → FBX (.fbx)
   - Select your FBX file
   - Textures should auto-load if in same folder
3. **Verify Textures**:
   - Switch to "Shading" workspace (top tabs)
   - Select object, check material nodes
   - If textures missing, manually reconnect in Shader Editor
4. **Export GLB**:
   - File → Export → glTF 2.0 (.glb)
   - Check these options:
     - ✅ Format: glTF Binary (.glb)
     - ✅ Include: Selected Objects (or all)
     - ✅ Transform: +Y Up
     - ✅ Geometry: Apply Modifiers
     - ✅ Materials: Export
     - ✅ Images: Automatic (embeds textures)
   - Click "Export glTF 2.0"

## Option 2: Online Converter with Manual Texture Upload

Use: https://products.aspose.app/3d/conversion/fbx-to-glb

1. Upload your FBX file
2. Upload texture files separately if prompted
3. Download the converted GLB

## Option 3: Fix Texture Paths in FBX

Your FBX might have absolute paths. To fix:

1. Open FBX in text editor (it's partially text-based)
2. Search for texture paths
3. Make them relative to the FBX file location
4. Re-run the converter script

## Current Script Usage

```bash
# Convert FBX to GLB (works for geometry, may miss textures)
node scripts/convert-fbx-to-glb.js "public/3D/model.fbx"

# Or specify output path
node scripts/convert-fbx-to-glb.js "public/3D/model.fbx" "public/3D/output.glb"
```

## Texture Files Found

Your Corrupted Healthpack has these PBR textures:
- `openPBR_shader1_AlbedoTransparency.png` (Base color + alpha)
- `openPBR_shader1_Emission.png` (Glow/emissive)
- `openPBR_shader1_MetallicSmoothness.png` (Metal + roughness)
- `openPBR_shader1_Normal.png` (Surface detail)

These need to be embedded in the GLB for web display.

## Quick Fix: Use Blender

Since you're on Windows and have Maya (exported the FBX), Blender is the fastest solution:
1. Install Blender (5 min)
2. Import FBX (textures auto-load)
3. Export GLB with embedded textures (1 click)
4. Done!

Total time: ~10 minutes including Blender download.
