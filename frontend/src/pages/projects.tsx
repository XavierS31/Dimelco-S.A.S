import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoGreen from '../assets/DimelcoSASGreenCopy.png';
import phoneIcon from '../assets/phone.png';
import mailIcon from '../assets/mail.png';
import locationIcon from '../assets/location.png';
import './projects.css';

const PROJECTS = [
  { category: 'Electrical', title: 'High-Voltage Substation Retrofit', description: 'Complete modernization of regional power distribution nodes featuring advanced PLC controls and SCADA integration.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4iTF-3M89KmRUg7paXFJpUPvwKg90s1ELK1uce-hlxYc2uRZJ_t3cXXpi4qlhEbBQZYVsZRBBQyKLqSTqaNdXrpGTbyBuhmunbUy6-_qhsYaGA6-uaLyihxQg7XwFl4dltkJY7c0ds4aJM5USwdL4ScspJxiZ0JMZ-0sJaOVIDQqUJr3WK5wG5EEdM_iXV_A9k8CGKtwRgU12tlhS09EpPcZQhg_--7hB33-r1DMLo476OaJVPDy5aPmpOkM-fBA9L80HXamdACg' },
  { category: 'Infrastructure', title: 'Municipal Water Infrastructure', description: 'Implementation of heavy-duty pumping stations and main supply lines for the Northern Metropolitan expansion.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt5JQcJbv4jjfElrO6MmH_4DN7hkdwoG0pX8ivGnNCBSXwxwAtGwDOcL3JtHKiy1iZGVzFRSJ1802vChykrthjwyPOecx0uBtSocuVqmn9W-XdOcyH5cA2jrh5cSZNMQ67hAjz-IWXsZb_QjjPZ9K6fA6CQpNZi1r3T5UOuPP8jHFTLse_tkpTMdmYGGiRSGc0PS_Ntgz80fihE_Uoa1UxRj1RTF-RCNdeLWZUPiEHa1PBvu3WwxBu-NcX27gOS8hZPeyVryn-KAo' },
  { category: 'Renewables', title: 'Eco-Park Solar Array', description: 'Installation of a 2.5MW photovoltaic field with optimized energy storage solutions for industrial parks.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY7cfQpA2AS2hOYcBM9m_v8URvhtzE5nf0AI2MBEc9beqEDmdnVLoqdVcRMSS7bmgG38tXf6ud1N_bcgKFwTWtN_vmbIw04EXODInHexj2sAbz3QAc98Y4zn2AgMEDDR3lo549_DjIyYeepq0JF2vD7HYXsDtAvpD9KF5knyr4Jo_TR6g2cUBILHXw-OKMg7kl13AyFdmf3CF7Pi5ZwpoiwLoOTqsEkOnNJSzMFAEJnoU-Uch1_nBe7IqdF7qSiLDaxkZk8XbTkBo' },
  { category: 'Automation', title: 'Automated Bottling System', description: 'Custom-designed conveyor and packaging line increasing output efficiency by 40% for food & beverage clients.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOL5VsV_ByaK3XzA_3dpI5ZpBc5MTE_F5zmFEoUUvU1H9Cb451PogT2IdA3bgA2XhIHTUbjUrDb4QZXqYVf5hAhYnL5f7qsuA0gdTeZIkV3-eqkiIz5phJaFRwGJZFb88jK1B71z1o_JlEIvvhzvHQh1qoF1CLvRcDkhbX2jtiFEIJDaBSly7wpB-PKo_Xv9FQpWNOYbCK4mJRkttCu-KLYhIbwfD25ia08VpIprUWUe09N-SpAO4nXbHWot2XJdLNTJyE6N9195I' },
  { category: 'Telecom', title: '5G Network Rollout', description: 'Turnkey solution for rural connectivity involving tower construction and fiber optic backhaul integration.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuCFTpJZ1fjP-WHzpBQxRRzQKS1Yf9GILXopZg1ooDcE7GiK7qqJaSE8xD9NJmpaZnwXEY9ULeBjsNup7eaEMERYnuEM7UDkSJX6XrkvdHjLc52iOU10V-Tc8_wW9qXgg7C3kkSJz3KxPWBt9GqmRPhbYHJdL-joyXU7CO5f23BLNRpLlwbBZd1gWtZCZOmyTadbKtVxNbX_28CA9vsAe950O_pKOmU4qit0XXf0iKsP_7zavCby7XME50Z_fpmMS_O-Xy2495y3c' },
  { category: 'Power Gen', title: 'Gas Turbine Maintenance', description: 'Major overhaul and optimization of gas turbines for a private industrial power plant, ensuring peak performance.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARGJzmWETf7bKqIglEiD7I93SQEQBgr6OY0OLAC1XOMkg4Chi2RaR2koPJMb7YEo-Q21Fj1qLRUnij7aGRutbmYL3WqKT4ttaonAwJrTS934NwRHnKZkGxxgYy3EuTcUd_fbNMBE3tU5VCsgw2uBxo6iUc8DZvO_bduBNW1dCWDcuueqIVaXrFioHsoavh7TfeobwX-doxy8A6TG5H1iw1bZZvFQn4BRbsUwaNLYWpyhgSOni1tYzzzWui2U3477N0Seh-kVVqBlY' },
];

const ProjectsPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Top bar */}
      <div className="text-[10px]" style={{ backgroundColor: '#eef6ec', color: '#46812F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <a href="https://www.linkedin.com/company/dimelco-sas/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-3" aria-label="LinkedIn de Dimelco S.A.S">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
              <span className="font-semibold border-b-2 border-white py-2 text-white cursor-default">Proyectos</span>
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
            <Link to="/servicios" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Servicios</Link>
            <span className="block py-2 font-semibold text-white">Proyectos</span>
            <Link to="/carreras" className="block py-2 text-white hover:underline" onClick={() => setIsMenuOpen(false)}>Carreras</Link>
            <Link to="/contacto" className="block py-2 text-white font-bold hover:underline" onClick={() => setIsMenuOpen(false)}>Contáctanos</Link>
          </div>
        )}
      </header>

      <main>
        <section className="bg-white py-12 md:py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="font-bold tracking-widest uppercase text-xs text-[#46812F]">Portafolio</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-gray-900">Nuestros hitos de ingeniería</h1>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg">
              Descubre cómo Dimelco S.A.S. ofrece soluciones industriales de vanguardia mediante ingeniería de precisión e innovación sostenible.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {['All Projects', 'Electrical', 'Infrastructure', 'Automation', 'Energy Storage'].map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filter === label ? 'bg-[#46812F] text-white' : 'bg-white border border-gray-200 hover:border-[#46812F] text-gray-700'}`}
              >
                {label === 'All Projects' ? 'Todos' : label === 'Electrical' ? 'Eléctrico' : label === 'Infrastructure' ? 'Infraestructura' : label === 'Automation' ? 'Automatización' : 'Almacenamiento'}
              </button>
            ))}
          </div>
          <div className="grid-masonry">
            {PROJECTS.map((p) => (
              <article key={p.title} className="project-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden h-64">
                  <img alt={p.title} className="project-img w-full h-full object-cover transition-transform duration-500" src={p.image} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#46812F] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase">{p.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{p.description}</p>
                  <Link to="/proyectos" className="text-[#46812F] font-semibold text-sm flex items-center gap-1 hover:underline">
                    Ver detalles
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <nav className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <a key={n} href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-[#46812F] hover:text-white hover:border-[#46812F] transition-colors text-sm" style={n === 1 ? { backgroundColor: '#46812F', color: 'white', borderColor: '#46812F' } : undefined}>{n}</a>
              ))}
              <span className="w-10 h-10 flex items-center justify-center">...</span>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-[#46812F] hover:text-white transition-colors text-sm">12</a>
            </nav>
          </div>
        </div>

        <section className="py-20 text-white" style={{ backgroundColor: '#111827' }}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para iniciar tu próximo proyecto?</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">Nuestro equipo de ingenieros está listo para ayudarte a optimizar tus operaciones con soluciones técnicas confiables e innovadoras.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/nosotros" className="bg-[#46812F] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all">Solicitar propuesta</Link>
              <Link to="/nosotros" className="bg-transparent border border-gray-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all">Consultar expertos</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - same as aboutUs */}
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

export default ProjectsPage;
