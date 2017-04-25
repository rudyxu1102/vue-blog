const article = require('./article.js')
const draft = require('./draft.js')
const tag = require('./tag.js')
const comment = require('./comment')
const login = require('./login')
const user = require('./user')

module.exports = (app) => {
    app.use(article)
    app.use(draft)
    app.use(tag)
    app.use(comment)
    app.use(login)
    app.use(user)
}