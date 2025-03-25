import React from "react";          
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./Home"), {
    ssr: true,
});

const HomeHOC = () => {
    return <Home />
}

export default HomeHOC