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

const normalizeHost = (host?: string) => (host ? normalizeOrigin(`https://${host.trim()}`) : undefined);

const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const allowedOrigins = new Set(
  [
    'https://dimelcosas.com',
    'https://www.dimelcosas.com',
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    ...configuredOrigins,
  ]
    .map(normalizeOrigin)
    .filter((origin): origin is string => Boolean(origin)),
);

const isApiGatewayOrigin = (origin: string) => /^https:\/\/[a-z0-9-]+\.execute-api\.us-east-2\.amazonaws\.com$/i.test(origin);
const isLocalDevelopmentOrigin = (origin: string) => /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

const isAllowedOrigin = (origin?: string) => Boolean(
  origin && (
    allowedOrigins.has(origin) ||
    isApiGatewayOrigin(origin) ||
    (process.env.NODE_ENV !== 'production' && isLocalDevelopmentOrigin(origin))
  ),
);

export const corsOptions: CorsOptionsDelegate<Request> = (req, callback) => {
  const origin = normalizeOrigin(req.headers.origin);
  const referer = normalizeOrigin(req.headers.referer);
  const host = normalizeHost(req.headers.host);
  const requestOrigin = origin ?? referer ?? host;

  // Temporary diagnostics for API Gateway and browser-origin mismatches.
  console.log('Incoming Origin:', req.headers.origin, 'Allowed:', allowedOrigins);

  if (requestOrigin && !isAllowedOrigin(requestOrigin)) {
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
