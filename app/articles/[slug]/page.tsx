import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found | Entrelab',
    }
  }

  return {
    title: `${article.title} | Entrelab`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      url: `/articles/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] font-serif">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link 
          href="/articles"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          記事一覧に戻る
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 border-b border-white/10 pb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{article.date}</time>
              </div>
              {article.tags && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="bg-white/10 px-2 py-0.5 rounded text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <h3 className="text-xl font-bold mb-4">あなたのアイデアも投稿してみませんか？</h3>
            <p className="text-white/60 mb-6">Entrelabでは、記事で学んだことを実践できる場を提供しています。</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
            >
              アイデアを投稿する
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
