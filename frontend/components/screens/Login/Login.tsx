"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import { LoginValidationSchema } from './validation/LoginValidationSchema'
import { authService, LoginData } from '@/services/auth.service'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'


const Login = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })
  const router = useRouter();
  const onSubmit = async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      toast.success(response?.message);
      await useUserStore.getState().fetchUserDetails();
      router.push('/home')

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className='bg-gradient-to-r from-blue-500 to-teal-500 h-[100vh] flex justify-center items-center'>
      <div className='p-8 bg-slate-800 text-white rounded-lg shadow-lg w-96 space-y-6 border border-slate-700'>
        <Form {...form}>
          <div className='space-y-6'>
            <h1 className='text-2xl font-bold text-center mb-6'>Welcome Back</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
            <CustomButton text='Login' onClick={form.handleSubmit(onSubmit)} className='w-full'>
            </CustomButton>
            <div className='text-center text-sm'>
              <span className='text-gray-400'>Don$&apos;t have an account? </span>
              <Link href="/register" className='text-purple-400 hover:text-purple-300'>
                Register here
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
