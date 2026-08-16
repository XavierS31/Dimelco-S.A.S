import { Router, type RequestHandler } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import { getSupabase } from '../lib/supabase.js';
import { corsOptions } from '../middleware/cors.js';
import { contactMessageLimiter } from '../middleware/rateLimiter.js';
import { contactMessageSchema } from '../schemas.js';

export const contactRouter = Router();

const contactCorsHeaders: RequestHandler = (_req, res, next) => {
  if (_req.headers.origin) res.setHeader('Access-Control-Allow-Origin', _req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
  next();
};

contactRouter.options('/', cors(corsOptions));

contactRouter.post('/', cors(corsOptions), contactCorsHeaders, contactMessageLimiter, async (req, res) => {
  try {
    const message = contactMessageSchema.parse(req.body);
    const { data, error } = await getSupabase()
      .from('contact_messages')
      .insert(message)
      .select('id, status, created_at')
      .single();
    if (error) throw error;
    res.status(201).json({ message: data });
  } catch (err) {
    console.error('Contact request error:', err);
    if (err instanceof ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: err.flatten() });
    }
    return res.status(500).json({
      error: 'Failed to process contact request',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});
