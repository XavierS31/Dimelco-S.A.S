import { FormEvent, useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';

type Message = { role: 'assistant' | 'user'; text: string };

const welcome: Message = {
  role: 'assistant',
  text: 'Hola, soy el asistente de DIMELCO. Puedo orientarte sobre nuestros servicios, proyectos, vacantes o cómo navegar el sitio.',
};

const quickQuestions = ['Número y correo', 'Dirección', 'Servicios', 'Proyectos', 'Ingreso de empleados', 'Postularme'];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, state]);

  const ask = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || state === 'loading') return;
    const history = messages.slice(-6).map((item) => ({ role: item.role === 'assistant' ? 'model' as const : 'user' as const, text: item.text }));
    setMessages((items) => [...items, { role: 'user', text: message }]);
    setInput(''); setError(''); setState('loading');
    try {
      const { reply } = await api<{ reply: string }>('/api/chat', { method: 'POST', body: JSON.stringify({ message, history }) });
      setMessages((items) => [...items, { role: 'assistant', text: reply }]);
      setState('idle');
    } catch (requestError) {
      setState('error');
      setError(requestError instanceof Error ? requestError.message : 'No fue posible comunicarse con el asistente.');
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); await ask(input); };

  return <aside className={`chatbot ${open ? 'is-open' : ''}`} aria-label="Asistente de DIMELCO">
    {open && <section className="chatbot__panel" aria-live="polite">
      <header className="chatbot__header"><div><span>Asistente DIMELCO</span><p>Información y orientación</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">×</button></header>
      <div className="chatbot__messages" ref={messagesRef}>{messages.map((message, index) => <p key={`${message.role}-${index}`} className={`chatbot__message chatbot__message--${message.role}`}>{message.text}</p>)}{state === 'loading' && <p className="chatbot__message chatbot__message--assistant chatbot__typing">Consultando…</p>}</div>
      {state === 'error' && <p className="chatbot__error" role="alert">{error}</p>}
      <div className="chatbot__quick" aria-label="Preguntas frecuentes">{quickQuestions.map((question) => <button key={question} type="button" disabled={state === 'loading'} onClick={() => void ask(question)}>{question}</button>)}</div>
      <form className="chatbot__form" onSubmit={submit}><label className="sr-only" htmlFor="chatbot-message">Escriba su pregunta</label><input id="chatbot-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escriba su pregunta…" maxLength={900} disabled={state === 'loading'} /><button type="submit" disabled={state === 'loading' || !input.trim()}>Enviar</button></form>
    </section>}
    <button className="chatbot__launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.4 18.6 4 21l3.2-1.15A8.5 8.5 0 1 0 3.5 16.2c0 .84.12 1.64.35 2.4L5.4 18.6Zm3.1-8.2h7M8.5 14h4.2" /></svg><span>Ayuda</span></button>
  </aside>;
}
