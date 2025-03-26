import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Images, Laugh, Video } from 'lucide-react'
import React from 'react'

type CreatePostProps = {
    imageUrl?: string | null,
    name?: string,
}
const CreatePost: React.FC<CreatePostProps> = ({
    imageUrl = null,
    name = "Abhishek Singh"
}) => {
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
                <Input placeholder='What&pos;s on Your Mind Abhishek?' className='rounded-full bg-slate-700 text-white' />
            </div>
            <div className='border'></div>
            <div className='flex items-center justify-between  px-4'>
                <div className='flex gap-2 cursor-pointer'>
                    <Video className='text-red-500 '/>
                    Live Video
                </div>
                <div className='flex gap-2 cursor-pointer'>
                    <Images className='text-green-500'/>
                    photo/Video
                </div>
                <div className='flex gap-2 cursor-pointer'>
                    <Laugh className='text-orange-400'/>
                   Feeling/Activity
                </div>
            </div>
        </div>
    )
}

export default CreatePost
