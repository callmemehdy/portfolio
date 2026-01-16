import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (password) => {
    const response = await api.post('/api/auth/login', { password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const projectService = {
  getAll: async () => {
    const response = await api.get('/api/projects/all');
    return response.data;
  },
  
  getPublic: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },
  
  create: async (project) => {
    const response = await api.post('/api/projects', project);
    return response.data;
  },
  
  update: async (id, project) => {
    const response = await api.put(`/api/projects/${id}`, project);
    return response.data;
  },
  
  delete: async (id) => {
    await api.delete(`/api/projects/${id}`);
  },
};

export const githubService = {
  getRepos: async () => {
    const response = await api.get('/api/github/repos');
    return response.data;
  },
  
  getRepoDetail: async (owner, repo) => {
    const response = await api.get(`/api/github/repo/${owner}/${repo}`);
    return response.data;
  },
};

export default api;
