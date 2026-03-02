# Start Both Backend and Frontend
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Project Assignment Manager - Launcher" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

# Check if Angular app exists
if (-not (Test-Path "$rootPath\ProjectAssignmentManager.UI\node_modules")) {
    Write-Host "Angular dependencies not found. Installing..." -ForegroundColor Yellow
    Push-Location "$rootPath\ProjectAssignmentManager.UI"
    npm install
    Pop-Location
}

# Copy templates if needed
if (Test-Path "$rootPath\ProjectAssignmentManager.UI\copy-all-templates.ps1") {
    Write-Host "Copying Angular templates..." -ForegroundColor Yellow
    Push-Location "$rootPath\ProjectAssignmentManager.UI"
    .\copy-all-templates.ps1
    Pop-Location
}

Write-Host ""
Write-Host "Starting Backend API..." -ForegroundColor Green
Write-Host "URL: https://localhost:5001/" -ForegroundColor Cyan
Write-Host ""

# Start Backend in new window
$backendJob = Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$rootPath\ProjectAssignmentManager.API'; dotnet run" -PassThru

Write-Host "Waiting 5 seconds before starting Frontend..." -ForegroundColor Yellow
Write-Host "(Backend will continue starting in parallel)" -ForegroundColor Gray
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Starting Angular Frontend..." -ForegroundColor Green
Write-Host "URL: http://localhost:4200/" -ForegroundColor Cyan
Write-Host ""

# Start Frontend in new window
$frontendJob = Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$rootPath\ProjectAssignmentManager.UI'; ng serve --open" -PassThru

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Both Applications Starting in Parallel!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend HTTP:  http://localhost:5000/" -ForegroundColor White
Write-Host "Backend HTTPS: https://localhost:5001/" -ForegroundColor Gray
Write-Host "Frontend:      http://localhost:4200/" -ForegroundColor White
Write-Host ""
Write-Host "ℹ️  Estimated startup times:" -ForegroundColor Cyan
Write-Host "   - Backend: 10-15 seconds" -ForegroundColor Gray
Write-Host "   - Frontend: 30-40 seconds" -ForegroundColor Gray
Write-Host ""
Write-Host "ℹ️  Frontend uses HTTP (port 5000) - no certificate needed!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  If you see ERR_CONNECTION_REFUSED on first load:" -ForegroundColor Yellow
Write-Host "   1. Wait for backend to fully start (check Backend window)" -ForegroundColor White
Write-Host "   2. Refresh the page (F5)" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers" -ForegroundColor Yellow
Write-Host ""
