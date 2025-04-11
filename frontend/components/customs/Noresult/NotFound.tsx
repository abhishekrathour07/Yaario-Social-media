import React from 'react'

type notFoundProps = {
    text: string,
    className?: string
}
const NotFound: React.FC<notFoundProps> = ({ text , className }) => {
    return (
        <div className='flex flex-col gap-4 items-center justify-center'>
            <img src="/no-result.png" className={`${className}`} alt="no-data" />
            <div className=' text-red-500 text-xl text-center'>{text}</div>
        </div>
    )
}

export default NotFound
