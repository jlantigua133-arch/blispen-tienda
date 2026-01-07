import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importamos directamente tu página de Checkout
import Checkout from './Checkout.jsx'  // Si lo guardaste como Checkout.jsx en src/

// Si tienes estilos globales (normalmente sí)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Muestra el checkout en la página principal */}
        <Route path="/" element={<Checkout />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Puedes agregar más rutas después */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
