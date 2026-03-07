# Blender FBX to GLB Converter (PowerShell)
# Requires Blender to be installed
# Usage: .\scripts\blender-convert.ps1 "path\to\model.fbx" "path\to\output.glb"

param(
    [Parameter(Mandatory=$true)]
    [string]$InputFile,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFile
)

# Find Blender installation
$blenderPaths = @(
    "C:\Program Files\Blender Foundation\Blender 5.0\blender.exe",
    "C:\Program Files\Blender Foundation\Blender 4.3\blender.exe",
    "C:\Program Files\Blender Foundation\Blender 4.2\blender.exe",
    "C:\Program Files\Blender Foundation\Blender 4.1\blender.exe",
    "C:\Program Files\Blender Foundation\Blender 4.0\blender.exe",
    "C:\Program Files\Blender Foundation\Blender 3.6\blender.exe",
    "C:\Program Files\Blender Foundation\Blender\blender.exe"
)

$blenderExe = $null
foreach ($path in $blenderPaths) {
    if (Test-Path $path) {
        $blenderExe = $path
        break
    }
}

if (-not $blenderExe) {
    Write-Host "❌ Blender not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Blender from: https://www.blender.org/download/" -ForegroundColor Yellow
    Write-Host "Or specify the path manually in this script." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Found Blender: $blenderExe" -ForegroundColor Green

# Resolve paths
$inputPath = Resolve-Path $InputFile
if (-not $OutputFile) {
    $OutputFile = $InputFile -replace '\.fbx$', '.glb'
}
$outputPath = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputFile)

Write-Host ""
Write-Host "🔄 Converting FBX to GLB with Blender..." -ForegroundColor Cyan
Write-Host "   Input:  $inputPath" -ForegroundColor Gray
Write-Host "   Output: $outputPath" -ForegroundColor Gray
Write-Host ""

# Create Python script for Blender
$pythonScript = @"
import bpy
import sys
import os

# Clear default scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# Import FBX
fbx_path = r'$inputPath'
print(f'Importing FBX from: {fbx_path}')

try:
    bpy.ops.import_scene.fbx(filepath=fbx_path)
    print(f'✓ Imported {len(bpy.data.objects)} objects')
except Exception as e:
    print(f'❌ Import failed: {e}')
    sys.exit(1)

# Export GLB with embedded textures
glb_path = r'$outputPath'
print(f'Exporting GLB to: {glb_path}')

try:
    bpy.ops.export_scene.gltf(
        filepath=glb_path,
        export_format='GLB',
        export_texcoords=True,
        export_normals=True,
        export_materials='EXPORT',
        export_cameras=False,
        export_lights=False,
        export_apply=True,
        export_image_format='AUTO'
    )
    
    if os.path.exists(glb_path):
        size_mb = os.path.getsize(glb_path) / (1024 * 1024)
        print(f'✅ Export complete! Size: {size_mb:.2f} MB')
    else:
        print('❌ Export failed - file not created')
        sys.exit(1)
        
except Exception as e:
    print(f'❌ Export failed: {e}')
    sys.exit(1)
"@

$tempScript = [System.IO.Path]::GetTempFileName() + ".py"
$pythonScript | Out-File -FilePath $tempScript -Encoding UTF8

try {
    # Run Blender in background mode
    $output = & $blenderExe --background --python $tempScript 2>&1
    
    # Display all output for debugging
    $output | ForEach-Object {
        $line = $_.ToString()
        if ($line -match "✓|✅") {
            Write-Host $line -ForegroundColor Green
        } elseif ($line -match "❌|Error|error") {
            Write-Host $line -ForegroundColor Red
        } elseif ($line -match "Importing|Exporting") {
            Write-Host $line -ForegroundColor Cyan
        } else {
            Write-Host $line -ForegroundColor Gray
        }
    }
    
    if (Test-Path $outputPath) {
        $fileSize = (Get-Item $outputPath).Length / 1MB
        Write-Host ""
        Write-Host "✅ Success!" -ForegroundColor Green
        Write-Host "📦 Output: $outputPath" -ForegroundColor Cyan
        Write-Host "📊 Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Conversion failed - output file not created" -ForegroundColor Red
        Write-Host "Check the output above for errors" -ForegroundColor Yellow
        exit 1
    }
} finally {
    # Cleanup temp script
    if (Test-Path $tempScript) {
        Remove-Item $tempScript
    }
}
