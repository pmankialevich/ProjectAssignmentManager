@echo off
echo ================================================
echo   Project Assignment Manager - Launcher
echo ================================================
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd ProjectAssignmentManager.API && dotnet run"

echo.
echo Waiting 5 seconds before starting Frontend...
echo (Backend will continue starting in parallel)
timeout /t 5 /nobreak > nul

echo.
echo Starting Angular Frontend...
start "Angular Frontend" cmd /k "cd ProjectAssignmentManager.UI && ng serve --open"

echo.
echo ================================================
echo   Both Applications Starting in Parallel!
echo ================================================
echo.
echo Backend HTTP:  http://localhost:5000/
echo Backend HTTPS: https://localhost:5001/
echo Frontend:      http://localhost:4200/ (will open in ~30 sec)
echo.
echo ℹ️  Estimated startup times:
echo    - Backend: 10-15 seconds
echo    - Frontend: 30-40 seconds
echo.
echo ℹ️  Frontend uses HTTP (port 5000) - no certificate needed!
echo.
echo ⚠️  If you see ERR_CONNECTION_REFUSED:
echo    1. Wait for backend (check "Backend API" window)
echo    2. Refresh browser (F5)
echo.
echo Press any key to exit this window...
pause > nul
