# Quick Fix Script - Save and Build
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Quick Fix - Save and Build" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "ВАЖНО: Сначала в Visual Studio нажмите Ctrl+Shift+S" -ForegroundColor Yellow
Write-Host "Нажмите любую клавишу когда сохраните..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Проверка файлов..." -ForegroundColor Yellow

# Check critical files
$criticalFiles = @(
    "ProjectAssignmentManager.API\Services\DeveloperService.cs",
    "ProjectAssignmentManager.API\Repositories\JsonRepository.cs",
    "ProjectAssignmentManager.API\Controllers\DevelopersController.cs",
    "ProjectAssignmentManager.API\Common\ApiResponse.cs"
)

$missingCount = 0
foreach ($file in $criticalFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "  ❌ Отсутствует: $file" -ForegroundColor Red
        $missingCount++
    } else {
        Write-Host "  ✓ $file" -ForegroundColor Green
    }
}

Write-Host ""

if ($missingCount -gt 0) {
    Write-Host "❌ Файлы все еще не сохранены!" -ForegroundColor Red
    Write-Host "Вернитесь в Visual Studio и нажмите Ctrl+Shift+S" -ForegroundColor Yellow
    Write-Host "Убедитесь что рядом с именами файлов НЕТ звездочки (*)" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "✓ Все критические файлы на месте!" -ForegroundColor Green
Write-Host ""

Write-Host "Сборка проекта..." -ForegroundColor Yellow
dotnet build ProjectAssignmentManager.sln

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "  ✓ ПРОЕКТ УСПЕШНО СОБРАН!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Добавление файлов в Git..." -ForegroundColor Yellow
    git add .
    
    Write-Host ""
    Write-Host "Создание коммита..." -ForegroundColor Yellow
    git commit -m "Complete full-stack implementation - Backend + Frontend"
    
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "  ✓ ВСЕ ГОТОВО!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Теперь можно запустить приложение:" -ForegroundColor White
    Write-Host ""
    Write-Host "  .\start-app.ps1" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "ИЛИ" -ForegroundColor White
    Write-Host ""
    Write-Host "  cd ProjectAssignmentManager.API" -ForegroundColor Cyan
    Write-Host "  dotnet run" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Angular запустится автоматически!" -ForegroundColor Green
    
} else {
    Write-Host ""
    Write-Host "❌ Ошибка сборки!" -ForegroundColor Red
    Write-Host "Проверьте ошибки выше" -ForegroundColor Yellow
}

Write-Host ""
pause
