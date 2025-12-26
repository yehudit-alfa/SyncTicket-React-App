import axios from 'axios';

const API_URL = 'http://localhost:4000/auth';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; 
    },
    registerAndLogin: async (name: string, email: string, password: string) => {
        await axios.post(`${API_URL}/register`, { name, email, password });
        const loginResponse = await axios.post(`${API_URL}/login`, { email, password });
        return loginResponse.data;
    },
    getCurrentUser: async (token: string) => {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; 
    }
};