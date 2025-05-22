"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomButton from "@/components/customs/CustomButton/CustomButton"
import { SignupValidationSchema } from "./validation/SignupValidationSchema"
import { authService, SignupData } from "@/services/auth.service"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import { Button } from "@/components/ui/button"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const form = useForm<SignupData>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const router = useRouter()

  const onSubmit = async (data: SignupData) => {
    try {
      setLoading(true)
      const response = await authService.signup(data)
      toast.success(response?.message)
      router.push("/login")
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <BackgroundBeamsWithCollision className="min-h-screen bg-gradient-to-br from-blue-800 to-pink-800">
      <div className="bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-8 space-y-4 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Register an account</h2>

        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <CustomButton
            text="Signup"
            isLoading={isLoading}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 h-10 text-white font-semibold rounded-md"
          />

          <Button className="w-full h-10 hover:bg-slate-400 bg-slate-300 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
              <path fill="#FFC107" d="M43.6,20.5h-1.8V20H24v8h11.3C34,32.4,29.6,36,24,36c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,5.9,1.2,8,3.1l6-6C34.5,6.5,29.5,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20c11,0,20-8,20-20C44,22.7,43.8,21.6,43.6,20.5z" />
              <path fill="#FF3D00" d="M6.3,14.7l6.6,4.8C14.1,16,18.7,13,24,13c3.1,0,5.9,1.2,8,3.1l6-6C34.5,6.5,29.5,4,24,4C16,4,9,8.7,6.3,14.7z" />
              <path fill="#4CAF50" d="M24,44c5.3,0,10.3-1.8,14.1-4.9l-6.5-5.3c-2,1.4-4.5,2.2-7.6,2.2c-5.6,0-10.3-3.6-12-8.5l-6.6,5.1C9,38.7,16,44,24,44z" />
              <path fill="#1976D2" d="M43.6,20.5h-1.8V20H24v8h11.3c-1.4,3.7-4.6,6.6-8.3,8.2l6.5,5.3c3.8-3.5,6-8.7,6-14.5C44,22.7,43.8,21.6,43.6,20.5z" />
            </svg>
            Login with Google</Button>
        </Form>

        {/* Already have account */}
        <div className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">Login</Link>
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

export default Signup
