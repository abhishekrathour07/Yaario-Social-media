import { API_URL } from "@/routesbackend"
import axios from "axios"

const notificationServices = {
    getNotifications: async() => {
        const response = await axios.get(`${API_URL}/notifications`,{
            withCredentials: true,
        })
        return response.data
    },
    markAllAsRead: async() => {
        const response = await axios.put(`${API_URL}/notifications/markall-read`,{},{
            withCredentials: true,
        })
        return response.data
    },

}
export default notificationServices 