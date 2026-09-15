import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Supabase is only considered "configured" when both values are present
// and the key is not the placeholder shipped in .env.local.
// This lets the SIH prototype fall back to demo data instead of crashing.
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabasePublishableKey &&
    supabasePublishableKey !== "YOUR_PUBLISHABLE_KEY" &&
    supabasePublishableKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;