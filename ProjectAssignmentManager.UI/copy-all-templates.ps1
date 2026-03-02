# Complete Copy Script - Copies all template files to correct locations
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Angular Template Files Copy Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$errorCount = 0
$successCount = 0

function Copy-Template {
    param(
        [string]$Source,
        [string]$Destination,
        [string]$Description
    )
    
    try {
        Copy-Item -Path $Source -Destination $Destination -Force -ErrorAction Stop
        Write-Host "✓ $Description" -ForegroundColor Green
        $script:successCount++
    }
    catch {
        Write-Host "✗ $Description - ERROR: $_" -ForegroundColor Red
        $script:errorCount++
    }
}

Write-Host "Copying template files..." -ForegroundColor Yellow
Write-Host ""

# App templates
Copy-Template "src\app\app-template.html" "src\app\app.html" "App component template"

# Navbar
Copy-Template "src\app\shared\components\navbar\navbar-template.html" "src\app\shared\components\navbar\navbar.html" "Navbar template"
Copy-Template "src\app\shared\components\navbar\navbar-styles.css" "src\app\shared\components\navbar\navbar.css" "Navbar styles"

# Developers
Copy-Template "src\app\features\developers\developers-list\developers-list-template.html" "src\app\features\developers\developers-list\developers-list.html" "Developers list template"
Copy-Template "src\app\features\developers\developer-form\developer-form-template.html" "src\app\features\developers\developer-form\developer-form.html" "Developer form template"
Copy-Template "src\app\features\developers\developer-details\developer-details-template.html" "src\app\features\developers\developer-details\developer-details.html" "Developer details template"

# Projects
Copy-Template "src\app\features\projects\projects-list\projects-list-template.html" "src\app\features\projects\projects-list\projects-list.html" "Projects list template"
Copy-Template "src\app\features\projects\project-form\project-form-template.html" "src\app\features\projects\project-form\project-form.html" "Project form template"
Copy-Template "src\app\features\projects\project-details\project-details-template.html" "src\app\features\projects\project-details\project-details.html" "Project details template"

# Global styles
Copy-Template "src\styles-global.css" "src\styles.css" "Global styles"

# Copy shared styles to component folders
Copy-Template "src\app\features\shared-styles.css" "src\app\features\developers\developer-details\developer-details.css" "Developer details styles"
Copy-Template "src\app\features\shared-styles.css" "src\app\features\projects\project-details\project-details.css" "Project details styles"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Copy Complete!" -ForegroundColor Green
Write-Host "Success: $successCount files" -ForegroundColor Green
Write-Host "Errors: $errorCount files" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Green" })
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

if ($errorCount -eq 0) {
    Write-Host "All files copied successfully! ✓" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Run: ng serve" -ForegroundColor White
    Write-Host "2. Open: http://localhost:4200" -ForegroundColor White
    Write-Host "3. Make sure backend is running: dotnet run (in API folder)" -ForegroundColor White
} else {
    Write-Host "Some files failed to copy. Check errors above." -ForegroundColor Red
}

Write-Host ""
