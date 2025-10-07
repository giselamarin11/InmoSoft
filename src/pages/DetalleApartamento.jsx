import React, { useState } from "react";
import Slider from "react-slick";
import "./DetalleApartamento.css";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import propiedadesMock from "../data/propiedadesMock"; 


// Icono personalizado del marcador
const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

function DetalleApartamento() {
  const { id } = useParams();
  const propiedad = propiedadesMock.find((p) => p.id === parseInt(id));
  if (!propiedad) {
    return <p>No se encontró información del apartamento.</p>;
  }

  const ubicacion = [propiedad.ubicacion.lat, propiedad.ubicacion.lng];

  // Estado para modal de imagen
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const settings = {
    pauseOnHover: true,
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (!propiedad) {
    return <p>No se encontró información del apartamento.</p>;
  }

  return (
    <div className="detalle-apartamento-container">
      <h2 className="titulo-detalle">Detalle del Apartamento {id}</h2>

      {/* Carrusel */}
      <div className="galeria-fotos">
        <Slider {...settings}>
          {propiedad.imagenes.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Foto ${index + 1}`}
                onClick={() => setImagenSeleccionada(img)}
                className="imagen-carrusel"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal para imagen */}
      {imagenSeleccionada && (
        <div className="modal" onClick={() => setImagenSeleccionada(null)}>
          <img src={imagenSeleccionada} alt="Ampliada" className="imagen-grande" />
        </div>
      )}

      {/* Info + Mapa */}
      <div className="detalle-content">
        <div className="info-apartamento">
          <h3>{propiedad.descripcion}</h3>
          <p><strong>📍 Ciudad:</strong> {propiedad.ciudad}</p>
          <p><strong>💰 Precio:</strong> {propiedad.precio}</p>
          <p><strong>🛏️ Habitaciones:</strong> {propiedad.habitaciones}</p>
          <p><strong>🛁 Baños:</strong> {propiedad.banos}</p>
          <p><strong>⇄ Área:</strong> {propiedad.areaMetros} m²</p>
          <p><strong>🚗 Parqueadero:</strong> {propiedad.parqueadero ? "Sí" : "No"}</p>
        </div>

        <div className="mapa-apartamento">
          <h3>Mapa de Ubicación</h3>
          <MapContainer
            center={[propiedad.ubicacion.lat, propiedad.ubicacion.lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[propiedad.ubicacion.lat, propiedad.ubicacion.lng]} icon={icon}>
              <Popup>{propiedad.descripcion}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default DetalleApartamento;

