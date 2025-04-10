import React from 'react'

type notFoundProps = {
    text:string
}
const NotFound:React.FC<notFoundProps> = ({text}) => {
    return (
        <div className='flex flex-col gap-4'>
            <img src="/no-result.png" className='h-60' alt="no-data" />
            <div className=' text-red-500 text-xl text-center'>{text}</div>
        </div>
    )
}

export default NotFound
