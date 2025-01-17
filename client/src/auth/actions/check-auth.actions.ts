import { laravelApi } from '../../api/';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface CheckAuthError {
  ok: false;
}

interface CheckAuthSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckAuthError | CheckAuthSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }

    const { data } = await laravelApi.get<AuthResponse>('/check-status');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false };
    }
    throw new Error('Error al verificar autenticación');
  }
};
