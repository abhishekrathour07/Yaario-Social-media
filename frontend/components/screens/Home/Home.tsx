import Stories from '@/components/screens/Home/components/Stories'
import React from 'react'
import CreatePost from './components/CreatePost'
import ViewPost from './components/ViewPost'

const Home = () => {
    const posts = [
        {
            name: "Sarah Johnson",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/5.jpg",
            likeCount: "256",
            timeStamp: "2 hours ago"
        },
        {
            name: "Alex Chen",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/5.jpg",
            likeCount: "432",
            timeStamp: "4 hours ago"
        },
        {
            name: "Maria Garcia",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/5.jpg",
            likeCount: "189",
            timeStamp: "6 hours ago"
        },
        {
            name: "James Wilson",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/5.jpg",
            likeCount: "567",
            timeStamp: "8 hours ago"
        },
        {
            name: "Emma Thompson",
            ProfileUrl: null,
            postUrl: "https://randomuser.me/api/portraits/women/5.jpg",
            likeCount: "321",
            timeStamp: "12 hours ago"
        }
    ];

    return (
        <div className='bg-slate-900 h-screen p-4 text-white overflow-y-scroll no-scrollbar flex flex-col gap-4'>
            <CreatePost />
            <div>
                <Stories />
            </div>
            <div>
                {posts.map((post, index) => (
                    <ViewPost key={index} {...post} />
                ))}
            </div>
        </div>
    )
}

export default Home
