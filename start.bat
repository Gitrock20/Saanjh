@echo off
title Saanjh Vibe - Startup Helper
color 0E

echo ===================================================
echo   ✨ Welcome to Saanjh Vibe E-Commerce Setup ✨
echo ===================================================
echo.

:: Fix missing standard Windows directories in PATH (using literal C:\Windows)
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\wbem;C:\Windows\System32\WindowsPowerShell\v1.0;%PATH%"

:: Navigate to Pawan--main subdirectory
cd /d "%~dp0Pawan--main"
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Could not navigate to the Pawan--main folder!
    echo Current folder path: "%~dp0"
    pause
    exit /b
)

if not exist "start-server.bat" (
    color 0C
    echo [ERROR] Could not find start-server.bat in "%CD%"!
    pause
    exit /b
)

:: Call the server script
call start-server.bat

if %errorlevel% neq 0 (
    echo.
    echo Script ended with code %errorlevel%
    pause
)
