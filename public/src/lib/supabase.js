import { createClient } from '@supabase/supabase-js';
import { auth } from '../firebase/firebase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      // Supabase's Firebase third-party auth integration validates Firebase
      // ID tokens. The token must carry the required "authenticated" role
      // claim; this callback does not create or modify that claim.
      accessToken: async () => {
        return (await auth.currentUser?.getIdToken(false)) ?? null;
      },
    })
  : null;
