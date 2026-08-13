import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import bridge from '../assets/cucutaBGPuente.jpg';
import gasNetwork from '../assets/company/gnglp.jpg';
import repairs from '../assets/company/reparacionymantenimiento.jpg';
import montages from '../assets/company/montajes.jpg';
import infrastructure from '../assets/company/infraestructura.jpg';
import hvacSolar from '../assets/company/montajeshvacsolar.jpg';
import personnel from '../assets/company/personal.jpg';
import rednova from '../clients/rednova.png';
import gasesOriente from '../clients/gasesOriente.png';
import chilco from '../clients/chilco.png';
import { trackRecord } from '../data/company';

const projects = [
  { category: 'Gas Natural y GLP', title: 'Gasificación de Cúcuta y su área metropolitana', description: 'Proyectos iniciados en 2004 junto a Gases del Oriente, incluyendo reparación y mantenimiento de redes de distribución.', image: gasNetwork },
  { category: 'Estaciones y redes', title: 'Adecuación de ERM en Santander y Boyacá', description: 'Trabajos con Rednova / Chilco en Puerto Pinzón, San Miguel y Enciso para regulación, medición y redes.', image: repairs },
  { category: 'Instalaciones internas', title: 'Acometidas, gasodomésticos y centros de medición', description: 'Conexiones internas y puesta en servicio de soluciones de gas para usuarios y comunidades.', image: hvacSolar },
  { category: 'Infraestructura', title: 'Obras civiles y mecánicas para distribución', description: 'Construcción y adecuación de instalaciones para activos de distribución de gases combustibles.', image: infrastructure },
  { category: 'Montajes industriales', title: 'Tuberías, tanques y estructuras metálicas', description: 'Fabricación, montaje, protección y mantenimiento para instalaciones industriales.', image: montages },
  { category: 'Mantenimiento', title: 'Redes nuevas, reparaciones y mantenimiento', description: 'Continuidad de contratos de red y mantenimiento con crecimiento sostenido hasta 2023.', image: personnel },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Todos');
  const timelineRef = useRef<HTMLOListElement>(null);
  const visibleProjects = filter === 'Todos' ? projects : projects.filter(project => project.category === filter);
  const moveTimeline = (direction: number) => timelineRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });
  return <PageShell>
    <PageHero eyebrow="Proyectos" image={bridge} title="Ingeniería aplicada a resultados concretos." description="Una trayectoria de proyectos de gas, redes, estaciones y mantenimiento que acompaña el crecimiento de las regiones." />
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Portafolio</p><h2>Proyectos pensados para funcionar en el mundo real.</h2><p>Explore nuestra experiencia por frente de trabajo.</p></div><div className="filter-bar" aria-label="Filtrar proyectos">{['Todos', 'Gas Natural y GLP', 'Estaciones y redes', 'Infraestructura', 'Mantenimiento'].map(label => <button key={label} type="button" className={filter === label ? 'is-active' : ''} onClick={() => setFilter(label)}>{label}</button>)}</div><div className="project-grid">{visibleProjects.map(project => <article className="project project--detail" key={project.title}><img src={project.image} alt="" /><div className="project__content"><p className="project__category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div></article>)}</div></div></section>
    <section className="section section--muted"><div className="container"><div className="section-heading"><h2>Alianzas que se ven en el territorio.</h2><p>Desde 2004 trabajamos con Gases del Oriente en la gasificación y el mantenimiento de Cúcuta. Desde 2020, Rednova y Chilco nos han confiado intervenciones de ERM, acometidas y centros de medición en Santander y Boyacá.</p></div><div className="partner-grid"><article className="partner-card partner-card--oriente"><img src={gasesOriente} alt="Gases del Oriente" /><h3>Gases del Oriente</h3><p>Gasificación de Cúcuta y su área metropolitana, reparación y mantenimiento de redes de distribución.</p></article><article className="partner-card partner-card--rednova"><img src={rednova} alt="Rednova" /><h3>Rednova</h3><p>Intervenciones en municipios de Santander y Boyacá desde 2020.</p></article><article className="partner-card partner-card--chilco"><img src={chilco} alt="Chilco" /><h3>Chilco</h3><p>Acometidas internas, conexión de gasodomésticos y centros de medición junto a Rednova.</p></article></div></div></section>
    <section className="section"><div className="container"><div className="section-heading timeline-heading"><div><p className="eyebrow eyebrow--green">Trayectoria de obras</p><h2>Dos décadas de redes nuevas, reparación y mantenimiento.</h2><p>Deslice en móvil o use los controles para recorrer los principales hitos.</p></div><div className="timeline-controls"><button type="button" onClick={() => moveTimeline(-1)}>Anterior</button><button type="button" onClick={() => moveTimeline(1)}>Siguiente</button></div></div><ol className="project-timeline" ref={timelineRef}>{trackRecord.map(([year, scope], index) => <li key={`${year}-${index}`}><span className="project-timeline__year">{year}</span><p>{scope}</p></li>)}</ol></div></section>
    <section className="section section--muted"><div className="container split"><div className="split__text"><p className="eyebrow eyebrow--green">Su proyecto puede ser el siguiente</p><h2>La mejor obra empieza con una conversación precisa.</h2><p>Hable con nuestro equipo sobre el alcance de su necesidad. Podemos ayudarle a revisar posibilidades, riesgos y la ruta técnica más conveniente.</p></div><div className="cta"><h2>Convierta el reto en un plan.</h2><Link to="/contacto" className="button button--secondary">Solicitar propuesta</Link></div></div></section>
  </PageShell>;
}
