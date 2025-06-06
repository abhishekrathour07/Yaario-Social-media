
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const notificationServices = {
    getNotifications: async () => {
        const response = await axios.get(`${API_URL}/notifications`, {
            withCredentials: true,
        })
        return response.data
    },
    markAllAsRead: async () => {
        const response = await axios.put(`${API_URL}/notifications/markall-read`, {}, {
            withCredentials: true,
        })
        return response.data
    },
    markSingleNotification: async (notificationId: string) => {
        const response = await axios.put(`${API_URL}/notifications/${notificationId}`, {
            withCredentials: true,
        })
        return response.data
    },
    getSingleNotification: async (notificationId: string) => {
        const response = await axios.get(`${API_URL}/single-notification/${notificationId}`, {
            withCredentials: true,
        })
        return response.data
    },

}
export default notificationServices 