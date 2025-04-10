import React from 'react'

interface PhotosProps {
  postData: any[]
}

const Photos: React.FC<PhotosProps> = ({ postData }) => {
  return (
    <div className='bg-slate-800 p-4 rounded-lg'>
      <h2 className='text-xl'>Photos Of You</h2>
      <div className='grid mt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4'>
        {postData?.slice(0, 7).map((post: any, index: number) => (
          post?.postImageUrl !== null && (
            <div key={index} className='overflow-hidden border rounded-lg aspect-square'>
              <img
                src={post?.postImageUrl}
                alt="image"
                className='object-cover h-full w-full hover:scale-110 transition-all duration-300 cursor-pointer'
              />
            </div>
          )
        ))}
        {postData?.length > 7 && (
          <div className='aspect-square cursor-pointer bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg border border-slate-600 flex items-center justify-center text-base sm:text-lg md:text-2xl font-medium'>
            View All
          </div>
        )}
      </div>
    </div>
  )
}

export default Photos
