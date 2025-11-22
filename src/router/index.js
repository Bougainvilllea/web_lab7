import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { 
    path: '/', 
    redirect: '/todo' 
  },
  { 
    path: '/login', 
    component: () => import('../views/Login.vue') 
  },
  { 
    path: '/todo', 
    component: () => import('../views/Todo.vue') 
  },
  { 
    path: '/about', 
    component: () => import('../views/About.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.path !== '/login' && !auth.user) {
    return '/login'
  }
})

export default router