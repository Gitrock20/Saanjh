@echo off
title Saanjh Vibe - Node.js Diagnostics
color 0B

echo Running diagnostics to locate Node.js on your computer...
echo Please wait a moment...

echo =========================================== > node-path.txt
echo   🔍 NODE.JS DIAGNOSTIC LOG 🔍 >> node-path.txt
echo =========================================== >> node-path.txt
echo Date: %DATE% %TIME% >> node-path.txt
echo. >> node-path.txt

echo === CURRENT SESSION PATH === >> node-path.txt
echo %PATH% >> node-path.txt
echo. >> node-path.txt

echo === WHERE NODE RESULT === >> node-path.txt
where node >> node-path.txt 2>&1
echo. >> node-path.txt

echo === DETECTED SYSTEM VARIABLES === >> node-path.txt
echo ProgramFiles: %ProgramFiles% >> node-path.txt
echo ProgramFiles(x86): %ProgramFiles(x86)% >> node-path.txt
echo LocalAppData: %LOCALAPPDATA% >> node-path.txt
echo UserProfile: %USERPROFILE% >> node-path.txt
echo. >> node-path.txt

echo === SCANNING KNOWN LOCATIONS === >> node-path.txt
if exist "%ProgramFiles%\nodejs\node.exe" (
    echo [FOUND] %ProgramFiles%\nodejs\node.exe >> node-path.txt
) else (
    echo [NOT FOUND] %ProgramFiles%\nodejs\node.exe >> node-path.txt
)

if exist "C:\Program Files\nodejs\node.exe" (
    echo [FOUND] C:\Program Files\nodejs\node.exe >> node-path.txt
) else (
    echo [NOT FOUND] C:\Program Files\nodejs\node.exe >> node-path.txt
)

if exist "%ProgramFiles(x86)%\nodejs\node.exe" (
    echo [FOUND] %ProgramFiles(x86)%\nodejs\node.exe >> node-path.txt
) else (
    echo [NOT FOUND] %ProgramFiles(x86)%\nodejs\node.exe >> node-path.txt
)

if exist "%LOCALAPPDATA%\Programs\node\node.exe" (
    echo [FOUND] %LOCALAPPDATA%\Programs\node\node.exe >> node-path.txt
) else (
    echo [NOT FOUND] %LOCALAPPDATA%\Programs\node\node.exe >> node-path.txt
)

if exist "%USERPROFILE%\AppData\Local\Programs\node\node.exe" (
    echo [FOUND] %USERPROFILE%\AppData\Local\Programs\node\node.exe >> node-path.txt
) else (
    echo [NOT FOUND] %USERPROFILE%\AppData\Local\Programs\node\node.exe >> node-path.txt
)
echo. >> node-path.txt

echo === FAST DRIVE SEARCH FOR NODE.EXE === >> node-path.txt
echo Searching Program Files... >> node-path.txt
dir "%ProgramFiles%\*node.exe" /s /b >> node-path.txt 2>&1

echo Searching Program Files (x86)... >> node-path.txt
dir "%ProgramFiles(x86)%\*node.exe" /s /b >> node-path.txt 2>&1

echo Searching AppData... >> node-path.txt
dir "%USERPROFILE%\AppData\*node.exe" /s /b >> node-path.txt 2>&1

echo =========================================== >> node-path.txt
echo   Diagnostics Complete! >> node-path.txt
echo =========================================== >> node-path.txt

echo.
echo Diagnostics complete! 
echo I have created a file called "node-path.txt" in your folder.
echo.
echo Press any key to close this window...
pause >nul
