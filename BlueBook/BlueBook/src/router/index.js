import{createRouter,createWebHistory} from 'vue-router'

import HomePage from "@/components/HomePage.vue"
import PublishPage from "@/components/PublishPage.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
    {
        path: '/publish',
        name: 'Publish',
        component: () => import('@/components/PublishPage.vue'),
        meta: { requiresAuth: true }//这个字段表示该路由需要登录才能访问，后同
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/components/Register.vue')
    }
]
// 问题：
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
        alert('请先登录')
        next('/') // 未登录跳转登录页
    } else {
        next()
    }
})

export default router