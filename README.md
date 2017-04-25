# vue-blog

> 一个前端基于Vue.js，后端基于Node.js的博客内容管理器

## 技术构成
### 前端
- vue.js
- vue-router
- vue-resource
- vuex

### 后端
- node.js
- mongodb
- Express

## Setup

### 运行环境
- node.js
- mongoDB
### 克隆远程库
```
git clone https://github.com/FatDong1/VueBlog.git
```
### 安装完数据库后，启动mongodb
```
mongodb --dbpath d:/data
// d:/data 为数据库文件夹位置，可自行设置
```
### 进入项目目录VueBlog后，安装依赖
```
npm install
```
### 运行服务器。（确保数据库mongodb已经启动）
```
npm run start
// 跑在本地的http://localhost:3030/
```
### 在8080端口热重载开发
```
npm run dev
```
## 注意
nodmailer

## 目录
│  .babelrc             babel配置
│  .editorconfig        编辑器配置
│  .eslintignore        eslint忽略
│  .eslintrc.js         eslintrc配置
│  .gitignore           git上传忽略
│  .postcssrc.js
│  debug.log
│  index.html           打包模板
│  package.json
│  README.md
│  LICENSE
│
├─build
│
├─server                服务端
│      │
│      ├─ api           Restful接口
│      │
│      ├─ db            数据库
│      │
│      ├─ middlewares   中间件
│      │
│      ├─app.js
│      └─email.js
│
└─src
│   │  main.js        项目入口
│   │  App.vue          根组件
│   │
│   ├─assets          外部引用文件
│   │  ├─css
│   │  └─js
│   │
│   ├─components      vue组件
│   │  ├─back         后台组件
│   │  ├─front        前台组件
│   │  └─share        公共组件
│   │
│   ├─ lib
│   │
│   ├─router          路由
│   │
│   └─store           vuex文件
│
└─static            静态文件

## Licence
MIT

