@echo off
echo.
echo ========================================
echo   NAVAMYA WEBSITE - LOCAL SERVER
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo.
    echo Please install Python from: https://python.org/downloads
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo ✅ Python found
echo 🚀 Starting Navamya Website Server...
echo.

REM Run the Python server
python start_server.py

echo.
echo Server stopped. Press any key to exit...
pause >nul
