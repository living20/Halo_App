@echo off
echo ==================================
echo Hal0 Emergency Alert System Setup
echo ==================================
echo.
echo This script will help you set up and run the Hal0 app on Windows.
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b
)

echo Node.js is installed. Version:
node -v
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed or not in your PATH.
    echo Please reinstall Node.js from https://nodejs.org/
    echo.
    pause
    exit /b
)

echo npm is installed. Version:
npm -v
echo.

echo Installing Expo CLI globally...
call npm install -g expo-cli
if %ERRORLEVEL% NEQ 0 (
    echo Error installing Expo CLI. Please check your internet connection and try again.
    pause
    exit /b
)

echo.
echo Installing project dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing project dependencies. 
    echo Try running 'npm install' manually to see detailed errors.
    pause
    exit /b
)

echo.
echo ================================================
echo Setup completed successfully!
echo.
echo To start the development server, run:
echo    npm start
echo.
echo Or:
echo    npx expo start
echo.
echo For more detailed instructions, see SETUP_WINDOWS.md
echo ================================================
echo.

choice /C YN /M "Do you want to start the development server now?"
if %ERRORLEVEL% EQU 1 (
    echo.
    echo Starting Expo development server...
    call npx expo start
) else (
    echo.
    echo You can start the server later by running 'npm start' or 'npx expo start'.
)

pause
