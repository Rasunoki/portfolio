@echo off
cd /d "%~dp0"

echo Staging changes...
git add -A

echo Committing changes...
git commit -m "Add profile photo to resume header

- Updated resume layout to display profile photo (PNG) in top-left
- Photo positioned next to contact information with flex layout
- Added copy-profile.js script to handle image file setup
- Added npm scripts: 'copy-profile' and 'build:resume'
- Updated package.json with new build scripts
- Profile photo dimensions: 100px x 120px with rounded corners

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

if %ERRORLEVEL% NEQ 0 (
    echo Failed to commit
    exit /b 1
)

echo Pushing to GitHub...
git push

if %ERRORLEVEL% NEQ 0 (
    echo Failed to push
    exit /b 1
)

echo.
echo Success! Changes pushed to GitHub.
