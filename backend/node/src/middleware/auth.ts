import type { NextFunction, Request, Response } from 'express';
import { getSession } from '@auth/express';
import { getToken } from '@auth/core/jwt';
import { authConfig } from '../auth.js';
import { HttpError } from '../lib/http.js';
import { getSupabase } from '../lib/supabase.js';

export type Employee = {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'employee';
  department: string | null;
  position: string | null;
  is_active: boolean;
  created_at: string;
};

export type AuthenticatedRequest = Request & { employee: Employee };

const authCookieName = () => `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}authjs.session-token`;

const getAuthenticatedEmail = async (req: Request) => {
  const authorization = req.header('authorization');
  const secret = process.env.AUTH_SECRET;

  if (!secret) return null;

  if (authorization?.startsWith('Bearer ')) {
    const token = await getToken({
      req: { headers: req.headers as Record<string, string> },
      secret,
      cookieName: authCookieName(),
      salt: authCookieName(),
      secureCookie: process.env.NODE_ENV === 'production',
    });
    if (typeof token?.email === 'string') return token.email.toLowerCase();
  }

  const session = await getSession(req, authConfig);
  return session?.user?.email?.toLowerCase() || null;
};

export const requireEmployee = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const email = await getAuthenticatedEmail(req);
    if (!email) throw new HttpError(401, 'Authentication is required');

    const configuredAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const isConfiguredAdmin = Boolean(configuredAdminEmail && email === configuredAdminEmail);
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    let employee = data as Employee | null;

    // The configured administrator is an explicit server-side identity. Provision
    // it on first sign-in so it is never redirected as an unapproved employee.
    if (!employee && isConfiguredAdmin) {
      const { data: admin, error: adminError } = await supabase
        .from('employees')
        .upsert({
          email,
          full_name: process.env.ADMIN_FULL_NAME?.trim() || 'Platform Administrator',
          role: 'admin',
          department: process.env.ADMIN_DEPARTMENT?.trim() || null,
          position: process.env.ADMIN_POSITION?.trim() || null,
          is_active: true,
        }, { onConflict: 'email' })
        .select('*')
        .single();

      if (adminError) throw adminError;
      employee = admin as Employee;
    }

    if (!employee || !employee.is_active) throw new HttpError(403, 'Your employee account is not active');

    // ADMIN_EMAIL takes precedence over an older employee row with role=employee.
    (req as AuthenticatedRequest).employee = isConfiguredAdmin ? { ...employee, role: 'admin' } : employee;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const employee = (req as AuthenticatedRequest).employee;
  if (!employee || employee.role !== 'admin') {
    return next(new HttpError(403, 'Administrator access is required'));
  }
  return next();
};
