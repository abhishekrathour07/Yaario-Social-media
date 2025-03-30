import LeftSidebar from '@/components/customs/LeftSidebar/LeftSidebar'
import dynamic from 'next/dynamic'
import React from 'react'
const Messages = dynamic(() => import('./Messages'))
const MessagesHOC = () => {
  return (
    <div className="flex w-full">
    <div className="w-80 flex-shrink-0">
      <LeftSidebar />
    </div>
    <div className="flex-grow">
      <Messages />
    </div>
  </div>
  )
}

export default MessagesHOC
