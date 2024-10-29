import axios from 'axios';
import { userUserStore } from '@/stores';
import { ElMessage } from 'element-plus';
import router from './../src/router/index';
const baseUrl = 'http://big-event-vue-api-t.itheima.net';

const instance = axios.create({
    baseUrl,
    // 设置超时时间
    timeout:10000
});
//请求拦截器
instance.interceptors.request.use(
    (config)=>{
        // 携带token
        const userStore = userUserStore();
        if(userStore.token){
            config.headers.Authorization = userStore.token;
        }
        return config;
    },
    (err)=>Promise.reject(err)
);
// 响应拦截器
instance.interceptors.reponse.use(
    (res)=>{
        // 处理业务逻辑
        if(res.data.code===0){
            return res;
        }
        //处理业务失败，给错误提示，并且抛出错误提示
        ElMessage.error(res.data.message || '服务异常');
        return Promise.reject(res.data);
    },
    (err)=>{
        // 处理401，只要给提示  代表权限不足或者token过期
        if(err.reponse?.state === 401){
            router.push('/login');
        }

        // 错误的默认情况
        ElMessage.error(err.reponse.data.message || '服务异常');
        return Promise.reject(err);
    } 
);
export default instance;
export {baseUrl};