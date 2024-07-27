import React, { useState } from "react";
import LogoTitulo from "../organisms/LogoTitulo";
import flecha from '../../assets/flecha.png';
import menu from '../../assets/menu.png';
import { Link, useNavigate } from "react-router-dom";

const HeaderAdmistrador = ({ prompt }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    const goBack = () => {
        navigate("/HomeAdministrador");
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
                                <Link id="LinkHeader" to="/HomeAdministrador">Home</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/personal">Personal</Link>
                            </li>
                            <li>
                                <Link id="LinkHeader" to="/usuarios">Usuarios</Link>
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

export default HeaderAdmistrador;
