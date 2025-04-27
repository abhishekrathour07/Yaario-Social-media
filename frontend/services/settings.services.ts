
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;



const settingServices = {
    updatePassword: async (data: any) => {
        const response = await axios.put(`${API_URL}/change-password`, data, {
            withCredentials: true
        })
        return response.data;
    },
    deleteAccount: async () => {
        const response =await axios.delete(`${API_URL}/delete-account`,{
            withCredentials:true,
        })
        return response.data
    }
}

export default settingServices