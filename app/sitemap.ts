import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://entrelab.vercel.app'
  const supabase = createClient()

  // Fetch all ideas
  const { data: ideas } = await supabase
    .from('ideas')
    .select('id, created_at')
    .order('created_at', { ascending: false })

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
    ...ideaUrls,
  ]
}
