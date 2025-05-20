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
      <div className="bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-8 space-y-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Register an account</h2>

        <Form {...form}>
          {/* Name Field */}
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

          {/* Submit Button */}
          <CustomButton
            text="Signup"
            isLoading={isLoading}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md"
          />
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
