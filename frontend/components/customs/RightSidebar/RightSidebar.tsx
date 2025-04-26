import React from 'react'
import SearchBox from '../SearchBox/SearchBox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CustomButton from '../CustomButton/CustomButton';

const RightSidebar = () => {

    const suggestions = [
        { id: 1, name: 'Abhishek Singh', image: null },
        { id: 2, name: 'Rahul Kumar sah', image: null },
        { id: 3, name: 'Rohit Singh', image: null },
    ]

    const d = new Date();
    const year = d.getFullYear();

    return (
        <div className="h-screen w-auto bg-slate-800 text-white p-4 relative ">
            <div className="flex flex-col h-full">
                <SearchBox />
                {/* Who to Connect Section */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-4">Who to Connect</h2>
                    <div className="space-y-4">
                        {suggestions.map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={user.image !== null 
                                                ? user.image 
                                                : `https://ui-avatars.com/api/?name=${user?.name}`
                                            }
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>USER</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium truncate">{user.name}</span>
                                </div>
                                <CustomButton text='Add Friend' className='text-sm' />
                            </div>
                        ))}
                    </div>

                    <button className="text-blue-500 hover:text-blue-400 cursor-pointer mt-4 text-sm">
                        Show more
                    </button>
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-400 mt-4">
                    {year} Yaario, Inc. All rights reserved by member of Yaario.
                </div>
            </div>
        </div>
    )
}

export default RightSidebar