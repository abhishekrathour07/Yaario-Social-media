import LeftSidebar from "@/components/customs/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/customs/RightSidebar/RightSidebar";
import dynamic from "next/dynamic";


const FriendRequest = dynamic(() => import('./FriendRequest'))

const FriendRequestHOC = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-[#1a1d21]">
            {/* Left Sidebar */}
            <div className="hidden md:block md:w-[240px] lg:w-80 flex-shrink-0 overflow-y-auto border-r border-gray-700">
                <div className="sticky top-0">
                    <LeftSidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow w-full md:w-auto  overflow-y-auto">
                <FriendRequest />
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0 overflow-y-auto border-l border-gray-700">
                <div className="sticky top-0">
                    <RightSidebar />
                </div>
            </div>
        </div>
    )
}

export default FriendRequestHOC