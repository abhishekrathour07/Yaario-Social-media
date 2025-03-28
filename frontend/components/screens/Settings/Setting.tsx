"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import CustomButton from '@/components/customs/CustomButton/CustomButton'

const Setting = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='bg-slate-900 min-h-screen p-4 text-white'>
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

        <div className='p-4 bg-slate-800 rounded-lg space-y-4'>
          <h2 className='text-xl font-semibold mb-4'>Reset Password</h2>
          <Input
            type='password'
            placeholder='Current Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-slate-700 text-white'
          />
          <Input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='bg-slate-700 text-white'
          />
          <Input
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='bg-slate-700 text-white'
          />
          <CustomButton
            text='Reset Password'
            className='mt-4'
          />
        </div>
      </div>
    </div>
  )
}

export default Setting
