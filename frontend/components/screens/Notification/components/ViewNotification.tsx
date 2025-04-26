"use client"
import Loader from '@/components/customs/Loader/Loader'
import notificationServices from '@/services/notification.services'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ViewNotification = () => {
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const notificationId = params.id
  const getNotifications = async () => {
    try {
      setLoading(true)
      const response = await notificationServices.getSingleNotification(notificationId as string)
      setNotification(response?.data);
      setLoading(false)
      if (!response.data.isRead) {
       // const res = await notificationServices.markSingleNotification(notificationId as string)
    }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    getNotifications()
  }, [])
  if (loading) {
    return <div className='flex justify-center items-center h-[100vh]'>
      <Loader />
    </div>
  }
  const postData = [notification]
  console.log(postData);
  return (
    <div className='h-[100vh] bg-slate-900 '>

    </div>
  )
}

export default ViewNotification
