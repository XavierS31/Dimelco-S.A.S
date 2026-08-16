import { ExpressAuth, type ExpressAuthConfig } from '@auth/express';
import Google from '@auth/express/providers/google';
import './env.js';

const googleClientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET;
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
const frontendOrigin = new URL(frontendUrl).origin;
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
  // Auth.js prefixes custom pages with the request origin, so these must stay
  // relative; absolute values produce malformed concatenated redirect URLs.
  pages: {
    signIn: '/login',
    error: '/login',
  },
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

export const authHandler = ExpressAuth(authConfig);

export const hasAuthProvider = () => hasGoogleCredentials;
