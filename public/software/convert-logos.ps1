# PowerShell Script to Convert Software Logos to WebP Format
# Requires ImageMagick to be installed (use Q16 version, not Q16-HDRI)
# Install: choco install imagemagick

param(
    [string]$InputPath = ".",
    [int]$Size = 256,
    [int]$Quality = 85
)

Write-Host "Software Logo Converter" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is installed
try {
    $magickVersion = magick --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "ImageMagick not found"
    }
    Write-Host "✓ ImageMagick detected" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ ImageMagick not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ImageMagick:" -ForegroundColor Yellow
    Write-Host "  1. Run: choco install imagemagick" -ForegroundColor Yellow
    Write-Host "  2. Or download from: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "  3. Make sure to install Q16 version (NOT Q16-HDRI)" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Convert fallback SVG to WebP
Write-Host "Converting fallback icon..." -ForegroundColor Cyan
if (Test-Path "fallback-icon.svg") {
    try {
        magick convert "fallback-icon.svg" -resize "${Size}x${Size}" -quality $Quality "fallback-icon.webp"
        Write-Host "✓ Created fallback-icon.webp" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to convert fallback-icon.svg" -ForegroundColor Red
    }
} else {
    Write-Host "⚠ fallback-icon.svg not found" -ForegroundColor Yellow
}

Write-Host ""

# Find and convert PNG/JPG files
$imageFiles = Get-ChildItem -Path $InputPath -Include *.png,*.jpg,*.jpeg -File

if ($imageFiles.Count -eq 0) {
    Write-Host "No PNG or JPG files found to convert." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To add logos:" -ForegroundColor Cyan
    Write-Host "  1. Download logo files (PNG or JPG) to this directory" -ForegroundColor White
    Write-Host "  2. Run this script again to convert them to WebP" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "Converting $($imageFiles.Count) image(s)..." -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($file in $imageFiles) {
        $outputName = [System.IO.Path]::ChangeExtension($file.Name, ".webp")
        
        try {
            Write-Host "  Converting: $($file.Name) → $outputName" -ForegroundColor White
            magick convert $file.FullName -resize "${Size}x${Size}" -quality $Quality $outputName
            
            # Show file size comparison
            $originalSize = [math]::Round($file.Length / 1KB, 2)
            $newSize = [math]::Round((Get-Item $outputName).Length / 1KB, 2)
            $savings = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
            
            Write-Host "    Original: ${originalSize}KB → WebP: ${newSize}KB (${savings}% smaller)" -ForegroundColor Green
        } catch {
            Write-Host "    ✗ Failed to convert $($file.Name)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "Conversion complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Review the generated .webp files" -ForegroundColor White
Write-Host "  2. Delete original PNG/JPG files if conversions look good" -ForegroundColor White
Write-Host "  3. Update src/data/softwareData.ts with correct icon paths" -ForegroundColor White
Write-Host "  4. Test the Software Experience section in your browser" -ForegroundColor White
Write-Host ""

# List all WebP files
$webpFiles = Get-ChildItem -Path $InputPath -Filter *.webp
if ($webpFiles.Count -gt 0) {
    Write-Host "WebP files in directory:" -ForegroundColor Cyan
    foreach ($file in $webpFiles) {
        $size = [math]::Round($file.Length / 1KB, 2)
        Write-Host "  • $($file.Name) (${size}KB)" -ForegroundColor White
    }
    Write-Host ""
}
