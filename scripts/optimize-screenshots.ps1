# Screenshot Optimization Script for Portfolio
# Processes project screenshots for web use

param(
    [Parameter(Mandatory=$true)]
    [string]$SourceFolder,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFolder = "public/projects",
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectName = "screenshot",
    
    [Parameter(Mandatory=$false)]
    [int]$MaxWidth = 800,
    
    [Parameter(Mandatory=$false)]
    [int]$Quality = 85
)

Write-Host "=== Screenshot Optimization Script ===" -ForegroundColor Cyan
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
    $_.Extension -match '\.(jpg|jpeg|png|bmp)$' 
}

if ($images.Count -eq 0) {
    Write-Host "No images found in $SourceFolder" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($images.Count) images to process" -ForegroundColor Green
Write-Host ""

$processed = 0
$skipped = 0
$counter = 1

foreach ($image in $images) {
    $outputName = "$ProjectName-$counter.webp"
    $outputFile = Join-Path $outputPath $outputName
    
    Write-Host "Processing: $($image.Name)" -ForegroundColor Cyan
    Write-Host "  -> $outputName" -ForegroundColor Gray
    
    try {
        # Optimize and convert to WebP (maintain aspect ratio, max width)
        & $magickCmd "$($image.FullName)" `
            -resize "${MaxWidth}x>" `
            -quality $Quality `
            -define webp:method=6 `
            -strip `
            "$outputFile"
        
        # Get file sizes
        $originalSizeKB = [math]::Round($image.Length / 1KB, 2)
        $optimizedSizeKB = [math]::Round((Get-Item $outputFile).Length / 1KB, 2)
        $savings = if ($image.Length -gt 0) { 
            [math]::Round((($image.Length - (Get-Item $outputFile).Length) / $image.Length) * 100, 1) 
        } else { 0 }
        
        Write-Host "  ✓ Original: ${originalSizeKB}KB -> Optimized: ${optimizedSizeKB}KB (${savings}% smaller)" -ForegroundColor Green
        
        # Warn if file is too large
        if ($optimizedSizeKB -gt 200) {
            Write-Host "  ⚠ Warning: File exceeds 200KB (recommended for thumbnails)" -ForegroundColor Yellow
        }
        
        $processed++
        $counter++
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
Write-Host "Output location: $outputPath" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review images in: $outputPath" -ForegroundColor White
Write-Host "2. Choose your favorite screenshot" -ForegroundColor White
Write-Host "3. Rename it to: $ProjectName-thumb.webp" -ForegroundColor White
Write-Host "4. Update src/data/projects.ts with the image path" -ForegroundColor White
