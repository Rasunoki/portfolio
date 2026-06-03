@echo off
REM Copy profile image
node copy-profile.js
if %ERRORLEVEL% NEQ 0 (
    echo Failed to copy profile image
    exit /b 1
)

REM Generate resume
node scripts/generate-resume.mjs
if %ERRORLEVEL% NEQ 0 (
    echo Failed to generate resume
    exit /b 1
)

echo Done! Resume generated at public/resume.pdf
