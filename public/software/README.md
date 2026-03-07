# Software Logo Assets

This directory contains logo assets for the Software Experience section of the portfolio.

## Required Logos

Based on `src/data/softwareData.ts`, the following logo files are needed:

### Main (Current) Software
- `blender.webp` - Blender 3D modeling software logo
- `photoshop.webp` - Adobe Photoshop logo
- `react.webp` - React JavaScript library logo
- `typescript.webp` - TypeScript logo

### Past (Retired) Software
- `unity.webp` - Unity game engine logo
- `maya.webp` - Autodesk Maya logo

### Fallback Icon
- `fallback-icon.webp` - Generic software icon used when a logo fails to load

## Logo Specifications

**Format:** WebP (optimized for web performance)
**Recommended Size:** 256x256px (will be displayed at 64px with retina support)
**Background:** Transparent or solid color that works with dark theme
**File Size:** Target < 50KB per logo

## How to Add Logos

### Option 1: Download Official Logos
1. Visit the official website of each software
2. Download the logo in high resolution (PNG or SVG)
3. Convert to WebP format using ImageMagick or online tools

### Option 2: Use ImageMagick (Recommended)
```bash
# Convert PNG to WebP with optimization
magick convert input-logo.png -resize 256x256 -quality 85 output-logo.webp

# Batch convert all logos in a directory
magick mogrify -format webp -resize 256x256 -quality 85 *.png
```

### Option 3: Online Conversion Tools
- [Squoosh](https://squoosh.app/) - Google's image optimization tool
- [CloudConvert](https://cloudconvert.com/png-to-webp) - Online file converter

## Logo Sources

### Free Logo Resources
- [Simple Icons](https://simpleicons.org/) - SVG icons for popular brands
- [Worldvectorlogo](https://worldvectorlogo.com/) - Free vector logos
- [Seeklogo](https://seeklogo.com/) - Logo database
- [Official brand press kits](https://www.google.com/search?q=brand+press+kit) - Search for "[Software Name] press kit"

### Important Notes
- **Licensing:** Ensure you have the right to use each logo. Most software companies provide logos for promotional use in their press kits.
- **Trademarks:** Software logos are typically trademarked. Use them only to indicate your experience with the software.
- **Attribution:** Some logos may require attribution. Check the license terms.

## Fallback Icon

If you don't have a specific logo, the component will automatically use `fallback-icon.webp`. You can create a simple generic icon or use a placeholder.

### Creating a Simple Fallback Icon
```bash
# Create a simple colored square with ImageMagick
magick convert -size 256x256 xc:#6B46C1 -gravity center -pointsize 120 -fill white -annotate +0+0 "?" fallback-icon.webp
```

## Adding New Software

When adding new software to `src/data/softwareData.ts`:
1. Add the logo file to this directory following the naming convention
2. Use kebab-case for the filename (e.g., `adobe-after-effects.webp`)
3. Update the icon path in the data file: `icon: '/software/adobe-after-effects.webp'`
4. Test that the logo displays correctly in the Software Experience section

## Testing

After adding logos, verify:
- [ ] All logos load correctly in the Software Experience section
- [ ] Logos display at 64px size with good clarity
- [ ] Fallback icon appears for any missing logos
- [ ] File sizes are optimized (< 50KB each)
- [ ] Logos work well with the dark void aesthetic theme
