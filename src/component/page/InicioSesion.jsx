import React from "react";
import demonioGym from '../../assets/registroGym.png'
import ColumnaPrincipal from "../organisms/ColumnaPrincipal";


const InicioSesion = () => {
    return(
    <div id="AmbasColumnas">
        <ColumnaPrincipal></ColumnaPrincipal>
        <div id="mujer"><img id="mujer" src={demonioGym} alt="" /></div>
    </div>
    );
}

export default InicioSesion