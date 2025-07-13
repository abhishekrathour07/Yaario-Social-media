"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import notificationServices from '@/services/notification.services'
import { toast } from 'sonner'
import moment from 'moment'
import { Bell, CheckCheck, Heart, MessageCircle, UserCheck, UserPlus } from 'lucide-react'
import Loader from '@/components/customs/Loader/Loader'
import { useRouter } from 'next/navigation'

interface NotificationItem {
    _id: string
    type: 'like' | 'comment' | 'send request' | 'save' | 'accept request'
    sender: {
        name: string
        avatar: string | null
    }
    message: string
    createdAt: string
    isRead: boolean
}

const Notification = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const getNotifications = async () => {
        try {
            setLoading(true)
            const response = await notificationServices.getNotifications()
            setNotifications(response.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to fetch notifications')
        } finally {
            setLoading(false)
        }
    }

    const handleMarkAllAsRead = async () => {
        try {
            const response = await notificationServices.markAllAsRead()
            toast.success(response?.message)
            getNotifications()
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to mark all as read')
        }
    }

    useEffect(() => {
        getNotifications()
    }, [])

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'like':
                return <Heart className="h-5 w-5 text-red-500" />
            case 'comment':
                return <MessageCircle className="h-5 w-5 text-blue-500" />
            case 'send request':
                return <UserPlus className="h-5 w-5 text-green-500" />
            case 'accept request':
                return <UserCheck className="h-5 w-5 text-pink-500" />
            default:
                return <Bell className="h-5 w-5 text-yellow-500" />
        }
    }

    if (loading) {
        return (
            <div className='bg-slate-900 h-screen flex items-center justify-center'>
                <Loader />
            </div>
        )
    }

    return (
        <div className='bg-slate-900 text-white p-4 h-[100vh] overflow-y-scroll no-scrollbar'>
            <div className='mt-4'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-2xl font-bold'>Notifications</h1>
                        {notifications.length > 0 && (
                            <span className='bg-red-500 px-3 py-1 rounded-full text-sm'>
                                {notifications.filter(n => !n.isRead).length} new
                            </span>
                        )}
                    </div>
                    <button disabled={notifications?.length === 0} className={` disabled:cursor-not-allowed text-sm cursor-pointer flex gap-2  hover:underline text-white`} onClick={handleMarkAllAsRead}>
                        <CheckCheck /> Mark all as read
                    </button>
                </div>

                {notifications.length === 0 ? (
                    <div className=' text-gray-400 h-[80vh] flex flex-col items-center justify-center'>
                        <Bell className='h-12 w-12 mx-auto mb-4 opacity-50' />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className='space-y-4' >
                        {notifications.map((notification) => (
                            <div
                            onClick={()=>{router.push(`/notifications/${notification?._id}`)}}
                                key={notification?._id}
                                className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors
                                    ${notification?.isRead ? 'bg-slate-800' : 'bg-slate-700 hover:bg-slate-600'}`}
                            >
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={notification?.sender?.avatar ||
                                            `https://ui-avatars.com/api/?name=${notification?.sender?.name}`}
                                    />
                                </Avatar>

                                <div className='flex-1'>
                                    <div className='flex items-center gap-2'>
                                        {getNotificationIcon(notification.type)}
                                        <p className='font-medium'>
                                            <span className='hover:underline text-green-500 cursor-pointer'>
                                                {notification?.sender?.name}
                                            </span>{' '}
                                            <span>{notification.message}</span>
                                        </p>
                                    </div>
                                    <p className='text-sm text-gray-400 mt-1'>
                                        {moment(notification?.createdAt).fromNow()}
                                    </p>
                                </div>

                                {!notification?.isRead && (
                                    <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification
