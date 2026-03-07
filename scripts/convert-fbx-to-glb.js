#!/usr/bin/env node

/**
 * FBX to GLB Converter Script
 * 
 * Converts FBX files to GLB format for web display using Three.js
 * Usage: node scripts/convert-fbx-to-glb.js <input.fbx> [output.glb]
 */

import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { resolve, extname } from 'path';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';
import { GLTFExporter } from 'three-stdlib';

// Get command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Error: No input file specified');
  console.log('\nUsage: node scripts/convert-fbx-to-glb.js <input.fbx> [output.glb]');
  console.log('\nExample:');
  console.log('  node scripts/convert-fbx-to-glb.js public/3D/model.fbx');
  console.log('  node scripts/convert-fbx-to-glb.js public/3D/model.fbx public/3D/model.glb');
  process.exit(1);
}

const inputPath = resolve(args[0]);
const outputPath = args[1] 
  ? resolve(args[1])
  : inputPath.replace(extname(inputPath), '.glb');

// Validate input file exists
if (!existsSync(inputPath)) {
  console.error(`❌ Error: Input file not found: ${inputPath}`);
  process.exit(1);
}

// Validate input is FBX
if (extname(inputPath).toLowerCase() !== '.fbx') {
  console.error(`❌ Error: Input file must be .fbx format`);
  process.exit(1);
}

console.log('🔄 Converting FBX to GLB using Three.js...');
console.log(`   Input:  ${inputPath}`);
console.log(`   Output: ${outputPath}`);

try {
  // Read FBX file
  console.log('\n📖 Reading FBX file...');
  const fbxData = readFileSync(inputPath);
  
  // Load FBX
  console.log('⚙️  Parsing FBX...');
  const loader = new FBXLoader();
  const fbxScene = loader.parse(fbxData.buffer, '');
  
  console.log(`✓ Loaded FBX with ${fbxScene.children.length} objects`);
  
  // Export to GLB
  console.log('📦 Exporting to GLB...');
  const exporter = new GLTFExporter();
  
  exporter.parse(
    fbxScene,
    (gltf) => {
      // Write GLB file
      const buffer = Buffer.from(gltf);
      writeFileSync(outputPath, buffer);
      
      // Show file size
      const stats = statSync(outputPath);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log('\n✅ Conversion successful!');
      console.log(`📦 Output file: ${outputPath}`);
      console.log(`📊 File size: ${fileSizeInMB} MB`);
    },
    (error) => {
      console.error('\n❌ Export failed:', error);
      process.exit(1);
    },
    { binary: true }
  );
  
} catch (error) {
  console.error('\n❌ Conversion failed:', error.message);
  console.error(error);
  process.exit(1);
}
