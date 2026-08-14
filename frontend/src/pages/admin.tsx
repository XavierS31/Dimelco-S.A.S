import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import WorkspaceLayout from '../components/WorkspaceLayout';
import { api, signOut } from '../lib/api';

type Employee = { full_name: string; role: 'admin' | 'employee'; department: string | null; position: string | null };
type Report = { id: string; task_description: string; hours_logged: number; report_date: string; employees: { full_name: string; department: string | null } | null };
type Project = { id: string; title: string; location: string; description: string; status: 'planning' | 'active' | 'completed'; completed_at: string | null };
type Message = { id: string; full_name: string; company: string | null; email: string; subject: string; message: string; status: 'new' | 'reviewed' | 'responded'; created_at: string };
type Job = { id: string; title: string; department: string; location: string; type: string; description: string; requirements: string[]; is_active: boolean; closed_at: string | null };
type Application = { id: string; full_name: string; email: string; phone: string; status: 'pending' | 'reviewed' | 'rejected' | 'hired'; created_at: string; jobs: { title: string } | null; resume_download_url: string | null };
type Section = 'inicio' | 'actividad' | 'proyectos-activos' | 'proyectos-finalizados' | 'crear-proyecto' | 'mensajes-todos' | 'mensajes-revisados' | 'mensajes-respondidos' | 'vacantes-registradas' | 'publicar-vacante' | 'postulaciones-todas' | 'postulaciones-pendientes' | 'postulaciones-revisadas' | 'postulaciones-rechazadas' | 'postulaciones-contratadas';

const navigation = [
  { id: 'inicio', label: 'Resumen diario' },
  { id: 'actividad', label: 'Reportes diarios' },
  { id: 'proyectos', label: 'Proyectos', children: [{ id: 'proyectos-activos', label: 'Proyectos activos' }, { id: 'proyectos-finalizados', label: 'Proyectos terminados' }, { id: 'crear-proyecto', label: 'Crear proyecto' }] },
  { id: 'mensajes', label: 'Mensajes', children: [{ id: 'mensajes-todos', label: 'Todos los mensajes' }, { id: 'mensajes-revisados', label: 'Revisados' }, { id: 'mensajes-respondidos', label: 'Respondidos' }] },
  { id: 'vacantes', label: 'Vacantes', children: [{ id: 'vacantes-registradas', label: 'Vacantes registradas' }, { id: 'publicar-vacante', label: 'Publicar vacante' }] },
  { id: 'postulaciones', label: 'Postulaciones', children: [{ id: 'postulaciones-todas', label: 'Todas las postulaciones' }, { id: 'postulaciones-pendientes', label: 'Pendientes' }, { id: 'postulaciones-revisadas', label: 'Revisadas' }, { id: 'postulaciones-rechazadas', label: 'Rechazadas' }, { id: 'postulaciones-contratadas', label: 'Contratadas' }] },
] as const;

const emptyJob = { title: '', department: '', location: '', type: 'Tiempo completo', description: '', requirements: '' };
const emptyProject = { title: '', location: '', description: '', status: 'planning' as 'planning' | 'active' };
const messageStatusBySection: Partial<Record<Section, Message['status']>> = { 'mensajes-revisados': 'reviewed', 'mensajes-respondidos': 'responded' };
const applicationStatusBySection: Partial<Record<Section, Application['status']>> = { 'postulaciones-pendientes': 'pending', 'postulaciones-revisadas': 'reviewed', 'postulaciones-rechazadas': 'rejected', 'postulaciones-contratadas': 'hired' };

export default function AdminPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Employee | null>(null);
  const [access, setAccess] = useState<'loading' | 'allowed' | 'denied' | 'error'>('loading');
  const [section, setSection] = useState<Section>('inicio');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState(emptyProject);

  const load = async (nextSection: Section) => {
    setLoading(true); setNotice('');
    try {
      if (nextSection === 'inicio') {
        const [{ reports: reportData }, { messages: messageData }, { jobs: jobData }, { applications: applicationData }, { projects: projectData }] = await Promise.all([
          api<{ reports: Report[] }>('/api/admin/reports'), api<{ messages: Message[] }>('/api/admin/contact-messages'), api<{ jobs: Job[] }>('/api/admin/jobs'), api<{ applications: Application[] }>('/api/admin/applications'), api<{ projects: Project[] }>('/api/admin/projects'),
        ]);
        setReports(reportData); setMessages(messageData); setJobs(jobData); setApplications(applicationData); setProjects(projectData);
      }
      if (nextSection === 'actividad') setReports((await api<{ reports: Report[] }>('/api/admin/reports')).reports);
      if (nextSection === 'proyectos-activos') setProjects((await api<{ projects: Project[] }>('/api/admin/projects?scope=open')).projects);
      if (nextSection === 'proyectos-finalizados') setProjects((await api<{ projects: Project[] }>('/api/admin/projects?status=completed')).projects);
      if (nextSection === 'crear-proyecto') setProjects((await api<{ projects: Project[] }>('/api/admin/projects?scope=open')).projects);
      if (nextSection.startsWith('mensajes-')) { const status = messageStatusBySection[nextSection]; setMessages((await api<{ messages: Message[] }>(`/api/admin/contact-messages${status ? `?status=${status}` : ''}`)).messages); }
      if (nextSection === 'vacantes-registradas' || nextSection === 'publicar-vacante') setJobs((await api<{ jobs: Job[] }>('/api/admin/jobs')).jobs);
      if (nextSection.startsWith('postulaciones-')) { const status = applicationStatusBySection[nextSection]; setApplications((await api<{ applications: Application[] }>(`/api/admin/applications${status ? `?status=${status}` : ''}`)).applications); }
    } catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible cargar esta información.'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    api<{ employee: Employee }>('/api/employee/me').then(({ employee }) => {
      if (employee.role !== 'admin') { setAccess('denied'); return; }
      setProfile(employee); setAccess('allowed'); void load('inicio');
    }).catch((error) => {
      if (error instanceof Error && 'status' in error && error.status === 401) navigate('/login', { replace: true });
      else setAccess('error');
    });
  }, [navigate]);

  const selectSection = (value: string) => { const next = value as Section; setSection(next); void load(next); };
  const editJob = (job: Job) => { setEditingJob(job); setJobForm({ title: job.title, department: job.department, location: job.location, type: job.type, description: job.description, requirements: job.requirements.join('\n') }); selectSection('publicar-vacante'); };
  const editProject = (project: Project) => { setEditingProject(project); setProjectForm({ title: project.title, location: project.location, description: project.description, status: project.status === 'active' ? 'active' : 'planning' }); selectSection('crear-proyecto'); };
  const updateMessage = async (id: string, status: Message['status']) => {
    try { const { message } = await api<{ message: Pick<Message, 'id' | 'status'> }>(`/api/admin/contact-messages/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }); const filter = messageStatusBySection[section]; setMessages((items) => filter && message.status !== filter ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, status: message.status } : item)); }
    catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible actualizar el mensaje.'); }
  };
  const updateApplication = async (id: string, status: Application['status']) => {
    try { const { application } = await api<{ application: Pick<Application, 'id' | 'status'> }>(`/api/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }); const filter = applicationStatusBySection[section]; setApplications((items) => filter && application.status !== filter ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, status: application.status } : item)); }
    catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible actualizar la postulación.'); }
  };
  const saveJob = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setNotice(''); const payload = { ...jobForm, requirements: jobForm.requirements.split('\n').map((item) => item.trim()).filter(Boolean) };
    try {
      if (editingJob) { const { job } = await api<{ job: Job }>(`/api/admin/jobs/${editingJob.id}`, { method: 'PUT', body: JSON.stringify(payload) }); setJobs((items) => items.map((item) => item.id === job.id ? job : item)); setNotice('Vacante actualizada.'); }
      else { const { job } = await api<{ job: Job }>('/api/admin/jobs', { method: 'POST', body: JSON.stringify(payload) }); setJobs((items) => [job, ...items]); setNotice('Vacante publicada.'); }
      setEditingJob(null); setJobForm(emptyJob);
    } catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible guardar la vacante.'); }
  };
  const toggleJob = async (job: Job) => {
    try { const { job: updated } = await api<{ job: Job }>(`/api/admin/jobs/${job.id}`, { method: 'PUT', body: JSON.stringify({ is_active: !job.is_active }) }); setJobs((items) => items.map((item) => item.id === updated.id ? { ...item, ...updated } : item)); }
    catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible actualizar la vacante.'); }
  };
  const saveProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setNotice('');
    try {
      if (editingProject) { const { project } = await api<{ project: Project }>(`/api/admin/projects/${editingProject.id}`, { method: 'PUT', body: JSON.stringify(projectForm) }); setProjects((items) => items.map((item) => item.id === project.id ? project : item)); setNotice('Proyecto actualizado.'); }
      else { const { project } = await api<{ project: Project }>('/api/admin/projects', { method: 'POST', body: JSON.stringify(projectForm) }); setProjects((items) => [project, ...items]); setNotice('Proyecto creado.'); }
      setEditingProject(null); setProjectForm(emptyProject);
    } catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible guardar el proyecto.'); }
  };
  const finalizeProject = async (id: string) => {
    try { const { project } = await api<{ project: Project }>(`/api/admin/projects/${id}/finalize`, { method: 'PATCH' }); setProjects((items) => items.map((item) => item.id === id ? project : item)); setNotice('Proyecto movido a proyectos terminados.'); }
    catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible finalizar el proyecto.'); }
  };

  if (access !== 'allowed') return <PageShell><section className="workspace-gate"><div className="container"><div className="portal-empty"><h1>{access === 'loading' ? 'Validando acceso...' : access === 'denied' ? 'Acceso restringido.' : 'No fue posible abrir el área administrativa.'}</h1><p>{access === 'denied' ? 'Esta área está disponible únicamente para administradores activos.' : 'Intente iniciar sesión nuevamente.'}</p>{access !== 'loading' && <Link className="button button--primary" to="/login">Ir al ingreso</Link>}</div></div></section></PageShell>;

  const newMessages = messages.filter((message) => message.status === 'new').length;
  const pendingApplications = applications.filter((application) => application.status === 'pending').length;
  const activeProjects = projects.filter((project) => project.status !== 'completed').length;

  return <WorkspaceLayout kind="Administración" title="Operación DIMELCO" description="Seguimiento diario de personas, solicitudes y frentes de trabajo." navItems={[...navigation]} activeItem={section} onSelect={selectSection} profileName={profile?.full_name} profileDetail={profile?.position || 'Administrador'} onSignOut={() => void signOut()}>
    {notice && <p className="workspace-notice" role="status">{notice}</p>}
    {loading && <div className="workspace-loading"><span /><span /><span /></div>}
    {!loading && section === 'inicio' && <><div className="workspace-metrics"><article><span>Reportes de hoy</span><strong>{reports.filter((report) => report.report_date === new Date().toISOString().slice(0, 10)).length}</strong><p>Actividad diaria del equipo.</p></article><article><span>Mensajes nuevos</span><strong>{newMessages}</strong><p>Solicitudes recibidas desde contacto.</p></article><article><span>Proyectos abiertos</span><strong>{activeProjects}</strong><p>Activos o en planeación.</p></article><article><span>Postulaciones pendientes</span><strong>{pendingApplications}</strong><p>Personas por revisar.</p></article></div><section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Actividad diaria</p><h3>Lo más reciente del equipo.</h3></div><button className="text-button" type="button" onClick={() => selectSection('actividad')}>Ver reportes</button></div><ActivityList reports={reports.slice(0, 6)} /></section></>}
    {!loading && section === 'actividad' && <Panel eyebrow="Actividad de los empleados" title="Reportes diarios"><ActivityList reports={reports} /></Panel>}
    {!loading && section === 'proyectos-activos' && <Panel eyebrow="Proyectos" title="Proyectos activos"><ProjectList projects={projects} onEdit={editProject} onFinalize={finalizeProject} /></Panel>}
    {!loading && section === 'proyectos-finalizados' && <Panel eyebrow="Historial de obra" title="Proyectos terminados"><ProjectList projects={projects} /></Panel>}
    {!loading && section === 'crear-proyecto' && <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Proyectos</p><h3>{editingProject ? 'Editar proyecto' : 'Crear proyecto'}</h3></div></div><ProjectForm form={projectForm} setForm={setProjectForm} editing={Boolean(editingProject)} onCancel={() => { setEditingProject(null); setProjectForm(emptyProject); }} onSubmit={saveProject} /></section>}
    {!loading && section.startsWith('mensajes-') && <Panel eyebrow="Contáctanos" title={section === 'mensajes-revisados' ? 'Mensajes revisados' : section === 'mensajes-respondidos' ? 'Mensajes respondidos' : 'Todos los mensajes'}><MessageList messages={messages} onUpdate={updateMessage} /></Panel>}
    {!loading && section === 'vacantes-registradas' && <Panel eyebrow="Vacantes" title="Vacantes registradas"><JobList jobs={jobs} onEdit={editJob} onToggle={toggleJob} /></Panel>}
    {!loading && section === 'publicar-vacante' && <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Vacantes</p><h3>{editingJob ? 'Editar vacante' : 'Publicar vacante'}</h3></div></div><JobForm form={jobForm} setForm={setJobForm} editing={Boolean(editingJob)} onCancel={() => { setEditingJob(null); setJobForm(emptyJob); }} onSubmit={saveJob} /></section>}
    {!loading && section.startsWith('postulaciones-') && <Panel eyebrow="Postulaciones" title={section === 'postulaciones-pendientes' ? 'Postulaciones pendientes' : section === 'postulaciones-revisadas' ? 'Postulaciones revisadas' : section === 'postulaciones-rechazadas' ? 'Postulaciones rechazadas' : section === 'postulaciones-contratadas' ? 'Personas contratadas' : 'Todas las postulaciones'}><ApplicationList applications={applications} onUpdate={updateApplication} /></Panel>}
  </WorkspaceLayout>;
}

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>{eyebrow}</p><h3>{title}</h3></div></div>{children}</section>; }
function Empty({ text }: { text: string }) { return <div className="workspace-empty"><p>{text}</p></div>; }
function ActivityList({ reports }: { reports: Report[] }) { return reports.length === 0 ? <Empty text="Aún no hay reportes de actividad." /> : <div className="workspace-records">{reports.map((report) => <article key={report.id}><div><strong>{report.task_description}</strong><span>{report.employees?.full_name || 'Colaborador'}{report.employees?.department ? ` · ${report.employees.department}` : ''} · {report.report_date}</span></div><b>{report.hours_logged} h</b></article>)}</div>; }
function MessageList({ messages, onUpdate }: { messages: Message[]; onUpdate: (id: string, status: Message['status']) => void }) { const [openId, setOpenId] = useState<string | null>(null); return messages.length === 0 ? <Empty text="No hay mensajes en esta sección." /> : <div className="workspace-records">{messages.map((message) => <article key={message.id}><div><strong>{message.subject}</strong><a href={`mailto:${message.email}`}>{message.email}</a><button className="text-button workspace-read-more" type="button" onClick={() => setOpenId((open) => open === message.id ? null : message.id)}>{openId === message.id ? 'Ocultar detalle' : 'Leer más'}</button>{openId === message.id && <p className="workspace-message__detail">{message.message}</p>}</div><select aria-label={`Estado del mensaje ${message.subject}`} value={message.status} onChange={(event) => onUpdate(message.id, event.target.value as Message['status'])}><option value="new">Nuevo</option><option value="reviewed">Revisado</option><option value="responded">Respondido</option></select></article>)}</div>; }
function JobList({ jobs, onEdit, onToggle }: { jobs: Job[]; onEdit: (job: Job) => void; onToggle: (job: Job) => void }) { return jobs.length === 0 ? <Empty text="No hay vacantes registradas." /> : <div className="workspace-records">{jobs.map((job) => <article key={job.id}><div><strong>{job.title}</strong><span>{job.department} · {job.location} · {job.type}</span><span>{job.is_active ? 'Publicada en carreras' : 'Cerrada'}</span></div><div className="workspace-record-actions"><button className="text-button" type="button" onClick={() => onEdit(job)}>Editar</button><button className="text-button" type="button" onClick={() => onToggle(job)}>{job.is_active ? 'Cerrar vacante' : 'Publicar'}</button></div></article>)}</div>; }
function ProjectList({ projects, onEdit, onFinalize }: { projects: Project[]; onEdit?: (project: Project) => void; onFinalize?: (id: string) => void }) { return projects.length === 0 ? <Empty text="No hay proyectos en esta sección." /> : <div className="workspace-projects">{projects.map((project) => <article key={project.id}><span className={`workspace-project__status workspace-project__status--${project.status}`}>{project.status === 'planning' ? 'Planeación' : project.status === 'active' ? 'Activo' : 'Terminado'}</span><h3>{project.title}</h3><p>{project.location}</p><span>{project.description}</span>{onEdit && <div className="workspace-project__actions"><button className="text-button" type="button" onClick={() => onEdit(project)}>Editar</button>{onFinalize && <button className="text-button" type="button" onClick={() => onFinalize(project.id)}>Finalizar proyecto</button>}</div>}</article>)}</div>; }
function ApplicationList({ applications, onUpdate }: { applications: Application[]; onUpdate: (id: string, status: Application['status']) => void }) { return applications.length === 0 ? <Empty text="No hay postulaciones en esta sección." /> : <div className="workspace-records">{applications.map((application) => <article key={application.id}><div><strong>{application.full_name}</strong><span>{application.jobs?.title || 'Vacante eliminada'}</span><a href={`mailto:${application.email}`}>{application.email}</a><span>{application.phone}</span>{application.resume_download_url && <a className="workspace-download" href={application.resume_download_url} target="_blank" rel="noreferrer">Descargar hoja de vida</a>}</div><select aria-label={`Estado de ${application.full_name}`} value={application.status} onChange={(event) => onUpdate(application.id, event.target.value as Application['status'])}><option value="pending">Pendiente</option><option value="reviewed">Revisada</option><option value="rejected">Rechazada</option><option value="hired">Contratada</option></select></article>)}</div>; }
function ProjectForm({ form, setForm, editing, onCancel, onSubmit }: { form: typeof emptyProject; setForm: (form: typeof emptyProject) => void; editing: boolean; onCancel: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) { return <form className="job-form" onSubmit={onSubmit}><label className="full">Nombre del proyecto<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label><label className="full">Ubicación<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required /></label><label className="full">Descripción<textarea rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label><label className="full">Estado inicial<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as 'planning' | 'active' })}><option value="planning">Planeación</option><option value="active">Activo</option></select></label><div className="full job-form__actions">{editing && <button className="button button--secondary" type="button" onClick={onCancel}>Cancelar</button>}<button className="button button--primary" type="submit">{editing ? 'Guardar cambios' : 'Crear proyecto'}</button></div></form>; }
function JobForm({ form, setForm, editing, onCancel, onSubmit }: { form: typeof emptyJob; setForm: (form: typeof emptyJob) => void; editing: boolean; onCancel: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) { return <form className="job-form" onSubmit={onSubmit}><label>Título<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label><label>Área<input value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} required /></label><label>Ubicación<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required /></label><label>Tipo<input value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} required /></label><label className="full">Descripción<textarea rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label><label className="full">Requisitos, uno por línea<textarea rows={4} value={form.requirements} onChange={(event) => setForm({ ...form, requirements: event.target.value })} /></label><div className="full job-form__actions">{editing && <button className="button button--secondary" type="button" onClick={onCancel}>Cancelar</button>}<button className="button button--primary" type="submit">{editing ? 'Guardar cambios' : 'Publicar vacante'}</button></div></form>; }
