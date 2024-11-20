import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userGetInfoServer } from '@/api/user';

export const userUserStore = defineStore('big-user',()=>{
    const token = ref('');
    const setToken = (newToken)=>{
        token.value = newToken;
    };
    const removeToken = ()=>{
        token.value = '';
    };

    const user = ref({})
    const getUser = async ()=>{
        const userMsg = await userGetInfoServer();
        user.value = userMsg.data.data;
    }
    const setUser = (obj)=>{
        user.value = obj
    }
    return{
        token,
        setToken,
        removeToken,
        user,
        getUser,
        setUser
    };
},{
    persist:true
});