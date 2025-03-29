import dynamic from "next/dynamic";


const Profile = dynamic(() => import("./Profile"))

const ProfileHOC = () => {
    return <Profile />
}

export default ProfileHOC