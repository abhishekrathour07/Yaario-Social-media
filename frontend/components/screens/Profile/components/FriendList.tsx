"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import requestService from '@/services/friendRequest.service'
import { Search, UserMinus, MessageCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type friendListTypes = {
  _id: string;
  name: string;
  avatar: string | null;
  email: string;
}

const FriendList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [friendList, setFriendList] = useState<friendListTypes[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFriends = async () => {
    try {
      setLoading(true)
      const response = await requestService.getFriendList();
      setFriendList(response?.data || [])
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch friends')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [])

  const filteredFriends = friendList.filter(friend =>
    friend?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className='bg-slate-800 p-4 rounded-lg flex items-center justify-center h-[200px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
      </div>
    )
  }

  return (
    <div className='bg-slate-800 p-4 rounded-lg'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>Friends</h2>
          <span className='bg-white text-black px-3 py-2 rounded-full text-sm'>
            {friendList?.length} friends
          </span>
        </div>

        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search friends...'
            className='pl-10 bg-slate-700 border-slate-600 text-white'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {filteredFriends.map(friend => (
            <div key={friend?._id} className='bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition-colors'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage
                    src={friend?.avatar || `https://ui-avatars.com/api/?name=${friend?.name}`}
                    alt={friend?.name}
                  />
                </Avatar>
                <div className='flex-1'>
                  <h3 className='text-white font-medium'>{friend?.name}</h3>
                  <p className='text-gray-400 text-sm'>20 mutual friends</p>
                  <p className='text-gray-400 text-xs'>InActive</p>
                </div>
              </div>

              <div className='flex justify-between mt-4'>
                <button className='flex items-center gap-2 bg-red-600 py-1 px-2 rounded-lg'>
                  <UserMinus className='h-4 w-4' />
                  Unfriend
                </button>
                <button className='flex gap-2 items-center py-1 px-2 rounded-lg border '>
                  <MessageCircle className='h-4 w-4' />
                  Message
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendList
