import request from '@/utils/request';
// 注册接口
export const userRegisterServer = ({username,password,repassword})=>
    request.post('/api/reg',{username,password,repassword});

// 登录接口
export const userLoginServer = ({username,password})=> 
    request.post('/api/login',{username,password})

// 获取用户信息
export const userGetInfoServer = ()=> request.get('/my/userinfo')
