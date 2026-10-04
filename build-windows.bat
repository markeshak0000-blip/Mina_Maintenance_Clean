@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo Mina Maintenance - Windows Build
echo ==============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  echo Install Node.js 22 or newer, then run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm is not available.
  pause
  exit /b 1
)

echo [1/3] Installing dependencies...
npm install
if errorlevel 1 (
  echo.
  echo Dependency installation failed.
  pause
  exit /b 1
)

echo.
echo [2/3] Building Windows installer and portable EXE...
npm run dist
if errorlevel 1 (
  echo.
  echo Windows build failed.
  pause
  exit /b 1
)

echo.
echo [3/3] Build finished.
echo Check the "dist" folder for:
echo   - Mina-Maintenance-7.0.0-x64.exe

echo   - Mina-Maintenance-7.0.0-x64.exe (portable target)
echo.
pause
