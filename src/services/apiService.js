import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
});

// Simulates the behavior of the interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchQuestions = async (requestBody) => {
  const token = localStorage.getItem('authToken');
  const response = await apiClient.post('/api/v1/questions', requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.questions;
};

export const login = async ({ username, password }) => {
  const response = await apiClient.post('/api/v1/auth/login', { username, password });
  return response.data;
};

export const googleLogin = async (googleToken) => {
  const response = await apiClient.post('/api/v1/auth/google', {
    id_token: googleToken,
  });
  return response.data;
};
