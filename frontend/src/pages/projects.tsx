import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import bridge from '../assets/cucutaBGPuente.jpg';
import city from '../assets/cucutaBG2.jpg';
import engineer from '../assets/engineer2.jpg';
import landscape from '../assets/cucutaBG.jpg';

const projects = [
  { category: 'Eléctrica', title: 'Modernización de redes de distribución', description: 'Intervención de infraestructura para mejorar continuidad, protección y capacidad operativa.', image: city },
  { category: 'Infraestructura', title: 'Obra civil para desarrollo urbano', description: 'Soluciones constructivas coordinadas con las necesidades del entorno y la operación.', image: bridge },
  { category: 'Consultoría', title: 'Evaluación técnica de activos críticos', description: 'Diagnóstico y recomendaciones para tomar decisiones con información de campo.', image: engineer },
  { category: 'Eléctrica', title: 'Diseño de sistema de potencia', description: 'Ingeniería aplicada para instalaciones seguras, eficientes y preparadas para crecer.', image: landscape },
  { category: 'Infraestructura', title: 'Adecuación de espacios operativos', description: 'Planeación y ejecución de mejoras para entornos de trabajo más funcionales.', image: city },
  { category: 'Consultoría', title: 'Acompañamiento de proyecto industrial', description: 'Seguimiento técnico durante decisiones de alcance, presupuesto y ejecución.', image: bridge },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Todos');
  const visibleProjects = filter === 'Todos' ? projects : projects.filter(project => project.category === filter);
  return <PageShell>
    <PageHero eyebrow="Proyectos" image={bridge} title="Ingeniería aplicada a resultados concretos." description="Una muestra de la clase de retos que abordamos: infraestructura, sistemas técnicos y acompañamiento para proyectos que requieren precisión." />
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Portafolio</p><h2>Proyectos pensados para funcionar en el mundo real.</h2><p>Explore nuestras capacidades por área de trabajo.</p></div><div className="filter-bar" aria-label="Filtrar proyectos">{['Todos', 'Eléctrica', 'Infraestructura', 'Consultoría'].map(label => <button key={label} type="button" className={filter === label ? 'is-active' : ''} onClick={() => setFilter(label)}>{label}</button>)}</div><div className="project-grid">{visibleProjects.map(project => <article className="project project--detail" key={project.title}><img src={project.image} alt="" /><div className="project__content"><p className="project__category">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p></div></article>)}</div></div></section>
    <section className="section section--muted"><div className="container split"><div className="split__text"><p className="eyebrow eyebrow--green">Su proyecto puede ser el siguiente</p><h2>La mejor obra empieza con una conversación precisa.</h2><p>Hable con nuestro equipo sobre el alcance de su necesidad. Podemos ayudarle a revisar posibilidades, riesgos y la ruta técnica más conveniente.</p></div><div className="cta"><h2>Convierta el reto en un plan.</h2><Link to="/contacto" className="button button--secondary">Solicitar propuesta</Link></div></div></section>
  </PageShell>;
}
