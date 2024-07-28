import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cuerno from '../../assets/horns.png';
import Flecha from "../atom/Flecha";

const Registro = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRegistro = async () => {
        const user = {
            name: usuario,
            password: password,
            weight: '',
            height: '',
            age: '',
            progress: "0%",
            goal: '',
            gmail: correo,
            subscription_id: 3, 
            role_id_fk: 2,
            deleted: false
        };

        try {
            const response = await fetch('https://infernogymapi.integrador.xyz/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => {
                    navigate("/iniciarSesion");
                }, 2000); // Espera 2 segundos antes de redirigir
            } else {
                const errorData = await response.json();
                console.error('Error al crear usuario:', errorData.message);
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
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
                    placeholder="Correo Electrónico"
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
                <button id="completarButon" onClick={handleRegistro}>Completar</button>
                {showSuccess && (
                    <div className="success-message">
                        <p>Registrado correctamente</p>
                    </div>
                )}
            </div>
            <Flecha />
        </div>
    );
};

export default Registro;
