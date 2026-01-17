import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Temporary hardcode for debugging to ensure connectivity, as env vars are struggling to load in this environment context
  const supabaseUrl = "https://aejdgmfusaybgbjshnnu.supabase.co"
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlamRnbWZ1c2F5YmdianNobm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTYxMzYsImV4cCI6MjA4NDE3MjEzNn0.bpgm68QeP4tXVbAiFv02zYL1YK_ZvIpBclav1UIP78E"

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
