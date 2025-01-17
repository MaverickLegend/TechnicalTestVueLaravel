import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  try {
    const authStore = useAuthStore();
    await authStore.checkAuthStatus();
    if (authStore.authStatus === AuthStatus.Authenticated) {
      next({ name: 'home' });
    } else {
      next();
    }
  } catch (error) {
    console.log('Error en isNotAuthenticatedGuard:', error);
    next({ name: 'login' });
  }
};

export default isNotAuthenticatedGuard;
