import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/DimelcoSASlogo.png';
import logoGreen from '../assets/DimelcoSASGreenCopy.png';
import heroBg from '../assets/cucutaBG.jpg';
import phoneIcon from '../assets/phone.png';
import mailIcon from '../assets/mail.png';
import locationIcon from '../assets/location.png';
import './mainpage.css';

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Newsletter signup logic
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans scroll-smooth">
      {/* Top bar */}
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
            <a href="https://maps.google.com/?q=Cl.+2+Nte.+%231e07+Cucuta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={locationIcon} alt="" className="w-4 h-4 object-contain topbar-icon" />
              <span className="hidden sm:inline">Cúcuta, Colombia</span>
            </a>
            <a href="tel:+573017239148" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={phoneIcon} alt="" className="w-4 h-4 object-contain topbar-icon" />
              <span>+57 301 723 9148</span>
            </a>
            <a href="mailto:dimelco@hotmail.com" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img src={mailIcon} alt="" className="w-4 h-4 object-contain topbar-icon" />
              <span className="hidden sm:inline">dimelco@hotmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src={logo} alt="Dimelco S.A.S." className="h-12 w-auto object-contain" />
              <span className="text-xl font-bold text-slate-900 hidden sm:inline"></span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a className="text-[#46812F] font-medium border-b-2 border-[#46812F] pb-0.5 hover:opacity-80 transition-opacity" href="#home">Inicio</a>
              <Link className="text-black hover:text-[#46812F] font-medium transition-colors" to="/nosotros">Nosotros</Link>
              <a className="text-black hover:text-[#46812F] font-medium transition-colors" href="#services">Servicios</a>
              <a className="text-black hover:text-[#46812F] font-medium transition-colors" href="#projects">Proyectos</a>
              <a className="text-black hover:text-[#46812F] font-medium transition-colors" href="#projects">Carreras</a>
              <a className="btn-green bg-[#46812F] text-white [&:active]:!text-black px-5 py-2.5 rounded-lg font-semibold hover:brightness-110 transition-colors" href="#contact">Contáctanos</a>
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
            <a className="block py-2 text-[#46812F] font-semibold hover:opacity-80 transition-opacity" href="#home" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <Link className="block py-2 text-black" to="/nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
            <a className="block py-2 text-black" href="#services" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a className="block py-2 text-black" href="#projects" onClick={() => setIsMenuOpen(false)}>Proyectos</a>
            <a className="block py-2 text-black" href="#projects" onClick={() => setIsMenuOpen(false)}>Carreras</a>
            <a className="block py-2 text-[#559A32] font-bold" href="#contact" onClick={() => setIsMenuOpen(false)}>Contáctanos</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" id="home">
          <div className="absolute inset-0 z-0">
            <img src={heroBg} alt="Paisaje de Cúcuta" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hero-overlay" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Lideres en Soluciones de Ingeniería.
            
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
              Brindamos infraestructura y servicios eléctricos de alta calidad para el desarrollo moderno de nuestra región.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a className="btn-green bg-[#46812F] hover:brightness-110 text-white [&:active]:!text-black px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg" href="#services">
                Nuestros Servicios
              </a>
              <a className="btn-green bg-[#46812F] hover:brightness-110 text-white [&:active]:!text-black px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg" href="#projects">
                NuestrosProyectos
              </a>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-slate-100" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div> 
                <h2 className="text-[#46812F] font-bold tracking-widest uppercase text-sm mb-4">QUIÉNES SOMOS</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Experiencia Impulsada por la Innovación</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Dimelco S.A.S. es una firma de ingeniería de primer nivel con sede en Cúcuta, Norte de Santander, comprometida con la excelencia en cada proyecto que realizamos. Con años de experiencia en ingeniería eléctrica, civil y consultoría técnica, ofrecemos soluciones innovadoras para las necesidades de infraestructura en evolución de nuestra región.
                </p>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Nuestro equipo se dedica a entregar proyectos que priorizan la seguridad, la eficiencia y la sostenibilidad. Combinamos experiencia técnica con un profundo entendimiento de los requisitos locales para transformar ideas en realidad.
                </p>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#46812F]/20 flex items-center justify-center text-[#559A32]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Calidad Certificada</h4>
                    <p className="text-slate-600">Cumpliendo estrictas normas de seguridad y regulación.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl bg-[#46812F] p-8 min-h-[400px] flex flex-col justify-end">
                <div className="flex-1 flex items-center justify-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                    alt="Colaboración del equipo de ingeniería"
                    className="rounded-lg object-cover max-h-64 w-full"
                  />
                </div>
                <p className="text-white font-bold tracking-widest uppercase text-center text-sm">EQUIPO DE INGENIERÍA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-slate-50" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[#46812F] font-bold tracking-widest uppercase text-sm mb-4">NUESTROS SERVICIOS</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Soluciones Técnicas para el Progreso</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard
                title="Ingeniería Eléctrica"
                desc="Diseño e instalación integral de sistemas eléctricos de media y baja tensión para proyectos industriales, comerciales y residenciales."
                icon={
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                }
              />
              <ServiceCard
                title="Infraestructura Civil"
                desc="Ejecución de obras civiles, planificación urbana, refuerzos estructurales y desarrollo de proyectos de infraestructura sostenible."
                icon={
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                }
              />
              <ServiceCard
                title="Consultoría Técnica"
                desc="Asesoría experta en viabilidad de proyectos, cumplimiento normativo (RETIE) y optimización de soluciones de ingeniería."
                icon={
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                }
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-slate-100" id="projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-[#46812F] font-bold tracking-widest uppercase text-sm mb-2">PROYECTOS DESTACADOS</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Transformando el Paisaje de Cúcuta</h3>
              </div>
              <a href="#projects" className="text-[#559A32] font-semibold hover:underline flex items-center gap-1">
                Ver Todos los Proyectos <span>→</span>
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ProjectCard
                image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80"
                category="ELÉCTRICO"
                title="Subestación Industrial Alpha"
              />
              <ProjectCard
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                category="OBRAS CIVILES"
                title="Complejo Comercial Norte"
              />
              <ProjectCard
                image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
                category="INNOVACIÓN"
                title="Iniciativa de Red Inteligente Municipal"
              />
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
                <li><a href="#about" className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Nuestros Servicios</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Portafolio de Proyectos</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Carreras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <ul className="space-y-3 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <img src={locationIcon} alt="" className="w-5 h-5 object-contain flex-shrink-0 mt-0.5 footer-icon" />
                  Cl. 2 Nte. #1e175 <br />
                  Cucuta,Norte de Santander
                  
                  
            
                </li>
              
                
                
                <li className="flex items-center gap-2">
                  <img src={phoneIcon} alt="" className="w-5 h-5 object-contain footer-icon" />
                  +57 3017239148
                </li>
                <li className="flex items-center gap-2">
                  <img src={mailIcon} alt="" className="w-5 h-5 object-contain footer-icon" />
                  dimelco@hotmail.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Mantente Informado</h4>
              <p className="text-white/90 text-sm mb-4">
                Suscríbete a nuestro boletín para las últimas noticias de ingeniería.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-[#559A32]"
                />
                <button type="submit" className="btn-green bg-[#559A32] text-white [&:active]:!text-black px-4 py-2.5 rounded-lg hover:brightness-110 transition-colors">
                  →
                </button>
              </form>
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

const ServiceCard = ({ title, desc, icon }) => (
  <div className="service-card bg-white p-8 rounded-xl shadow-md border border-slate-200">
    <div className="mb-6 inline-block p-3 bg-[#559A32]/10 rounded-lg text-[#559A32]">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ProjectCard = ({ image, category, title }) => (
  <a href="#projects" className="project-card block relative rounded-xl overflow-hidden aspect-[4/3] group">
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <p className="text-[#559A32] font-semibold text-sm tracking-wider mb-1">{category}</p>
      <h4 className="text-xl font-bold text-white">{title}</h4>
    </div>
  </a>
);

export default MainPage;
