import { laravelApi } from '@/api';
import type { User } from '../interfaces/user.interface';
import axios from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  message: string;
}

export const registerAction = async (
  first_name: string,
  last_name: string,
  phone_number: string,
  email: string,
  password: string,
): Promise<RegisterError | RegisterSuccess> => {
  try {
    console.log('Enviando datos al endpoint /register:', {
      first_name,
      last_name,
      phone_number,
      email,
      password,
    });

    const { data } = await laravelApi.post('/register', {
      first_name,
      last_name,
      phone_number,
      email,
      password,
    });

    console.log('Respuesta del servidor:', data);

    return {
      ok: true,
      user: data.user,
      message: 'Usuario registrado correctamente',
    };
  } catch (error) {
    console.error('Error durante la solicitud a /register:', error);

    if (axios.isAxiosError(error)) {
      console.log('Detalles del error de Axios:', {
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.status === 400) {
        return {
          ok: false,
          message: 'Error con Axios al registrar usuario',
        };
      }
    }
    return {
      ok: false,
      message: 'Error al registrar usuario',
    };
  }
};
