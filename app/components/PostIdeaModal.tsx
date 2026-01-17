'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface PostIdeaModalProps {
  isOpen: boolean
  onClose: () => void
  onPostSuccess?: () => void
}

export default function PostIdeaModal({ isOpen, onClose, onPostSuccess }: PostIdeaModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lookingFor: '',
    tags: ''
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Parse comma-separated strings into arrays
      const lookingForArray = formData.lookingFor.split(',').map(s => s.trim()).filter(Boolean)
      const tagsArray = formData.tags.split(',').map(s => s.trim()).filter(Boolean)

      const { error } = await supabase
        .from('ideas')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          looking_for: lookingForArray,
          tags: tagsArray
        })

      if (error) throw error

      // Reset form and close
      setFormData({ title: '', description: '', lookingFor: '', tags: '' })
      if (onPostSuccess) onPostSuccess()
      onClose()
    } catch (error) {
      console.error('Error posting idea:', error)
      alert('投稿に失敗しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#1a1a2e] p-6 shadow-xl border border-white/10 text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">アイデアを投稿</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  タイトル
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="例: AIを活用した英語学習アプリ"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  詳細
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="どんな課題を解決したいですか？"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    タグ (カンマ区切り)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="EdTech, AI, Mobile"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    募集する役割 (カンマ区切り)
                  </label>
                  <input
                    type="text"
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({...formData, lookingFor: e.target.value})}
                    placeholder="エンジニア, デザイナー"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {loading ? '投稿中...' : '投稿する'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
