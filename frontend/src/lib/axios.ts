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
    const token = localStorage.getItem('archana_access_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Skip refresh loop for auth endpoints themselves
    const isAuthEndpoint =
      original?.url?.includes('/auth/refresh') ||
      original?.url?.includes('/auth/login') ||
      original?.url?.includes('/auth/logout');

    if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        const newToken = data.data?.accessToken;
        if (newToken) {
          localStorage.setItem('archana_access_token', newToken);
          original.headers['Authorization'] = `Bearer ${newToken}`;
          return api(original);
        }
      } catch {
        // Refresh failed — clear local auth state
        if (typeof window !== 'undefined') {
          localStorage.removeItem('archana_access_token');
          // Clear persisted Zustand store so pages know user is logged out
          try {
            const stored = localStorage.getItem('archana-auth');
            if (stored) {
              const parsed = JSON.parse(stored);
              parsed.state = { ...parsed.state, isAuthenticated: false, user: null, accessToken: null };
              localStorage.setItem('archana-auth', JSON.stringify(parsed));
            }
          } catch { /* ignore */ }
          // Replace current history entry — avoids back-button loop
          window.location.replace('/login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

