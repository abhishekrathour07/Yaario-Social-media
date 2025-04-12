"use client"
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import About from './components/About'
import Photos from './components/Photos'
import ViewPost from '../Home/components/ViewPost'
import { toast } from 'sonner'
import postServices from '@/services/post.services'
import { useParams } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import FriendList from './components/FriendList'
import profileService, { profileTypes } from '@/services/profile.services'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import UploadFile from '@/components/customs/UploadFile/UploadFile'
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import Loader from '@/components/customs/Loader/Loader'
import NotFound from '@/components/customs/Noresult/NotFound'

type contentTypes = {
    title: string,
    description: React.ReactNode
}[]

const Profile = () => {

    const [show, setShow] = useState<string>("Posts")
    const [profileData, setProfileData] = useState([])
    const [data, setData] = useState<profileTypes>()
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState<boolean>(false);
    const [iscoverOpen, setiscoverOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    console.log(selectedFile)

    const params = useParams();
    const { userId } = useUserStore()
    const Id = params?.id || userId;

    const userProfileData = async () => {
        try {
            const response = await postServices.getpostById(Id as string)
            setProfileData(response?.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);

        }
    }
    const userDataById = async () => {
        try {
            const response = await profileService.getProfileDetailById(Id as string)
            setData(response?.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);

        }
    }
    const handleEditProfilePic = async () => {
        try {
            if (!selectedFile) {
                return toast.error('Please select an image');
            }
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            const response = await profileService.editprofilePic(formData);
            toast.success(response?.message)
            userDataById();
            setIsPhotoDialogOpen(false)
            setSelectedFile(null)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);

        }
    }
    const handleEditCoverImage = async () => {
        try {
            if (!selectedFile) {
                return toast.error('Please select an image');
            }
            const formData = new FormData();
            formData.append('coverImage', selectedFile);
            const response = await profileService.editCoverImage(formData);
            toast.success(response?.message)
            userDataById();
            setiscoverOpen(false)
            setSelectedFile(null)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);

        }
    }
    useEffect(() => {
        userProfileData();
        userDataById();
    }, [])
    const content: contentTypes = [
        {
            title: "Posts",
            description: <div>
                {profileData?.length === 0 ?
                    <NotFound text='No Post yet' />
                    :
                    <div className='flex flex-col gap-4'>
                        {profileData?.map((postData, index: number) => (
                            <ViewPost key={index} postData={postData} />
                        ))}
                    </div>
                }
            </div>
        },
        {
            title: "About",
            description: <About />
        },
        {
            title: "Photos",
            description:
                <div>
                    {profileData?.length === 0 ?
                        <NotFound text='No Post yet' />
                        :
                        <Photos postData={profileData} />
                    }
                </div>
        },
        {
            title: "Friends",
            description: <FriendList />
        }
    ]

    if (!data) {
        return (
            <div className='h-full bg-slate-900 flex items-center justify-center'>
                <Loader />
            </div>
        )
    }
    return (
        <div className='bg-slate-900 h-[100vh] text-white overflow-y-scroll no-scrollbar'>
            {/* Cover Image Section */}
            <div className='relative'>
                <div className='relative h-60'>
                    <img
                        className='w-full h-full object-cover rounded-b-lg'
                        src={data?.coverImage || "/Yaario.png"}
                        alt='cover photo'
                    />
                    <div className='absolute  rounded-b-lg'></div>

                    {userId === data?._id && (
                        <Dialog open={iscoverOpen} onOpenChange={setiscoverOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant='outline'
                                    className='absolute bottom-4 right-4 flex items-center gap-2 text-black bg-white hover:bg-gray-100'
                                >
                                    <Camera size={16} />
                                    Edit coverImage
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
                                <DialogHeader>
                                    <DialogTitle>Edit Cover picture</DialogTitle>
                                </DialogHeader>

                                <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                                <div className='flex w-full'>
                                    <CustomButton text='Upload' className='w-full' onClick={handleEditCoverImage}></CustomButton>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Avatar & Info */}
                <div className='absolute -bottom-20 left-6 flex items-end gap-6'>
                    <div className='relative'>
                        <Avatar className='h-32 w-32 border-4 border-slate-900 rounded-full shadow-md'>
                            <AvatarImage
                                src={data?.avatar || `https://ui-avatars.com/api/?name=${data?.name}`}
                                className='object-cover'
                            />
                        </Avatar>
                        {userId === data?._id && (
                            <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant='outline'
                                        className='absolute bottom-1 right-1 rounded-full h-8 w-8 p-0 text-black bg-white'
                                    >
                                        <Camera size={16} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-slate-800 text-white">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile picture</DialogTitle>
                                    </DialogHeader>

                                    <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                                    <div className='flex w-full'>
                                        <CustomButton text='Upload' className='w-full' onClick={handleEditProfilePic}></CustomButton>
                                    </div>
                                </DialogContent>
                            </Dialog>

                        )}

                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>{data?.name}</h1>
                        <div className='flex gap-4 mt-2 text-sm'>
                            <span className='px-3 py-1 bg-slate-800 rounded-full'>
                                {data?.followers?.length} Followers
                            </span>
                            <span className='px-3 py-1 bg-slate-800 rounded-full'>
                                {data?.followings?.length} Followings
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className='pt-28 px-6 border-b border-slate-700'>
                <div className='flex gap-6'>
                    {content.map((item: any) => (
                        <button
                            key={item.title}
                            onClick={() => setShow(item.title)}
                            className={`cursor-pointer pb-2 transition-all ${show === item.title
                                ? 'border-b-2 border-pink-500 text-pink-400'
                                : 'text-slate-300 hover:text-white'
                                }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Display */}
            <div className='p-6'>
                {content.map((item: any) => (
                    show === item.title && (

                        <div key={item.title} className='min-h-[60vh]'>
                            <h1 className='text-lg'>{item.description}</h1>
                        </div>
                    )
                ))}
            </div>
        </div>

    )
}

export default Profile
