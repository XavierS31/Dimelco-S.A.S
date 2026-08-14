import '../env.js';
import { getSupabase } from '../lib/supabase.js';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

if (!email) {
  throw new Error('ADMIN_EMAIL must be set in backend/node/.env');
}

const { data, error } = await getSupabase()
  .from('employees')
  .upsert({
    email,
    full_name: process.env.ADMIN_FULL_NAME?.trim() || 'Platform Administrator',
    role: 'admin',
    department: process.env.ADMIN_DEPARTMENT?.trim() || 'Management',
    position: process.env.ADMIN_POSITION?.trim() || 'System Administrator',
    is_active: true,
  }, { onConflict: 'email' })
  .select('id, role, is_active')
  .single();

if (error) throw error;

console.log(`Administrator account provisioned: ${data.id}`);
