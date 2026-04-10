import request from '@/utils/request'

//文章分类接口
export const artGetListServer = () => request.get('/my/cate/list')

// 添加分类接口
export const artAddChannelServer = (data) => {
  if (!data || !data.cate_name || !data.cate_alias) {
    return Promise.reject(
      new Error('Missing required fields: cate_name, cate_alias'),
    )
  }
  return request.post('/my/cate/add', data)
}

//编辑文章分类
export const artEditChannelServer = (data) => {
  if (!data || !data.id) {
    return Promise.reject(new Error('Missing required field: id'))
  }
  return request.put('/my/cate/info', data)
}

//删除文章分类
export const artDelChannelServer = (id) => {
  if (!id) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  return request.delete('/my/cate/del', {
    params: { id },
  })
}

// 获取文章列表
export const artGetArtlistServer = (params) => {
  if (!params || !params.pagenum || !params.pagesize) {
    return Promise.reject(
      new Error('Missing required parameters: pagenum, pagesize'),
    )
  }
  return request.get('/my/article/list', {
    params,
  })
}

// 文章：添加文章
// 注意，data需要一个formData格式得对象
export const artPublishServer = (data) => {
  if (!data || !(data instanceof FormData)) {
    return Promise.reject(new Error('Data must be a FormData instance'))
  }
  return request.post('/my/article/add', data)
}

// 根据id获取详情数据
export const artGetDetailServer = (id) => {
  if (!id) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  return request.get('/my/article/info', {
    params: { id },
  })
}

// 编辑文章
export const artEditServer = (data) => {
  if (!data) {
    return Promise.reject(new Error('Missing required parameter: data'))
  }
  return request.put('/my/article/info', data)
}

//删除文章管理的文章
export const artDelServe = (id) => {
  if (!id) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  return request.delete('/my/article/info', {
    params: { id },
  })
}
