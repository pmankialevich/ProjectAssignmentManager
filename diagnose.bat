@echo off
echo ================================================
echo   Diagnostic Tool - Check Backend
echo ================================================
echo.

echo 1. Checking if backend is running...
echo.

netstat -ano | findstr :5001
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend is NOT running on port 5001
    echo.
    echo Try starting it manually:
    echo   cd ProjectAssignmentManager.API
    echo   dotnet run
) else (
    echo ✅ Backend IS running on port 5001
)

echo.
echo 2. Testing backend connection...
echo.

curl -k https://localhost:5001/api/developers 2>nul
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Backend responds successfully!
) else (
    echo.
    echo ❌ Backend does not respond!
    echo.
    echo Possible issues:
    echo   - Backend is still starting up (wait 10 seconds)
    echo   - HTTPS certificate issue (run: dotnet dev-certs https --trust)
    echo   - Backend has errors (check Backend API window)
)

echo.
echo 3. Checking HTTPS certificate...
echo.

dotnet dev-certs https --check
if %ERRORLEVEL% EQU 0 (
    echo ✅ HTTPS certificate is installed
) else (
    echo ❌ HTTPS certificate is missing!
    echo.
    echo Fix: dotnet dev-certs https --trust
)

echo.
echo 4. Checking for running processes...
echo.

tasklist | findstr /I "dotnet.exe" > nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ dotnet.exe is running
) else (
    echo ❌ dotnet.exe is NOT running
)

tasklist | findstr /I "node.exe" > nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ node.exe is running (Angular)
) else (
    echo ℹ️  node.exe is NOT running (Angular not started yet)
)

echo.
echo ================================================
echo   Diagnostic Complete
echo ================================================
echo.
pause
