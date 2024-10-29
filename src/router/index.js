import { createRouter, createWebHistory } from 'vue-router';


// createRouter创建路由实例
// 配置路由history模式
// 1.history模式：createWebHistory 地址栏不带#
// 2.hash模式：createWebHahHistory 地址栏带#
// vite的环境变量：import.meta.env.BASE_URL  可以在vite.config.js里面配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      component:()=>import('@/views/login/LoginPage.vue')
    },
    {
      path:'/',
      component:()=>import('@/views/layout/LayoutContainer.vue'),
      redirect:'/article/manage',
      children:[
        {
          path:'/article/manage',
          component:()=>import('@/views/article/ArticleManage.vue')
        },
        {
          path:'/alticle/channel',
          component:()=>import('@/views/article/ArticleChannel.vue')
        },
        {
          path:'/user/profile',
          component:()=>import('@/views/user/UserProfile.vue')
        },
        {
          path:'/user/avatar',
          component:()=>import('@/views/user/UserAvatar.vue')
        },
        {
          path:'/user/password',
          component:()=>import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ],
});

export default router;
