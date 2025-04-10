import CustomButton from '@/components/customs/CustomButton/CustomButton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import moment from 'moment'
interface requestProps {
  name: string;
  imageurl: string;
  mutualFriends: number;
  timeStamp: string;
  onAccept: () => void;
  onDelete: () => void;  // Add this line
}

const FriendRequestCards: React.FC<requestProps> = ({ name, imageurl, mutualFriends, timeStamp, onDelete, onAccept }) => {
  return (
    <div className='bg-slate-800 p-4 rounded-lg flex gap-4 space-y-4'>
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={imageurl !== null
            ? imageurl
            : `https://ui-avatars.com/api/?name=${name}`
          }
        />
      </Avatar>
      <div className='flex flex-col gap-2 text-white w-full'>
        <div className="flex justify-between items-center ">
          <h2>{name}</h2>
          <p className='text-xs'>{moment(timeStamp).fromNow()}</p>
        </div>
        <p className='text-gray-500'>{mutualFriends}</p>
        <div className='flex gap-4'>
          <CustomButton onClick={onAccept} text='Confirm' className='w-full' />
          <button onClick={onDelete} className='bg-transparent border rounded-md w-full text-white'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default FriendRequestCards
