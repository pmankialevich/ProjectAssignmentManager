@echo off
echo ================================================
echo   Project Assignment Manager - Launcher
echo ================================================
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd ProjectAssignmentManager.API && dotnet run"

echo.
echo Waiting for backend to start...
echo This may take 10-20 seconds...
echo.

:WAIT_BACKEND
timeout /t 2 /nobreak > nul
curl -k -s https://localhost:5001/api/developers > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo   Still waiting for backend...
    goto WAIT_BACKEND
)

echo.
echo ✅ Backend is ready!
echo.

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
