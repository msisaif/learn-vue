import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Error handling for router
router.onError((error) => {
  console.error('Router error:', error)
})

export default router
