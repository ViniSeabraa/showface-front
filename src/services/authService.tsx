import api from './api';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginService = async (payload: LoginPayload) => {
  const response = await api.post('/auth/login', payload);
  return response.data; 
};

export const registerService = async (payload: RegisterPayload) => {
  const response = await api.post('/auth/register', payload);
  return response.data; 
};
