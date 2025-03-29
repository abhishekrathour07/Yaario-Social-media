import React from 'react'

const Photos = () => {
    const images =[
        "https://randomuser.me/api/portraits/men/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/men/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/men/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
        "https://randomuser.me/api/portraits/men/10.jpg",
        "https://randomuser.me/api/portraits/men/1.jpg",
      ]
      
  return (
    <div className=' bg-slate-800 p-4 rounded-lg'>
        <h2 className='text-xl'>Photos Of You</h2>
    <div className='grid mt-4 grid-cols-4 gap-4'>
    {images.slice(0,7).map((image:string,index:number)=>(
       <div key={index} className='overflow-hidden border rounded-lg'>
           <img src={image} alt="image" className='object-contain h-full w-full  hover:scale-110 transition-all duration-300 cursor-pointer'/>
       </div>
     ))}
     <div className='h-full cursor-pointer bg-slate-400 rounded-lg border flex items-center justify-center text-2xl'>View All</div>
    </div>
   </div>
  ) 
}

export default Photos
