import React from "react";
import paquetes from '../../assets/planes.png'

const Servicios = () => {
    return(
        <div id = "informacionServicios">
        <p id = "nuestrosServicios">NUESTROS PLANES</p>
        <p id = "navegaVelocidad">Elige tu camino hacia la grandeza: Tres planes diseñados para ayudarte a alcanzar tus metas. Ya sea que estés comenzando tu viaje fitness, buscando mejorar tu rendimiento, o aspirando a la élite, tenemos el plan perfecto para ti. ¡Transforma tu vida con nosotros!    </p>
        <img id = "planesServicios" src={paquetes} alt="" />
        </div>
    );
}

export default Servicios