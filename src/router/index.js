import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './admin';

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
    // Blog Routes
    {
      path: '/blog',
      component: () => import('@/views/BlogListView.vue'),
    },
    {
      path: '/blog/:slug',
      component: () => import('@/views/BlogDetailView.vue'),
    },
    // Admin Routes
    {
      path: '/admin',
      children: adminRoutes
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
