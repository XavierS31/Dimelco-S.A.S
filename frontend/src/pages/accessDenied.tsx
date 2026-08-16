import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageShell from '../components/PageShell';
import { signOut } from '../lib/api';

export default function AccessDeniedPage() {
  return <PageShell>
    <PageHero
      tone="light"
      eyebrow="Acceso restringido"
      title="Esta area es solo para empleados de DIMELCO S.A.S."
      description="La cuenta con la que inicio sesion no esta registrada como colaborador activo de DIMELCO."
    />
    <section className="section">
      <div className="container auth-layout">
        <div className="auth-panel">
          <h2>Su cuenta no tiene acceso al portal interno.</h2>
          <p>Si pertenece al equipo, solicite al administrador que active su correo en el directorio de empleados.</p>
          <button className="button button--primary" type="button" onClick={() => void signOut()}>Usar otra cuenta</button>
        </div>
        <aside className="auth-aside">
          <h3>Necesita ayuda?</h3>
          <p>Contacte a DIMELCO para verificar el acceso de su cuenta corporativa.</p>
          <Link to="/contacto" className="button button--secondary">Contactar a DIMELCO</Link>
        </aside>
      </div>
    </section>
  </PageShell>;
}
