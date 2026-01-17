'use client'

import React, { useState } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, LogOut, User, Menu, X } from 'lucide-react'
import VideoBackground from './VideoBackground'
import Link from 'next/link'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleExplore = () => {
    const feedSection = document.getElementById('feed')
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#070612]">
      {/* Logo/Brand - Top Left */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-12 z-30 flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white tracking-tight">Entrelab</h1>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="text-white/70 hover:text-white transition-colors">
            Entrelabについて
          </Link>
          <Link href="/concept" className="text-white/70 hover:text-white transition-colors">
            コンセプト
          </Link>
          <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
            起業ノウハウ
          </Link>
          <Link href="/wallbatting" className="text-white/70 hover:text-white transition-colors">
            壁打ちツール
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="absolute top-6 right-6 z-30 md:hidden p-2 text-white/80 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#070612] p-6 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Menu</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link href="/about" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                Entrelabについて
              </Link>
              <Link href="/concept" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                コンセプト
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                起業ノウハウ
              </Link>
              <Link href="/wallbatting" className="text-white/80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                壁打ちツール
              </Link>
            </nav>

            {user && (
              <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/80 truncate">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 p-3 rounded-lg text-white font-medium hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4" />
                  ログアウト
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
        
      {/* Logout / User Status - Top Right (Desktop) */}
      {user && (
        <div className="hidden md:flex absolute top-6 right-6 lg:top-8 lg:right-12 z-30 items-center gap-3 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 text-white/80 text-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
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
      <div className="absolute inset-0 z-0 h-full w-full">
        {/* Mobile: Centered/Cover, Desktop: Shifted right */}
        <div className="absolute inset-0 h-full w-full lg:ml-[200px] lg:origin-left lg:scale-[1.2]">
          <VideoBackground
            src={VIDEO_URL}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Mobile Overlay to darken video slightly for text readability if needed */}
        <div className="absolute inset-0 bg-black/20 lg:bg-transparent" />
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-[#070612] to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 flex h-full items-center">
        <div className="max-w-7xl px-6 lg:px-12 w-full pt-32 lg:pt-0"> {/* Increased padding top for mobile */}
          <div className="flex flex-col items-start gap-12">
            
            {/* Top Content Group */}
            <div className="flex flex-col items-start gap-6 max-w-4xl">
              
              {/* Main Heading (SEO Optimized) */}
              <h1 className="text-3xl font-medium leading-tight text-white md:text-5xl lg:text-6xl lg:leading-[1.2]">
                <span className="block font-bold lg:inline">起業アイデアを言語化し、</span>
                <span className="block font-bold lg:inline">磨くためのプラットフォーム</span>
              </h1>

              {/* Subtitle (SEO Description) */}
              <BlurIn delay={0.4} duration={0.6} className="max-w-2xl">
                <p className="text-lg font-normal leading-relaxed text-white/80 mb-6">
                  Entrelabは、学生・若手起業家向けに、アイデアの壁打ちや構想整理を行うための創出・検証プラットフォームです。
                  未完成のアイデアを投稿し、フィードバックを集め、仲間と共に事業を形にしていきましょう。
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
