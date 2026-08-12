import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import city from '../assets/cucutaBG2.jpg';

const services = [
  { name: 'Ingeniería civil', detail: 'Infraestructura y obras diseñadas para responder a las condiciones reales de cada lugar.', items: ['Diseño estructural', 'Vías y drenaje', 'Interventoría de obra'] },
  { name: 'Ingeniería eléctrica', detail: 'Sistemas de potencia y distribución que priorizan seguridad, continuidad y cumplimiento.', items: ['Media y baja tensión', 'Diseño de subestaciones', 'RETIE y calidad de energía'] },
  { name: 'Ingeniería mecánica', detail: 'Soluciones operativas para instalaciones, equipos y procesos industriales exigentes.', items: ['HVAC y ventilación', 'Redes contra incendio', 'Mantenimiento industrial'] },
  { name: 'Consultoría técnica', detail: 'Información útil para evaluar alternativas y convertir una necesidad en un plan viable.', items: ['Diagnóstico en campo', 'Estudios de viabilidad', 'Presupuestos y cronogramas'] },
  { name: 'Gestión de proyectos', detail: 'Coordinación técnica y seguimiento para cuidar alcance, calidad, tiempos y recursos.', items: ['Planeación de obra', 'Control técnico', 'Gestión de contratistas'] },
  { name: 'Mantenimiento', detail: 'Programas orientados a mantener activos críticos disponibles y en condiciones seguras.', items: ['Mantenimiento preventivo', 'Inspección técnica', 'Reportes de condición'] },
];

export default function ServicesPage() {
  return <PageShell>
    <PageHero eyebrow="Servicios" image={city} title="Capacidad técnica para llevar un proyecto a buen término." description="Integramos especialidades de ingeniería y un seguimiento cercano para resolver con orden desde la evaluación hasta la operación." />
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Lo que hacemos</p><h2>Especialidades que trabajan en conjunto.</h2><p>Cada servicio se adapta al alcance, al sector y a las condiciones del proyecto. Sin fórmulas prefabricadas ni pasos innecesarios.</p></div><div className="service-list">{services.map((service, index) => <article className="service-list__item" key={service.name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service.name}</h3><p>{service.detail}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section section--muted"><div className="container split"><div className="split__text"><p className="eyebrow eyebrow--green">Nuestra metodología</p><h2>Empezar por entender.</h2><p>Antes de proponer, revisamos las restricciones y oportunidades del proyecto. Definimos un alcance claro, conectamos a los especialistas necesarios y mantenemos visibles las decisiones críticas.</p><div className="callout">La meta es simple: una solución ejecutable, medible y alineada con la operación que la va a usar.</div></div><div className="card-grid"><article className="card"><span className="card__number">01</span><h3>Diagnóstico</h3><p>Levantamos información relevante y acordamos prioridades.</p></article><article className="card"><span className="card__number">02</span><h3>Diseño</h3><p>Convertimos los hallazgos en una solución técnica viable.</p></article><article className="card"><span className="card__number">03</span><h3>Ejecución</h3><p>Acompañamos la entrega con control y trazabilidad.</p></article></div></div></section>
    <section className="section section--ink"><div className="container cta"><h2>Cuéntenos el reto. Definimos la mejor forma de abordarlo.</h2><Link to="/contacto" className="button button--secondary">Solicitar asesoría</Link></div></section>
  </PageShell>;
}
