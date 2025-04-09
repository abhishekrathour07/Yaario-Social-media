"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Images, Laugh, Video } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import UploadFile from '@/components/customs/UploadFile/UploadFile'
import EmojiPicker from '@/components/customs/EmojiPicker/EmojiPicker'
import { toast } from 'sonner';
import postServices from '@/services/post.services'

type CreatePostProps = {
    imageUrl?: string | null,
    name?: string,
}

const CreatePost: React.FC<CreatePostProps> = ({
    imageUrl = null,
    name = "Abhishek Singh"
}) => {
    const [caption, setCaption] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState<boolean>(false);
    const [timelineopen, setTimelineopen] = useState<boolean>(false);


    const handleEmojiSelect = (emoji: any) => {
        setCaption(prev => prev + emoji.native);
    };

    const handlecreatePost = async () => {
        try {
            console.log(caption)
            if (!selectedFile) {
                return toast.error('Please select an image');
            }
            const formData = new FormData();
            formData.append('caption', caption);
            formData.append('postImageUrl', selectedFile);
            const response = await postServices.createPost(formData);
            toast.success(response?.message);
            setCaption("")
            setSelectedFile(null);
            setIsPhotoDialogOpen(false)

        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to create post');
        }
    };

    const handleTimeline = async () => {
        try {
            console.log(caption)
            const payload = {
                caption: caption,
                postImageUrl: null
            }
            const response = await postServices.createPost(payload as any);
            toast.success(response?.message);
            setCaption("")
            setSelectedFile(null);
            setTimelineopen(false)

        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to create post');
        }
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
                        <div className='flex cursor-pointer gap-2'>
                            <Video className='text-red-500' />
                            <span className='hidden sm:block'>Live Video</span>
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
                <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                    <DialogTrigger asChild>
                        <div className='flex gap-2 cursor-pointer'>
                            <Images className='text-green-500' />
                            <span className='hidden sm:block'>photo/Video</span>
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
                        <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                        <div className='flex w-full'>
                            <CustomButton text='Upload' className='w-full' onClick={handlecreatePost}></CustomButton>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog open={timelineopen} onOpenChange={setTimelineopen}>
                    <DialogTrigger asChild>
                        <div className='flex gap-2 cursor-pointer'>
                            <Laugh className='text-orange-400' />
                            <span className='sm:block hidden'>Feeling/Activity</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Write Something on timeLine</DialogTitle>
                        </DialogHeader>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <textarea className='w-full h-20 outline-0 ring-0 text-xl' placeholder='Write Something' value={caption} onChange={(e) => setCaption(e.target.value)} />
                                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                            </div>
                            <div className='flex w-full'>
                                <CustomButton text='Upload' className='w-full' onClick={handleTimeline}></CustomButton>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default CreatePost
