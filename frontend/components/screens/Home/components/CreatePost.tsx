"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Images, Laugh, Video} from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import UploadFile from '@/components/customs/UploadFile/UploadFile'
import EmojiPicker from '@/components/customs/EmojiPicker/EmojiPicker'

type CreatePostProps = {
    imageUrl?: string | null,
    name?: string,
}

const CreatePost: React.FC<CreatePostProps> = ({
    imageUrl = null,
    name = "Abhishek Singh"
}) => {
   
    const [caption, setCaption] = useState("");
    const handleEmojiSelect = (emoji: any) => {
        setCaption(prev => prev + emoji.native);
    };

    return (
        <div className='text-white bg-slate-800 rounded-lg flex flex-col gap-4 p-4'>
            <div className='flex gap-4 items-center'>
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={imageUrl !== null
                            ? imageUrl
                            : `https://ui-avatars.com/api/?name=${name}`
                        }
                    />
                </Avatar>
                <Input placeholder='Search anything on yaario' className='rounded-full bg-slate-700 text-white' />
            </div>
            <div className='border'></div>
            <div className='flex items-center justify-between  px-4'>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex gap-2 cursor-pointer'>
                            <Video className='text-red-500 ' />
                            Live Video
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Go Live</DialogTitle>
                        </DialogHeader>
                        <div className=' border border-dashed h-28 rounded-lg flex items-center justify-center text-xl text-red-500'>
                            <p>Coming Soon</p>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex gap-2 cursor-pointer'>
                            <Images className='text-green-500' />
                            photo/Video
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Upload Photo/Video</DialogTitle>
                        </DialogHeader>
                        <div className='flex justify-between'>
                            <Input 
                                placeholder='Write a Caption' 
                                className='border-none'
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                        </div>
                        <UploadFile />
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex gap-2 cursor-pointer'>
                            <Laugh className='text-orange-400' />
                            Feeling/Activity
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Write Something on timeLine</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col gap-4'>
                            <div>
                            <textarea className='w-full h-20 outline-0 ring-0 text-xl' placeholder='Write Something' value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                            </div>
                           <div className='flex justify-end'>
                           <CustomButton text='Upload'></CustomButton>
                           </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default CreatePost
