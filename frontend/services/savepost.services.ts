import { API_URL } from "@/routesbackend"
import axios from "axios"


const savePostServices = {
    getAllSavePost: async () => {
        const response = await axios.get(`${API_URL}/post/get-savepost`, {
            withCredentials: true
        });
        return response.data;
    },
    saveUnsavePost: async (postId: any) => {
        const response = await axios.put(`${API_URL}/post/save`, {postId}, {
            withCredentials: true
        });
        return response.data;
    }
}

export default savePostServices