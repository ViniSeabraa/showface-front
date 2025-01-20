import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }

);

export default api;
