import React from 'react'

type CustomButtonProps ={
    text:string,
    className?:string,
}
const CustomButton:React.FC<CustomButtonProps> = ({text,className}) => {
  return (
    <div className={`${className} bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 w-fit rounded-md text-white px-4 py-1`}>
      {text}
    </div>
  )
}

export default CustomButton
