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

  // Static Articles (Should dynamically fetch from fs in a real scenario if strictly adhering to SSG rules, 
  // but listing manually or via a script is common for static content)
  // Here we hardcode the slug list based on what we created, or better, we could read it.
  // Since sitemap.ts runs in Node context, we can import from lib/articles.
  // BUT: sitemap.ts is an async function component in Next.js 13+, better to keep it clean.
  // Let's add them manually for now or use a fetch. 
  // Wait, we can't easily import 'fs' inside sitemap.ts if it runs on Edge (Supabase client suggests Edge ready).
  // Assuming Node runtime for sitemap generation:
  const articleSlugs = [
    'student-startup-guide',
    'startup-idea-framework',
    'mvp-development',
    'find-cofounder',
    'startup-failure-reasons',
    'pitch-deck-guide',
    'student-funding',
    'lean-startup-basics',
    'no-code-startup',
    'business-model-canvas',
  ]

  const articleUrls = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
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
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleUrls,
    ...ideaUrls,
  ]
}
