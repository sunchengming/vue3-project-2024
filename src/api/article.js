import request from '@/utils/request';

//文章分类接口
export const artGetListServer = ()=>request.get('/my/cate/list')

// 添加分类接口
export const artAddChannelServer = (data)=>request.post('/my/cate/add',data)

//编辑文章分类
export const artEditChannelServer = (data)=>request.put('/my/cate/info',data)

//删除文章分类
export const artDelChannelServer = (id)=>request.delete('/my/cate/del',{
    params:{id}
})

// 获取文章列表
export const artGetArtlistServer = (params)=>request.get('/my/article/list',{
    params
})