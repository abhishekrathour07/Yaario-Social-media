import React from "react";


const Loader:React.FC =()=> {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-2 gap-1 animate-spin">
          <div className="w-2 h-2 border border-pink-600"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 animate-bounce"></div>
          <div className="w-2 h-2 border border-pink-600"></div>
        </div>
      </div>
    );
  }

  export default Loader