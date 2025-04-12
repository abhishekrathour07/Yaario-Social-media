"use client"
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import Loader from '@/components/customs/Loader/Loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import bioServices, { aboutType } from '@/services/bio.service'
import { useUserStore } from '@/store/userStore'
import { Edit } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const About = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState<aboutType | null>(null)
  const { userId } = useUserStore();

  const params= useParams();
  const id = params?.id ;


  const form = useForm<aboutType>({
    defaultValues: {
      work: '',
      education: '',
      location: '',
      relationshipStatus: '',
    },
  })

  const fetchBioData = async () => {
    try {
      const response = await bioServices.getBioDetail(id as string)
      const bio = response?.data
      setData(bio)
      form.reset(bio)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch bio data")
    }
  }

  useEffect(() => {
    fetchBioData()
  }, [])

  const onSubmit = async (values: aboutType) => {
    try {
      const response = await bioServices.editBioData(values)
      toast.success(response?.message || "Bio updated successfully")
      setData(values)
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed")
    }
  }

  return (
    <div className='bg-slate-800 rounded-lg p-6 relative'>
      {!data ?
        <div className='flex items-center h-[40vh] justify-center'>
          <Loader />
        </div> :
        <div>
          {userId === id && (
            <Button
              variant="ghost"
              size="icon"
              className='absolute top-4 right-4'
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className='h-5 w-5' />
            </Button>
          )}

          {!isEditing ? (
            <div className='space-y-4'>
              <div>
                <h3 className='text-gray-400'>Work</h3>
                <p>{data?.work || 'Not provided'}</p>
              </div>
              <div>
                <h3 className='text-gray-400'>Education</h3>
                <p>{data?.education || 'Not provided'}</p>
              </div>
              <div>
                <h3 className='text-gray-400'>Location</h3>
                <p>{data?.location || 'Not provided'}</p>
              </div>
              <div>
                <h3 className='text-gray-400'>Relationship Status</h3>
                <p>{data?.relationshipStatus || 'Not provided'}</p>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

                {['work', 'education', 'location', 'relationshipStatus'].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof aboutType}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                        <FormControl>
                          <Input placeholder={`Your ${fieldName}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div className='w-full flex gap-4 justify-end'>
                  <CustomButton text='Save ' />
                  <Button className='border bg-transparent hover:bg-transparent' onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </form>
            </Form>
          )}
        </div>}
    </div>
  )
}

export default About
