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
    const content = `
<div style="width: 90%; border: 2px solid lightgreen; margin: 1rem auto; padding: 1rem; text-align: center;">
    <p style="border-bottom: 1px dashed lightgreen;margin: 0;padding-bottom: 1rem; color: lightgreen; font-size: 1.25rem;">MyBlog Message</p>
<p style="margin: 1rem 0 0;">hello,站长 &#x1f608</p>
<p sytle="margin: 0 0 1rem;">你有一条新留言</p>
<p style="width: 70%; border-left: 4px solid lightgreen; padding: 1rem; margin: 0 auto 2rem; text-align: left;white-space: pre-line;">主题: ${req.body.subject}
内容: ${req.body.content}
邮箱: ${req.body.address}
    </p>
    <a href="https://www.xxx.cn" style="text-decoration: none; background: lightgreen;color: #fff; height: 2rem; line-height: 2rem; padding: 0 1rem; display: inline-block; border-radius: 0.2rem;">回到博客</a>
    </div>
    `
    mail.send('xxx@qq.com', '您的博客有一条新留言', content, res)
    res.status(200).send('send email successfully')
})

app.listen(app.get('port'), function () {
    console.log('GetData http://localhost:' + app.get('port'))
})
