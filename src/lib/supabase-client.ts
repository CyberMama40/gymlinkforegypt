import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

if (!url || !key) {
  console.warn(
    '[supabase-client] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is missing.\n' +
    'Copy .env.example → .env and fill in your Supabase project values.\n' +
    'App will run but Supabase calls will fail until .env is configured.'
  )
}

// Fallback placeholders prevent createClient from throwing when .env is empty.
// Real values must be set in .env before auth/db calls will work.
export const supabase = createClient(
  url  ?? 'https://placeholder.supabase.co',
  key  ?? 'placeholder-key'
)
