import React, { useState } from "react";
import LogoTitulo from "../organisms/LogoTitulo";
import flecha from '../../assets/flecha.png';
import menu from '../../assets/menu.png';
import { Link, useNavigate } from "react-router-dom";

const HeaderUsers = ({ prompt }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    const goBack = () => {
        navigate(-1);
    };


    return (
        <div id="header">
            <div>
                <LogoTitulo prompt={prompt} />
            </div>
            <div>
                <button id="HeaderButton" onClick={goBack}>
                    <img src={flecha} alt="Flecha" />
                </button>
                <button id="HeaderButtonMenu" onClick={toggleMenu}>
                    <img src={menu} alt="Menú" />
                </button>
                {menuVisible && (
                    <div className="mini-menu">
                        <ul>
                            <li>
                                <Link id="LinkHeader" to="/HomeUsuario">Home</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/Ejercicios">Ejercicios</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/BandejaUsuario">Mensajes</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/PerfilUsuario">Perfil</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/ArbolUsuario">Avance</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/BandejaUsuario">Suscripciones</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/">Cerrar Sesion</Link>
                            </li>
                        
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderUsers;
