# Image Optimization Guide

This guide explains how to optimize and manage images for the portfolio website to ensure fast loading times and optimal performance.

## 📁 Folder Structure

```
public/
├── projects/          # Project screenshots and thumbnails
│   ├── .gitkeep      # Folder documentation
│   └── placeholder.svg
├── art/              # Art portfolio images
│   ├── .gitkeep      # Folder documentation
│   └── placeholder.svg
└── og-image.svg      # Social media preview image
```

## 🎯 Image Size Guidelines

### Project Images

- **Format**: WebP (with fallback support)
- **Thumbnails**:
  - Dimensions: 800x600px (4:3 aspect ratio)
  - File size: < 200KB
  - Quality: 80-85%
- **Use case**: Project grid display

### Art Portfolio Images

- **Thumbnails**:
  - Dimensions: 600x600px (1:1 aspect ratio)
  - File size: < 200KB
  - Quality: 80-85%
- **Full-size** (for lightbox):
  - Dimensions: Max 1920x1920px
  - File size: < 500KB
  - Quality: 85-90%

### Social Media Preview

- **OG Image**:
  - Dimensions: 1200x630px
  - File size: < 300KB
  - Format: JPG or PNG (or SVG for placeholder)

## 📝 Naming Convention

Use descriptive kebab-case names that clearly identify the content:

### Projects

```
project-name-thumb.webp
project-name-full.webp (if needed)
```

Examples:

- `tower-defense-thumb.webp`
- `ecommerce-platform-thumb.webp`
- `task-manager-app-thumb.webp`

### Artworks

```
artwork-name-thumb.webp
artwork-name-full.webp
```

Examples:

- `cyberpunk-character-thumb.webp`
- `cyberpunk-character-full.webp`
- `forest-environment-thumb.webp`
- `ui-mockup-design-thumb.webp`

## 🛠️ Optimization Tools

### Online Tools (Recommended for Beginners)

1. **Squoosh** (https://squoosh.app/)

   - Google's free image compression tool
   - Drag and drop interface
   - Real-time preview
   - WebP conversion
   - Quality slider

2. **TinyPNG/TinyJPG** (https://tinypng.com/)

   - Batch compression
   - Smart lossy compression
   - Preserves quality

3. **CloudConvert** (https://cloudconvert.com/webp-converter)
   - Batch WebP conversion
   - Multiple format support
   - Quality settings

### Command Line Tools (Advanced)

#### cwebp (WebP Encoder)

Install:

```bash
# Windows (using Chocolatey)
choco install webp

# macOS (using Homebrew)
brew install webp

# Linux
sudo apt-get install webp
```

Usage:

```bash
# Convert single image
cwebp -q 80 input.jpg -o output.webp

# Convert with specific dimensions
cwebp -q 80 -resize 800 600 input.jpg -o output.webp

# Batch convert all JPGs in folder
for file in *.jpg; do cwebp -q 80 "$file" -o "${file%.jpg}.webp"; done
```

#### ImageMagick

Install:

```bash
# Windows
choco install imagemagick

# macOS
brew install imagemagick

# Linux
sudo apt-get install imagemagick
```

Usage:

```bash
# Resize and convert
magick input.jpg -resize 800x600 -quality 80 output.webp

# Batch process
magick mogrify -format webp -resize 800x600 -quality 80 *.jpg
```

## 📋 Step-by-Step Workflow

### Adding a New Project Image

1. **Prepare your image**

   - Take a screenshot or export from design tool
   - Crop to 4:3 aspect ratio (800x600px recommended)

2. **Optimize the image**

   - Use Squoosh or cwebp
   - Set quality to 80-85%
   - Convert to WebP format
   - Verify file size is < 200KB

3. **Name the file**

   - Use kebab-case: `my-project-thumb.webp`

4. **Add to project**
   - Place in `public/projects/` folder
   - Update `src/data/projects.ts`:
   ```typescript
   {
     id: 'my-project',
     title: 'My Project',
     image: '/projects/my-project-thumb.webp',
     // ... other fields
   }
   ```

### Adding a New Artwork

1. **Prepare two versions**

   - Thumbnail: 600x600px, < 200KB
   - Full-size: Max 1920x1920px, < 500KB

2. **Optimize both images**

   - Use Squoosh or cwebp
   - Thumbnail: Quality 80-85%
   - Full-size: Quality 85-90%
   - Convert to WebP format

3. **Name the files**

   - Thumbnail: `artwork-name-thumb.webp`
   - Full-size: `artwork-name-full.webp`

4. **Add to project**
   - Place in `public/art/` folder
   - Update `src/data/artworks.ts`:
   ```typescript
   {
     id: 'my-artwork',
     title: 'My Artwork',
     image: '/art/artwork-name-thumb.webp',
     fullImage: '/art/artwork-name-full.webp',
     // ... other fields
   }
   ```

## ⚡ Performance Tips

### 1. Lazy Loading

- Already implemented in the portfolio
- Images load only when they enter the viewport
- Reduces initial page load time

### 2. Responsive Images

Consider using `srcset` for different screen sizes:

```html
<img
  src="/projects/project-thumb.webp"
  srcset="
    /projects/project-thumb-small.webp 400w,
    /projects/project-thumb.webp       800w
  "
  sizes="(max-width: 768px) 400px, 800px"
  alt="Project thumbnail"
/>
```

### 3. Image Dimensions

Always specify width and height to prevent layout shift:

```html
<img
  src="/projects/project-thumb.webp"
  width="800"
  height="600"
  alt="Project thumbnail"
/>
```

### 4. Compression Quality Guide

- **80-85%**: Good balance for thumbnails
- **85-90%**: Better quality for full-size images
- **90-95%**: High quality for hero images
- Below 80%: May show visible artifacts

## 🔍 Quality Checklist

Before adding images to the portfolio, verify:

- [ ] Image is in WebP format
- [ ] File size meets guidelines (< 200KB for thumbnails, < 500KB for full-size)
- [ ] Dimensions are appropriate (800x600 for projects, 600x600 for art thumbnails)
- [ ] Image is sharp and clear (no blur or pixelation)
- [ ] Colors are accurate and vibrant
- [ ] File name uses kebab-case
- [ ] Image is placed in correct folder (`public/projects/` or `public/art/`)
- [ ] Data file is updated (`projects.ts` or `artworks.ts`)

## 🚀 Testing Performance

### Lighthouse Audit

1. Open your portfolio in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Run audit for Performance
5. Check "Properly size images" and "Serve images in next-gen formats"

### Target Metrics

- Performance score: 80+
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 2.5s
- Total image size: < 2MB for entire page

## 📊 Batch Optimization Script

For processing multiple images at once:

```bash
#!/bin/bash
# optimize-images.sh

# Create output directories
mkdir -p optimized/projects
mkdir -p optimized/art

# Optimize project images (800x600)
for img in projects/*.{jpg,png}; do
  filename=$(basename "$img")
  name="${filename%.*}"
  cwebp -q 80 -resize 800 600 "$img" -o "optimized/projects/${name}-thumb.webp"
done

# Optimize art thumbnails (600x600)
for img in art/*-thumb.{jpg,png}; do
  filename=$(basename "$img")
  name="${filename%.*}"
  cwebp -q 80 -resize 600 600 "$img" -o "optimized/art/${name}.webp"
done

# Optimize art full-size (max 1920x1920)
for img in art/*-full.{jpg,png}; do
  filename=$(basename "$img")
  name="${filename%.*}"
  cwebp -q 85 -resize 1920 1920 "$img" -o "optimized/art/${name}.webp"
done

echo "Optimization complete! Check the 'optimized' folder."
```

## 🆘 Troubleshooting

### Image not loading

- Check file path is correct (case-sensitive)
- Verify file is in `public/` folder
- Check browser console for 404 errors

### Image too large

- Re-compress with lower quality (try 70-75%)
- Reduce dimensions
- Remove metadata: `cwebp -metadata none`

### Image looks blurry

- Increase quality setting (85-90%)
- Check source image resolution
- Avoid upscaling small images

### Slow loading

- Verify lazy loading is working
- Check total page size in DevTools Network tab
- Consider using a CDN for image delivery

## 📚 Additional Resources

- [WebP Documentation](https://developers.google.com/speed/webp)
- [Image Optimization Guide by Google](https://web.dev/fast/#optimize-your-images)
- [Responsive Images Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)

---

**Remember**: Optimized images = Faster loading = Better user experience = Higher Lighthouse scores!
