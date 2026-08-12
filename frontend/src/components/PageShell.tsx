import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/DimelcoSASlogo.png';
import footerLogo from '../assets/dimelcoWhiteNoBG.png';

const navigation = [
  ['/', 'Inicio'],
  ['/nosotros', 'Nosotros'],
  ['/servicios', 'Servicios'],
  ['/proyectos', 'Proyectos'],
  ['/carreras', 'Carreras'],
];

export default function PageShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="site-shell">
      <div className="utility-bar">
        <div className="container utility-bar__content">
          <span>Ingeniería e infraestructura · Cúcuta, Colombia</span>
          <div className="utility-bar__links">
            <a href="tel:+573017239148">+57 301 723 9148</a>
            <a href="mailto:dimelco@hotmail.com">dimelco@hotmail.com</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__content">
          <Link className="brand" to="/" aria-label="Dimelco S.A.S., inicio">
            <img src={logo} alt="Dimelco S.A.S." />
          </Link>
          <nav className="site-nav" aria-label="Navegación principal">
            {navigation.map(([to, label]) => <Link key={to} to={to} className={pathname === to ? 'is-active' : ''}>{label}</Link>)}
            <Link to="/contacto" className="button button--primary button--compact">Hablemos</Link>
          </nav>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            <span /> <span />
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil">
          {navigation.map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={pathname === to ? 'is-active' : ''}>{label}</Link>)}
          <Link to="/contacto" onClick={() => setMenuOpen(false)} className="button button--primary">Hablemos</Link>
        </nav>}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-intro">
            <img src={footerLogo} alt="Dimelco S.A.S." />
            <p>Soluciones de ingeniería que convierten retos técnicos en infraestructura confiable.</p>
          </div>
          <div>
            <p className="footer-heading">Navegación</p>
            <div className="footer-links">{navigation.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
          </div>
          <div>
            <p className="footer-heading">Contacto</p>
            <div className="footer-links">
              <a href="https://maps.google.com/?q=Cl.+2+Nte.+1E-7+Barrio+La+Ceiba+Cucuta" target="_blank" rel="noreferrer">Cl. 2 Nte. # 1E-7<br />Barrio La Ceiba, Cúcuta</a>
              <a href="tel:+573017239148">+57 301 723 9148</a>
              <a href="mailto:dimelco@hotmail.com">dimelco@hotmail.com</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Dimelco S.A.S.</span><a href="https://www.linkedin.com/company/dimelco-sas/" target="_blank" rel="noreferrer">LinkedIn</a></div>
      </footer>
    </div>
  );
}
