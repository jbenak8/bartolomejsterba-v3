import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import PomnikyPage from './pages/PomnikyPage'
import SochyPage from './pages/SochyPage'
import RestaurovamiPage from './pages/RestaurovamiPage'
import OFirmePage from './pages/OFirmePage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ marginTop: 'var(--header-height)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pomniky" element={<PomnikyPage />} />
          <Route path="/sochy" element={<SochyPage />} />
          <Route path="/restaurovani" element={<RestaurovamiPage />} />
          <Route path="/o-firme" element={<OFirmePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
