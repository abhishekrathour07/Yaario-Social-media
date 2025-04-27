import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export type aboutType = {
    work: string,
    education: string,
    location: string,
    relationshipStatus: string,
    user:string
}

const bioServices = {
    getBioDetail: async (userId:string) => {
        const response = await axios.get(`${API_URL}/bio-detail/${userId}`, {
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