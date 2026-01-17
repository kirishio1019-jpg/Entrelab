'use client'

import React, { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import FeedSection from './components/FeedSection'
import PostIdeaModal from './components/PostIdeaModal'
import InAppBrowserGuide from './components/InAppBrowserGuide'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handlePostIdea = async () => {
    if (user) {
      setIsModalOpen(true)
    } else {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Use a fixed URL for production if window.location.origin is not available or correct
          // In production, this should be the deployed URL.
          // However, using window.location.origin is generally correct for client-side navigation.
          // If it redirects to localhost, it means window.location.origin was localhost when the code ran,
          // OR Supabase is configured to redirect to localhost.
          // For now, let's trust the current window origin, which works for both dev and prod IF accessed via the correct URL.
          redirectTo: `${window.location.origin}/`,
        },
      })
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="w-full bg-black text-[#F5F5F7] overflow-x-hidden font-serif">
      <InAppBrowserGuide />
      <PostIdeaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <HeroSection 
        user={user} 
        onPostClick={handlePostIdea} 
        onLogout={handleLogout} 
      />
      
      <FeedSection 
        onPostClick={handlePostIdea} 
      />
    </main>
  )
}
