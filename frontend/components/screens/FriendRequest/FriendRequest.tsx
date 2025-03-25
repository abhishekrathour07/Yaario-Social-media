import React from 'react'

const FriendRequest = () => {
  return (
    <div className='bg-slate-900 h-screen p-4'>
     <div className='flex  text-white gap-4 items-center'>
        <h1 className='text-2xl font-semibold'>Friend Requests</h1>
        <span className='rounded-full bg-red-500 text-sm flex items-center p-1 justify-center w-6 h-6'>5</span>
     </div>
    </div>
  )
}

export default FriendRequest
