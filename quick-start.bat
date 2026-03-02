@echo off
echo ================================================
echo   Quick Fix - Trust Certificate and Run
echo ================================================
echo.

echo Step 1: Installing HTTPS dev certificate...
dotnet dev-certs https --trust

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo WARNING: Failed to install certificate!
    echo You may need to run as Administrator.
    echo.
    pause
    exit /b 1
)

echo.
echo Step 2: Stopping any running processes...
taskkill /F /IM dotnet.exe /T 2>nul
taskkill /F /IM node.exe /T 2>nul

echo.
echo Step 3: Starting applications...
echo.

start "Backend API" cmd /k "cd ProjectAssignmentManager.API && dotnet run"

echo Waiting for backend to start...
timeout /t 12 /nobreak > nul

start "Angular Frontend" cmd /k "cd ProjectAssignmentManager.UI && ng serve --open"

echo.
echo ================================================
echo   DONE!
echo ================================================
echo.
echo Backend will start at: https://localhost:5001
echo Frontend will open at: http://localhost:4200
echo.
echo Wait ~30 seconds for everything to load!
echo.
pause
