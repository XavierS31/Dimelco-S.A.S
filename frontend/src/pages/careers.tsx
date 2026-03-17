import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoGreen from '../assets/DimelcoSASGreenCopy.png';
import dimelcoNoBg from '../assets/dimelcoWhiteNoBG.png';
import bogotaSL from '../assets/bogotaSL.jpg';
import phoneIcon from '../assets/phone.png';
import mailIcon from '../assets/mail.png';
import locationIcon from '../assets/location.png';
import './careers.css';

const JOBS = [
  { title: 'Senior Software Engineer', location: 'Remoto / Sede principal', type: 'Tiempo completo', dept: 'Engineering' },
  { title: 'Operations Manager', location: 'Sede principal', type: 'Tiempo completo', dept: 'Operations' },
  { title: 'Marketing Coordinator', location: 'Híbrido', type: 'Tiempo completo', dept: 'Marketing' },
];

const CareersPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top bar */}
      <div className="text-[10px]" style={{ backgroundColor: '#eef6ec', color: '#46812F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <a href="https://www.linkedin.com/company/dimelco-sas/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-3" aria-label="LinkedIn de Dimelco S.A.S">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <a href="https://maps.google.com/?q=Cl.+2+Nte.+%231e07+Cucuta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={locationIcon} alt="" className="w-4 h-4 object-contain" />
              <span className="hidden sm:inline">Cúcuta, Colombia</span>
            </a>
            <a href="tel:+573017239148" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={phoneIcon} alt="" className="w-4 h-4 object-contain" />
              <span>+57 301-723-9148</span>
            </a>
            <a href="mailto:dimelco@hotmail.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={mailIcon} alt="" className="w-4 h-4 object-contain" />
              <span className="hidden sm:inline">dimelco@hotmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: '#46812F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={logoGreen} alt="Dimelco S.A.S." className="h-12 w-auto object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Inicio</Link>
              <Link to="/nosotros" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Nosotros</Link>
              <Link to="/servicios" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Servicios</Link>
              <Link to="/proyectos" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Proyectos</Link>
              <span className="font-semibold border-b-2 border-white py-2 text-white cursor-default">Carreras</span>
              <Link to="/nosotros" className="bg-white text-[#46812F] px-5 py-2.5 rounded-lg font-semibold hover:brightness-95 transition-colors">Contáctanos</Link>
            </nav>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white" aria-label="Menú">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/30 px-4 py-4 space-y-3" style={{ backgroundColor: '#46812F' }}>
            <Link to="/" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link to="/nosotros" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
            <Link to="/servicios" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Servicios</Link>
            <Link to="/proyectos" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
            <span className="block py-2 font-semibold text-white">Carreras</span>
            <Link to="/nosotros" className="block py-2 text-white font-bold hover:underline" onClick={() => setIsMenuOpen(false)}>Contáctanos</Link>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bogotaSL})` }}
        >
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32 flex flex-col items-center text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-5xl flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              Construye tu futuro en <img src={dimelcoNoBg} alt="Dimelco S.A.S." className="h-10 sm:h-12 lg:h-14 w-auto object-contain inline-block" />
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
              Buscamos profesionales innovadores y dedicados para unirse a nuestro equipo. Genera impacto en una cultura basada en la excelencia y la integridad.
            </p>
            <div className="mt-10">
              <a href="#open-positions" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white md:px-10 transition-all hover:opacity-90" style={{ backgroundColor: '#46812F' }}>
                Únete al equipo
              </a>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¿Por qué trabajar con nosotros?</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                En Dimelco S.A.S. creemos que nuestra fortaleza está en nuestra gente. Fomentamos un ambiente de crecimiento, colaboración y respeto mutuo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100 transition-transform hover:-translate-y-1">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 text-[#46812F]" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mentalidad de crecimiento</h3>
                <p className="text-gray-600">El aprendizaje continuo está en nuestro ADN. Ofrecemos formación y recursos para que destaques en tu carrera.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100 transition-transform hover:-translate-y-1">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 text-[#46812F]" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cultura inclusiva</h3>
                <p className="text-gray-600">Celebramos la diversidad y valoramos las perspectivas únicas que cada miembro aporta a nuestros proyectos.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-100 transition-transform hover:-translate-y-1">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6 text-[#46812F]" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.040z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Equilibrio vida-trabajo</h3>
                <p className="text-gray-600">Entendemos que el mejor rendimiento requiere descanso. Opciones flexibles para que mantengas energía y salud.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gray-100" id="open-positions">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-gray-900">Vacantes actuales</h2>
                <p className="text-gray-600 mt-2">Encuentra el rol adecuado para tus habilidades y experiencia.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-600 cursor-pointer hover:border-[#46812F] transition-all">Todos los departamentos</span>
                <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-600 cursor-pointer hover:border-[#46812F] transition-all">Ingeniería</span>
              </div>
            </div>
            <div className="space-y-4">
              {JOBS.map((job) => (
                <div key={job.title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:border-[#46812F] transition-colors group">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#46812F] transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
                      <span className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-[#46812F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-[#46812F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                        {job.type}
                      </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">{job.dept}</span>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <a href="mailto:dimelco@hotmail.com" className="inline-block px-6 py-2 border-2 border-[#46812F] text-[#46812F] font-bold rounded-lg hover:bg-[#46812F] hover:text-white transition-all">Aplicar</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600">¿No encuentras un puesto que encaje? Siempre estamos buscando talento.</p>
              <a href="mailto:dimelco@hotmail.com" className="text-[#46812F] font-semibold hover:underline mt-2 inline-block">Envíanos tu CV de todas formas →</a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Beneficios y ventajas</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Salud y bienestar', desc: 'Planes de seguro de salud y programas de bienestar para ti y tu familia.' },
                    { title: 'Días libres pagados', desc: 'Vacaciones, licencia por enfermedad y festivos para que puedas recargar energías.' },
                    { title: 'Crecimiento continuo', desc: 'Presupuesto anual para desarrollo profesional, cursos y conferencias.' },
                  ].map((b) => (
                    <div key={b.title} className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-6 w-6 text-[#46812F]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">{b.title}</h4>
                        <p className="text-gray-600">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img alt="Equipo colaborando" className="rounded-lg shadow-2xl w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADOXzsTki1v46RwzX-6a7H5iUhp9ezXU5bbYJWoy7ARlUi9U1Be5x7CKCLloDFLwLiPGi-SqayDodThVBlMLA5hJU2XOfNZuhVo8hb09mn9nA1d7Pw_iwUbIIrn9hVc7Av0HJgFwwIiQsHtgi4bRyIY7-JWpT1Wk1FwxmH1Bvu_HUHnNtskfaWwViO2q_QpY11bHo9K4OOKnK_C3J3lUTl__K2AbB40ci-rFhuaKm4gUK8o8QPdlUSRzUzBl5Gvc_b1gPJsPnismA" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg -z-10" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#46812F] text-white py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <img src={logoGreen} alt="Dimelco" className="h-12 w-auto mb-4 opacity-95" />
              <p className="text-white/90 text-sm mb-4 leading-relaxed">Servicios de ingeniería profesional para un mundo en desarrollo. Especializados en infraestructura de alto rendimiento y sistemas eléctricos.</p>
              <p className="text-white/80 text-xs">© 2026 Dimelco S.A.S. Todos los derechos reservados.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-white/90">
                <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
                <li><Link to="/servicios" className="hover:text-white transition-colors">Nuestros Servicios</Link></li>
                <li><Link to="/proyectos" className="hover:text-white transition-colors">Portafolio de Proyectos</Link></li>
                <li><Link to="/carreras" className="hover:text-white transition-colors">Carreras</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <ul className="space-y-3 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <img src={locationIcon} alt="" className="w-5 h-5 object-contain flex-shrink-0 mt-0.5" style={{ filter: 'brightness(0) invert(1)' }} />
                  <a href="https://maps.google.com/?q=Cl.+2+Nte.+%231e07+Cucuta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cl. 2 Nte. #1e175 <br />Cucuta, Norte de Santander</a>
                </li>
                <li className="flex items-center gap-2">
                  <img src={phoneIcon} alt="" className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  <a href="tel:+573017239148" className="hover:text-white transition-colors">+57 301-723-9148</a>
                </li>
                <li className="flex items-center gap-2">
                  <img src={mailIcon} alt="" className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  <a href="mailto:dimelco@hotmail.com" className="hover:text-white transition-colors">dimelco@hotmail.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Conéctate con nosotros</h4>
              <p className="text-white/90 text-sm mb-4">Síguenos en nuestras redes para estar actualizado.</p>
              <a href="https://www.linkedin.com/company/dimelco-sas/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors" aria-label="LinkedIn dimelco-sas">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span>dimelco-sas</span>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 flex justify-end gap-6 text-sm text-white/80">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;
