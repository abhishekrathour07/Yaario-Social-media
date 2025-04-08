import axios from 'axios';

const API_URL = 'http://localhost:4005/api/v1/auth';

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
        const response = await axios.post(`${API_URL}/login`, data, {
            withCredentials: true 
        });
        return response.data;
    },

    signup: async (data: SignupData) => {
        const response = await axios.post(`${API_URL}/register`, data, {
            withCredentials: true
        });
        return response.data;
    },

    logout: async () => {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true
        });
        return response.data;
    }
};