@echo off
echo ================================================
echo   Project Assignment Manager - Fast Launcher
echo ================================================
echo   Starting Backend and Frontend in Parallel
echo ================================================
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd ProjectAssignmentManager.API && dotnet run"

echo Waiting 5 seconds before starting Frontend...
timeout /t 5 /nobreak > nul

echo Starting Angular Frontend...
start "Angular Frontend" cmd /k "cd ProjectAssignmentManager.UI && ng serve --open"

echo.
echo ================================================
echo   Both Applications Starting in Parallel!
echo ================================================
echo.
echo Backend:  https://localhost:5001/
echo Frontend: http://localhost:4200/
echo.
echo ℹ️  INFO:
echo   - Backend will be ready in ~10-15 seconds
echo   - Frontend will be ready in ~30-40 seconds
echo   - Browser will open automatically
echo.
echo ⚠️  IMPORTANT:
echo   If you see ERR_CONNECTION_REFUSED on first load:
echo   1. Wait for backend to fully start
echo   2. Refresh the page (F5)
echo.
echo Press any key to exit this window...
pause > nul
