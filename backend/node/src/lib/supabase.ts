import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import '../env.js';
import { HttpError } from './http.js';

let supabaseClient: SupabaseClient | undefined;

export const getSupabase = () => {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new HttpError(503, 'Supabase is not configured');
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return supabaseClient;
};
