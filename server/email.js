const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: '126',
    auth: {
        user: 'blogbutler@126.com',
        pass: '123456abc'
    }
})

exports.send = function(to, subject, html, res) {
    const mailOptions = {
        from: '"博客小管家" <blogbutler@126.com>',
        to : to,
        subject : subject,
        html : html
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            res.status(504).end("通知邮件发送失败")
        } else {
            console.log("Message sent: " + info.response)
        }
    })
}
