import { z } from 'zod';

export const uuidSchema = z.string().uuid();

const requirementsSchema = z.array(z.string().trim().min(1).max(180)).max(20).default([]);

export const jobCreateSchema = z.object({
  title: z.string().trim().min(3).max(140),
  department: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(140),
  type: z.string().trim().min(2).max(60),
  description: z.string().trim().min(20).max(8000),
  requirements: requirementsSchema,
  is_active: z.boolean().optional(),
});

export const jobUpdateSchema = jobCreateSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one job field is required',
});

export const applicationSchema = z.object({
  full_name: z.string().trim().min(3).max(160),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  phone: z.string().trim().min(7).max(32),
  cover_letter: z.string().trim().max(5000).optional().or(z.literal('')),
});

export const applicationStatusSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'rejected', 'hired']),
});

export const reportSchema = z.object({
  task_description: z.string().trim().min(5).max(1000),
  hours_logged: z.coerce.number().positive().max(99.99),
  report_date: z.string().date().optional(),
});

export const contactMessageSchema = z.object({
  full_name: z.string().trim().min(3).max(160),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(5000),
});

export const contactMessageStatusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'responded']),
});

export const projectCreateSchema = z.object({
  title: z.string().trim().min(3).max(180),
  location: z.string().trim().min(2).max(180),
  description: z.string().trim().min(20).max(5000),
  status: z.enum(['planning', 'active', 'completed']).default('planning'),
});

export const projectUpdateSchema = projectCreateSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one project field is required',
});

const chatHistoryItemSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string().trim().min(1).max(900),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(900),
  history: z.array(chatHistoryItemSchema).max(6).default([]),
});
