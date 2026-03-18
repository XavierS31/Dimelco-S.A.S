import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/DimelcoSASlogo.png';
import logoGreen from '../assets/DimelcoSASGreenCopy.png';
import phoneIcon from '../assets/phone.png';
import mailIcon from '../assets/mail.png';
import locationIcon from '../assets/location.png';
import './contacts.css';

const ContactPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans scroll-smooth">
      {/* Top bar - same as mainpage */}
      <div className="bg-slate-100 text-[#46812F] text-[10px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <a
            href="https://www.linkedin.com/company/dimelco-sas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-3"
            aria-label="LinkedIn de Dimelco S.A.S"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <a href="https://maps.google.com/?q=Cl.+2+Nte.+1E-7+Barrio+La+ceiba+C%C3%BAcuta+Norte+de+Santander+Colombia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={locationIcon} alt="" className="w-4 h-4 object-contain" />
              <span className="hidden sm:inline">Cúcuta, Colombia</span>
            </a>
            <a href="tel:+573017239148" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={phoneIcon} alt="" className="w-4 h-4 object-contain" />
              <span>+57 301 723 9148</span>
            </a>
            <a href="mailto:dimelco@hotmail.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={mailIcon} alt="" className="w-4 h-4 object-contain" />
              <span className="hidden sm:inline">dimelco@hotmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header - same as mainpage: white bg, logo, nav */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img src={logo} alt="Dimelco S.A.S." className="h-12 w-auto object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link className="text-black hover:text-[#46812F] font-medium transition-colors" to="/">Inicio</Link>
              <Link className="text-black hover:text-[#46812F] font-medium transition-colors" to="/nosotros">Nosotros</Link>
              <Link className="text-black hover:text-[#46812F] font-medium transition-colors" to="/servicios">Servicios</Link>
              <Link className="text-black hover:text-[#46812F] font-medium transition-colors" to="/proyectos">Proyectos</Link>
              <Link className="text-black hover:text-[#46812F] font-medium transition-colors" to="/carreras">Carreras</Link>
              <Link className="text-[#46812F] font-medium border-b-2 border-[#46812F] pb-0.5 hover:opacity-80 transition-opacity" to="/contacto">Contáctanos</Link>
            </nav>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600"
              aria-label="Menú"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
            <Link className="block py-2 text-black" to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <Link className="block py-2 text-black" to="/nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
            <Link className="block py-2 text-black" to="/servicios" onClick={() => setIsMenuOpen(false)}>Servicios</Link>
            <Link className="block py-2 text-black" to="/proyectos" onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
            <Link className="block py-2 text-black" to="/carreras" onClick={() => setIsMenuOpen(false)}>Carreras</Link>
            <Link className="block py-2 text-[#46812F] font-semibold" to="/contacto" onClick={() => setIsMenuOpen(false)}>Contáctanos</Link>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 px-4" style={{ backgroundColor: '#46812F' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contáctanos</h1>
            <p className="mt-4 text-xl text-green-50 max-w-2xl mx-auto">
              ¿Tienes preguntas sobre nuestros servicios o necesitas una cotización? Nuestro equipo en Dimelco S.A.S. está listo para ayudarte.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-custom shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-full" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
                      <svg className="w-6 h-6" style={{ color: '#46812F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 uppercase">Dirección</p>
                      <a href="https://maps.google.com/?q=Cl.+2+Nte.+1E-7+Barrio+La+ceiba+C%C3%BAcuta+Norte+de+Santander+Colombia" target="_blank" rel="noopener noreferrer" className="mt-1 text-gray-900 font-semibold hover:text-[#46812F] transition-colors block">
                        Cl. 2 Nte. # 1E-7, Barrio La Ceiba<br />Cúcuta, Norte de Santander, Colombia
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-full" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
                      <svg className="w-6 h-6" style={{ color: '#46812F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 uppercase">Teléfono</p>
                      <a href="tel:+573017239148" className="mt-1 text-gray-900 font-semibold hover:text-[#46812F] transition-colors">+57 301 723 9148</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 rounded-full" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
                      <svg className="w-6 h-6" style={{ color: '#46812F' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500 uppercase">Correo</p>
                      <a href="mailto:dimelco@hotmail.com" className="mt-1 text-gray-900 font-semibold hover:text-[#46812F] transition-colors">dimelco@hotmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-custom shadow-sm border border-gray-100 overflow-hidden h-64">
                <iframe
                  title="Ubicación Dimelco - Cl. 2 Nte. # 1E-7, Barrio La Ceiba, Cúcuta"
                  src="https://www.google.com/maps?q=Cl.+2+Nte.+1E-7+Barrio+La+ceiba+C%C3%BAcuta+Norte+de+Santander+Colombia&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 sm:p-10 rounded-custom shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>
                <p className="text-gray-600 mb-8">Completa el formulario y nuestro equipo te responderá en menos de 24 horas.</p>
                <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="first-name">Nombre</label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#46812F] focus:border-[#46812F] px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="last-name">Apellido</label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#46812F] focus:border-[#46812F] px-3 py-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#46812F] focus:border-[#46812F] px-3 py-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">Asunto</label>
                    <select
                      id="subject"
                      name="subject"
                      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#46812F] focus:border-[#46812F] px-3 py-2"
                    >
                      <option>Consulta general</option>
                      <option>Soporte técnico</option>
                      <option>Ventas y cotizaciones</option>
                      <option>Recursos humanos</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#46812F] focus:border-[#46812F] px-3 py-2"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-colors shadow-lg"
                      style={{ backgroundColor: '#46812F' }}
                    >
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - same as mainpage */}
      <footer className="bg-[#46812F] text-white py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <img src={logoGreen} alt="Dimelco" className="h-12 w-auto mb-4 opacity-95" />
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Servicios de ingeniería profesional para un mundo en desarrollo. Especializados en infraestructura de alto rendimiento y sistemas eléctricos.
              </p>
              <p className="text-white/80 text-xs">
                © 2026 Dimelco S.A.S. Todos los derechos reservados. Excelencia en Ingeniería desde el inicio.
              </p>
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
                  <a href="https://maps.google.com/?q=Cl.+2+Nte.+1E-7+Barrio+La+ceiba+C%C3%BAcuta+Norte+de+Santander+Colombia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Cl. 2 Nte. # 1E-7, Barrio La Ceiba <br />
                    Cúcuta, Norte de Santander, Colombia
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <img src={phoneIcon} alt="" className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  <a href="tel:+573017239148" className="hover:text-white transition-colors">+57 301 723 9148</a>
                </li>
                <li className="flex items-center gap-2">
                  <img src={mailIcon} alt="" className="w-5 h-5 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  <a href="mailto:dimelco@hotmail.com" className="hover:text-white transition-colors">dimelco@hotmail.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Conéctate con nosotros</h4>
              <p className="text-white/90 text-sm mb-4">
                Síguenos en nuestras redes para estar actualizado con todas nuestras novedades.
              </p>
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

export default ContactPage;
