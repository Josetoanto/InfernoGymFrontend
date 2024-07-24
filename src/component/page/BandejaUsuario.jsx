import React from "react";
import HeaderUsers from "../template/HeaderUsers";
import enviarBtn from '../../assets/rightArrow.png'

const BandejaUsuario = () => {
    return (
        <>
        <HeaderUsers prompt={"Nombre usuario"}></HeaderUsers>
        <div id="bandejaBox">
        <div id = "chatsBox">
            <div id="chat"><h1>Coach</h1></div>
            <div id="chat"><h1>Nutricionista</h1></div>
        </div>
            <div id="Chatbox">
                <div id = "NombreUsuarioChat">Nombre usuario</div>
                <div id = "Mensajes"></div>
                <div id = "mensajeEnviar"><input id="mensajeEnviarText"  type="text" placeholder="Mensaje enviar" />
                    <button id="enviarMensajebtn"> <img id = "arrowBtn" src= {enviarBtn} alt="" /></button>
                </div>
            </div>
        </div>
        </>
    );
}

export default BandejaUsuario