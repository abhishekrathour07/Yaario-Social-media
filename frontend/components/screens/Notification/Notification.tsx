import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

interface NotificationItem {
    id: string
    type: 'like' | 'comment' | 'follow' | 'mention'
    user: {
        name: string
        imageUrl: string | null
    }
    content: string
    timestamp: string
    isRead: boolean
}

const Notification = () => {
    // Sample notifications data (in real app, this would come from an API)
    const notifications: NotificationItem[] = [
        {
            id: '1',
            type: 'like',
            user: {
                name: 'John Doe',
                imageUrl:null
            },
            content: 'liked your post',
            timestamp: '2 hours ago',
            isRead: false
        },
        {
            id: '2',
            type: 'comment',
            user: {
                name: 'Jane Smith',
                imageUrl: null
            },
            content: 'commented on your post: "Great photo!"',
            timestamp: '5 hours ago',
            isRead: true
        }
    ]

    return (
        <div className='bg-slate-900 text-white p-4 h-screen'>
            <h1 className='text-2xl font-bold mb-6'>Notifications</h1>

            <div className='space-y-4'>
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-lg ${notification.isRead ? 'bg-slate-800' : 'bg-slate-700'
                            }`}
                    >
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={notification.user.imageUrl !== null
                                    ? notification.user.imageUrl
                                    : `https://ui-avatars.com/api/?name=${notification.user.name}`
                                }
                            />
                        </Avatar>

                        <div className='flex-1'>
                            <p className='font-medium'>
                                <span className='hover:underline cursor-pointer'>
                                    {notification.user.name}
                                </span>{' '}
                                {notification.content}
                            </p>
                            <p className='text-sm text-gray-400 mt-1'>
                                {notification.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification
