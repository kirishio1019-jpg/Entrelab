'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, ThumbsUp, Calendar, User, Briefcase, Trash2 } from 'lucide-react'
import { notFound, useRouter } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

type Props = {
  params: { id: string }
}

export default function IdeaPage({ params }: Props) {
  const [idea, setIdea] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)

      // Get idea
      const { data: ideaData, error } = await supabase
        .from('ideas')
        .select(`
          *,
          likes (count),
          comments (count)
        `)
        .eq('id', params.id)
        .single()

      if (error || !ideaData) {
        setLoading(false)
        return
      }

      setIdea(ideaData)
      setLoading(false)
    }

    fetchData()
  }, [params.id])

  const handleDelete = async () => {
    if (!window.confirm('本当に削除しますか？この操作は取り消せません。')) return

    const { error } = await supabase
      .from('ideas')
      .delete()
      .eq('id', params.id)

    if (error) {
      alert('削除に失敗しました。')
      console.error(error)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/50">
        Loading...
      </div>
    )
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white/50 gap-4">
        <p>アイデアが見つかりません</p>
        <Link href="/" className="text-blue-400 hover:underline">トップに戻る</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] font-serif">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          トップに戻る
        </Link>

        {/* Content */}
        <article className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative">
          
          {/* Delete Button (Owner Only) */}
          {currentUser && currentUser.id === idea.user_id && (
            <button
              onClick={handleDelete}
              className="absolute top-6 right-6 p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors z-10"
              title="削除する"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-wrap gap-3 mb-6 pr-12"> {/* Added padding-right to avoid overlap with delete button */}
              {idea.tags?.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {idea.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-white/50 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{idea.author_name || 'Anonymous User'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(idea.created_at).toLocaleDateString('ja-JP')}</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                 <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{idea.likes?.[0]?.count || 0}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>{idea.comments?.[0]?.count || 0}</span>
                 </div>
              </div>
            </div>

            {/* Body */}
            <div className="prose prose-invert max-w-none mb-12">
              <h3 className="text-xl font-semibold mb-4 text-white/90">詳細</h3>
              <p className="text-lg leading-relaxed text-white/80 whitespace-pre-wrap">
                {idea.description}
              </p>
            </div>

            {/* Looking For */}
            {idea.looking_for && idea.looking_for.length > 0 && (
              <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  募集している役割
                </h3>
                <div className="flex flex-wrap gap-2">
                  {idea.looking_for.map((role: string) => (
                    <span 
                      key={role}
                      className="px-3 py-1.5 rounded-md text-sm bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA for login/interaction (Static for now, could be interactive) */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-white/60 mb-4">このアイデアに興味がありますか？</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                トップページでログインしてリアクションする
              </Link>
            </div>

          </div>
        </article>
      </div>
    </div>
  )
}
