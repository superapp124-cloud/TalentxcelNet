'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Calendar,
  Laptop,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  X,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Brochure4DShowcaseProps {
  onEnrolClick?: () => void
  onExploreClick?: () => void
}

export function Brochure4DShowcase({
  onEnrolClick,
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

    // Smooth rotation - max 10 degrees
    const rotX = -((y - centerY) / centerY) * 10
    const rotY = ((x - centerX) / centerX) * 10

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.35 })
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

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Outer Glow Halo */}
      <div
        className="absolute -inset-3 bg-gradient-to-r from-blue-500/25 via-cyan-500/20 to-indigo-500/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Header Chips (Cleanly positioned ABOVE the image to avoid clipping title) */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/80 text-amber-300 border border-amber-400/40 px-3 py-1 text-xs font-bold shadow-md backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>Official 2026–27 Prospectus</span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/90 text-white px-3 py-1 text-xs font-extrabold shadow-md">
          <Calendar className="h-3.5 w-3.5" />
          <span>96 Live Sessions</span>
        </div>
      </div>

      {/* 3D Perspective Viewport */}
      <div
        style={{ perspective: 1200 }}
        className="relative z-10 cursor-pointer"
        onClick={() => setIsFullscreenModalOpen(true)}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          }}
          className="relative rounded-2xl p-2 bg-gradient-to-b from-white/10 via-white/5 to-white/10 border border-white/20 shadow-[0_20px_50px_-10px_rgba(0,128,255,0.35)] backdrop-blur-xl group overflow-hidden"
        >
          {/* Dynamic 4D Interactive Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)`,
              opacity: glarePosition.opacity,
            }}
          />

          {/* The High-Resolution Brochure Image (Proper aspect ratio, uncropped) */}
          <div className="relative rounded-xl overflow-hidden bg-white shadow-inner">
            <Image
              src="/images/class-9-foundation-brochure.png"
              alt="Class 9 Foundation Programme Official Syllabus & Package Brochure"
              width={900}
              height={900}
              priority
              className="w-full h-auto object-contain rounded-xl block"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] p-4 text-center">
              <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                <Eye className="h-4 w-4 text-cyan-400" /> Click to Inspect High-Resolution Full Prospectus
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFullscreenModalOpen(true)
                  }}
                  className="rounded-full shadow-lg gap-1.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-extrabold"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Fullscreen Zoom
                </Button>
                {onEnrolClick && (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEnrolClick()
                    }}
                    className="rounded-full shadow-lg gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-extrabold"
                  >
                    Enrol Now <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* 3D Floating Bottom Ribbon */}
          <div
            style={{ transform: 'translateZ(40px)' }}
            className="mt-2.5 p-2.5 rounded-xl bg-slate-900/95 border border-white/15 text-white flex flex-wrap items-center justify-between gap-2 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Laptop className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <div className="font-extrabold flex items-center gap-1 text-white text-[11px] sm:text-xs">
                  <span>Option 2: Course + Laptop Included</span>
                  <Badge variant="secondary" className="bg-rose-500/30 text-rose-300 border-none text-[9px] py-0 px-1 font-bold">
                    Save ₹3,000
                  </Badge>
                </div>
                <div className="text-neutral-400 text-[10px]">
                  One-time: ₹61,999 + GST or ₹39,999 + ₹3,125/mo
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreenModalOpen(true)}
                className="h-7 rounded-full border-white/20 text-[11px] text-white hover:bg-white/10 px-2.5"
              >
                <Maximize2 className="h-3 w-3 mr-1" /> Zoom
              </Button>
              {onEnrolClick && (
                <Button
                  size="sm"
                  onClick={onEnrolClick}
                  className="h-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-3"
                >
                  Enrol
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4D Gyro / Tilt Indicator Pill */}
      <div className="text-center pt-2">
        <span className="text-[10px] text-blue-200/80 font-medium inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          Interactive 4D Prospectus • Hover to tilt in 3D • Click to expand full resolution
        </span>
      </div>

      {/* Fullscreen High-Resolution Inspection Modal */}
      {isFullscreenModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-2xl animate-in fade-in"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[94vh] flex flex-col bg-slate-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Official Class 9 Foundation Programme Prospectus
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    High-Resolution View • All 7 Subjects, 96 Live Sessions & Pricing Packages
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="h-8 w-8 p-0 rounded-full border-white/20 text-white"
                  title="Zoom Out"
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
                  title="Zoom In"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel(1)}
                  className="h-8 w-8 p-0 rounded-full border-white/20 text-white"
                  title="Reset Zoom"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="h-8 w-8 p-0 rounded-full text-white hover:bg-white/20 ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/80">
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
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 border-t border-white/10 bg-slate-900/90">
              <div className="text-xs text-neutral-300">
                <span className="font-bold text-white">Course Only</span>: ₹29,999 + GST • <span className="font-bold text-amber-300">Course + Laptop</span>: ₹61,999 + GST (Save ₹3,000)
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="rounded-full border-white/20 text-white text-xs h-8"
                >
                  Close
                </Button>
                {onEnrolClick && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsFullscreenModalOpen(false)
                      onEnrolClick()
                    }}
                    className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold px-5 h-8 gap-1.5"
                  >
                    Enrol in Class 9 Now <ArrowRight className="h-3.5 w-3.5" />
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
