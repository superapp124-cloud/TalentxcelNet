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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  })

  async function handleGoogleSignUp() {
    try {
      setIsGoogleLoading(true)
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })
      if (error) {
        toast.error(error.message || 'Google sign-up could not be initiated.')
      }
    } catch {
      toast.error('An unexpected error occurred during Google sign-up.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
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
        if (
          error.message.toLowerCase().includes('already registered') ||
          error.message.toLowerCase().includes('already exists')
        ) {
          toast.error('An account with this email already exists. Please sign in.')
        } else {
          toast.error(error.message || 'Registration failed. Please try again.')
        }
        return
      }

      if (data?.session) {
        toast.success('Account created successfully! Welcome to TalentXcel.')
        router.push('/dashboard')
        router.refresh()
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
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignUp}
        disabled={isGoogleLoading || isLoading}
        className="w-full rounded-full border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium py-2.5 flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="h-4 w-4" />
        )}
        <span>Sign up with Google</span>
      </Button>

      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-white dark:bg-neutral-900 px-3 text-neutral-400 font-semibold">
            or register with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
          Full name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          {...register('fullName')}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition-all"
          placeholder="Your full name"
          aria-required="true"
          aria-describedby={errors.fullName ? 'fullname-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullname-error" className="mt-1.5 text-sm text-red-500 font-medium" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
          Email address <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition-all"
          placeholder="you@example.com"
          aria-required="true"
          aria-describedby={errors.email ? 'reg-email-error' : undefined}
        />
        {errors.email && (
          <p id="reg-email-error" className="mt-1.5 text-sm text-red-500 font-medium" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
          Phone <span className="text-neutral-400 text-xs">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition-all"
          placeholder="+91 98765 43210"
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-500 font-medium" role="alert">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
          Password <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password')}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3.5 py-2.5 pr-10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition-all"
            placeholder="Create a strong password"
            aria-required="true"
            aria-describedby="password-requirements"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p id="password-requirements" className="mt-1 text-xs text-neutral-400">
          Min. 8 characters, one uppercase letter, one number.
        </p>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500 font-medium" role="alert">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
          Confirm password <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:border-transparent transition-all"
          placeholder="Confirm your password"
          aria-required="true"
          aria-describedby={errors.confirmPassword ? 'confirm-pw-error' : undefined}
        />
        {errors.confirmPassword && (
          <p id="confirm-pw-error" className="mt-1.5 text-sm text-red-500 font-medium" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register('agreeToTerms')}
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-[#0080FF] focus:ring-[#0080FF]"
          aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
        />
        <label htmlFor="agreeToTerms" className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
          I agree to the{' '}
          <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="text-[#0080FF] hover:underline font-medium">Terms & Conditions</a>{' '}
          and{' '}
          <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0080FF] hover:underline font-medium">Privacy Policy</a>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-500 font-medium" role="alert">{errors.agreeToTerms.message}</p>
      )}

      <Button type="submit" className="w-full rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white font-semibold py-2.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
      </form>
    </div>
  )
}
