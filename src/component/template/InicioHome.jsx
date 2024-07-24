import React from "react"
import imagenGym from '../../assets/imagenGym.png'
import { useNavigate } from "react-router-dom";


const InicioHome = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate("/registrarse");
    };
    return(
        <div>
            <div id = "inicioPagina">
            <div id = "imagenPiePagina">
                <img id = "mundoAzul" src={imagenGym} alt=""/>
            </div>
            <div id = "textoPiePagina">
                <h1 id = "eslogan">"Desafía tus límites, conquista tus metas: ¡Bienvenido a Inferno Gym!"</h1>
                <button onClick = {handleRegisterClick} id = "inscribirse-btn-inicioPagina">INSCRIBETE YA!</button>
            </div>
            </div>
            <div id = "auxLine_inicioPagina">
            <h3>__________________________________________________________________________________________________________________________________________</h3>
            </div>
        </div>
    );
}

export default InicioHome