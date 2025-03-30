import LeftSidebar from "@/components/customs/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/customs/RightSidebar/RightSidebar";
import dynamic from "next/dynamic";


const FriendRequest = dynamic(() => import('./FriendRequest'))

const FriendRequestHOC = () => {
    return (
        <div className="flex w-full">
            <div className="w-80 flex-shrink-0">
                <LeftSidebar />
            </div>
            <div className="flex-grow">
                <FriendRequest />
            </div>
            <div className="w-80 flex-shrink-0 ">
                <RightSidebar />
            </div>
        </div>
    )
}

export default FriendRequestHOC