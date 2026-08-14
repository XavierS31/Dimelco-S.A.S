import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import PageHero from '../components/PageHero';
import PageShell from '../components/PageShell';
import { api } from '../lib/api';
import hero from '../assets/bogotaSL.jpg';

type Job = { id: string; title: string; department: string; location: string; type: string; description: string; requirements: string[] };

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'not-found' | 'error'>('loading');

  useEffect(() => {
    if (!id) { setState('not-found'); return; }
    api<{ job: Job }>(`/api/jobs/${id}`)
      .then(({ job: opening }) => { setJob(opening); setState('ready'); })
      .catch((error: { status?: number }) => setState(error.status === 404 ? 'not-found' : 'error'));
  }, [id]);

  if (state === 'loading') return <PageShell><section className="section"><div className="container"><div className="portal-empty"><h2>Cargando vacante...</h2></div></div></section></PageShell>;

  if (!job) return <PageShell><section className="section"><div className="container"><div className="portal-empty"><h2>{state === 'not-found' ? 'Esta vacante ya no está disponible.' : 'No fue posible cargar la vacante.'}</h2><p>Revise las oportunidades disponibles o intente nuevamente más tarde.</p><Link className="button button--primary" to="/carreras">Ver vacantes</Link></div></div></section></PageShell>;

  return <PageShell>
    <PageHero eyebrow="Vacante" image={hero} title={job.title} description={`${job.department} · ${job.location} · ${job.type}`}><a className="button button--primary" href="#postularme">Aplicar ahora</a></PageHero>
    <section className="section"><div className="container job-detail"><div className="job-detail__content"><Link className="text-button" to="/carreras">Volver a vacantes</Link><p className="eyebrow eyebrow--green">Sobre la posición</p><h2>Descripción del cargo</h2><p>{job.description}</p><h3>Lo que buscamos</h3>{job.requirements.length > 0 ? <ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul> : <p>Los detalles del perfil se revisarán durante el proceso de selección.</p>}</div><aside className="job-detail__summary"><p>Resumen de la vacante</p><dl><div><dt>Área</dt><dd>{job.department}</dd></div><div><dt>Ubicación</dt><dd>{job.location}</dd></div><div><dt>Modalidad</dt><dd>{job.type}</dd></div></dl></aside></div></section>
    <section className="section section--muted" id="postularme"><div className="container job-application"><div className="section-heading"><p className="eyebrow eyebrow--green">Postulación</p><h2>Postúlese a esta posición.</h2><p>Comparta sus datos y su hoja de vida. El equipo de DIMELCO revisará su perfil.</p></div><ApplicationForm job={job} /></div></section>
  </PageShell>;
}
