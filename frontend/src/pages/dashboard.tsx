import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import WorkspaceLayout from '../components/WorkspaceLayout';
import { ApiError, api, signOut } from '../lib/api';

type Employee = { full_name: string; role: 'admin' | 'employee'; department: string | null; position: string | null };
type CompanyReport = { id: string; task_description: string; hours_logged: number; report_date: string; employees: { full_name: string; department: string | null } | null };
type OwnReport = { id: string; task_description: string; hours_logged: number; report_date: string };
type Project = { id: string; title: string; location: string; description: string; status: 'planning' | 'active' | 'completed' };
type Message = { id: string; full_name: string; company: string | null; email: string; subject: string; message: string; status: 'new' | 'reviewed' | 'responded'; created_at: string };
type Section = 'inicio' | 'actividad' | 'proyectos' | 'proyectos-finalizados' | 'mensajes' | 'reportes';

const navigation = [
  { id: 'inicio', label: 'Resumen de empresa' },
  { id: 'actividad', label: 'Reportes diarios' },
  { id: 'proyectos', label: 'Proyectos activos' },
  { id: 'proyectos-finalizados', label: 'Proyectos finalizados' },
  { id: 'mensajes', label: 'Mensajes de contacto' },
  { id: 'reportes', label: 'Montar reporte' },
] as const;
const today = new Date().toISOString().slice(0, 10);
const formatDate = (value: string) => new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(`${value.slice(0, 10)}T12:00:00`));

export default function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Employee | null>(null);
  const [access, setAccess] = useState<'loading' | 'allowed' | 'error'>('loading');
  const [section, setSection] = useState<Section>('inicio');
  const [companyReports, setCompanyReports] = useState<CompanyReport[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ownReports, setOwnReports] = useState<OwnReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [submission, setSubmission] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const load = async (nextSection: Section) => {
    setLoading(true); setNotice('');
    try {
      if (nextSection === 'inicio') {
        const [{ reports }, { projects: projectData }, { messages: messageData }] = await Promise.all([
          api<{ reports: CompanyReport[] }>('/api/employee/company-reports'), api<{ projects: Project[] }>('/api/employee/projects'), api<{ messages: Message[] }>('/api/employee/contact-messages'),
        ]);
        setCompanyReports(reports); setProjects(projectData); setMessages(messageData);
      }
      if (nextSection === 'actividad') setCompanyReports((await api<{ reports: CompanyReport[] }>('/api/employee/company-reports')).reports);
      if (nextSection === 'proyectos') setProjects((await api<{ projects: Project[] }>('/api/employee/projects?status=active')).projects);
      if (nextSection === 'proyectos-finalizados') setProjects((await api<{ projects: Project[] }>('/api/employee/projects?status=completed')).projects);
      if (nextSection === 'mensajes') setMessages((await api<{ messages: Message[] }>('/api/employee/contact-messages')).messages);
      if (nextSection === 'reportes') setOwnReports((await api<{ reports: OwnReport[] }>('/api/employee/reports')).reports);
    } catch (error) { setNotice(error instanceof Error ? error.message : 'No fue posible cargar la información.'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    api<{ employee: Employee }>('/api/employee/me').then(({ employee }) => {
      if (employee.role === 'admin') { navigate('/admin', { replace: true }); return; }
      setProfile(employee); setAccess('allowed'); void load('inicio');
    }).catch((error) => {
      if (error instanceof ApiError && error.status === 403) {
        navigate('/acceso-restringido', { replace: true });
        return;
      }
      if (error instanceof ApiError && error.status === 401) {
        navigate('/login', { replace: true });
        return;
      }
      setAccess('error');
    });
  }, [navigate]);

  const selectSection = (value: string) => { const next = value as Section; setSection(next); void load(next); };
  const submitReport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSubmission('loading'); setNotice(''); const form = new FormData(event.currentTarget);
    try {
      const { report } = await api<{ report: OwnReport }>('/api/employee/reports', { method: 'POST', body: JSON.stringify({ task_description: form.get('task_description'), hours_logged: form.get('hours_logged'), report_date: form.get('report_date') }) });
      setOwnReports((reports) => [report, ...reports]); event.currentTarget.reset(); setSubmission('success'); setNotice('Reporte registrado correctamente.');
    } catch (error) { setSubmission('error'); setNotice(error instanceof Error ? error.message : 'No fue posible registrar el reporte.'); }
  };

  if (access !== 'allowed') return <PageShell><section className="workspace-gate"><div className="container"><div className="portal-empty"><h1>{access === 'loading' ? 'Validando acceso...' : 'Inicie sesión para continuar.'}</h1><p>Este espacio está disponible para colaboradores activos de DIMELCO.</p>{access === 'error' && <Link className="button button--primary" to="/login">Ir al ingreso</Link>}</div></div></section></PageShell>;

  return <WorkspaceLayout kind="Colaborador" title="Mi espacio de trabajo" description="Información de la empresa y registro de actividad personal." navItems={[...navigation]} activeItem={section} onSelect={selectSection} profileName={profile?.full_name} profileDetail={profile?.position || profile?.department || 'Colaborador'} onSignOut={() => void signOut()}>
    {notice && <p className={`workspace-notice ${submission === 'error' ? 'workspace-notice--error' : ''}`} role={submission === 'error' ? 'alert' : 'status'}>{notice}</p>}
    {loading && <div className="workspace-loading"><span /><span /><span /></div>}
    {!loading && section === 'inicio' && <><div className="workspace-metrics workspace-metrics--employee"><article><span>Reportes recientes</span><strong>{companyReports.length}</strong><p>Actividad compartida por el equipo.</p></article><article><span>Proyectos activos</span><strong>{projects.filter((project) => project.status === 'active').length}</strong><p>Frentes activos de la empresa.</p></article><article><span>Mensajes nuevos</span><strong>{messages.filter((message) => message.status === 'new').length}</strong><p>Solicitudes recibidas en contacto.</p></article></div><section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Actividad de la empresa</p><h3>Lo más reciente del equipo.</h3></div><button className="text-button" type="button" onClick={() => selectSection('actividad')}>Ver reportes</button></div><CompanyActivity reports={companyReports.slice(0, 6)} /></section></>}
    {!loading && section === 'actividad' && <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Actividades de la empresa</p><h3>Reportes diarios</h3></div><span>Solo lectura</span></div><CompanyActivity reports={companyReports} /></section>}
    {!loading && section === 'proyectos' && <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Proyectos activos</p><h3>Frentes de DIMELCO</h3></div><span>Solo lectura</span></div><Projects projects={projects} /></section>}
    {!loading && section === 'proyectos-finalizados' && <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Historial de obra</p><h3>Proyectos finalizados</h3></div><span>Solo lectura</span></div><Projects projects={projects} /></section>}
    {!loading && section === 'mensajes' && <section className="workspace-panel"><div className="workspace-panel__heading"><div><p>Contáctanos</p><h3>Solicitudes recibidas</h3></div><span>Solo lectura</span></div><Messages messages={messages} /></section>}
    {!loading && section === 'reportes' && <section className="workspace-panel workspace-panel--split"><div><div className="workspace-panel__heading"><div><p>Montar reporte</p><h3>Registre su actividad</h3></div></div><form className="activity-form" onSubmit={submitReport}><label className="full">Actividad realizada<textarea name="task_description" rows={5} required disabled={submission === 'loading'} /></label><label>Horas invertidas<input name="hours_logged" type="number" min="0.25" max="99.99" step="0.25" required disabled={submission === 'loading'} /></label><label>Fecha<input name="report_date" type="date" defaultValue={today} required disabled={submission === 'loading'} /></label><div className="full"><button className="button button--primary" type="submit" disabled={submission === 'loading'}>{submission === 'loading' ? 'Guardando...' : 'Guardar reporte'}</button></div></form></div><div className="workspace-own-reports"><h3>Mis reportes</h3>{ownReports.length === 0 ? <div className="workspace-empty"><p>No ha registrado reportes todavía.</p></div> : <div className="workspace-records">{ownReports.map((report) => <article key={report.id}><div><strong>{report.task_description}</strong><span>{formatDate(report.report_date)}</span></div><b>{report.hours_logged} h</b></article>)}</div>}</div></section>}
  </WorkspaceLayout>;
}

function CompanyActivity({ reports }: { reports: CompanyReport[] }) { return reports.length === 0 ? <div className="workspace-empty"><p>Aún no hay actividad compartida.</p></div> : <div className="workspace-records">{reports.map((report) => <article key={report.id}><div><strong>{report.task_description}</strong><span>{report.employees?.full_name || 'Colaborador'}{report.employees?.department ? ` · ${report.employees.department}` : ''} · {formatDate(report.report_date)}</span></div><b>{report.hours_logged} h</b></article>)}</div>; }
function Projects({ projects }: { projects: Project[] }) { return projects.length === 0 ? <div className="workspace-empty"><p>No hay proyectos en esta sección.</p></div> : <div className="workspace-projects">{projects.map((project) => <article key={project.id}><span className={`workspace-project__status workspace-project__status--${project.status}`}>{project.status === 'planning' ? 'Planeación' : project.status === 'active' ? 'Activo' : 'Finalizado'}</span><h3>{project.title}</h3><p>{project.location}</p><span>{project.description}</span></article>)}</div>; }
function Messages({ messages }: { messages: Message[] }) { return messages.length === 0 ? <div className="workspace-empty"><p>Los mensajes del formulario Contáctanos aparecerán aquí.</p></div> : <div className="workspace-records">{messages.map((message) => <article key={message.id}><div><strong>{message.subject}</strong><span>{message.full_name}{message.company ? ` · ${message.company}` : ''} · {formatDate(message.created_at)}</span><p>{message.message}</p><a href={`mailto:${message.email}`}>{message.email}</a></div><b>{message.status === 'new' ? 'Nuevo' : message.status === 'reviewed' ? 'Revisado' : 'Respondido'}</b></article>)}</div>; }
