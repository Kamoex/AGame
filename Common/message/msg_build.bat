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
echo --------------------------server_msg------------------------------------
call pbjs -t static-module -w commonjs --no-verify --no-convert -o message_bundles/message_server.js *.proto
if %errorlevel% NEQ 0 goto server_error
call pbts -o message_bundles/message_server.d.ts message_bundles/message_server.js
if %errorlevel% NEQ 0 goto server_error

echo --------------------------client_msg------------------------------------
REM 生成客户端消息
call pb-egret generate
if %errorlevel% NEQ 0 goto client_error

REM 替换message_server.d.ts中解释有误的Array
echo ----------------------replace_server_Array------------------------------
setlocal enabledelayedexpansion
set server_file=.\message_bundles\message_server.d.ts
set server_file_tmp=.\message_bundles\msg_server_temp.d.ts
set server_file_bak=.\message_bundles\message_server_ori.d.ts
set server_source=[ 'Array' ].
set server_replaced=Array

for /f "delims=" %%i in (%server_file%) do (
    set str=%%i
        set "str=!str:%server_source%=%server_replaced%!"
        echo !str!>>%server_file_tmp%
)
copy "%server_file%" "%server_file_bak%" >nul 2>nul
move "%server_file_tmp%" "%server_file%"


REM 替换message_client.d.ts中解释有误的Array
echo ----------------------replace_client_Array------------------------------
set client_file=.\message_bundles\message_client.d.ts
set client_file_tmp=.\message_bundles\msg_clinet_temp.d.ts
set client_file_bak=.\message_bundles\message_client_ori.d.ts
set client_source=[ 'Array' ].

set client_replaced=Array

for /f "delims=" %%i in (%client_file%) do (
    set str=%%i
        set "str=!str:%client_source%=%client_replaced%!"
        echo !str!>>%client_file_tmp%
)
copy "%client_file%" "%client_file_bak%" >nul 2>nul
move "%client_file_tmp%" "%client_file%"


echo -------------------------copy_server_msg--------------------------------
REM 拷贝服务器消息
echo server message copy
xcopy .\message_bundles\message_server.js ..\..\Server\message\                     /y
xcopy .\message_bundles\message_server.d.ts ..\..\Server\message\                   /y
xcopy .\message_bundles\message_server.js ..\..\Server\ServerBuild\message\         /y
xcopy .\message_bundles\message_server.d.ts ..\..\Server\ServerBuild\message\       /y
copy .\MsgDefine.ts ..\..\Server\message\msg_define_build.ts                       /y
copy .\MsgDefine.ts ..\..\Server\ServerBuild\message\msg_define_build.ts           /y


echo -------------------------copy_client_msg--------------------------------
REM 拷贝客户端消息
echo client message copy
xcopy .\message_bundles\message_client.min.js ..\..\Client\game\bin\libs  /y
xcopy .\message_bundles\message_client.d.ts ..\..\Client\game\libs        /y
copy .\MsgDefine.ts ..\..\Client\game\src\message\msg_define_build.ts     /y

pause
exit

:server_error
echo ---------------------------server_error---------------------------------
echo server message build faild!!! please check .proto file
pause
exit

:client_error
echo ---------------------------client_error---------------------------------
echo client message build faild!!! please check .proto file
pause
exit

