'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import storyService from '@/services/story.service'
import { ArrowLeft, ArrowRight, PlusCircle, X } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'

const Stories = () => {
    const [data, setData] = useState<any[]>([])
    const [selectedStory, setSelectedStory] = useState<any | null>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState<number>(0)
    const intervalRef = useRef<any>(null)

    const handlegetStories = async () => {
        try {
            const response = await storyService.getStories()
            setData(response.data)
        } catch (error) {
            console.log(error)
            setData([])
        }
    }

    const handleStoryClick = (story: any) => {
        setSelectedStory(story)
        setCurrentIndex(0)
        setIsOpen(true)
    }

    const closeModal = () => {
        clearInterval(intervalRef.current)
        setIsOpen(false)
        setSelectedStory(null)
        setProgress(0)
    }

    const nextMedia = () => {
        if (selectedStory && currentIndex < selectedStory.media.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            closeModal()
        }
    }

    const prevMedia = () => {
        if (selectedStory && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    useEffect(() => {
        handlegetStories()
    }, [])

    useEffect(() => {
        if (isOpen) {
            setProgress(0)
            clearInterval(intervalRef.current)

            intervalRef.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(intervalRef.current)
                        nextMedia()
                        return 0
                    }
                    return prev + 1
                })
            }, 50) // 5 seconds total
        }

        return () => clearInterval(intervalRef.current)
    }, [currentIndex, isOpen])

    return (
        <>
            <div className="bg-slate-800 rounded-lg p-4 overflow-x-scroll no-scrollbar">
                <div className="flex gap-4 pb-2 pr-4">
                    <div className="cursor-pointer">
                        <div className="relative w-32 h-48 rounded-lg overflow-hidden group">
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                <PlusCircle className="w-10 h-10 text-blue-500" />
                            </div>
                            <p className="absolute bottom-2 left-2 text-white text-sm font-medium">
                                Create Story
                            </p>
                        </div>
                    </div>

                    {data.map((story: any) => {
                        const latestMedia = story.media?.[story.media.length - 1]
                        return (
                            <div key={story._id} className="cursor-pointer" onClick={() => handleStoryClick(story)}>
                                <div className="relative w-32 h-48 rounded-lg overflow-hidden group">
                                    <img
                                        src={latestMedia?.mediaUrl}
                                        alt="story media"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                                    <Avatar className="absolute top-2 left-2 ring-4 ring-blue-500">
                                        <AvatarImage
                                            src={
                                                story?.userId?.avatar ||
                                                `https://ui-avatars.com/api/?name=${story?.userId?.name}`
                                            }
                                            alt={story?.userId?.name}
                                        />
                                    </Avatar>
                                    <p className="absolute bottom-2 left-2 text-white text-sm font-medium">
                                        {story?.userId?.name}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Story Modal */}
            {isOpen && selectedStory && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="max-w-sm w-full h-[550px] bg-black rounded-lg overflow-hidden relative">
                        {/* Progress bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
                            <div
                                className="h-full bg-white transition-all duration-100 linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Close button */}
                        <div
                            className="absolute top-2 right-2 z-10 cursor-pointer text-white"
                            onClick={closeModal}
                        >
                            <X size={24} className="text-black p-1 bg-white rounded-full" />
                        </div>

                        {/* Prev button */}
                        {currentIndex > 0 && (
                            <button
                                onClick={prevMedia}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 rounded-full z-10"
                            >
                                <ArrowLeft />
                            </button>
                        )}

                        {/* Next button */}
                        {currentIndex < selectedStory.media.length - 1 && (
                            <button
                                onClick={nextMedia}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 rounded-full z-10"
                            >
                                <ArrowRight />
                            </button>
                        )}

                        {/* Story Content */}
                        {selectedStory?.media?.[currentIndex]?.mediaType === 'image' ? (
                            <img
                                src={selectedStory?.media?.[currentIndex]?.mediaUrl}
                                className="w-full h-full object-cover"
                                alt="story"
                            />
                        ) : selectedStory?.media?.[currentIndex]?.mediaType === 'video' ? (
                            <video
                                src={selectedStory?.media?.[currentIndex]?.mediaUrl}
                                className="w-full h-full object-cover"
                                autoPlay
                                controls
                            />
                        ) : null}


                        {/* Name */}
                        <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                            {selectedStory?.userId?.name}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Stories
