@echo off
echo University Dungeon - Auto Deploy to GitHub
echo ========================================

REM Add all changes
git add .

REM Commit with timestamp
git commit -m "Auto-update: %date% %time%"

REM Push to GitHub
git push origin main

echo.
echo Deployment complete!
echo Your game has been pushed to GitHub.
pause
