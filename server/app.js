const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const route = require('./api/index.js')
const mail = require('./email')
const app = express()

app.set('port', (process.env.port || 3030))
app.use(favicon(path.resolve(__dirname, '../static/favicon.ico')))
app.use('/static', express.static(path.resolve(__dirname, '../static')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 设置跨域访问
// app.all('*',function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, authorization, Accept, X-Requested-With , yourHeaderFeild');
//    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
//    next()
// })

route(app)

// 发送邮件通知站长
app.post('/api/mail', (req, res) => {
    const content = req.body.content + '\nfrom---' + req.body.address
    mail.send('xxxxx@qq.com', req.body.subject, content, res)
})

app.listen(app.get('port'), function () {
    console.log('Visit http://localhost:' + app.get('port'))
})
