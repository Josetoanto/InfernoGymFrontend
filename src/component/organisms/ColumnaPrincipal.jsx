import React, { useState } from "react";
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../models/LocalStorage.mjs";

const ColumnaPrincipal = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registrarse = () => {
        navigate("/registrarse");
    };

    const handleLogin = async () => {
        const user = {
            nickname: email,  // Asumiendo que estás usando el email como nickname
            password: password
        };

            const response = await fetch('https://p83c9dw9-8000.use2.devtunnels.ms/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (data.token != null) {
                console.log('Login exitoso:', data.token);
                // Maneja el éxito del login (por ejemplo, redirigir al usuario, guardar token)
            } else {
                const errorData = await response.json();
                console.error('Error al iniciar sesión:', errorData.message);
                // Maneja errores específicos de login
            }
            
            if (data != null){
                LocalStorage.setItem("token",data.token)
                const userInfo = LocalStorage.getUserInfo()
                console.log(userInfo)
                switch (userInfo.role_id_fk) {
                    case 1:
                        navigate("/administradorHome")
                      break;
                    case 2:
                        navigate("/homeUsuario")
                      break;
                    case 3:
                        navigate("/nutricionistaHome")
                      break;
                    case 4:
                        navigate("/coachHome")
                      break;
                    default:
                      console.log("Rol no existente");
                      break
                  }
            }
            
    };


    return (
        <div id="ColumnaPrincipal">
            <h2 id="tituloSesion">Inicio De Sesión</h2>
            <h4 id="inicioText">Nombre de usuario</h4>
            <input
                type="text"
                id="email"
                placeholder="Ingresa tu nombre de usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <h4 id="passwordText">Contraseña</h4>
            <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div> </div>
            <button id="entrarbtn" onClick={handleLogin}>Entrar</button>
            <h3 id="continue">Continuar con</h3>
            <button id="googlebtn">Iniciar sesión con Google <img id="googleIcon" src={google} alt="" /></button>
            <div></div>
            <button id="facebookbtn">Iniciar sesión con Facebook <img id="facebookIcon" src={facebook} alt="" /></button>
            <h3 id="pregunta">¿No tienes cuenta? <button onClick={registrarse} id="registrarse">Regístrate</button></h3>
        </div>
    );
}

export default ColumnaPrincipal;
