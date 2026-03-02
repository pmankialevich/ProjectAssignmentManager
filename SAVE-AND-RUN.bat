@echo off
echo ================================================
echo   КРИТИЧНО: СОХРАНИТЕ ФАЙЛЫ В VISUAL STUDIO!
echo ================================================
echo.
echo У вас открыто 70+ файлов в Visual Studio
echo НО на диске только 4 файла!
echo.
echo ЭТО ЗНАЧИТ: Файлы НЕ СОХРАНЕНЫ!
echo.
echo ================================================
echo   ЧТО ДЕЛАТЬ:
echo ================================================
echo.
echo 1. Переключитесь в Visual Studio
echo 2. Нажмите: Ctrl + Shift + S
echo 3. Подождите пока все файлы сохранятся
echo 4. Проверьте что рядом с именами файлов НЕТ звездочки (*)
echo 5. Закройте Visual Studio
echo 6. Запустите этот файл снова
echo.
pause
echo.
echo Проверка файлов...
echo.

set /a count=0

if exist "ProjectAssignmentManager.API\Controllers\DevelopersController.cs" (
    echo [OK] Controllers найдены
    set /a count+=1
) else (
    echo [FAIL] Controllers НЕ НАЙДЕНЫ!
)

if exist "ProjectAssignmentManager.API\Services\DeveloperService.cs" (
    echo [OK] Services найдены
    set /a count+=1
) else (
    echo [FAIL] Services НЕ НАЙДЕНЫ!
)

if exist "ProjectAssignmentManager.API\Repositories\JsonRepository.cs" (
    echo [OK] Repositories найдены
    set /a count+=1
) else (
    echo [FAIL] Repositories НЕ НАЙДЕНЫ!
)

if exist "ProjectAssignmentManager.API\Common\ApiResponse.cs" (
    echo [OK] Common найдены
    set /a count+=1
) else (
    echo [FAIL] Common НЕ НАЙДЕНЫ!
)

echo.
if %count% EQU 4 (
    echo ================================================
    echo   ВСЕ ФАЙЛЫ СОХРАНЕНЫ! МОЖНО ЗАПУСКАТЬ!
    echo ================================================
    echo.
    echo Запуск сборки...
    cd ProjectAssignmentManager.API
    dotnet build
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ================================================
        echo   УСПЕШНО СОБРАНО!
        echo ================================================
        echo.
        echo Запуск приложения...
        start cmd /k "dotnet run"
        timeout /t 3 /nobreak >nul
        cd ..\ProjectAssignmentManager.UI
        start cmd /k "ng serve --open"
        echo.
        echo Оба приложения запускаются!
        echo Backend: https://localhost:5001/
        echo Frontend: http://localhost:4200/
    ) else (
        echo.
        echo ОШИБКА СБОРКИ! Проверьте ошибки выше.
    )
) else (
    echo.
    echo ================================================
    echo   ФАЙЛЫ ВСЕ ЕЩЕ НЕ СОХРАНЕНЫ!
    echo ================================================
    echo.
    echo Вернитесь в Visual Studio и нажмите Ctrl+Shift+S
    echo Затем запустите этот файл снова.
)

echo.
pause
