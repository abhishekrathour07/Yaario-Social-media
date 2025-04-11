import { API_URL } from "@/routesbackend"
import axios from "axios"

const requestService = {
    sendRequest: async (friendId: string) => {
        const response = await axios.post(`${API_URL}/send-request`, { friendId }, {
            withCredentials: true
        });
        return response.data;
    },
    acceptFriendRequest: async (friendId: string) => {
        const response = await axios.post(`${API_URL}/accept-request`, { friendId }, {
            withCredentials: true
        });
        return response.data;
    },
    deleteRequest: async (friendId: string) => {
        const response = await axios.post(`${API_URL}/delete-request`, { friendId }, {
            withCredentials: true
        });
        return response.data;
    },
    friendRequests: async () => {
        const response = await axios.get(`${API_URL}/friend-requests`, {
            withCredentials: true
        });
        return response.data;
    },
    friendSuggestion: async () => {
        const response = await axios.get(`${API_URL}/friend-suggestion`, {
            withCredentials: true
        });
        return response.data;
    },
    getFriendList: async () => {
        const response = await axios.get(`${API_URL}/friend-list`, {
            withCredentials: true
        });
        return response.data;
    },
   
}

export default requestService;