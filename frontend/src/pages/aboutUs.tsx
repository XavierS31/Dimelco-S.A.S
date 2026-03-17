import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoGreen from '../assets/DimelcoSASGreenCopy.png';
import phoneIcon from '../assets/phone.png';
import mailIcon from '../assets/mail.png';
import locationIcon from '../assets/location.png';
import './aboutUs.css';

// Subcomponent for Mission/Vision cards
const ValueCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-white p-10 rounded-custom shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up">
    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(70, 129, 47, 0.1)' }}>
      <span style={{ color: '#46812F' }}>{icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const AboutPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Thin top bar - same as mainpage, matching background */}
      <div className="text-[10px]" style={{ backgroundColor: '#eef6ec', color: '#46812F' }}>
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
            <a href="https://maps.google.com/?q=Cl.+2+Nte.+%231e07+Cucuta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
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

      {/* Header - logo left, nav right */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: '#46812F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={logoGreen} alt="Dimelco S.A.S." className="h-12 w-auto object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>
                Inicio
              </Link>
              <span className="font-semibold border-b-2 border-white py-2 text-white hover:opacity-80 transition-opacity cursor-default">
                Nosotros
              </span>
              <a href="/#services" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Servicios</a>
              <a href="/#projects" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Proyectos</a>
              <a href="/#projects" className="font-medium transition-colors hover:underline hover:underline-offset-4" style={{ color: 'white' }}>Carreras</a>
              <a href="/#contact" className="bg-white text-[#46812F] px-5 py-2.5 rounded-lg font-semibold hover:brightness-95 transition-colors">
                Contáctanos
              </a>
            </nav>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Menú"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/30 px-4 py-4 space-y-3" style={{ backgroundColor: '#46812F' }}>
            <Link to="/" className="block py-2 hover:underline" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>Inicio</Link>
            <span className="block py-2 font-semibold text-white hover:opacity-80 transition-opacity">Nosotros</span>
            <a href="/#services" className="block py-2 hover:underline" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a href="/#projects" className="block py-2 hover:underline" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>Proyectos</a>
            <a href="/#projects" className="block py-2 hover:underline" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>Carreras</a>
            <a href="/#contact" className="block py-2 text-white font-bold hover:underline" onClick={() => setIsMenuOpen(false)}>Contáctanos</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="text-white py-24" style={{ background: 'linear-gradient(135deg, #46812F 0%, #366324 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Impulsando la innovación en Dimelco S.A.S.
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Comprometidos con la excelencia, la confiabilidad y la entrega de soluciones de clase mundial para nuestros socios en todo el mundo.
            </p>
          </div>
        </section>

        {/* History Section - no image */}
        <section className="section-padding bg-white" id="history">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra historia</h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Fundada con la visión de redefinir los estándares de la industria, Dimelco S.A.S. ha crecido desde una empresa local hasta convertirse en un líder respetado en nuestro sector. Nuestro camino comenzó hace más de dos décadas, impulsado por la pasión por la excelencia técnica y un enfoque centrado en el cliente.
                </p>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  A lo largo de los años, hemos alcanzado hitos significativos, nos hemos adaptado a los cambios tecnológicos y hemos brindado de manera constante servicios de alta calidad que permiten a las empresas prosperar en un entorno competitivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="section-padding bg-gray-50" id="mission-vision">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ValueCard
                title="Nuestra misión"
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              >
                Ofrecer soluciones técnicas innovadoras y sostenibles que mejoren la eficiencia operativa de nuestros clientes. Nos esforzamos por ser el socio estratégico preferido mediante la integridad, la calidad y el compromiso con la mejora continua.
              </ValueCard>
              <ValueCard
                title="Nuestra visión"
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              >
                Ser reconocidos como un referente global en nuestra industria, pioneros en nuevas tecnologías y metodologías que construyan un futuro más eficiente y conectado para las empresas en todo el mundo.
              </ValueCard>
            </div>
          </div>
        </section>

        {/* Team Section - no pictures */}
        <section className="section-padding bg-white" id="team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Conoce a nuestro equipo de liderazgo</h2>
              <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                Un grupo dedicado de expertos comprometidos con la excelencia y la obtención de los mejores resultados para nuestros clientes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mt-4">Jorge Agustin Baron. </h4>
                <p className="font-medium" style={{ color: '#46812F' }}>Gerente</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mt-4">&nbsp;</h4>
                <p className="font-medium" style={{ color: '#46812F' }}>Director de Operaciones</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mt-4">&nbsp;</h4>
                <p className="font-medium" style={{ color: '#46812F' }}>Director de Tecnología</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mt-4"></h4>
                <p className="font-medium" style={{ color: '#46812F' }}>Director Financiero</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dimelco S.A.S. es líder en soluciones industriales y comerciales integrales. Excelencia en cada proyecto, confianza en cada alianza.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Enlaces rápidos</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-[#46812F] transition-colors">Inicio</Link></li>
                <li><span>Nosotros</span></li>
                <li><a href="/#services" className="text-gray-400 hover:text-[#46812F] transition-colors">Servicios</a></li>
                <li><a href="/#projects" className="text-gray-400 hover:text-[#46812F] transition-colors">Portafolio</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-[#46812F] transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#46812F] transition-colors">Términos de servicio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#46812F] transition-colors">Política de cookies</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Conéctate con nosotros</h5>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/dimelco-sas/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#46812F] transition-colors" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2023 Dimelco S.A.S. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
