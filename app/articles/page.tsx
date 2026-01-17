import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export const metadata = {
  title: '起業ノウハウ・ガイド | Entrelab',
  description: '学生起業、アイデア出し、資金調達など、起業に役立つ実践的なノウハウ記事を掲載しています。',
}

export default function ArticlesIndex() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] font-serif">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          トップに戻る
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">起業ノウハウ・ガイド</h1>
        <p className="text-white/60 mb-12">起業の第一歩から、具体的なアクションまでをサポートする記事集</p>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/articles/${article.slug}`}
              className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-100 group-hover:text-blue-300">
                {article.title}
              </h2>
              <p className="text-white/70 mb-4 line-clamp-2">
                {article.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <div className="flex gap-2">
                      {article.tags.map(tag => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
