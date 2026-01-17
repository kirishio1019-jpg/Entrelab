'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface IdeaDetailModalProps {
  isOpen: boolean
  onClose: () => void
  idea: any
}

interface Comment {
  id: number
  content: string
  created_at: string
  user_id: string
}

export default function IdeaDetailModal({ isOpen, onClose, idea }: IdeaDetailModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const fetchComments = useCallback(async () => {
    if (!idea) return
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('idea_id', idea.id)
      .order('created_at', { ascending: true })
    
    if (data) setComments(data)
  }, [idea, supabase])

  useEffect(() => {
    if (isOpen) {
      fetchComments()
    }
  }, [isOpen, fetchComments])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('コメントするにはログインが必要です')
        return
      }

      const { error } = await supabase
        .from('comments')
        .insert({
          idea_id: idea.id,
          user_id: user.id,
          content: newComment.trim()
        })

      if (error) throw error

      setNewComment('')
      fetchComments()
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ja-JP', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(new Date(dateString))
  }

  if (!isOpen || !idea) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#1a1a2e] shadow-xl border border-white/10 text-white flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-semibold truncate pr-4">{idea.title}</h2>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {idea.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {idea.tags?.map((tag: string, i: number) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Looking For */}
              {idea.looking_for && idea.looking_for.length > 0 && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <span className="text-sm text-blue-300 font-medium block mb-2">募集中の役割</span>
                  <div className="flex flex-wrap gap-2">
                    {idea.looking_for.map((role: string, i: number) => (
                      <span key={i} className="text-sm font-medium text-blue-200 bg-blue-500/20 px-2 py-1 rounded">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  コメント <span className="text-sm text-white/50">({comments.length})</span>
                </h3>
                
                <div className="space-y-4 mb-6">
                  {comments.length === 0 ? (
                    <p className="text-white/40 text-sm text-center py-4">まだコメントはありません</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white/60" />
                        </div>
                        <div className="flex-1 bg-white/5 rounded-lg p-3">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-xs text-white/40">User ID: {comment.user_id.slice(0, 6)}...</span>
                            <span className="text-xs text-white/30">{formatDate(comment.created_at)}</span>
                          </div>
                          <p className="text-sm text-white/90 whitespace-pre-wrap">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Comment Input (Fixed Bottom) */}
            <div className="p-4 border-t border-white/10 bg-[#1a1a2e] rounded-b-2xl">
              <form onSubmit={handleSubmitComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="コメントを入力..."
                  className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
