'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, BellOff, Trash2, UserMinus } from 'lucide-react'

type UserInfoProps = {
  chatId: string | null
}

const UserInfo: React.FC<UserInfoProps> = ({ chatId }) => {
  // Mock user data
  const user = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: null,
    status: 'Active now',
    joinedDate: 'Joined January 2024',
    mutualFriends: 12
  }

  const [isMuted, setIsMuted] = React.useState(false)

  if (!chatId) return null

  return (
    <div className="h-full flex flex-col gap-6 pt-6 p-4">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-400">{user.username}</p>
        <p className="text-sm text-gray-400 mt-1">{user.status}</p>
      </div>

      <div className="space-y-6 px-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">About</h3>
          <p className="text-sm text-gray-400">{user.joinedDate}</p>
          <p className="text-sm text-gray-400">{user.mutualFriends} mutual friends</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Actions</h3>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-full flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isMuted ? (
              <>
                <BellOff size={20} />
                <span>Unmute notifications</span>
              </>
            ) : (
              <>
                <Bell size={20} />
                <span>Mute notifications</span>
              </>
            )}
          </button>

          <button className="w-full flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors text-yellow-500">
            <UserMinus size={20} />
            <span>Block user</span>
          </button>

          <button className="w-full flex items-center gap-3 p-2 hover:bg-slate-700 rounded-lg transition-colors text-red-500">
            <Trash2 size={20} />
            <span>Delete chat</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo