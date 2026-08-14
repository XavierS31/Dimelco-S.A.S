import { Router } from 'express';
import { getSupabase } from '../lib/supabase.js';
import { contactMessageLimiter } from '../middleware/rateLimiter.js';
import { contactMessageSchema } from '../schemas.js';

export const contactRouter = Router();

contactRouter.post('/', contactMessageLimiter, async (req, res, next) => {
  try {
    const message = contactMessageSchema.parse(req.body);
    const { data, error } = await getSupabase()
      .from('contact_messages')
      .insert(message)
      .select('id, status, created_at')
      .single();
    if (error) throw error;
    res.status(201).json({ message: data });
  } catch (error) {
    next(error);
  }
});
