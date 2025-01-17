import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from '@/auth/routes';
import isAuthenticatedGuard from '@/auth/guards/is-authenticated.guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: isAuthenticatedGuard,
    },
    ...(Array.isArray(authRoutes) ? authRoutes : [authRoutes]),
  ],
});

export default router;
