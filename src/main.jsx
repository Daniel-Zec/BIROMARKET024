import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import 'micro-motion/styles.css'
import './styles.css'
import { ToastProvider, ScrollToTop } from './components/ui.jsx'
import Home from './pages/Home.jsx'
import Servis from './pages/Servis.jsx'
import Fotokopirnica from './pages/Fotokopirnica.jsx'
import Kancelarija from './pages/Kancelarija.jsx'
import CreativeShop from './pages/CreativeShop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servis" element={<Servis />} />
          <Route path="/fotokopirnica" element={<Fotokopirnica />} />
          <Route path="/kancelarija" element={<Kancelarija />} />
          <Route path="/creative-shop" element={<CreativeShop />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>,
)
