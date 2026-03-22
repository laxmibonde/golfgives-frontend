import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

// Response interceptor — auto-logout on 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      // Only redirect if not already on auth page
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;

// ── Namespaced service helpers ────────────────────────────────────────────────

export const authService = {
  login:          (d) => api.post('/auth/login', d),
  register:       (d) => api.post('/auth/register', d),
  me:             ()  => api.get('/auth/me'),
  forgotPassword: (e) => api.post('/auth/forgot-password', { email: e }),
  resetPassword:  (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

export const scoreService = {
  getScores:   ()          => api.get('/scores'),
  addScore:    (d)         => api.post('/scores', d),
  updateScore: (idx, d)    => api.put(`/scores/${idx}`, d),
  deleteScore: (idx)       => api.delete(`/scores/${idx}`),
};

export const charityService = {
  getAll:   (params) => api.get('/charities', { params }),
  getOne:   (id)     => api.get(`/charities/${id}`),
  select:   (d)      => api.put('/charities/select', d),
  create:   (d)      => api.post('/charities', d),
  update:   (id, d)  => api.put(`/charities/${id}`, d),
  remove:   (id)     => api.delete(`/charities/${id}`),
};

export const drawService = {
  getAll:       ()  => api.get('/draws'),
  getCurrent:   ()  => api.get('/draws/current'),
  simulate:     (d) => api.post('/draws/simulate', d),
  publish:      (d) => api.post('/draws/publish', d),
  uploadProof:  (drawId, winnerId, data) =>
    api.post(`/draws/${drawId}/winners/${winnerId}/proof`, data),
};

export const paymentService = {
  createCheckout: (plan) => api.post('/payments/create-checkout', { plan }),
  createPortal:   ()     => api.post('/payments/portal'),
  getStatus:      ()     => api.get('/payments/status'),
};

export const adminService = {
  getStats:               ()          => api.get('/admin/stats'),
  getUsers:               (params)    => api.get('/admin/users', { params }),
  updateSubscription:     (id, status) => api.put(`/admin/users/${id}/subscription`, { status }),
  editScores:             (id, scores) => api.put(`/admin/users/${id}/scores`, { scores }),
  getWinners:             ()          => api.get('/admin/winners'),
  verifyWinner:           (drawId, winnerId, status) =>
    api.put(`/admin/draws/${drawId}/winners/${winnerId}/verify`, { status }),
};
