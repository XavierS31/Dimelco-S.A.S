import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import gasNetwork from '../assets/company/gnglp.jpg';
import hvacSolar from '../assets/company/montajeshvacsolar.jpg';
import repairs from '../assets/company/reparacionymantenimiento.jpg';
import { services } from '../data/company';

export default function ServicesPage() {
  return <PageShell>
    <PageHero eyebrow="Servicios" image={gasNetwork} title="Capacidad técnica para llevar un proyecto a buen término." description="Ingeniería especializada en Gas Natural, GLP, climatización y energías alternativas, desde el diseño hasta el mantenimiento." />
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Lo que hacemos</p><h2>Servicios construidos alrededor de la operación.</h2><p>Diseñamos, construimos y mantenemos activos esenciales para la distribución y uso seguro de gases combustibles, energía y climatización.</p></div><div className="service-list">{services.map((service, index) => <article className="service-list__item" key={service.name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service.name}</h3><p>{service.detail}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section section--muted"><div className="container split"><div className="split__text"><p className="eyebrow eyebrow--green">Nuestra metodología</p><h2>Empezar por entender la operación.</h2><p>Antes de proponer, revisamos las restricciones y oportunidades del proyecto. Definimos un alcance claro, conectamos a los especialistas necesarios y mantenemos visibles las decisiones críticas.</p><div className="callout">La meta es simple: una solución ejecutable, medible y alineada con la operación que la va a usar.</div></div><div className="service-gallery"><img src={hvacSolar} alt="Montaje de sistemas de climatización y energía solar" /><img src={repairs} alt="Mantenimiento de instalaciones de gas" /><img src={gasNetwork} alt="Construcción de red de gas" /></div></div></section>
    <section className="section section--ink"><div className="container cta"><h2>Cuéntenos el reto. Definimos la mejor forma de abordarlo.</h2><Link to="/contacto" className="button button--secondary">Solicitar asesoría</Link></div></section>
  </PageShell>;
}
