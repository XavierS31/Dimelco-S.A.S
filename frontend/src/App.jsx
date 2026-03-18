import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainpage.jsx'
import AboutPage from './pages/aboutUs'
import ProjectsPage from './pages/projects'
import ServicesPage from './pages/services'
import CareersPage from './pages/careers'
import ContactPage from './pages/contacts'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/nosotros" element={<AboutPage />} />
      <Route path="/proyectos" element={<ProjectsPage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/carreras" element={<CareersPage />} />
      <Route path="/contacto" element={<ContactPage />} />
    </Routes>
  )
}

export default App
