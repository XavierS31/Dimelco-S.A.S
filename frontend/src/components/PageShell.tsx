import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/DimelcoSASlogo.png';
import footerLogo from '../assets/dimelcoWhiteNoBG.png';
import { company } from '../data/company';

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
  const pageName = pathname === '/' ? 'home' : pathname.slice(1);

  return (
    <div className={`site-shell site-shell--${pageName}`}>
      <div className="utility-bar">
        <div className="container utility-bar__content">
          <span>Ingeniería de gas, climatización y energía · Cúcuta, Colombia</span>
          <div className="utility-bar__links">
            <a href="tel:+573012547830">+57 {company.phones[0]}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
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
            <Link to="/contacto" className="button button--primary button--compact">Contactanos</Link>
          </nav>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            <span /> <span />
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegación móvil">
          {navigation.map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={pathname === to ? 'is-active' : ''}>{label}</Link>)}
          <Link to="/contacto" onClick={() => setMenuOpen(false)} className="button button--primary">Contactanos</Link>
        </nav>}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-intro">
            <img src={footerLogo} alt="Dimelco S.A.S." />
            <p>Diseños e Instalaciones Civiles y Electromecánicos para infraestructura de gas, energía y climatización.</p>
          </div>
          <div>
            <p className="footer-heading">Navegación</p>
            <div className="footer-links">{navigation.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
          </div>
          <div>
            <p className="footer-heading">Contacto</p>
            <div className="footer-links">
              <a href="https://maps.google.com/?q=Calle+2N+1E-07+Barrio+Quinta+Bosch+Cucuta" target="_blank" rel="noreferrer">Calle 2N # 1E-07<br />Barrio Quinta Bosch, Cúcuta</a>
              <a href="tel:+573012547830">+57 {company.phones[0]} · {company.phones[1]}</a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Dimelco S.A.S.</span><div className="footer-bottom__actions"><Link className="footer-login" to="/login">Ingreso de Empleados</Link><a href="https://www.linkedin.com/company/dimelco-sas/" target="_blank" rel="noreferrer">LinkedIn</a></div></div>
      </footer>
    </div>
  );
}
