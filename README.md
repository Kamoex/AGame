# AGame

## Server

- 协议相关
  - 1.客户端消息生成使用pb-egret插件
  - 2.服务器消息生成使用原生protobufjs

  ## 注意：
  - 1.刚拉下来的client与server目录中是没有消息目录的，需要执行Common/message/msg_build.bat 会生成客户端与服务器对应的message并拷贝到相应目录中
  - 2.每次消息更新变动需要重新执行msg_build.bat
