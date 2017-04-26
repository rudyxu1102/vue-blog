# vue-blog

> Vue.js+Node.js+Mongodb+Express的前后端分离的个人博客

## 主要技术构成
前端主要技术栈为vue.js、vue-router、 vue-resource、 vuex

后端主要技术栈为node.js、 mongodb、 Express

## 博客功能
### 前台页面
- canvas粒子效果
- 搜索文章
- 动态显示文章
- 留言
- 文章分类显示
- 评论文章
- 文章目录

### 后台管理页面
- 发布文章
- 存为草稿
- 搜索文章
- 修改账户
- 权限验证
- 登录验证

## Setup

运行环境
- node.js
- mongoDB

克隆远程库
```
git clone https://github.com/FatDong1/VueBlog.git
```
进入项目目录VueBlog后，安装依赖
```
npm install
```
安装完数据库后，启动mongodb
```
mongod --dbpath d:\data      // d:\data 为数据库文件夹位置，可自行设置
```
运行服务器。（确保数据库mongodb已经启动）
```
npm run start             // 跑在本地的http://localhost:3030/
```
在8082端口热重载开发
```
npm run dev
```

### 注意
- 使用nodmailer插件来发送邮件通知，请将/server/app.js和/server/api/comment.js中的'xxxxx@qq.com'邮箱改为自己的邮箱，多次发送邮件会把发送者的邮箱列为黑名单，请提前在接收者邮箱设置白名单。发送邮箱已经为大家注册了一个公用的126邮箱，在项目已经配置好了。
- 账号： boss    密码： 123456

### 效果展示
#### 前台效果
![主页](https://segmentfault.com/img/bVMKxp?w=1344&h=646)

![博客文章](https://segmentfault.com/img/bVMKxx?w=1339&h=645)

![文章](https://segmentfault.com/img/bVMKx9?w=1346&h=643)

![留言](https://segmentfault.com/img/bVMKyu?w=1339&h=642)

#### 后台效果

![所有文章](https://segmentfault.com/img/bVMKxf?w=1361&h=638)

![搜索](https://segmentfault.com/img/bVMKyV?w=1356&h=645)

![修改账户](https://segmentfault.com/img/bVMKyX?w=1359&h=641)


### 目录
```
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
├─src
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
│   │  └─share        共享组件
│   │
│   ├─ lib
│   │
│   ├─router          路由
│   │
│   └─store           vuex文件
│
└─static            静态文件
```


### Licence
MIT

