import Stories from '@/components/screens/Home/components/Stories'
import React from 'react'

const Home = () => {
    return (
        <div className='bg-slate-900 h-screen p-4 text-white overflow-y-scroll scrollbar-hide'>
            <Stories />
        </div>
    )
}

export default Home
