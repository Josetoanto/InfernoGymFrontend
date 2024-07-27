import React from "react";
import HeaderUsers from "../template/HeaderUsers";


const Suscripciones = () => {
    return (
        <>
            <HeaderUsers prompt={"Suscripciones"} />
            <div id="suscripcionesPage">
                <div id="suscripcionesBox">
                    <div id="informacionSuscripcionBox">
                        <h3 id="textSuscripcion">Selecciona tu tipo de suscripción y los meses a suscribirse</h3>
                    </div>
                    <div id="selectsAndButtonBox">
                        <select name="subscription" id="selectSuscripcion">
                            <option value="free">Free</option>
                            <option value="pro">Pro</option>
                            <option value="elite">Elite</option>
                        </select>
                        <select name="months" id="selectMouth">
                            <option value="1">1 mes</option>
                            <option value="3">3 meses</option>
                            <option value="6">6 meses</option>
                        </select>
                        <button id="paySuscripcion">Pagar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Suscripciones;
