import { ExpressAuth, type ExpressAuthConfig } from '@auth/express';
import Google from '@auth/express/providers/google';

const hasGoogleCredentials = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: hasGoogleCredentials
    ? [Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })]
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
