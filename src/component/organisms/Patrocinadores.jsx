import React from "react";
import patrocinadores from '../../assets/patrocinadores.jpg'


const Patrocinadores = () => {
    return(
        <div id = "patrocinadores">
            <h1>
            Suplementos asociados
            </h1>
            <img id = "suplementos-img" src={patrocinadores} alt="" />
        </div>
    );
}

export default Patrocinadores