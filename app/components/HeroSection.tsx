'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Sparkles, LogOut, User } from 'lucide-react'
import VideoBackground from './VideoBackground'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const VIDEO_URL = "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/df176a2fb2ea2b64bd21ae1c10d3af6a/manifest/video.m3u8"

interface BlurInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

const BlurIn = ({ children, className, delay = 0, duration = 0.6 }: BlurInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

const SplitText = ({ text, className, delay = 0 }: SplitTextProps) => {
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  }

  return (
    <motion.div
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-[0.2em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface HeroSectionProps {
  user: any
  onPostClick: () => void
  onLogout: () => void
}

export default function HeroSection({ user, onPostClick, onLogout }: HeroSectionProps) {
  const handleExplore = () => {
    const feedSection = document.getElementById('feed')
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#070612]">
      {/* Logo/Brand - Top Left */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-12 z-30">
        <h1 className="text-2xl font-bold text-white tracking-tight">Entrelab</h1>
      </div>
        
      {/* Logout / User Status - Top Right */}
      {user && (
        <div className="absolute top-6 right-6 lg:top-8 lg:right-12 z-30 flex items-center gap-3 animate-in fade-in duration-500">
          <div className="hidden md:flex items-center gap-2 text-white/80 text-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <User className="w-3.5 h-3.5" />
            <span className="max-w-[100px] truncate">{user.email}</span>
          </div>
          <button
            onClick={onLogout}
            className="group flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            ログアウト
          </button>
        </div>
      )}

      {/* Background Video */}
      <div className="absolute inset-0 z-0 ml-[200px] h-full origin-left scale-[1.2]">
        <VideoBackground
          src={VIDEO_URL}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-[#070612] to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 flex h-full items-center">
        <div className="max-w-7xl px-6 lg:px-12 w-full">
          <div className="flex flex-col items-start gap-12">
            
            {/* Top Content Group */}
            <div className="flex flex-col items-start gap-6 max-w-4xl">
              
              {/* Badge */}
              <BlurIn duration={0.6}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-1.5">
                  <Sparkles className="h-3 w-3 text-white/80" />
                  <span className="text-sm font-medium text-white/80">Co-Create Your Future</span>
                </div>
              </BlurIn>

              {/* Main Heading */}
              <div className="flex flex-col text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.2]">
                <SplitText text="未完成のアイデアを" delay={0} className="block" />
                <div className="flex flex-wrap items-baseline">
                  <SplitText text="世界に" delay={0.4} />
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="font-serif italic"
                  >
                    解き放て。
                  </motion.span>
                </div>
              </div>

              {/* Subtitle */}
              <BlurIn delay={0.4} duration={0.6} className="max-w-xl">
                <p className="text-lg font-normal leading-relaxed text-white/80">
                  ラフな起業アイデアを投稿し、フィードバックを集め、共に作り上げる仲間を見つけよう。完璧である必要はありません。必要なのは情熱だけ。
                </p>
              </BlurIn>
            </div>

            {/* CTA Buttons */}
            <BlurIn delay={0.6} duration={0.6}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onPostClick}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#070612] transition-transform hover:scale-105"
                >
                  アイデアを投稿する
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={handleExplore}
                  className="rounded-full bg-white/20 backdrop-blur-sm px-8 py-3 font-medium text-white transition-colors hover:bg-white/30"
                >
                  アイデアを探す
                </button>
              </div>
            </BlurIn>

          </div>
        </div>
      </div>
    </section>
  )
}
