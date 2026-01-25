import request from '@/utils/request'

// 提交评论
export const submitComment = (payload) => {
  return request.post('/api/comment', payload).then(res => res.data)
}

// 获取所有评论
export const getAllComments = (params) => {
  return request.get('/api/comments', { params: { payload: params } }).then(res => res.data)
}

// 更新点赞
export const updateLike = (payload) => {
  return request.patch(`/api/comments/${payload.id}`, { option: payload.option }).then(res => res.data)
}
