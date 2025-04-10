"use client"
import NotFound from '@/components/customs/Noresult/NotFound';
import savePostServices from '@/services/savepost.services';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import ViewPost from '../Home/components/ViewPost';
import Loader from '@/components/customs/Loader/Loader';

const Saved = () => {
    const [savePostData, setSavePostData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getSavePost = async () => {
        try {
            setIsLoading(true)
            const response = await savePostServices.getAllSavePost();
            setSavePostData(response?.data);
        } catch (error: any) {
            console.error('Save post error:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch saved posts');
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getSavePost()
    }, [])

    return (
        <div className="bg-slate-900 h-[100vh] p-4 text-white overflow-y-scroll  no-scrollbar ">
        <header className="flex items-center gap-6 mb-6">
            <h1 className="text-2xl font-bold">Saved Posts</h1>
            {savePostData.length > 0 && (
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-xs font-semibold">
                    {savePostData.length}
                </span>
            )}
        </header>
    
        <main className="w-full flex flex-col items-center">
            {isLoading ? (
                <Loader />
            ) : savePostData.length === 0 ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <NotFound text="No saved posts found" />
                </div>
            ) : (
                <div className="w-full max-w-3xl flex flex-col gap-6 ">
                    {savePostData.map((postData, index: number) => (
                        <ViewPost key={index} postData={postData} />
                    ))}
                </div>
            )}
        </main>
    </div>
    
    )
}

export default Saved
