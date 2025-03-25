'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PlusCircle } from 'lucide-react'
import React from 'react'

const Stories = () => {
    const stories = [
        { id: 1, name: 'Create story', image: null, isCreate: true },
        { id: 2, name: 'Abhishek singh', image: null },
        { id: 3, name: 'rahul Gupta', image: null },
        { id: 4, name: 'rohit Singh', image: null },
        { id: 5, name: 'Rishu', image: null },
        { id: 7, name: 'Rishu', image: null },
        { id: 8, name: 'Rishu', image: null },
       
    ]

    return (
        <div className=" bg-slate-800  rounded-lg p-4 overflow-x-scroll">
            <div className="flex gap-4  pb-2">
                {stories.map((story) => (
                    <div key={story.id} className="flex-shrink-0 cursor-pointer">
                        <div className="relative w-32 h-48 rounded-lg overflow-hidden group">
                            {story.isCreate ? (
                                <>
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                        <PlusCircle className="w-10 h-10 text-blue-500" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                                    <Avatar className="absolute top-2 left-2 ring-4 ring-blue-500">
                                        <AvatarImage
                                            src={story.image !== null
                                                ? story.image
                                                : `https://ui-avatars.com/api/?name=${story?.name}`
                                            }
                                            alt={story.name}
                                        />
                                        <AvatarFallback>
                                            {story.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                </>
                            )}
                            <p className="absolute bottom-2 left-2 text-white text-sm font-medium">
                                {story.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stories