# Quick Start: Adding Software Logos

## Fastest Method (5 minutes)

### Step 1: Download Logos
Visit these sites to download logos for your software:

**Blender:**
- https://www.blender.org/about/logo/
- Download PNG, use the icon version

**Adobe Photoshop:**
- https://www.adobe.com/about-adobe/brand-center.html
- Or use Simple Icons: https://simpleicons.org/?q=adobe

**React:**
- https://simpleicons.org/?q=react
- Download SVG, convert to PNG if needed

**TypeScript:**
- https://simpleicons.org/?q=typescript
- Download SVG, convert to PNG if needed

**Unity:**
- https://unity.com/brand-guidelines
- Download from press kit

**Maya:**
- https://www.autodesk.com/brand-guidelines
- Or search "Autodesk Maya logo PNG"

### Step 2: Convert to WebP

**Option A: Use the PowerShell Script (Windows)**
```powershell
# 1. Place all downloaded PNG/JPG files in this directory
# 2. Run the conversion script
.\convert-logos.ps1
```

**Option B: Use Online Tool**
1. Go to https://squoosh.app/
2. Upload each logo
3. Select WebP format
4. Resize to 256x256px
5. Set quality to 85
6. Download and save to this directory

**Option C: Use ImageMagick Command Line**
```bash
# Convert single file
magick convert logo.png -resize 256x256 -quality 85 logo.webp

# Convert all PNG files
magick mogrify -format webp -resize 256x256 -quality 85 *.png
```

### Step 3: Verify Files
Make sure you have these files in `public/software/`:
- [ ] `blender.webp`
- [ ] `photoshop.webp`
- [ ] `react.webp`
- [ ] `typescript.webp`
- [ ] `unity.webp`
- [ ] `maya.webp`
- [ ] `fallback-icon.webp` (auto-generated from SVG)

### Step 4: Test
1. Start your dev server: `npm run dev`
2. Navigate to the Software Experience section
3. Verify all logos display correctly
4. Check that fallback icon appears for any missing logos

## Troubleshooting

**Logos not showing?**
- Check file names match exactly (case-sensitive)
- Verify files are in `public/software/` directory
- Check browser console for 404 errors
- Clear browser cache and reload

**Logos look blurry?**
- Ensure source images are at least 256x256px
- Try higher quality setting (90-95) when converting
- Use SVG sources when possible for best quality

**File sizes too large?**
- Target < 50KB per logo
- Reduce quality setting (try 75-80)
- Use WebP format (much smaller than PNG)
- Optimize source images before converting

## Need Help?

See the full README.md in this directory for detailed instructions and troubleshooting.
