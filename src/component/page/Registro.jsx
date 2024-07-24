import React, { useState } from "react";
import cuerno from '../../assets/horns.png'
import Flecha from "../atom/Flecha";

const Registro = () => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async () => {
    const user = {
        name: usuario,
        password: password,
        email: correo,
        "weight": 0,
        "height": 0,
        "age": 0,
        "progress": "0%",
        "subscription_id": 3, 
        "role_id_fk": 2,
        "deleted": false
    };

    try {
      const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario creado:', data);
        // Maneja el éxito del registro (por ejemplo, redirigir al usuario)
      } else {
        const errorData = await response.json();
        console.error('Error al crear usuario:', errorData.message);
        // Maneja errores específicos
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      // Maneja errores generales
    }
  };

  return (
    <div id="registroColumnas">
      <div id="columnaRegistro1">
        <div id="tituloRegistroBox">
          <h2 id="registrotitulo">Registrarse</h2>
          <img id="cuernosRegistro" src={cuerno} alt="" />
        </div>
        <div> </div>
        <input
          type="text"
          id="usuario"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <div> </div>
        <input
          type="text"
          id="correo"
          placeholder="Correo Electronico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <div> </div>
        <div id="botonesRegistro">
          <input
            type="password"
            id="passwordRegistro"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="completarButon" onClick={handleRegistro}>Entrar</button>
      </div>
      <Flecha />
    </div>
  );
};

export default Registro;
