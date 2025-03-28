"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Bookmark, Globe, Heart, MessageCircle, Share2, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'

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
        <div className='bg-slate-800 rounded-lg p-4 mb-4'>
            <div className='flex gap-4 items-center mb-4'>
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={ProfileUrl !== null
                            ? ProfileUrl
                            : `https://ui-avatars.com/api/?name=${name}`
                        }
                    />
                </Avatar>
                <div>
                    <h2 className='hover:text-underline cursor-pointer font-semibold'>{name}</h2>
                    <p className='text-gray-400 flex gap-2 text-sm items-center justify-center'> {timeStamp} <Globe className='h-4 w-4 mt-1' /></p>
                </div>
            </div>

            <div className='mb-4'>
                <img
                    src={postUrl}
                    alt="Post content"
                    className='w-full h-96'
                />
            </div>
            <p className='text-gray-400 px-4'>You and {likeCount} Other</p>
            <div className='flex items-center justify-between px-4 py-2'>
                <button className='cursor-pointer' onClick={() => setLike(!like)}>
                    {like ?
                        <div className='flex items-center gap-2 '>
                            <ThumbsUp className='h-5 w-5' fill='#fff' />
                            <span>Unlike</span>
                        </div>
                        :
                        <div className='flex items-center gap-2 '>
                            <ThumbsUp className='h-5 w-5' />
                            <span>Like</span>
                        </div>

                    }

                </button>
                <button className='flex items-center gap-2 '>
                    <MessageCircle className='h-5 w-5' />
                    <span>Comment</span>
                </button>
                <button className='flex items-center gap-2 '>
                    <Share2 className='h-5 w-5' />
                    <span>Share</span>
                </button>
                <button className='cursor-pointer'   onClick={() => setLike(!like)}>
                {like ?
                        <div className='flex gap-2 items-center'>
                            <Bookmark className='h-5 w-5' fill='#fff' />
                            <span>Unsave</span>
                        </div>
                        :
                        <div className='flex gap-2 items-center'>
                            <Bookmark className='h-5 w-5' />
                            <span>Save</span>
                        </div>

                    }
                </button>
            </div>
        </div>
    )
}

export default ViewPost
