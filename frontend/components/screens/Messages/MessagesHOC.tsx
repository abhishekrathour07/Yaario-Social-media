import dynamic from 'next/dynamic'
import React from 'react'
const Messages = dynamic(() => import('./Messages'))
const MessagesHOC = () => {
  return (
    <Messages />
  )
}

export default MessagesHOC
