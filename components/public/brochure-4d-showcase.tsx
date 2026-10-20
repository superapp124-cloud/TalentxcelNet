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

    // Smooth subtle rotation - max 8 degrees
    const rotX = -((y - centerY) / centerY) * 8
    const rotY = ((x - centerX) / centerX) * 8

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.3 })
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
    <div className="relative w-full max-w-[315px] sm:max-w-[335px] lg:max-w-[340px] mx-auto select-none">
      {/* Outer Glow Halo */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Clean Header Bar Outside the Poster Canvas */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/90 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 text-[11px] font-bold shadow-xs">
          <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
          <span>Official 2026–27 Prospectus</span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/90 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs">
          <Calendar className="h-3 w-3" />
          <span>96 Live Sessions</span>
        </div>
      </div>

      {/* 3D Perspective Viewport */}
      <div
        style={{ perspective: 1000 }}
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
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformStyle: 'preserve-3d',
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
          }}
          className="relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-blue-400/30 shadow-[0_15px_40px_-10px_rgba(0,128,255,0.35)] backdrop-blur-md group"
        >
          {/* Dynamic Interactive Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.35) 0%, transparent 70%)`,
              opacity: glarePosition.opacity,
            }}
          />

          {/* The Poster Mat with Generous Inner Padding - GUARANTEES NO CUTTING ON ANY SIDE */}
          <div className="relative rounded-xl p-2 sm:p-2.5 bg-white shadow-xl flex items-center justify-center overflow-visible">
            <Image
              src="/images/class-9-foundation-brochure.jpg"
              alt="Class 9 Foundation Programme Official Syllabus & Package Brochure"
              width={682}
              height={1024}
              priority
              className="w-full h-auto object-contain rounded-sm block shadow-xs"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px] p-3 text-center rounded-xl z-20">
              <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/70 px-3 py-1 rounded-full border border-white/20 shadow-lg">
                <Eye className="h-3.5 w-3.5 text-cyan-400" /> Click to View Full Prospectus
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsFullscreenModalOpen(true)
                  }}
                  className="rounded-full shadow-lg gap-1.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-extrabold h-8"
                >
                  <Maximize2 className="h-3 w-3" /> Zoom 4K
                </Button>
                {onEnrolClick && (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEnrolClick()
                    }}
                    className="rounded-full shadow-lg gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold h-8"
                  >
                    Enrol <ArrowRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Footer Bar Underneath Card (Not covering the poster!) */}
      <div className="flex items-center justify-between gap-2 mt-2 px-1 text-[11px] text-slate-300">
        <span className="inline-flex items-center gap-1 text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          Hover to tilt 3D • Click to expand
        </span>

        <button
          onClick={() => setIsFullscreenModalOpen(true)}
          className="text-cyan-400 hover:text-cyan-300 font-semibold underline flex items-center gap-1 text-[11px] cursor-pointer"
        >
          <Maximize2 className="h-3 w-3" /> View Fullscreen
        </button>
      </div>

      {/* Fullscreen High-Resolution Inspection Modal */}
      {isFullscreenModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-2xl animate-in fade-in"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[95vh] flex flex-col bg-slate-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Class 9 Foundation Programme Prospectus
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    All 7 Subjects, 96 Live Sessions, Option 1 (₹29,999) & Option 2 with Laptop (₹61,999)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="h-7 w-7 p-0 rounded-full border-white/20 text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <span className="text-xs text-neutral-300 font-mono w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="h-7 w-7 p-0 rounded-full border-white/20 text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setZoomLevel(1)}
                  className="h-7 w-7 p-0 rounded-full border-white/20 text-white"
                  title="Reset Zoom"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="h-7 w-7 p-0 rounded-full text-white hover:bg-white/20 ml-2"
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
                className="max-w-2xl w-full p-2 bg-white rounded-xl shadow-2xl"
              >
                <Image
                  src="/images/class-9-foundation-brochure.jpg"
                  alt="Official Class 9 Foundation Programme Brochure Full View"
                  width={682}
                  height={1024}
                  className="w-full h-auto object-contain rounded-lg"
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
