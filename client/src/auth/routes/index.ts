import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticatedGuard from '../guards/is-not-authenticated.guard';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  redirect: { name: 'login' },
  component: () => import('@/auth/layout/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/auth/LogInComponent.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/auth/RegisterComponent.vue'),
    },
  ],
};
