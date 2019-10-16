# AGame

## 服务器架设相关
- 安装mongodb 4.0.10
- 安装mariadb 10.4.6
- 安装nodejs  12.6.0
  
### DB相关(暂时需要手动创建 之后会优化)
- 手动在mongodb中创建 gamelog库
- 手动在mariadb中创建 game库
  
#### IDE相关
- 安装vscode

### 依赖库
- 用vscode打开文件夹 `AGame/Server`
- 控制台输入 ```npm init``` 遇到需要确认的直接回车
- ```npm install -g typescript``` 安装typescript
- ```npm install -g @egret/protobuf``` 安装protobuf插件
- ```npm install``` 安装所有依赖库
- 执行 `AGame\Common\message\msg_build.bat` 生成协议相关文件




## 服务器说明

  ## 协议相关
  1. 客户端消息生成使用pb-egret插件
  2. 服务器消息生成使用原生protobufjs

  ## 注意：
  1. 刚拉下来的client与server目录中是没有消息目录的,需要执行`Common/message/msg_build.bat` 会生成客户端与服务器对应的message并拷贝到相应目录中
  2. 每次消息更新变动需要重新执行`msg_build.bat`
