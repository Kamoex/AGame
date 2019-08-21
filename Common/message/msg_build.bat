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

REM 生成服务器消息
call pbjs -t static-module -w commonjs --no-verify --no-convert -o message_bundles/message_server.js *.proto
if %errorlevel% NEQ 0 goto server_error
call pbts -o message_bundles/message_server.d.ts message_bundles/message_server.js
if %errorlevel% NEQ 0 goto server_error

REM 生成客户端消息
call pb-egret generate
if %errorlevel% NEQ 0 goto client_error

REM 拷贝服务器消息
echo server message copy
xcopy .\message_bundles\message_server.js ..\..\Server\src\MessageBuild         /e/y
xcopy .\message_bundles\message_server.d.ts ..\..\Server\src\MessageBuild       /e/y

REM 拷贝客户端消息
echo client message copy
xcopy .\message_bundles\message_client.min.js ..\..\Client\game\bin\libs  /e/y
xcopy .\message_bundles\message_client.d.ts ..\..\Client\game\libs        /e/y

pause
exit

:server_error
echo server message build faild!!! please check .proto file
pause
exit

:client_error
echo client message build faild!!! please check .proto file
pause
exit