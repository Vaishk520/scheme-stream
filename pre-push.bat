@echo off
call "%~dp0..\..\version.bat"
git push origin --tags
