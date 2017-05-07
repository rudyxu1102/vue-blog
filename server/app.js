const express = require('express')
const bodyParser = require('body-parser')
const route = require('./api/index.js')
const mail = require('./email')
const app = express()

app.set('port', (process.env.port || 3003))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

route(app)

// 发送邮件通知站长
app.post('/api/mail', (req, res) => {
    const content = '主题：'+ req.body.subject + '\n内容：' + req.body.content + '\nfrom---' + req.body.address
    mail.send('xxx@qq.com', '您的博客有一条新留言', content, res)
    res.status(200).send('send email successfully')
})

app.listen(app.get('port'), function () {
    console.log('Visit http://localhost:' + app.get('port'))
})
