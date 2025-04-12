import { API_URL } from "@/routesbackend"
import axios from "axios"

const notificationServices = {
    getNotifications: async() => {
        const response = await axios.get(`${API_URL}/notifications`,{
            withCredentials: true,
        })
        return response.data
    },

}
export default notificationServices 