import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  try {
    const authStore = useAuthStore();
    await authStore.checkAuthStatus();
    if (authStore.authStatus === AuthStatus.UnAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  } catch (error) {
    console.log('Error en isAuthenticatedGuard:', error);
    next({ name: 'login' });
  }
};

export default isAuthenticatedGuard;
