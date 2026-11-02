'use client'

import React from 'react'
import type { GameChallenge, GameChapterConfig } from '@/lib/game-engine/types'
import { Sparkles, MapPin, HelpCircle, Bot, BookOpen, Atom, Award } from 'lucide-react'

interface GameEnvironmentProps {
  chapter: GameChapterConfig
  challenge: GameChallenge
}

export function GameEnvironment({ chapter, challenge }: GameEnvironmentProps) {
  const envType = chapter.environmentType

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg min-h-[160px] sm:min-h-[190px] flex items-center justify-center p-3 select-none">
      {/* ------------------------------------------------------------------- */}
      {/* 1. MATHEMATICS: INTEGER KINGDOM */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'kingdom' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#1e1b4b] via-[#1e3a8a] to-[#047857] flex flex-col justify-between p-3">
          {/* Distant Castle & Mountains */}
          <div className="absolute top-2 right-4 opacity-70">
            <svg className="w-20 h-16 text-blue-200/50" viewBox="0 0 100 80" fill="currentColor">
              <path d="M10 80 L10 40 L20 40 L20 30 L25 30 L25 40 L35 40 L35 25 L45 10 L55 25 L55 40 L65 40 L65 30 L70 30 L70 40 L80 40 L80 80 Z" />
              <rect x="40" y="55" width="12" height="25" rx="6" fill="#1e1b4b" />
            </svg>
          </div>

          {/* Stepping Stones Path */}
          <div className="relative z-10 flex items-center justify-between w-full mt-auto mb-1 px-2">
            {/* Adventurer Boy Avatar */}
            <div className="flex items-center gap-2">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 border-2 border-white shadow-md flex items-center justify-center text-white font-black text-lg overflow-hidden animate-bounce duration-1000">
                <span className="text-xl">🧑‍🌾</span>
              </div>
              <div className="hidden sm:block text-[11px] font-bold text-amber-200 bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/30">
                Adventurer Leo
              </div>
            </div>

            {/* Hexagonal Step Nodes */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {[1, 2, 4, 5].map((nodeNum, idx) => {
                const isActive = nodeNum === 4
                const isLocked = nodeNum === 5

                return (
                  <div
                    key={nodeNum}
                    className={`relative flex items-center justify-center font-black text-xs transition-all ${
                      isActive
                        ? 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/50 ring-2 ring-white scale-110'
                        : isLocked
                        ? 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900/80 text-slate-500 border border-slate-700'
                        : 'w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400 text-amber-950 font-bold border border-amber-200'
                    }`}
                  >
                    {isLocked ? '🔒' : nodeNum}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 2. SCIENCE: CELL EXPLORER (Lush Lab + Interactive Plant Cell) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'laboratory' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#042f2e] flex items-center justify-around p-2">
          {/* Bubbling Flask Art */}
          <div className="relative w-14 h-20 shrink-0 hidden xs:flex flex-col items-center justify-end">
            <svg className="w-12 h-16 text-emerald-400" viewBox="0 0 60 80" fill="none" stroke="currentColor">
              <path
                d="M24 10 L24 28 L10 65 A 6 6 0 0 0 16 72 L44 72 A 6 6 0 0 0 50 65 L36 28 L36 10 Z"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 62 Q 30 56 46 62 L44 72 L16 72 Z"
                fill="#10b981"
                className="animate-pulse"
              />
              <circle cx="28" cy="45" r="2.5" fill="#34d399" className="animate-ping" />
              <circle cx="34" cy="35" r="2" fill="#6ee7b7" />
            </svg>
          </div>

          {/* 3D Biological Plant Cell SVG Model */}
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-32 sm:w-44 sm:h-36 drop-shadow-2xl" viewBox="0 0 200 160">
              {/* Outer Cell Wall (Emerald Green Poly) */}
              <polygon
                points="30,20 170,15 190,80 165,145 35,150 10,85"
                fill="#065f46"
                stroke="#34d399"
                strokeWidth="4"
              />
              {/* Plasma Membrane */}
              <polygon
                points="36,26 164,22 182,80 160,139 40,143 18,84"
                fill="#047857"
                stroke="#a7f3d0"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
              {/* Central Large Vacuole */}
              <ellipse cx="125" cy="85" rx="35" ry="30" fill="#38bdf8" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="2" />
              {/* Nucleus with Nucleolus */}
              <circle cx="65" cy="95" r="20" fill="#a855f7" stroke="#e9d5ff" strokeWidth="2.5" />
              <circle cx="65" cy="95" r="7" fill="#6b21a8" />
              {/* Chloroplast (Marked with '?') */}
              <g className="animate-pulse">
                <ellipse cx="80" cy="45" rx="22" ry="14" fill="#22c55e" stroke="#bbf7d0" strokeWidth="2" />
                <line x1="68" y1="45" x2="92" y2="45" stroke="#15803d" strokeWidth="2" />
                <line x1="72" y1="40" x2="88" y2="40" stroke="#15803d" strokeWidth="1.5" />
                <line x1="72" y1="50" x2="88" y2="50" stroke="#15803d" strokeWidth="1.5" />
                {/* Pointer Tag with '?' */}
                <circle cx="106" cy="35" r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="106" y="39" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">?</text>
              </g>
              {/* Mitochondria */}
              <ellipse cx="140" cy="40" rx="14" ry="8" fill="#f97316" stroke="#fed7aa" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 3. ENGLISH: WORD ARENA (Enchanted Library + Glowing Spell Book) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'magical_library' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#451a03] via-[#3b1202] to-[#1e1b4b] flex items-center justify-center p-3">
          {/* Floating Lanterns */}
          <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_#f59e0b] animate-ping" />
          <div className="absolute top-3 right-8 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#fbbf24] animate-pulse" />

          {/* Grand Open Spellbook with Feather Quill */}
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-32 sm:w-56 sm:h-36 drop-shadow-2xl" viewBox="0 0 200 120">
              {/* Book Spine & Pages (Warm Parchment) */}
              <path
                d="M20 90 Q 60 75 100 85 Q 140 75 180 90 L185 30 Q 140 20 100 28 Q 60 20 15 30 Z"
                fill="#fef3c7"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              <path
                d="M100 28 L100 85"
                stroke="#b45309"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              {/* Page Lines */}
              <line x1="30" y1="42" x2="85" y2="40" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="30" y1="52" x2="85" y2="50" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="30" y1="62" x2="80" y2="60" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="115" y1="40" x2="170" y2="42" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="115" y1="50" x2="170" y2="52" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.6" />
              {/* Glowing Feather Quill */}
              <g transform="rotate(25 155 35)">
                <path
                  d="M150 10 Q 155 25 160 55 L158 55 Q 148 30 150 10 Z"
                  fill="#60a5fa"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
                <line x1="155" y1="12" x2="155" y2="58" stroke="#3b82f6" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 4. SOCIAL STUDIES: WORLD EXPLORER (Floating Sky Island Landform) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'floating_island' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#0284c7] via-[#38bdf8] to-[#047857] flex items-center justify-center p-2">
          {/* Floating Sky Clouds */}
          <div className="absolute top-2 left-3 w-16 h-5 bg-white/40 rounded-full blur-[1px]" />
          <div className="absolute top-4 right-4 w-20 h-6 bg-white/50 rounded-full blur-[1px]" />

          {/* 3D Floating Geological Island with Flat-Topped Plateau */}
          <div className="relative flex items-center justify-center drop-shadow-2xl">
            <svg className="w-44 h-32 sm:w-52 sm:h-36" viewBox="0 0 200 140">
              {/* Under-Island Floating Rock Matrix */}
              <polygon
                points="40,85 160,85 140,130 95,138 60,125"
                fill="#78350f"
                stroke="#451a03"
                strokeWidth="2"
              />
              {/* Cascading Waterfall */}
              <path
                d="M95 85 L95 136"
                stroke="#67e8f9"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-pulse"
              />
              {/* Lush Grass Surface */}
              <ellipse cx="100" cy="85" rx="65" ry="18" fill="#15803d" stroke="#86efac" strokeWidth="2" />
              {/* Plateau Landform (Flat Tableland Summit) */}
              <polygon
                points="75,80 85,45 125,45 135,80"
                fill="#b45309"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              {/* Red Map Pin Marker '?' on the Plateau */}
              <g className="animate-bounce">
                <circle cx="105" cy="30" r="11" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <path d="M105 41 L105 47" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <text x="105" y="34" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">?</text>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 5. CODING: CODE BUILDER (Cyberpunk Grid + Friendly Robot TX) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'cyberpunk' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#020617] via-[#090d16] to-[#0f172a] border border-cyan-500/30 flex items-center justify-between px-4 py-2">
          {/* Cyber Circuit Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

          {/* Terminal Output Screen */}
          <div className="relative z-10 w-44 sm:w-56 bg-black/80 rounded-xl border border-cyan-500/40 p-2.5 font-mono text-[11px] text-cyan-300 shadow-lg shadow-cyan-500/10">
            <div className="flex items-center gap-1.5 pb-1 mb-1.5 border-b border-cyan-900/60">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[9px] text-slate-400 ml-1">main.py</span>
            </div>
            <p className="text-purple-300">x = 5</p>
            <p className="text-cyan-300">x = x + 2</p>
            <p className="text-amber-300">print(x)</p>
          </div>

          {/* Friendly AI Companion Robot with "TX" Emblem */}
          <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
            <div className="w-16 h-14 sm:w-18 sm:h-16 rounded-2xl bg-gradient-to-tr from-slate-800 via-slate-700 to-cyan-600 border-2 border-cyan-300 shadow-lg shadow-cyan-500/40 flex flex-col items-center justify-center p-1.5">
              {/* Cute Glowing Blue Visor */}
              <div className="w-11 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] flex items-center justify-around px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              {/* TX Chest Plate */}
              <div className="mt-1 px-1.5 py-0.2 rounded-sm bg-blue-950 border border-blue-400/60 text-[8px] font-black text-cyan-200">
                TX-Bot
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 6. REASONING: LOGIC ARENA (Cosmic Chamber + 3D Sequence Cubes) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'cosmic_nebula' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#180536] via-[#311042] to-[#0f172a] flex flex-col justify-center items-center p-2">
          {/* Cosmic Nebula Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

          {/* 3D Isometric Sequence Cubes Row */}
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 py-1">
            {[0, 1, 2, 3].map((step) => {
              const isTarget = step === 3

              return (
                <div
                  key={step}
                  className={`flex flex-col items-center justify-center ${
                    isTarget
                      ? 'w-11 h-11 sm:w-13 sm:h-13 rounded-xl border-2 border-dashed border-pink-400 bg-pink-500/20 shadow-lg shadow-pink-500/30'
                      : 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-indigo-400/60 bg-indigo-950/60 shadow-md'
                  }`}
                >
                  {isTarget ? (
                    <span className="text-pink-300 font-black text-xl animate-pulse">?</span>
                  ) : (
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-300" viewBox="0 0 40 40">
                      {/* Isometric Cube Wireframe */}
                      <polygon points="20,4 36,12 20,20 4,12" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
                      <polygon points="4,12 20,20 20,36 4,28" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                      <polygon points="20,20 36,12 36,28 20,36" fill="#3730a3" stroke="#818cf8" strokeWidth="1.5" />
                      {/* Rotating Marker Dot */}
                      <circle
                        cx={step === 0 ? 12 : step === 1 ? 28 : 20}
                        cy={step === 0 ? 12 : step === 1 ? 12 : 28}
                        r="2.5"
                        fill="#fb7185"
                      />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
          <span className="text-[11px] font-semibold text-purple-200 mt-1">
            90° Clockwise Rotation Matrix
          </span>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 7. GENERAL KNOWLEDGE: WORLD WONDERS (Taj Mahal Landmark Postcard) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'discovery_map' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#1e3a8a] via-[#164e63] to-[#0c4a6e] flex items-center justify-center p-2">
          {/* Postcard Frame with Taj Mahal Illustration */}
          <div className="relative w-52 sm:w-64 h-32 sm:h-36 rounded-xl overflow-hidden border-2 border-amber-200/60 shadow-2xl bg-gradient-to-b from-sky-400 via-amber-100 to-emerald-800 flex items-end justify-center">
            {/* Sun / Sky */}
            <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-amber-200/80 shadow-[0_0_12px_#fde047]" />

            {/* Taj Mahal Silhouette Vector */}
            <svg className="w-48 h-28 text-white drop-shadow-md" viewBox="0 0 200 120" fill="currentColor">
              {/* Left Minaret */}
              <rect x="25" y="25" width="4" height="90" fill="#f8fafc" />
              <polygon points="23,25 29,25 27,15" fill="#f8fafc" />
              {/* Right Minaret */}
              <rect x="171" y="25" width="4" height="90" fill="#f8fafc" />
              <polygon points="169,25 175,25 173,15" fill="#f8fafc" />
              {/* Main Central Dome */}
              <path d="M70 115 L70 65 Q 100 20 130 65 L130 115 Z" fill="#ffffff" />
              {/* Crown Finial */}
              <line x1="100" y1="20" x2="100" y2="8" stroke="#d97706" strokeWidth="2" />
              {/* Side Small Domes */}
              <path d="M55 115 L55 75 Q 65 50 75 75 L75 115 Z" fill="#f1f5f9" />
              <path d="M125 115 L125 75 Q 135 50 145 75 L145 115 Z" fill="#f1f5f9" />
              {/* Grand Arch Door */}
              <path d="M85 115 L85 85 Q 100 70 115 85 L115 115 Z" fill="#0f172a" />
            </svg>

            {/* Reflecting Pool */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-teal-900/60 backdrop-blur-xs border-t border-teal-300/40" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 8. HINDI: PRACHEEN SAHITYA (Flowering Branch, Sparrow & Golden Scroll) */}
      {/* ------------------------------------------------------------------- */}
      {envType === 'parchment_scroll' && (
        <div className="relative w-full h-full min-h-[160px] sm:min-h-[185px] rounded-xl overflow-hidden bg-gradient-to-b from-[#450a0a] via-[#7c2d12] to-[#1c1917] flex items-center justify-between px-3 py-2">
          {/* Traditional Branch with Singing Blue Sparrow */}
          <div className="relative flex flex-col items-center">
            {/* Cheerful Blue Sparrow */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 border border-white shadow-md flex items-center justify-center text-lg animate-pulse">
              <span>🐦</span>
            </div>
            {/* Flowering Foliage */}
            <span className="text-xs mt-1">🌸 🍃</span>
          </div>

          {/* Golden Ancient Parchment Scroll */}
          <div className="relative z-10 w-44 sm:w-56 bg-amber-50 rounded-xl border-2 border-amber-600/70 p-2.5 shadow-xl text-center">
            <div className="text-[10px] text-amber-800 font-serif font-black tracking-wider uppercase border-b border-amber-300 pb-1 mb-1">
              प्राचीन मुहावरा दर्पण
            </div>
            <p className="font-serif font-bold text-xs sm:text-sm text-amber-950">
              “नाक में दम करना”
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
