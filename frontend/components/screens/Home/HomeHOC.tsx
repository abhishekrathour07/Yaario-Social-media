import React from "react";
import dynamic from "next/dynamic";
import RightSidebar from "@/components/customs/RightSidebar/RightSidebar";
import LeftSidebar from "@/components/customs/LeftSidebar/LeftSidebar";

const Home = dynamic(() => import("./Home"), {
    ssr: true,
});

const HomeHOC = () => {
    return (
        <div className="flex w-full">
            <div className="w-80 flex-shrink-0">
                <LeftSidebar />
            </div>
            <div className="flex-grow">
                <Home />
            </div>
            <div className="w-80 flex-shrink-0 ">
                <RightSidebar />
            </div>
        </div>
    )
}

export default HomeHOC