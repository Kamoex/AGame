echo off
REM set res=pb-egret generate
REM echo %res%
REM pause
REM if %errorlevel% == 0 (
REM     xcopy .\message_bundles\message_bundles.min.js ..\..\Client\game\bin\libs  /e/y
REM     xcopy .\message_bundles\message_bundles.d.ts ..\..\Client\game\libs        /e/y

REM     echo Generate Successed!
REM ) else (
REM     echo Generate Failed!
REM )
REM pause

call pb-egret generate
xcopy .\message_bundles\message_bundles.min.js ..\..\Client\game\bin\libs  /e/y
xcopy .\message_bundles\message_bundles.d.ts ..\..\Client\game\libs        /e/y
pause