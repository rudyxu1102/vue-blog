# vue-blog

> Vue.js+Node.js+Mongodb+Express的前后端分离的个人博客

> 博客地址：www.xuhaodong.cn

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
- markdown编辑器

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
安装完数据库后，启动mongodb。（不要关闭当前窗口，然后重新打开另外一个dos窗口，进行下一个步骤）
```
mongod --dbpath d:\data      // d:\data 为数据库文件夹位置，可自行设置
```
运行服务器。（确保数据库mongodb已经启动，不要关闭当前窗口，然后重新打开另外一个dos窗口，进行下一个步骤）
```
npm run start
```
在8082端口热重载开发，等待一会后，会自动弹出浏览器窗口，加载会比较慢，请耐心等待
```
npm run dev
```
### 注意
- 账户： boss    密码： 123456
- 配置： 请将server/app.js和/server/api/comment.js里面的xxx@qq.com改为自己的邮箱，来测试邮箱通知功能
- 邮箱通知功能，已经为大家注册了一个公用126邮箱去发送邮件，如果频繁发送邮件到一固定邮箱，则会被当成垃圾邮件被系统拦截。如果需要频繁发送邮件测试，可以在接收邮箱中设置邮箱白名单，也可以在接收邮箱中添加公用的126邮箱为联系人。
- 登录界面在：最底下的——‘站长登录’

### 效果展示
#### 前台效果

首页

![主页](https://segmentfault.com/img/bVMKxp?w=1344&h=646)

博客所有文章

![博客文章](https://segmentfault.com/img/bVNEvk?w=1346&h=645)

最近更新

![最近更新](https://segmentfault.com/img/bVNEeZ?w=1345&h=644)

某一篇文章

![文章](https://segmentfault.com/img/bVNEvl?w=1347&h=635)

留言

![留言](https://segmentfault.com/img/bVMKyu?w=1339&h=642)

评论

![评论](https://segmentfault.com/img/bVNEgl?w=1343&h=645)

#### 后台效果

所有文章

![所有文章](https://segmentfault.com/img/bVNEvp?w=1366&h=644)

搜索文章

![搜索](https://segmentfault.com/img/bVNEvo?w=1366&h=644)

 修改账户

![修改账户](https://segmentfault.com/img/bVNEiV?w=1366&h=638)

markdown编辑器

![编辑器](https://segmentfault.com/img/bVNEiK?w=1366&h=643)

移动端演示

![移动端](https://segmentfault.com/img/remote/1460000009411216?w=318&h=568)
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

