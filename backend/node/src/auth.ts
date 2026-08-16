import { ExpressAuth, type ExpressAuthConfig } from '@auth/express';
import Google from '@auth/express/providers/google';
import './env.js';

const googleClientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET;
// AUTH_URL is the canonical public Auth.js endpoint (including /api/auth).
// NEXTAUTH_URL remains supported for backwards compatibility.
const authUrl = process.env.AUTH_URL || process.env.NEXTAUTH_URL;
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
const hasGoogleCredentials = Boolean(googleClientId && googleClientSecret);

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    csrfToken: {
      options: {
        sameSite: 'lax',
        secure: true,
      },
    },
  },
  session: { strategy: 'jwt' },
  // Auth.js GET /signin failures and fallback navigation must return to the
  // custom browser UI rather than render a page on the API Gateway origin.
  pages: {
    signIn: `${frontendUrl}/login`,
    error: `${frontendUrl}/login`,
  },
  providers: hasGoogleCredentials
    ? [Google({ clientId: googleClientId, clientSecret: googleClientSecret })]
    : [],
  callbacks: {
    async jwt({ token }) {
      if (token.email) token.email = token.email.toLowerCase();
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Prefer the browser application, then the canonical API Gateway Auth.js
      // endpoint. The latter preserves a gateway stage/base path if no frontend
      // URL is configured or Auth.js receives an unexpected callback URL.
      const fallbackUrl = frontendUrl ?? authUrl ?? baseUrl;

      if (url.startsWith('/')) return `${fallbackUrl}${url}`;
      if (frontendUrl && url.startsWith(frontendUrl)) return url;
      if (authUrl && url.startsWith(authUrl)) return url;
      if (url.startsWith(baseUrl)) return url;
      return fallbackUrl;
    },
  },
};

export const authHandler = ExpressAuth(authConfig);

export const hasAuthProvider = () => hasGoogleCredentials;
