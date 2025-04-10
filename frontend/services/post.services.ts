import { API_URL } from '@/routesbackend';
import axios from 'axios';


const postServices = {
    createPost: async (formData: FormData) => {
        const response = await axios.post(`${API_URL}/create-post`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response?.data;
    },
    getAllPostForFeed: async () => {
        const response = await axios.get(`${API_URL}/get-allpost`, {
            withCredentials: true,
        });
        return response?.data;
    },
    deletePost: async (postId: string) => {
        const response = await axios.delete(`${API_URL}/deletepost/${postId}`, {
            withCredentials: true,
        });
        return response.data;
    },
    likePost: async (postId: string) => {
        const response = await axios.put(`${API_URL}/post/like`, { postId }, {
            withCredentials: true
        });
        return response.data;
    },

    addComment: async (data: { postId: string, commentText: string }) => {
        const response = await axios.post(`${API_URL}/post/create-comment`, data, {
            withCredentials: true
        });
        return response.data;
    },
    getAllcomment: async (postId: string) => {
        const response = await axios.get(`${API_URL}/post/getall-comment/${postId}`, {
            withCredentials: true
        });
        return response.data;
    }
};

export default postServices;