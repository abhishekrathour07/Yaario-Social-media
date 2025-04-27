
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export type profileTypes = {
    name: string,
    avatar: string | null,
    coverImage: string | null,
    followings: string[];
    followers: string[],
    _id:string

}

const profileService = {
    getProfileDetailById: async (userId: string) => {
        const response = await axios.get(`${API_URL}/profile/${userId}`, {
            withCredentials: true
        });
        return response.data;
    },
    editprofilePic: async (avatar:any) => {
        const response = await axios.put(`${API_URL}/profile-pic/edit`,avatar, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },
    editCoverImage: async (coverImage:any) => {
        const response = await axios.put(`${API_URL}/cover-pic/edit`,coverImage, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }
}
export default profileService