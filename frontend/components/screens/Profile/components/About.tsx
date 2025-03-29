"use client"
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const About = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [aboutData, setAboutData] = useState({
    work: "Software Engineer at Tech Corp",
    education: "Computer Science Graduate",
    location: "New York, USA",
    relationship: "Single"
  })

  const form = useForm<any>({
    defaultValues: aboutData
  })

  function onSubmit(values: any) {
    setAboutData(values)
    setIsEditing(false)
  }

  return (
    <div className='bg-slate-800 rounded-lg p-6 relative'>
      <Button 
        variant="ghost" 
        size="icon" 
        className='absolute top-4 right-4'
        onClick={() => setIsEditing(!isEditing)}
      >
        <Edit className='h-5 w-5' />
      </Button>

      {!isEditing ? (
        <div className='space-y-4'>
          <div>
            <h3 className='text-gray-400'>Work</h3>
            <p>{aboutData.work}</p>
          </div>
          <div>
            <h3 className='text-gray-400'>Education</h3>
            <p>{aboutData.education}</p>
          </div>
          <div>
            <h3 className='text-gray-400'>Location</h3>
            <p>{aboutData.location}</p>
          </div>
          <div>
            <h3 className='text-gray-400'>Relationship Status</h3>
            <p>{aboutData.relationship}</p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="work"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work</FormLabel>
                  <FormControl>
                    <Input placeholder="Your work" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="Your education" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Your location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Your relationship status" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomButton text='Save Changes' onClick={form.handleSubmit(onSubmit)}></CustomButton>
          </div>
        </Form>
      )}
    </div>
  )
}

export default About
