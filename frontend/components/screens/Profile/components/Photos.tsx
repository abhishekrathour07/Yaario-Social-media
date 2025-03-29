import React from 'react'

const Photos = () => {
    const images =[
        "https://source.unsplash.com/random/300x300/?nature",
        "https://source.unsplash.com/random/300x300/?technology",
        "https://source.unsplash.com/random/300x300/?city",
        "https://source.unsplash.com/random/300x300/?space",
        "https://source.unsplash.com/random/300x300/?abstract",
        "https://source.unsplash.com/random/300x300/?animals",
        "https://source.unsplash.com/random/300x300/?cars",
        "https://source.unsplash.com/random/300x300/?sports",
        "https://source.unsplash.com/random/300x300/?food",
        "https://source.unsplash.com/random/300x300/?travel"
      ]
      
  return (
    <div className=' bg-slate-800 p-4 rounded-lg'>
        <h2 className='text-xl'>Photos Of You</h2>
    <div className='grid mt-4 grid-cols-4 gap-4'>
    {images.slice(0,7).map((image:string,index:number)=>(
       <div key={index} className='h-40 border  rounded-lg'>
           <img src={image} alt="image" />
       </div>
     ))}
    </div>
   </div>
  )
}

export default Photos
