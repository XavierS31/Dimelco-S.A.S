import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import bridge from '../assets/cucutaBGPuente.jpg';
import engineer from '../assets/engineer.jpg';

const principles = [
  ['01', 'Rigor técnico', 'Evaluamos cada decisión con criterio profesional, normativa aplicable y atención al detalle.'],
  ['02', 'Compromiso en obra', 'Acompañamos el proceso para que la ejecución corresponda a lo que el proyecto necesita.'],
  ['03', 'Relaciones directas', 'Mantenemos una comunicación sencilla, honesta y útil con clientes, aliados y equipos.'],
];

export default function AboutPage() {
  return <PageShell>
    <PageHero eyebrow="Nosotros" image={bridge} title="Experiencia local, perspectiva de largo plazo." description="Somos una firma de ingeniería de Cúcuta dedicada a transformar necesidades de infraestructura en soluciones concretas y confiables." />
    <section className="section"><div className="container split"><div className="split__image"><img src={engineer} alt="Ingeniero Dimelco en un proyecto" /></div><div className="split__text"><p className="eyebrow eyebrow--green">Nuestra historia</p><h2>Crecer con cada desafío técnico.</h2><p>Dimelco S.A.S. nació con la convicción de que la ingeniería bien ejecutada mejora la manera en que viven y trabajan las personas. Desde entonces, hemos reunido experiencia en sistemas eléctricos, obras civiles y consultoría para atender retos reales de nuestra región.</p><p>Hoy seguimos trabajando con la misma cercanía de una empresa local y la disciplina que requieren los proyectos de alto impacto.</p></div></div></section>
    <section className="section section--muted"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Nuestro norte</p><h2>Dos compromisos que orientan cada proyecto.</h2></div><div className="card-grid"><article className="card"><span className="card__number">Misión</span><h3>Hacer que la ingeniería responda.</h3><p>Ofrecer soluciones innovadoras y sostenibles que den eficiencia, seguridad y valor a los proyectos de nuestros clientes.</p></article><article className="card"><span className="card__number">Visión</span><h3>Ser un referente confiable.</h3><p>Consolidarnos como un aliado técnico reconocido por la calidad de sus decisiones, sus obras y sus relaciones.</p></article><article className="card"><span className="card__number">Enfoque</span><h3>Trabajar con responsabilidad.</h3><p>Entender el contexto, cuidar los recursos y ejecutar con precisión en cada etapa del proyecto.</p></article></div></div></section>
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow--green">Cómo trabajamos</p><h2>Una forma de hacer que se nota en la entrega.</h2></div><div className="card-grid">{principles.map(([number, title, text]) => <article className="card" key={number}><span className="card__number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section section--ink"><div className="container cta"><h2>Un aliado técnico para proyectos que deben durar.</h2><Link to="/contacto" className="button button--secondary">Hable con nuestro equipo</Link></div></section>
  </PageShell>;
}
