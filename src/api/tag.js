import request from '@/utils/request'

// 获取所有标签
export const getAllTags = () => {
  return request.get('/api/tags').then(res => res.data)
}
