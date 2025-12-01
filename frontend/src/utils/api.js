import axios from 'axios'

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

// User APIs
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
}

// Plans APIs
export const plansAPI = {
  getAllPlans: () => api.get('/plans'),
  getPlanById: (id) => api.get(`/plans/${id}`),
  enrollPlan: (planData) => api.post('/plans/enroll', planData),
}

// Claims APIs
export const claimsAPI = {
  getAllClaims: () => api.get('/claims'),
  submitClaim: (claimData) => api.post('/claims', claimData),
  getClaimById: (id) => api.get(`/claims/${id}`),
}

// Policies APIs
export const policiesAPI = {
  getActivePolicies: () => api.get('/policies/active'),
  getPolicyById: (id) => api.get(`/policies/${id}`),
}

// Payments APIs
export const paymentsAPI = {
  getPaymentHistory: () => api.get('/payments'),
  makePayment: (paymentData) => api.post('/payments', paymentData),
}

export default api
