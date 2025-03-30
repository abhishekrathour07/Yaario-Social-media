
import * as z from 'zod'
export const SignupValidationSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })