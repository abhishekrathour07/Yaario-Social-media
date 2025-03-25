'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UserPlus, Bell, Settings, Users, User } from 'lucide-react'

const LeftSidebar = () => {
  
  
  const pathname = usePathname()
  const isActive = (path: string) => {
    return pathname === path ? 'border-l-4 border-purple-500 bg-slate-800' : ''
  }

  return (
    <div className="h-screen w-80 bg-slate-800 text-white p-4 ">
      <div className="flex flex-col space-y-4">
        <div className="text-2xl font-bold mb-8">
          Yaario
        </div>

        <nav className="flex flex-col space-y-4">
          <Link href="/home"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/home')}`}>
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link href="/friend-requests"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/friend-requests')}`}>
            <UserPlus size={20} />
            <span>Friend Requests</span>
          </Link>

          <Link href="/notifications"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/notifications')}`}>
            <Bell size={20} />
            <span>Notifications</span>
          </Link>

          <Link href="/friend-suggestions"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/friend-suggestions')}`}>
            <Users size={20} />
            <span>Friend Suggestions</span>
          </Link>
          <Link href="/profile"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/profile')}`}>
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link href="/settings"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/settings')}`}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default LeftSidebar
