import { FormEvent, useState } from 'react';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';
import { ApiError, api } from '../lib/api';
import { company } from '../data/company';

type ContactField = 'name' | 'email' | 'subject' | 'message';
type FieldErrors = Partial<Record<ContactField, string>>;

export default function ContactPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('loading');
    setMessage('');
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    try {
      await api('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          full_name: form.get('nombre'),
          company: form.get('empresa'),
          email: form.get('correo'),
          subject: form.get('tema'),
          message: form.get('mensaje'),
        }),
      });
      event.currentTarget.reset();
      setState('success');
      setMessage('Recibimos su mensaje. Nuestro equipo lo revisará y responderá por el canal adecuado.');
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setFieldErrors((error.fields ?? {}) as FieldErrors);
      }
      setState('error');
      setMessage(error instanceof Error ? error.message : 'No fue posible enviar el mensaje.');
    }
  };

  return (
    <PageShell>
      <PageHero tone="light" eyebrow="Contacto" title="Empecemos con una conversación." description="Cuéntenos qué necesita. Nuestro equipo revisará su mensaje y responderá por el canal más adecuado." />
      <section className="section">
        <div className="container contact-layout">
          <aside>
            <div className="contact-card">
              <p className="eyebrow eyebrow--green">Canales directos</p>
              <h2>Información de contacto</h2>
              <dl className="contact-details">
                <div><dt>Oficina</dt><dd><a href="https://maps.google.com/?q=Calle+2N+1E-07+Barrio+Quinta+Bosch+Cucuta" target="_blank" rel="noreferrer">Calle 2N # 1E-07<br />Barrio Quinta Bosch, Cúcuta<br />Norte de Santander, Colombia</a></dd></div>
                <div><dt>Teléfonos</dt><dd><a href="tel:+573002541830">+57 {company.phones[0]}</a><br /><a href="tel:+573017239148">+57 {company.phones[1]}</a><br /><a href="tel:+575753084">{company.phones[2]}</a></dd></div>
                <div><dt>Correo</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
              </dl>
            </div>
            <iframe className="map-frame" title="Ubicación de Dimelco S.A.S. en Cúcuta" src="https://www.google.com/maps?q=Calle+2N+1E-07+Barrio+Quinta+Bosch+Cucuta&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </aside>
          <div className="contact-card">
            <p className="eyebrow eyebrow--green">Escríbanos</p>
            <h2>Háblenos de su proyecto.</h2>
            <p style={{ color: '#647066', lineHeight: 1.65, marginBottom: '28px' }}>Su mensaje llegará directamente al espacio de administración de DIMELCO.</p>
            <form className="contact-form" onSubmit={submit} noValidate>
              <label>Nombre
                <input name="nombre" autoComplete="given-name" required aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined} disabled={state === 'loading'} />
                {fieldErrors.name && <span id="contact-name-error" className="form-feedback form-feedback--error">{fieldErrors.name}</span>}
              </label>
              <label>Empresa<input name="empresa" autoComplete="organization" disabled={state === 'loading'} /></label>
              <label className="full">Correo electrónico
                <input name="correo" type="email" autoComplete="email" required aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined} disabled={state === 'loading'} />
                {fieldErrors.email && <span id="contact-email-error" className="form-feedback form-feedback--error">{fieldErrors.email}</span>}
              </label>
              <label className="full">Tema
                <select name="tema" defaultValue="" required aria-invalid={Boolean(fieldErrors.subject)} aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined} disabled={state === 'loading'}>
                  <option value="" disabled>Seleccione una opción</option>
                  <option>Solicitud de propuesta</option>
                  <option>Consulta técnica</option>
                  <option>Oportunidades laborales</option>
                  <option>Otro asunto</option>
                </select>
                {fieldErrors.subject && <span id="contact-subject-error" className="form-feedback form-feedback--error">{fieldErrors.subject}</span>}
              </label>
              <label className="full">Mensaje
                <textarea name="mensaje" rows={6} required aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined} disabled={state === 'loading'} />
                {fieldErrors.message && <span id="contact-message-error" className="form-feedback form-feedback--error">{fieldErrors.message}</span>}
              </label>
              {state !== 'idle' && <p className={`form-feedback ${state === 'success' ? 'form-feedback--success' : state === 'error' ? 'form-feedback--error' : ''} full`} role={state === 'error' ? 'alert' : 'status'}>{state === 'loading' ? 'Enviando mensaje...' : message}</p>}
              <div className="full"><button className="button button--primary" type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Enviando...' : 'Enviar mensaje'}</button></div>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
