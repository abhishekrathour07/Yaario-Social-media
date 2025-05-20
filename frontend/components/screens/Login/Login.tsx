"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import CustomButton from '@/components/customs/CustomButton/CustomButton'
import { LoginValidationSchema } from './validation/LoginValidationSchema'
import { authService, LoginData } from '@/services/auth.service'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'


const Login = () => {
  const [loading, isLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })
  const router = useRouter();
  const onSubmit = async (data: LoginData) => {
    isLoading(true)
    try {
      const response = await authService.login(data);
      toast.success(response?.message);
      await useUserStore.getState().fetchUserDetails();
      router.push('/home')

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      isLoading(false)
    }
  };
  return (
    <BackgroundBeamsWithCollision className='min-h-screen bg-gradient-to-br from-blue-800 to-pink-800'>
      <div className="bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Welcome back! Login here</h2>

        <Form {...form}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Password <span className="text-red-500">*</span></FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 pr-10"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot password */}
          <div className="text-right text-sm">
            <Link href="/forgot-password" className="text-indigo-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <CustomButton
            text="Login"
            isLoading={loading}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md"
          />

        </Form>

        <div className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">Signup</Link>
        </div>

        {/* Footer */}
        <div className="pt-4 text-center">
          <h3 className="text-xl font-semibold text-indigo-500">Yaario</h3>
          <p className="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} Yaario. All rights reserved.</p>
        </div>
      </div>
    </BackgroundBeamsWithCollision>


  )
}

export default Login
