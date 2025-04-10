"use client"
import Stories from '@/components/screens/Home/components/Stories'
import React, { useEffect, useState } from 'react'
import CreatePost from './components/CreatePost'
import ViewPost from './components/ViewPost'
import postServices from '@/services/post.services'
import { toast } from 'sonner'

const Home = () => {

    const [data, setData] = useState<string[] | null>(null);

    const handlePostData = async () => {
        try {
            const response = await postServices.getAllPostForFeed();
            setData(response?.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        handlePostData()
    }, [])
    return (
        <div className='bg-slate-900 h-screen py-4 sm:px-6 px-2 xl:px-16 text-white overflow-y-scroll no-scrollbar flex flex-col gap-4'>
            <CreatePost />
            <div>
                <Stories />
            </div>
            <div className='flex flex-col gap-4'>
                {data && data?.map((postData: any, index: number) => (
                    <div key={index}>
                        <ViewPost
                            postData={postData} />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Home
