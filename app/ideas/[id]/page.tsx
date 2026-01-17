import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, ThumbsUp, Calendar, User, Tag, Briefcase } from 'lucide-react'
import { notFound } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

async function getIdea(id: string) {
  const supabase = createClient()
  const { data: idea, error } = await supabase
    .from('ideas')
    .select(`
      *,
      likes (count),
      comments (count)
    `)
    .eq('id', id)
    .single()

  if (error || !idea) return null
  return idea
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const idea = await getIdea(id)

  if (!idea) {
    return {
      title: 'Idea Not Found | Entrelab',
    }
  }

  return {
    title: `${idea.title} | Entrelab`,
    description: idea.description.slice(0, 120) + '...',
    openGraph: {
      title: `${idea.title} | Entrelab`,
      description: idea.description.slice(0, 120) + '...',
      type: 'article',
      url: `/ideas/${id}`,
    },
    twitter: {
      card: 'summary',
      title: `${idea.title} | Entrelab`,
      description: idea.description.slice(0, 120) + '...',
    },
  }
}

export default async function IdeaPage({ params }: Props) {
  const { id } = await params
  const idea = await getIdea(id)

  if (!idea) {
    notFound()
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
        <article className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-wrap gap-3 mb-6">
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
