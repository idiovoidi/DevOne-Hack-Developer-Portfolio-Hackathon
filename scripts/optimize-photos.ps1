# Photo Optimization Script for Portfolio
# Processes photography images for web use with thumbnails and full-size versions

param(
    [Parameter(Mandatory=$true)]
    [string]$SourceFolder,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFolder = "public/art",
    
    [Parameter(Mandatory=$false)]
    [int]$ThumbSize = 600,
    
    [Parameter(Mandatory=$false)]
    [int]$FullSize = 1920,
    
    [Parameter(Mandatory=$false)]
    [int]$ThumbQuality = 80,
    
    [Parameter(Mandatory=$false)]
    [int]$FullQuality = 85
)

Write-Host "=== Photo Optimization Script ===" -ForegroundColor Cyan
Write-Host "Source: $SourceFolder" -ForegroundColor Yellow
Write-Host "Output: $OutputFolder" -ForegroundColor Yellow
Write-Host ""

# Check if ImageMagick is installed - prefer Q16 over Q16-HDRI
$magickPath = $null

# First, check for Q16 (non-HDRI) version in common locations
$preferredPaths = @(
    "C:\Program Files\ImageMagick-7.1.2-Q16\magick.exe",
    "C:\Program Files\ImageMagick-7.1.1-Q16\magick.exe",
    "C:\Program Files\ImageMagick-7.1.0-Q16\magick.exe"
)

foreach ($path in $preferredPaths) {
    if (Test-Path $path) {
        $magickPath = $path
        Write-Host "Found ImageMagick Q16 at: $magickPath" -ForegroundColor Green
        break
    }
}

# If Q16 not found, check PATH (but warn if it's HDRI)
if (-not $magickPath) {
    $pathCmd = Get-Command magick -ErrorAction SilentlyContinue
    if ($pathCmd) {
        $magickPath = $pathCmd.Source
        if ($magickPath -match "HDRI") {
            Write-Host "WARNING: Using HDRI version - images may look 'deep fried'" -ForegroundColor Yellow
            Write-Host "Consider installing Q16 version instead" -ForegroundColor Yellow
        }
        Write-Host "Found ImageMagick at: $magickPath" -ForegroundColor Green
    }
}

if (-not $magickPath) {
    Write-Host "ERROR: ImageMagick not found!" -ForegroundColor Red
    Write-Host "Please install ImageMagick:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://imagemagick.org/script/download.php#windows" -ForegroundColor White
    Write-Host "  2. Or use Chocolatey: choco install imagemagick" -ForegroundColor White
    Write-Host "  3. Make sure to check 'Add to PATH' during installation" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Get the magick command (either from PATH or full path)
$magickCmd = if ($magickPath -is [string]) { $magickPath } else { $magickPath.Source }

# Create output directory if it doesn't exist
$outputPath = Join-Path $PSScriptRoot "..\$OutputFolder"
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
    Write-Host "Created output directory: $outputPath" -ForegroundColor Green
}

# Get all image files
$images = Get-ChildItem -Path $SourceFolder -File | Where-Object { 
    $_.Extension -match '\.(jpg|jpeg|png)$' 
}

if ($images.Count -eq 0) {
    Write-Host "No images found in $SourceFolder" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($images.Count) images to process" -ForegroundColor Green
Write-Host ""

$processed = 0
$skipped = 0

foreach ($image in $images) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($image.Name)
    # Convert to kebab-case and make web-friendly
    $webName = $baseName -replace '\s+', '-' -replace '[^a-zA-Z0-9-]', '' -replace '--+', '-'
    $webName = $webName.ToLower()
    
    $thumbOutput = Join-Path $outputPath "$webName-thumb.webp"
    $fullOutput = Join-Path $outputPath "$webName-full.webp"
    
    Write-Host "Processing: $($image.Name)" -ForegroundColor Cyan
    Write-Host "  -> $webName-thumb.webp" -ForegroundColor Gray
    Write-Host "  -> $webName-full.webp" -ForegroundColor Gray
    
    try {
        # Create thumbnail (square crop from center)
        & $magickCmd convert "$($image.FullName)" `
            -resize "${ThumbSize}x${ThumbSize}^" `
            -gravity center `
            -extent "${ThumbSize}x${ThumbSize}" `
            -quality $ThumbQuality `
            -define webp:method=6 `
            "$thumbOutput"
        
        # Create full-size (maintain aspect ratio, max dimension)
        & $magickCmd convert "$($image.FullName)" `
            -resize "${FullSize}x${FullSize}>" `
            -quality $FullQuality `
            -define webp:method=6 `
            "$fullOutput"
        
        # Get file sizes
        $thumbSize = [math]::Round((Get-Item $thumbOutput).Length / 1KB, 2)
        $fullSizeKB = [math]::Round((Get-Item $fullOutput).Length / 1KB, 2)
        
        Write-Host "  ✓ Thumbnail: ${thumbSize}KB" -ForegroundColor Green
        Write-Host "  ✓ Full-size: ${fullSizeKB}KB" -ForegroundColor Green
        
        # Warn if files are too large
        if ($thumbSize -gt 200) {
            Write-Host "  ⚠ Warning: Thumbnail exceeds 200KB" -ForegroundColor Yellow
        }
        if ($fullSizeKB -gt 500) {
            Write-Host "  ⚠ Warning: Full-size exceeds 500KB" -ForegroundColor Yellow
        }
        
        $processed++
    }
    catch {
        Write-Host "  ✗ Error processing image: $_" -ForegroundColor Red
        $skipped++
    }
    
    Write-Host ""
}

Write-Host "=== Processing Complete ===" -ForegroundColor Cyan
Write-Host "Processed: $processed images" -ForegroundColor Green
if ($skipped -gt 0) {
    Write-Host "Skipped: $skipped images" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review images in: $outputPath" -ForegroundColor White
Write-Host "2. Update src/data/artworks.ts with new entries" -ForegroundColor White
Write-Host "3. Test in browser with 'npm run dev'" -ForegroundColor White
