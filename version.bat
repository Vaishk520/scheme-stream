@echo off
REM Get the latest Git tag (version)
for /f "tokens=*" %%i in ('git describe --tags --abbrev=0 2^>nul') do set latest_tag=%%i

REM If no tag exists, start from v0.0.1
if "%latest_tag%"=="" (
    set new_version=v0.0.1
) else (
    for /f "tokens=1,2,3 delims=." %%a in ("%latest_tag:~1%") do (
        set /a patch=%%c+1
        set new_version=v%%a.%%b.!patch!
    )
)

REM Create and push the new tag
git tag %new_version%
git push origin %new_version%

echo New version: %new_version%
