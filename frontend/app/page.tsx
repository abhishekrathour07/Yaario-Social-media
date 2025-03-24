import CustomButton from '@/components/customs/CustomButton/CustomButton'
import Loader from '@/components/customs/Loader/Loader'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div>
      <Button>hello</Button>
      <CustomButton text='huiii'/>
      <Loader/>
    </div>
  )
}

export default page
