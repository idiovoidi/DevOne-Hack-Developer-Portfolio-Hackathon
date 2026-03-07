#!/usr/bin/env node

/**
 * Apply Textures to GLB Script
 * 
 * Loads a GLB file and applies PBR textures to it
 * Usage: node scripts/apply-textures-to-glb.js <model.glb> <texture-folder> [output.glb]
 */

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'fs';
import { resolve, join, extname, basename } from 'path';
import { JSDOM } from 'jsdom';
import { Canvas } from 'canvas';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { GLTFExporter } from 'three-stdlib';

// Setup DOM environment for Three.js
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.HTMLCanvasElement = Canvas;
global.HTMLImageElement = Canvas.Image;

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Error: Missing required arguments');
  console.log('\nUsage: node scripts/apply-textures-to-glb.js <model.glb> <texture-folder> [output.glb]');
  console.log('\nExample:');
  console.log('  node scripts/apply-textures-to-glb.js public/3D/model.glb public/3D/textures');
  console.log('  node scripts/apply-textures-to-glb.js public/3D/model.glb public/3D/textures public/3D/model-textured.glb');
  process.exit(1);
}

const modelPath = resolve(args[0]);
const textureFolderPath = resolve(args[1]);
const outputPath = args[2] 
  ? resolve(args[2])
  : modelPath.replace('.glb', '-textured.glb');

// Validate inputs
if (!existsSync(modelPath)) {
  console.error(`❌ Error: Model file not found: ${modelPath}`);
  process.exit(1);
}

if (!existsSync(textureFolderPath)) {
  console.error(`❌ Error: Texture folder not found: ${textureFolderPath}`);
  process.exit(1);
}

console.log('🎨 Applying textures to GLB...');
console.log(`   Model:    ${modelPath}`);
console.log(`   Textures: ${textureFolderPath}`);
console.log(`   Output:   ${outputPath}`);

try {
  // Find texture files
  console.log('\n📂 Scanning for textures...');
  const textureFiles = readdirSync(textureFolderPath).filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );
  
  if (textureFiles.length === 0) {
    console.error('❌ No texture files found in folder');
    process.exit(1);
  }
  
  console.log(`✓ Found ${textureFiles.length} texture files:`);
  textureFiles.forEach(file => console.log(`  - ${file}`));
  
  // Categorize textures by type
  const textures = {
    albedo: null,
    normal: null,
    metallic: null,
    roughness: null,
    emission: null,
    ao: null
  };
  
  textureFiles.forEach(file => {
    const lowerFile = file.toLowerCase();
    const fullPath = join(textureFolderPath, file);
    
    if (lowerFile.includes('albedo') || lowerFile.includes('diffuse') || lowerFile.includes('color') || lowerFile.includes('transparency')) {
      textures.albedo = fullPath;
    } else if (lowerFile.includes('normal')) {
      textures.normal = fullPath;
    } else if (lowerFile.includes('metallic') || lowerFile.includes('smoothness')) {
      textures.metallic = fullPath;
    } else if (lowerFile.includes('roughness')) {
      textures.roughness = fullPath;
    } else if (lowerFile.includes('emission') || lowerFile.includes('emissive')) {
      textures.emission = fullPath;
    } else if (lowerFile.includes('ao') || lowerFile.includes('ambient')) {
      textures.ao = fullPath;
    }
  });
  
  console.log('\n🔍 Texture mapping:');
  Object.entries(textures).forEach(([type, path]) => {
    if (path) console.log(`  ✓ ${type}: ${basename(path)}`);
  });
  
  // Load GLB
  console.log('\n📖 Loading GLB file...');
  const glbData = readFileSync(modelPath);
  const loader = new GLTFLoader();
  
  loader.parse(glbData.buffer, '', (gltf) => {
    console.log('✓ GLB loaded successfully');
    
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = {};
    
    console.log('\n🖼️  Loading textures...');
    Object.entries(textures).forEach(([type, path]) => {
      if (path) {
        try {
          const textureData = readFileSync(path);
          const base64 = textureData.toString('base64');
          const ext = extname(path).slice(1);
          const dataUrl = `data:image/${ext};base64,${base64}`;
          loadedTextures[type] = textureLoader.load(dataUrl);
          console.log(`  ✓ Loaded ${type} texture`);
        } catch (err) {
          console.log(`  ⚠️  Failed to load ${type}: ${err.message}`);
        }
      }
    });
    
    // Apply textures to materials
    console.log('\n🎨 Applying textures to materials...');
    let materialCount = 0;
    
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        
        materials.forEach(mat => {
          // Convert to MeshStandardMaterial if needed
          if (!(mat instanceof THREE.MeshStandardMaterial)) {
            const newMat = new THREE.MeshStandardMaterial();
            newMat.copy(mat);
            child.material = newMat;
          }
          
          const material = child.material;
          
          // Apply textures
          if (loadedTextures.albedo) {
            material.map = loadedTextures.albedo;
            material.map.colorSpace = THREE.SRGBColorSpace;
          }
          if (loadedTextures.normal) {
            material.normalMap = loadedTextures.normal;
          }
          if (loadedTextures.metallic) {
            material.metalnessMap = loadedTextures.metallic;
            material.roughnessMap = loadedTextures.metallic; // Often combined
          }
          if (loadedTextures.roughness) {
            material.roughnessMap = loadedTextures.roughness;
          }
          if (loadedTextures.emission) {
            material.emissiveMap = loadedTextures.emission;
            material.emissive = new THREE.Color(0xffffff);
            material.emissiveIntensity = 1.0;
          }
          if (loadedTextures.ao) {
            material.aoMap = loadedTextures.ao;
          }
          
          material.needsUpdate = true;
          materialCount++;
        });
      }
    });
    
    console.log(`✓ Applied textures to ${materialCount} materials`);
    
    // Export textured GLB
    console.log('\n📦 Exporting textured GLB...');
    const exporter = new GLTFExporter();
    
    exporter.parse(
      gltf.scene,
      (result) => {
        const buffer = Buffer.from(result);
        writeFileSync(outputPath, buffer);
        
        const stats = statSync(outputPath);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log('\n✅ Success!');
        console.log(`📦 Output: ${outputPath}`);
        console.log(`📊 Size: ${fileSizeInMB} MB`);
      },
      (error) => {
        console.error('\n❌ Export failed:', error.message);
        process.exit(1);
      },
      {
        binary: true,
        embedImages: true,
        maxTextureSize: 2048
      }
    );
  }, (error) => {
    console.error('\n❌ Failed to load GLB:', error);
    process.exit(1);
  });
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error(error);
  process.exit(1);
}
