import request from '@/utils/request'

// 获取所有文章
export const getAllArticles = (params) => {
  return request.get('/api/articles', { params: { payload: params } }).then(res => res.data)
}

// 获取单篇文章
export const getArticleById = (id) => {
  return request.get(`/api/article/${id}`).then(res => res.data)
}

// 保存新文章
export const saveArticle = (data) => {
  return request.post('/api/article', data).then(res => res.data)
}

// 更新文章
export const updateArticle = (id, data) => {
  return request.patch(`/api/article/${id}`, data).then(res => res.data)
}

// 删除文章
export const deleteArticle = (id) => {
  return request.delete(`/api/article/${id}`).then(res => res.data)
}

// 搜索文章
export const searchArticles = (params) => {
  return request.get('/api/someArticles', { params: { payload: params } }).then(res => res.data)
}

// 发送邮件
export const sendMail = (payload) => {
  return request.post('/api/mail', payload).then(res => res.data)
}
