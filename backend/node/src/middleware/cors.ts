import type { Request } from 'express';
import type { CorsOptions, CorsOptionsDelegate } from 'cors';
import { HttpError } from '../lib/http.js';

const normalizeOrigin = (value?: string) => {
  if (!value) return undefined;

  try {
    return new URL(value.trim()).origin;
  } catch {
    return undefined;
  }
};

const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const allowedOrigins = new Set(
  [
    'https://dimelcosas.com',
    'https://www.dimelcosas.com',
    'https://api.dimelcosas.com',
    'https://accounts.google.com',
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    ...configuredOrigins,
  ]
    .map(normalizeOrigin)
    .filter((origin): origin is string => Boolean(origin)),
);

const isLocalDevelopmentOrigin = (origin: string) => /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

const isAllowedOrigin = (origin?: string) => Boolean(
  origin && (
    allowedOrigins.has(origin) ||
    (process.env.NODE_ENV !== 'production' && isLocalDevelopmentOrigin(origin))
  ),
);

export const corsOptions: CorsOptionsDelegate<Request> = (req, callback) => {
  const origin = normalizeOrigin(req.headers.origin);

  // OAuth redirects and direct server calls commonly have no Origin header.
  // Only validate a CORS origin when the browser actually sends one.
  if (origin && !isAllowedOrigin(origin)) {
    callback(new HttpError(403, 'Origin is not allowed'));
    return;
  }

  callback(null, {
    origin: true,
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    optionsSuccessStatus: 204,
  });
};
