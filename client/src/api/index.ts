import axios from 'axios';

const laravelApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

laravelApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { laravelApi };
