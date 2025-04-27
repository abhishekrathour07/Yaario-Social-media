
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;



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