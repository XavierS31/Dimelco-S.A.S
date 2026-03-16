import React from 'react';
import { Link } from 'react-router-dom';
import './aboutUs.css';

// Subcomponente para las tarjetas de Misión/Visión
const ValueCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-white p-10 rounded-custom shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up">
    <div className="w-14 h-14 bg-dimelco-primary/10 rounded-full flex items-center justify-center mb-6 text-dimelco-primary">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 font-bold text-dimelco-primary text-2xl">
              DIMELCO S.A.S.
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-dimelco-primary font-medium transition-colors py-2">
                Inicio
              </Link>
              <span className="text-dimelco-primary border-b-2 border-dimelco-primary font-medium py-2">
                Nosotros
              </span>
              <a href="/#services" className="text-gray-600 hover:text-dimelco-primary font-medium transition-colors py-2">
                Servicios
              </a>
              <a href="/#contact" className="text-gray-600 hover:text-dimelco-primary font-medium transition-colors py-2">
                Contacto
              </a>
            </nav>
            <a href="/#contact" className="hidden md:block bg-dimelco-primary hover:bg-dimelco-secondary text-white px-6 py-2 rounded-custom font-medium transition-all shadow-sm">
              Solicitar cotización
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-dimelco-primary to-dimelco-secondary text-white py-24">
          <div className="max-w-7xl mx-auto px-4 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Impulsando la innovación en Dimelco S.A.S.
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              Comprometidos con la excelencia, la confiabilidad y la entrega de soluciones de clase mundial.
            </p>
          </div>
        </section>

        {/* Historia */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra historia</h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Fundada con la visión de redefinir los estándares de la industria, Dimelco S.A.S. ha crecido desde una empresa local hasta convertirse en un líder respetado.
                </p>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  Más de dos décadas de excelencia técnica y un enfoque centrado en el cliente.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 bg-dimelco-primary/20 rounded-custom blur group-hover:bg-dimelco-primary/30 transition-all"></div>
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                  alt="Trabajo de ingeniería"
                  className="relative rounded-custom shadow-xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Misión y visión */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ValueCard
              title="Nuestra misión"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            >
              Ofrecer soluciones técnicas innovadoras y sostenibles que mejoren la eficiencia operativa de nuestros clientes.
            </ValueCard>
            <ValueCard
              title="Nuestra visión"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            >
              Ser reconocidos como un referente global, pioneros en nuevas tecnologías que construyan un futuro más conectado.
            </ValueCard>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2023 Dimelco S.A.S. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
