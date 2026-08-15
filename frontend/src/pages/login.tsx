import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { signInWithGoogle } from '../lib/api';

export default function LoginPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const signIn = async () => {
    setState('loading');
    setMessage('');
    try {
      await signInWithGoogle('/dashboard');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'No fue posible iniciar sesión.');
    }
  };

  return <PageShell>
    <PageHero tone="light" eyebrow="Área interna" title="Acceso para el equipo DIMELCO." description="Inicie sesión con su cuenta corporativa autorizada para registrar actividad y consultar la operación." />
    <section className="section"><div className="container auth-layout"><div className="auth-panel"><p className="eyebrow eyebrow--green">Ingreso seguro</p><h2>Continúe con Google.</h2><p>El acceso se valida contra el directorio de colaboradores activos de DIMELCO.</p><button className="button button--primary gap-2" type="button" onClick={signIn} disabled={state === 'loading'}>{state === 'loading' ? 'Redirigiendo...' : <><img src="/google.svg" alt="Google Logo" className="w-5 h-5" />Ingresar con Google</>}</button>{state === 'error' && <p className="form-feedback form-feedback--error" role="alert">{message}</p>}</div><aside className="auth-aside"><h3>¿Necesita acceso?</h3><p>Solicite la activación de su cuenta al administrador de la plataforma.</p><Link to="/contacto" className="button button--secondary">Contactar a DIMELCO</Link></aside></div></section>
  </PageShell>;
}
