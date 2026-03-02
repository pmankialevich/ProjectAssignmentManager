@echo off
echo ================================================
echo   Project Assignment Manager - Launcher
echo ================================================
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd ProjectAssignmentManager.API && dotnet run"

echo Waiting for backend to start (10 seconds)...
timeout /t 10 /nobreak > nul

echo Starting Angular Frontend...
start "Angular Frontend" cmd /k "cd ProjectAssignmentManager.UI && ng serve --open"

echo.
echo ================================================
echo   Both Applications Starting!
echo ================================================
echo.
echo Backend:  https://localhost:5001/
echo Frontend: http://localhost:4200/ (will open in ~30 sec)
echo.
echo IMPORTANT: Wait for backend to fully start!
echo You should see "Now listening on: https://localhost:5001"
echo.
echo Press any key to exit this window...
pause > nul
