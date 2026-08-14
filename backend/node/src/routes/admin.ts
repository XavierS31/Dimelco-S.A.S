import { Router } from 'express';
import { HttpError } from '../lib/http.js';
import { getSupabase } from '../lib/supabase.js';
import { requireAdmin, requireEmployee } from '../middleware/auth.js';
import { applicationStatusSchema, contactMessageStatusSchema, jobCreateSchema, jobUpdateSchema, projectCreateSchema, projectUpdateSchema, uuidSchema } from '../schemas.js';

const applicationStatuses = ['pending', 'reviewed', 'rejected', 'hired'] as const;
const projectStatuses = ['planning', 'active', 'completed'] as const;

const withResumeDownloadUrl = async (application: Record<string, unknown>) => {
  const { resume_url: resumePath, ...safeApplication } = application;
  if (typeof resumePath !== 'string' || !resumePath) return { ...safeApplication, resume_download_url: null };

  const { data, error } = await getSupabase().storage.from('resumes').createSignedUrl(resumePath, 60 * 10);
  if (error) throw error;
  return { ...safeApplication, resume_download_url: data.signedUrl };
};

export const adminRouter = Router();

adminRouter.use(requireEmployee, requireAdmin);

adminRouter.get('/jobs', async (_req, res, next) => {
  try {
    const { data, error } = await getSupabase().from('jobs').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ jobs: data ?? [] });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/contact-messages', async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const messageStatuses = ['new', 'reviewed', 'responded'];
    if (status && !messageStatuses.includes(status)) throw new HttpError(400, 'Invalid contact message status filter');
    let query = getSupabase()
      .from('contact_messages')
      .select('id, full_name, company, email, subject, message, status, created_at')
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ messages: data ?? [] });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/contact-messages/:id', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const update = contactMessageStatusSchema.parse(req.body);
    const { data, error } = await getSupabase()
      .from('contact_messages')
      .update(update)
      .eq('id', id)
      .select('id, status')
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new HttpError(404, 'Contact message not found');
    res.json({ message: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/projects', async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const scope = typeof req.query.scope === 'string' ? req.query.scope : undefined;
    if (status && !projectStatuses.includes(status as (typeof projectStatuses)[number])) throw new HttpError(400, 'Invalid project status filter');
    if (scope && scope !== 'open') throw new HttpError(400, 'Invalid project scope filter');

    let query = getSupabase()
      .from('projects')
      .select('id, title, location, description, status, completed_at, created_at')
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    if (scope === 'open') query = query.in('status', ['planning', 'active']);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ projects: data ?? [] });
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/projects', async (req, res, next) => {
  try {
    const project = projectCreateSchema.parse(req.body);
    const { data, error } = await getSupabase().from('projects').insert(project).select('*').single();
    if (error) throw error;
    res.status(201).json({ project: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/projects/:id', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const update = projectUpdateSchema.parse(req.body);
    const values = update.status === 'completed'
      ? { ...update, completed_at: new Date().toISOString() }
      : update.status
        ? { ...update, completed_at: null }
        : update;
    const { data, error } = await getSupabase().from('projects').update(values).eq('id', id).select('*').maybeSingle();
    if (error) throw error;
    if (!data) throw new HttpError(404, 'Project not found');
    res.json({ project: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/projects/:id/finalize', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const { data, error } = await getSupabase()
      .from('projects')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', id)
      .select('id, title, location, description, status, completed_at, created_at')
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new HttpError(404, 'Project not found');
    res.json({ project: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/applications', async (req, res, next) => {
  try {
    const requestedStatus = typeof req.query.status === 'string' ? req.query.status : undefined;
    if (requestedStatus && !applicationStatuses.includes(requestedStatus as (typeof applicationStatuses)[number])) {
      throw new HttpError(400, 'Invalid application status filter');
    }

    let query = getSupabase()
      .from('applications')
      .select('id, full_name, email, phone, cover_letter, resume_url, status, created_at, jobs(id, title, department, location, type)')
      .order('created_at', { ascending: false });
    if (requestedStatus) query = query.eq('status', requestedStatus);

    const { data, error } = await query;
    if (error) throw error;
    const applications = await Promise.all((data ?? []).map((application) => withResumeDownloadUrl(application as Record<string, unknown>)));
    res.json({ applications });
  } catch (error) {
    next(error);
  }
});

adminRouter.patch('/applications/:id', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const update = applicationStatusSchema.parse(req.body);
    const { data, error } = await getSupabase()
      .from('applications')
      .update(update)
      .eq('id', id)
      .select('id, status, created_at')
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new HttpError(404, 'Application not found');
    res.json({ application: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.post('/jobs', async (req, res, next) => {
  try {
    const job = jobCreateSchema.parse(req.body);
    const { data, error } = await getSupabase().from('jobs').insert(job).select('*').single();
    if (error) throw error;
    res.status(201).json({ job: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.put('/jobs/:id', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const update = jobUpdateSchema.parse(req.body);
    const values = typeof update.is_active === 'boolean'
      ? { ...update, closed_at: update.is_active ? null : new Date().toISOString() }
      : update;
    const { data, error } = await getSupabase().from('jobs').update(values).eq('id', id).select('*').maybeSingle();
    if (error) throw error;
    if (!data) throw new HttpError(404, 'Job opening not found');
    res.json({ job: data });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete('/jobs/:id', async (req, res, next) => {
  try {
    const id = uuidSchema.parse(req.params.id);
    const supabase = getSupabase();
    const { data: applications, error: applicationsError } = await supabase
      .from('applications')
      .select('resume_url')
      .eq('job_id', id);
    if (applicationsError) throw applicationsError;

    const { error, count } = await supabase.from('jobs').delete({ count: 'exact' }).eq('id', id);
    if (error) throw error;
    if (!count) throw new HttpError(404, 'Job opening not found');

    const paths = (applications ?? []).flatMap((application) => application.resume_url ? [application.resume_url] : []);
    if (paths.length) await supabase.storage.from('resumes').remove(paths);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/employees', async (_req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('employees')
      .select('id, email, full_name, role, department, position, is_active, created_at')
      .order('full_name');
    if (error) throw error;
    res.json({ employees: data ?? [] });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/reports', async (_req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('activity_reports')
      .select('id, task_description, hours_logged, report_date, created_at, employees(full_name, email, department, position)')
      .order('report_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ reports: data ?? [] });
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/daily-reports', async (req, res, next) => {
  try {
    const reportDate = typeof req.query.date === 'string' ? req.query.date : new Date().toISOString().slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(reportDate)) throw new HttpError(400, 'Invalid report date');
    const { data, error } = await getSupabase()
      .from('activity_reports')
      .select('id, task_description, hours_logged, report_date, created_at, employees(full_name, email, department, position)')
      .eq('report_date', reportDate)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ reports: data ?? [], report_date: reportDate });
  } catch (error) {
    next(error);
  }
});
