
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;


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
    getFriendList: async (userId:string) => {
        const response = await axios.get(`${API_URL}/friend-list/${userId}`, {
            withCredentials: true
        });
        return response.data;
    },
   
}

export default requestService;