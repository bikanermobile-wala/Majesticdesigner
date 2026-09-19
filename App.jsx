import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import PageTransition from './components/PageTransition.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Collections from './pages/Collections.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Services from './pages/Services.jsx'
import Lookbook from './pages/Lookbook.jsx'
import Videos from './pages/Videos.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Navbar />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
