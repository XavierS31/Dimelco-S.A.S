import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import engineer from '../assets/engineer2.jpg';
import cucutaBg from '../assets/cucutaBG.jpg';
import bridge from '../assets/cucutaBGPuente.jpg';
import city from '../assets/cucutaBG2.jpg';
import gasesOriente from '../clients/gasesOriente.png';
import rednova from '../clients/rednova.png'; 

import chilco from '../clients/chilco.png';

const services = [
  ['01', 'Gas Natural y GLP', 'Diseño, construcción, mantenimiento y atención de redes de distribución, estaciones y activos para gases combustibles.'],
  ['02', 'Montajes e infraestructura', 'Obras civiles, mecánicas y metalmecánicas para instalaciones industriales que deben operar con seguridad.'],
  ['03', 'Climatización y energía', 'Soluciones de calefacción, agua caliente, aire acondicionado y energías alternativas.'],
];

export default function MainPage() {
  return <PageShell>
    <PageHero eyebrow="DIMELCO S.A.S. · Cúcuta" image={cucutaBg} title="Ingeniería para que la energía llegue más lejos." description="Diseñamos, construimos y mantenemos infraestructura de gas, climatización y energía con experiencia comprobada en Colombia.">
      <Link to="/servicios" className="button button--primary">Conocer servicios</Link>
      <Link to="/proyectos" className="button button--secondary">Ver proyectos</Link>
    </PageHero>

    <section className="section">
      <div className="container split">
        <div className="split__text"><p className="eyebrow eyebrow--green">La forma Dimelco</p><h2>Resolver bien lo esencial.</h2><p>Trabajamos en almacenamiento, distribución y uso de Gas Natural y GLP, además de climatización y energías alternativas. Cada intervención combina conocimiento de campo, cumplimiento técnico y una comunicación clara con el cliente.</p><p>Nuestra experiencia se concentra en activos donde la continuidad, la seguridad y el buen mantenimiento son parte del resultado, no una promesa adicional.</p><div className="callout">Un solo equipo para acompañar desde la evaluación inicial hasta la puesta en operación.</div></div>
        <div className="split__image"><img src={engineer} alt="Equipo de ingeniería Dimelco trabajando" /></div>
      </div>
    </section>

    <section className="section section--muted"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Capacidades</p><h2>Soluciones claras para retos complejos.</h2><p>Especialidades conectadas por una misma exigencia: hacer que cada proyecto funcione bien, hoy y con el paso del tiempo.</p></div><div className="card-grid">{services.map(([number, title, text]) => <article key={number} className="card"><span className="card__number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Proyectos destacados</p><h2>Transformando el paisaje de Cúcuta.</h2><p>Ingeniería aplicada a infraestructura, energía y decisiones técnicas que se sostienen en el tiempo.</p></div><div className="project-grid"><Link to="/proyectos" className="project"><img src={bridge} alt="Infraestructura urbana en Cúcuta"/><div className="project__content"><p className="project__category">Infraestructura</p><h3>Obras que conectan territorio y desarrollo.</h3></div></Link><Link to="/proyectos" className="project"><img src={city} alt="Entorno urbano para proyectos de ingeniería"/><div className="project__content"><p className="project__category">Energía</p><h3>Sistemas técnicos diseñados para responder.</h3></div></Link><Link to="/proyectos" className="project"><img src={engineer} alt="Profesional de ingeniería en campo"/><div className="project__content"><p className="project__category">Consultoría</p><h3>Decisiones respaldadas por experiencia.</h3></div></Link></div></div></section>

    <section className="section trust-section"><div className="container"><div className="section-heading section-heading--center"><p className="eyebrow eyebrow--green">Confían en nosotros</p><h2>Relaciones que se sostienen en el trabajo bien hecho.</h2></div><div className="clients"><a href="https://www.rednova.com.co/" target="_blank" rel="noreferrer"><img src={rednova} alt="Rednova" /></a><a href="https://www.gasesdeloriente.com.co/" target="_blank" rel="noreferrer"><img src={gasesOriente} alt="Gases del Oriente" /></a><Link className="client-chilco" to="/proyectos" aria-label="Chilco, ver proyectos relacionados"><img src={chilco} alt="Chilco" /></Link></div></div></section>

    <section className="section section--ink"><div className="container cta"><h2>Conversemos sobre el próximo paso de su proyecto.</h2><Link to="/contacto" className="button button--secondary">Solicitar información</Link></div></section>
  </PageShell>;
}
