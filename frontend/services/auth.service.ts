import { API_URL } from '@/routesbackend';
import axios from 'axios';

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
}

export const authService = {
    login: async (data: LoginData) => {
        const response = await axios.post(`${API_URL}/auth/login`, data, {
            withCredentials: true 
        });
        return response.data;
    },

    signup: async (data: SignupData) => {
        const response = await axios.post(`${API_URL}/auth/register`, data, {
            withCredentials: true
        });
        return response.data;
    },

    logout: async () => {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true
        });
        return response.data;
    }
};