import { ExpressAuth, type ExpressAuthConfig } from '@auth/express';
import type { RequestHandler } from 'express';
import Google from '@auth/express/providers/google';
import './env.js';

const stripAuthBasePath = (value: string) => {
  try {
    const url = new URL(value);
    url.pathname = url.pathname.replace(/\/api\/auth\/?$/, '') || '/';
    return url.toString().replace(/\/$/, '');
  } catch {
    return value;
  }
};

const defaultAuthUrl = 'https://api.dimelcosas.com';

// ExpressAuth reads process.env directly. Strip the mounted Auth.js path before
// it initializes so it can add `/api/auth` exactly once (while retaining an
// API Gateway stage path such as `/prod`).
const authUrlKey = process.env.AUTH_URL ? 'AUTH_URL' : process.env.NEXTAUTH_URL ? 'NEXTAUTH_URL' : undefined;
if (authUrlKey) process.env[authUrlKey] = stripAuthBasePath(process.env[authUrlKey]!);
else process.env.AUTH_URL = defaultAuthUrl;

const googleClientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET;
const frontendUrl = (process.env.FRONTEND_URL || 'https://www.dimelcosas.com').replace(/\/$/, '');
const frontendOrigin = new URL(frontendUrl).origin;
const hasGoogleCredentials = Boolean(googleClientId && googleClientSecret);

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    csrfToken: {
      name: process.env.NODE_ENV === 'production' ? '__Host-authjs.csrf-token' : 'authjs.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  session: { strategy: 'jwt' },
  providers: hasGoogleCredentials
    ? [Google({ clientId: googleClientId, clientSecret: googleClientSecret })]
    : [],
  callbacks: {
    async jwt({ token }) {
      if (token.email) token.email = token.email.toLowerCase();
      return token;
    },
    async redirect({ url }) {
      // Keep application redirects on the public frontend, never on the API
      // Gateway origin. Relative callback paths resolve against the frontend.
      if (url.startsWith('/')) return `${frontendUrl}${url}`;
      if (new URL(url).origin === frontendOrigin) return url;
      return frontendUrl;
    },
  },
};

const expressAuthHandler = ExpressAuth(authConfig);

// Auth.js error pages are generated from the API request origin. Return those
// errors to the SPA instead, preserving the error query for the login UI.
export const authHandler: RequestHandler = (req, res, next) => {
  if (req.method === 'GET' && req.path === '/error') {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === 'string') query.set(key, value);
    }
    const suffix = query.size ? `?${query}` : '';
    res.redirect(302, `${frontendUrl}/login${suffix}`);
    return;
  }

  void expressAuthHandler(req, res, next);
};

export const hasAuthProvider = () => hasGoogleCredentials;
