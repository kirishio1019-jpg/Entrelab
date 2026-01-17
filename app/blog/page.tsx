import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: "起業ノウハウブログ | Entrelab",
  description: "学生起業家や若手起業家向けの起業アイデアの出し方、検証方法、資金調達、MVP開発などのノウハウ記事一覧。",
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen bg-[#070612] text-white py-20 px-6 lg:px-12 font-serif">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          トップに戻る
        </Link>
        
        <h1 className="text-4xl font-bold mb-4 text-center">起業ノウハウブログ</h1>
        <p className="text-white/60 mb-12 text-center">起業の第一歩から、具体的なアクションまでをサポートする記事集</p>
        
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.slug} 
              className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <h2 className="text-2xl font-semibold mb-3 text-blue-100 group-hover:text-blue-300 transition-colors">{article.title}</h2>
              <p className="text-white/70 mb-4 line-clamp-2">{article.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-white/50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(article.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {/* 
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
                */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}