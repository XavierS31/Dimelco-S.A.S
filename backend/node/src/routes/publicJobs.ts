import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import multer from 'multer';
import { HttpError } from '../lib/http.js';
import { getSupabase } from '../lib/supabase.js';
import { applicationLimiter } from '../middleware/rateLimiter.js';
import { applicationSchema, uuidSchema } from '../schemas.js';

const acceptedResumeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!acceptedResumeTypes.has(file.mimetype)) {
      callback(new HttpError(400, 'Resume must be a PDF, DOC, or DOCX file'));
      return;
    }
    callback(null, true);
  },
});

const extensionFor = (mimeType: string) => {
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType === 'application/msword') return 'doc';
  return 'docx';
};

export const publicJobsRouter = Router();

publicJobsRouter.get('/', async (_req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from('jobs')
      .select('id, title, department, location, type, description, requirements, created_at')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ jobs: data ?? [] });
  } catch (err) {
    console.error('Jobs fetch error:', err);
    return res.status(500).json({
      error: 'Failed to fetch jobs',
      details: err instanceof Error ? err.message : err,
    });
  }
});

publicJobsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const { data, error } = await getSupabase()
      .from('jobs')
      .select('id, title, department, location, type, description, requirements, created_at')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new HttpError(404, 'Job opening not found');
    res.json({ job: data });
  } catch (error) {
    next(error);
  }
});

publicJobsRouter.post('/:id/apply', applicationLimiter, upload.single('resume'), async (req, res, next) => {
  let uploadedPath: string | undefined;
  try {
    const id = uuidSchema.parse(req.params.id);
    const application = applicationSchema.parse(req.body);
    if (!req.file) throw new HttpError(400, 'A resume file is required');

    const supabase = getSupabase();
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('id')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (jobError) throw jobError;
    if (!job) throw new HttpError(404, 'Job opening not found');

    uploadedPath = `${id}/${randomUUID()}.${extensionFor(req.file.mimetype)}`;
    const { error: uploadError } = await supabase.storage.from('resumes').upload(uploadedPath, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    });
    if (uploadError) throw new HttpError(502, 'Unable to store the resume file');

    const { data, error } = await supabase
      .from('applications')
      .insert({ ...application, job_id: id, resume_url: uploadedPath })
      .select('id, status, created_at')
      .single();

    if (error) throw error;
    res.status(201).json({ application: data });
  } catch (error) {
    if (uploadedPath) {
      void getSupabase().storage.from('resumes').remove([uploadedPath]);
    }
    next(error);
  }
});
