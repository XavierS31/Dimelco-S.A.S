import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { api, signOut } from '../lib/api';

type Employee = { email: string; role: 'admin' | 'employee'; full_name: string };
type Job = { id: string; title: string; department: string; location: string; type: string; description: string; requirements: string[]; is_active: boolean };
type Application = { id: string; full_name: string; email: string; phone: string; cover_letter: string | null; status: 'pending' | 'reviewed' | 'rejected' | 'hired'; created_at: string; jobs: { title: string; department: string } | null; resume_download_url: string | null };
type Report = { id: string; task_description: string; hours_logged: number; report_date: string; employees: { full_name: string; email: string; department: string | null; position: string | null } | null };
type StaffMember = { id: string; full_name: string; email: string; role: string; department: string | null; position: string | null; is_active: boolean };
type Tab = 'applications' | 'jobs' | 'reports';

const statuses = ['pending', 'reviewed', 'rejected', 'hired'] as const;
const emptyJob = { title: '', department: '', location: '', type: 'Tiempo completo', description: '', requirements: '' };

export default function AdminPage() {
  const [access, setAccess] = useState<'loading' | 'allowed' | 'denied' | 'error'>('loading');
  const [tab, setTab] = useState<Tab>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<'all' | Application['status']>('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [employees, setEmployees] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState(emptyJob);

  useEffect(() => {
    api<{ employee: Employee }>('/api/employee/me')
      .then(({ employee }) => setAccess(employee.role === 'admin' || employee.email === 'xaviersotoba31@gmail.com' ? 'allowed' : 'denied'))
      .catch((error) => setAccess(error instanceof Error && 'status' in error && error.status === 403 ? 'denied' : 'error'));
  }, []);

  useEffect(() => {
    if (access !== 'allowed') return;
    setLoading(true);
    setNotice('');
    const load = async () => {
      if (tab === 'applications') {
        const suffix = applicationStatus === 'all' ? '' : `?status=${applicationStatus}`;
        const { applications: data } = await api<{ applications: Application[] }>(`/api/admin/applications${suffix}`);
        setApplications(data);
      }
      if (tab === 'jobs') {
        const { jobs: data } = await api<{ jobs: Job[] }>('/api/admin/jobs');
        setJobs(data);
      }
      if (tab === 'reports') {
        const [{ reports: reportData }, { employees: employeeData }] = await Promise.all([
          api<{ reports: Report[] }>('/api/admin/reports'),
          api<{ employees: StaffMember[] }>('/api/admin/employees'),
        ]);
        setReports(reportData);
        setEmployees(employeeData);
      }
    };
    load().catch((error) => setNotice(error instanceof Error ? error.message : 'No fue posible cargar la información.')).finally(() => setLoading(false));
  }, [access, tab, applicationStatus]);

  const updateApplication = async (id: string, status: Application['status']) => {
    setNotice('');
    try {
      const { application } = await api<{ application: Pick<Application, 'id' | 'status'> }>(`/api/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
      setApplications((current) => current.map((item) => item.id === id ? { ...item, status: application.status } : item));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No fue posible actualizar la postulación.');
    }
  };

  const editJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({ title: job.title, department: job.department, location: job.location, type: job.type, description: job.description, requirements: job.requirements.join('\n') });
  };

  const submitJob = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice('');
    const payload = { ...jobForm, requirements: jobForm.requirements.split('\n').map((item) => item.trim()).filter(Boolean) };
    try {
      if (editingJob) {
        const { job } = await api<{ job: Job }>(`/api/admin/jobs/${editingJob.id}`, { method: 'PUT', body: JSON.stringify(payload) });
        setJobs((current) => current.map((item) => item.id === job.id ? job : item));
        setNotice('Vacante actualizada.');
      } else {
        const { job } = await api<{ job: Job }>('/api/admin/jobs', { method: 'POST', body: JSON.stringify(payload) });
        setJobs((current) => [job, ...current]);
        setNotice('Vacante publicada.');
      }
      setEditingJob(null);
      setJobForm(emptyJob);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No fue posible guardar la vacante.');
    }
  };

  const toggleJob = async (job: Job) => {
    setNotice('');
    try {
      const { job: updated } = await api<{ job: Job }>(`/api/admin/jobs/${job.id}`, { method: 'PUT', body: JSON.stringify({ is_active: !job.is_active }) });
      setJobs((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'No fue posible actualizar la vacante.');
    }
  };

  return <PageShell>
    <PageHero tone="light" eyebrow="Administración" title="Gestione la operación del equipo." description="Revise postulaciones, publique vacantes y consulte la actividad registrada por los colaboradores." />
    <section className="section"><div className="container">
      {access === 'loading' && <div className="portal-loading"><span /><span /></div>}
      {access === 'denied' && <div className="portal-empty"><h2>Acceso restringido.</h2><p>Esta área está disponible únicamente para administradores autorizados.</p><Link className="button button--primary" to="/dashboard">Ir a mi panel</Link></div>}
      {access === 'error' && <div className="portal-empty"><h2>No fue posible validar el acceso.</h2><p>Inicie sesión con una cuenta autorizada e intente nuevamente.</p><Link className="button button--secondary" to="/login">Ir al ingreso</Link></div>}
      {access === 'allowed' && <div className="admin-workspace"><div className="admin-workspace__bar"><div className="admin-tabs" role="tablist" aria-label="Módulos de administración"><button className={tab === 'applications' ? 'is-active' : ''} type="button" role="tab" aria-selected={tab === 'applications'} onClick={() => setTab('applications')}>Postulaciones</button><button className={tab === 'jobs' ? 'is-active' : ''} type="button" role="tab" aria-selected={tab === 'jobs'} onClick={() => setTab('jobs')}>Vacantes</button><button className={tab === 'reports' ? 'is-active' : ''} type="button" role="tab" aria-selected={tab === 'reports'} onClick={() => setTab('reports')}>Actividad</button></div><button className="text-button" type="button" onClick={() => void signOut()}>Cerrar sesión</button></div>
        {notice && <p className="admin-notice" role="status">{notice}</p>}
        {loading && <div className="portal-loading portal-loading--compact"><span /><span /></div>}
        {!loading && tab === 'applications' && <section className="admin-panel"><div className="portal-section__heading"><div><p className="eyebrow eyebrow--green">Seguimiento</p><h2>Postulaciones</h2></div><label className="inline-control">Estado<select value={applicationStatus} onChange={(event) => setApplicationStatus(event.target.value as typeof applicationStatus)}><option value="all">Todas</option>{statuses.map((status) => <option value={status} key={status}>{status}</option>)}</select></label></div>{applications.length === 0 ? <div className="portal-empty portal-empty--compact"><h3>No hay postulaciones en este estado.</h3><p>Las nuevas aplicaciones aparecerán aquí.</p></div> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Persona</th><th>Vacante</th><th>Contacto</th><th>Estado</th><th>Hoja de vida</th></tr></thead><tbody>{applications.map((item) => <tr key={item.id}><td><strong>{item.full_name}</strong><small>{new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(item.created_at))}</small></td><td>{item.jobs?.title || 'Vacante eliminada'}<small>{item.jobs?.department || ''}</small></td><td><a href={`mailto:${item.email}`}>{item.email}</a><small>{item.phone}</small></td><td><select aria-label={`Estado de ${item.full_name}`} value={item.status} onChange={(event) => void updateApplication(item.id, event.target.value as Application['status'])}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td><td>{item.resume_download_url ? <a className="table-link" href={item.resume_download_url} target="_blank" rel="noreferrer">Descargar</a> : 'No disponible'}</td></tr>)}</tbody></table></div>}</section>}
        {!loading && tab === 'jobs' && <section className="admin-panel admin-panel--jobs"><div><p className="eyebrow eyebrow--green">Tablero de vacantes</p><h2>{editingJob ? 'Editar vacante' : 'Publicar una vacante'}</h2><form className="job-form" onSubmit={submitJob}><label>Título<input value={jobForm.title} onChange={(event) => setJobForm({ ...jobForm, title: event.target.value })} required /></label><label>Área<input value={jobForm.department} onChange={(event) => setJobForm({ ...jobForm, department: event.target.value })} required /></label><label>Ubicación<input value={jobForm.location} onChange={(event) => setJobForm({ ...jobForm, location: event.target.value })} required /></label><label>Tipo<input value={jobForm.type} onChange={(event) => setJobForm({ ...jobForm, type: event.target.value })} required /></label><label className="full">Descripción<textarea rows={5} value={jobForm.description} onChange={(event) => setJobForm({ ...jobForm, description: event.target.value })} required /></label><label className="full">Requisitos, uno por línea<textarea rows={4} value={jobForm.requirements} onChange={(event) => setJobForm({ ...jobForm, requirements: event.target.value })} /></label><div className="full job-form__actions">{editingJob && <button className="button button--secondary" type="button" onClick={() => { setEditingJob(null); setJobForm(emptyJob); }}>Cancelar</button>}<button className="button button--primary" type="submit">{editingJob ? 'Guardar cambios' : 'Publicar vacante'}</button></div></form></div><div className="admin-job-list"><h3>Vacantes registradas</h3>{jobs.length === 0 ? <p>No hay vacantes registradas.</p> : jobs.map((job) => <article key={job.id}><div><strong>{job.title}</strong><span>{job.department} · {job.location}</span></div><div><span className={job.is_active ? 'status status--active' : 'status'}>{job.is_active ? 'Publicada' : 'Pausada'}</span><button className="text-button" type="button" onClick={() => editJob(job)}>Editar</button><button className="text-button" type="button" onClick={() => void toggleJob(job)}>{job.is_active ? 'Pausar' : 'Publicar'}</button></div></article>)}</div></section>}
        {!loading && tab === 'reports' && <section className="admin-panel"><div className="portal-section__heading"><div><p className="eyebrow eyebrow--green">Monitoreo</p><h2>Actividad del equipo</h2></div><span>{reports.length} registros</span></div>{reports.length === 0 ? <div className="portal-empty portal-empty--compact"><h3>No hay actividad registrada.</h3><p>Los reportes del equipo aparecerán en esta vista.</p></div> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Colaborador</th><th>Actividad</th><th>Fecha</th><th>Horas</th></tr></thead><tbody>{reports.map((report) => <tr key={report.id}><td><strong>{report.employees?.full_name || 'Colaborador eliminado'}</strong><small>{report.employees?.department || report.employees?.position || ''}</small></td><td>{report.task_description}</td><td>{new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(`${report.report_date}T12:00:00`))}</td><td>{report.hours_logged} h</td></tr>)}</tbody></table></div>}<div className="staff-summary"><h3>Colaboradores</h3><p>{employees.filter((employee) => employee.is_active).length} activos de {employees.length} registrados.</p></div></section>}
      </div>}
    </div></section>
  </PageShell>;
}
