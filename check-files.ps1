# ⚠️ КРИТИЧНО: СОХРАНИТЕ ФАЙЛЫ!

Write-Host "================================================" -ForegroundColor Red
Write-Host "  ⚠️  ФАЙЛЫ НЕ СОХРАНЕНЫ НА ДИСК!" -ForegroundColor Red  
Write-Host "================================================" -ForegroundColor Red
Write-Host ""

Write-Host "Проверка файлов..." -ForegroundColor Yellow
Write-Host ""

$missingFiles = @()

# Check Models
if (-not (Test-Path "ProjectAssignmentManager.API\Models\Developer.cs")) {
    $missingFiles += "Models\Developer.cs"
}
if (-not (Test-Path "ProjectAssignmentManager.API\Models\Project.cs")) {
    $missingFiles += "Models\Project.cs"
}
if (-not (Test-Path "ProjectAssignmentManager.API\Models\DeveloperProject.cs")) {
    $missingFiles += "Models\DeveloperProject.cs"
}

# Check Repositories
$repoFiles = Get-ChildItem "ProjectAssignmentManager.API\Repositories" -Filter "*.cs" -ErrorAction SilentlyContinue
if ($repoFiles.Count -eq 0) {
    $missingFiles += "Repositories\*.cs (ALL FILES MISSING!)"
}

# Check Services
$serviceFiles = Get-ChildItem "ProjectAssignmentManager.API\Services" -Filter "*.cs" -ErrorAction SilentlyContinue
if ($serviceFiles.Count -eq 0) {
    $missingFiles += "Services\*.cs (ALL FILES MISSING!)"
}

# Check Controllers
$controllerFiles = Get-ChildItem "ProjectAssignmentManager.API\Controllers" -Filter "*.cs" -ErrorAction SilentlyContinue
if ($controllerFiles.Count -eq 0) {
    $missingFiles += "Controllers\*.cs (ALL FILES MISSING!)"
}

# Check Common
$commonFiles = Get-ChildItem "ProjectAssignmentManager.API\Common" -Filter "*.cs" -ErrorAction SilentlyContinue
if ($commonFiles.Count -eq 0) {
    $missingFiles += "Common\*.cs (ALL FILES MISSING!)"
}

# Check Middleware
$middlewareFiles = Get-ChildItem "ProjectAssignmentManager.API\Middleware" -Filter "*.cs" -ErrorAction SilentlyContinue
if ($middlewareFiles.Count -eq 0) {
    $missingFiles += "Middleware\*.cs (ALL FILES MISSING!)"
}

# Check DTOs
$dtoFiles = Get-ChildItem "ProjectAssignmentManager.API\DTOs" -Filter "*.cs" -ErrorAction SilentlyContinue
if ($dtoFiles.Count -eq 0) {
    $missingFiles += "DTOs\*.cs (ALL FILES MISSING!)"
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ ОТСУТСТВУЮТ ФАЙЛЫ:" -ForegroundColor Red
    Write-Host ""
    foreach ($file in $missingFiles) {
        Write-Host "  ❌ $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Yellow
    Write-Host "  ЧТО ДЕЛАТЬ:" -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. В Visual Studio нажмите: Ctrl + Shift + S" -ForegroundColor White
    Write-Host "   (Сохранить все файлы)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Убедитесь что рядом с именем файла НЕТ звездочки (*)" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Закройте и откройте Visual Studio заново" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Запустите этот скрипт снова для проверки:" -ForegroundColor White
    Write-Host "   .\check-files.ps1" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Yellow
    Write-Host "ВНИМАНИЕ: Пока файлы не сохранены," -ForegroundColor Red
    Write-Host "проект НЕ БУДЕТ компилироваться!" -ForegroundColor Red
    Write-Host "================================================" -ForegroundColor Yellow
} else {
    Write-Host "✓ Все файлы на месте!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Попытка сборки проекта..." -ForegroundColor Yellow
    dotnet build ProjectAssignmentManager.sln
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================================" -ForegroundColor Green
        Write-Host "  ✓ ПРОЕКТ УСПЕШНО СОБРАН!" -ForegroundColor Green
        Write-Host "================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Теперь можно запустить:" -ForegroundColor White
        Write-Host "  .\start-app.ps1" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "ИЛИ" -ForegroundColor White
        Write-Host ""
        Write-Host "  cd ProjectAssignmentManager.API" -ForegroundColor Cyan
        Write-Host "  dotnet run" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Ошибка при сборке проекта" -ForegroundColor Red
        Write-Host "Проверьте ошибки выше" -ForegroundColor Yellow
    }
}

Write-Host ""
