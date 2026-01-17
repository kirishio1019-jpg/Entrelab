'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ThumbsUp, UserPlus, Send, Sparkles, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import IdeaDetailModal from './IdeaDetailModal'

// Keep mock data for fallback or initial state if needed, or remove it entirely.
// For now, let's keep it but prioritize fetched data.
const MOCK_IDEAS = [
  // ... (previous mock data can be removed or kept as placeholder)
]

interface FeedSectionProps {
  onPostClick: () => void
}

interface Idea {
  id: number
  title: string
  description: string
  tags: string[]
  looking_for: string[]
  created_at: string
  user_id: string
  likes: { count: number }[]
  comments: { count: number }[]
  user_has_liked: boolean
}

export default function FeedSection({ onPostClick }: FeedSectionProps) {
  const [activeTab, setActiveTab] = useState('trending')
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
  const supabase = createClient()

  const fetchIdeas = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from('ideas')
        .select(`
          *,
          likes (count),
          comments (count)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      if (data) {
        // Fetch user's likes separately to check if 'liked'
        let userLikes = new Set()
        if (user) {
          const { data: likesData } = await supabase
            .from('likes')
            .select('idea_id')
            .eq('user_id', user.id)
          
          if (likesData) {
            likesData.forEach(l => userLikes.add(l.idea_id))
          }
        }

        const formattedIdeas = data.map(idea => ({
          ...idea,
          user_has_liked: userLikes.has(idea.id)
        }))
        setIdeas(formattedIdeas)
      }
    } catch (error) {
      console.error('Error fetching ideas:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const handleLike = async (ideaId: number, currentLiked: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('「いいね」するにはログインが必要です')
        return
      }

      // Optimistic update
      setIdeas(current => current.map(idea => {
        if (idea.id === ideaId) {
          const newCount = (idea.likes?.[0]?.count || 0) + (currentLiked ? -1 : 1)
          return {
            ...idea,
            user_has_liked: !currentLiked,
            likes: [{ count: newCount }]
          }
        }
        return idea
      }))

      if (currentLiked) {
        await supabase.from('likes').delete().match({ user_id: user.id, idea_id: ideaId })
      } else {
        await supabase.from('likes').insert({ user_id: user.id, idea_id: ideaId })
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      fetchIdeas() // Revert on error
    }
  }

  useEffect(() => {
    fetchIdeas()
    
    // Subscribe to changes
    const channel = supabase
      .channel('public_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ideas' }, 
        () => fetchIdeas()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'likes' },
        () => fetchIdeas()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        () => fetchIdeas()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchIdeas, supabase])

  // Use formatDistanceToNow or similar for timestamp if needed, currently just displaying simple string or date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date)
  }

  return (
    <section id="feed" className="relative w-full py-20 bg-[#070612] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <IdeaDetailModal 
          isOpen={!!selectedIdea} 
          onClose={() => setSelectedIdea(null)} 
          idea={selectedIdea} 
        />
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              注目のアイデア
            </h2>
            <p className="text-white/60 text-lg max-w-2xl">
              世界中から投稿された、磨けば光る原石たち。あなたのスキルで、これらのアイデアを実現に近づけませんか？
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-full p-1 backdrop-blur-sm border border-white/10">
            {['trending', 'newest', 'following'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-[#070612] shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'trending' ? 'トレンド' : tab === 'newest' ? '新着' : 'フォロー中'}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:bg-white/10 flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    U
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">User</h4>
                    <span className="text-xs text-white/50">{formatDate(idea.created_at)}</span>
                  </div>
                </div>
                <button className="text-white/40 hover:text-white transition-colors">
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Card Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">
                  {idea.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {idea.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {idea.tags && idea.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              {idea.looking_for && idea.looking_for.length > 0 && (
                <div className="mb-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <span className="text-xs text-blue-300 font-medium block mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 募集中
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {idea.looking_for.map(role => (
                      <span key={role} className="text-xs font-medium text-blue-200">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-white/60">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleLike(idea.id, idea.user_has_liked)}
                    className={`flex items-center gap-1.5 transition-colors text-sm ${idea.user_has_liked ? 'text-pink-500' : 'hover:text-pink-400'}`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${idea.user_has_liked ? 'fill-current' : ''}`} />
                    <span>{idea.likes?.[0]?.count || 0}</span>
                  </button>
                  <button 
                    onClick={() => setSelectedIdea(idea)}
                    className="flex items-center gap-1.5 hover:text-blue-400 transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{idea.comments?.[0]?.count || 0}</span>
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedIdea(idea)}
                  className="text-xs font-medium hover:text-white transition-colors flex items-center gap-1"
                >
                  詳細を見る <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* New Idea Card Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            onClick={onPostClick}
            className="group relative border border-dashed border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all hover:bg-white/5 flex flex-col items-center justify-center text-center h-full min-h-[300px] cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Send className="w-6 h-6 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold mb-2">あなたのアイデアも<br/>投稿してみませんか？</h3>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              まだ形になっていなくても大丈夫。ここから全てが始まります。
            </p>
            <button className="px-6 py-2 rounded-full bg-white text-[#070612] font-medium text-sm hover:bg-white/90 transition-colors">
              投稿を作成する
            </button>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
            すべてのアイデアを見る <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
