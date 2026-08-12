import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import hero from '../assets/cucutaBG.jpg';
import engineer from '../assets/engineer2.jpg';
import bridge from '../assets/cucutaBGPuente.jpg';
import city from '../assets/cucutaBG2.jpg';
import gasesOriente from '../clients/gasesOriente.png';
import rednova from '../clients/rednova.png';

const services = [
  ['01', 'Ingeniería eléctrica', 'Diseño, construcción y mantenimiento de sistemas de potencia para entornos industriales, comerciales y urbanos.'],
  ['02', 'Infraestructura civil', 'Obras civiles y estructurales planeadas con rigor técnico, control de obra y visión de largo plazo.'],
  ['03', 'Consultoría técnica', 'Diagnóstico, viabilidad y acompañamiento normativo para tomar decisiones con respaldo profesional.'],
];

export default function MainPage() {
  return <PageShell>
    <PageHero eyebrow="Dimelco S.A.S. · Cúcuta" image={hero} title="Ingeniería que hace avanzar a la región." description="Diseñamos y ejecutamos soluciones eléctricas, civiles y técnicas para proyectos que necesitan seguridad, precisión y continuidad.">
      <Link to="/servicios" className="button button--primary">Conocer servicios</Link>
      <Link to="/proyectos" className="button button--secondary">Ver proyectos</Link>
    </PageHero>

    <section className="section">
      <div className="container split">
        <div className="split__text"><p className="eyebrow eyebrow--green">La forma Dimelco</p><h2>Resolver bien lo esencial.</h2><p>Trabajamos con equipos que entienden que la infraestructura no admite improvisaciones. Cada intervención combina conocimiento de campo, cumplimiento técnico y una comunicación clara con el cliente.</p><p>Nuestra experiencia se concentra en proyectos donde la confiabilidad y la seguridad son parte del resultado, no una promesa adicional.</p><div className="callout">Un solo equipo para acompañar desde la evaluación inicial hasta la entrega de la obra.</div></div>
        <div className="split__image"><img src={engineer} alt="Equipo de ingeniería Dimelco trabajando" /></div>
      </div>
    </section>

    <section className="section section--muted"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Capacidades</p><h2>Soluciones claras para retos complejos.</h2><p>Especialidades conectadas por una misma exigencia: hacer que cada proyecto funcione bien, hoy y con el paso del tiempo.</p></div><div className="card-grid">{services.map(([number, title, text]) => <article key={number} className="card"><span className="card__number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Trabajo reciente</p><h2>Proyectos construidos con propósito.</h2></div><div className="project-grid"><Link to="/proyectos" className="project"><img src={bridge} alt="Infraestructura urbana en Cúcuta"/><div className="project__content"><p className="project__category">Infraestructura</p><h3>Obras que conectan territorio y desarrollo.</h3></div></Link><Link to="/proyectos" className="project"><img src={city} alt="Entorno urbano para proyectos de ingeniería"/><div className="project__content"><p className="project__category">Energía</p><h3>Sistemas técnicos diseñados para responder.</h3></div></Link><Link to="/proyectos" className="project"><img src={engineer} alt="Profesional de ingeniería en campo"/><div className="project__content"><p className="project__category">Consultoría</p><h3>Decisiones de proyecto respaldadas por experiencia.</h3></div></Link></div></div></section>

    <section className="section section--muted"><div className="container"><div className="section-heading section-heading--center"><p className="eyebrow eyebrow--green">Confían en nosotros</p><h2>Relaciones que se sostienen en el trabajo bien hecho.</h2></div><div className="clients"><a href="https://www.rednova.com.co/" target="_blank" rel="noreferrer"><img src={rednova} alt="Rednova" /></a><a href="https://www.gasesdeloriente.com.co/" target="_blank" rel="noreferrer"><img src={gasesOriente} alt="Gases del Oriente" /></a></div></div></section>

    <section className="section section--ink"><div className="container cta"><h2>Conversemos sobre el próximo paso de su proyecto.</h2><Link to="/contacto" className="button button--secondary">Solicitar información</Link></div></section>
  </PageShell>;
}
