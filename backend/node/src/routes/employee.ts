import { Router } from 'express';
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
