import { laravelApi } from '@/api';
import type { AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await laravelApi.post<AuthResponse>('/login', { email, password });
    console.log(data);
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }

    console.log(error);
    throw new Error('Error al iniciar sesión');
  }
};
