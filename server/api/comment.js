const express = require('express')
const router = express.Router()
const mail = require('../email')
const db = require('../db/db.js')

const emailForm = (title, name, otherName, message, content, url) => {
    let string = `
<div style="width: 90%; border: 2px solid lightgreen; margin: 1rem auto; padding: 1rem; text-align: center;">
        <p style="border-bottom: 1px dashed lightgreen; margin: 0;padding-bottom: 1rem; color: lightgreen; font-size: 1.25rem;">${title}</p>
        <p style="margin: 1rem 0 0;">hello,${name} &#x1f608</p>
        <p style="margin: 0 0 1rem;">${otherName}${message}</p>
        <p style="width: 70%; border-left: 4px solid lightgreen; padding: 1rem; margin: 0 auto 2rem; text-align: left;white-space: pre-line;">${content}</p>
    <a href= ${url} style="text-decoration: none; background: lightgreen;color: #fff; height: 2rem; line-height: 2rem; padding: 0 1rem; display: inline-block; border-radius: 0.2rem;">前往查看</a>
        </div>
    `
    return string
}

// 发布评论并通知站长和评论者
router.post('/api/comment', (req, res) => {
    db.Comment.findOne({name: req.body.name, articleId: req.body.articleId}, (err, doc) => {
        if (doc && doc.address !== req.body.address) {
            res.status(403).end('用户名已存在')
        } else if(!doc || doc.address === req.body.address) {
            const comment = {
                imgName: req.body.imgName,
                name: req.body.name,
                address: req.body.address,
                date: Date(),
                content: req.body.content,
                articleId: req.body.articleId,
                like: 0
            }
            if (/^@(.*):/.test(req.body.content)) {
                const reviewer = /^@(.*):/.exec(req.body.content)[1]                // 评论者的名字
                db.Comment.findOne({name: reviewer, articleId: req.body.articleId}, (err, doc) => {
                    const url = 'https://www.xxx.cn' + req.body.curPath
                    const replyEmail = doc.address
                    const content =  emailForm('欢迎常来我的博客', reviewer, req.body.name, '回复了你的评论',req.body.content, url)
                    mail.send(replyEmail, '您在FatDong的博客有一条新评论', content, res)
                })
            }
            new db.Comment(comment).save().then(() => {
                const url = 'https://www.xxx.cn' + req.body.curPath
                const content = emailForm('MyBlog Message', '站长', req.body.name, '评论了你的文章',req.body.content, url)
                mail.send('xxx@qq.com', '您的博客有一条新评论', content, res)
                res.status(200).send('send email successfully')
            }).catch(err => { console.log(err) })
            db.Article.update({aid: req.body.articleId},{$inc: {comment_n: 1}}, (err, data) => {
                if (err) {
                    console.log(err)
                }
            })
        }
    })
})

// 获取某一篇文章的所有评论
router.get('/api/comments', (req, res) => {
    const articleId = req.query.payload.id
    if (req.query.payload.sort === 'date') {                                // 根据时间排序评论
        db.Comment.find({articleId: articleId}, 'name date content like imgName').sort({date: -1}).exec()
            .then((comments) => {
                res.send(comments)
            })
    } else if (req.query.payload.sort === 'like') {                         // 根据点赞数量排序评论
        db.Comment.find({articleId: articleId}, 'name date content like imgName').sort({like: -1}).exec()
            .then((comments) => {
                res.send(comments)
            })
    } else {                                                                // 根据文章的aid获取所有评论
        db.Comment.find({articleId: articleId}, 'name date content like imgName').exec().then((comments) => {
            res.send(comments)
        })
    }
})

// 更新评论的点赞数
router.patch('/api/comments/:id', (req, res) => {
    const id = req.params.id
    if (req.body.option === 'add') {
        db.Comment.update({_id: id}, {$inc: {like: 1}}, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('succeed in updating like')
            }
        })
    } else if (req.body.option === 'drop') {
        db.Comment.update({_id: id}, {$inc: {like: -1}}, (err, data) => {
            if (err) {
            console.log(err)
        } else {
            res.status(200).send('succeed in updating like')
        }})
    }
})

module.exports = router
