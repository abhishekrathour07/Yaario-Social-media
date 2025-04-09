import { API_URL } from "@/routesbackend"
import axios from "axios"

export type aboutType = {
    work: string,
    education: string,
    location: string,
    relationshipStatus: string,
    user:string
}

const bioServices = {
    getBioDetail: async () => {
        const response = await axios.get(`${API_URL}/bio-detail`, {
            withCredentials: true
        })
        return response.data
    },
    editBioData: async (data: aboutType) => {
        const response = await axios.put(`${API_URL}/update-bio`, data, {
            withCredentials: true
        })
        return response.data
    }
}

export default bioServices