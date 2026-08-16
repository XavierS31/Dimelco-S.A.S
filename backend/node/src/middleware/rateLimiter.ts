import { rateLimit } from 'express-rate-limit';

const message = (error: string) => ({ error });
// API Gateway supplies the client IP through trusted forwarding headers. Express
// is configured to trust that proxy, so disable only this compatibility warning.
const validation = { trustProxy: false };

export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: validation,
  message: message('Too many requests. Please try again later.'),
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 25,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: validation,
  message: message('Too many authentication attempts. Please try again later.'),
});

export const applicationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: validation,
  message: message('Application limit reached. Please try again later.'),
});

export const contactMessageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: validation,
  message: message('Message limit reached. Please try again later.'),
});

// Each request can generate an LLM response. This stricter budget protects
// the Gemini quota even when the general API limit has not been reached.
export const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 12,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  validate: validation,
  message: message('Chat limit reached. Please try again in an hour.'),
});
