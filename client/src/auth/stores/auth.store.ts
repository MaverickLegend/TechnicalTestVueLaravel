import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/register.actions';
import { checkAuthAction } from '../actions/check-auth.actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | null>(null);
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        logout();
        console.log(loginResponse.message);
        return false;
      }

      console.log('Login Response User:', loginResponse.user);
      console.log('Before setting user.value:', user.value);
      user.value = loginResponse.user;
      console.log('After setting user.value:', user.value);
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      return logout();
    }
  };

  const register = async (
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    password: string,
  ) => {
    try {
      const registerResponse = await registerAction(
        first_name,
        last_name,
        phone_number,
        email,
        password,
      );
      if (!registerResponse.ok) {
        return {
          ok: false,
          message: 'Error al registrar usuario',
        };
      }
      return {
        ok: true,
        message: 'Usuario registrado correctamente',
      };

      // user.value = registerResponse.user;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Error al registrar usuario',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = null;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();
      if (authStatus.value === AuthStatus.Authenticated) {
        return true; // Ya está autenticado
      }

      if (!statusResponse.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResponse.user;
      token.value = statusResponse.token;
      return true;
    } catch (error) {
      console.log('Error al verificar autenticación:', error);
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // Getters

    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    userProfile: computed(() => user.value),

    // Actions

    login,
    logout,
    register,
    checkAuthStatus,
  };
});
