import request from '@/utils/request'

//文章分类接口
export const artGetListServer = () => request.get('/my/cate/list')

// 添加分类接口
export const artAddChannelServer = (data) => request.post('/my/cate/add', data)

//编辑文章分类
export const artEditChannelServer = (params) =>
  request.put('/my/cate/info', data)

//删除文章分类
export const artDelChannelServer = (id) =>
  request.delete('/my/cate/del', {
    params: { id },
  })

// 获取文章列表
export const artGetArtlistServer = (params) =>
  request.get('/my/article/list', {
    params,
  })

// 文章：添加文章
// 注意，data需要一个formData格式得对象
export const artPublishServer = (data) => request.post('/my/article/add', data)

// 根据id获取详情数据
export const artGetDetailServer = (id) =>
  request.get('/my/article/info', {
    params: { id },
  })

// 根据id获取详情数据
export const artEditServer = (data) => request.put('/my/article/info', data)

//删除文章管理的文章
export const artDelServe = (id) =>
  request.delete('/my/article/info', {
    params: { id },
  })
