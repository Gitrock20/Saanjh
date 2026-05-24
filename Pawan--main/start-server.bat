@echo off
title Saanjh Vibe E-Commerce Server
color 0E

:: Fix missing standard Windows directories in PATH (using literal C:\Windows)
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\wbem;C:\Windows\System32\WindowsPowerShell\v1.0;%PATH%"

echo ===================================================
echo   ✨ Saanjh Vibe E-Commerce - Local Server ✨
echo ===================================================
echo.

:: Inject default Node.js path directly into PATH variable just in case
if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=C:\Program Files\nodejs;%PATH%"
)

:: Verify if Node.js works directly
node -v >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not recognized on this system!
    echo.
    echo To run this project locally, you need Node.js installed.
    echo Please double-check if you completed the installation wizard.
    echo.
    echo Press any key to open the download page and exit...
    pause >nul
    start https://nodejs.org/
    exit /b
)

echo [INFO] Node.js is active!
echo [INFO] Node.js version:
node -v
echo.

:: Check if node_modules folder exists
if not exist "node_modules\" (
    echo [INFO] node_modules folder not found. Installing dependencies...
    echo This may take a minute or two. Please wait...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [ERROR] npm install failed! Please check your internet connection.
        pause
        exit /b
    )
    echo.
    echo [SUCCESS] Dependencies installed successfully!
    echo.
) else (
    echo [INFO] Dependencies are already installed.
)

echo [INFO] Starting the Saanjh Vibe server...
echo.

:: Open the browser pages in 2 seconds to allow the server to start
echo [INFO] Opening the store and admin panel in your default browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000/
start http://localhost:3000/admin.html

:: Run the Express server
call npm start

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Server stopped with an error or couldn't start.
    echo If it says "Port 3000 already in use", you might already have the server running.
    echo.
    pause
)
