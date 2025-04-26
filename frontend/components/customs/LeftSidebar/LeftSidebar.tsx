'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, UserPlus, Bell, Settings, User, Save, MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react' // Add this import at the top with other imports
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { useUserStore } from '@/store/userStore'

const LeftSidebar = () => {

  const pathname = usePathname()
  const isActive = (path: string) => {
    return pathname === path ? 'border-l-4 border-purple-500 bg-slate-800' : ''
  }
  const router = useRouter();
  const { name, profileUrl,email } = useUserStore()
  const handleLogout = async () => {
  try {
      const response = await authService.logout();
      toast.success(response?.message)
      router.push('/login')
       useUserStore.getState().clearUser();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }


  return (
    <div className="h-screen w-auto bg-slate-800 text-white p-4 relative">
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
          <Link href="/messages"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/messages')}`}>
            <MessageCircle size={20} />
            <span>Messages</span>
          </Link>
          <Link href="/saved"
            className={`flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg ${isActive('/saved')}`}>
            <Save size={20} />
            <span>Saved</span>
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
      <div className='absolute bottom-0 left-0 w-full p-4 border-t border-slate-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={profileUrl !== null ? profileUrl : `https://ui-avatars.com/api/?name=${name}`}
                alt="profile image"
              />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p className='text-sm font-medium'>{name}</p>
              <p className='text-xs text-gray-400'>{email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className='p-2 hover:bg-slate-700 rounded-full transition-colors'
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
