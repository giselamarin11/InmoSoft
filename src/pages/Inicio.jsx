import React, { useState, useCallback, useEffect } from 'react';
import './Inicio.css';
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Heart,
  Filter,
  Bell,
  Share2,
  Eye,
  X,
  ChevronDown,
  Phone,
  Mail,
  Map,
  Car,
  Home,
  Shield,
  Waves,
  MessageCircle,
  Check,
  Minus
} from 'lucide-react';

function InicioMejorado() {
  const navigate = useNavigate();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('arriendo');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const [valorSeleccionado, setValorSeleccionado] = useState('');
  const [tipoInmueble, setTipoInmueble] = useState('');
  //const [descripcion, setDescripcion] = useState('');
  const [propiedadesFavoritas, setPropiedadesFavoritas] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mostrandoResultados, setMostrandoResultados] = useState(false);
  const [allProperties, setAllProperties] = useState([]);

  // Estado del modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);

  // Filtros avanzados
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({
    habitaciones: '',
    banos: '',
    areaMin: '',
    areaMax: '',
    estrato: '',
    parqueadero: false,
    amoblado: false,
    mascotas: false,
    piscina: false,
    seguridad: false
  });

  // Propiedades mockeadas como fallback
  const propiedadesMock = [
    {
      id: 1,
      tipo: 'arriendo',
      ciudad: 'medellin',
      precio: 2500000,
      tipoInmueble: 'apartamento',
      descripcion: ' Apartamento en El Poblado',
      habitaciones: 3,
      banos: 2,
      areaMetros: 85,
      estrato: 5,
      parqueadero: true,
      piscina: true,
      seguridad: true,
      amoblado: false,
      mascotas: true,
      imagen: { keyS3: 'https://i.pinimg.com/736x/35/a9/eb/35a9eb4fffd2a371390ae620766124ab.jpg' },
      estado: 'Disponible',
      codigo: 'APT-001'
    },
    {
      id: 2,
      tipo: 'compra',
      ciudad: 'bogota',
      precio: 650000000,
      tipoInmueble: 'casa',
      descripcion: 'Casa campestre en Usaquén',
      habitaciones: 4,
      banos: 3,
      areaMetros: 180,
      estrato: 6,
      parqueadero: true,
      piscina: false,
      seguridad: true,
      amoblado: true,
      mascotas: false,
      imagen: { keyS3: 'https://i.pinimg.com/1200x/ea/11/5d/ea115dd2f04d749f3a1eb02a6a53dfe0.jpg' },
      estado: 'Disponible',
      codigo: 'CASA-002'
    },
    {
      id: 3,
      tipo: 'arriendo',
      ciudad: 'cali',
      precio: 1800000,
      tipoInmueble: 'apartamento',
      descripcion: 'Apartamento en Granada',
      habitaciones: 2,
      banos: 2,
      areaMetros: 65,
      estrato: 4,
      parqueadero: true,
      piscina: true,
      seguridad: false,
      amoblado: true,
      mascotas: true,
      imagen: { keyS3: 'https://i.pinimg.com/1200x/9f/5a/f5/9f5af534960e11aa317b340dd19de8e2.jpg' },
      estado: 'Reservado',
      codigo: 'APT-003'
    },
    {
      id: 4,
      tipo: 'compra',
      ciudad: 'medellin',
      precio: 380000000,
      tipoInmueble: 'casa',
      descripcion: 'Casa en Laureles',
      habitaciones: 3,
      banos: 2,
      areaMetros: 120,
      estrato: 4,
      parqueadero: true,
      piscina: false,
      seguridad: true,
      amoblado: false,
      mascotas: false,
      imagen: { keyS3: 'https://i.pinimg.com/1200x/55/45/75/554575ac14f4d069fa47d80680b72330.jpg' },
      estado: 'Disponible',
      codigo: 'CASA-004'
    }
  ];



  // Opciones para los desplegables
  const ciudades = [
    { valor: '', texto: 'Selecciona una ciudad' },
    { valor: 'medellin', texto: 'Medellín' },
    { valor: 'bogota', texto: 'Bogotá' },
    { valor: 'cali', texto: 'Cali' },
    { valor: 'barranquilla', texto: 'Barranquilla' },
    { valor: 'cartagena', texto: 'Cartagena' },
    { valor: 'bucaramanga', texto: 'Bucaramanga' },
    { valor: 'pereira', texto: 'Pereira' },
    { valor: 'manizales', texto: 'Manizales' },
    { valor: 'ibague', texto: 'Ibagué' },
    { valor: 'cucuta', texto: 'Cúcuta' }
  ];

  const rangosPrecios = [
    { valor: '', texto: 'Rango de precio' },
    { valor: '0-500000', texto: '$0 - $500.000' },
    { valor: '500000-800000', texto: '$500.000 - $800.000' },
    { valor: '800000-1200000', texto: '$800.000 - $1.200.000' },
    { valor: '1200000-2000000', texto: '$1.200.000 - $2.000.000' },
    { valor: '2000000-3000000', texto: '$2.000.000 - $3.000.000' },
    { valor: '3000000+', texto: 'Más de $3.000.000' }
  ];

  const tiposInmueble = [
    { valor: '', texto: 'Tipo de inmueble' },
    { valor: 'apartamento', texto: 'Apartamento' },
    { valor: 'casa', texto: 'Casa' },
    { valor: 'oficina', texto: 'Oficina' },
    { valor: 'lote', texto: 'Lote' },
    { valor: 'bodega', texto: 'Bodega' },
    { valor: 'local', texto: 'Local comercial' },
    { valor: 'finca', texto: 'Finca' }
  ];

  // Llamada fetch al backend de las propiedades sin filtrar
  useEffect(() => {
    const fetchData = async () => {
      console.log("Cargando propiedades...");
      try {
        const res = await fetch("http://localhost:8080/api/propiedades/todas", {
          method: "GET",
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJpbm1vc29mMjJAZ21haWwuY29tIiwiVXN1YXJpbyI6WyJBRE1JTiJdLCJpYXQiOjE3NTY2ODA0ODcsImV4cCI6MTc1NjY4NDA4N30.l0sPr5yesg79dqOQllzFF7LLCe__hfjifunreavSTPDTKneuwjVUFKfsF7Feiwkv",
            "accept": "application/json"
          },
        });

        if (!res.ok) {
          throw new Error("Error en la petición");
        }

        const json = await res.json();
        setAllProperties(json);
        console.log("Propiedades cargadas:", json);
      } catch (error) {
        console.log("Error cargando propiedades, usando datos mock:", error);
        setAllProperties(propiedadesMock);
      }
    };
    fetchData();
  }, []);

  // Funciones del modal
  const abrirModal = (propiedad) => {
    setPropiedadSeleccionada(propiedad);
    setModalAbierto(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPropiedadSeleccionada(null);
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
  };

  const hablarConAsesor = () => {
    const mensaje = `Hola, estoy interesado en la propiedad ${propiedadSeleccionada?.codigo} - ${propiedadSeleccionada?.descripcion}. ¿Podrían darme más información?`;
    const whatsappURL = `https://wa.me/573012345678?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, '_blank');
  };

  const compartirPropiedad = () => {
    if (navigator.share) {
      navigator.share({
        title: propiedadSeleccionada?.descripcion,
        text: `Mira esta increíble propiedad: ${propiedadSeleccionada?.descripcion}`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert('Enlace copiado al portapapeles');
      });
    }
  };

  const validarFormulario = () => {
    if (!ciudadSeleccionada && !valorSeleccionado && !tipoInmueble) {
      setError('Por favor selecciona al menos un filtro de búsqueda');
      return false;
    }
    setError('');
    return true;
  };

  const filtrarPropiedades = () => {
    const propiedadesAFiltrar = allProperties.length > 0 ? allProperties : propiedadesMock;

    let propiedadesFiltradas = propiedadesAFiltrar.filter(propiedad => {
      // Filtro por tipo (arriendo/compra)
      if (propiedad.tipo !== opcionSeleccionada) return false;

      // Filtro por ciudad
      if (ciudadSeleccionada && propiedad.ciudad !== ciudadSeleccionada) return false;

      // Filtro por tipo de inmueble
      if (tipoInmueble && propiedad.tipoInmueble !== tipoInmueble) return false;

      // Filtro por rango de precio
      if (valorSeleccionado) {
        const [min, max] = valorSeleccionado.split('-').map(v => v === '' ? Infinity : parseInt(v));
        if (max === undefined) { // Caso "3000000+"
          if (propiedad.precio < min) return false;
        } else {
          if (propiedad.precio < min || propiedad.precio > max) return false;
        }
      }

      // Filtros avanzados
      if (filtrosAvanzados.habitaciones && propiedad.habitaciones < parseInt(filtrosAvanzados.habitaciones)) return false;
      if (filtrosAvanzados.banos && propiedad.banos < parseInt(filtrosAvanzados.banos)) return false;
      if (filtrosAvanzados.areaMin && propiedad.areaMetros < parseInt(filtrosAvanzados.areaMin)) return false;
      if (filtrosAvanzados.areaMax && propiedad.areaMetros > parseInt(filtrosAvanzados.areaMax)) return false;
      if (filtrosAvanzados.estrato && propiedad.estrato !== parseInt(filtrosAvanzados.estrato)) return false;
      if (filtrosAvanzados.parqueadero && !propiedad.parqueadero) return false;
      if (filtrosAvanzados.piscina && !propiedad.piscina) return false;
      if (filtrosAvanzados.seguridad && !propiedad.seguridad) return false;

      return true;
    });

    return propiedadesFiltradas;
  };

  const buscarPropiedades = () => {
    if (!validarFormulario()) return;

    setLoading(true);
    setError('');

    // Simulación de llamada API
    setTimeout(() => {
      try {
        const propiedadesFiltradas = filtrarPropiedades();
        setResultados(propiedadesFiltradas);
        setMostrandoResultados(true);
        setLoading(false);

        if (propiedadesFiltradas.length === 0) {
          setError('No se encontraron propiedades con los filtros seleccionados. Intenta ajustar tus criterios de búsqueda.');
        }
      } catch (err) {
        const a = `Ocurrió un error al buscar propiedades. Por favor intenta nuevamente. ${err}`;
        setError(a);
        setLoading(false);
      }
    }, 1500);
  };

  const limpiarFiltros = () => {
    setCiudadSeleccionada('');
    setValorSeleccionado('');
    setTipoInmueble('');
    setFiltrosAvanzados({
      habitaciones: '',
      banos: '',
      areaMin: '',
      areaMax: '',
      estrato: '',
      parqueadero: false,
      piscina: false,
      seguridad: false
    });
    setError('');
    setMostrandoResultados(false);
    setResultados([]);
  };

  const toggleFavorito = useCallback((id) => {
    setPropiedadesFavoritas(prev => {
      const nuevos = new Set(prev);
      if (nuevos.has(id)) {
        nuevos.delete(id);
      } else {
        nuevos.add(id);
      }
      return nuevos;
    });
  }, []);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  };

  const formatearCiudad = (ciudad) => {
    const ciudadesMap = {
      'medellin': 'Medellín',
      'bogota': 'Bogotá',
      'cali': 'Cali',
      'barranquilla': 'Barranquilla',
      'cartagena': 'Cartagena',
      'bucaramanga': 'Bucaramanga',
      'pereira': 'Pereira',
      'manizales': 'Manizales',
      'ibague': 'Ibagué',
      'cucuta': 'Cúcuta'
    };
    return ciudadesMap[ciudad] || ciudad;
  };

  // Funciones para manejar el modal con teclas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalAbierto) {
        cerrarModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalAbierto]);

  console.log("Estas son las propiedades", allProperties);
  const propiedadesAMostrar = mostrandoResultados ? resultados : (allProperties.length > 0 ? allProperties : propiedadesMock);

  return (
    <div className="inicio-mejorado">

      {/* Hero Section con Glassmorphism */}
      <div className="hero-section">
        <div className="hero-background" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-title">
            <h1>Encuentra Tu Hogar Ideal</h1>
            <p>Descubre las mejores propiedades en Colombia</p>
          </div>

          <div className="busqueda-card-mejorada">
            <div className="botones-tipo">
              <button
                className={`boton-tipo ${opcionSeleccionada === 'arriendo' ? 'activo' : ''}`}
                onClick={() => setOpcionSeleccionada('arriendo')}
              >
                ARRIENDO
              </button>
              <button
                className={`boton-tipo ${opcionSeleccionada === 'compra' ? 'activo' : ''}`}
                onClick={() => setOpcionSeleccionada('compra')}
              >
                COMPRA
              </button>
            </div>

            <div className="campos-busqueda">
              <select
                value={ciudadSeleccionada}
                onChange={(e) => setCiudadSeleccionada(e.target.value)}
                className="select-campo"
              >
                {ciudades.map((ciudad) => (
                  <option key={ciudad.valor} value={ciudad.valor}>
                    {ciudad.texto}
                  </option>
                ))}
              </select>

              <select
                value={valorSeleccionado}
                onChange={(e) => setValorSeleccionado(e.target.value)}
                className="select-campo"
              >
                {rangosPrecios.map((rango) => (
                  <option key={rango.valor} value={rango.valor}>
                    {rango.texto}
                  </option>
                ))}
              </select>

              <select
                value={tipoInmueble}
                onChange={(e) => setTipoInmueble(e.target.value)}
                className="select-campo"
              >
                {tiposInmueble.map((tipo) => (
                  <option key={tipo.valor} value={tipo.valor}>
                    {tipo.texto}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`btn-filtros-mejorado ${mostrarFiltros ? 'activo' : ''}`}
                aria-expanded={mostrarFiltros}
              >
                <Filter className="icon-filter" />
                Filtros
                <ChevronDown className={`icon-chevron ${mostrarFiltros ? 'rotated' : ''}`} />
              </button>
            </div>

            {/* Panel de filtros avanzados */}
            {mostrarFiltros && (
              <div className="panel-filtros">
                <div className="filtros-header">
                  <h3>Filtros Avanzados</h3>
                  <button
                    onClick={() => setMostrarFiltros(false)}
                    className="btn-cerrar-filtros"
                    aria-label="Cerrar filtros"
                  >
                    <X />
                  </button>
                </div>

                <div className="filtros-grid">
                  <div className="filtro-grupo">
                    <label>Habitaciones mínimas</label>
                    <select
                      value={filtrosAvanzados.habitaciones}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, habitaciones: e.target.value }))}
                      className="select-campo"
                    >
                      <option value="">Cualquiera</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  <div className="filtro-grupo">
                    <label>Baños mínimos</label>
                    <select
                      value={filtrosAvanzados.banos}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, banos: e.target.value }))}
                      className="select-campo"
                    >
                      <option value="">Cualquiera</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                  </div>

                  <div className="filtro-grupo">
                    <label>Área mínima (m²)</label>
                    <input
                      type="number"
                      value={filtrosAvanzados.areaMin}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, areaMin: e.target.value }))}
                      className="input-campo"
                      placeholder="Ej: 50"
                    />
                  </div>

                  <div className="filtro-grupo">
                    <label>Área máxima (m²)</label>
                    <input
                      type="number"
                      value={filtrosAvanzados.areaMax}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, areaMax: e.target.value }))}
                      className="input-campo"
                      placeholder="Ej: 200"
                    />
                  </div>

                  <div className="filtro-grupo">
                    <label>Estrato</label>
                    <select
                      value={filtrosAvanzados.estrato}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, estrato: e.target.value }))}
                      className="select-campo"
                    >
                      <option value="">Cualquiera</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>

                <div className="checkboxes-grid">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filtrosAvanzados.parqueadero}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, parqueadero: e.target.checked }))}
                    />
                    <span className="checkbox-text">Parqueadero</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filtrosAvanzados.amoblado}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, amoblado: e.target.checked }))}
                    />
                    <span className="checkbox-text">Amoblado</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filtrosAvanzados.mascotas}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, mascotas: e.target.checked }))}
                    />
                    <span className="checkbox-text">Acepta mascotas</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filtrosAvanzados.piscina}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, piscina: e.target.checked }))}
                    />
                    <span className="checkbox-text">Piscina</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filtrosAvanzados.seguridad}
                      onChange={(e) => setFiltrosAvanzados(prev => ({ ...prev, seguridad: e.target.checked }))}
                    />
                    <span className="checkbox-text">Seguridad 24h</span>
                  </label>
                </div>
              </div>
            )}

            {/* Mensaje de error */}
            {error && (
              <div className="mensaje-error">
                <X className="icon-error" />
                {error}
              </div>
            )}

            <div className="contenedor-buscar">
              <button
                onClick={buscarPropiedades}
                disabled={loading}
                className="btn-buscar-mejorado"
              >
                {loading ? (
                  <div className="loading-content">
                    <div className="spinner" />
                    Buscando...
                  </div>
                ) : (
                  <div className="search-content">
                    <Search className="icon-search" />
                    BUSCAR
                  </div>
                )}
              </button>

              <button
                onClick={limpiarFiltros}
                className="btn-limpiar-filtros"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de propiedades */}
      <div className="seccion-destacadas">
        <div className="contenedor-destacadas">
          <div className="titulo-destacadas">
            <h2>
              {mostrandoResultados
                ? `${resultados.length} ${resultados.length === 1 ? 'Propiedad Encontrada' : 'Propiedades Encontradas'}`
                : 'Propiedades Destacadas del Mes'
              }
            </h2>
            <p>
              {mostrandoResultados
                ? 'Resultados de tu búsqueda personalizada'
                : 'Descubre las mejores opciones seleccionadas especialmente para ti'
              }
            </p>
          </div>

          <div className="grid-propiedades">
            {propiedadesAMostrar.map((propiedad) => (
              <div key={propiedad.id} className="tarjeta-propiedad">
                <div className="imagen-container">
                  <img
                    src={propiedad.imagen?.keyS3 || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=600'}
                    alt={propiedad.descripcion}
                    className="imagen-propiedad"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=600';
                    }}
                  />

                  <button
                    onClick={() => toggleFavorito(propiedad.id)}
                    className="btn-favorito"
                    aria-label={`${propiedadesFavoritas.has(propiedad.id) ? 'Quitar de' : 'Agregar a'} favoritos`}
                  >
                    <Heart
                      className={`icon-heart ${propiedadesFavoritas.has(propiedad.id) ? 'favorito-activo' : ''
                        }`}
                    />
                  </button>

                  <div className="badge-estado">
                    {propiedad.estado}
                  </div>
                </div>

                <div className="contenido-tarjeta">
                  <span className="codigo-propiedad">{propiedad.codigo}</span>

                  <div className="header-tarjeta">
                    <h3 className="titulo-propiedad">{propiedad.descripcion}</h3>
                    <span className="precio-propiedad">{formatearPrecio(propiedad.precio)}</span>
                  </div>

                  <div className="ubicacion-propiedad">
                    <MapPin className="icon-ubicacion" />
                    <span>{formatearCiudad(propiedad.ciudad)}</span>
                  </div>

                  <div className="detalles-propiedad">
                    <span>{propiedad.habitaciones} hab.</span>
                    <span>{propiedad.banos} baños</span>
                    <span>{propiedad.areaMetros} m²</span>
                  </div>

                  <div className="acciones-tarjeta">
                    <button
                      className="btn-ver-mas"
                      onClick={() => abrirModal(propiedad)}
                    >
                      <Eye className="icon-eye" />
                      Ver más
                    </button>
                    <button className="btn-compartir" aria-label="Compartir propiedad">
                      <Share2 className="icon-share" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mostrandoResultados && resultados.length === 0 && !loading && (
            <div className="sin-resultados">
              <p>No se encontraron propiedades que coincidan con tu búsqueda.</p>
              <button onClick={limpiarFiltros} className="btn-limpiar-filtros">
                Limpiar filtros y ver todas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles de propiedad */}
      {modalAbierto && propiedadSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header del modal con imagen */}
            <div className="modal-header">
              <img
                src={propiedadSeleccionada.imagen?.keyS3 || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=600'}
                alt={propiedadSeleccionada.descripcion}
                className="modal-imagen"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&w=600';
                }}
              />

              <button
                className="modal-close-btn"
                onClick={cerrarModal}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>

              <div className="modal-badge-estado">
                {propiedadSeleccionada.estado}
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="modal-body">
              <span className="modal-codigo">{propiedadSeleccionada.codigo}</span>

              <div className="modal-header-info">
                <h2 className="modal-titulo">{propiedadSeleccionada.descripcion}</h2>
                <span className="modal-precio">{formatearPrecio(propiedadSeleccionada.precio)}</span>
              </div>

              <div className="modal-ubicacion">
                <MapPin className="icon-ubicacion" />
                <span>{formatearCiudad(propiedadSeleccionada.ciudad)}</span>
              </div>

              {/* Grid de detalles */}
              <div className="modal-detalles-grid">
                <div className="modal-detalle-item">
                  <div className="modal-detalle-valor">{propiedadSeleccionada.habitaciones}</div>
                  <div className="modal-detalle-label">Habitaciones</div>
                </div>

                <div className="modal-detalle-item">
                  <div className="modal-detalle-valor">{propiedadSeleccionada.banos}</div>
                  <div className="modal-detalle-label">Baños</div>
                </div>

                <div className="modal-detalle-item">
                  <div className="modal-detalle-valor">{propiedadSeleccionada.areaMetros}</div>
                  <div className="modal-detalle-label">Metros²</div>
                </div>

                <div className="modal-detalle-item">
                  <div className="modal-detalle-valor">{propiedadSeleccionada.estrato}</div>
                  <div className="modal-detalle-label">Estrato</div>
                </div>
              </div>

              {/* Características */}
              <div className="modal-caracteristicas">
                <h3>Características</h3>
                <div className="caracteristicas-grid">
                  <div className="caracteristica-item">
                    <Car
                      className={`caracteristica-icon ${propiedadSeleccionada.parqueadero ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}
                    />
                    <span className={`caracteristica-texto ${propiedadSeleccionada.parqueadero ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}>
                      {propiedadSeleccionada.parqueadero ? 'Con' : 'Sin'} Parqueadero
                    </span>
                  </div>

                  <div className="caracteristica-item">
                    <Home
                      className={`caracteristica-icon ${propiedadSeleccionada.amoblado ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}
                    />
                    <span className={`caracteristica-texto ${propiedadSeleccionada.amoblado ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}>
                      {propiedadSeleccionada.amoblado ? 'Amoblado' : 'Sin amoblar'}
                    </span>
                  </div>

                  <div className="caracteristica-item">
                    <Waves
                      className={`caracteristica-icon ${propiedadSeleccionada.piscina ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}
                    />
                    <span className={`caracteristica-texto ${propiedadSeleccionada.piscina ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}>
                      {propiedadSeleccionada.piscina ? 'Con' : 'Sin'} Piscina
                    </span>
                  </div>

                  <div className="caracteristica-item">
                    <Shield
                      className={`caracteristica-icon ${propiedadSeleccionada.seguridad ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}
                    />
                    <span className={`caracteristica-texto ${propiedadSeleccionada.seguridad ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}>
                      {propiedadSeleccionada.seguridad ? 'Con' : 'Sin'} Seguridad 24h
                    </span>
                  </div>

                  <div className="caracteristica-item">
                    <Heart
                      className={`caracteristica-icon ${propiedadSeleccionada.mascotas ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}
                    />
                    <span className={`caracteristica-texto ${propiedadSeleccionada.mascotas ? 'caracteristica-disponible' : 'caracteristica-no-disponible'}`}>
                      {propiedadSeleccionada.mascotas ? 'Acepta' : 'No acepta'} Mascotas
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="modal-acciones">
                <button
                  className="btn-hablar-asesor"
                  onClick={hablarConAsesor}
                >
                  <MessageCircle size={20} />
                  Hablar con Asesor
                </button>

                <button
                  onClick={() => navigate(`/detalle-apartamento/${propiedadSeleccionada.id}`)}
                  className="btn-detalle"
                >
                  Ver detalle apartamento
                </button>



                <button
                  className="btn-compartir-modal"
                  onClick={compartirPropiedad}
                  aria-label="Compartir propiedad"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <button className="btn-flotante" aria-label="Notificaciones">
        <Bell className="icon-bell" />
      </button>
    </div>
  );
}

export default InicioMejorado;
