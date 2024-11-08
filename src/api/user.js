import request from '@/utils/request';
// 注册接口
export const userRegisterServer = ({username,password,repassword})=>
    request.post('/api/reg',{username,password,repassword});


export const userLoginServer = ({username,password})=> 
    request.post('/api/login',{username,password})