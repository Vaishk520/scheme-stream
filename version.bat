@echo off
setlocal enabledelayedexpansion

set /p version=<version.txt

for /f "tokens=1-3 delims=." %%a in ("%version%") do (
    set /A major=%%a
    set /A minor=%%b
    set /A patch=%%c + 1
)

set new_version=!major!.!minor!.!patch!

echo !new_version! > version.txt


git add version.txt
git commit -m "Auto-incremented version to !new_version!"
git tag -d v!new_version! 2>NUL
git tag -a v!new_version! -m "Version !new_version!"

git push origin v!new_version!

echo New version set to !new_version!
endlocal
