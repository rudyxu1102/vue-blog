import request from '@/utils/request'

// 保存草稿
export const saveDraft = (data) => {
  return request.post('/api/draft', data).then(res => res.data)
}

// 更新草稿
export const updateDraft = (id, data) => {
  return request.patch(`/api/draft/${id}`, data).then(res => res.data)
}

// 获取所有草稿
export const getAllDrafts = (params) => {
  return request.get('/api/drafts', { params: { payload: params } }).then(res => res.data)
}
