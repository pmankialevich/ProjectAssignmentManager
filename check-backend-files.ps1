# Скрипт для создания всех отсутствующих файлов

Write-Host "Создание файлов Backend..." -ForegroundColor Yellow

# Проверим какие файлы отсутствуют
$missingFiles = @()

if (-not (Test-Path "ProjectAssignmentManager.API\Controllers\DevelopersController.cs")) {
    $missingFiles += "Controllers"
}
if (-not (Test-Path "ProjectAssignmentManager.API\Services\DeveloperService.cs")) {
    $missingFiles += "Services"
}
if (-not (Test-Path "ProjectAssignmentManager.API\Repositories\JsonRepository.cs")) {
    $missingFiles += "Repositories"
}
if (-not (Test-Path "ProjectAssignmentManager.API\Common\ApiResponse.cs")) {
    $missingFiles += "Common"
}
if (-not (Test-Path "ProjectAssignmentManager.API\Middleware\GlobalExceptionHandlerMiddleware.cs")) {
    $missingFiles += "Middleware"
}
if (-not (Test-Path "ProjectAssignmentManager.API\DTOs\DeveloperDtos.cs")) {
    $missingFiles += "DTOs"
}

if ($missingFiles.Count -eq 0) {
    Write-Host "✓ Все файлы уже существуют!" -ForegroundColor Green
} else {
    Write-Host "❌ Отсутствуют файлы в папках:" -ForegroundColor Red
    foreach ($folder in $missingFiles) {
        Write-Host "  - $folder" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "РЕШЕНИЕ:" -ForegroundColor Cyan
    Write-Host "1. Откройте Visual Studio" -ForegroundColor White
    Write-Host "2. Нажмите: Ctrl + Shift + S" -ForegroundColor White
    Write-Host "3. Закройте Visual Studio" -ForegroundColor White
    Write-Host "4. Запустите этот скрипт снова" -ForegroundColor White
}
