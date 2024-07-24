import React from "react";
import logo from '../../assets/logoInferno.png';
import Titulo from "../atom/Titulo";

const LogoTitulo = ({ prompt }) => {
    return (
        <div id="headerTitulo">
            <img id="logoHeader" src={logo} alt="" />
            <Titulo prompt={ prompt } />
        </div>
    );
}

export default LogoTitulo;
