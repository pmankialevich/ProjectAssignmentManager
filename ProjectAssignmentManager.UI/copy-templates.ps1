# Script to copy template files to correct locations

Write-Host "Copying template files..." -ForegroundColor Yellow

# Copy app.html template
Copy-Item -Path "src\app\app-template.html" -Destination "src\app\app.html" -Force
Write-Host "✓ Copied app.html" -ForegroundColor Green

# Copy navbar templates
Copy-Item -Path "src\app\shared\components\navbar\navbar-template.html" -Destination "src\app\shared\components\navbar\navbar.html" -Force
Copy-Item -Path "src\app\shared\components\navbar\navbar-styles.css" -Destination "src\app\shared\components\navbar\navbar.css" -Force
Write-Host "✓ Copied navbar files" -ForegroundColor Green

Write-Host ""
Write-Host "Template files copied successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next: Create component templates manually or continue with the guide" -ForegroundColor Cyan
