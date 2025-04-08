"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Bookmark, Globe, MessageCircle, Share2, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image';

type ViewPostProps = {
    name: string,
    ProfileUrl: string | null,
    postUrl: string,
    likeCount: string,
    timeStamp: string
}

const ViewPost: React.FC<ViewPostProps> = ({
    name,
    ProfileUrl,
    postUrl,
    likeCount,
    timeStamp
}) => {
    const [like, setLike] = useState(false)
    const [save, setSave] = useState(false)
    return (
        <div className='bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700'>
            {/* Header */}
            <div className='p-4 flex items-center gap-3'>
                <Avatar className="h-10 w-10 ">
                    <AvatarImage
                        src={ProfileUrl || `https://ui-avatars.com/api/?name=${name}`}
                        className="object-cover"
                    />
                </Avatar>
                <div className='flex-1'>
                    <h2 className='font-semibold hover:underline cursor-pointer'>{name}</h2>
                    <div className='flex items-center gap-2 text-sm text-gray-400'>
                        <span>{timeStamp}</span>
                        <Globe className='h-3.5 w-3.5' />
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className='relative aspect-[3/2] bg-slate-900 w-full'>
                <Image
                    src={postUrl}
                    alt={`${name}'s post`}
                    fill
                    priority
                    className='object-contain'
                    quality={100}
                />
            </div>

            {/* Likes count */}
            <div className='px-4 py-4 text-sm text-gray-400 border-b border-slate-700'>
                {parseInt(likeCount) > 0 && `You and ${likeCount} others`}
            </div>

            {/* Action buttons */}
            <div className='grid grid-cols-4 divide-x divide-slate-700'>
                <button
                    onClick={() => setLike(!like)}
                    className='flex items-center cursor-pointer  justify-center gap-2 p-3 hover:bg-slate-700 transition-colors'
                >
                    <ThumbsUp className={`h-5 w-5 ${like ? 'fill-white' : ''}`} />
                    <span className='text-sm'>{like ? 'Unlike' : 'Like'}</span>
                </button>

                <button className='flex cursor-pointer  items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors'>
                    <MessageCircle className='h-5 w-5' />
                    <span className='text-sm'>Comment</span>
                </button>

                <button className='flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors'>
                    <Share2 className='h-5 w-5' />
                    <span className='text-sm'>Share</span>
                </button>
                <button
                    onClick={() => setSave(!save)}
                    className='flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors'
                >
                    <Bookmark className={`h-5 w-5 ${save ? 'fill-white' : ''}`} />
                    <span className='text-sm'>{save ? 'Unsave' : 'Save'}</span>
                </button>
            </div>
        </div>
    )
}

export default ViewPost
