import marked from 'marked'

const unescapeHTML = (a) => {
    a = '' + a
    return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, '"')
}

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
    return '<a href="#' + text + '" class="hashTitle" data-scroll><h' + level +
        ' id="' + text + '">' + text + '</h' + level + '></a>'
}

export default {
    reducedArticles: (state) => {
        const articles = state.articles.map(article => {
            let newArticle = {}
            for (let i in article) { newArticle[i] = article[i] }
            newArticle.content = marked(article.content || '').replace(/<[^>]*>/g, '').slice(0, 200) + '......'
            return newArticle
        })
        return articles
    },
    allTags: (state) => {
        state.tags.unshift('全部')
        return state.tags
    },
    articleList: (state) => {
        const strHtml = unescapeHTML(marked(state.article.content || '', { renderer: renderer }))
        if (strHtml) {
            const Re = /<h(\d) id="(.*?)">/g
            let arr = Re.exec(strHtml)
            let list = []
            let index = 0
            const sizeTop = arr[1]
            list.push({
                level: 1,
                size: sizeTop,
                content: arr[2]
            })
            while ((arr = Re.exec(strHtml)) !== null) {
                var level
                if (arr[1] > list[index].size) {
                    level = list[index].level + 1
                } else if (arr[1] === list[index].size) {
                    level = list[index].level
                } else if (arr[1] < list[index].size) {
                    let i = index
                    while (i--) {
                        if (arr[1] === list[i].size) {
                            level = list[i].level
                            break
                        }
                    }
                }
                list.push({
                    level: level,
                    size: arr[1],
                    content: arr[2]
                })
                index = index + 1
            }
            return list
        }
    }
}
