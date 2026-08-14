import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { api } from '../lib/api';
import hero from '../assets/bogotaSL.jpg';
import team from '../assets/engineer3.jpg';

type Job = { id: string; title: string; department: string; location: string; type: string; description: string; requirements: string[] };

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    api<{ jobs: Job[] }>('/api/jobs')
      .then(({ jobs: openJobs }) => { setJobs(openJobs); setState('ready'); })
      .catch(() => setState('error'));
  }, []);

  return <PageShell>
    <PageHero eyebrow="Carreras" image={hero} title="Construya una carrera que deje huella." description="Buscamos personas rigurosas, curiosas y comprometidas con hacer que los proyectos de ingeniería funcionen mejor."><a className="button button--primary" href="#vacantes">Ver vacantes</a></PageHero>
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Trabajar en Dimelco</p><h2>Un equipo que aprende haciendo.</h2><p>Valoramos la responsabilidad técnica, la colaboración y la disposición de entender un problema antes de resolverlo.</p></div><div className="card-grid"><article className="card"><span className="card__number">Campo</span><h3>Retos con sentido</h3><p>Participe en proyectos que impactan infraestructura, servicios y operaciones reales.</p></article><article className="card"><span className="card__number">Criterio</span><h3>Aprendizaje continuo</h3><p>Construya criterio de la mano de un equipo con experiencia de campo y enfoque técnico.</p></article><article className="card"><span className="card__number">Equipo</span><h3>Trabajo colaborativo</h3><p>Una cultura directa, respetuosa y comprometida con la calidad de cada entrega.</p></article></div></div></section>
    <section className="section section--muted" id="vacantes"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Oportunidades actuales</p><h2>Encuentre el rol que puede hacer suyo.</h2></div>
      {state === 'loading' && <div className="job-list job-list--loading" aria-label="Cargando vacantes"><span /><span /><span /></div>}
      {state === 'error' && <div className="portal-empty" role="alert"><h3>No fue posible cargar las vacantes.</h3><p>Intente nuevamente en unos minutos o comuníquese con nuestro equipo.</p></div>}
      {state === 'ready' && jobs.length === 0 && <div className="portal-empty"><h3>No hay vacantes publicadas por ahora.</h3><p>Puede volver a consultar esta página o escribirnos para compartir su perfil.</p></div>}
      {state === 'ready' && jobs.length > 0 && <div className="job-list">{jobs.map((job) => <article className="job" key={job.id}><div><h3>{job.title}</h3><div className="job-meta"><p>{job.location}</p><p>{job.type}</p><p>{job.department}</p></div></div><Link className="button button--secondary" to={`/carreras/${job.id}`}>Aplicar</Link></article>)}</div>}
    </div></section>
    <section className="section"><div className="container split"><div className="split__image"><img src={team} alt="Equipo de ingeniería colaborando" /></div><div className="split__text"><p className="eyebrow eyebrow--green">Una carrera sostenible</p><h2>Buenas condiciones para hacer buen trabajo.</h2><p>Promovemos un entorno en el que el respeto por las personas va de la mano con el respeto por los procesos, la seguridad y la calidad.</p><Link to="/contacto" className="button button--primary">Hacer una consulta</Link></div></div></section>
  </PageShell>;
}
