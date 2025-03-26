import React from 'react'
import friendRequestData from './components/friendData'
import FriendRequestCards from './components/FriendRequestCards'
import FriendSuggestionCards from './components/FriendSuggestionCards'

const FriendRequest = () => {
  return (
    <div className='bg-slate-900 h-screen p-4 overflow-y-scroll no-scrollbar '>
      <div className='flex justify-between  text-white items-center px-2'>
        <div className='flex gap-4 items-center'>
          <h1 className='text-2xl font-semibold'>Friend Requests</h1>
          <span className='rounded-full bg-red-500 text-sm flex items-center p-1 justify-center w-6 h-6'>{friendRequestData.length}</span>
        </div>
        <button className="text-blue-500 hover:text-blue-400 cursor-pointer mt-4 text-lg">
          See All
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-4 mb-4'>
        {
          friendRequestData.slice(0,10).map((list, index: number) => (
            <div key={index}>
              <FriendRequestCards
                name={list.name}
                imageurl={list.imageurl}
                mutualFriends={list.mutualFriends}
                sendTime={list.sendTime}
              />
            </div>
          ))
        }
      </div>
      <div className='mt-4 border-t border-gray-400'>
       <div className='flex justify-between items-center px-2'>
       <h1 className='text-2xl text-white font-semibold'>People You May Know</h1>
       <button className="text-blue-500 hover:text-blue-400 cursor-pointer mt-4 text-lg">
          See All
        </button>
       </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
        { friendRequestData.slice(0,10).map((list, index: number) => (
            <div key={index}>
              <FriendSuggestionCards
                name={list.name}
                imageurl={list.imageurl}
                mutualFriends={list.mutualFriends}
              />
            </div>
          ))}
      </div>
      </div>
    </div>
  )
}

export default FriendRequest
