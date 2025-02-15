@echo off
setlocal enabledelayedexpansion

for /f "tokens=1,2,3 delims=." %%a in ('git describe --tags --abbrev=0 2^>nul') do (
    set /a PATCH=%%c+1
    set NEW_VERSION=v%%a.%%b.!PATCH!
)

if "%NEW_VERSION%"=="" set NEW_VERSION=v1.0.0

git tag %NEW_VERSION%
git push origin %NEW_VERSION%

echo Updated version: %NEW_VERSION%
