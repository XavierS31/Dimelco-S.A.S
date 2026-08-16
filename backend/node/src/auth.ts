import { ExpressAuth, type ExpressAuthConfig } from '@auth/express';
import Google from '@auth/express/providers/google';
import './env.js';

const googleClientId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET;
const hasGoogleCredentials = Boolean(googleClientId && googleClientSecret);

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: hasGoogleCredentials
    ? [Google({ clientId: googleClientId, clientSecret: googleClientSecret })]
    : [],
  callbacks: {
    async jwt({ token }) {
      if (token.email) token.email = token.email.toLowerCase();
      return token;
    },
    async redirect({ url, baseUrl }) {
      const frontendUrl = process.env.FRONTEND_URL;
      if (frontendUrl && url.startsWith(frontendUrl)) return url;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};

export const authHandler = ExpressAuth(authConfig);

export const hasAuthProvider = () => hasGoogleCredentials;
