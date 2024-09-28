import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email('email-invalid'),
    password: z.string().min(6, 'password-invalid'),
    confirmPassword: z.string().min(6, 'confirm-password-invalid'),
    username: z.string().min(3, 'username-invalid'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'passwords-no-match',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z.string().email({
    message: 'email-invalid',
  }),
  password: z.string().min(6, {
    message: 'password-invalid',
  }),
})
