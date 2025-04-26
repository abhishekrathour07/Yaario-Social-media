"use client"
import React, { useState } from 'react'
import PasswordSettingsForm from './components/PasswordUpdateForm'
import DeleteAccount from './components/deleteAccount'

const Setting = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
 

  return (
    <div className='bg-slate-900 h-[100vh] no-scrollbar overflow-y-scroll  p-4 text-white'>
      <h1 className='text-2xl font-semibold mb-6'>Settings</h1>
      
      <div className='space-y-6'>
        <div className='flex items-center justify-between p-4 bg-slate-800 rounded-lg'>
          <span>Mute Notifications</span>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-6 rounded-full transition-colors ${isMuted ? 'bg-pink-600' : 'bg-gray-600'} relative`}
          >
            <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${isMuted ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className='flex items-center justify-between p-4 bg-slate-800 rounded-lg'>
          <span>Private Account</span>
          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-12 h-6 rounded-full transition-colors ${isPrivate ? 'bg-pink-600' : 'bg-gray-600'} relative`}
          >
            <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${isPrivate ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
        <PasswordSettingsForm/>
        <DeleteAccount/>
      </div>
    </div>
  )
}

export default Setting
