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
}: {
  className?: string
  pixelSize?: number
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
        stroke="#0F172A"
        strokeWidth="11"
        strokeLinecap="round"
        className="stroke-neutral-900 dark:stroke-white"
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
}: LogoProps) {
  const { emblem, text, px, imgH, imgW } = sizeMap[size]

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
    <div className={`flex items-center gap-2.5 select-none shrink-0 ${className}`}>
      <TalentXcelEmblem className={emblem} pixelSize={px} />
      {variant === 'full' && (
        <span className={`font-semibold tracking-tight text-neutral-900 dark:text-white ${text} font-sans leading-none inline-flex items-baseline`}>
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
