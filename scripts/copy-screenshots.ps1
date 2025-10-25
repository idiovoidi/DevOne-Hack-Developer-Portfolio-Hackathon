# Simple PowerShell Script to Copy Screenshots
# Copies screenshots from Desktop to portfolio projects folder

param(
    [string]$SourceFolder = "C:\Users\Mitchell\Desktop\Dev Screenshots\Social_Content_Manager",
    [string]$DestFolder = "public\projects",
    [string]$ProjectName = "social-content-manager"
)

Write-Host "=== Copying Screenshots to Portfolio ===" -ForegroundColor Cyan
Write-Host ""

# Check if source folder exists
if (-not (Test-Path $SourceFolder)) {
    Write-Host "Error: Source folder not found: $SourceFolder" -ForegroundColor Red
    exit 1
}

# Create destination folder if it doesn't exist
if (-not (Test-Path $DestFolder)) {
    New-Item -ItemType Directory -Path $DestFolder -Force | Out-Null
}

# Get all image files from source folder
$imageFiles = Get-ChildItem -Path $SourceFolder -Include *.png,*.jpg,*.jpeg,*.bmp,*.webp -File

if ($imageFiles.Count -eq 0) {
    Write-Host "No image files found in: $SourceFolder" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($imageFiles.Count) image(s)" -ForegroundColor Green
Write-Host ""

# List files for user to choose
Write-Host "Available screenshots:" -ForegroundColor Yellow
for ($i = 0; $i -lt $imageFiles.Count; $i++) {
    $file = $imageFiles[$i]
    $size = [math]::Round($file.Length / 1KB, 2)
    Write-Host "  [$($i+1)] $($file.Name) ($size KB)" -ForegroundColor White
}
Write-Host ""

# Copy all files with numbered names
Write-Host "Copying all screenshots..." -ForegroundColor Cyan
$counter = 1
foreach ($file in $imageFiles) {
    $extension = $file.Extension
    $outputName = "$ProjectName-$counter$extension"
    $outputPath = Join-Path $DestFolder $outputName
    
    Copy-Item -Path $file.FullName -Destination $outputPath -Force
    Write-Host "  Copied: $outputName" -ForegroundColor Green
    $counter++
}

Write-Host ""
Write-Host "=== Copy Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Screenshots saved to: $DestFolder" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the images in: $DestFolder" -ForegroundColor White
Write-Host "2. Choose your favorite for the project card" -ForegroundColor White
Write-Host "3. Rename it to: $ProjectName-thumb.png (or .jpg/.webp)" -ForegroundColor White
Write-Host "4. Tell Kiro which image you chose" -ForegroundColor White
Write-Host ""
Write-Host "Optional: Optimize images for web using:" -ForegroundColor Cyan
Write-Host "  - TinyPNG: https://tinypng.com/" -ForegroundColor White
Write-Host "  - Squoosh: https://squoosh.app/" -ForegroundColor White
Write-Host "  - ImageMagick (if installed)" -ForegroundColor White
