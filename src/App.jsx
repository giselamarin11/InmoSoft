import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Componentes compartidos
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Flotantes from './componentes/Flotantes.jsx';

// Páginas
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Filtros from './pages/Filtros';
import Notificaciones from './pages/Notificaciones';
import Login from './pages/Login.jsx';
import Register from './componentes/Register.jsx';
import Recover from './componentes/Recover';
import VerifyCode from './componentes/VerifyCode';
import ResetPassword from './componentes/ResetPassword';
import DetalleApartamento from './pages/DetalleApartamento';
import QuienesSomos from "./pages/QuienesSomos";
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx';
import Ajustes from './pages/Ajustes.jsx';
import InicioAdmin from './pages/InicioAdmin.jsx';

// Estilos de Leaflet
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();

  // Rutas donde NO queremos Navbar y Footer
  const authPages = ['/login', '/register', '/recover', '/verify-code', '/reset-password'];
  const isAuthPage = authPages.includes(location.pathname);

  // Estado para mostrar botón "scroll to top"
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="app-container">
      {/* Mostrar navbar solo si no estamos en páginas de autenticación */}
      {!isAuthPage && <Navbar />}

      <main>
        <Routes>
          {/* Rutas principales */}
          
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/admin" element={<InicioAdmin />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/filtros" element={<Filtros />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          
          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Detalle dinámico con ID */}
          <Route path="/detalle-apartamento/:id" element={<DetalleApartamento />} />

          {/* Secciones informativas */}
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/preguntas" element={<PreguntasFrecuentes />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </main>

      {/* Mostrar footer y flotantes si no es auth */}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <Flotantes />}

      {/* Botón flotante para volver arriba */}
      {showTopButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          🔺
        </button>
      )}
    </div>
  );
}

export default App;
