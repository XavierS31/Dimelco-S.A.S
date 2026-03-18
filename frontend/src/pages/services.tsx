import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoGreen from '../assets/DimelcoSASGreenCopy.png';
import cucutaBG2 from '../assets/cucutaBG2.jpg';
import phoneIcon from '../assets/phone.png';
import mailIcon from '../assets/mail.png';
import locationIcon from '../assets/location.png';
import './services.css';

const SERVICES = [
  {
    title: 'Ingeniería Civil',
    description: 'Desarrollo de infraestructura, diseño estructural y soluciones de planificación urbana para una durabilidad moderna.',
    items: ['Análisis estructural', 'Vías y drenaje', 'Estudio geotécnico'],
    icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />,
  },
  {
    title: 'Ingeniería Eléctrica',
    description: 'Diseño de sistemas de potencia, integración de energías renovables y automatización de redes para eficiencia industrial.',
    items: ['Instalaciones AT/BT', 'Auditorías de calidad de potencia', 'Soluciones solares'],
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />,
  },
  {
    title: 'Ingeniería Mecánica',
    description: 'Sistemas HVAC, tuberías industriales y diseño de maquinaria de precisión para un rendimiento operativo optimizado.',
    items: ['HVAC y ventilación', 'Protección contra incendios', 'Mantenimiento de planta'],
    icon: <><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></>,
  },
  {
    title: 'Consultoría Técnica',
    description: 'Gestión de proyectos, auditorías técnicas y estudios de viabilidad para guiar sus inversiones de capital.',
    items: ['Gestión de proyectos', 'Estudios de viabilidad', 'Auditorías técnicas'],
    icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.835 1.354 9.31 3.693 13.118L12 21l3.307-2.102c2.339-3.808 3.693-8.283 3.693-13.118z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />,
  },
];

const ServicesPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
        className="min-h-screen text-gray-900 font-sans"
        style={{
          backgroundImage: `url(${cucutaBG2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
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
              <span className="font-semibold border-b-2 border-white py-2 text-white cursor-default">Servicios</span>
              <Link to="/proyectos" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Proyectos</Link>
              <Link to="/carreras" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Carreras</Link>
              <Link to="/contacto" className="bg-white text-[#46812F] px-5 py-2.5 rounded-lg font-semibold hover:brightness-95 transition-colors">Contáctanos</Link>
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
            <span className="block py-2 font-semibold text-white">Servicios</span>
            <Link to="/proyectos" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
            <Link to="/carreras" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Carreras</Link>
            <Link to="/contacto" className="block py-2 text-white font-bold hover:underline" onClick={() => setIsMenuOpen(false)}>Contáctanos</Link>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[50vh] py-20 overflow-hidden flex items-center">
          <div className="absolute inset-0 z-0">
            <img src={cucutaBG2} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Excelencia en ingeniería e innovación estratégica</h1>
              <p className="text-xl text-white/95 mb-10">
                Dimelco S.A.S. ofrece servicios integrales de ingeniería en los ámbitos civil, eléctrico y mecánico, respaldados por consultoría técnica especializada.
              </p>
              <a href="#services" className="inline-block bg-white text-[#46812F] hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-all">Explorar servicios</a>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestra experiencia en ingeniería</h2>
              <div className="w-20 h-1.5 bg-[#46812F] mx-auto rounded-full" />
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">Ofrecemos soluciones integradas para proyectos de infraestructura complejos, garantizando seguridad, eficiencia y sostenibilidad.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((s) => (
                <article key={s.title} className="service-card group bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center">
                  <div className="service-icon w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner text-[#46812F]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{s.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{s.description}</p>
                  <ul className="text-xs text-left text-gray-500 space-y-2 mb-8 w-full">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#46812F] rounded-full mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/nosotros" className="mt-auto text-[#46812F] font-semibold hover:underline">Más información →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-[#46812F] mb-2">15+</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Años de experiencia</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#46812F] mb-2">250+</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Proyectos completados</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#46812F] mb-2">50+</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Ingenieros</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#46812F] mb-2">100%</p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">Cumplimiento en seguridad</p>
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

export default ServicesPage;
