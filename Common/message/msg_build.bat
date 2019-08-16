REM echo off
REM call pb-egret generate 
REM echo %errorlevel%
REM if %errorlevel% == 0 (
REM     xcopy .\message_bundles\protobuf-bundles.min.js ..\..\Client\game\bin\libs  /e/y
REM     xcopy .\message_bundles\protobuf-bundles.d.ts ..\..\Client\game\libs        /e/y

REM     echo Generate Successed!
REM ) else (
REM     echo Generate Failed!
REM )
REM pause
echo off
call pb-egret generate (goto succeed) || goto failed

:succeed

echo successfully

:failed

echo failed

pause