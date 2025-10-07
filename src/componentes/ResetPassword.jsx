import React, { useState } from "react";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Aquí enviar la nueva contraseña y el código al backend
    console.log("Datos enviados:", formData);

    // Si todo sale bien, redirige al login
    navigate("/login");
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="rese">
          <img src="/src/assets/logo.png" alt="logo Inmosoft" />
        </div>

        <form className="reset-form" onSubmit={handleSubmit}>
          <h2>Restablecer Contraseña</h2>

          {error && <p className="error-message">{error}</p>}

          {/* Código de verificación */}
          <input
            type="text"
            name="code"
            placeholder="Código de verificación"
            value={formData.code}
            onChange={handleChange}
            required
          />

          {/* Nueva contraseña */}
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          {/* Confirmar contraseña */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="reset-button">
            Guardar Contraseña
          </button>
        </form>

        <a href="/login" className="back-to-login">
          Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
}

export default ResetPassword;
