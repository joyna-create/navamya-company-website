@echo off
echo.
echo ========================================
echo   NAVAMYA WEBSITE - WITH DATABASE
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/downloads
    echo Make sure to install the LTS version
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found

REM Check if dependencies are installed
if not exist node_modules (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
)

echo 🚀 Starting Navamya Website Server with Database...
echo.
echo 📊 Features:
echo   - SQLite database for contact forms
echo   - Admin panel at: http://localhost:8000/admin
echo   - Website at: http://localhost:8000
echo.

REM Run the Node.js server with database
node server_with_db.js

echo.
echo Server stopped. Press any key to exit...
pause >nul
