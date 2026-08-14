-- Project closure and job closure audit fields.
ALTER TABLE public.projects
    ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

ALTER TABLE public.jobs
    ADD COLUMN IF NOT EXISTS closed_at TIMESTAMPTZ;

UPDATE public.projects
SET completed_at = COALESCE(completed_at, created_at)
WHERE status = 'completed' AND completed_at IS NULL;

UPDATE public.jobs
SET closed_at = COALESCE(closed_at, created_at)
WHERE is_active = false AND closed_at IS NULL;

-- Queries backing the admin subsections: active/completed projects,
-- registered vacancies, and daily activity reports.
CREATE INDEX IF NOT EXISTS projects_status_completed_at_idx
    ON public.projects (status, completed_at DESC);

CREATE INDEX IF NOT EXISTS jobs_active_closed_at_idx
    ON public.jobs (is_active, closed_at DESC);

CREATE INDEX IF NOT EXISTS activity_reports_report_date_created_at_idx
    ON public.activity_reports (report_date DESC, created_at DESC);
