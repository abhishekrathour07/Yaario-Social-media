"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Bookmark, EllipsisVertical, Globe, MessageCircle, Share2, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import postServices from '@/services/post.services';
import { toast } from 'sonner';



type ViewPostProps = {
    postData: any
}

const ViewPost: React.FC<ViewPostProps> = ({
    postData
}) => {
    const [like, setLike] = useState(false)
    const [save, setSave] = useState(false)

    const handledeletePost = async () => {
        try {
            const response = await postServices.deletePost(postData._id)
            toast.success(response?.message)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700'>
            {/* Header */}
            <div className='px-6 py-4 flex items-center gap-3'>
                <Avatar className="h-10 w-10 ">
                    <AvatarImage
                        src={postData?.avatar || `https://ui-avatars.com/api/?name=${postData?.userId?.name}`}
                        className="object-cover"
                    />
                </Avatar>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold hover:underline cursor-pointer'>{postData?.userId?.name}</h2>
                        <div className='flex items-center gap-2 text-sm text-gray-400'>
                            <span>{postData?.createdAt}</span>
                            <Globe className='h-3.5 w-3.5' />
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className='relative hover:bg-slate-800 '>
                            <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-slate-700 absolute left-2 top-0" side="bottom" >
                            <DropdownMenuItem className='text-red-500 ' onClick={handledeletePost}>delete</DropdownMenuItem>
                            <DropdownMenuItem className='text-white' onClick={() => {}}>View profile</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            <div className=' p-4'>
                {postData?.caption}
            </div>

            {
                postData?.postImageUrl &&
                (
                    <div className='relative aspect-[3/2] bg-slate-900 w-full'>
                        <Image
                            src={postData?.postImageUrl}
                            alt={`${name}'s post`}
                            fill
                            priority
                            className='object-contain'
                            quality={100}
                        />
                    </div>
                )
            }
            {/* Likes count */}
            <div className='px-4 py-4 text-sm text-gray-400 border-b border-slate-700'>
                {parseInt(postData.likeCount) > 0 && `You and ${postData.likeCount - 1} others`}
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
        </div >
    )
}

export default ViewPost
