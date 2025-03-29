"use client"
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile)
        }
    }
    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className={`border-2 border-dashed border-slate-600 rounded-lg p-6 transition-all
        ${preview ? 'bg-slate-700/50' : 'hover:bg-slate-700/20'}`}>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className='hidden'
                    id="file-upload"
                />
                <label htmlFor="file-upload" className='cursor-pointer'>
                    {preview ? (
                        <div className='flex flex-col items-center gap-4'>
                            <img src={preview} alt="Preview" className='max-h-48 rounded-lg object-contain' />
                            <p className='text-sm text-gray-400'>Click to change file</p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center gap-4'>
                            <Upload className='w-12 h-12 text-slate-500' />
                            <div className='text-center'>
                                <p className='text-sm font-medium'>Click to upload</p>
                                <p className='text-xs text-gray-400'>PNG, JPG, GIF or MP4 (max. 20MB)</p>
                            </div>
                        </div>
                    )}
                </label>
            </div>
            <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`w-full bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 text-white disabled:cursor-not-allowed cursour-pointer`}
            >
                {selectedFile ? 'Upload File' : 'Select a file'}
            </Button>
        </div>
    )
}

export default UploadFile
