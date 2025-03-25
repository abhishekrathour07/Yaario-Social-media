import dynamic from "next/dynamic";


const FriendRequest = dynamic(() => import('./FriendRequest'))

const FriendRequestHOC = () => {
    return <FriendRequest />
}

export default FriendRequestHOC