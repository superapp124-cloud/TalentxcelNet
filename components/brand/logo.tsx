'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'emblem'
  href?: string
  useImage?: boolean
  theme?: 'light' | 'dark' | 'auto'
}

const sizeMap = {
  sm: { emblem: 'h-6 w-6', text: 'text-base', px: 24, imgH: 24, imgW: 100 },
  md: { emblem: 'h-8 w-8', text: 'text-xl', px: 32, imgH: 32, imgW: 135 },
  lg: { emblem: 'h-10 w-10', text: 'text-2xl', px: 40, imgH: 40, imgW: 170 },
  xl: { emblem: 'h-14 w-14', text: 'text-3xl', px: 56, imgH: 56, imgW: 240 },
}

export function TalentXcelEmblem({
  className = 'h-8 w-8',
  pixelSize = 32,
  strokeColor,
}: {
  className?: string
  pixelSize?: number
  strokeColor?: string
}) {
  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 inline-block align-middle ${className}`}
      style={{ maxWidth: `${pixelSize * 2}px`, maxHeight: `${pixelSize * 2}px` }}
      aria-label="TalentXcel emblem"
    >
      {/* Outer circular track with bottom-right aperture */}
      <path
        d="M 68 80 A 38 38 0 1 1 85 55"
        stroke={strokeColor || 'currentColor'}
        strokeWidth="11"
        strokeLinecap="round"
      />
      {/* Dynamic angled accent bar */}
      <line
        x1="45"
        y1="50"
        x2="78"
        y2="83"
        stroke="#0080FF"
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({
  className = '',
  size = 'md',
  variant = 'full',
  href = '/',
  useImage = false,
  theme = 'auto',
}: LogoProps) {
  const { emblem, text, px, imgH, imgW } = sizeMap[size]

  const colorClass =
    theme === 'dark'
      ? 'text-white'
      : theme === 'light'
      ? 'text-neutral-900'
      : 'text-neutral-900 dark:text-white'

  const content = useImage ? (
    <div className={`relative flex items-center shrink-0 ${className}`}>
      <Image
        src="/logo.png"
        alt="talentXcel"
        width={imgW}
        height={imgH}
        className="h-auto w-auto max-h-10 object-contain shrink-0"
        priority
      />
    </div>
  ) : (
    <div className={`flex items-center gap-2.5 select-none shrink-0 ${colorClass} ${className}`}>
      <TalentXcelEmblem className={emblem} pixelSize={px} />
      {variant === 'full' && (
        <span className={`font-semibold tracking-tight ${text} font-sans leading-none inline-flex items-baseline`}>
          talent<span className="font-bold text-[#0080FF]">X</span>cel
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90 no-underline shrink-0">
        {content}
      </Link>
    )
  }

  return content
}

export function ChatrLogo({
  className = '',
  size = 'md',
  href,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  href?: string
}) {
  const heightMap = { sm: 28, md: 36, lg: 48 }
  const h = heightMap[size]

  const img = (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <Image
        src="/logos/chatr-logo.png"
        alt="chatr — Say It. Share It. Live It."
        width={h}
        height={h}
        className="rounded-full object-contain shrink-0 shadow-xs"
        style={{ height: `${h}px`, width: `${h}px` }}
      />
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-90">
        {img}
      </a>
    )
  }
  return img
}

export function NutyTalesLogo({
  className = '',
  size = 'md',
  href,
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  href?: string
}) {
  const heightMap = { sm: 26, md: 34, lg: 46 }
  const widthMap = { sm: 42, md: 56, lg: 76 }
  const h = heightMap[size]
  const w = widthMap[size]

  const img = (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <Image
        src="/logos/nutytales-logo.png"
        alt="NutyTales — Wholesome Nutty Delights"
        width={w}
        height={h}
        className="object-contain shrink-0"
        style={{ height: `${h}px`, width: 'auto' }}
      />
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-90">
        {img}
      </a>
    )
  }
  return img
}

export function EcosystemTrioLogos({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-between sm:justify-start gap-2.5 sm:gap-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-black/10 dark:border-white/10 shadow-xs max-w-full ${className}`}>
      <div className="flex items-center gap-2">
        <Logo size="sm" href="/" />
      </div>
      <span className="h-5 w-px bg-neutral-200 dark:bg-neutral-800" aria-hidden="true" />
      <div className="flex items-center gap-2">
        <ChatrLogo size="sm" href="https://chatr.chat" />
        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">chatr</span>
      </div>
      <span className="h-5 w-px bg-neutral-200 dark:bg-neutral-800" aria-hidden="true" />
      <div className="flex items-center gap-2">
        <NutyTalesLogo size="sm" href="https://nutytales.com" />
        <span className="text-xs font-serif font-bold text-[#1e3a8a] dark:text-blue-300">NutyTales</span>
      </div>
    </div>
  )
}
