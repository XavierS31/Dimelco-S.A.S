import { FormEvent, useState } from 'react';
import { api } from '../lib/api';

type Job = { id: string; title: string; department: string; location: string; type: string };

type Props = { job: Job; onClose: () => void };

export default function ApplicationModal({ job, onClose }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('loading');
    setMessage('');

    try {
      const formData = new FormData(event.currentTarget);
      await api(`/api/jobs/${job.id}/apply`, { method: 'POST', body: formData });
      setState('success');
      setMessage('Recibimos su postulación. Nuestro equipo revisará la información enviada.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'No fue posible enviar la postulación.');
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="application-modal" role="dialog" aria-modal="true" aria-labelledby="application-title">
        <div className="application-modal__header">
          <div><p className="eyebrow eyebrow--green">Postulación</p><h2 id="application-title">{job.title}</h2><p>{job.location} · {job.type} · {job.department}</p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar formulario">Cerrar</button>
        </div>

        {state === 'success' ? <div className="form-feedback form-feedback--success" role="status"><p>{message}</p><button className="button button--primary" type="button" onClick={onClose}>Cerrar</button></div> : <form className="application-form" onSubmit={submit}>
          <label>Nombre completo<input name="full_name" autoComplete="name" required disabled={state === 'loading'} /></label>
          <label>Correo electrónico<input name="email" type="email" autoComplete="email" required disabled={state === 'loading'} /></label>
          <label>Teléfono<input name="phone" type="tel" autoComplete="tel" required disabled={state === 'loading'} /></label>
          <label>Hoja de vida<input name="resume" type="file" accept=".pdf,.doc,.docx" required disabled={state === 'loading'} /><small>PDF, DOC o DOCX. Máximo 5 MB.</small></label>
          <label className="full">Carta de presentación<textarea name="cover_letter" rows={5} disabled={state === 'loading'} /></label>
          {state === 'error' && <p className="form-feedback form-feedback--error" role="alert">{message}</p>}
          <div className="application-form__actions full"><button className="button button--secondary" type="button" onClick={onClose} disabled={state === 'loading'}>Cancelar</button><button className="button button--primary" type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Enviando...' : 'Enviar postulación'}</button></div>
        </form>}
      </section>
    </div>
  );
}
