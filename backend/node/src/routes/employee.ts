import { Router } from 'express';
import { HttpError } from '../lib/http.js';
import { getSupabase } from '../lib/supabase.js';
import { type AuthenticatedRequest, requireEmployee } from '../middleware/auth.js';
import { reportSchema } from '../schemas.js';

export const employeeRouter = Router();

employeeRouter.use(requireEmployee);

employeeRouter.get('/me', (req, res) => {
  const employee = (req as AuthenticatedRequest).employee;
  res.json({ employee });
});

employeeRouter.get('/reports', async (req, res, next) => {
  try {
    const employee = (req as AuthenticatedRequest).employee;
    const { data, error } = await getSupabase()
      .from('activity_reports')
      .select('id, task_description, hours_logged, report_date, created_at')
      .eq('employee_id', employee.id)
      .order('report_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ reports: data ?? [] });
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/company-overview', async (_req, res, next) => {
  try {
    const supabase = getSupabase();
    const [{ data: reports, error: reportsError }, { data: projects, error: projectsError }] = await Promise.all([
      supabase
        .from('activity_reports')
        .select('id, task_description, hours_logged, report_date, created_at, employees(full_name, department)')
        .order('report_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('projects')
        .select('id, title, location, description, status, created_at')
        .in('status', ['planning', 'active'])
        .order('created_at', { ascending: false }),
    ]);

    if (reportsError) throw reportsError;
    if (projectsError) throw projectsError;
    res.json({ reports: reports ?? [], projects: projects ?? [] });
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/company-reports', async (_req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('activity_reports')
      .select('id, task_description, hours_logged, report_date, created_at, employees(full_name, department)')
      .order('report_date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ reports: data ?? [] });
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/projects', async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined;
    const validStatuses = ['planning', 'active', 'completed'];
    if (status && !validStatuses.includes(status)) throw new HttpError(400, 'Invalid project status filter');
    let query = getSupabase()
      .from('projects')
      .select('id, title, location, description, status, completed_at, created_at')
      .order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ projects: data ?? [] });
  } catch (error) {
    next(error);
  }
});

employeeRouter.get('/contact-messages', async (_req, res, next) => {
  try {
    const { data, error } = await getSupabase()
      .from('contact_messages')
      .select('id, full_name, company, email, subject, message, status, created_at')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ messages: data ?? [] });
  } catch (error) {
    next(error);
  }
});

employeeRouter.post('/reports', async (req, res, next) => {
  try {
    const employee = (req as AuthenticatedRequest).employee;
    const report = reportSchema.parse(req.body);
    const { data, error } = await getSupabase()
      .from('activity_reports')
      .insert({ ...report, employee_id: employee.id })
      .select('id, task_description, hours_logged, report_date, created_at')
      .single();

    if (error) throw error;
    res.status(201).json({ report: data });
  } catch (error) {
    next(error);
  }
});
