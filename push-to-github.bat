@echo off
title Saanjh Vibe - Push to GitHub
color 0E

:: Fix missing standard Windows directories in PATH (using literal C:\Windows)
set "PATH=C:\Windows\System32;C:\Windows;C:\Windows\System32\wbem;C:\Windows\System32\WindowsPowerShell\v1.0;%PATH%"

echo ===================================================
echo   ✨ Saanjh Vibe E-Commerce - GitHub Pusher ✨
echo ===================================================
echo.

:: Inject default Git folder if in common locations just in case PATH is not fully resolved
if exist "C:\Program Files\Git\bin\git.exe" (
    set "PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%"
) else if exist "%ProgramFiles%\Git\bin\git.exe" (
    set "PATH=%ProgramFiles%\Git\bin;%ProgramFiles%\Git\cmd;%PATH%"
)

:: Verify Git works
git --version >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Git is not recognized or not installed on this system!
    echo.
    echo To push your code to GitHub, you need Git installed.
    echo Please download and install Git from: https://git-scm.com/
    echo.
    echo Press any key to open the Git download page and exit...
    pause >nul
    start https://git-scm.com/
    exit /b
)

echo [INFO] Git detected:
git --version
echo.

:: Check if already inside a git repository, if not initialize it
if not exist ".git" (
    echo [INFO] Initializing new Git repository...
    git init
    git branch -M main
) else (
    echo [INFO] Existing Git repository detected.
)

echo.
echo Please enter your GitHub Repository URL (e.g. https://github.com/your-username/saanjh-vibe.git):
set /p REPO_URL="URL: "

if "%REPO_URL%"=="" (
    color 0C
    echo.
    echo [ERROR] Repository URL cannot be empty!
    pause
    exit /b
)

:: Configure remote origin
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo [INFO] Staging all files...
git add .

echo.
echo [INFO] Committing files...
git commit -m "feat: add premium interactive cart controls and local startup scripts"

echo.
echo [INFO] Pushing code to GitHub (main branch)...
echo.
echo NOTE: A GitHub sign-in window might pop up. Please authorize it 
echo to complete the upload.
echo.

git push -u origin main

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Push failed! Please verify:
    echo 1. The GitHub repository exists and is empty.
    echo 2. You copied the correct repository URL.
    echo 3. You completed the GitHub login/authorization popup.
    echo.
    pause
) else (
    color 0A
    echo.
    echo ===================================================
    echo   🎉 SUCCESS! Your code is now live on GitHub! 🎉
    echo ===================================================
    echo.
    pause
)
