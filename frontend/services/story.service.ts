
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Story {
    _id: string;
    userId: string;
    media: {
        mediaUrl: string;
        mediaType: "image" | "video";
        createdAt: string;
        viewers?: {
            userId: string;
            viewedAt: string;
        }[];
    }[];
    isActive: boolean;
    createdAt: string;
}
const storyService = {
    createStory: async (formdata: any) => {
        const response = await axios.post(`${API_URL}/story/create`, formdata, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response.data
    },
    deleteStory: async (storyId: string) => {
        const response = await axios.delete(`${API_URL}/story/delete/${storyId}`, {
            withCredentials: true,

        })
        return response.data
    },
    getStories: async () => {
        const response = await axios.get(`${API_URL}/story/getall`, {
            withCredentials: true,
        })
        return response.data
    },
}

export default storyService