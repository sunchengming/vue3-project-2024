import { createRouter, createWebHistory } from 'vue-router'
import { userUserStore } from '@/stores'

// createRouter创建路由实例
// 配置路由history模式
// 1.history模式：createWebHistory 地址栏不带#
// 2.hash模式：createWebHahHistory 地址栏带#
// vite的环境变量：import.meta.env.BASE_URL  可以在vite.config.js里面配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      meta: { title: '登录' },
      component: () => import('@/views/login/LoginPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          meta: { title: '文章管理' },
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          path: '/article/channel',
          meta: { title: '文章分类' },
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          path: '/user/profile',
          meta: { title: '个人中心/基本资料' },
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/user/avatar',
          meta: { title: '个人中心/更换头像' },
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          path: '/user/password',
          meta: { title: '个人中心/修改密码' },
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from) => {
  const useStore = userUserStore()
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  console.log(useStore)
  if (!useStore.token && to.path !== '/login') return '/login'
  return true
})

export default router
