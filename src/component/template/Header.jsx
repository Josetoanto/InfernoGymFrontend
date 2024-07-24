import React from "react";
import { useNavigate } from "react-router-dom";
import LogoTitulo from "../organisms/LogoTitulo";

const Header = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate("/registrarse");
    };

    const handleLoginClick = () => {
        navigate("/iniciarSesion");
    };

    return (
        <>
            <div id="header">
                <div>
                    <LogoTitulo prompt={"Inferno Gym"}></LogoTitulo>
                </div>
                <div>
                    <button onClick={handleRegisterClick} id="header_registrarse-btn"> Registrarse</button>
                    <button onClick={handleLoginClick} id="header_iniciarSesion-btn">Iniciar Sesion</button>
                </div>
            </div>
        </>
    );
}

export default Header;
