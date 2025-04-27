"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import { SignupValidationSchema } from './validation/SignupValidationSchema'
import { authService, SignupData } from '@/services/auth.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'



const Signup = () => {

      const [isLoading, setLoading] = useState(false)
    
    const form = useForm<SignupData>({
        resolver: zodResolver(SignupValidationSchema),
        defaultValues: {
            name: "",
            email: '',
            password: ''
        },
    })
    const router = useRouter();
    const onSubmit = async (data: SignupData) => {
        try {
            setLoading(true)
            const response = await authService.signup(data);
            toast.success(response?.message);
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }finally{
            setLoading(true)
        }
    };

    return (
        <div className='bg-gradient-to-r from-blue-500 to-teal-500 h-[100vh] flex justify-center items-center'>
            <div className='p-8 bg-slate-800 text-white rounded-lg shadow-lg w-96 space-y-6 border border-slate-700'>
                <Form {...form}>
                    <div className='space-y-6'>
                        <h1 className='text-2xl font-bold text-center mb-6'>Register Here</h1>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder='Enter your email'
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-400' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder='Enter your email'
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-400' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder='Enter your password'
                                            className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-400' />
                                </FormItem>
                            )}
                        />
                        <CustomButton text='Login' isLoading={isLoading} onClick={form.handleSubmit(onSubmit)} className='w-full'>
                        </CustomButton>
                        <div className='text-center text-sm'>
                            <span className='text-gray-400'>Already have an account? </span>
                            <Link href="/login" className='text-purple-400 hover:text-purple-300'>
                                Login here
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Signup
