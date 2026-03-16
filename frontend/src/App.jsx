import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainpage.jsx'
import AboutPage from './pages/aboutUs'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/nosotros" element={<AboutPage />} />
    </Routes>
  )
}

export default App
