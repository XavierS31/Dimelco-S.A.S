import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainpage.jsx'
import AboutPage from './pages/aboutUs'
import ProjectsPage from './pages/projects'
import ServicesPage from './pages/services'
import CareersPage from './pages/careers'
import JobDetailPage from './pages/jobDetail'
import ContactPage from './pages/contacts'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'
import AdminPage from './pages/admin'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/nosotros" element={<AboutPage />} />
      <Route path="/proyectos" element={<ProjectsPage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/carreras" element={<CareersPage />} />
      <Route path="/carreras/:id" element={<JobDetailPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
