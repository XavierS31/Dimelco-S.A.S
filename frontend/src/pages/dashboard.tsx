import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { api, signOut } from '../lib/api';

type Employee = { id: string; full_name: string; email: string; role: 'admin' | 'employee'; department: string | null; position: string | null };
type Report = { id: string; task_description: string; hours_logged: number; report_date: string; created_at: string };

const today = new Date().toISOString().slice(0, 10);

export default function DashboardPage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'unauthorized' | 'error'>('loading');
  const [submission, setSubmission] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api<{ employee: Employee }>('/api/employee/me')
      .then(async ({ employee: profile }) => {
        setEmployee(profile);
        const { reports: history } = await api<{ reports: Report[] }>('/api/employee/reports');
        setReports(history);
        setState('ready');
      })
      .catch((error) => setState(error instanceof Error && 'status' in error && error.status === 401 ? 'unauthorized' : 'error'));
  }, []);

  const submitReport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmission('loading');
    setMessage('');
    const form = new FormData(event.currentTarget);
    try {
      const { report } = await api<{ report: Report }>('/api/employee/reports', {
        method: 'POST',
        body: JSON.stringify({ task_description: form.get('task_description'), hours_logged: form.get('hours_logged'), report_date: form.get('report_date') }),
      });
      setReports((current) => [report, ...current]);
      event.currentTarget.reset();
      setSubmission('success');
      setMessage('Actividad registrada correctamente.');
    } catch (error) {
      setSubmission('error');
      setMessage(error instanceof Error ? error.message : 'No fue posible registrar la actividad.');
    }
  };

  return <PageShell>
    <PageHero tone="light" eyebrow="Área de colaborador" title="Registro de actividad." description="Consulte su perfil y documente el tiempo dedicado a las actividades del equipo." />
    <section className="section"><div className="container">
      {state === 'loading' && <div className="portal-loading"><span /><span /></div>}
      {state === 'unauthorized' && <div className="portal-empty"><h2>Inicie sesión para continuar.</h2><p>Esta área está disponible para colaboradores activos de DIMELCO.</p><Link className="button button--primary" to="/login">Ir al ingreso</Link></div>}
      {state === 'error' && <div className="portal-empty" role="alert"><h2>No fue posible cargar su perfil.</h2><p>Verifique su acceso o intente nuevamente más tarde.</p><Link className="button button--secondary" to="/login">Volver a iniciar sesión</Link></div>}
      {state === 'ready' && employee && <div className="portal-grid"><aside className="portal-profile"><p className="eyebrow eyebrow--green">Mi perfil</p><h2>{employee.full_name}</h2><p>{employee.position || 'Colaborador DIMELCO'}</p><dl><div><dt>Correo</dt><dd>{employee.email}</dd></div><div><dt>Área</dt><dd>{employee.department || 'Sin área asignada'}</dd></div><div><dt>Rol</dt><dd>{employee.role === 'admin' ? 'Administrador' : 'Colaborador'}</dd></div></dl>{employee.role === 'admin' && <Link className="button button--secondary" to="/admin">Abrir administración</Link>}<button className="text-button" type="button" onClick={() => void signOut()}>Cerrar sesión</button></aside>
        <div className="portal-main"><div className="portal-section"><div><p className="eyebrow eyebrow--green">Nueva actividad</p><h2>Registre su jornada.</h2></div><form className="activity-form" onSubmit={submitReport}><label className="full">Actividad realizada<textarea name="task_description" rows={4} required disabled={submission === 'loading'} /></label><label>Horas invertidas<input name="hours_logged" type="number" min="0.25" max="99.99" step="0.25" required disabled={submission === 'loading'} /></label><label>Fecha<input name="report_date" type="date" defaultValue={today} required disabled={submission === 'loading'} /></label>{submission !== 'idle' && <p className={`form-feedback ${submission === 'success' ? 'form-feedback--success' : submission === 'error' ? 'form-feedback--error' : ''} full`} role={submission === 'error' ? 'alert' : 'status'}>{submission === 'loading' ? 'Guardando actividad...' : message}</p>}<div className="full"><button className="button button--primary" type="submit" disabled={submission === 'loading'}>Guardar actividad</button></div></form></div>
          <div className="portal-section"><div className="portal-section__heading"><div><p className="eyebrow eyebrow--green">Historial</p><h2>Actividades registradas</h2></div><span>{reports.length} registros</span></div>{reports.length === 0 ? <div className="portal-empty portal-empty--compact"><h3>Aún no hay actividad registrada.</h3><p>El primer reporte aparecerá aquí después de guardarlo.</p></div> : <div className="report-list">{reports.map((report) => <article key={report.id}><div><strong>{report.task_description}</strong><span>{new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(`${report.report_date}T12:00:00`))}</span></div><b>{report.hours_logged} h</b></article>)}</div>}</div>
        </div></div>}
    </div></section>
  </PageShell>;
}
