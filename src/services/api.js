import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://backend.perdidog.cloud/api'
).replace(/\/+$/, '');

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('perdidog_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró, intentar refrescarlo
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('perdidog_refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem('perdidog_token', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiar tokens y redirigir al login
        localStorage.removeItem('perdidog_token');
        localStorage.removeItem('perdidog_refresh_token');
        localStorage.removeItem('perdidog_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ==================== AUTH ====================
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  googleLogin: (data) => api.post('/auth/google', data),
  appleLogin: (data) => api.post('/auth/apple', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  verifyEmail: (token) => api.get(`/auth/verify-email?token=${token}`),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

// ==================== USERS ====================
export const usersAPI = {
  getAll: (params) => api.get('/user', { params }),
  getReported: (params) => api.get('/user/reported', { params }),
  getMe: () => api.get('/user/me'),
  updateMe: (data) => api.patch('/user/me', data),
  getById: (id) => api.get(`/user/${id}`),
  deleteById: (id) => api.delete(`/user/${id}`),
  reportUser: (id, data) => api.patch(`/user/${id}/report`, data),
  restoreUser: (id) => api.patch(`/user/${id}/restore`),
};

// ==================== POSTS ====================
export const postsAPI = {
  create: (data) => api.post('/post', data),
  getAll: (params) => api.get('/post', { params }),
  getById: (id) => api.get(`/post/${id}`),
  update: (id, data) => api.patch(`/post/${id}`, data),
  delete: (id) => api.delete(`/post/${id}`),
  getRecent: (params) => api.get('/post/recent', { params }),
  toggleLike: (id) => api.put(`/post/${id}/like`),
};

// ==================== POST PHOTOS ====================
export const postPhotosAPI = {
  getAll: (params) => api.get('/post-photo', { params }),
  getById: (id) => api.get(`/post-photo/${id}`),
  delete: (id) => api.delete(`/post-photo/${id}`),
};

// ==================== REPORTS ====================
export const reportsAPI = {
  create: (data) => {
    // Si es FormData, cambiar el Content-Type
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    return api.post('/report', data, config);
  },
  getAll: (params) => api.get('/report', { params }),
  getById: (id) => api.get(`/report/${id}`),
  update: (id, data) => {
    // Si es FormData, cambiar el Content-Type
    const config = data instanceof FormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : {};
    // Usar PATCH con query parameter según la API
    return api.patch(`/report?id=${id}`, data, config);
  },
  delete: (id) => api.delete(`/report?id=${id}`),
  getNear: (params) => api.get('/report/near', { params }),
  getRecent: (params) => api.get('/report/recent', { params }),
};

// ==================== CHAT ====================
export const chatAPI = {
  createOrGet: (userId) => api.post('/chat', { userId }),
  getAll: (params) => api.get('/chat', { params }),
  getUnreadCount: () => api.get('/chat/unread-count'),
  getById: (id) => api.get(`/chat/${id}`),
  getMessages: (id, params) => api.get(`/chat/${id}/messages`, { params }),
  markAsRead: (id) => api.patch(`/chat/${id}/mark-read`),
};

export default api;
