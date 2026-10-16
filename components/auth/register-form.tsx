'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15).optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  })

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            phone: values.phone || null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('An account with this email already exists. Please sign in.')
        } else {
          toast.error(error.message || 'Registration failed. Please try again.')
        }
        return
      }

      toast.success('Account created! Please check your email to verify your account.')
      router.push('/auth/verify-email')
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
          Full name <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          {...register('fullName')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Your full name"
          aria-required="true"
          aria-describedby={errors.fullName ? 'fullname-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullname-error" className="mt-1.5 text-sm text-destructive" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-foreground mb-1.5">
          Email address <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="you@example.com"
          aria-required="true"
          aria-describedby={errors.email ? 'reg-email-error' : undefined}
        />
        {errors.email && (
          <p id="reg-email-error" className="mt-1.5 text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="+91 98765 43210"
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-foreground mb-1.5">
          Password <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password')}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Create a strong password"
            aria-required="true"
            aria-describedby="password-requirements"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p id="password-requirements" className="mt-1 text-xs text-muted-foreground">
          Min. 8 characters, one uppercase letter, one number.
        </p>
        {errors.password && (
          <p className="mt-1 text-sm text-destructive" role="alert">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1.5">
          Confirm password <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Confirm your password"
          aria-required="true"
          aria-describedby={errors.confirmPassword ? 'confirm-pw-error' : undefined}
        />
        {errors.confirmPassword && (
          <p id="confirm-pw-error" className="mt-1.5 text-sm text-destructive" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register('agreeToTerms')}
          className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-ring"
          aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
        />
        <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground leading-tight">
          I agree to the{' '}
          <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms & Conditions</a>{' '}
          and{' '}
          <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-destructive" role="alert">{errors.agreeToTerms.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
