import React from "react";
import "./MainPage.css";

const services = [
  { title: "Diseño y construcción de redes de gas", desc: "Gasoductos y redes de distribución de Gas Natural y Propano (GN/GLP)." },
  { title: "Obras civiles y estaciones", desc: "Obras civiles y mecánicas para estaciones de distribución y ERM." },
  { title: "Montajes electromecánicos", desc: "Montaje y mantenimiento de tuberías, equipos industriales y estructuras." },
  { title: "Plantas y almacenamiento GLP", desc: "Diseño y construcción de plantas de almacenamiento/llenado e inspección de tanques." },
  { title: "Mantenimiento y emergencias", desc: "Atención de escapes, mantenimiento de redes e instalaciones de GN y GLP." },
  { title: "Climatización y energías alternativas", desc: "Sistemas de aire acondicionado, calefacción y calentamiento de agua a gas y energía solar." },
];

const values = [
  { title: "Responsabilidad", desc: "Cumplimiento y logro efectivo en cada proyecto." },
  { title: "Honestidad", desc: "Transparencia para construir aliados y relaciones a largo plazo." },
  { title: "Lealtad", desc: "Confianza y compromiso con colaboradores y clientes." },
];

export default function MainPage() {
  return (
    <div className="dml-root">
      {/* Top bar */}
      <header className="dml-topbar">
        <div className="dml-topbar__inner">
          <nav className="dml-nav dml-nav--left">
            <a className="dml-nav__link" href="#servicios">Servicios</a>
            <a className="dml-nav__link" href="#empresa">Empresa</a>
            <a className="dml-nav__link" href="#clientes">Clientes</a>
          </nav>

          <div className="dml-brand">
            <img className="dml-brand__logo dml-brand__logo--large" src="/DimelcoSASlogo.png" alt="DIMELCO S.A.S." />
            <div className="dml-brand__text">
              <div className="dml-brand__name">DIMELCO S.A.S.</div>
              <div className="dml-brand__tagline">
                Ingeniería • Gas combustible • Obras civiles • Montajes electromecánicos
              </div>
            </div>
          </div>

          <nav className="dml-nav dml-nav--right">
            <a className="dml-nav__link" href="#nosotros">Nosotros</a>
            <a className="dml-nav__link" href="#contacto">Contacto</a>
            <a className="dml-btn dml-btn--primary" href="#cotizar">Cotizar</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="dml-hero">
        <div className="dml-container">
          <div>
            <div className="dml-badge">
              <span className="dml-badge__dot" />
              Diseños, montajes electromecánicos, civiles y de gas combustible
            </div>

            <h1 className="dml-h1">
              Construimos y mantenemos <span className="dml-accent">infraestructura</span> con calidad y cumplimiento.
            </h1>

            <p className="dml-lead">
              DIMELCO S.A.S. es una empresa de ingeniería y servicios con experiencia en Gas Natural (GN) y GLP,
              obras civiles, montajes electromecánicos, climatización y energías alternativas.
            </p>

            <div className="dml-actions">
              <a className="dml-btn dml-btn--primary" href="#cotizar">Solicitar cotización</a>
              <a className="dml-btn dml-btn--ghost" href="#servicios">Ver servicios</a>
            </div>

            <div className="dml-stats">
              <div className="dml-stat">
                <div className="dml-stat__k">+2004</div>
                <div className="dml-stat__v">Experiencia en proyectos</div>
              </div>
              <div className="dml-stat">
                <div className="dml-stat__k">GN / GLP</div>
                <div className="dml-stat__v">Redes • almacenamiento • mantenimiento</div>
              </div>
              <div className="dml-stat">
                <div className="dml-stat__k">Calidad</div>
                <div className="dml-stat__v">Normas técnicas y buenas prácticas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="dml-section">
        <div className="dml-container">
          <div className="dml-section__head">
            <div>
              <h2 className="dml-h2">Servicios</h2>
              <p className="dml-muted">
                Construcción y edificación, redes de gasoductos, infraestructura, montajes electromecánicos y servicios complementarios.
              </p>
            </div>
            <div className="dml-badges">
              <span className="dml-badge dml-badge--small"><span className="dml-badge__dot" />GN / GLP</span>
              <span className="dml-badge dml-badge--small"><span className="dml-badge__dot" />Obras civiles</span>
              <span className="dml-badge dml-badge--small"><span className="dml-badge__dot" />Electromecánica</span>
            </div>
          </div>

          <div className="dml-grid-3">
            {services.map((s) => (
              <div key={s.title} className="dml-card">
                <div className="dml-card__row">
                  <span className="dml-bullet" />
                  <h3 className="dml-h3">{s.title}</h3>
                </div>
                <p className="dml-muted">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="dml-footnote">
            También: protección catódica, sandblasting y pintura, fabricación/montaje de tanques y estructuras, capacitación y evaluación.
          </div>
        </div>
      </section>

      {/* Company */}
      <section id="empresa" className="dml-section dml-section--white">
        <div className="dml-container dml-company">
          <div>
            <h2 className="dml-h2">Nuestra empresa</h2>
            <p className="dml-muted">
              Empresa de ingeniería y servicios con experiencia en gases combustibles, climatización y energías alternativas.
            </p>

            <div className="dml-grid-2">
              <div className="dml-card dml-card--soft">
                <div className="dml-card__title">Misión</div>
                <p className="dml-muted">
                  Permanecer como líderes, ofreciendo construcción, ejecución y mantenimiento con talento humano capacitado.
                </p>
              </div>
              <div className="dml-card dml-card--soft">
                <div className="dml-card__title">Visión</div>
                <p className="dml-muted">
                  Ser empresa líder en obras civiles y servicios, con altos estándares de calidad, cumplimiento y servicio al cliente.
                </p>
              </div>
            </div>
          </div>

          <aside className="dml-card dml-card--grad">
            <div className="dml-card__title">Valores corporativos</div>
            <div className="dml-stack">
              {values.map((v) => (
                <div key={v.title} className="dml-card dml-card--inner">
                  <div className="dml-card__row">
                    <span className="dml-dot" />
                    <div className="dml-strong">{v.title}</div>
                  </div>
                  <div className="dml-muted">{v.desc}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Clients */}
      <section id="clientes" className="dml-section">
        <div className="dml-container">
          <h2 className="dml-h2">Principales clientes</h2>
          <p className="dml-muted">
            Experiencia en gasificación, mantenimiento de redes y adecuaciones de estaciones y viviendas.
          </p>

          <div className="dml-grid-2">
            <div className="dml-card">
              <div className="dml-card__row">
                <span className="dml-bullet" />
                <h3 className="dml-h3">Gases del Oriente</h3>
              </div>
              <p className="dml-muted">
                Gasificación de Cúcuta y área metropolitana; reparaciones y mantenimiento de redes de distribución.
              </p>
            </div>
            <div className="dml-card">
              <div className="dml-card__row">
                <span className="dml-bullet" />
                <h3 className="dml-h3">Rednova</h3>
              </div>
              <p className="dml-muted">
                Obras en Santander y Boyacá; adecuaciones de estaciones, montajes de ERM y puesta en servicio de viviendas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="dml-section dml-section--white">
        <div className="dml-container">
          <h2 className="dml-h2">Nosotros</h2>
          <p className="dml-muted">
            Conoce más sobre DIMELCO S.A.S. y nuestro compromiso con la excelencia.
          </p>
        </div>
      </section>

      {/* Cotizar */}
      <section id="cotizar" className="dml-section">
        <div className="dml-container">
          <h2 className="dml-h2">Cotizar</h2>
          <p className="dml-muted">
            Solicita una cotización personalizada para tu proyecto.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="dml-section dml-section--contact">
        <div className="dml-container dml-contact">
          <div>
            <h2 className="dml-h2">Contacto</h2>
            <p className="dml-muted">
              Cuéntanos qué necesitas. Respondemos con una propuesta clara.
            </p>

            <div className="dml-card dml-card--soft dml-contact__box">
              <div className="dml-strong">DIMELCO S.A.S.</div>
              <div className="dml-contact__lines">
                <div><span className="dml-label">Dirección:</span> Calle 2N # 1E-07, Quinta Bosch, Cúcuta</div>
                <div><span className="dml-label">Email:</span> <a className="dml-link" href="mailto:dimelco@hotmail.com">dimelco@hotmail.com</a></div>
                <div><span className="dml-label">Tel:</span> <a className="dml-link" href="tel:+573017239148">+57 301 723 9148</a> / <a className="dml-link" href="tel:+573002541830">+57 300 254 1830</a></div>
              </div>
            </div>

            <div className="dml-actions">
              <a
                className="dml-btn dml-btn--yellow"
                href="mailto:dimelco@hotmail.com?subject=Contacto%20DIMELCO%20S.A.S.&body=Hola%20DIMELCO%2C%0A%0A%0A%0AGracias."
              >
                Enviar correo
              </a>
              <a className="dml-btn dml-btn--primary" href="tel:+573017239148">Llamar</a>
            </div>
          </div>

          <aside className="dml-card dml-card--padded">
            <div className="dml-strong">¿Qué podemos cotizar?</div>
            <ul className="dml-list">
              <li>Redes GN y GLP (construcción, reparación, mantenimiento)</li>
              <li>Obras civiles para estaciones y adecuaciones</li>
              <li>Montajes electromecánicos e industriales</li>
              <li>Inspección y mantenimiento de tanques</li>
              <li>Climatización y energía solar</li>
            </ul>

            <div className="dml-callout dml-callout--green">
              <div className="dml-callout__title">Respuesta rápida</div>
              <div className="dml-callout__text">
                Técnicos certificados y disponibilidad operativa.
              </div>
            </div>
          </aside>
        </div>

        <div className="dml-footer">
          <div className="dml-container dml-footer__inner">
            <div>© {new Date().getFullYear()} DIMELCO S.A.S. — Cúcuta, Norte de Santander</div>
            <div className="dml-footer__meta">
              <span><strong>NIT:</strong> 807.000.946-1</span>
              <span className="dml-sep" />
              <span><strong>Email:</strong> dimelco@hotmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
