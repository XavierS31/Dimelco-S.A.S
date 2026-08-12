import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import hero from '../assets/bogotaSL.jpg';
import team from '../assets/engineer3.jpg';

const jobs = [
  ['Ingeniero/a de sistemas', 'Cúcuta, Norte de Santander', 'Tiempo completo'],
  ['Ingeniero/a de confiabilidad', 'Cúcuta, Norte de Santander', 'Tiempo completo'],
  ['Ingeniero/a eléctrico/a', 'Cúcuta, Norte de Santander', 'Tiempo completo'],
];

export default function CareersPage() {
  return <PageShell>
    <PageHero eyebrow="Carreras" image={hero} title="Construya una carrera que deje huella." description="Buscamos personas rigurosas, curiosas y comprometidas con hacer que los proyectos de ingeniería funcionen mejor."><a className="button button--primary" href="#vacantes">Ver vacantes</a></PageHero>
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Trabajar en Dimelco</p><h2>Un equipo que aprende haciendo.</h2><p>Valoramos la responsabilidad técnica, la colaboración y la disposición de entender un problema antes de resolverlo.</p></div><div className="card-grid"><article className="card"><span className="card__number">01</span><h3>Retos con sentido</h3><p>Participe en proyectos que impactan infraestructura, servicios y operaciones reales.</p></article><article className="card"><span className="card__number">02</span><h3>Aprendizaje continuo</h3><p>Construya criterio de la mano de un equipo con experiencia de campo y enfoque técnico.</p></article><article className="card"><span className="card__number">03</span><h3>Trabajo en equipo</h3><p>Una cultura directa, respetuosa y comprometida con la calidad de cada entrega.</p></article></div></div></section>
    <section className="section section--muted" id="vacantes"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Oportunidades actuales</p><h2>Encuentre el rol que puede hacer suyo.</h2></div><div className="job-list">{jobs.map(([title, location, type]) => <article className="job" key={title}><div><h3>{title}</h3><div className="job-meta"><p>{location}</p><p>{type}</p><p>Ingeniería</p></div></div><a className="button button--secondary" href={`mailto:dimelco@hotmail.com?subject=${encodeURIComponent(`Aplicación: ${title}`)}`}>Aplicar por correo</a></article>)}</div><p className="split__text" style={{ marginTop: '28px' }}>¿No encuentra una vacante adecuada? <a href="mailto:dimelco@hotmail.com" style={{ color: '#37732b', fontWeight: 700 }}>Envíenos su hoja de vida.</a></p></div></section>
    <section className="section"><div className="container split"><div className="split__image"><img src={team} alt="Equipo de ingeniería colaborando" /></div><div className="split__text"><p className="eyebrow eyebrow--green">Una carrera sostenible</p><h2>Buenas condiciones para hacer buen trabajo.</h2><p>Promovemos un entorno en el que el respeto por las personas va de la mano con el respeto por los procesos, la seguridad y la calidad.</p><Link to="/contacto" className="button button--primary">Hacer una consulta</Link></div></div></section>
  </PageShell>;
}
