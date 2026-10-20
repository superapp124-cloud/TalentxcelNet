'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Download,
  CheckCircle2,
  Calendar,
  Laptop,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Brochure4DShowcaseProps {
  onEnrolClick?: () => void
  onExploreClick?: () => void
}

export function Brochure4DShowcase({
  onEnrolClick,
  onExploreClick,
}: Brochure4DShowcaseProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation 12 degrees
    const rotX = -((y - centerY) / centerY) * 12
    const rotY = ((x - centerX) / centerX) * 12

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.4 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
    setGlarePosition({ x: 50, y: 50, opacity: 0 })
  }

  const reset3D = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePosition({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      {/* Ambient 4D Backlight Glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"
        aria-hidden="true"
      />

      {/* 3D Perspective Viewport */}
      <div
        style={{ perspective: 1200 }}
        className="relative z-10 cursor-pointer"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          }}
          className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/10 dark:from-white/10 dark:via-black/40 dark:to-white/5 border border-white/20 dark:border-white/15 shadow-[0_20px_60px_-15px_rgba(0,128,255,0.4)] backdrop-blur-xl group overflow-hidden"
        >
          {/* Dynamic 4D Interactive Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300 rounded-3xl"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
              opacity: glarePosition.opacity,
            }}
          />

          {/* 3D Floating Top Badges Layer */}
          <div
            style={{ transform: 'translateZ(45px)' }}
            className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between gap-2 pointer-events-none"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/80 text-amber-300 border border-amber-400/50 px-3 py-1 text-xs font-bold shadow-lg backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>Official 2026–27 Prospectus</span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-extrabold shadow-lg">
              <Calendar className="h-3.5 w-3.5" />
              <span>96 Live Sessions</span>
            </div>
          </div>

          {/* The High-Resolution Brochure Image */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
            <Image
              src="/images/class-9-foundation-brochure.png"
              alt="Class 9 Foundation Programme Official Syllabus & Package Brochure"
              width={900}
              height={900}
              priority
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFullscreenModalOpen(true)
                }}
                className="rounded-full shadow-lg gap-1.5 bg-white text-black hover:bg-neutral-100 text-xs font-bold"
              >
                <Maximize2 className="h-3.5 w-3.5" /> Fullscreen Prospectus
              </Button>
              {onEnrolClick && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEnrolClick()
                  }}
                  className="rounded-full shadow-lg gap-1.5 bg-[#0080FF] hover:bg-[#0070E0] text-white text-xs font-bold"
                >
                  Enrol Now <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* 3D Floating Bottom Ribbon */}
          <div
            style={{ transform: 'translateZ(55px)' }}
            className="mt-3 p-3 rounded-2xl bg-neutral-900/90 dark:bg-black/90 border border-white/15 text-white flex flex-wrap items-center justify-between gap-3 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Laptop className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-extrabold flex items-center gap-1.5 text-white">
                  <span>Option 2: Course + Laptop Included</span>
                  <Badge variant="secondary" className="bg-rose-500/20 text-rose-300 border-none text-[10px] py-0 px-1.5 font-bold">
                    Save ₹3,000
                  </Badge>
                </div>
                <div className="text-neutral-400 text-[11px]">
                  One-time: ₹61,999 + GST or ₹39,999 + ₹3,125/mo
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreenModalOpen(true)}
                className="h-8 rounded-full border-white/20 text-xs text-white hover:bg-white/10"
              >
                <Maximize2 className="h-3 w-3 mr-1" /> Inspect 4D
              </Button>
              {onEnrolClick && (
                <Button
                  size="sm"
                  onClick={onEnrolClick}
                  className="h-8 rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white text-xs font-bold px-3.5"
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          {/* 4D Gyro / Tilt Indicator Pill */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="text-center pt-2"
          >
            <span className="text-[10px] text-neutral-400 font-medium inline-flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Interactive 4D Prospectus • Hover or drag to tilt in spatial 3D
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Inspection Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-neutral-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Official Class 9 Foundation Programme Brochure
                  </h3>
                  <p className="text-xs text-neutral-400">
                    High-Resolution Prospectus & Complete Package Details
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="h-8 w-8 p-0 rounded-full border-white/20 text-white"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs text-neutral-300 font-mono w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="h-8 w-8 p-0 rounded-full border-white/20 text-white"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel(1)}
                  className="h-8 w-8 p-0 rounded-full border-white/20 text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="h-8 w-8 p-0 rounded-full text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
                className="max-w-3xl w-full"
              >
                <Image
                  src="/images/class-9-foundation-brochure.png"
                  alt="Official Class 9 Foundation Programme Brochure Full View"
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>
            </div>

            {/* Modal Footer with Instant CTA */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-black/60">
              <div className="text-xs text-neutral-400">
                Course Only: ₹29,999 + GST • Course + Laptop: ₹61,999 + GST (Save ₹3,000)
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="rounded-full border-white/20 text-white text-xs"
                >
                  Close Preview
                </Button>
                {onEnrolClick && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsFullscreenModalOpen(false)
                      onEnrolClick()
                    }}
                    className="rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white text-xs font-bold px-5"
                  >
                    Enrol in Class 9 Now <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
