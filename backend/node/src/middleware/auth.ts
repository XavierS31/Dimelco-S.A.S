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

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    if (!data || !data.is_active) throw new HttpError(403, 'Your employee account is not active');

    (req as AuthenticatedRequest).employee = data as Employee;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const employee = (req as AuthenticatedRequest).employee;
  const isSeedAdmin = employee?.email === 'xaviersotoba31@gmail.com';
  if (!employee || (!isSeedAdmin && employee.role !== 'admin')) {
    return next(new HttpError(403, 'Administrator access is required'));
  }
  return next();
};
