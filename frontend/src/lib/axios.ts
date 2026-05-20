import axios from 'axios';

const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach access token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('bkp_access_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        const newToken = data.data?.accessToken;
        if (newToken) {
          localStorage.setItem('bkp_access_token', newToken);
          original.headers['Authorization'] = `Bearer ${newToken}`;
          return api(original);
        }
      } catch {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('bkp_access_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
