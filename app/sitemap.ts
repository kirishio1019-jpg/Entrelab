import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/client'
import { getAllArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://entrelab.vercel.app'
  const supabase = createClient()

  // Fetch all ideas
  const { data: ideas } = await supabase
    .from('ideas')
    .select('id, created_at')
    .order('created_at', { ascending: false })

  // Fetch all articles
  const articles = getAllArticles()

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const ideaUrls = ideas?.map((idea) => ({
    url: `${baseUrl}/ideas/${idea.id}`,
    lastModified: new Date(idea.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/wallbatting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleUrls,
    ...ideaUrls,
  ]
}
