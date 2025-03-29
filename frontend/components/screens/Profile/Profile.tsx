"use client"
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import React, { useState } from 'react'
import About from './components/About'
import Photos from './components/Photos'
import Mypost from './components/Mypost'

type contentTypes = {
    title: string,
    description: React.ReactNode
}[]
const Profile = () => {
    const posts = [
        {
            name: "Sarah Johnson",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/2.jpg",
            likeCount: "256",
            timeStamp: "2 hours ago"
        },
        {
            name: "Alex Chen",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/4.jpg",
            likeCount: "432",
            timeStamp: "4 hours ago"
        },
        {
            name: "Maria Garcia",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/7.jpg",
            likeCount: "189",
            timeStamp: "6 hours ago"
        },
        {
            name: "James Wilson",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            likeCount: "567",
            timeStamp: "8 hours ago"
        },
        {
            name: "Emma Thompson",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/9.jpg",
            likeCount: "321",
            timeStamp: "12 hours ago"
        }
    ];
    const content: contentTypes = [
        {
            title: "Posts",
            description: <div>
                {posts.map((post, index) => (
                    <Mypost key={index} {...post} />
                ))}
            </div>
        },
        {
            title: "About",
            description: <About />
        },
        {
            title: "Photos",
            description: <Photos />
        },
        {
            title: "Friends",
            description: <Photos />
        }
    ]
    const [show, setShow] = useState<string>("Posts")
    return (
        <div className='bg-slate-900 h-[100vh]  text-white overflow-y-scroll no-scrollbar'>
            <div className='relative mb-16'>
                <div className='relative h-60'>
                    <img
                        className='w-full h-full object-cover rounded-lg'
                        src='/Yaario.png'
                        alt='cover photo'
                    />
                    <div className='absolute inset-0 bg-black/20 rounded-b-lg'></div>
                    <Button
                        variant={"outline"}
                        className='absolute bottom-4 right-4 gap-2  text-black'
                    >
                        <Camera />
                        Edit cover photo
                    </Button>
                </div>

                <div className='absolute -bottom-16 left-8 flex items-end gap-4 '>
                    <div className='relative'>
                        <img
                            src="https://randomuser.me/api/portraits/men/3.jpg"
                            alt="profile-pic"
                            className='h-32 w-32 rounded-full border-4 border-slate-900 object-cover'
                        />
                        <Button
                            variant={"outline"}
                            className='absolute bottom-1 right-1 rounded-full h-8 w-8 text-black'
                        >
                            <Camera />
                        </Button>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Abhishek Singh</h1>
                        <p className='text-gray-500'>100 Friends</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 p-4 border-b border-slate-700 justify-start'>
                {content.map((data: any) => (
                    <div
                        key={data.title}
                        onClick={() => setShow(data.title)}
                        className={`px-4 py-2 cursor-pointer transition-colors
                            ${show === data.title
                                ? 'border-b-2 border-pink-500'
                                : ""
                            }`}
                    >
                        <h1>{data.title}</h1>
                    </div>
                ))}
            </div>

            <div className='p-4'>
                {content.map((data: any) => (
                    show === data.title && (
                        <div key={data.title} className='h-[70vh]'>
                            <h1>{data.description}</h1>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Profile
