# Скрипт установки и создания Angular приложения
# Выполните этот файл в PowerShell с правами администратора

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Project Assignment Manager - Angular Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Шаг 1: Проверка Node.js
Write-Host "Шаг 1: Проверка Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js установлен: $nodeVersion" -ForegroundColor Green
    
    $npmVersion = npm --version
    Write-Host "✓ npm установлен: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Node.js не найден! Установите Node.js с https://nodejs.org/" -ForegroundColor Red
    Write-Host "После установки перезапустите PowerShell и выполните этот скрипт снова." -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""

# Шаг 2: Установка Angular CLI
Write-Host "Шаг 2: Установка Angular CLI..." -ForegroundColor Yellow
Write-Host "Это может занять 2-3 минуты..." -ForegroundColor Gray
npm install -g @angular/cli

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Angular CLI установлен успешно!" -ForegroundColor Green
} else {
    Write-Host "✗ Ошибка при установке Angular CLI" -ForegroundColor Red
    pause
    exit
}

Write-Host ""

# Шаг 3: Проверка Angular CLI
Write-Host "Шаг 3: Проверка Angular CLI..." -ForegroundColor Yellow
ng version

Write-Host ""

# Шаг 4: Переход в папку проекта
Write-Host "Шаг 4: Переход в папку проекта..." -ForegroundColor Yellow
Set-Location "C:\work\ProjectAssignmentManager"
Write-Host "✓ Текущая директория: $(Get-Location)" -ForegroundColor Green

Write-Host ""

# Шаг 5: Создание Angular приложения
Write-Host "Шаг 5: Создание Angular приложения..." -ForegroundColor Yellow
Write-Host "Это займет 5-7 минут..." -ForegroundColor Gray
Write-Host ""
Write-Host "ВАЖНО: На вопрос о SSR (Server-Side Rendering) ответьте: N" -ForegroundColor Cyan
Write-Host ""

ng new ProjectAssignmentManager.UI --routing --style=css --standalone --skip-git

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Angular приложение создано успешно!" -ForegroundColor Green
} else {
    Write-Host "✗ Ошибка при создании приложения" -ForegroundColor Red
    pause
    exit
}

Write-Host ""

# Шаг 6: Переход в папку приложения
Write-Host "Шаг 6: Переход в папку приложения..." -ForegroundColor Yellow
Set-Location "ProjectAssignmentManager.UI"
Write-Host "✓ Текущая директория: $(Get-Location)" -ForegroundColor Green

Write-Host ""

# Шаг 7: Создание структуры папок
Write-Host "Шаг 7: Создание структуры папок..." -ForegroundColor Yellow

New-Item -ItemType Directory -Path "src\app\core\models" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\core\services" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\features\developers" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\features\projects" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\shared\components" -Force | Out-Null
New-Item -ItemType Directory -Path "src\environments" -Force | Out-Null

Write-Host "✓ Структура папок создана" -ForegroundColor Green

Write-Host ""

# Шаг 8: Генерация сервисов
Write-Host "Шаг 8: Генерация сервисов..." -ForegroundColor Yellow

ng generate service core/services/developer --skip-tests
ng generate service core/services/project --skip-tests
ng generate service core/services/assignment --skip-tests

Write-Host "✓ Сервисы сгенерированы" -ForegroundColor Green

Write-Host ""

# Шаг 9: Генерация компонентов разработчиков
Write-Host "Шаг 9: Генерация компонентов разработчиков..." -ForegroundColor Yellow

ng generate component features/developers/developers-list --standalone --skip-tests
ng generate component features/developers/developer-form --standalone --skip-tests
ng generate component features/developers/developer-details --standalone --skip-tests

Write-Host "✓ Компоненты разработчиков сгенерированы" -ForegroundColor Green

Write-Host ""

# Шаг 10: Генерация компонентов проектов
Write-Host "Шаг 10: Генерация компонентов проектов..." -ForegroundColor Yellow

ng generate component features/projects/projects-list --standalone --skip-tests
ng generate component features/projects/project-form --standalone --skip-tests
ng generate component features/projects/project-details --standalone --skip-tests

Write-Host "✓ Компоненты проектов сгенерированы" -ForegroundColor Green

Write-Host ""

# Шаг 11: Генерация navbar
Write-Host "Шаг 11: Генерация navbar..." -ForegroundColor Yellow

ng generate component shared/components/navbar --standalone --skip-tests

Write-Host "✓ Navbar сгенерирован" -ForegroundColor Green

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "УСТАНОВКА ЗАВЕРШЕНА!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Структура Angular приложения создана!" -ForegroundColor Green
Write-Host ""
Write-Host "Следующие шаги:" -ForegroundColor Yellow
Write-Host "1. Скопируйте код из ANGULAR_FILES в созданные файлы" -ForegroundColor White
Write-Host "2. Запустите: ng serve" -ForegroundColor White
Write-Host "3. Откройте браузер: http://localhost:4200" -ForegroundColor White
Write-Host ""
Write-Host "Подробная инструкция в CHECKLIST.md" -ForegroundColor Cyan
Write-Host ""

pause
