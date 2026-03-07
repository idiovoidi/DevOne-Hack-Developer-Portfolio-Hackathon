# Software Logo Checklist

Track which logos you've added to the `public/software/` directory.

## Required Logos (from softwareData.ts)

### Main (Current) Software
- [ ] `blender.webp` - Blender 4.2
- [ ] `photoshop.webp` - Adobe Photoshop
- [ ] `react.webp` - React
- [ ] `typescript.webp` - TypeScript

### Past (Retired) Software
- [ ] `unity.webp` - Unity (last used 2022)
- [ ] `maya.webp` - Autodesk Maya (last used 2020)

### System Files
- [x] `fallback-icon.webp` - Generic fallback icon (auto-generated)
- [x] `fallback-icon.svg` - Source SVG for fallback icon

## Quick Actions

### Download All Logos (Quick Links)
1. **Blender**: https://www.blender.org/about/logo/
2. **Photoshop**: https://simpleicons.org/?q=adobe
3. **React**: https://simpleicons.org/?q=react
4. **TypeScript**: https://simpleicons.org/?q=typescript
5. **Unity**: https://unity.com/brand-guidelines
6. **Maya**: Search "Autodesk Maya logo PNG"

### Convert to WebP
```powershell
# Run this after downloading PNG/JPG files
.\convert-logos.ps1
```

### Test in Browser
```bash
npm run dev
# Navigate to Software Experience section
# Verify all logos display correctly
```

## File Size Guidelines

Target file sizes (after WebP conversion):
- ✅ Optimal: < 30KB
- ⚠️ Acceptable: 30-50KB
- ❌ Too large: > 50KB (re-optimize)

## Troubleshooting

**Logo not showing?**
1. Check filename matches exactly (case-sensitive)
2. Verify file is in `public/software/` directory
3. Check browser console for errors
4. Clear cache and reload

**Logo looks blurry?**
1. Use higher resolution source (at least 256x256px)
2. Increase quality setting when converting
3. Use SVG sources when possible

**File too large?**
1. Reduce quality setting (try 75-80)
2. Ensure source is not unnecessarily large
3. Use WebP format (much smaller than PNG)

## Adding More Software

When you add new software to `src/data/softwareData.ts`:
1. Add logo file here with kebab-case name
2. Update icon path in data file
3. Add to this checklist for tracking
4. Test in browser

---

**Status**: ⏳ Waiting for logo files to be added
**Last Updated**: Task 7 completion
